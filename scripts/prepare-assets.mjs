// Genera los assets del portal a partir de las referencias de `references/final/`.
//
// Las imágenes de interior son RECREACIONES CONCEPTUALES (renders generados) recortadas de los
// mockups finales. Son placeholders visuales: no deben presentarse como fotografías reales del local.
// Cada recorte se ha revisado a mano: todas las escenas de interior muestran exactamente 3 sillones
// y ninguna incluye al propietario. Si cambias coordenadas, vuelve a revisarlo visualmente.
//
// Uso: npm run assets
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const HOME = "references/final/homepage_desktop_final.png";
const SERVICES = "references/final/services_desktop_final.png";
const LOGO = "references/final/la7barberia_logo_instagram.png";

const OUT_CONCEPT = "public/images/concept";
const OUT_BRAND = "public/brand";

// [left, top, right, bottom] en píxeles del mockup de origen.
const crops = {
  // Interiores (3 sillones cada uno)
  "interior-hero": [HOME, [492, 46, 1122, 370]],
  "interior-espacio": [HOME, [425, 731, 1122, 961]],
  "interior-recepcion": [SERVICES, [520, 47, 1122, 347]],
  "interior-sillones": [SERVICES, [0, 1038, 570, 1312]],
  // Servicios (primeros planos, sin escenas de interior)
  "servicio-corte": [SERVICES, [27, 452, 238, 533]],
  "servicio-barba": [SERVICES, [260, 452, 456, 533]],
  "servicio-tratamientos": [SERVICES, [479, 452, 670, 533]],
  "servicio-asesoria": [SERVICES, [692, 452, 879, 533]],
  "servicio-productos": [SERVICES, [901, 452, 1096, 533]],
};

const SCALE = 2;

async function cropToJpeg(src, [l, t, r, b], out) {
  const width = r - l;
  const height = b - t;
  await sharp(src)
    .extract({ left: l, top: t, width, height })
    .resize(width * SCALE, height * SCALE, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out);
}

await mkdir(OUT_CONCEPT, { recursive: true });
await mkdir(OUT_BRAND, { recursive: true });

for (const [name, [src, box]] of Object.entries(crops)) {
  await cropToJpeg(src, box, `${OUT_CONCEPT}/${name}.jpg`);
  console.log(`✓ ${OUT_CONCEPT}/${name}.jpg`);
}

// Logo: PNG oficial temporal con fondo negro (sin vectorizar ni recortar el fondo).
await sharp(LOGO)
  .resize(640, 640)
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_BRAND}/la7barberia-logo.png`);
// Favicon: 192px con paleta (el PNG completo pesaba ~260 KB).
await sharp(LOGO)
  .resize(192, 192)
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile("app/icon.png");
await sharp(LOGO).resize(180, 180).png({ compressionLevel: 9 }).toFile("app/apple-icon.png");
console.log("✓ logo, icon, apple-icon");

// Imagen Open Graph 1200x630: logo sobre negro puro (mismo fondo que el PNG) a la izquierda e interior conceptual a la derecha.
// La composición deja visibles los 3 sillones del interior.
const OG_W = 1200;
const OG_H = 630;
const PANEL = 400;
const interior = await sharp(`${OUT_CONCEPT}/interior-hero.jpg`)
  .resize({ height: OG_H })
  .extract({ left: 40, top: 0, width: OG_W - PANEL, height: OG_H })
  .toBuffer();
const shade = Buffer.from(
  `<svg width="${OG_W - PANEL}" height="${OG_H}"><defs><linearGradient id="g" x1="0" x2="1">` +
    `<stop offset="0" stop-color="#000000" stop-opacity="1"/>` +
    `<stop offset="0.12" stop-color="#000000" stop-opacity="0.35"/>` +
    `<stop offset="0.3" stop-color="#000000" stop-opacity="0"/>` +
    `</linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
);
const logo = await sharp(LOGO).resize(360, 360).toBuffer();
await sharp({ create: { width: OG_W, height: OG_H, channels: 3, background: "#000000" } })
  .composite([
    { input: interior, left: PANEL, top: 0 },
    { input: shade, left: PANEL, top: 0 },
    { input: logo, left: 40, top: 135 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("app/opengraph-image.jpg");
console.log("✓ app/opengraph-image.jpg");

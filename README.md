# La 7 Barbería — Portal web

Web one-page de **La 7 Barbería** (Asturias, España). Next.js 15 (App Router) + TypeScript +
Tailwind CSS 4. Contenido en español de España.

La especificación funcional, visual y de contenido está en [`docs/`](docs/) (empieza por
[`docs/00_README_PAQUETE_REFERENCIA.md`](docs/00_README_PAQUETE_REFERENCIA.md)) y las referencias
visuales en [`references/final/`](references/final/).

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # opcional
npm run dev                  # http://localhost:3000
```

| Script              | Qué hace                                                         |
| ------------------- | ---------------------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo                                           |
| `npm run build`     | Build de producción                                              |
| `npm run lint`      | ESLint (config de Next)                                          |
| `npm run typecheck` | TypeScript sin emitir                                            |
| `npm run test`      | Tests (Vitest): enlaces, Booksy y control de datos no inventados |
| `npm run format`    | Prettier                                                         |
| `npm run validate`  | typecheck + lint + test + build                                  |
| `npm run assets`    | Regenera imágenes, logo, iconos y OG desde `references/final/`   |

## Variables de entorno

| Variable                 | Estado    | Efecto                                                                          |
| ------------------------ | --------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_BOOKSY_URL` | Pendiente | Vacía: no se muestra ningún botón de Booksy y **WhatsApp es el CTA principal**. |
| `NEXT_PUBLIC_SITE_URL`   | Pendiente | Dominio para canonical, sitemap y Open Graph. Vacía: `http://localhost:3000`.   |

La URL de Booksy se valida en [`lib/links.ts`](lib/links.ts). Solo se aceptan URLs `https` del
negocio:

- perfil público: `https://booksy.com/es-es/123456_nombre-del-negocio_...`
- enlace directo: `https://booksy.com/es-es/dl/show-business/123456`
- subdominio del negocio: `https://<negocio>.booksy.com/...`

Se rechaza todo lo demás: `#`, otros dominios, la home de booksy.com, las páginas genéricas de
búsqueda o categoría (`/es-es/s/...`) y los subdominios corporativos (`www`, `biz`, `help`…). Una
URL rechazada se comporta igual que una variable vacía: no se muestra ningún botón de Booksy.

Al añadir la URL, aparecen automáticamente botones de Booksy en la cabecera, el hero, cada servicio,
la sección de reserva, el menú móvil y la barra inferior móvil. WhatsApp pasa a ser el CTA
secundario.

## Estructura

```text
app/            layout, página, 404, sitemap, robots, icono y OG
components/     secciones (Header, Hero, InfoStrip, Services, About, Gallery,
                BookingSteps, Faq, Contact, Footer, StickyMobileCTA) y ui/
config/site.ts  datos de marca y contacto + datos PENDIENTES (null)
data/           servicios, FAQ, navegación e imágenes
lib/            enlaces (Booksy/WhatsApp/tel/mail), analítica, JSON-LD
public/         logo e imágenes conceptuales generadas por `npm run assets`
scripts/        preparación de assets
tests/          Vitest
```

## Imágenes

Todas las imágenes actuales son **recreaciones conceptuales** recortadas de los mockups finales
(`scripts/prepare-assets.mjs`). Son placeholders hasta tener fotografías reales:

- La web las etiqueta como "Recreación conceptual" y sus textos `alt` lo indican. Nunca se
  presentan como fotos del local.
- Todas las escenas de interior muestran **exactamente 3 sillones** y no aparece el propietario.
  Las proporciones mínimas y `objectPosition` de [`data/images.ts`](data/images.ts) mantienen los 3
  sillones en el encuadre en todos los tamaños.
- La resolución es limitada porque vienen de los mockups. Conviene sustituirlas por fotos reales.

**Sustituir una imagen:** copia la foto en `public/images/`, cambia el `import` en
[`data/images.ts`](data/images.ts), actualiza el `alt` y pon `kind: "photo"`. La etiqueta de
recreación desaparece sola. La galería se edita en `galleryImages`.

**Logo:** se usa temporalmente el PNG oficial con fondo negro (`references/final/`), sin vectorizar.
Un recorte circular CSS (`.logo-blend` en `app/globals.css`) oculta las esquinas del cuadrado.
Cuando exista un SVG o PNG transparente, sustituye `public/brand/la7barberia-logo.png` y
`app/icon.png`.

## Analítica

Los enlaces de conversión llevan `data-track` y `data-track-location`. Los eventos son
`click_booksy`, `click_whatsapp`, `click_phone`, `click_email` y `click_instagram`.
[`components/ClientEnhancements.tsx`](components/ClientEnhancements.tsx) los publica en
`window.dataLayer` (si existe) y como `CustomEvent("la7:track")`. Todavía no se usa ningún
proveedor.

## Datos pendientes (no inventar)

Se completan en [`config/site.ts`](config/site.ts) → `pending`. Mientras sean `null` no se muestran:

- [ ] URL definitiva de Booksy (`NEXT_PUBLIC_BOOKSY_URL`)
- [ ] Dirección postal completa: al rellenarla se publica el JSON-LD `BarberShop`
- [ ] Horario comercial
- [ ] Precios y duración de cada servicio
- [ ] Política de cancelación
- [ ] **Datos legales (bloquea la publicación comercial).** Faltan el titular (nombre o razón
      social), el CIF/NIF, el domicilio y el email de contacto legal. Sin ellos no se pueden
      redactar el Aviso Legal (art. 10 LSSI), la Política de Privacidad (RGPD/LOPDGDD) ni la
      Política de Cookies. La web no las incluye a propósito para no inventar datos. Hoy no usa
      cookies propias ni analítica activa: si se conecta un proveedor de analítica, también hará
      falta un banner de consentimiento.
- [ ] Dominio definitivo (`NEXT_PUBLIC_SITE_URL`)
- [ ] Fotografías reales del local y versión vectorial/transparente del logo
- [ ] Otras redes sociales (solo Instagram está confirmado)

`tests/content.test.ts` falla si aparecen datos que solo están en los mockups: 80 m², café de
cortesía, WiFi, TikTok, Facebook, "respuesta rápida", mapas genéricos…

## Deuda técnica

- **`npm audit`: 7 vulnerabilidades (6 altas, 1 moderada) en dependencias de desarrollo y build.**
  Se aceptan por ahora porque corregirlas exige cambiar de versión mayor:
  - `postcss@8.4.31`, incluido dentro de `next@15` (GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q,
    GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849). La corrección de `npm audit fix --force` instala
    `next@16`. Solo procesa el CSS propio del proyecto durante el build y no llega al navegador.
  - `braces` → `micromatch` → `fast-glob` → `@next/eslint-plugin-next` (`eslint-config-next@15`,
    GHSA-vfj7-8cjw-p6xm). Solo afecta al lint local.
  - No ejecutes `npm audit fix --force`: rompe el stack (Next 16 / eslint-config-next 14). Hay que
    revisarlo al planificar la migración a Next.js 16.
- **TypeScript fijado en 5.x.** TypeScript 6 falla con Next 15 (`noUncheckedSideEffectImports` en
  `import "./globals.css"`).
- **Imágenes de baja resolución.** Las recreaciones conceptuales salen de los mockups y se ven algo
  suaves en pantallas retina. Hay que sustituirlas por fotografías reales.
- **Logo raster con fondo negro.** Falta una versión SVG o PNG transparente oficial.

## Calidad verificada (versión inicial)

- Lighthouse (build de producción, mediana de 3 ejecuciones con caché de imágenes caliente):
  - móvil: Performance 95, Accessibility 100, Best Practices 100, SEO 100 (LCP 2,9 s simulado,
    CLS 0, TBT 0 ms)
  - escritorio: 100 / 100 / 100 / 100 (LCP 0,6 s)
- axe-core WCAG 2.2 AA a 320, 390, 768, 1024 y 1440 px: 0 violaciones. El contraste medido sobre
  imágenes y degradados es ≥ 5,9:1.
- Teclado: skip link, orden de tabulación, Shift+Tab, foco visible, FAQ con Enter, menú móvil
  modal (Enter abre, Esc cierra, el foco vuelve al botón o pasa a la sección destino).
- Sin overflow horizontal, sin CTAs solapados y con la barra inferior móvil sin tapar contenido en
  las cinco anchuras. Los 3 sillones siguen visibles en todas las imágenes de interior.

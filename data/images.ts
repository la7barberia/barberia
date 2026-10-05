import type { StaticImageData } from "next/image";

import interiorEspacio from "@/public/images/concept/interior-espacio.jpg";
import interiorHero from "@/public/images/concept/interior-hero.jpg";
import interiorRecepcion from "@/public/images/concept/interior-recepcion.jpg";
import interiorSillones from "@/public/images/concept/interior-sillones.jpg";
import servicioAsesoria from "@/public/images/concept/servicio-asesoria.jpg";
import servicioBarba from "@/public/images/concept/servicio-barba.jpg";
import servicioCorte from "@/public/images/concept/servicio-corte.jpg";
import servicioProductos from "@/public/images/concept/servicio-productos.jpg";
import servicioTratamientos from "@/public/images/concept/servicio-tratamientos.jpg";

/**
 * Catálogo de imágenes del portal.
 *
 * `kind: "concept"` marca las recreaciones generadas que se usan como placeholder hasta tener
 * fotografías reales. La web las etiqueta como "Recreación conceptual" y nunca las describe como
 * fotos del local. Al sustituir una por una foto real: cambia `src`, actualiza `alt` y pon
 * `kind: "photo"`.
 *
 * Regla: toda imagen de interior debe mostrar exactamente 3 sillones y no incluir al propietario.
 * `objectPosition` mantiene los 3 sillones dentro del encuadre cuando la imagen se recorta.
 */
export type SiteImage = {
  src: StaticImageData;
  alt: string;
  kind: "concept" | "photo";
  objectPosition?: string;
};

export const images = {
  hero: {
    src: interiorHero,
    alt: "Recreación conceptual del interior de La 7 Barbería: tres sillones de barbería negros frente a un mostrador de mármol con el logotipo dorado.",
    kind: "concept",
    objectPosition: "25% 50%",
  },
  espacio: {
    src: interiorEspacio,
    alt: "Recreación conceptual del espacio: sofá Chesterfield, espejos retroiluminados y tres sillones de barbería.",
    kind: "concept",
    objectPosition: "72% 50%",
  },
  recepcion: {
    src: interiorRecepcion,
    alt: "Recreación conceptual de la recepción con el logotipo de La 7 Barbería y tres sillones de barbería en primer plano.",
    kind: "concept",
    objectPosition: "50% 50%",
  },
  sillones: {
    src: interiorSillones,
    alt: "Recreación conceptual de tres sillones de barbería de piel negra con detalles dorados.",
    kind: "concept",
    objectPosition: "45% 50%",
  },
  corte: {
    src: servicioCorte,
    alt: "Imagen conceptual de un corte de cabello masculino con degradado.",
    kind: "concept",
  },
  barba: {
    src: servicioBarba,
    alt: "Imagen conceptual de una barba perfilada.",
    kind: "concept",
  },
  tratamientos: {
    src: servicioTratamientos,
    alt: "Imagen conceptual de un cabello peinado y cuidado.",
    kind: "concept",
  },
  asesoria: {
    src: servicioAsesoria,
    alt: "Imagen conceptual de un hombre con traje y corbata.",
    kind: "concept",
  },
  productos: {
    src: servicioProductos,
    alt: "Imagen conceptual de productos de cuidado masculino en una estantería.",
    kind: "concept",
  },
} satisfies Record<string, SiteImage>;

/** Imágenes de la sección Galería. Añade o sustituye entradas sin tocar el componente. */
export const galleryImages: SiteImage[] = [images.recepcion, images.sillones];

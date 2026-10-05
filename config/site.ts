/**
 * Configuración centralizada de La 7 Barbería.
 *
 * Fuente: docs/site-config-reference.json. Cualquier dato no confirmado se deja en `null`
 * y la web no lo muestra. No inventes direcciones, horarios, precios ni URLs.
 */

export const siteConfig = {
  name: "La 7 Barbería",
  tagline: "Corte · Estilo · Confianza",
  description:
    "La 7 Barbería: corte de cabello, arreglo de barba, tratamientos capilares y asesoría de imagen en Asturias. Reserva tu cita fácilmente a través de Booksy.",
  lang: "es-ES",
  locale: "es_ES",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, ""),

  phoneDisplay: "+34 643 67 53 76",
  phoneE164: "+34643675376",
  whatsapp: "34643675376",
  whatsappMessage: "Hola, he visto la web de La 7 Barbería y quería hacer una consulta.",
  email: "la7barberia@gmail.com",
  instagram: "https://www.instagram.com/la7barberia/",
  instagramHandle: "@la7barberia",
  locationLabel: "Asturias, España",

  /** URL del perfil del establecimiento en Booksy. Vacía hasta tenerla confirmada. */
  booksyUrl: (process.env.NEXT_PUBLIC_BOOKSY_URL ?? "").trim(),

  /**
   * PENDIENTE: datos todavía sin confirmar. Mientras sean `null`, no se muestran
   * ni se incluyen en el JSON-LD.
   */
  pending: {
    streetAddress: null as string | null,
    postalCode: null as string | null,
    locality: null as string | null,
    openingHours: null as string[] | null,
    googleMapsUrl: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;

import { siteConfig } from "@/config/site";

/** Perfil de negocio: `/es-es/123456_nombre-del-negocio...` */
const BOOKSY_PROFILE_PATH = /^\/[a-z]{2}-[a-z]{2}\/\d+_[^/]+\/?$/i;
/** Enlace directo al negocio: `/es-es/dl/show-business/123456` */
const BOOKSY_DEEPLINK_PATH = /^\/[a-z]{2}-[a-z]{2}\/dl\/show-business\/\d+\/?$/i;

/** Subdominios corporativos de Booksy que no son páginas de un negocio. */
const NON_BUSINESS_SUBDOMAINS = new Set([
  "www",
  "biz",
  "blog",
  "help",
  "support",
  "docs",
  "api",
  "status",
  "partners",
  "careers",
]);

/**
 * Devuelve la URL de Booksy solo si apunta al perfil de un negocio concreto:
 * - `https://booksy.com/es-es/123456_nombre...` (perfil público)
 * - `https://booksy.com/es-es/dl/show-business/123456` (enlace directo)
 * - `https://<negocio>.booksy.com/...` (enlace de reserva propio del negocio)
 *
 * Se rechazan la cadena vacía, `#`, URLs sin https, otros dominios y cualquier otra página de
 * booksy.com, en especial las genéricas de búsqueda/categoría (`/es-es/s/...`).
 */
export function resolveBooksyUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.username || url.password) return null;

  const host = url.hostname.toLowerCase();
  const isMainSite = host === "booksy.com" || host === "www.booksy.com";
  const subdomain = host.endsWith(".booksy.com") ? host.slice(0, -".booksy.com".length) : null;
  const isBusinessSubdomain =
    subdomain !== null && /^[a-z0-9-]+$/.test(subdomain) && !NON_BUSINESS_SUBDOMAINS.has(subdomain);

  const isValid = isMainSite
    ? BOOKSY_PROFILE_PATH.test(url.pathname) || BOOKSY_DEEPLINK_PATH.test(url.pathname)
    : isBusinessSubdomain;

  return isValid ? url.toString() : null;
}

/** URL de Booksy lista para usar, o `null` si todavía no está disponible. */
export const booksyUrl = resolveBooksyUrl(siteConfig.booksyUrl);
export const hasBooksy = booksyUrl !== null;

export function whatsappHref(message: string = siteConfig.whatsappMessage): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Mensaje de WhatsApp para consultar por un servicio concreto. */
export function serviceWhatsappMessage(serviceTitle: string): string {
  return `Hola, he visto la web de La 7 Barbería y quería información sobre: ${serviceTitle}.`;
}

export const bookingWhatsappMessage =
  "Hola, he visto la web de La 7 Barbería y me gustaría pedir una cita.";

export const telHref = `tel:${siteConfig.phoneE164}`;
export const mailtoHref = `mailto:${siteConfig.email}`;

/** Atributos para enlaces externos abiertos en una pestaña nueva. */
export const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

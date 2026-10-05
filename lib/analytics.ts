/**
 * Puntos de evento de analítica, sin acoplar a ningún proveedor.
 *
 * Cada evento se publica en `window.dataLayer` (si existe, p. ej. Google Tag Manager) y como
 * `CustomEvent` "la7:track" en `window`, para conectar cualquier proveedor más adelante.
 */

export const ANALYTICS_EVENTS = [
  "click_booksy",
  "click_whatsapp",
  "click_phone",
  "click_email",
  "click_instagram",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsPayload = {
  event: AnalyticsEvent;
  /** Zona de la página donde se hizo clic: header, hero, servicios, sticky... */
  location?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function isAnalyticsEvent(value: unknown): value is AnalyticsEvent {
  return typeof value === "string" && (ANALYTICS_EVENTS as readonly string[]).includes(value);
}

export function track(payload: AnalyticsPayload): void {
  if (typeof window === "undefined") return;
  window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent<AnalyticsPayload>("la7:track", { detail: payload }));
}

/** Atributos `data-*` que el listener global convierte en eventos. */
export function trackAttrs(event: AnalyticsEvent, location: string) {
  return { "data-track": event, "data-track-location": location } as const;
}

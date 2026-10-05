import { describe, expect, it } from "vitest";

import { isAnalyticsEvent } from "@/lib/analytics";
import {
  mailtoHref,
  resolveBooksyUrl,
  serviceWhatsappMessage,
  telHref,
  whatsappHref,
} from "@/lib/links";

describe("resolveBooksyUrl", () => {
  it("devuelve null mientras no haya URL", () => {
    expect(resolveBooksyUrl("")).toBeNull();
    expect(resolveBooksyUrl("   ")).toBeNull();
  });

  it("rechaza URLs inválidas, sin https o de otros dominios", () => {
    expect(resolveBooksyUrl("#")).toBeNull();
    expect(resolveBooksyUrl("booksy.com/es-es/123_la-7")).toBeNull();
    expect(resolveBooksyUrl("http://booksy.com/es-es/123_la-7")).toBeNull();
    expect(resolveBooksyUrl("https://booksy.com.evil.com/es-es/123")).toBeNull();
    expect(resolveBooksyUrl("https://example.com/booksy")).toBeNull();
  });

  it("rechaza la página genérica de categoría/búsqueda y otras páginas de booksy.com", () => {
    expect(resolveBooksyUrl("https://booksy.com/es-es/s/barberia/asturias")).toBeNull();
    expect(resolveBooksyUrl("https://booksy.com/es-es/s/barberia")).toBeNull();
    expect(resolveBooksyUrl("https://booksy.com/es-es/")).toBeNull();
    expect(resolveBooksyUrl("https://booksy.com/")).toBeNull();
    expect(resolveBooksyUrl("https://www.booksy.com/es-es/s/barberia")).toBeNull();
    expect(resolveBooksyUrl("https://biz.booksy.com/es-es")).toBeNull();
    expect(resolveBooksyUrl("https://user:pass@booksy.com/es-es/123_x")).toBeNull();
  });

  it("acepta el perfil, el enlace directo o el subdominio de un negocio", () => {
    const profile = "https://booksy.com/es-es/123456_la-7-barberia_barberia_00000_oviedo";
    expect(resolveBooksyUrl(profile)).toBe(profile);
    expect(resolveBooksyUrl("https://booksy.com/es-es/dl/show-business/123456")).not.toBeNull();
    expect(resolveBooksyUrl("https://la7barberia.booksy.com/a")).not.toBeNull();
  });
});

describe("enlaces de contacto", () => {
  it("WhatsApp usa el número correcto y codifica el mensaje", () => {
    const href = whatsappHref();
    expect(href.startsWith("https://wa.me/34643675376?text=")).toBe(true);
    expect(decodeURIComponent(href.split("text=")[1])).toBe(
      "Hola, he visto la web de La 7 Barbería y quería hacer una consulta.",
    );
    expect(href).not.toContain(" ");
  });

  it("el mensaje por servicio incluye el nombre del servicio", () => {
    expect(serviceWhatsappMessage("Arreglo de barba")).toContain("Arreglo de barba");
  });

  it("teléfono y email", () => {
    expect(telHref).toBe("tel:+34643675376");
    expect(mailtoHref).toBe("mailto:la7barberia@gmail.com");
  });
});

describe("analítica", () => {
  it("solo acepta los eventos definidos", () => {
    expect(isAnalyticsEvent("click_booksy")).toBe(true);
    expect(isAnalyticsEvent("click_tiktok")).toBe(false);
    expect(isAnalyticsEvent(undefined)).toBe(false);
  });
});

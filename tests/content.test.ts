import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import reference from "@/docs/site-config-reference.json";

const SOURCE_DIRS = ["app", "components", "config", "data", "lib"];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|css|txt)$/.test(name) ? [path] : [];
  });
}

const sources = SOURCE_DIRS.flatMap(sourceFiles).map((path) => ({
  path,
  text: readFileSync(path, "utf8"),
}));

/** Datos que solo aparecen en los mockups y no están confirmados. */
const FORBIDDEN = [
  /80\s?m²/i,
  /caf[eé] de cortes[ií]a/i,
  /wi-?fi/i,
  /tiktok/i,
  /facebook/i,
  /respuesta r[aá]pida/i,
  /respuesta en el d[ií]a/i,
  /la7barberiaig/i,
  /lorem ipsum/i,
  /booksy\.com\/[a-z-]+\/s\//i,
  /google\.[a-z.]+\/maps/i,
];

describe("contenido sin datos inventados", () => {
  for (const pattern of FORBIDDEN) {
    it(`no contiene ${pattern}`, () => {
      const hits = sources.filter(({ text }) => pattern.test(text)).map(({ path }) => path);
      expect(hits).toEqual([]);
    });
  }
});

describe("textos aprobados fuera de 03_CONTENT_ES.md", () => {
  const normalized = (path: string) => readFileSync(path, "utf8").replace(/\s+/g, " ");

  it("aviso de Booksy y CTA de reserva", () => {
    const booking = normalized("components/BookingSteps.tsx");
    expect(booking).toContain(
      "La reserva online a través de Booksy estará disponible muy pronto. Mientras tanto, puedes pedir cita por WhatsApp.",
    );
    expect(booking).toContain('label="Pide cita por WhatsApp"');
  });

  it("CTA de cada servicio y título del FAQ", () => {
    expect(normalized("components/Services.tsx")).toMatch(
      /<span> Consultar<span className="sr-only">/,
    );
    expect(normalized("components/Faq.tsx")).toContain('title="Resolvemos tus dudas"');
  });

  it("las respuestas del FAQ sin datos confirmados remiten a WhatsApp", () => {
    const unconfirmed = faqs.filter((faq) =>
      [
        "¿Cómo reservo mi cita?",
        "¿Dónde estáis?",
        "¿Vendéis productos?",
        "¿Cuánto dura cada servicio?",
      ].includes(faq.question),
    );
    expect(unconfirmed).toHaveLength(4);
    for (const faq of unconfirmed) expect(faq.answer).toContain("WhatsApp");
    // Sin horarios, precios, direcciones ni duraciones concretas
    for (const faq of faqs)
      expect(faq.answer).not.toMatch(
        /\d+\s?(€|euros?|min|minutos|h\b|horas)|\d{1,2}:\d{2}|calle|avenida|c\/|\b\d{5}\b/i,
      );
  });
});

describe("configuración alineada con docs/site-config-reference.json", () => {
  it("datos de contacto", () => {
    expect(siteConfig.name).toBe(reference.brand.name);
    expect(siteConfig.tagline).toBe(reference.brand.tagline);
    expect(siteConfig.lang).toBe(reference.brand.language);
    expect(siteConfig.phoneDisplay).toBe(reference.contact.phone_display);
    expect(siteConfig.phoneE164).toBe(reference.contact.phone_e164);
    expect(siteConfig.whatsapp).toBe(reference.contact.whatsapp_number);
    expect(siteConfig.email).toBe(reference.contact.email);
    expect(siteConfig.instagram).toBe(reference.contact.instagram);
    expect(siteConfig.locationLabel).toBe(reference.contact.location_label);
  });

  it("servicios", () => {
    expect(services.map((service) => service.title)).toEqual(reference.services);
  });

  it("datos pendientes siguen sin rellenar", () => {
    expect(Object.values(siteConfig.pending).every((value) => value === null)).toBe(true);
  });
});

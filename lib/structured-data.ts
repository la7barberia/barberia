import { siteConfig } from "@/config/site";
import { faqs } from "@/data/faqs";

/**
 * JSON-LD `BarberShop`. Solo se genera cuando existe la dirección completa
 * (docs/05_TECHNICAL_GUIDE.md): sin ella devuelve `null` y no se publica.
 */
export function barberShopJsonLd() {
  const { streetAddress, postalCode, locality, openingHours } = siteConfig.pending;
  if (!streetAddress || !postalCode || !locality) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/opengraph-image.jpg`,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    sameAs: [siteConfig.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress,
      postalCode,
      addressLocality: locality,
      addressRegion: "Asturias",
      addressCountry: "ES",
    },
    ...(openingHours ? { openingHours } : {}),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Serializa JSON-LD de forma segura para incrustarlo en un <script>. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

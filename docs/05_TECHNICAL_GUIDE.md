# 05 — Guía técnica sugerida para Claude Code

## Stack recomendada

- Next.js 15+ con App Router
- TypeScript
- Tailwind CSS
- lucide-react para iconografía
- next/image
- next/font o Google Fonts compatible
- ESLint
- Prettier

Puede usarse otra stack si el proyecto existente ya está definido, pero mantener las mismas reglas.

## Estructura sugerida

```text
app/
  layout.tsx
  page.tsx
  globals.css

components/
  Header.tsx
  Hero.tsx
  InfoStrip.tsx
  Services.tsx
  About.tsx
  Gallery.tsx
  BookingSteps.tsx
  Contact.tsx
  Footer.tsx
  StickyMobileCTA.tsx

config/
  site.ts

data/
  services.ts
  faqs.ts

public/
  brand/
  images/
```

## Configuración centralizada

Crear `config/site.ts`:

```ts
export const siteConfig = {
  name: "La 7 Barbería",
  tagline: "Corte · Estilo · Confianza",
  phoneDisplay: "+34 643 67 53 76",
  phoneE164: "+34643675376",
  whatsapp: "34643675376",
  email: "la7barberia@gmail.com",
  instagram: "https://www.instagram.com/la7barberia/",
  locationLabel: "Asturias, España",
  booksyUrl: process.env.NEXT_PUBLIC_BOOKSY_URL || "",
};
```

## Arquitectura

- Server Components por defecto.
- Client Components solo donde sean necesarios.
- Evitar librerías pesadas de animación.
- Si se añaden animaciones, respetar `prefers-reduced-motion`.
- Imágenes optimizadas.
- Cero layout shifts evitables.
- Evitar carouseles automáticos agresivos.

## SEO técnico

Configurar metadata:
- title
- description
- Open Graph
- Twitter/X cards
- canonical
- robots
- sitemap

Preparar JSON-LD tipo `Barbershop` / `LocalBusiness` cuando exista dirección exacta.

No inventar dirección ni horario.

## Performance

Objetivos:
- Lighthouse Performance > 90
- Accessibility > 95
- Best Practices > 95
- SEO > 95

Priorizar:
- hero optimizado
- lazy loading
- dimensiones fijas
- fuentes limitadas
- CSS simple
- JavaScript mínimo

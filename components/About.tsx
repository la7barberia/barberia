import { Gem, Star, Users } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { SiteImageFill } from "@/components/ui/site-image";
import { images } from "@/data/images";

const pillars = [
  { label: "Calidad sin compromisos", icon: Gem },
  { label: "Trato personalizado", icon: Users },
  { label: "Un ambiente exclusivo", icon: Star },
];

export function About() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-title"
      className="relative overflow-hidden border-y border-border/60 bg-bg-soft"
    >
      <div className="lg:grid lg:min-h-[520px] lg:grid-cols-12">
        <div className="container-site py-16 sm:py-20 lg:col-span-5 lg:mr-0 lg:max-w-none lg:self-center lg:py-20 lg:pr-0 xl:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          <div data-reveal>
            <SectionHeading
              id="nosotros-title"
              eyebrow="Sobre La 7 Barbería"
              title="Más que un corte,"
              accent="una experiencia"
            />
            <p className="mt-6 max-w-lg text-base text-text-muted sm:text-lg">
              En La 7 Barbería creemos que la barbería es un estilo de vida. Un espacio donde el
              cuidado personal, la buena conversación y la atención al detalle se unen para
              ofrecerte mucho más que un servicio: una experiencia pensada para ti.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
              {pillars.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3 sm:flex-col sm:items-start">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-gold text-gold-light">
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-medium text-text">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Proporción mínima 16:9 (móvil) y 21:10 (escritorio) para que los 3 sillones queden siempre en encuadre. */}
        <div className="relative aspect-[16/9] lg:col-span-7 lg:aspect-[21/10] lg:self-center">
          <SiteImageFill
            image={images.espacio}
            sizes="(min-width: 64rem) 58vw, 100vw"
            labelClassName="right-3 bottom-3 lg:right-6 lg:bottom-6"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-bg-soft via-transparent to-transparent lg:bg-linear-to-r lg:via-transparent lg:via-20%"
          />
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { BooksyButton } from "@/components/ui/cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteImageFill } from "@/components/ui/site-image";
import { services } from "@/data/services";
import { trackAttrs } from "@/lib/analytics";
import { externalLinkProps, hasBooksy, serviceWhatsappMessage, whatsappHref } from "@/lib/links";

export function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="bg-bg py-16 sm:py-20 lg:py-24"
    >
      <div className="container-site">
        <SectionHeading
          id="servicios-title"
          eyebrow="Nuestros servicios"
          title="Cuidado personal"
          accent="con estilo"
          intro="Servicios de barbería profesional pensados para tu imagen, tu confianza y tu mejor versión."
        />

        <ul
          className="-mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5"
          aria-label="Servicios"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <li
                key={service.id}
                data-reveal
                style={{ transitionDelay: `${index * 80}ms` }}
                className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto"
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[border-color,transform,box-shadow] duration-500 ease-fluid hover:-translate-y-1 hover:border-gold/80 hover:shadow-[0_20px_40px_-24px_rgb(216_163_59/0.45)]">
                  <div className="relative aspect-[2/1] overflow-hidden">
                    <SiteImageFill
                      image={service.image}
                      sizes="(min-width: 64rem) 20vw, (min-width: 48rem) 33vw, 78vw"
                      showConceptLabel={false}
                      className="transition-transform duration-700 ease-fluid group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-surface via-surface/10 to-transparent"
                    />
                  </div>

                  <div className="relative flex flex-1 flex-col px-5 pb-5">
                    <span className="-mt-6 grid size-12 place-items-center rounded-full border border-gold bg-bg text-gold-light">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 font-serif text-xl font-semibold text-text">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted">{service.description}</p>

                    <div className="mt-auto pt-5">
                      {hasBooksy ? (
                        <BooksyButton
                          location={`servicio_${service.id}`}
                          size="sm"
                          label="Reservar"
                          className="w-full"
                        />
                      ) : (
                        <a
                          href={whatsappHref(serviceWhatsappMessage(service.title))}
                          {...externalLinkProps}
                          {...trackAttrs("click_whatsapp", `servicio_${service.id}`)}
                          className="inline-flex min-h-6 items-center gap-2 rounded-sm text-sm font-semibold text-gold-light transition-colors duration-300 ease-fluid hover:text-gold"
                        >
                          <WhatsAppIcon className="size-4" />
                          <span>
                            Consultar<span className="sr-only"> {service.title} por WhatsApp</span>
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 transition-transform duration-300 ease-fluid group-hover:translate-x-0.5"
                          />
                          <span className="sr-only"> (se abre en una pestaña nueva)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

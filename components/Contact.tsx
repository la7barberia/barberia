import type { ComponentType, SVGProps } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { InstagramIcon } from "@/components/icons/brand-icons";
import { WhatsAppButton } from "@/components/ui/cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { trackAttrs, type AnalyticsEvent } from "@/lib/analytics";
import { externalLinkProps, mailtoHref, telHref } from "@/lib/links";

type Channel = {
  label: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href?: string;
  event?: AnalyticsEvent;
  external?: boolean;
};

const channels: Channel[] = [
  {
    label: "Llámanos",
    value: siteConfig.phoneDisplay,
    icon: Phone,
    href: telHref,
    event: "click_phone",
  },
  {
    label: "Escríbenos",
    value: siteConfig.email,
    icon: Mail,
    href: mailtoHref,
    event: "click_email",
  },
  {
    label: "Instagram",
    value: siteConfig.instagramHandle,
    icon: InstagramIcon,
    href: siteConfig.instagram,
    event: "click_instagram",
    external: true,
  },
  { label: "Ubicación", value: siteConfig.locationLabel, icon: MapPin },
];

const cardClass =
  "flex h-full items-center gap-4 rounded-xl border border-border bg-surface p-5 transition-[border-color,background-color] duration-300 ease-fluid";

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="border-t border-border/60 bg-bg-soft py-16 sm:py-20"
    >
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contacto-title"
            eyebrow="Contacto"
            title="¿Hablamos?"
            intro="Estamos aquí para resolver tus dudas, asesorarte o ayudarte con tu reserva."
          />
          <WhatsAppButton
            location="contacto"
            variant="whatsapp"
            size="lg"
            label="Escríbenos por WhatsApp"
            withArrow
            className="mt-8 w-full sm:w-auto"
          />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1 xl:grid-cols-2">
          {channels.map(({ label, value, icon: Icon, href, event, external }) => {
            const content = (
              <>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/70 text-gold-light">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                    {label}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] break-words text-text">{value}</span>
                </span>
              </>
            );

            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    {...(external ? externalLinkProps : {})}
                    {...(event ? trackAttrs(event, "contacto") : {})}
                    className={`${cardClass} hover:border-gold/80 hover:bg-gold/5`}
                  >
                    {content}
                    {external ? (
                      <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    ) : null}
                  </a>
                ) : (
                  <div className={cardClass}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

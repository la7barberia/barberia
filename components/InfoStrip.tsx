import type { ComponentType, ReactNode, SVGProps } from "react";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";
import { trackAttrs } from "@/lib/analytics";
import { mailtoHref, telHref } from "@/lib/links";

type Item = {
  label: string;
  value: ReactNode;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const linkClass =
  "inline-flex min-h-6 items-center rounded-sm transition-colors duration-300 ease-fluid hover:text-gold-light focus-visible:text-gold-light";

const items: Item[] = [
  { label: "Ubicación", value: siteConfig.locationLabel, icon: MapPin },
  {
    label: "Teléfono",
    value: (
      <a href={telHref} {...trackAttrs("click_phone", "info_strip")} className={linkClass}>
        {siteConfig.phoneDisplay}
      </a>
    ),
    icon: Phone,
  },
  {
    label: "Email",
    value: (
      <a
        href={mailtoHref}
        {...trackAttrs("click_email", "info_strip")}
        className={`${linkClass} [overflow-wrap:anywhere]`}
      >
        {siteConfig.email}
      </a>
    ),
    icon: Mail,
  },
  { label: "Reservas", value: "Gestionamos las citas a través de Booksy", icon: CalendarDays },
];

export function InfoStrip() {
  return (
    <section aria-label="Información de contacto" className="border-y border-border/60 bg-bg-soft">
      <ul className="container-site grid grid-cols-1 gap-x-8 gap-y-6 py-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0 xl:py-6">
        {items.map(({ label, value, icon: Icon }, index) => (
          <li
            key={label}
            className={`flex items-center gap-4 ${
              index > 0 ? "xl:border-l xl:border-border/40 xl:pl-8" : ""
            } ${index < items.length - 1 ? "xl:pr-8" : ""}`}
          >
            <Icon aria-hidden="true" className="size-7 shrink-0 text-gold" strokeWidth={1.5} />
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">{label}</p>
              <p className="mt-1 text-sm text-text">{value}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

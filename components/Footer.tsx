import { Mail, MapPin, Phone } from "lucide-react";

import { InstagramIcon } from "@/components/icons/brand-icons";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { navItems } from "@/data/navigation";
import { trackAttrs } from "@/lib/analytics";
import { externalLinkProps, mailtoHref, telHref } from "@/lib/links";

const linkClass =
  "inline-flex min-h-6 items-center rounded-sm transition-colors duration-300 ease-fluid hover:text-gold-light focus-visible:text-gold-light";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-bg">
      <div className="container-site grid gap-10 py-12 md:grid-cols-12 md:items-start">
        <div className="md:col-span-4">
          <Logo sizes="112px" className="h-auto w-28" />
          <p className="eyebrow mt-4">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Pie de página" className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-text-muted">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 text-sm text-text-muted md:col-span-4">
          <a
            href={telHref}
            {...trackAttrs("click_phone", "footer")}
            className={`inline-flex items-center gap-3 ${linkClass}`}
          >
            <Phone aria-hidden="true" className="size-4 text-gold" />
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={mailtoHref}
            {...trackAttrs("click_email", "footer")}
            className={`inline-flex items-center gap-3 ${linkClass}`}
          >
            <Mail aria-hidden="true" className="size-4 text-gold" />
            {siteConfig.email}
          </a>
          <p className="inline-flex items-center gap-3">
            <MapPin aria-hidden="true" className="size-4 text-gold" />
            {siteConfig.locationLabel}
          </p>
          <a
            href={siteConfig.instagram}
            {...externalLinkProps}
            {...trackAttrs("click_instagram", "footer")}
            className={`inline-flex items-center gap-3 ${linkClass}`}
          >
            <InstagramIcon className="size-4 text-gold" />
            {siteConfig.instagramHandle}
            <span className="sr-only"> en Instagram (se abre en una pestaña nueva)</span>
          </a>
        </div>
      </div>

      <div className="border-t border-border/40">
        <p className="container-site py-6 text-xs text-text-muted">
          © {year} {siteConfig.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

import { ArrowRight, CalendarDays, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { siteConfig } from "@/config/site";
import { trackAttrs } from "@/lib/analytics";
import { booksyUrl, externalLinkProps, telHref, whatsappHref } from "@/lib/links";

import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";

type CtaProps = {
  /** Zona de la página, para analítica. */
  location: string;
  size?: ButtonSize;
  className?: string;
  label?: string;
};

const arrow = (
  <ArrowRight
    aria-hidden="true"
    className="size-4 transition-transform duration-300 ease-fluid group-hover:translate-x-0.5"
  />
);

/**
 * Botón de reserva en Booksy. No se renderiza mientras no exista la URL real del
 * establecimiento: nunca se muestra un enlace falso ni un botón activo sin destino.
 */
export function BooksyButton({
  location,
  size = "md",
  className,
  label = "Reservar en Booksy",
  variant = "primary",
  withArrow = true,
}: CtaProps & { variant?: ButtonVariant; withArrow?: boolean }) {
  if (!booksyUrl) return null;

  return (
    <a
      href={booksyUrl}
      {...externalLinkProps}
      {...trackAttrs("click_booksy", location)}
      className={buttonClasses(variant, size, className)}
    >
      <CalendarDays aria-hidden="true" className="size-5" />
      <span>{label}</span>
      {withArrow ? arrow : null}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}

export function WhatsAppButton({
  location,
  size = "md",
  className,
  label = "Hablar por WhatsApp",
  variant = "secondary",
  message,
  withArrow = variant === "primary",
}: CtaProps & { variant?: ButtonVariant; message?: string; withArrow?: boolean }) {
  return (
    <a
      href={whatsappHref(message)}
      {...externalLinkProps}
      {...trackAttrs("click_whatsapp", location)}
      className={buttonClasses(variant, size, className)}
    >
      <WhatsAppIcon className="size-5" />
      <span>{label}</span>
      {withArrow ? arrow : null}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}

export function PhoneButton({
  location,
  size = "md",
  className,
  label = "Llamar",
  variant = "secondary",
}: CtaProps & { variant?: ButtonVariant }) {
  return (
    <a
      href={telHref}
      {...trackAttrs("click_phone", location)}
      aria-label={`${label} al ${siteConfig.phoneDisplay}`}
      className={buttonClasses(variant, size, className)}
    >
      <Phone aria-hidden="true" className="size-5" />
      <span>{label}</span>
    </a>
  );
}

/**
 * Pareja de CTA principal + secundario.
 * Con Booksy: Reservar en Booksy + Hablar por WhatsApp.
 * Sin Booksy: WhatsApp pasa a ser el CTA principal y el teléfono el secundario.
 */
export function PrimaryCtas({
  location,
  size = "lg",
  className = "",
  itemClassName = "",
}: {
  location: string;
  size?: ButtonSize;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 ${className}`}>
      {booksyUrl ? (
        <>
          <BooksyButton location={location} size={size} className={itemClassName} />
          <WhatsAppButton location={location} size={size} className={itemClassName} />
        </>
      ) : (
        <>
          <WhatsAppButton
            location={location}
            size={size}
            variant="primary"
            className={itemClassName}
          />
          <PhoneButton location={location} size={size} label="Llamar" className={itemClassName} />
        </>
      )}
    </div>
  );
}

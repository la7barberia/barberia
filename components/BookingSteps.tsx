import { CalendarDays, CircleCheck, Clock } from "lucide-react";

import { BooksyButton, PhoneButton, WhatsAppButton } from "@/components/ui/cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { bookingWhatsappMessage, hasBooksy } from "@/lib/links";

const steps = [
  { title: "Elige el servicio", icon: CalendarDays },
  { title: "Escoge fecha y hora", icon: Clock },
  { title: "Confirma tu cita", icon: CircleCheck },
];

export function BookingSteps() {
  return (
    <section
      id="reserva"
      aria-labelledby="reserva-title"
      className="border-y border-border/60 bg-bg-soft py-16 sm:py-20"
    >
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="reserva-title"
              eyebrow="Tu cita en Booksy"
              title="Reservar es muy fácil"
              intro="Gestionamos todas las citas a través de Booksy para ofrecerte un servicio rápido, cómodo y seguro."
            />
          </div>

          <ol className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {steps.map(({ title, icon: Icon }, index) => (
              <li
                key={title}
                data-reveal
                style={{ transitionDelay: `${index * 100}ms` }}
                className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-col sm:items-start sm:p-6"
              >
                <span className="relative grid size-14 shrink-0 place-items-center rounded-full border border-gold text-gold-light">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-gold text-xs font-bold text-[#0b0b0b]">
                    {index + 1}
                    <span className="sr-only">.</span>
                  </span>
                </span>
                <span className="font-serif text-lg font-semibold text-text">{title}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-col gap-6 rounded-xl border border-border bg-surface p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          {hasBooksy ? (
            <>
              <p className="text-base text-text-muted">
                Elige tu servicio, fecha y hora en Booksy y recibe la confirmación de tu cita.
              </p>
              <BooksyButton location="reserva" size="lg" className="w-full sm:w-auto" />
            </>
          ) : (
            <>
              <p className="max-w-xl text-base text-text-muted">
                La reserva online a través de Booksy estará disponible muy pronto. Mientras tanto,
                puedes pedir cita por WhatsApp.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton
                  location="reserva"
                  variant="primary"
                  size="lg"
                  label="Pide cita por WhatsApp"
                  message={bookingWhatsappMessage}
                  className="w-full sm:w-auto"
                />
                <PhoneButton
                  location="reserva"
                  size="lg"
                  label="Llamar"
                  className="w-full sm:w-auto"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

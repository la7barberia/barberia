import { BooksyButton, PhoneButton, WhatsAppButton } from "@/components/ui/cta";
import { hasBooksy } from "@/lib/links";

/** Barra CTA inferior fija en móvil, respetando la safe area de iOS. */
export function StickyMobileCTA() {
  return (
    <aside
      aria-label="Contacto rápido"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-bg/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-2 gap-3">
        {hasBooksy ? (
          <>
            <BooksyButton
              location="sticky"
              size="md"
              label="Reservar"
              withArrow={false}
              className="w-full px-3"
            />
            <WhatsAppButton
              location="sticky"
              size="md"
              variant="whatsapp"
              label="WhatsApp"
              className="w-full px-3"
            />
          </>
        ) : (
          <>
            <WhatsAppButton
              location="sticky"
              size="md"
              variant="primary"
              label="WhatsApp"
              withArrow={false}
              className="w-full px-3"
            />
            <PhoneButton location="sticky" size="md" label="Llamar" className="w-full px-3" />
          </>
        )}
      </div>
    </aside>
  );
}

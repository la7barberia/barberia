import { ChevronDown } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/faqs";

export function Faq() {
  return (
    <section
      id="preguntas"
      aria-labelledby="preguntas-title"
      className="bg-bg py-16 sm:py-20 lg:py-24"
    >
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="preguntas-title"
            eyebrow="Preguntas frecuentes"
            title="Resolvemos tus dudas"
          />
        </div>

        <div className="divide-y divide-border/50 rounded-xl border border-border bg-surface lg:col-span-8">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-5 font-serif text-lg font-semibold text-text transition-colors duration-300 ease-fluid hover:text-gold-light sm:px-6 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-gold transition-transform duration-500 ease-fluid group-open:rotate-180"
                />
              </summary>
              <p className="px-5 pb-5 text-base text-text-muted sm:px-6">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

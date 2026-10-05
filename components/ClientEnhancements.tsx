"use client";

import { useEffect } from "react";

import { isAnalyticsEvent, track } from "@/lib/analytics";

/**
 * Mejoras progresivas globales (la página funciona sin ellas):
 * - Analítica: convierte los clics en elementos con `data-track` en eventos.
 * - Aparición al hacer scroll: marca `data-revealed` en los elementos `data-reveal`.
 */
export function ClientEnhancements() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      const name = target?.dataset.track;
      if (!target || !isAnalyticsEvent(name)) return;
      track({ event: name, location: target.dataset.trackLocation });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}

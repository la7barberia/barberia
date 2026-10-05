"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";
import { BooksyButton, PrimaryCtas, WhatsAppButton } from "@/components/ui/cta";
import { navItems } from "@/data/navigation";
import { hasBooksy } from "@/lib/links";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(navItems[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  /** Si el menú se cierra al navegar, el foco va a la sección destino y no vuelve al botón. */
  const focusTargetOnClose = useRef<HTMLElement | null>(null);

  // Fondo sólido de la cabecera al salir de la parte superior de la página.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Sección actual para marcar el enlace activo.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const openMenu = useCallback(() => {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const navigateFromMenu = useCallback((event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    focusTargetOnClose.current = target;
    dialogRef.current?.close();
    history.pushState(null, "", `#${id}`);
    // Sin opciones: respeta `scroll-behavior` (suave o instantáneo con reduced motion).
    target.scrollIntoView();
  }, []);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Cierra el menú si se pasa a escritorio con él abierto.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 64rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close();
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-lg bg-gold px-4 py-3 font-semibold text-[#0b0b0b] focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Saltar al contenido
      </a>

      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-6"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-fluid ${
          scrolled
            ? "border-b border-border/40 bg-bg/90 backdrop-blur-md"
            : "border-b border-transparent bg-linear-to-b from-black/70 to-transparent"
        }`}
      >
        <div
          className={`container-site flex items-center justify-between gap-6 transition-[height] duration-500 ease-fluid ${
            scrolled ? "h-16 lg:h-20" : "h-20 lg:h-24"
          }`}
        >
          <a
            href="#inicio"
            aria-label="La 7 Barbería, ir al inicio"
            className="shrink-0 rounded-full"
          >
            <Logo
              eager
              sizes="(min-width: 64rem) 88px, 72px"
              className={`h-auto transition-[width] duration-500 ease-fluid ${
                scrolled ? "w-14 lg:w-[4.5rem]" : "w-[4.5rem] lg:w-[5.5rem]"
              }`}
            />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => {
                const active = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={active ? "location" : undefined}
                      className={`relative py-2 text-sm font-medium transition-colors duration-300 ease-fluid after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-500 after:ease-fluid ${
                        active
                          ? "text-gold-light after:scale-x-100"
                          : "text-text after:scale-x-0 hover:text-gold-light hover:after:scale-x-100"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Contenedor propio: `hidden` en el propio botón perdía frente a su `inline-flex`. */}
            <div className="hidden sm:block">
              {hasBooksy ? (
                <BooksyButton location="header" size="sm" variant="secondary" withArrow={false} />
              ) : (
                <WhatsAppButton location="header" size="sm" variant="secondary" label="WhatsApp" />
              )}
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={openMenu}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-gold-light transition-colors duration-300 ease-fluid hover:bg-gold/10 lg:hidden"
            >
              <Menu aria-hidden="true" className="size-6" />
              <span className="sr-only">Abrir menú</span>
            </button>
          </div>
        </div>
      </header>

      <dialog
        id="menu-movil"
        ref={dialogRef}
        aria-label="Menú"
        onClose={() => {
          setMenuOpen(false);
          const target = focusTargetOnClose.current;
          focusTargetOnClose.current = null;
          if (target) {
            if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          } else {
            menuButtonRef.current?.focus();
          }
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg/95 p-0 text-text backdrop-blur-xl backdrop:bg-black/80 lg:hidden"
      >
        <div className="container-site flex min-h-full flex-col pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between">
            <Logo sizes="64px" className="h-auto w-16" />
            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-gold-light transition-colors duration-300 ease-fluid hover:bg-gold/10"
            >
              <X aria-hidden="true" className="size-6" />
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>

          <nav aria-label="Menú móvil" className="mt-10">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => navigateFromMenu(event, item.id)}
                    aria-current={activeId === item.id ? "location" : undefined}
                    className="block rounded-lg py-3 font-serif text-3xl text-text transition-colors duration-300 ease-fluid hover:text-gold-light aria-[current=location]:text-gold-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-10">
            <PrimaryCtas location="menu_movil" size="lg" itemClassName="w-full sm:w-auto" />
          </div>
        </div>
      </dialog>
    </>
  );
}

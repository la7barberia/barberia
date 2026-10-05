import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { buttonClasses } from "@/components/ui/button-styles";

export const metadata: Metadata = {
  title: "Página no encontrada | La 7 Barbería",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="container-site flex min-h-dvh flex-col items-center justify-center py-16 text-center">
      <Logo sizes="128px" className="h-auto w-32" eager />
      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-text sm:text-5xl">
        Esta página no existe
      </h1>
      <p className="mt-4 max-w-md text-base text-text-muted">
        Puede que el enlace haya cambiado. Vuelve al inicio para ver nuestros servicios y reservar
        tu cita.
      </p>
      <Link href="/" className={buttonClasses("primary", "lg", "mt-8")}>
        Volver al inicio
      </Link>
    </main>
  );
}

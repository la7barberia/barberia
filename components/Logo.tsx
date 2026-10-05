import Image from "next/image";

import logo from "@/public/brand/la7barberia-logo.png";

type LogoProps = {
  className?: string;
  sizes?: string;
  /** Carga inmediata (cabecera) sin preload, para no competir con la imagen LCP del hero. */
  eager?: boolean;
};

/**
 * Logo oficial temporal (PNG dorado sobre negro). No existe todavía versión SVG ni transparente:
 * `logo-blend` funde el fondo negro con las superficies oscuras sin modificar el archivo.
 */
export function Logo({ className = "size-20", sizes = "80px", eager = false }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="La 7 Barbería"
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={`logo-blend ${className}`}
    />
  );
}

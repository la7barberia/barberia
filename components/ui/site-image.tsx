import Image from "next/image";

import type { SiteImage } from "@/data/images";

type Props = {
  image: SiteImage;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Muestra la etiqueta "Recreación conceptual" si la imagen no es una foto real. */
  showConceptLabel?: boolean;
  labelClassName?: string;
};

/** Imagen a sangre dentro de un contenedor `relative`. */
export function SiteImageFill({
  image,
  sizes,
  className = "",
  priority = false,
  showConceptLabel = true,
  labelClassName = "right-3 bottom-3",
}: Props) {
  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        placeholder={priority ? "empty" : "blur"}
        className={`object-cover ${className}`}
        style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
      />
      {showConceptLabel && image.kind === "concept" ? (
        <ConceptLabel className={labelClassName} />
      ) : null}
    </>
  );
}

export function ConceptLabel({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 rounded-sm bg-black/80 px-2 py-0.5 text-xs text-text backdrop-blur-sm ${className}`}
    >
      Recreación conceptual
    </span>
  );
}

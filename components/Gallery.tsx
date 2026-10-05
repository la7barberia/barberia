import { SectionHeading } from "@/components/ui/section-heading";
import { SiteImageFill } from "@/components/ui/site-image";
import { galleryImages } from "@/data/images";

export function Gallery() {
  const hasConcepts = galleryImages.some((image) => image.kind === "concept");

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="bg-bg py-16 sm:py-20 lg:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-4" data-reveal>
          <SectionHeading
            id="galeria-title"
            eyebrow="Nuestro espacio"
            title="Un ambiente exclusivo"
            intro="Un espacio diseñado para que disfrutes de una experiencia única, con la mejor atmósfera, estilo y comodidad."
          />
          {hasConcepts ? (
            <p className="mt-6 max-w-sm text-sm text-text-muted">
              Las imágenes son recreaciones conceptuales del espacio. Pronto publicaremos
              fotografías reales del local.
            </p>
          ) : null}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {galleryImages.map((image, index) => (
            <li
              key={image.src.src}
              data-reveal
              style={{ transitionDelay: `${index * 100}ms` }}
              className="group relative aspect-[2/1] overflow-hidden rounded-xl border border-border"
            >
              <SiteImageFill
                image={image}
                sizes="(min-width: 64rem) 32vw, (min-width: 40rem) 50vw, 100vw"
                className="transition-transform duration-700 ease-fluid group-hover:scale-[1.03]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

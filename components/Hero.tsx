import { PrimaryCtas } from "@/components/ui/cta";
import { SiteImageFill } from "@/components/ui/site-image";
import { images } from "@/data/images";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-bg"
    >
      {/*
        La imagen mantiene siempre una proporción ancha (4:3 en móvil, 16:10 en tablet, 16:9 en
        escritorio) para que los 3 sillones queden en encuadre: con proporciones más estrechas el
        recorte deja fuera uno o dos sillones.
      */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:absolute lg:top-1/2 lg:right-0 lg:aspect-[16/9] lg:w-[60%] lg:-translate-y-1/2">
        <SiteImageFill
          image={images.hero}
          priority
          sizes="(min-width: 64rem) 60vw, 100vw"
          labelClassName="right-3 top-24 lg:top-auto lg:right-6 lg:bottom-6"
        />
        {/* Fundidos hacia el fondo: abajo en móvil; izquierda, arriba y abajo en escritorio. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-bg via-transparent via-30% to-black/40 lg:bg-linear-to-r lg:from-bg lg:via-transparent lg:via-15% lg:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/70 to-transparent lg:h-24 lg:from-bg"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-24 bg-linear-to-t from-bg to-transparent lg:block"
        />
      </div>

      <div className="container-site relative -mt-6 pb-16 lg:mt-0 lg:flex lg:min-h-[680px] lg:items-center lg:pt-28 lg:pb-20">
        <div className="max-w-xl">
          <p className="eyebrow">Corte · Estilo · Confianza</p>
          <h1
            id="hero-title"
            className="mt-4 font-serif text-5xl leading-none font-bold tracking-tight text-text sm:text-6xl lg:text-7xl"
          >
            Tu estilo <br className="hidden sm:block" />
            empieza <span className="text-gold-gradient">aquí</span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-text sm:text-lg">
            Más que un corte, una experiencia. En La 7 Barbería combinamos técnica, estilo y un
            trato personalizado para que siempre saques tu mejor versión.
          </p>
          <PrimaryCtas location="hero" className="mt-8" itemClassName="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}

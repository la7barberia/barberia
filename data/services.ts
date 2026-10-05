import type { ComponentType, SVGProps } from "react";
import { Droplet, Scissors, ShoppingCart, UserRound } from "lucide-react";

import { BeardIcon } from "@/components/icons/brand-icons";
import { images, type SiteImage } from "@/data/images";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  image: SiteImage;
};

// Textos de docs/03_CONTENT_ES.md. Precios y duraciones: pendientes, no añadir sin confirmar.
export const services: Service[] = [
  {
    id: "corte",
    title: "Corte de cabello",
    description: "Estilo y precisión para tu mejor versión.",
    icon: Scissors,
    image: images.corte,
  },
  {
    id: "barba",
    title: "Arreglo de barba",
    description: "Líneas perfectas, estilo con carácter.",
    icon: BeardIcon,
    image: images.barba,
  },
  {
    id: "tratamientos",
    title: "Tratamientos capilares",
    description: "Cuida tu cabello, invierte en ti.",
    icon: Droplet,
    image: images.tratamientos,
  },
  {
    id: "asesoria",
    title: "Asesoría de imagen",
    description: "Estilo que transmite quién eres.",
    icon: UserRound,
    image: images.asesoria,
  },
  {
    id: "productos",
    title: "Venta de productos",
    description: "Productos seleccionados para tu cuidado diario.",
    icon: ShoppingCart,
    image: images.productos,
  },
];

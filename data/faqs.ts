import { siteConfig } from "@/config/site";
import { hasBooksy } from "@/lib/links";

export type Faq = { question: string; answer: string };

// Respuestas sin datos inventados (horarios, precios, dirección, duraciones...).
// Cuando falta información confirmada, se remite al cliente a WhatsApp.
export const faqs: Faq[] = [
  {
    question: "¿Cómo reservo mi cita?",
    answer: hasBooksy
      ? "Gestionamos las citas a través de Booksy: eliges el servicio, escoges fecha y hora y confirmas tu cita. Si lo prefieres, también puedes escribirnos por WhatsApp."
      : "La reserva online a través de Booksy estará disponible muy pronto. Mientras tanto, puedes pedir cita por WhatsApp.",
  },
  {
    question: "¿Puedo escribir por WhatsApp?",
    answer: `Sí. Escríbenos al ${siteConfig.phoneDisplay} para resolver tus dudas, pedirnos asesoramiento o ayudarte con tu reserva.`,
  },
  {
    question: "¿Dónde estáis?",
    answer:
      "Estamos en Asturias, España. Para saber cómo llegar, escríbenos por WhatsApp y te lo indicamos.",
  },
  {
    question: "¿Qué servicios ofrecéis?",
    answer:
      "Corte de cabello, arreglo de barba, tratamientos capilares, asesoría de imagen y venta de productos de cuidado personal.",
  },
  {
    question: "¿Vendéis productos?",
    answer:
      "Sí, tenemos productos seleccionados para tu cuidado diario. Escríbenos por WhatsApp si quieres saber cuáles tenemos disponibles.",
  },
  {
    question: "¿Cuánto dura cada servicio?",
    answer: "Depende del servicio que elijas. Escríbenos por WhatsApp y te informamos.",
  },
];

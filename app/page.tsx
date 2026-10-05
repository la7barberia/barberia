import { About } from "@/components/About";
import { BookingSteps } from "@/components/BookingSteps";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InfoStrip } from "@/components/InfoStrip";
import { Services } from "@/components/Services";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { barberShopJsonLd, faqJsonLd, serializeJsonLd } from "@/lib/structured-data";

// Regenera la página una vez al día (mantiene al día el año del copyright).
export const revalidate = 86400;

export default function HomePage() {
  const jsonLd = [faqJsonLd(), barberShopJsonLd()].filter((item) => item !== null);

  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <InfoStrip />
        <Services />
        <About />
        <Gallery />
        <BookingSteps />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyMobileCTA />
      {jsonLd.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
        />
      ))}
    </>
  );
}

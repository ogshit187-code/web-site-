import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import Portfolio from "@/components/landing/Portfolio";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DTF & Вышивка СПБ",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Санкт‑Петербург",
      addressCountry: "RU",
    },
    areaServed: "RU",
    url: "/",
    email: "hello@example.com",
    telephone: "+7 (812) 000-00-00",
    priceRange: "₽₽",
    makesOffer: [
      {
        "@type": "Offer",
        name: "Печать DTF — логотип",
        price: 200,
        priceCurrency: "RUB",
      },
      {
        "@type": "Offer",
        name: "Печать DTF — полноцветный принт",
        price: 1300,
        priceCurrency: "RUB",
      },
      {
        "@type": "Offer",
        name: "Машинная вышивка — надпись",
        price: 300,
        priceCurrency: "RUB",
      },
      {
        "@type": "Offer",
        name: "Машинная вышивка — крупный рисунок",
        price: 2000,
        priceCurrency: "RUB",
      },
    ],
  };

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
};

export default Index;

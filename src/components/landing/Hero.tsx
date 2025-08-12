import heroImg from "@/assets/hero-apparel.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section id="top" aria-label="Главный экран" className="relative min-h-screen">
      <div className="relative isolate h-screen">
        <img
          src={heroImg}
          alt="DTF печать и машинная вышивка на одежде — примеры изделий"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <div className="mb-6">
                <span className="celine-heading text-white/90 tracking-[0.2em] text-xs">
                  САНКТ‑ПЕТЕРБУРГ
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[0.9] text-white mb-8 tracking-tight">
                ПЕЧАТЬ И ВЫШИВКА<br />
                НА ОДЕЖДЕ
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-12 font-light leading-relaxed max-w-lg">
                От идеи до готового изделия — всего за 1–3 дня. 
                Профессиональное качество и индивидуальный подход.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#calculator">
                  <Button className="bg-white text-black hover:bg-gray-100 px-12 h-14 rounded-none celine-heading tracking-[0.1em] transition-colors duration-300">
                    КАЛЬКУЛЯТОР
                  </Button>
                </a>
                <a href="#portfolio">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-12 h-14 rounded-none celine-heading tracking-[0.1em] transition-colors duration-300">
                    ПОРТФОЛИО
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

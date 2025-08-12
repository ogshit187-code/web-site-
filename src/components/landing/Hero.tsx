import heroImg from "@/assets/hero-apparel.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section id="top" aria-label="Главный экран" className="relative min-h-screen bg-white">
      <div className="relative isolate h-screen pt-24">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 parallax-slow">
          <img
            src={heroImg}
            alt="SMOLIN ATELIER — процесс создания уникальных принтов"
            className="w-full h-full object-cover opacity-80"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/60" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl">
              <div className="mb-8">
                <span className="fashion-heading text-black/60">
                  ATELIER • САНКТ‑ПЕТЕРБУРГ
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.85] text-black mb-12 max-w-3xl">
                Каждый дизайн<br />
                <em className="italic font-light">уникален</em>
              </h1>
              
              <div className="max-w-xl mb-16">
                <p className="text-lg md:text-xl text-black/80 leading-relaxed mb-6">
                  Мы создаём индивидуальные принты с помощью ручной разработки и AI-технологий. 
                  Каждое изделие — это результат творческого процесса и технического мастерства.
                </p>
                <p className="text-base text-black/60 leading-relaxed">
                  Индивидуальный кастом и тиражные заказы для маркетплейсов. 
                  Печать DTF и машинная вышивка премиального качества.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="#calculator" className="group">
                  <Button className="bg-black text-white hover:gold-bg hover:text-black px-16 h-16 rounded-none fashion-heading tracking-[0.15em] transition-all duration-700 shadow-micro hover:shadow-soft group-hover:scale-105">
                    РАССЧИТАТЬ ЗАКАЗ
                  </Button>
                </a>
                <a href="#portfolio" className="group">
                  <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white px-16 h-16 rounded-none fashion-heading tracking-[0.15em] transition-all duration-700 group-hover:scale-105">
                    СМОТРЕТЬ РАБОТЫ
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-16 right-8 z-20">
          <div className="fashion-heading text-black/40 text-right">
            <div>СРОК ИЗГОТОВЛЕНИЯ</div>
            <div className="text-2xl font-light mt-1">1 ДЕНЬ</div>
          </div>
        </div>
      </div>
    </section>
  );
}

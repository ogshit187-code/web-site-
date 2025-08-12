import heroImg from "@/assets/hero-apparel.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section id="top" aria-label="Главный экран" className="relative min-h-screen bg-white">
      <div className="relative h-screen">
        {/* Large Product Image like Celine */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src={heroImg}
              alt="SMOLIN ATELIER"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          
          {/* Right side - Content */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="max-w-lg text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
                SMOLIN ATELIER
              </h1>
              
              <p className="text-base text-black/70 mb-8 leading-relaxed">
                Печать DTF и машинная вышивка на одежде в Санкт-Петербурге
              </p>
              
              <div className="space-y-4">
                <a href="#calculator">
                  <Button className="w-full bg-black text-white hover:bg-gray-800 h-14 rounded-none font-light tracking-[0.1em] text-sm transition-colors duration-300">
                    КАЛЬКУЛЯТОР СТОИМОСТИ
                  </Button>
                </a>
                
                <div className="text-xs text-black/50 uppercase tracking-[0.2em]">
                  Срок изготовления 1 день
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

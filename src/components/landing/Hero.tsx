import heroImg from "@/assets/hero-apparel.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section id="top" aria-label="Главный экран" className="pt-16 min-h-screen bg-white animate-fade-in">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          
          {/* Content - Left side */}
          <div className="lg:col-span-5 space-y-8 animate-slide-up">
            {/* Brand category */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-minimal">
              <div className="w-2 h-2 bg-brand-blue circle"></div>
              <span className="minimal-heading">Ателье</span>
            </div>
            
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-medium leading-[0.95] tracking-tight">
                Печать и вышивка 
                <span className="block text-muted-foreground">на одежде</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Профессиональная DTF печать и машинная вышивка в Санкт-Петербурге. 
                Качественно и быстро.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#calculator">
                <Button className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8 rounded-minimal hover-scale">
                  Рассчитать стоимость
                </Button>
              </a>
              <a href="#about">
                <Button variant="outline" className="h-12 px-8 rounded-minimal hover-scale">
                  Узнать больше
                </Button>
              </a>
            </div>
            
            {/* Quick info */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div>
                <div className="text-2xl font-medium">1</div>
                <div className="minimal-heading">День изготовления</div>
              </div>
              <div>
                <div className="text-2xl font-medium">200₽</div>
                <div className="minimal-heading">Минимальная цена</div>
              </div>
              <div>
                <div className="text-2xl font-medium">24/7</div>
                <div className="minimal-heading">Консультации</div>
              </div>
            </div>
          </div>
          
          {/* Visual - Right side */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-large shadow-card hover-scale">
                <img
                  src={heroImg}
                  alt="SMOLIN ATELIER - Печать и вышивка на одежде"
                  className="w-full h-[600px] object-cover"
                  loading="eager"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-brand-green rounded-large animate-fade-in"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-brand-purple circle animate-fade-in"></div>
              
              {/* Pattern background */}
              <div className="absolute -z-10 top-8 left-8 w-32 h-32 pattern-dots opacity-30"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

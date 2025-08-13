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
          <div className="flex items-center justify-center p-8 lg:p-16 relative">
            {/* Off-White style background pattern */}
            <div className="absolute inset-0 off-white-stripes opacity-20"></div>
            
            <div className="max-w-lg text-center relative z-10">
              {/* Off-White style category label */}
              <div className="mb-8">
                <span className="font-mono text-xs tracking-[0.3em] text-black/50 border border-black/20 px-3 py-1">
                  "FASHION ATELIER"
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 relative">
                "SMOLIN
                <span className="absolute -top-2 -right-6 text-sm font-mono text-black/30">™</span>
              </h1>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 relative">
                ATELIER"
                <span className="absolute -bottom-2 -right-4 text-xs font-mono text-black/50">
                  EST. 2024
                </span>
              </div>
              
              <div className="mb-8 relative">
                <p className="text-sm font-mono text-black/70 leading-relaxed tracking-[0.1em]">
                  DTF PRINTING × MACHINE EMBROIDERY
                </p>
                <p className="text-sm font-mono text-black/70 leading-relaxed tracking-[0.1em]">
                  SAINT PETERSBURG, RUSSIA
                </p>
                {/* Off-White arrow */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-black/20">
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
                    <path d="M10.5 1L15 5L10.5 9M15 5H1" stroke="currentColor" strokeWidth="1" fill="none"/>
                  </svg>
                </div>
              </div>
              
              <div className="space-y-6">
                <a href="#calculator" className="block group relative">
                  <div className="bg-black text-white py-4 px-8 font-mono text-sm tracking-[0.2em] relative overflow-hidden transition-all duration-300 group-hover:bg-white group-hover:text-black border-2 border-black">
                    "CALCULATE PRICE"
                    {/* Off-White diagonal animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 text-xs font-mono text-black/30">
                    01
                  </div>
                </a>
                
                {/* Off-White style info */}
                <div className="border-l-2 border-black pl-4">
                  <div className="text-xs font-mono text-black/50 uppercase tracking-[0.2em]">
                    "PRODUCTION TIME"
                  </div>
                  <div className="text-sm font-bold tracking-[0.1em]">
                    1 DAY
                  </div>
                </div>
              </div>
            </div>
            
            {/* Off-White decorative numbers */}
            <div className="absolute top-8 right-8 font-mono text-xs text-black/20">
              001/024
            </div>
            <div className="absolute bottom-8 left-8 font-mono text-xs text-black/20 rotate-90">
              "HERO SECTION"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

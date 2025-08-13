import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { href: "#about", label: "О нас" },
  { href: "#services", label: "Услуги и цены" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#process", label: "Как мы работаем" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export default function Navbar() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full bg-white border-b-2 border-black"
    )}>
      {/* Off-White style decorative top bar */}
      <div className="bg-black text-white py-1">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center text-xs font-mono">
            <span>"DIGITAL FASHION ATELIER"</span>
            <span>EST. 2024 → SPB</span>
          </div>
        </div>
      </div>
      
      <nav className="container mx-auto flex h-20 items-center justify-between px-8 relative">
        {/* Logo with Off-White quotes */}
        <div className="flex items-center">
          <a href="#top" className="relative">
            <div className="text-2xl font-bold tracking-[0.2em] text-black relative">
              "SMOLIN
              <span className="absolute -top-1 -right-4 text-xs font-mono text-black/50">™</span>
            </div>
            <div className="text-sm font-mono text-black/70 tracking-[0.3em] mt-1">
              ATELIER"
            </div>
            {/* Off-White arrow */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-black/30">
              <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor">
                <path d="M13.5 1L19 6.5L13.5 12M19 6.5H1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          </a>
        </div>
        
        {/* Navigation with Off-White style */}
        <div className="hidden lg:flex items-center gap-12">
          {NAV_ITEMS.map((item, index) => (
            <div key={item.href} className="relative group">
              <a
                href={item.href}
                className="text-sm font-mono uppercase tracking-[0.2em] text-black hover:text-black/60 transition-colors duration-300 relative"
              >
                "{item.label.toUpperCase()}"
                <span className="absolute -top-2 -right-3 text-xs text-black/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
              {/* Hover underline */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </div>
        
        {/* CTA Button Off-White style */}
        <div className="flex items-center gap-6">
          <a href="#calculator" className="group relative">
            <div className="bg-black text-white px-8 py-3 font-mono text-sm tracking-[0.1em] relative overflow-hidden transition-all duration-300 group-hover:bg-white group-hover:text-black border-2 border-black">
              "CALCULATE"
              {/* Off-White diagonal stripes on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>
            <div className="absolute -bottom-2 -right-2 text-xs font-mono text-black/50">
              01
            </div>
          </a>
          
          <button 
            aria-label="Menu" 
            className="relative p-3 group"
            onClick={() => setIsSidebarOpen(true)}
          >
            <div className="flex flex-col gap-1">
              <div className="w-6 h-0.5 bg-black transition-all duration-300 group-hover:rotate-45 group-hover:translate-y-1.5"></div>
              <div className="w-6 h-0.5 bg-black transition-all duration-300 group-hover:opacity-0"></div>
              <div className="w-6 h-0.5 bg-black transition-all duration-300 group-hover:-rotate-45 group-hover:-translate-y-1.5"></div>
            </div>
            <span className="absolute -bottom-1 -right-1 text-xs font-mono text-black/30">MENU</span>
          </button>
        </div>
        
        {/* Off-White decorative elements */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-black/10"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-black/10"></div>
      </nav>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </header>
  );
}

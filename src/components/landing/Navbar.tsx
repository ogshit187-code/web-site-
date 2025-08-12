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
      "fixed top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95"
    )}>
      <nav className="container mx-auto flex h-16 items-center justify-between px-8">
        <a href="#top" className="text-xl font-light tracking-[0.1em] text-black">
          SMOLIN ATELIER
        </a>
        
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-[0.1em] text-black/70 hover:text-black transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <a href="#calculator">
            <Button className="bg-black text-white hover:bg-gray-800 px-6 h-10 rounded-none text-xs uppercase tracking-[0.1em] transition-colors duration-300">
              КАЛЬКУЛЯТОР
            </Button>
          </a>
          <button 
            aria-label="Меню" 
            className="text-black/60 hover:text-black transition-colors duration-300 p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="size-5" strokeWidth={1} />
          </button>
        </div>

        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </nav>
    </header>
  );
}

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
      "fixed top-0 z-50 w-full border-b border-black/5 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90"
    )}>
      <nav className="container mx-auto flex h-24 items-center justify-between px-8">
        <div className="flex flex-col">
          <a href="#top" className="atelier-title text-2xl text-black tracking-[0.02em]">
            SMOLIN ATELIER
          </a>
          <span className="fashion-heading mt-0.5">
            ПЕЧАТЬ DTF И МАШИННАЯ ВЫШИВКА В САНКТ-ПЕТЕРБУРГЕ — СРОК ИЗГОТОВЛЕНИЯ 1 ДЕНЬ
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-12">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="fashion-heading text-black/70 hover:text-black transition-all duration-500 hover:tracking-[0.2em]"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <a href="#calculator">
            <Button className="bg-black text-white hover:sand-bg hover:text-black px-12 h-14 rounded-none fashion-heading tracking-[0.1em] transition-all duration-500 shadow-micro hover:shadow-soft">
              РАССЧИТАТЬ ЗАКАЗ
            </Button>
          </a>
          <button 
            aria-label="Меню" 
            className="text-black/60 hover:text-black transition-colors duration-300 p-3"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="size-5" strokeWidth={1.5} />
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

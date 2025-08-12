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
      "sticky top-0 z-50 w-full border-b border-gray-200/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95"
    )}>
      <nav className="container mx-auto flex h-20 items-center justify-between px-6">
        <a href="#top" className="celine-heading text-black tracking-[0.15em]">
          PRINT STITCH STUDIO
        </a>
        {!isMobile && (
          <ul className="hidden gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="celine-heading text-gray-700 hover:text-black transition-colors duration-300 tracking-[0.1em]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center gap-4">
          <a href="#calculator">
            <Button className="bg-black text-white hover:bg-gray-800 px-8 h-12 rounded-none celine-heading tracking-[0.05em] transition-colors duration-300">
              КАЛЬКУЛЯТОР
            </Button>
          </a>
          <button 
            aria-label="Меню" 
            className="text-gray-700 hover:text-black transition-colors duration-300 p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="size-6" strokeWidth={1} />
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

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-border shadow-minimal"
    )}>
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Minimal geometric logo */}
        <div className="flex items-center gap-3">
          {/* Geometric brand mark */}
          <div className="relative">
            <div className="w-8 h-8 bg-foreground rounded-minimal"></div>
            <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-minimal"></div>
          </div>
          
          <a href="#top" className="brand-text text-lg">
            SMOLIN
          </a>
        </div>
        
        {/* Clean navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="minimal-heading hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
        
        {/* Simple CTA */}
        <div className="flex items-center gap-4">
          <a href="#calculator">
            <Button className="bg-foreground text-background hover:bg-foreground/90 h-10 px-6 rounded-minimal">
              Калькулятор
            </Button>
          </a>
        </div>
      </nav>
    </header>
  );
}

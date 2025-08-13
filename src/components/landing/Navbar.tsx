import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useClientType } from "@/contexts/ClientTypeContext";
import { User, Building2, RefreshCw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { href: "#about", label: "О нас" },
  { href: "#services", label: "Услуги и цены" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "/ai-design", label: "AI Дизайнер", external: true },
  { href: "#process", label: "Как мы работаем" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export default function Navbar() {
  const { clientType, isRetail, isWholesale, resetClientType } = useClientType();

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
            item.external ? (
              <Link
                key={item.href}
                to={item.href}
                className="minimal-heading hover:text-foreground transition-colors duration-200 flex items-center gap-2"
              >
                {item.label === "AI Дизайнер" && <Sparkles className="w-4 h-4" />}
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="minimal-heading hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            )
          ))}
        </div>
        
        {/* Client Type & CTA */}
        <div className="flex items-center gap-4">
          {/* Client Type Indicator */}
          {clientType && (
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`flex items-center gap-1 ${
                  isRetail ? 'border-brand-blue text-brand-blue' : 'border-brand-green text-brand-green'
                }`}
              >
                {isRetail ? <User className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                {isRetail ? 'Для себя' : 'Для бизнеса'}
              </Badge>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={resetClientType}
                className="h-8 w-8 p-0 hover:bg-muted"
                title="Сменить тип заказов"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <a href="#calculator">
            <Button className="bg-foreground text-background hover:bg-foreground/90 h-10 px-6 rounded-minimal">
              {isWholesale ? 'Оптовый калькулятор' : 'Калькулятор'}
            </Button>
          </a>
        </div>
      </nav>
    </header>
  );
}

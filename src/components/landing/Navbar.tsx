import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

const NAV_ITEMS = [
  { href: "#about", label: "О нас" },
  { href: "#services", label: "Услуги и цены" },
  { href: "#process", label: "Как мы работаем" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export default function Navbar() {
  const isMobile = useIsMobile();

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <a href="#top" className="font-extrabold tracking-tight text-lg">
          DTF & Вышивка СПБ
        </a>
        {!isMobile && (
          <ul className="hidden gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center gap-3">
          <a href="#order">
            <Button variant="hero" className="px-6 h-10">Заказать</Button>
          </a>
          {isMobile && (
            <button aria-label="Меню" className="md:hidden text-foreground/80">
              <Menu className="size-5" />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

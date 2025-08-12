import heroImg from "@/assets/hero-apparel.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section id="top" aria-label="Главный экран" className="relative">
      <div className="relative isolate">
        <img
          src={heroImg}
          alt="DTF печать и машинная вышивка на одежде — примеры изделий"
          className="w-full h-[60vh] md:h-[70vh] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/10" />
        <div className="absolute inset-0 pointer-events-none" />
        <div className="container mx-auto absolute inset-x-0 bottom-0 pb-10 md:pb-16">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">
              Санкт‑Петербург • доставка по России
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Печать и вышивка на одежде в Санкт‑Петербурге
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              От идеи до готового изделия — всего за 1–3 дня. Онлайн‑заказы, курьерская доставка, СДЭК, Почта России и самовывоз.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#order">
                <Button variant="hero" className="h-11 px-7">Заказать</Button>
              </a>
              <a href="#portfolio">
                <Button variant="outline" className="h-11 px-7">Портфолио</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

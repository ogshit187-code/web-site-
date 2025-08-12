import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

const items = [
  { src: p1, alt: "DTF логотип на чёрной футболке — близкий план" },
  { src: p2, alt: "Золотая машинная вышивка монограммы на худи" },
  { src: p3, alt: "Полноцветный DTF принт на белой футболке" },
  { src: p4, alt: "Комбинированная техника: вышивка + DTF на свитшоте" },
  { src: p5, alt: "Корпоративное поло с вышивкой на груди" },
  { src: p6, alt: "Мерч для мероприятий: свитшот с ярким принтом" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="container mx-auto py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Портфолио</h2>
        <p className="mt-2 text-muted-foreground">Реальные заказы: логотипы, надписи, рисунки и комбинированные решения.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <figure key={it.alt} className="group overflow-hidden rounded-lg border bg-card">
            <img
              src={it.src}
              alt={it.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="sr-only">{it.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

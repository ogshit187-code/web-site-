import r1 from "@/assets/review-1.jpg";
import r2 from "@/assets/review-2.jpg";
import r3 from "@/assets/review-3.jpg";

const reviews = [
  {
    text:
      "Заказали партию футболок с логотипом к событию. Печать чёткая, привезли вовремя!",
    img: r1,
    alt: "Футболка с DTF логотипом — фото заказа",
  },
  {
    text:
      "Вышивка получилась аккуратной и объёмной, золотые нити смотрятся премиально.",
    img: r2,
    alt: "Золотистая вышивка — фото заказа",
  },
  {
    text:
      "Нужно было быстро и красиво для промо‑акции. Сделали макет, утвердили и отправили за 2 дня!",
    img: r3,
    alt: "Полноцветный принт — фото заказа",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="container mx-auto py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Отзывы клиентов</h2>
        <p className="mt-2 text-muted-foreground">Честные впечатления и фотографии выполненных заказов.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.alt} className="rounded-lg border bg-card p-4">
            <img
              src={r.img}
              alt={r.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover rounded-md"
            />
            <p className="mt-3 text-sm text-muted-foreground">“{r.text}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}

import { FileSignature, PenTool, CreditCard, Cog, Truck } from "lucide-react";

const steps = [
  {
    icon: FileSignature,
    title: "Заявка",
    time: "5–15 минут",
    desc: "Оставьте контакты и пожелания — поможем с выбором техники и изделия.",
  },
  { icon: PenTool, title: "Макет", time: "30–90 минут", desc: "Подготовим макет и согласуем расположение и цвета." },
  { icon: CreditCard, title: "Оплата", time: "5–10 минут", desc: "Оплата онлайн любым удобным способом." },
  { icon: Cog, title: "Производство", time: "1–3 дня", desc: "Печать DTF / вышивка, контроль качества." },
  { icon: Truck, title: "Доставка", time: "1–5 дней", desc: "Курьер, СДЭК, Почта России или самовывоз." },
];

export default function Process() {
  return (
    <section id="process" className="container mx-auto py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Как мы работаем</h2>
        <p className="mt-2 text-muted-foreground">Путь от идеи к готовому изделию — простой и прозрачный.</p>
      </div>
      <ol className="grid gap-6 md:grid-cols-5">
        {steps.map(({ icon: Icon, title, time, desc }) => (
          <li key={title} className="rounded-lg border p-5 bg-card h-full">
            <div className="flex items-center gap-2">
              <Icon className="size-5" />
              <h3 className="font-semibold">{title}</h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{time}</p>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

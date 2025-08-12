export default function About() {
  return (
    <section id="about" className="container mx-auto py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">О нас</h2>
          <p className="mt-4 text-muted-foreground">
            Мы — мастерская печати DTF и машинной вышивки на одежде в Санкт‑Петербурге. Работаем с частными и корпоративными заказами: от подарочных футболок и мерча до формы для сотрудников и промоодежды.
          </p>
          <p className="mt-3 text-muted-foreground">
            Ценим качество и сроки: используем стойкие чернила, плотные и долговечные ткани, а вышивка получается аккуратной и объёмной. Средний срок изготовления — 1–3 дня.
          </p>
        </div>
        <ul className="grid gap-4">
          <li className="rounded-lg border p-5 bg-card shadow-sm">
            <h3 className="font-semibold">Качество</h3>
            <p className="text-sm text-muted-foreground mt-1">Чёткая печать, аккуратная вышивка и проверенные материалы.</p>
          </li>
          <li className="rounded-lg border p-5 bg-card shadow-sm">
            <h3 className="font-semibold">Скорость</h3>
            <p className="text-sm text-muted-foreground mt-1">Изготавливаем заказы в среднем за 1–3 дня.</p>
          </li>
          <li className="rounded-lg border p-5 bg-card shadow-sm">
            <h3 className="font-semibold">Индивидуальный подход</h3>
            <p className="text-sm text-muted-foreground mt-1">Помогаем с выбором техники, цвета, размеров и макетов.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          <div className="space-y-8">
            <div>
              <span className="celine-heading text-gray-600 tracking-[0.2em] text-xs block mb-4">
                О СТУДИИ
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight">
                Мастерская печати и вышивки в Санкт‑Петербурге
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg font-light">
                Мы специализируемся на профессиональной печати DTF и машинной вышивке на одежде. 
                Работаем с частными и корпоративными заказами любой сложности.
              </p>
              <p className="text-lg font-light">
                Используем только качественные материалы и современное оборудование. 
                Каждое изделие проходит контроль качества перед отправкой клиенту.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="celine-heading text-black tracking-[0.1em] mb-4">КАЧЕСТВО</h3>
              <p className="text-gray-700 font-light leading-relaxed">
                Чёткая печать, аккуратная вышивка и проверенные материалы. 
                Стойкие чернила и долговечные ткани.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-8">
              <h3 className="celine-heading text-black tracking-[0.1em] mb-4">СКОРОСТЬ</h3>
              <p className="text-gray-700 font-light leading-relaxed">
                Изготавливаем заказы в среднем за 1–3 дня. 
                Экспресс-заказы — в день обращения.
              </p>
            </div>
            
            <div className="pb-8">
              <h3 className="celine-heading text-black tracking-[0.1em] mb-4">ПОДХОД</h3>
              <p className="text-gray-700 font-light leading-relaxed">
                Индивидуальная консультация по выбору техники, цвета, размеров и макетов. 
                Помощь на каждом этапе.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

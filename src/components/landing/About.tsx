export default function About() {
  return (
    <section id="about" className="bg-white py-32 md:py-40">
      <div className="container mx-auto px-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-3 gap-12 items-end">
            <div className="lg:col-span-2">
              <span className="fashion-heading text-black/60 block mb-6">
                ИСТОРИЯ SMOLIN ATELIER
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
                Ручная разработка<br />
                и AI-технологии
              </h2>
            </div>
            <div className="lg:col-span-1">
              <p className="text-black/70 leading-relaxed">
                Каждый дизайн уникален — результат творческого процесса 
                и современных технологий.
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left Column - Story */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="w-24 h-0.5 bg-black"></div>
                <div className="space-y-6">
                  <p className="text-xl leading-relaxed text-black/80">
                    SMOLIN ATELIER родилось на пересечении традиционного мастерства 
                    и цифровых технологий. Мы создаём принты, которые рассказывают истории.
                  </p>
                  <p className="text-lg leading-relaxed text-black/70">
                    Наша команда объединяет опытных дизайнеров и современные AI-алгоритмы 
                    для создания уникальных визуальных решений. Каждый проект — это диалог 
                    между человеческим творчеством и машинным интеллектом.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-light">Наш подход</h3>
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-black/70">
                    Мы работаем как с индивидуальными заказчиками, создавая персональные 
                    коллекции, так и с брендами, разрабатывая тиражные решения для маркетплейсов.
                  </p>
                  <p className="text-lg leading-relaxed text-black/70">
                    Печать DTF и машинная вышивка выполняются на оборудовании премиум-класса 
                    с контролем качества на каждом этапе производства.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="fashion-heading text-black/60">НАШИ ПРЕИМУЩЕСТВА</div>
                
                <div className="space-y-12">
                  <div className="group hover-lift">
                    <div className="flex items-start gap-6">
                      <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 mt-2"></div>
                      <div>
                        <h4 className="text-xl font-light mb-3">Уникальность дизайна</h4>
                        <p className="text-black/70 leading-relaxed">
                          AI-алгоритмы и ручная разработка обеспечивают 
                          оригинальность каждого принта
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover-lift">
                    <div className="flex items-start gap-6">
                      <div className="w-8 h-8 rounded-full sand-bg flex-shrink-0 mt-2"></div>
                      <div>
                        <h4 className="text-xl font-light mb-3">Скорость выполнения</h4>
                        <p className="text-black/70 leading-relaxed">
                          Современное оборудование позволяет изготавливать 
                          заказы за 1 день
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover-lift">
                    <div className="flex items-start gap-6">
                      <div className="w-8 h-8 rounded-full gold-bg flex-shrink-0 mt-2"></div>
                      <div>
                        <h4 className="text-xl font-light mb-3">Премиальное качество</h4>
                        <p className="text-black/70 leading-relaxed">
                          Материалы от ведущих производителей и многоступенчатый 
                          контроль качества
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

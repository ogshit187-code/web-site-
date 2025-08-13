export default function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="lg:ml-64">
        <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-minimal mb-6">
              <div className="w-2 h-2 bg-brand-orange circle"></div>
              <span className="minimal-heading">Услуги</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-medium mb-6">
              Что мы делаем
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Современные технологии печати и вышивки для создания качественных изделий
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            
            {/* DTF Печать */}
            <div className="bg-white p-6 rounded-large shadow-card hover-scale group">
              <div className="w-12 h-12 bg-brand-blue rounded-minimal mb-4 group-hover:bg-brand-blue/80 transition-colors"></div>
              <h3 className="text-xl font-medium mb-2">DTF печать</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Яркие долговечные принты на любых тканях
              </p>
              <div className="text-2xl font-medium">от 200₽</div>
            </div>
            
            {/* Машинная вышивка */}
            <div className="bg-white p-6 rounded-large shadow-card hover-scale group">
              <div className="w-12 h-12 bg-brand-green rounded-minimal mb-4 group-hover:bg-brand-green/80 transition-colors"></div>
              <h3 className="text-xl font-medium mb-2">Машинная вышивка</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Объемная вышивка нитками высокого качества
              </p>
              <div className="text-2xl font-medium">от 300₽</div>
            </div>
            
            {/* Готовые изделия */}
            <div className="bg-white p-6 rounded-large shadow-card hover-scale group">
              <div className="w-12 h-12 bg-brand-purple rounded-minimal mb-4 group-hover:bg-brand-purple/80 transition-colors"></div>
              <h3 className="text-xl font-medium mb-2">Готовые изделия</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Полный цикл: от заготовки до готового изделия
              </p>
              <div className="text-2xl font-medium">от 1700₽</div>
            </div>
            
            {/* Дизайн */}
            <div className="bg-white p-6 rounded-large shadow-card hover-scale group">
              <div className="w-12 h-12 bg-brand-orange rounded-minimal mb-4 group-hover:bg-brand-orange/80 transition-colors"></div>
              <h3 className="text-xl font-medium mb-2">Дизайн</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Создание уникальных макетов под ваши задачи
              </p>
              <div className="text-2xl font-medium">от 500₽</div>
            </div>
            
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 bg-white p-8 rounded-large shadow-card">
            <div className="text-center">
              <div className="text-3xl font-medium mb-2">1 день</div>
              <div className="minimal-heading">Стандартный срок</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-medium">1000+</div>
              <div className="minimal-heading">Выполненных заказов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-medium">99%</div>
              <div className="minimal-heading">Довольных клиентов</div>
            </div>
          </div>
          
        </div>
        </div>
      </div>
    </section>
  );
}

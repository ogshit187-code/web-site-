export default function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8">
            О студии
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-light mb-2">DTF печать</div>
              <div className="text-sm text-black/60">от 200₽</div>
            </div>
            <div>
              <div className="text-2xl font-light mb-2">Машинная вышивка</div>
              <div className="text-sm text-black/60">от 300₽</div>
            </div>
            <div>
              <div className="text-2xl font-light mb-2">Готовые изделия</div>
              <div className="text-sm text-black/60">от 1700₽</div>
            </div>
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto">
            <p className="text-lg leading-relaxed text-black/70">
              Профессиональная печать и вышивка на одежде в Санкт-Петербурге. 
              Работаем с частными и корпоративными заказами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

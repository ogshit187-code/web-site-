import heroImg from "@/assets/hero-apparel.jpg";
import { useContent } from "@/contexts/ContentContext";

export default function Hero() {
  const { content } = useContent();
  return (
    <section id="top" className="min-h-screen bg-white relative overflow-hidden">
      {/* Левое меню как у Celine */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 z-40 hidden lg:block">
        <div className="p-8 h-full flex flex-col">
          
          {/* Меню категорий */}
          <nav className="space-y-6 flex-1">
            <div className="space-y-3">
              <h3 className="text-sm font-medium tracking-wider uppercase">SMOLIN SHOWS</h3>
              <div className="space-y-2 text-sm">
                <a href="#new" className="block hover:underline">SMOLIN NEW</a>
                <a href="#gifts" className="block hover:underline">SMOLIN GIFTS</a>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium tracking-wider uppercase">SMOLIN SHOP WOMEN</h3>
              <div className="space-y-2 text-sm">
                <a href="#tshirts" className="block hover:underline">ФУТБОЛКИ</a>
                <a href="#hoodies" className="block hover:underline">ХУДИ И СВИТШОТЫ</a>
                <a href="#custom" className="block hover:underline">КАСТОМ ДИЗАЙН</a>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium tracking-wider uppercase">SMOLIN SHOP MEN</h3>
              <div className="space-y-2 text-sm">
                <a href="#tshirts-men" className="block hover:underline">ФУТБОЛКИ</a>
                <a href="#hoodies-men" className="block hover:underline">ХУДИ И СВИТШОТЫ</a>
                <a href="#business" className="block hover:underline">КОРПОРАТИВНАЯ ОДЕЖДА</a>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium tracking-wider uppercase">SMOLIN SERVICES</h3>
              <div className="space-y-2 text-sm">
                <a href="#dtf" className="block hover:underline">DTF ПЕЧАТЬ</a>
                <a href="#embroidery" className="block hover:underline">МАШИННАЯ ВЫШИВКА</a>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium tracking-wider uppercase">AI DESIGNER</h3>
              <div className="space-y-2 text-sm">
                <a href="/ai-design" className="block hover:underline">СОЗДАТЬ ПРИНТ</a>
              </div>
            </div>
          </nav>
          
          {/* Нижние ссылки */}
          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <a href="#calculator" className="block hover:underline">КАЛЬКУЛЯТОР</a>
              <a href="#contact" className="block hover:underline">КОНТАКТЫ</a>
            </div>
            
            <div className="space-y-2 text-xs">
              <a href="#search" className="block hover:underline">ПОИСК 🔍</a>
            </div>
          </div>
          
        </div>
      </div>

      {/* Верхний хедер как у Celine */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="lg:ml-64">
          <div className="flex items-center justify-between px-8 py-4">
            
            {/* Центральное сообщение */}
            <div className="flex-1 text-center">
              <p className="text-sm tracking-wider">
                {content.heroSubtitle}{" "}
                <a href="#calculator" className="underline font-medium">
                  РАССЧИТАТЬ ЗАКАЗ
                </a>
              </p>
            </div>
            
            {/* Кнопка закрытия */}
            <button className="text-sm tracking-wider hover:underline">
              CLOSE
            </button>
            
          </div>
        </div>
      </header>

      {/* Основной контент со сдвигом */}
      <div className="lg:ml-64 pt-20">
        <div className="min-h-screen flex items-center justify-center">
          
          {/* Центральная область с изображением */}
          <div className="w-full max-w-6xl mx-auto px-8">
            
            {/* Главное изображение */}
            <div className="relative group cursor-pointer">
              <img 
                src={heroImg} 
                alt="SMOLIN ATELIER" 
                className="w-full h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay с текстом */}
              <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-16">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-wider mb-4">
                    {content.heroTitle}
                  </h1>
                  <a 
                    href="#calculator"
                    className="inline-block text-sm tracking-widest border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    РАССЧИТАТЬ СТОИМОСТЬ
                  </a>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>

      {/* Мобильное меню */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
        <div className="grid grid-cols-4 gap-1 p-4">
          <a href="#new" className="text-center py-2 text-xs tracking-wider">NEW</a>
          <a href="#calculator" className="text-center py-2 text-xs tracking-wider">КАЛЬКУЛЯТОР</a>
          <a href="/ai-design" className="text-center py-2 text-xs tracking-wider">AI ДИЗАЙН</a>
          <a href="#contact" className="text-center py-2 text-xs tracking-wider">КОНТАКТ</a>
        </div>
      </div>
      
    </section>
  );
}
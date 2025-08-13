import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shirt } from "lucide-react";
import ProductPreview3D from "@/components/constructor/ProductPreview3D";

// Данные для калькулятора
const garmentTypes = [
  { id: "tshirt", name: "Футболка", basePrice: 1700 },
  { id: "hoodie", name: "Худи", basePrice: 3200 },
  { id: "sweatshirt", name: "Свитшот", basePrice: 2800 },
];

const serviceTypes = [
  { 
    id: "dtf-logo", 
    name: "DTF печать — логотип", 
    description: "Небольшой логотип или надпись",
    basePrice: 200 
  },
  { 
    id: "dtf-print", 
    name: "DTF печать — полноцветный принт", 
    description: "Большой цветной принт",
    basePrice: 1300 
  },
  { 
    id: "embroidery-text", 
    name: "Машинная вышивка — надпись", 
    description: "Вышитая надпись",
    basePrice: 300 
  },
  { 
    id: "embroidery-logo", 
    name: "Машинная вышивка — крупный логотип", 
    description: "Объемная вышивка логотипа",
    basePrice: 600 
  },
];

interface CalculatorConfig {
  garmentType: string;
  serviceType: string;
  quantity: number;
  garmentColor: string;
  printPosition: string;
  customPrintSize: { width: number; height: number };
  uploadedImage?: File;
}

interface ExtendedCalculatorConfig extends CalculatorConfig {
  garmentStyle: string; // крой
  fabricWeight: string; // плотность
  side: string; // сторона
}

const garmentStyles = [
  { id: "classic", name: "Классический", description: "Стандартный крой" },
  { id: "slim", name: "Приталенный", description: "Зауженный силуэт" },
  { id: "oversized", name: "Оверсайз", description: "Свободный крой" },
  { id: "fitted", name: "Облегающий", description: "По фигуре" },
];

const fabricWeights = [
  { id: "light", name: "Легкая (120-150 г/м²)", price: 0 },
  { id: "medium", name: "Средняя (160-200 г/м²)", price: 50 },
  { id: "heavy", name: "Плотная (220-280 г/м²)", price: 100 },
  { id: "premium", name: "Премиум (300+ г/м²)", price: 200 },
];

const garmentColors = [
  { id: "white", name: "Белый", color: "#ffffff" },
  { id: "black", name: "Черный", color: "#000000" },
  { id: "gray", name: "Серый", color: "#6b7280" },
  { id: "navy", name: "Темно-синий", color: "#1e3a8a" },
  { id: "red", name: "Красный", color: "#dc2626" },
  { id: "green", name: "Зеленый", color: "#059669" },
];

const sides = [
  { id: "front", name: "Перед", price: 0 },
  { id: "back", name: "Спина", price: 50 },
  { id: "both", name: "Перед + Спина", price: 80 },
];

export default function PriceCalculator() {
  const [config, setConfig] = useState<ExtendedCalculatorConfig>({
    garmentType: "",
    serviceType: "",
    quantity: 1,
    garmentColor: "white",
    printPosition: "front",
    customPrintSize: { width: 20, height: 25 },
    garmentStyle: "classic",
    fabricWeight: "medium",
    side: "front",
  });

  const selectedGarment = garmentTypes.find(g => g.id === config.garmentType);
  const selectedService = serviceTypes.find(s => s.id === config.serviceType);
  const selectedFabric = fabricWeights.find(f => f.id === config.fabricWeight);
  const selectedSide = sides.find(s => s.id === config.side);
  const isConfigComplete = config.garmentType && config.serviceType;

  const calculatePrice = () => {
    if (!selectedGarment || !selectedService || !selectedFabric || !selectedSide) return 0;
    
    const basePrice = selectedGarment.basePrice + selectedService.basePrice + selectedFabric.price + selectedSide.price;
    const totalForQuantity = basePrice * config.quantity;
    
    // Скидки на количество
    if (config.quantity >= 50) return Math.round(totalForQuantity * 0.8);
    if (config.quantity >= 20) return Math.round(totalForQuantity * 0.85);
    if (config.quantity >= 10) return Math.round(totalForQuantity * 0.9);
    if (config.quantity >= 5) return Math.round(totalForQuantity * 0.95);
    
    return totalForQuantity;
  };

  // Современный компонент визуализации одежды
  const ClothingVisualization = () => {
    const selectedColor = garmentColors.find(c => c.id === config.garmentColor);
    
    return (
      <div className="bg-muted/20 rounded-large p-8 flex items-center justify-center min-h-[500px] relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-4 left-4 w-16 h-16 pattern-dots opacity-20"></div>
        <div className="absolute bottom-4 right-4 w-20 h-20 pattern-grid opacity-20"></div>
        
        {config.garmentType ? (
          <div className="relative">
            {/* Основа одежды */}
            <div className="relative">
              {config.garmentType === "tshirt" && (
                <svg width="200" height="240" viewBox="0 0 200 240" className="drop-shadow-lg">
                  {/* Футболка */}
                  <path
                    d="M60 60 L60 40 Q60 30 70 30 L130 30 Q140 30 140 40 L140 60 L170 80 L170 220 Q170 230 160 230 L40 230 Q30 230 30 220 L30 80 Z"
                    fill={selectedColor?.color || "#ffffff"}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  {/* Рукава */}
                  <path
                    d="M30 80 Q20 70 15 80 Q10 90 15 100 L25 95 Q30 90 30 85"
                    fill={selectedColor?.color || "#ffffff"}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M170 80 Q180 70 185 80 Q190 90 185 100 L175 95 Q170 90 170 85"
                    fill={selectedColor?.color || "#ffffff"}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                </svg>
              )}
              
              {config.garmentType === "hoodie" && (
                <svg width="200" height="260" viewBox="0 0 200 260" className="drop-shadow-lg">
                  {/* Худи */}
                  <path
                    d="M50 70 L50 50 Q50 40 60 40 L140 40 Q150 40 150 50 L150 70 L180 90 L180 240 Q180 250 170 250 L30 250 Q20 250 20 240 L20 90 Z"
                    fill={selectedColor?.color || "#ffffff"}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  {/* Капюшон */}
                  <path
                    d="M60 40 Q100 20 140 40 Q150 45 140 55 Q100 35 60 55 Q50 45 60 40"
                    fill={selectedColor?.color || "#ffffff"}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  {/* Рукава */}
                  <path
                    d="M20 90 Q10 80 5 90 Q0 100 5 110 L15 105 Q20 100 20 95"
                    fill={selectedColor?.color || "#ffffff"}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M180 90 Q190 80 195 90 Q200 100 195 110 L185 105 Q180 100 180 95"
                    fill={selectedColor?.color || "#ffffff"}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                </svg>
              )}
              
              {config.garmentType === "sweatshirt" && (
                <svg width="200" height="250" viewBox="0 0 200 250" className="drop-shadow-lg">
                  {/* Свитшот */}
                  <path
                    d="M55 65 L55 45 Q55 35 65 35 L135 35 Q145 35 145 45 L145 65 L175 85 L175 230 Q175 240 165 240 L35 240 Q25 240 25 230 L25 85 Z"
                    fill={selectedColor?.color || "#ffffff"}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  {/* Рукава */}
                  <path
                    d="M25 85 Q15 75 10 85 Q5 95 10 105 L20 100 Q25 95 25 90"
                    fill={selectedColor?.color || "#ffffff"}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M175 85 Q185 75 190 85 Q195 95 190 105 L180 100 Q175 95 175 90"
                    fill={selectedColor?.color || "#ffffff"}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                </svg>
              )}
              
              {/* Область принта */}
              {config.side === "front" && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-20 h-16 border-2 border-dashed border-brand-blue bg-brand-blue/10 rounded-minimal flex items-center justify-center">
                  <span className="text-xs font-medium text-brand-blue">ПРИНТ</span>
                </div>
              )}
              
              {config.side === "back" && (
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-20 border-2 border-dashed border-brand-green bg-brand-green/10 rounded-minimal flex items-center justify-center">
                  <span className="text-xs font-medium text-brand-green">СПИНА</span>
                </div>
              )}
              
              {config.side === "both" && (
                <>
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-12 border-2 border-dashed border-brand-blue bg-brand-blue/10 rounded-minimal flex items-center justify-center">
                    <span className="text-xs font-medium text-brand-blue">ПЕРЕД</span>
                  </div>
                  <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-16 h-12 border-2 border-dashed border-brand-green bg-brand-green/10 rounded-minimal flex items-center justify-center">
                    <span className="text-xs font-medium text-brand-green">СПИНА</span>
                  </div>
                </>
              )}
            </div>
            
            {/* Информация о параметрах */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-white/90 backdrop-blur rounded-minimal px-3 py-1 shadow-card">
                <div className="text-xs text-muted-foreground">
                  {garmentStyles.find(s => s.id === config.garmentStyle)?.name} • {selectedColor?.name}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <div className="w-20 h-20 bg-muted rounded-large mx-auto mb-4 flex items-center justify-center">
              <Shirt className="w-8 h-8" />
            </div>
            <p className="font-medium">Выберите изделие</p>
          </div>
        )}
      </div>
    );
  };

  const getDiscountText = () => {
    if (config.quantity >= 50) return "20% скидка";
    if (config.quantity >= 20) return "15% скидка";
    if (config.quantity >= 10) return "10% скидка";
    if (config.quantity >= 5) return "5% скидка";
    return "";
  };

  const totalPrice = calculatePrice();

  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-minimal mb-6">
            <div className="w-2 h-2 bg-brand-purple circle"></div>
            <span className="minimal-heading">Калькулятор</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-medium mb-6">
            Рассчитайте стоимость
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выберите параметры вашего изделия и получите точную цену
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Левая колонка - настройки (4 колонки) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Изделие */}
              <div className="bg-white p-6 rounded-large shadow-card">
                <h3 className="font-medium mb-4">Изделие</h3>
                <div className="grid gap-3">
                  {garmentTypes.map((garment) => (
                    <button
                      key={garment.id}
                      onClick={() => setConfig({...config, garmentType: garment.id})}
                      className={`p-3 rounded-minimal text-left transition-all duration-200 hover-scale ${
                        config.garmentType === garment.id 
                          ? 'bg-foreground text-background' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{garment.name}</span>
                        <span className="text-sm opacity-70">от {garment.basePrice}₽</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Тип работы */}
              <div className="bg-white p-6 rounded-large shadow-card">
                <h3 className="font-medium mb-4">Тип работы</h3>
                <div className="grid gap-3">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setConfig({...config, serviceType: service.id})}
                      className={`p-3 rounded-minimal text-left transition-all duration-200 hover-scale ${
                        config.serviceType === service.id 
                          ? 'bg-foreground text-background' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{service.name}</span>
                        <span className="text-sm opacity-70">от {service.basePrice}₽</span>
                      </div>
                      <p className="text-xs opacity-60">{service.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Крой */}
              <div className="bg-white p-6 rounded-large shadow-card">
                <h3 className="font-medium mb-4">Крой</h3>
                <div className="grid grid-cols-2 gap-2">
                  {garmentStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setConfig({...config, garmentStyle: style.id})}
                      className={`p-2 rounded-minimal text-xs transition-all duration-200 ${
                        config.garmentStyle === style.id 
                          ? 'bg-foreground text-background' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Плотность ткани */}
              <div className="bg-white p-6 rounded-large shadow-card">
                <h3 className="font-medium mb-4">Плотность ткани</h3>
                <div className="grid gap-2">
                  {fabricWeights.map((fabric) => (
                    <button
                      key={fabric.id}
                      onClick={() => setConfig({...config, fabricWeight: fabric.id})}
                      className={`p-2 rounded-minimal text-left text-sm transition-all duration-200 ${
                        config.fabricWeight === fabric.id 
                          ? 'bg-foreground text-background' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span>{fabric.name}</span>
                        {fabric.price > 0 && <span>+{fabric.price}₽</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Цвет */}
              <div className="bg-white p-6 rounded-large shadow-card">
                <h3 className="font-medium mb-4">Цвет</h3>
                <div className="grid grid-cols-6 gap-2">
                  {garmentColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setConfig({...config, garmentColor: color.id})}
                      className={`w-full aspect-square rounded-minimal border-2 transition-all duration-200 hover-scale ${
                        config.garmentColor === color.id 
                          ? 'border-foreground scale-110' 
                          : 'border-border'
                      }`}
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Сторона */}
              <div className="bg-white p-6 rounded-large shadow-card">
                <h3 className="font-medium mb-4">Сторона</h3>
                <div className="grid gap-2">
                  {sides.map((side) => (
                    <button
                      key={side.id}
                      onClick={() => setConfig({...config, side: side.id})}
                      className={`p-3 rounded-minimal text-left transition-all duration-200 ${
                        config.side === side.id 
                          ? 'bg-foreground text-background' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{side.name}</span>
                        {side.price > 0 && <span className="text-sm">+{side.price}₽</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Количество */}
              <div className="bg-white p-6 rounded-large shadow-card">
                <h3 className="font-medium mb-4">Количество</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setConfig({...config, quantity: Math.max(1, config.quantity - 1)})}
                    className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-minimal transition-colors"
                  >
                    -
                  </button>
                  <div className="text-center min-w-[60px]">
                    <div className="text-2xl font-medium">{config.quantity}</div>
                  </div>
                  <button
                    onClick={() => setConfig({...config, quantity: config.quantity + 1})}
                    className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-minimal transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Центральная колонка - 3D визуализация (5 колонок) */}
            <div className="lg:col-span-5">
              <ClothingVisualization />
            </div>

            {/* Правая колонка - итог (3 колонки) */}
            <div className="lg:col-span-3">
              <div className="bg-white p-6 rounded-large shadow-card sticky top-24">
                <h3 className="text-xl font-medium mb-6">Итого</h3>
                
                {isConfigComplete ? (
                  <>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Изделие:</span>
                        <span>{selectedGarment?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Услуга:</span>
                        <span>{selectedService?.name.split(' — ')[0]}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Плотность:</span>
                        <span>{selectedFabric?.name.split(' ')[0]}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Сторона:</span>
                        <span>{selectedSide?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Количество:</span>
                        <span>{config.quantity} шт.</span>
                      </div>
                      {getDiscountText() && (
                        <div className="flex justify-between text-sm text-brand-green">
                          <span>Скидка:</span>
                          <span>{getDiscountText()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Итого:</span>
                        <span className="text-2xl font-medium">{totalPrice.toLocaleString()} ₽</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-foreground text-background hover:bg-foreground/90 h-12 rounded-minimal hover-scale">
                      Заказать
                    </Button>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <p>Выберите параметры заказа</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
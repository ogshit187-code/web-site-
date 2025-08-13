import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shirt, TrendingUp, Users, Sparkles } from "lucide-react";
import { useClientType, usePricing } from "@/contexts/ClientTypeContext";
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
  const { isRetail, isWholesale } = useClientType();
  const { getPriceMultiplier, getMinimumQuantity, getDiscountBreakpoints } = usePricing();
  
  // Проверяем наличие AI дизайна из localStorage
  const [aiDesign, setAiDesign] = useState<any>(null);
  
  useEffect(() => {
    const savedDesign = localStorage.getItem('ai-generated-design');
    if (savedDesign) {
      try {
        const design = JSON.parse(savedDesign);
        setAiDesign(design);
        // Очищаем после использования
        localStorage.removeItem('ai-generated-design');
      } catch (error) {
        console.error('Error parsing AI design:', error);
      }
    }
  }, []);
  
  const [config, setConfig] = useState<ExtendedCalculatorConfig>({
    garmentType: "",
    serviceType: "",
    quantity: getMinimumQuantity(),
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
    const priceMultiplier = getPriceMultiplier();
    const adjustedBasePrice = Math.round(basePrice * priceMultiplier);
    const totalForQuantity = adjustedBasePrice * config.quantity;
    
    // Применяем скидки в зависимости от типа клиента
    const discountBreakpoints = getDiscountBreakpoints();
    for (let i = discountBreakpoints.length - 1; i >= 0; i--) {
      const breakpoint = discountBreakpoints[i];
      if (config.quantity >= breakpoint.min) {
        return Math.round(totalForQuantity * (1 - breakpoint.discount));
      }
    }
    
    return totalForQuantity;
  };

  // Современный компонент визуализации одежды с drag & drop
  const ClothingVisualization = () => {
    const selectedColor = garmentColors.find(c => c.id === config.garmentColor);
    const [printPosition, setPrintPosition] = useState({ x: 50, y: 40 }); // Процентные координаты
    const [isDragging, setIsDragging] = useState(false);
    
    const handlePrintDrag = (e: React.MouseEvent) => {
      if (!isDragging) return;
      
      const container = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - container.left) / container.width) * 100;
      const y = ((e.clientY - container.top) / container.height) * 100;
      
      // Ограничиваем позицию в пределах одежды
      const boundedX = Math.max(20, Math.min(80, x));
      const boundedY = Math.max(20, Math.min(70, y));
      
      setPrintPosition({ x: boundedX, y: boundedY });
    };

    // Улучшенные SVG макеты одежды
    const renderGarment = () => {
      const commonProps = {
        fill: selectedColor?.color || "#ffffff",
        stroke: "#d1d5db",
        strokeWidth: "1.5",
        className: "filter drop-shadow-md"
      };

      switch (config.garmentType) {
        case "tshirt":
          return (
            <svg width="280" height="320" viewBox="0 0 280 320" className="mx-auto">
              {/* Основа футболки - более реалистичная */}
              <path
                d="M80 80 L80 55 Q80 40 95 40 L185 40 Q200 40 200 55 L200 80 L240 105 L240 280 Q240 295 225 295 L55 295 Q40 295 40 280 L40 105 Z"
                {...commonProps}
              />
              {/* Левый рукав */}
              <path
                d="M40 105 Q25 95 20 105 Q15 115 20 125 Q25 135 35 130 L40 125"
                {...commonProps}
              />
              {/* Правый рукав */}
              <path
                d="M240 105 Q255 95 260 105 Q265 115 260 125 Q255 135 245 130 L240 125"
                {...commonProps}
              />
              {/* Воротник */}
              <path
                d="M95 40 Q140 30 185 40 Q190 45 185 50 Q140 35 95 50 Q90 45 95 40"
                {...commonProps}
              />
            </svg>
          );
          
        case "hoodie":
          return (
            <svg width="300" height="360" viewBox="0 0 300 360" className="mx-auto">
              {/* Основа худи */}
              <path
                d="M75 95 L75 70 Q75 50 95 50 L205 50 Q225 50 225 70 L225 95 L265 120 L265 320 Q265 340 245 340 L55 340 Q35 340 35 320 L35 120 Z"
                {...commonProps}
              />
              {/* Капюшон - более объемный */}
              <path
                d="M95 50 Q150 25 205 50 Q220 60 205 75 Q175 60 150 55 Q125 60 95 75 Q80 60 95 50"
                {...commonProps}
              />
              {/* Левый рукав */}
              <path
                d="M35 120 Q20 110 15 120 Q10 130 15 140 Q20 150 30 145 L35 140"
                {...commonProps}
              />
              {/* Правый рукав */}
              <path
                d="M265 120 Q280 110 285 120 Q290 130 285 140 Q280 150 270 145 L265 140"
                {...commonProps}
              />
              {/* Кенгуру карман */}
              <rect
                x="110" y="180" width="80" height="50"
                fill="none" stroke={selectedColor?.color === "#ffffff" ? "#e5e7eb" : "#ffffff"}
                strokeWidth="1" rx="8"
                opacity="0.6"
              />
            </svg>
          );
          
        case "sweatshirt":
          return (
            <svg width="290" height="340" viewBox="0 0 290 340" className="mx-auto">
              {/* Основа свитшота */}
              <path
                d="M78 88 L78 62 Q78 45 98 45 L192 45 Q212 45 212 62 L212 88 L252 113 L252 300 Q252 320 232 320 L58 320 Q38 320 38 300 L38 113 Z"
                {...commonProps}
              />
              {/* Левый рукав - длинный */}
              <path
                d="M38 113 Q23 103 18 113 Q13 123 18 133 Q23 143 33 138 L38 133"
                {...commonProps}
              />
              {/* Правый рукав - длинный */}
              <path
                d="M252 113 Q267 103 272 113 Q277 123 272 133 Q267 143 257 138 L252 133"
                {...commonProps}
              />
              {/* Круглый вырез */}
              <circle
                cx="145" cy="62" r="17"
                fill="none" stroke={selectedColor?.color === "#ffffff" ? "#e5e7eb" : "#ffffff"}
                strokeWidth="1.5"
              />
            </svg>
          );
          
        default:
          return null;
      }
    };
    
    return (
      <div className="bg-gradient-to-br from-muted/10 to-muted/30 rounded-large p-8 min-h-[600px] relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-4 left-4 w-16 h-16 pattern-dots opacity-10"></div>
        <div className="absolute bottom-4 right-4 w-20 h-20 pattern-grid opacity-10"></div>
        
        {config.garmentType ? (
          <div className="relative flex flex-col items-center">
            {/* Основа одежды */}
            <div 
              className="relative cursor-crosshair"
              onMouseMove={handlePrintDrag}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            >
              {renderGarment()}
              
              {/* Перетаскиваемая область принта */}
              <div
                className={`absolute cursor-move transition-all duration-200 ${
                  isDragging ? 'scale-110 shadow-lg' : 'hover:scale-105'
                }`}
                style={{
                  left: `${printPosition.x}%`,
                  top: `${printPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseDown={() => setIsDragging(true)}
              >
                {aiDesign ? (
                  // AI дизайн
                  <div className="relative">
                    <img 
                      src={aiDesign.generatedImage}
                      alt="AI Design"
                      className="w-16 h-12 object-cover rounded-minimal border-2 border-brand-purple shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-purple rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                ) : (
                  // Обычная область принта
                  <div className={`
                    w-16 h-12 rounded-minimal border-2 border-dashed transition-all duration-200
                    ${config.side === "front" ? 'border-brand-blue bg-brand-blue/20' : 
                      config.side === "back" ? 'border-brand-green bg-brand-green/20' : 
                      'border-brand-purple bg-brand-purple/20'}
                    ${isDragging ? 'animate-pulse' : ''}
                    flex items-center justify-center
                  `}>
                    <span className={`text-xs font-medium ${
                      config.side === "front" ? 'text-brand-blue' : 
                      config.side === "back" ? 'text-brand-green' : 
                      'text-brand-purple'
                    }`}>
                      {config.side === "front" ? "ПРИНТ" : 
                       config.side === "back" ? "СПИНА" : "ПРИНТ"}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Линейка размеров принта */}
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-minimal px-2 py-1 text-xs">
                {config.customPrintSize.width}×{config.customPrintSize.height} см
              </div>
            </div>
            
            {/* Инструкция */}
            {!isDragging && (
              <div className="mt-6 text-center">
                <div className="bg-white/90 backdrop-blur rounded-large px-4 py-2 shadow-card">
                  <p className="text-sm text-muted-foreground mb-1">
                    💡 Перетащите область принта в нужное место
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {garmentStyles.find(s => s.id === config.garmentStyle)?.name} • {selectedColor?.name}
                  </div>
                </div>
              </div>
            )}
            
            {/* Размеры принта */}
            <div className="mt-4 bg-white p-4 rounded-large shadow-card">
              <h4 className="font-medium mb-3 text-center">Размер принта</h4>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Ширина</div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => setConfig({
                        ...config, 
                        customPrintSize: { 
                          ...config.customPrintSize, 
                          width: Math.max(5, config.customPrintSize.width - 1) 
                        }
                      })}
                      className="w-6 h-6 bg-muted hover:bg-muted/80 rounded text-xs transition-colors"
                    >
                      -
                    </button>
                    <span className="min-w-[30px] text-center text-sm font-medium">
                      {config.customPrintSize.width}
                    </span>
                    <button
                      onClick={() => setConfig({
                        ...config, 
                        customPrintSize: { 
                          ...config.customPrintSize, 
                          width: Math.min(40, config.customPrintSize.width + 1) 
                        }
                      })}
                      className="w-6 h-6 bg-muted hover:bg-muted/80 rounded text-xs transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Высота</div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => setConfig({
                        ...config, 
                        customPrintSize: { 
                          ...config.customPrintSize, 
                          height: Math.max(5, config.customPrintSize.height - 1) 
                        }
                      })}
                      className="w-6 h-6 bg-muted hover:bg-muted/80 rounded text-xs transition-colors"
                    >
                      -
                    </button>
                    <span className="min-w-[30px] text-center text-sm font-medium">
                      {config.customPrintSize.height}
                    </span>
                    <button
                      onClick={() => setConfig({
                        ...config, 
                        customPrintSize: { 
                          ...config.customPrintSize, 
                          height: Math.min(40, config.customPrintSize.height + 1) 
                        }
                      })}
                      className="w-6 h-6 bg-muted hover:bg-muted/80 rounded text-xs transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        ) : (
          <div className="text-center text-muted-foreground flex items-center justify-center h-full">
            <div>
              <div className="w-20 h-20 bg-muted rounded-large mx-auto mb-4 flex items-center justify-center">
                <Shirt className="w-8 h-8" />
              </div>
              <p className="font-medium">Выберите изделие</p>
              <p className="text-sm mt-1">Затем настройте принт</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const getDiscountText = () => {
    const discountBreakpoints = getDiscountBreakpoints();
    for (let i = discountBreakpoints.length - 1; i >= 0; i--) {
      const breakpoint = discountBreakpoints[i];
      if (config.quantity >= breakpoint.min) {
        return breakpoint.label;
      }
    }
    return "";
  };

  const totalPrice = calculatePrice();

  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-minimal">
              <div className="w-2 h-2 bg-brand-purple circle"></div>
              <span className="minimal-heading">Калькулятор</span>
            </div>
            
            {/* Client Type Badge */}
            <Badge 
              variant="outline" 
              className={`flex items-center gap-2 px-4 py-2 ${
                isRetail 
                  ? 'border-brand-blue text-brand-blue bg-brand-blue/5' 
                  : 'border-brand-green text-brand-green bg-brand-green/5'
              }`}
            >
              {isRetail ? <Users className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
              {isRetail ? 'Розничные цены' : 'Оптовые цены'}
            </Badge>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-medium mb-6">
            {isRetail ? 'Рассчитайте стоимость' : 'Оптовый калькулятор'}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isRetail 
              ? 'Выберите параметры вашего изделия и получите точную цену'
              : 'Специальные оптовые цены для коммерческих заказов от 10 шт.'
            }
          </p>
          
          {isWholesale && (
            <div className="mt-4 text-center">
              <Badge variant="secondary" className="bg-brand-green/10 text-brand-green border-brand-green/20">
                Базовая скидка 20% уже применена
              </Badge>
            </div>
          )}
          
          {aiDesign && (
            <div className="mt-4 text-center">
              <Badge className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                AI дизайн "{aiDesign.style.name}" загружен!
              </Badge>
            </div>
          )}
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
                      onClick={() => setConfig({...config, quantity: Math.max(getMinimumQuantity(), config.quantity - 1)})}
                      className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-minimal transition-colors"
                      disabled={config.quantity <= getMinimumQuantity()}
                    >
                      -
                    </button>
                    <div className="text-center min-w-[60px]">
                      <div className="text-2xl font-medium">{config.quantity}</div>
                      {getMinimumQuantity() > 1 && (
                        <div className="text-xs text-muted-foreground">
                          мин. {getMinimumQuantity()}
                        </div>
                      )}
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
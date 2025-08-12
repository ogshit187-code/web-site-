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

export default function PriceCalculator() {
  const [config, setConfig] = useState<CalculatorConfig>({
    garmentType: "",
    serviceType: "",
    quantity: 1,
    garmentColor: "white",
    printPosition: "front",
    customPrintSize: { width: 20, height: 25 },
  });

  const selectedGarment = garmentTypes.find(g => g.id === config.garmentType);
  const selectedService = serviceTypes.find(s => s.id === config.serviceType);
  const isConfigComplete = config.garmentType && config.serviceType;

  const calculatePrice = () => {
    if (!selectedGarment || !selectedService) return 0;
    
    const basePrice = selectedGarment.basePrice + selectedService.basePrice;
    const totalForQuantity = basePrice * config.quantity;
    
    // Скидки на количество
    if (config.quantity >= 50) return Math.round(totalForQuantity * 0.8);
    if (config.quantity >= 20) return Math.round(totalForQuantity * 0.85);
    if (config.quantity >= 10) return Math.round(totalForQuantity * 0.9);
    if (config.quantity >= 5) return Math.round(totalForQuantity * 0.95);
    
    return totalForQuantity;
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
    <section id="calculator" className="bg-white py-20">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4">Калькулятор стоимости</h2>
          <p className="text-black/60">Выберите параметры заказа</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Левые 2 колонки - настройки */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Выбор изделия */}
              <div>
                <h3 className="text-lg font-light mb-6">Изделие</h3>
                <div className="grid gap-3">
                  {garmentTypes.map((garment) => (
                    <button
                      key={garment.id}
                      onClick={() => setConfig({...config, garmentType: garment.id})}
                      className={`p-4 border text-left transition-all duration-300 ${
                        config.garmentType === garment.id 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-light">{garment.name}</span>
                        <span className="text-sm opacity-70">от {garment.basePrice}₽</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Выбор услуги */}
              <div>
                <h3 className="text-lg font-light mb-6">Тип работы</h3>
                <div className="grid gap-3">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setConfig({...config, serviceType: service.id})}
                      className={`p-4 border text-left transition-all duration-300 ${
                        config.serviceType === service.id 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-light">{service.name}</span>
                        <span className="text-sm opacity-70">от {service.basePrice}₽</span>
                      </div>
                      <p className="text-xs opacity-60">{service.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Количество */}
              {isConfigComplete && (
                <div>
                  <h3 className="text-lg font-light mb-6">Количество</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setConfig({...config, quantity: Math.max(1, config.quantity - 1)})}
                      className="w-12 h-12 border border-gray-200 hover:border-gray-400 transition-colors"
                    >
                      -
                    </button>
                    <div className="text-center min-w-[60px]">
                      <div className="text-2xl font-light">{config.quantity}</div>
                    </div>
                    <button
                      onClick={() => setConfig({...config, quantity: config.quantity + 1})}
                      className="w-12 h-12 border border-gray-200 hover:border-gray-400 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Средние 2 колонки - большая 3D модель */}
            <div className="lg:col-span-2">
              {config.garmentType && (
                <div className="bg-gray-50 h-96 lg:h-[600px] flex items-center justify-center">
                  <ProductPreview3D
                    garmentType={config.garmentType}
                    garmentColor={config.garmentColor}
                    printPosition={config.printPosition}
                    printSize={config.customPrintSize}
                    uploadedImage={config.uploadedImage}
                    onPositionChange={(position) => setConfig({...config, printPosition: position})}
                    onSizeChange={(size) => setConfig({...config, customPrintSize: size})}
                    onColorChange={(color) => setConfig({...config, garmentColor: color})}
                  />
                </div>
              )}
              {!config.garmentType && (
                <div className="bg-gray-50 h-96 lg:h-[600px] flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Shirt className="w-24 h-24 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-light">Выберите изделие</p>
                  </div>
                </div>
              )}
            </div>

            {/* Правая колонка - итог */}
            <div className="lg:col-span-1">
              {isConfigComplete ? (
                <div className="bg-gray-50 p-8 h-fit">
                  <h3 className="text-2xl font-light mb-6">Итого</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-black/60">Изделие:</span>
                      <span>{selectedGarment?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60">Услуга:</span>
                      <span>{selectedService?.name.split(' — ')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60">Количество:</span>
                      <span>{config.quantity} шт.</span>
                    </div>
                    {getDiscountText() && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка:</span>
                        <span>{getDiscountText()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-6 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-light">Итого:</span>
                      <span className="text-3xl font-light">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-black text-white hover:bg-gray-800 h-14 rounded-none font-light tracking-[0.1em] transition-colors duration-300">
                    ЗАКАЗАТЬ
                  </Button>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 h-fit">
                  <div className="text-center text-gray-400">
                    <p className="font-light">Выберите параметры заказа</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
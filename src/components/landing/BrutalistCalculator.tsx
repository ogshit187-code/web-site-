import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useClientType, usePricing } from "@/contexts/ClientTypeContext";

// Данные для калькулятора
const garmentTypes = [
  { id: "tshirt", name: "ФУТБОЛКА", basePrice: 1700, emoji: "👕" },
  { id: "hoodie", name: "ХУДИ", basePrice: 3200, emoji: "🔥" },
  { id: "sweatshirt", name: "СВИТШОТ", basePrice: 2800, emoji: "💀" },
];

const serviceTypes = [
  { 
    id: "dtf-logo", 
    name: "DTF ПЕЧАТЬ — ЛОГОТИП", 
    description: "МЕЛКИЙ ПРИНТ",
    basePrice: 200,
    emoji: "⚡"
  },
  { 
    id: "dtf-print", 
    name: "DTF ПЕЧАТЬ — ФУЛЛ ПРИНТ", 
    description: "БОЛЬШОЙ ЦВЕТНОЙ",
    basePrice: 1300,
    emoji: "🔥"
  },
  { 
    id: "embroidery-text", 
    name: "ВЫШИВКА — ТЕКСТ", 
    description: "ВЫШИТЫЕ БУКВЫ",
    basePrice: 300,
    emoji: "🖤"
  },
  { 
    id: "embroidery-logo", 
    name: "ВЫШИВКА — ЛОГОТИП", 
    description: "ОБЪЕМНАЯ ВЫШИВКА",
    basePrice: 600,
    emoji: "💎"
  },
];

interface CalculatorConfig {
  garmentType: string;
  serviceType: string;
  quantity: number;
}

export default function BrutalistCalculator() {
  const { isRetail, getPriceMultiplier, getMinimumQuantity } = useClientType();
  const { calculateTotalPrice } = usePricing();
  
  const [config, setConfig] = useState<CalculatorConfig>({
    garmentType: "",
    serviceType: "",
    quantity: getMinimumQuantity(),
  });

  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  useEffect(() => {
    setConfig(prev => ({ ...prev, quantity: getMinimumQuantity() }));
  }, [getMinimumQuantity]);

  const calculatePrice = () => {
    if (!config.garmentType || !config.serviceType) return 0;
    
    const garment = garmentTypes.find(g => g.id === config.garmentType);
    const service = serviceTypes.find(s => s.id === config.serviceType);
    
    if (!garment || !service) return 0;
    
    return calculateTotalPrice(
      garment.basePrice + service.basePrice,
      config.quantity
    );
  };

  const totalPrice = calculatePrice();

  const handleQuickSelect = (garmentId: string, serviceId: string) => {
    setConfig({
      ...config,
      garmentType: garmentId,
      serviceType: serviceId
    });
    setShowPriceBreakdown(true);
  };

  return (
    <section id="calculator" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Brutalist Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-4 bg-red-500"></div>
        <div className="absolute bottom-0 right-0 w-4 h-full bg-white"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-red-500 transform rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-white transform rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="brutalist-text-huge mb-6">
            КАЛЬКУЛЯТОР
          </h2>
          <div className="h-2 w-32 bg-red-500 mx-auto mb-6"></div>
          <p className="text-2xl font-bold uppercase tracking-wider text-gray-300">
            РАССЧИТАЙ СТОИМОСТЬ ЗАКАЗА
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Side - Configuration */}
            <motion.div 
              className="space-y-8"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Quick Selection Buttons */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase">⚡ БЫСТРЫЙ ВЫБОР</h3>
                <div className="grid gap-4">
                  <motion.button
                    onClick={() => handleQuickSelect("tshirt", "dtf-logo")}
                    className="brutalist-button w-full text-left p-6 bg-white text-black border-4 border-black hover:bg-red-500 hover:text-white transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-black">👕 ФУТБОЛКА + ЛОГОТИП</div>
                        <div className="text-sm opacity-70">САМЫЙ ПОПУЛЯРНЫЙ ВАРИАНТ</div>
                      </div>
                      <div className="text-3xl font-black">ОТ 1900₽</div>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleQuickSelect("hoodie", "dtf-print")}
                    className="brutalist-button w-full text-left p-6 bg-red-500 text-white border-4 border-black hover:bg-white hover:text-black transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-black">🔥 ХУДИ + ФУЛЛ ПРИНТ</div>
                        <div className="text-sm opacity-70">ДЛЯ КРУТЫХ ДИЗАЙНОВ</div>
                      </div>
                      <div className="text-3xl font-black">ОТ 4500₽</div>
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Manual Selection */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase">🎯 КАСТОМНЫЙ ЗАКАЗ</h3>
                
                {/* Garment Type */}
                <div>
                  <label className="block text-lg font-black uppercase mb-4">ТИП ОДЕЖДЫ:</label>
                  <div className="grid grid-cols-1 gap-3">
                    {garmentTypes.map((garment) => (
                      <motion.button
                        key={garment.id}
                        onClick={() => setConfig({ ...config, garmentType: garment.id })}
                        className={`brutalist-input p-4 text-left transition-all border-4 ${
                          config.garmentType === garment.id 
                            ? 'bg-red-500 text-white border-white' 
                            : 'bg-white text-black border-black hover:border-red-500'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black">
                            {garment.emoji} {garment.name}
                          </span>
                          <span className="font-black">ОТ {garment.basePrice}₽</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-lg font-black uppercase mb-4">ТИП УСЛУГИ:</label>
                  <div className="grid grid-cols-1 gap-3">
                    {serviceTypes.map((service) => (
                      <motion.button
                        key={service.id}
                        onClick={() => setConfig({ ...config, serviceType: service.id })}
                        className={`brutalist-input p-4 text-left transition-all border-4 ${
                          config.serviceType === service.id 
                            ? 'bg-red-500 text-white border-white' 
                            : 'bg-white text-black border-black hover:border-red-500'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-black">{service.emoji} {service.name}</div>
                            <div className="text-sm opacity-70">{service.description}</div>
                          </div>
                          <span className="font-black">+{service.basePrice}₽</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-lg font-black uppercase mb-4">КОЛИЧЕСТВО:</label>
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={() => setConfig({
                        ...config, 
                        quantity: Math.max(getMinimumQuantity(), config.quantity - 1)
                      })}
                      className="brutalist-button bg-red-500 text-white w-12 h-12 text-2xl font-black"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      −
                    </motion.button>
                    
                    <div className="brutalist-input flex-1 text-center p-4 bg-white text-black border-4 border-black">
                      <span className="text-2xl font-black">{config.quantity} ШТ</span>
                    </div>
                    
                    <motion.button
                      onClick={() => setConfig({
                        ...config, 
                        quantity: config.quantity + 1
                      })}
                      className="brutalist-button bg-red-500 text-white w-12 h-12 text-2xl font-black"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                  <p className="text-sm mt-2 opacity-70">
                    {isRetail ? "МИНИМУМ 1 ШТ" : "МИНИМУМ 5 ШТ ДЛЯ ОПТОВЫХ ЗАКАЗОВ"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Price & Preview */}
            <motion.div 
              className="space-y-8"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Price Display */}
              <div className="brutalist-calculator p-8 bg-white text-black">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-black uppercase mb-4">💰 СТОИМОСТЬ</h3>
                  
                  {totalPrice > 0 ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <div className="text-6xl font-black mb-4 brutalist-text-shadow">
                        {totalPrice.toLocaleString()}₽
                      </div>
                      <div className="text-lg font-bold opacity-70">
                        ЗА {config.quantity} {config.quantity === 1 ? 'ШТУКУ' : 'ШТУК'}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-4xl font-black opacity-50 mb-4">
                      ВЫБЕРИТЕ ОПЦИИ
                    </div>
                  )}
                </div>

                {totalPrice > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button 
                      className="brutalist-button w-full bg-red-500 text-white text-xl font-black py-6 hover:bg-black transition-all"
                      onClick={() => {
                        document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      ▶ ЗАКАЗАТЬ СЕЙЧАС
                    </Button>
                    
                    <div className="mt-6 text-center text-sm font-bold opacity-70">
                      ⚡ ГОТОВО ЗА 1-3 ДНЯ
                      <br />
                      🚀 ДОСТАВКА ПО ВСЕЙ РОССИИ
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase">🔥 ПОЧЕМУ МЫ?</h3>
                <div className="space-y-3">
                  {[
                    "⚡ САМЫЕ БЫСТРЫЕ СРОКИ",
                    "💎 PREMIUM КАЧЕСТВО",
                    "🎯 ТОЧНО В СРОК",
                    "🔧 ИНДИВИДУАЛЬНЫЙ ПОДХОД"
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-red-500 text-white p-4 font-black text-lg border-4 border-black"
                    >
                      {benefit}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

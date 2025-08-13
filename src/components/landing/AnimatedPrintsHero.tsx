import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Данные принтов для анимации
const printDesigns = [
  { id: 1, image: "🔥", position: { x: 40, y: 60 }, delay: 0 },
  { id: 2, image: "⚡", position: { x: 60, y: 40 }, delay: 0.5 },
  { id: 3, image: "💀", position: { x: 30, y: 70 }, delay: 1 },
  { id: 4, image: "🖤", position: { x: 70, y: 65 }, delay: 1.5 },
  { id: 5, image: "🗲", position: { x: 45, y: 35 }, delay: 2 },
  { id: 6, image: "🔺", position: { x: 55, y: 75 }, delay: 2.5 },
  { id: 7, image: "◼", position: { x: 35, y: 45 }, delay: 3 },
  { id: 8, image: "▲", position: { x: 65, y: 55 }, delay: 3.5 },
];

export default function AnimatedPrintsHero() {
  const [currentPrintIndex, setCurrentPrintIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentPrintIndex((prev) => (prev + 1) % printDesigns.length);
    }, 800);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleStartCustomization = () => {
    setIsAnimating(false);
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Brutalist Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-red-500">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black uppercase">SMOLIN</div>
            <div className="flex space-x-6">
              <a href="#calculator" className="text-white hover:text-red-500 font-bold uppercase transition-colors">КАЛЬКУЛЯТОР</a>
              <a href="/ai-design" className="text-white hover:text-red-500 font-bold uppercase transition-colors">AI ДИЗАЙН</a>
              <a href="#contacts" className="text-white hover:text-red-500 font-bold uppercase transition-colors">КОНТАКТ</a>
            </div>
          </div>
        </div>
      </nav>
      {/* Brutalist Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-2 bg-white"></div>
        <div className="absolute bottom-0 right-0 w-2 h-full bg-white"></div>
        <div className="absolute top-1/4 left-0 w-32 h-32 bg-white transform rotate-45 -translate-x-16"></div>
        <div className="absolute bottom-1/4 right-0 w-24 h-24 bg-red-500 transform rotate-12 translate-x-12"></div>
      </div>

      <div className="container mx-auto px-6 h-screen flex items-center justify-center relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl w-full">
          
          {/* Left Side - Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.h1 
                className="text-6xl lg:text-8xl font-black tracking-tighter leading-none"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                SMOLIN
                <br />
                <span className="text-red-500">ATELIER</span>
              </motion.h1>
              
              <motion.div 
                className="h-1 w-32 bg-white"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </div>

            <motion.p 
              className="text-2xl lg:text-3xl font-bold uppercase tracking-wide text-gray-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              ПЕЧАТЬ & ВЫШИВКА
              <br />
              <span className="text-white">НА ЛЮБОЙ ОДЕЖДЕ</span>
            </motion.p>

            <motion.div 
              className="space-y-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="text-lg font-medium">
                ◼ DTF ПЕЧАТЬ ОТ 200₽
                <br />
                ◼ ВЫШИВКА ОТ 300₽  
                <br />
                ◼ ГОТОВО ЗА 1-3 ДНЯ
              </div>

              <Button 
                onClick={handleStartCustomization}
                className="bg-red-500 hover:bg-red-600 text-white text-xl font-black px-12 py-6 h-auto uppercase tracking-wider transform hover:scale-105 transition-all duration-200"
              >
                ▶ СОЗДАТЬ ДИЗАЙН
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Animated T-shirt */}
          <div className="relative flex justify-center items-center">
            {/* T-shirt Base */}
            <motion.div 
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* T-shirt SVG */}
              <svg width="400" height="480" viewBox="0 0 400 480" className="drop-shadow-2xl">
                <defs>
                  <filter id="brutalistShadow">
                    <feDropShadow dx="8" dy="8" stdDeviation="0" floodColor="#ff0000" floodOpacity="0.5"/>
                  </filter>
                </defs>
                
                {/* T-shirt Shape */}
                <path
                  d="M100 100 L100 70 Q100 50 120 50 L280 50 Q300 50 300 70 L300 100 L350 130 L350 440 Q350 460 330 460 L70 460 Q50 460 50 440 L50 130 Z"
                  fill="#ffffff"
                  stroke="#000000"
                  strokeWidth="4"
                  filter="url(#brutalistShadow)"
                />
                
                {/* Left Sleeve */}
                <path
                  d="M50 130 Q30 120 25 130 Q20 140 25 150 Q30 160 45 155 L50 150"
                  fill="#ffffff"
                  stroke="#000000"
                  strokeWidth="4"
                />
                
                {/* Right Sleeve */}
                <path
                  d="M350 130 Q370 120 375 130 Q380 140 375 150 Q370 160 355 155 L350 150"
                  fill="#ffffff"
                  stroke="#000000"
                  strokeWidth="4"
                />
                
                {/* Collar */}
                <path
                  d="M120 50 Q200 35 280 50 Q285 55 280 65 Q200 45 120 65 Q115 55 120 50"
                  fill="#ffffff"
                  stroke="#000000"
                  strokeWidth="4"
                />

                {/* Animated Prints */}
                <AnimatePresence mode="wait">
                  {printDesigns.slice(0, currentPrintIndex + 1).map((print, index) => (
                    <motion.g
                      key={`${print.id}-${index}`}
                      initial={{ scale: 0, opacity: 0, rotate: -180 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: print.delay,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                    >
                      {/* Print Background */}
                      <rect
                        x={`${print.position.x - 8}%`}
                        y={`${print.position.y - 4}%`}
                        width="48"
                        height="32"
                        fill="#000000"
                        stroke="#ff0000"
                        strokeWidth="2"
                        rx="4"
                      />
                      
                      {/* Print Icon */}
                      <text
                        x={`${print.position.x}%`}
                        y={`${print.position.y}%`}
                        fontSize="24"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="select-none"
                      >
                        {print.image}
                      </text>
                    </motion.g>
                  ))}
                </AnimatePresence>
              </svg>
            </motion.div>

            {/* Floating Text Elements */}
            <motion.div 
              className="absolute -top-8 -left-8 text-4xl font-black text-red-500 transform rotate-12"
              animate={{ 
                rotate: [12, 18, 12],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              WOW!
            </motion.div>

            <motion.div 
              className="absolute -bottom-8 -right-8 text-2xl font-black text-white transform -rotate-12"
              animate={{ 
                rotate: [-12, -18, -12],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ◼ ЭКСКЛЮЗИВ
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-white text-center">
          <div className="text-sm font-bold uppercase tracking-wider mb-2">СКРОЛЛ ВНИЗ</div>
          <div className="text-2xl">▼</div>
        </div>
      </motion.div>
    </section>
  );
}

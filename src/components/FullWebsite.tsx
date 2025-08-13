import { useState, useEffect } from "react";

interface CalculatorConfig {
  garmentType: string;
  serviceType: string;
  quantity: number;
  garmentColor: string;
  side: string;
  size: string;
}

const garmentTypes = [
  { id: "tshirt", name: "Футболка", basePrice: 1700, image: "👕" },
  { id: "hoodie", name: "Худи", basePrice: 3200, image: "🔥" },
  { id: "sweatshirt", name: "Свитшот", basePrice: 2800, image: "💪" },
  { id: "cap", name: "Кепка", basePrice: 1200, image: "🧢" }
];

const serviceTypes = [
  { id: "dtf-logo", name: "DTF Логотип", price: 200, description: "Малый принт до 10см" },
  { id: "dtf-print", name: "DTF Принт", price: 1300, description: "Большой цветной принт" },
  { id: "embroidery", name: "Вышивка", price: 300, description: "Объемная машинная вышивка" }
];

const colors = [
  { id: "white", name: "Белый", hex: "#ffffff", border: "#e5e7eb" },
  { id: "black", name: "Черный", hex: "#000000" },
  { id: "gray", name: "Серый", hex: "#6b7280" },
  { id: "navy", name: "Синий", hex: "#1e40af" },
  { id: "green", name: "Зеленый", hex: "#059669" },
  { id: "red", name: "Красный", hex: "#dc2626" }
];

const portfolioItems = [
  { 
    id: 1, 
    title: "Корпоративные футболки", 
    category: "DTF Печать",
    description: "Логотипы для IT компании",
    image: "🏢",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  { 
    id: 2, 
    title: "Streetwear худи", 
    category: "DTF Принт",
    description: "Яркие принты для молодежного бренда",
    image: "🔥",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  { 
    id: 3, 
    title: "Вышивка на поло", 
    category: "Вышивка",
    description: "Премиум вышивка для ресторана",
    image: "👔",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  { 
    id: 4, 
    title: "Кепки с логотипом", 
    category: "DTF Печать",
    description: "Брендированные кепки для спорт-клуба",
    image: "🧢",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  { 
    id: 5, 
    title: "Арт-принты", 
    category: "DTF Принт",
    description: "Художественные принты на футболках",
    image: "🎨",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  { 
    id: 6, 
    title: "Корпоративная форма", 
    category: "Вышивка",
    description: "Полный комплект рабочей одежды",
    image: "👷",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Анна Петрова",
    company: "StartupHub",
    text: "Заказывали корпоративные футболки для команды. Качество печати превосходное, сроки соблюдены. Рекомендуем!",
    rating: 5,
    avatar: "👩‍💼"
  },
  {
    id: 2,
    name: "Михаил Сидоров",
    company: "СпортКлуб Динамо",
    text: "Профессиональный подход, красивая вышивка на спортивной форме. Ребята знают свое дело!",
    rating: 5,
    avatar: "👨‍🏫"
  },
  {
    id: 3,
    name: "Елена Козлова",
    company: "Event Agency",
    text: "Часто заказываем мерч для мероприятий. Всегда качественно и в срок. Спасибо за отличную работу!",
    rating: 5,
    avatar: "👩‍🎨"
  }
];

export default function FullWebsite() {
  const [currentPage, setCurrentPage] = useState("home");
  const [config, setConfig] = useState<CalculatorConfig>({
    garmentType: "tshirt",
    serviceType: "dtf-logo",
    quantity: 1,
    garmentColor: "white",
    side: "front",
    size: "m"
  });
  const [activeStep, setActiveStep] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const calculatePrice = () => {
    const garment = garmentTypes.find(g => g.id === config.garmentType);
    const service = serviceTypes.find(s => s.id === config.serviceType);
    
    if (!garment || !service) return 0;
    
    const basePrice = garment.basePrice + service.price;
    return basePrice * config.quantity;
  };

  const selectedGarment = garmentTypes.find(g => g.id === config.garmentType);
  const selectedColor = colors.find(c => c.id === config.garmentColor);
  const totalPrice = calculatePrice();

  const renderGarmentPreview = () => {
    const baseColor = selectedColor?.hex || "#ffffff";
    const borderColor = selectedColor?.border || "#000000";
    
    if (config.garmentType === "tshirt") {
      return (
        <svg width="250" height="300" viewBox="0 0 250 300" className="mx-auto">
          {/* T-shirt shape */}
          <path
            d="M60 70 L60 55 Q60 35 80 35 L170 35 Q190 35 190 55 L190 70 L220 90 L220 260 Q220 280 200 280 L50 280 Q30 280 30 260 L30 90 Z"
            fill={baseColor}
            stroke={borderColor}
            strokeWidth="2"
          />
          {/* Sleeves */}
          <path d="M30 90 Q15 80 10 90 Q5 100 10 110 Q15 120 25 115 L30 110" fill={baseColor} stroke={borderColor} strokeWidth="2"/>
          <path d="M220 90 Q235 80 240 90 Q245 100 240 110 Q235 120 225 115 L220 110" fill={baseColor} stroke={borderColor} strokeWidth="2"/>
          {/* Collar */}
          <ellipse cx="125" cy="55" rx="25" ry="12" fill="none" stroke={borderColor} strokeWidth="2"/>
          
          {/* Print area */}
          <rect x="100" y="120" width="50" height="35" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" rx="4"/>
          <text x="125" y="142" textAnchor="middle" fontSize="10" fill="#3b82f6" fontWeight="bold">ПРИНТ</text>
        </svg>
      );
    }
    // Similar for other garment types...
    return null;
  };

  const Header = () => (
    <header style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setCurrentPage("home")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            SA
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '20px', color: '#1e293b' }}>SMOLIN ATELIER</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Печать & Вышивка</div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav style={{ 
          display: 'flex', 
          gap: '32px', 
          alignItems: 'center',
          '@media (max-width: 768px)': { display: 'none' }
        }}>
          <button 
            onClick={() => setCurrentPage("home")}
            style={{ 
              background: 'none',
              border: 'none',
              color: currentPage === "home" ? '#3b82f6' : '#64748b', 
              textDecoration: 'none', 
              fontWeight: '600',
              cursor: 'pointer',
              borderBottom: currentPage === "home" ? '2px solid #3b82f6' : 'none',
              paddingBottom: '4px'
            }}
          >
            ГЛАВНАЯ
          </button>
          <button 
            onClick={() => setCurrentPage("calculator")}
            style={{ 
              background: 'none',
              border: 'none',
              color: currentPage === "calculator" ? '#3b82f6' : '#64748b', 
              textDecoration: 'none', 
              fontWeight: '600',
              cursor: 'pointer',
              borderBottom: currentPage === "calculator" ? '2px solid #3b82f6' : 'none',
              paddingBottom: '4px'
            }}
          >
            КАЛЬКУЛЯТОР
          </button>
          <button 
            onClick={() => setCurrentPage("portfolio")}
            style={{ 
              background: 'none',
              border: 'none',
              color: currentPage === "portfolio" ? '#3b82f6' : '#64748b', 
              textDecoration: 'none', 
              fontWeight: '600',
              cursor: 'pointer',
              borderBottom: currentPage === "portfolio" ? '2px solid #3b82f6' : 'none',
              paddingBottom: '4px'
            }}
          >
            ПОРТФОЛИО
          </button>
          <button 
            onClick={() => setCurrentPage("contact")}
            style={{ 
              background: 'none',
              border: 'none',
              color: currentPage === "contact" ? '#3b82f6' : '#64748b', 
              textDecoration: 'none', 
              fontWeight: '600',
              cursor: 'pointer',
              borderBottom: currentPage === "contact" ? '2px solid #3b82f6' : 'none',
              paddingBottom: '4px'
            }}
          >
            КОНТАКТЫ
          </button>
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onClick={() => setCurrentPage("contact")}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            ЗАКАЗАТЬ
          </button>
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            '@media (max-width: 768px)': { display: 'block' },
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <button onClick={() => { setCurrentPage("home"); setIsMenuOpen(false); }}>ГЛАВНАЯ</button>
          <button onClick={() => { setCurrentPage("calculator"); setIsMenuOpen(false); }}>КАЛЬКУЛЯТОР</button>
          <button onClick={() => { setCurrentPage("portfolio"); setIsMenuOpen(false); }}>ПОРТФОЛИО</button>
          <button onClick={() => { setCurrentPage("contact"); setIsMenuOpen(false); }}>КОНТАКТЫ</button>
        </div>
      )}
    </header>
  );

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background patterns */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
          width: '100%'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              margin: '0 0 24px 0'
            }}>
              Печать и вышивка на одежде
              <span style={{
                display: 'block',
                background: 'linear-gradient(45deg, #ffd700, #ff6b6b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                в Санкт-Петербурге
              </span>
            </h1>
            <p style={{
              fontSize: '20px',
              lineHeight: '1.6',
              margin: '0 0 32px 0',
              opacity: 0.9
            }}>
              Создаем уникальную одежду с вашим дизайном. DTF печать, машинная вышивка, быстрые сроки и премиум качество.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => setCurrentPage("calculator")}
                style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #ffd700)',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                📐 РАССЧИТАТЬ СТОИМОСТЬ
              </button>
              <button 
                onClick={() => setCurrentPage("portfolio")}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '12px',
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  e.target.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🎨 ПОСМОТРЕТЬ РАБОТЫ
              </button>
            </div>
          </div>
          
          {/* Right side - Features grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }}>
            {[
              { icon: '⚡', title: '1-3 дня', desc: 'Быстрое изготовление' },
              { icon: '💎', title: 'Premium', desc: 'Качественные материалы' },
              { icon: '🎯', title: '300 DPI', desc: 'Четкая печать' },
              { icon: '🚚', title: 'Доставка', desc: 'По всей России' }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{feature.icon}</div>
                <div style={{ fontWeight: '700', fontSize: '18px', marginBottom: '8px' }}>{feature.title}</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{
        padding: '80px 24px',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            margin: '0 0 16px 0',
            color: '#1e293b'
          }}>
            Наши услуги
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            margin: '0 0 64px 0'
          }}>
            Профессиональная печать и вышивка на любой одежде
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {serviceTypes.map((service, index) => (
              <div key={service.id} style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-8px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: `linear-gradient(135deg, ${
                    index === 0 ? '#667eea, #764ba2' :
                    index === 1 ? '#f093fb, #f5576c' :
                    '#4facfe, #00f2fe'
                  })`,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 24px auto'
                }}>
                  {index === 0 ? '🖨️' : index === 1 ? '🎨' : '🧵'}
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: '0 0 12px 0',
                  color: '#1e293b'
                }}>
                  {service.name}
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: '0 0 20px 0'
                }}>
                  {service.description}
                </p>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#3b82f6'
                }}>
                  от {service.price}₽
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: '#ffffff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            margin: '0 0 64px 0'
          }}>
            Почему выбирают нас
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {[
              { icon: '🎯', title: 'Точность', desc: 'Каждый заказ выполняем с максимальным вниманием к деталям' },
              { icon: '⚡', title: 'Скорость', desc: 'Изготавливаем заказы за 1-3 дня без потери качества' },
              { icon: '💎', title: 'Качество', desc: 'Используем только премиальные материалы и оборудование' },
              { icon: '🎨', title: 'Креативность', desc: 'Помогаем воплотить любые дизайнерские идеи' }
            ].map((item, index) => (
              <div key={index} style={{
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '20px'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: '0 0 16px 0'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#cbd5e1',
                  lineHeight: '1.6'
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%)',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            margin: '0 0 24px 0',
            color: '#1e293b'
          }}>
            Готовы создать уникальную одежду?
          </h2>
          <p style={{
            fontSize: '20px',
            margin: '0 0 40px 0',
            color: '#374151'
          }}>
            Рассчитайте стоимость вашего заказа прямо сейчас
          </p>
          <button 
            onClick={() => setCurrentPage("calculator")}
            style={{
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '16px',
              padding: '20px 40px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🚀 НАЧАТЬ ЗАКАЗ
          </button>
        </div>
      </section>
    </div>
  );

  const CalculatorPage = () => (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '40px 24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '700',
            margin: '0 0 16px 0',
            color: '#1e293b'
          }}>
            Калькулятор стоимости
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            margin: 0
          }}>
            Настройте параметры и получите точную цену
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '48px',
          alignItems: 'start'
        }}>
          {/* Configuration Panel */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}>
            {/* Steps */}
            <div style={{ marginBottom: '32px' }}>
              {[
                { step: 1, title: 'Изделие', desc: 'Выберите тип одежды' },
                { step: 2, title: 'Цвет', desc: 'Выберите цвет изделия' },
                { step: 3, title: 'Услуга', desc: 'Тип печати или вышивки' },
                { step: 4, title: 'Количество', desc: 'Укажите количество' }
              ].map((item) => (
                <div key={item.step} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: activeStep === item.step ? '#eff6ff' : 'transparent',
                  border: activeStep === item.step ? '2px solid #3b82f6' : '2px solid transparent',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setActiveStep(item.step)}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: activeStep === item.step ? '#3b82f6' : '#e2e8f0',
                    color: activeStep === item.step ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    marginRight: '16px'
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: activeStep === item.step ? '#1e293b' : '#64748b'
                    }}>
                      {item.title}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#64748b'
                    }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step Content */}
            {activeStep === 1 && (
              <div>
                <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Выберите изделие</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}>
                  {garmentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setConfig({ ...config, garmentType: type.id })}
                      style={{
                        padding: '16px',
                        border: config.garmentType === type.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                        borderRadius: '12px',
                        backgroundColor: config.garmentType === type.id ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{type.image}</div>
                      <div style={{
                        fontWeight: '600',
                        color: config.garmentType === type.id ? '#3b82f6' : '#1e293b',
                        marginBottom: '4px'
                      }}>
                        {type.name}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#64748b'
                      }}>
                        от {type.basePrice}₽
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Выберите цвет</h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'center'
                }}>
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setConfig({ ...config, garmentColor: color.id })}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        border: config.garmentColor === color.id
                          ? '4px solid #3b82f6'
                          : color.border
                            ? `2px solid ${color.border}`
                            : '2px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                      title={color.name}
                    >
                      {config.garmentColor === color.id && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: color.hex === '#ffffff' ? '#3b82f6' : '#ffffff'
                        }}></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div>
                <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Выберите услугу</h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setConfig({ ...config, serviceType: service.id })}
                      style={{
                        padding: '16px',
                        border: config.serviceType === service.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                        borderRadius: '12px',
                        backgroundColor: config.serviceType === service.id ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        fontWeight: '600',
                        color: config.serviceType === service.id ? '#3b82f6' : '#1e293b',
                        marginBottom: '8px'
                      }}>
                        {service.name}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#64748b',
                        marginBottom: '8px'
                      }}>
                        {service.description}
                      </div>
                      <div style={{
                        fontWeight: '700',
                        color: '#3b82f6'
                      }}>
                        +{service.price}₽
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div>
                <h3 style={{ margin: '0 0 24px 0', color: '#1e293b' }}>Количество</h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px'
                }}>
                  <button
                    onClick={() => setConfig({ ...config, quantity: Math.max(1, config.quantity - 1) })}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#64748b'
                    }}
                  >
                    −
                  </button>

                  <div style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    minWidth: '80px',
                    textAlign: 'center'
                  }}>
                    {config.quantity}
                  </div>

                  <button
                    onClick={() => setConfig({ ...config, quantity: config.quantity + 1 })}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preview and Price */}
          <div>
            {/* Preview */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '48px',
              textAlign: 'center',
              marginBottom: '24px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                margin: '0 0 32px 0',
                color: '#1e293b'
              }}>
                Предварительный просмотр
              </h3>

              {renderGarmentPreview()}

              <div style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '8px'
                }}>
                  {selectedGarment?.name} • {selectedColor?.name}
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#64748b'
                }}>
                  {serviceTypes.find(s => s.id === config.serviceType)?.name}
                </div>
              </div>
            </div>

            {/* Price */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '700',
                margin: '0 0 8px 0',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {totalPrice.toLocaleString()} ₽
              </div>

              <div style={{
                fontSize: '16px',
                color: '#64748b',
                marginBottom: '32px'
              }}>
                за {config.quantity} {config.quantity === 1 ? 'штуку' : config.quantity < 5 ? 'штуки' : 'штук'}
              </div>

              <button style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '16px',
                padding: '20px 32px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '16px',
                transition: 'transform 0.2s ease'
              }}
              onClick={() => setCurrentPage("contact")}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                🚀 ЗАКАЗАТЬ СЕЙЧАС
              </button>

              <div style={{
                fontSize: '14px',
                color: '#64748b'
              }}>
                ⚡ Изготовление: 1-3 дня
                <br />
                🚚 Доставка по России
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PortfolioPage = () => (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '40px 24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '64px'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '700',
            margin: '0 0 16px 0',
            color: '#1e293b'
          }}>
            Наши работы
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            margin: 0
          }}>
            Примеры выполненных заказов для разных клиентов
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {portfolioItems.map((item) => (
            <div key={item.id} style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-8px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {/* Image placeholder */}
              <div style={{
                height: '240px',
                background: item.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '64px'
              }}>
                {item.image}
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{
                  fontSize: '14px',
                  color: '#3b82f6',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {item.category}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: '0 0 12px 0',
                  color: '#1e293b'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <section style={{
          marginTop: '80px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            margin: '0 0 16px 0',
            color: '#1e293b'
          }}>
            Отзывы клиентов
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            margin: '0 0 64px 0'
          }}>
            Что говорят о нашей работе
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                textAlign: 'left'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginRight: '16px'
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '700',
                      color: '#1e293b'
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#64748b'
                    }}>
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  marginBottom: '16px'
                }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#ffd700', fontSize: '20px' }}>★</span>
                  ))}
                </div>

                <p style={{
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '40px 24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '64px'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '700',
            margin: '0 0 16px 0',
            color: '#1e293b'
          }}>
            Контакты
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            margin: 0
          }}>
            Свяжитесь с нами удобным способом
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start'
        }}>
          {/* Contact Info */}
          <div>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              marginBottom: '32px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                margin: '0 0 32px 0',
                color: '#1e293b'
              }}>
                Как с нами связаться
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                {[
                  { icon: '📱', title: 'Телефон', value: '+7 (812) 000-00-00', desc: 'Звоните с 9:00 до 21:00' },
                  { icon: '📧', title: 'Email', value: 'hello@smolin-atelier.ru', desc: 'Ответим в течение часа' },
                  { icon: '📍', title: 'Адрес', value: 'Санкт-Петербург', desc: 'Самовывоз по договоренности' },
                  { icon: '💬', title: 'Telegram', value: '@smolin_atelier', desc: 'Быстрая связь и консультации' }
                ].map((contact, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      {contact.icon}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#1e293b',
                        marginBottom: '4px'
                      }}>
                        {contact.value}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#64748b'
                      }}>
                        {contact.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                margin: '0 0 24px 0',
                color: '#1e293b'
              }}>
                Время работы
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {[
                  { day: 'Понедельник - Пятница', time: '9:00 - 21:00' },
                  { day: 'Суббота', time: '10:00 - 18:00' },
                  { day: 'Воскресенье', time: '12:00 - 16:00' }
                ].map((schedule, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: index < 2 ? '1px solid #f1f5f9' : 'none'
                  }}>
                    <span style={{
                      color: '#64748b',
                      fontWeight: '500'
                    }}>
                      {schedule.day}
                    </span>
                    <span style={{
                      color: '#1e293b',
                      fontWeight: '700'
                    }}>
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              margin: '0 0 24px 0',
              color: '#1e293b'
            }}>
              Оставить заявку
            </h2>
            <p style={{
              color: '#64748b',
              margin: '0 0 32px 0',
              lineHeight: '1.6'
            }}>
              Опишите ваш проект, и мы свяжемся с вами для обсуждения деталей
            </p>

            <form style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Ваше имя
                </label>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Телефон или Email
                </label>
                <input
                  type="text"
                  placeholder="+7 (___) ___-__-__ или email@example.com"
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Описание заказа
                </label>
                <textarea
                  placeholder="Расскажите о вашем проекте: тип одежды, дизайн, количество..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    resize: 'vertical',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '18px 32px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                📨 ОТПРАВИТЬ ЗАЯВКУ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer style={{
      backgroundColor: '#1e293b',
      color: '#ffffff',
      padding: '64px 24px 32px',
      marginTop: '80px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          marginBottom: '48px'
        }}>
          {/* Company Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                SA
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '20px' }}>SMOLIN ATELIER</div>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Печать & Вышивка</div>
              </div>
            </div>
            <p style={{
              color: '#cbd5e1',
              lineHeight: '1.6',
              margin: 0
            }}>
              Профессиональная печать и вышивка на одежде в Санкт-Петербурге. 
              Высокое качество, быстрые сроки, индивидуальный подход.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: '0 0 20px 0'
            }}>
              Услуги
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {['DTF печать', 'Машинная вышивка', 'Корпоративная одежда', 'AI дизайн'].map((service) => (
                <a key={service} href="#" style={{
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#ffffff'}
                onMouseOut={(e) => e.target.style.color = '#cbd5e1'}
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: '0 0 20px 0'
            }}>
              Быстрые ссылки
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {[
                { text: 'Калькулятор', action: () => setCurrentPage("calculator") },
                { text: 'Портфолио', action: () => setCurrentPage("portfolio") },
                { text: 'О нас', action: () => setCurrentPage("home") },
                { text: 'Контакты', action: () => setCurrentPage("contact") }
              ].map((link) => (
                <button key={link.text} 
                  onClick={link.action}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#cbd5e1',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#ffffff'}
                  onMouseOut={(e) => e.target.style.color = '#cbd5e1'}
                >
                  {link.text}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: '0 0 20px 0'
            }}>
              Контакты
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              color: '#cbd5e1'
            }}>
              <div>📱 +7 (812) 000-00-00</div>
              <div>📧 hello@smolin-atelier.ru</div>
              <div>📍 Санкт-Петербург</div>
              <div>💬 @smolin_atelier</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{
            color: '#94a3b8',
            fontSize: '14px'
          }}>
            © 2024 SMOLIN ATELIER. Все права защищены.
          </div>
          <div style={{
            display: 'flex',
            gap: '24px'
          }}>
            {['📱', '📧', '💬', '📍'].map((icon, index) => (
              <button key={index} style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh'
    }}>
      <Header />
      
      {currentPage === "home" && <HomePage />}
      {currentPage === "calculator" && <CalculatorPage />}
      {currentPage === "portfolio" && <PortfolioPage />}
      {currentPage === "contact" && <ContactPage />}
      
      <Footer />
    </div>
  );
}

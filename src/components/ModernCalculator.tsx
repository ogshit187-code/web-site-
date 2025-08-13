import { useState, useEffect } from "react";

interface CalculatorConfig {
  garmentType: string;
  serviceType: string;
  quantity: number;
  garmentColor: string;
  side: string;
  size: string;
  material: string;
}

const garmentTypes = [
  { id: "tshirt", name: "Футболка", basePrice: 1700, image: "👕" },
  { id: "hoodie", name: "Худи", basePrice: 3200, image: "🔥" },
  { id: "sweatshirt", name: "Свитшот", basePrice: 2800, image: "💪" },
  { id: "cap", name: "Кепка", basePrice: 1200, image: "🧢" }
];

const serviceTypes = [
  { id: "dtf-logo", name: "DTF Логотип", price: 200, description: "Малый принт" },
  { id: "dtf-print", name: "DTF Принт", price: 1300, description: "Большой принт" },
  { id: "embroidery", name: "Вышивка", price: 300, description: "Объемная вышивка" }
];

const colors = [
  { id: "white", name: "Белый", hex: "#ffffff", border: "#e5e7eb" },
  { id: "black", name: "Черный", hex: "#000000" },
  { id: "gray", name: "Серый", hex: "#6b7280" },
  { id: "navy", name: "Синий", hex: "#1e40af" },
  { id: "green", name: "Зеленый", hex: "#059669" },
  { id: "red", name: "Красный", hex: "#dc2626" }
];

const materials = [
  { id: "cotton", name: "100% Хлопок", description: "160г/м²" },
  { id: "blend", name: "Хлопок/Полиэстер", description: "180г/м²" },
  { id: "premium", name: "Премиум", description: "220г/м²" }
];

const sizes = [
  { id: "xs", name: "XS" },
  { id: "s", name: "S" },
  { id: "m", name: "M" },
  { id: "l", name: "L" },
  { id: "xl", name: "XL" },
  { id: "xxl", name: "XXL" }
];

const sides = [
  { id: "front", name: "Перед", price: 0 },
  { id: "back", name: "Спина", price: 0 },
  { id: "both", name: "Обе стороны", price: 500 }
];

export default function ModernCalculator() {
  const [config, setConfig] = useState<CalculatorConfig>({
    garmentType: "tshirt",
    serviceType: "dtf-logo",
    quantity: 1,
    garmentColor: "white",
    side: "front",
    size: "m",
    material: "cotton"
  });

  const [activeStep, setActiveStep] = useState(1);

  const calculatePrice = () => {
    const garment = garmentTypes.find(g => g.id === config.garmentType);
    const service = serviceTypes.find(s => s.id === config.serviceType);
    const sideOption = sides.find(s => s.id === config.side);
    
    if (!garment || !service || !sideOption) return 0;
    
    const basePrice = garment.basePrice + service.price + sideOption.price;
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
        <svg width="300" height="350" viewBox="0 0 300 350" className="mx-auto">
          {/* T-shirt shape */}
          <path
            d="M75 85 L75 65 Q75 45 95 45 L205 45 Q225 45 225 65 L225 85 L265 110 L265 310 Q265 330 245 330 L55 330 Q35 330 35 310 L35 110 Z"
            fill={baseColor}
            stroke={borderColor}
            strokeWidth="2"
          />
          {/* Left sleeve */}
          <path
            d="M35 110 Q20 100 15 110 Q10 120 15 130 Q20 140 30 135 L35 130"
            fill={baseColor}
            stroke={borderColor}
            strokeWidth="2"
          />
          {/* Right sleeve */}
          <path
            d="M265 110 Q280 100 285 110 Q290 120 285 130 Q280 140 270 135 L265 130"
            fill={baseColor}
            stroke={borderColor}
            strokeWidth="2"
          />
          {/* Collar */}
          <ellipse cx="150" cy="65" rx="30" ry="15" fill="none" stroke={borderColor} strokeWidth="2"/>
          
          {/* Print preview area */}
          <rect 
            x="125" y="140" width="50" height="40" 
            fill="rgba(59, 130, 246, 0.2)" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            strokeDasharray="5,5"
            rx="4"
          />
          <text x="150" y="165" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="bold">
            ПРИНТ
          </text>
        </svg>
      );
    } else if (config.garmentType === "hoodie") {
      return (
        <svg width="300" height="380" viewBox="0 0 300 380" className="mx-auto">
          {/* Hoodie shape */}
          <path
            d="M70 95 L70 70 Q70 45 95 45 L205 45 Q230 45 230 70 L230 95 L270 120 L270 340 Q270 365 245 365 L55 365 Q30 365 30 340 L30 120 Z"
            fill={baseColor}
            stroke={borderColor}
            strokeWidth="2"
          />
          {/* Hood */}
          <path
            d="M95 45 Q150 20 205 45 Q220 55 205 70 Q175 55 150 50 Q125 55 95 70 Q80 55 95 45"
            fill={baseColor}
            stroke={borderColor}
            strokeWidth="2"
          />
          {/* Sleeves */}
          <path
            d="M30 120 Q15 110 10 120 Q5 130 10 140 Q15 150 25 145 L30 140"
            fill={baseColor}
            stroke={borderColor}
            strokeWidth="2"
          />
          <path
            d="M270 120 Q285 110 290 120 Q295 130 290 140 Q285 150 275 145 L270 140"
            fill={baseColor}
            stroke={borderColor}
            strokeWidth="2"
          />
          {/* Pocket */}
          <rect x="110" y="180" width="80" height="50" fill="none" stroke={borderColor} strokeWidth="1" rx="8"/>
          
          {/* Print preview area */}
          <rect 
            x="125" y="140" width="50" height="40" 
            fill="rgba(59, 130, 246, 0.2)" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            strokeDasharray="5,5"
            rx="4"
          />
          <text x="150" y="165" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="bold">
            ПРИНТ
          </text>
        </svg>
      );
    } else if (config.garmentType === "cap") {
      return (
        <svg width="300" height="200" viewBox="0 0 300 200" className="mx-auto">
          {/* Cap crown */}
          <ellipse 
            cx="150" cy="80" rx="120" ry="60" 
            fill={baseColor} 
            stroke={borderColor} 
            strokeWidth="2"
          />
          {/* Cap visor */}
          <ellipse 
            cx="150" cy="140" rx="90" ry="25" 
            fill={baseColor} 
            stroke={borderColor} 
            strokeWidth="2"
          />
          {/* Cap panels */}
          <path d="M60 80 Q150 40 240 80" stroke={borderColor} strokeWidth="1" fill="none"/>
          <path d="M80 80 Q150 50 220 80" stroke={borderColor} strokeWidth="1" fill="none"/>
          
          {/* Print preview area */}
          <rect 
            x="125" y="65" width="50" height="30" 
            fill="rgba(59, 130, 246, 0.2)" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            strokeDasharray="5,5"
            rx="4"
          />
          <text x="150" y="85" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="bold">
            ЛОГО
          </text>
        </svg>
      );
    }
    return null;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#000000',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              SA
            </div>
            <span style={{ fontWeight: '600', fontSize: '18px' }}>SMOLIN ATELIER</span>
          </div>
          
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500' }}>КАТАЛОГ</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500' }}>ПОРТФОЛИО</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500' }}>О НАС</a>
            <button style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              КОНТАКТЫ
            </button>
          </nav>
        </div>
      </header>

      {/* Main Calculator */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            margin: '0 0 16px 0',
            color: '#1e293b'
          }}>
            СОЗДАЙТЕ СВОЙ ДИЗАЙН
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            margin: 0
          }}>
            Настройте изделие под ваши потребности
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '64px',
          alignItems: 'start'
        }}>
          {/* Left side - Configuration panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            
            {/* Step 1: Material/Product */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: activeStep === 1 ? '12px' : '8px',
              padding: '24px',
              border: activeStep === 1 ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              transform: activeStep === 1 ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onClick={() => setActiveStep(1)}>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: activeStep === 1 ? '#3b82f6' : '#e2e8f0',
                  color: activeStep === 1 ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginRight: '12px'
                }}>
                  1
                </div>
                <span style={{
                  fontWeight: '600',
                  fontSize: '18px',
                  color: activeStep === 1 ? '#1e293b' : '#64748b'
                }}>
                  Изделие
                </span>
              </div>

              {activeStep === 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {garmentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfig({ ...config, garmentType: type.id });
                      }}
                      style={{
                        padding: '16px',
                        border: config.garmentType === type.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        backgroundColor: config.garmentType === type.id ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{type.image}</div>
                      <div style={{ 
                        fontWeight: '500', 
                        fontSize: '14px',
                        color: config.garmentType === type.id ? '#3b82f6' : '#1e293b'
                      }}>
                        {type.name}
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#64748b',
                        marginTop: '4px'
                      }}>
                        от {type.basePrice}₽
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeStep !== 1 && selectedGarment && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#64748b'
                }}>
                  <span style={{ fontSize: '20px', marginRight: '8px' }}>{selectedGarment.image}</span>
                  <span>{selectedGarment.name}</span>
                </div>
              )}
            </div>

            {/* Step 2: Colors */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: activeStep === 2 ? '12px' : '8px',
              padding: '24px',
              border: activeStep === 2 ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              transform: activeStep === 2 ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onClick={() => setActiveStep(2)}>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: activeStep === 2 ? '#3b82f6' : '#e2e8f0',
                  color: activeStep === 2 ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginRight: '12px'
                }}>
                  2
                </div>
                <span style={{
                  fontWeight: '600',
                  fontSize: '18px',
                  color: activeStep === 2 ? '#1e293b' : '#64748b'
                }}>
                  Цвета
                </span>
              </div>

              {activeStep === 2 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'center'
                }}>
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfig({ ...config, garmentColor: color.id });
                      }}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        border: config.garmentColor === color.id 
                          ? '3px solid #3b82f6' 
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
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: color.hex === '#ffffff' ? '#3b82f6' : '#ffffff'
                        }}></div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {activeStep !== 2 && selectedColor && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#64748b'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: selectedColor.hex,
                    border: selectedColor.border ? `1px solid ${selectedColor.border}` : '1px solid #e2e8f0',
                    marginRight: '8px'
                  }}></div>
                  <span>{selectedColor.name}</span>
                </div>
              )}
            </div>

            {/* Step 3: Service */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: activeStep === 3 ? '12px' : '8px',
              padding: '24px',
              border: activeStep === 3 ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              transform: activeStep === 3 ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onClick={() => setActiveStep(3)}>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: activeStep === 3 ? '#3b82f6' : '#e2e8f0',
                  color: activeStep === 3 ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginRight: '12px'
                }}>
                  3
                </div>
                <span style={{
                  fontWeight: '600',
                  fontSize: '18px',
                  color: activeStep === 3 ? '#1e293b' : '#64748b'
                }}>
                  Услуга
                </span>
              </div>

              {activeStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfig({ ...config, serviceType: service.id });
                      }}
                      style={{
                        padding: '12px 16px',
                        border: config.serviceType === service.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        backgroundColor: config.serviceType === service.id ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ 
                        fontWeight: '500',
                        color: config.serviceType === service.id ? '#3b82f6' : '#1e293b',
                        marginBottom: '4px'
                      }}>
                        {service.name}
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#64748b'
                      }}>
                        {service.description} • +{service.price}₽
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Step 4: Quantity */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: activeStep === 4 ? '12px' : '8px',
              padding: '24px',
              border: activeStep === 4 ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              transform: activeStep === 4 ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onClick={() => setActiveStep(4)}>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: activeStep === 4 ? '#3b82f6' : '#e2e8f0',
                  color: activeStep === 4 ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginRight: '12px'
                }}>
                  4
                </div>
                <span style={{
                  fontWeight: '600',
                  fontSize: '18px',
                  color: activeStep === 4 ? '#1e293b' : '#64748b'
                }}>
                  Количество
                </span>
              </div>

              {activeStep === 4 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px'
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfig({ ...config, quantity: Math.max(1, config.quantity - 1) });
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#64748b'
                    }}
                  >
                    −
                  </button>
                  
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    minWidth: '60px',
                    textAlign: 'center'
                  }}>
                    {config.quantity}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfig({ ...config, quantity: config.quantity + 1 });
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}
                  >
                    +
                  </button>
                </div>
              )}

              {activeStep !== 4 && (
                <div style={{
                  color: '#64748b',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  {config.quantity} шт
                </div>
              )}
            </div>
          </div>

          {/* Right side - Preview and Price */}
          <div style={{
            position: 'sticky',
            top: '24px'
          }}>
            {/* Product Preview */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '48px',
              textAlign: 'center',
              marginBottom: '24px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                margin: '0 0 32px 0',
                color: '#1e293b'
              }}>
                ВЫБЕРИТЕ ВАШ МАТЕРИАЛ
              </h3>
              
              {renderGarmentPreview()}
              
              {/* Color selection indicators */}
              <div style={{
                position: 'absolute',
                right: '24px',
                top: '120px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {colors.slice(0, 4).map((color, index) => (
                  <div
                    key={color.id}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: config.garmentColor === color.id 
                        ? '3px solid #3b82f6' 
                        : color.border 
                          ? `2px solid ${color.border}` 
                          : '2px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                    onClick={() => setConfig({ ...config, garmentColor: color.id })}
                  >
                    <div style={{
                      position: 'absolute',
                      right: '-12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#64748b',
                      whiteSpace: 'nowrap'
                    }}>
                      {color.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price and Order */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '48px',
                fontWeight: '700',
                margin: '0 0 8px 0',
                color: '#1e293b'
              }}>
                {totalPrice.toLocaleString()} ₽
              </div>
              
              <div style={{
                fontSize: '16px',
                color: '#64748b',
                marginBottom: '24px'
              }}>
                за {config.quantity} {config.quantity === 1 ? 'штуку' : 'штук'}
              </div>

              <button style={{
                width: '100%',
                backgroundColor: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '16px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1f2937'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#000000'}>
                ЗАКАЗАТЬ
              </button>

              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '14px',
                cursor: 'pointer',
                margin: '0 auto'
              }}>
                <span>❤️</span>
                Сохранить на потом
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

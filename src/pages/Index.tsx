import { useState } from "react";

const Index = () => {
  const [printIndex, setPrintIndex] = useState(0);
  
  const prints = ["🔥", "⚡", "💀", "🖤", "🗲", "🔺", "◼", "▲"];
  
  // Анимация принтов
  const startAnimation = () => {
    let index = 0;
    const interval = setInterval(() => {
      setPrintIndex(prev => prev + 1);
      index++;
      if (index >= prints.length) {
        clearInterval(interval);
      }
    }, 600);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000',
        borderBottom: '4px solid #ff0000',
        padding: '16px',
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            SMOLIN
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#calculator" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>КАЛЬКУЛЯТОР</a>
            <a href="#contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>КОНТАКТ</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80px',
        position: 'relative'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '8px',
          backgroundColor: '#ffffff'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '8px',
          height: '100%',
          backgroundColor: '#ffffff'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: 0,
          width: '128px',
          height: '128px',
          backgroundColor: '#ffffff',
          transform: 'rotate(45deg) translateX(-64px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '25%',
          right: 0,
          width: '96px',
          height: '96px',
          backgroundColor: '#ff0000',
          transform: 'rotate(12deg) translateX(48px)'
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
          {/* Left Side - Text */}
          <div style={{ zIndex: 10 }}>
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                fontWeight: '900',
                lineHeight: '0.9',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                margin: 0,
                marginBottom: '16px'
              }}>
                SMOLIN
                <br />
                <span style={{ color: '#ff0000' }}>ATELIER</span>
              </h1>
              
              <div style={{
                height: '4px',
                width: '128px',
                backgroundColor: '#ffffff',
                marginBottom: '32px'
              }}></div>
            </div>

            <p style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#cccccc',
              margin: '0 0 32px 0'
            }}>
              ПЕЧАТЬ & ВЫШИВКА
              <br />
              <span style={{ color: '#ffffff' }}>НА ЛЮБОЙ ОДЕЖДЕ</span>
            </p>

            <div style={{ marginBottom: '32px' }}>
              <div style={{
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                ◼ DTF ПЕЧАТЬ ОТ 200₽
                <br />
                ◼ ВЫШИВКА ОТ 300₽  
                <br />
                ◼ ГОТОВО ЗА 1-3 ДНЯ
              </div>

              <button 
                onClick={startAnimation}
                style={{
                  backgroundColor: '#ff0000',
                  color: '#ffffff',
                  border: '4px solid #000000',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '24px 48px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  boxShadow: '8px 8px 0px #000000',
                  transition: 'all 0.15s ease'
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'translate(4px, 4px)';
                  e.target.style.boxShadow = '4px 4px 0px #000000';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'translate(0, 0)';
                  e.target.style.boxShadow = '8px 8px 0px #000000';
                }}
              >
                ▶ СОЗДАТЬ ДИЗАЙН
              </button>
            </div>
          </div>

          {/* Right Side - Animated T-shirt */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            {/* T-shirt SVG */}
            <svg width="400" height="480" viewBox="0 0 400 480" style={{ filter: 'drop-shadow(8px 8px 0px #ff0000)' }}>
              {/* T-shirt Shape */}
              <path
                d="M100 100 L100 70 Q100 50 120 50 L280 50 Q300 50 300 70 L300 100 L350 130 L350 440 Q350 460 330 460 L70 460 Q50 460 50 440 L50 130 Z"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="4"
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
              {prints.slice(0, printIndex).map((print, index) => {
                const positions = [
                  { x: 40, y: 60 }, { x: 60, y: 40 }, { x: 30, y: 70 }, { x: 70, y: 65 },
                  { x: 45, y: 35 }, { x: 55, y: 75 }, { x: 35, y: 45 }, { x: 65, y: 55 }
                ];
                const pos = positions[index] || { x: 50, y: 50 };
                
                return (
                  <g key={index}>
                    {/* Print Background */}
                    <rect
                      x={`${pos.x - 8}%`}
                      y={`${pos.y - 4}%`}
                      width="48"
                      height="32"
                      fill="#000000"
                      stroke="#ff0000"
                      strokeWidth="2"
                      rx="4"
                    />
                    
                    {/* Print Icon */}
                    <text
                      x={`${pos.x}%`}
                      y={`${pos.y}%`}
                      fontSize="24"
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ userSelect: 'none' }}
                    >
                      {print}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Floating Text Elements */}
            <div style={{
              position: 'absolute',
              top: '-32px',
              left: '-32px',
              fontSize: '48px',
              fontWeight: '900',
              color: '#ff0000',
              transform: 'rotate(12deg)',
              animation: 'float 2s ease-in-out infinite'
            }}>
              WOW!
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-32px',
              right: '-32px',
              fontSize: '24px',
              fontWeight: '900',
              color: '#ffffff',
              transform: 'rotate(-12deg)'
            }}>
              ◼ ЭКСКЛЮЗИВ
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '8px'
          }}>
            СКРОЛЛ ВНИЗ
          </div>
          <div style={{ fontSize: '24px' }}>▼</div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" style={{
        padding: '96px 24px',
        backgroundColor: '#000000',
        color: '#ffffff',
        position: 'relative'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '16px',
          backgroundColor: '#ff0000'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '16px',
          height: '100%',
          backgroundColor: '#ffffff'
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            fontWeight: '900',
            lineHeight: '0.9',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: '0 0 24px 0'
          }}>
            КАЛЬКУЛЯТОР
          </h2>
          <div style={{
            height: '8px',
            width: '128px',
            backgroundColor: '#ff0000',
            margin: '0 auto 24px auto'
          }}></div>
          <p style={{
            fontSize: '24px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#cccccc',
            margin: '0 0 64px 0'
          }}>
            РАССЧИТАЙ СТОИМОСТЬ ЗАКАЗА
          </p>

          <div style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '6px solid #000000',
            boxShadow: '12px 12px 0px #ff0000',
            padding: '48px',
            margin: '0 auto',
            maxWidth: '600px'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '900',
              textTransform: 'uppercase',
              margin: '0 0 32px 0'
            }}>
              💰 БЫСТРЫЙ РАСЧЕТ
            </h3>
            
            <div style={{
              fontSize: '64px',
              fontWeight: '900',
              margin: '32px 0',
              textShadow: '4px 4px 0px #ff0000'
            }}>
              1900₽
            </div>
            
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#666666',
              marginBottom: '32px'
            }}>
              ФУТБОЛКА + DTF ЛОГОТИП
            </div>

            <button style={{
              backgroundColor: '#ff0000',
              color: '#ffffff',
              border: '4px solid #000000',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '24px 48px',
              fontSize: '20px',
              cursor: 'pointer',
              boxShadow: '8px 8px 0px #000000',
              width: '100%'
            }}>
              ▶ ЗАКАЗАТЬ СЕЙЧАС
            </button>
            
            <div style={{
              marginTop: '24px',
              fontSize: '14px',
              fontWeight: '700',
              color: '#666666'
            }}>
              ⚡ ГОТОВО ЗА 1-3 ДНЯ
              <br />
              🚀 ДОСТАВКА ПО ВСЕЙ РОССИИ
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '96px 24px',
        backgroundColor: '#ff0000',
        color: '#ffffff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            fontWeight: '900',
            lineHeight: '0.9',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: '0 0 24px 0'
          }}>
            КОНТАКТЫ
          </h2>
          <div style={{
            height: '8px',
            width: '128px',
            backgroundColor: '#000000',
            margin: '0 auto 48px auto'
          }}></div>
          
          <div style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            border: '6px solid #ffffff',
            padding: '48px',
            margin: '0 auto',
            maxWidth: '600px'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '24px'
            }}>
              📧 hello@smolin-atelier.ru
              <br />
              📱 +7 (812) 000-00-00
              <br />
              📍 Санкт-Петербург
            </div>
            
            <button style={{
              backgroundColor: '#ff0000',
              color: '#ffffff',
              border: '4px solid #ffffff',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '20px 40px',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '8px 8px 0px #ffffff',
              marginTop: '24px'
            }}>
              НАПИСАТЬ В TELEGRAM
            </button>
          </div>
        </div>
      </section>

      {/* Float Animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: rotate(12deg) translateY(0px); }
            50% { transform: rotate(12deg) translateY(-10px); }
          }
        `
      }} />
    </div>
  );
};

export default Index;
import { useState } from "react";

interface CalculatorConfig {
  material: string;
  color: string;
  logo: string;
  text: string;
}

const materials = [
  { id: "cotton", name: "Cotton", price: 0 },
  { id: "suede", name: "Suede", price: 500 },
  { id: "leather", name: "Leather", price: 1000 },
  { id: "corduroy", name: "Corduroy", price: 300 }
];

const colors = [
  { id: "suede", name: "Suede", hex: "#8B7355" },
  { id: "leather", name: "Leather", hex: "#D2B48C" },
  { id: "cotton", name: "Cotton", hex: "#F5F5DC" },
  { id: "corduroy", name: "Corduroy", hex: "#556B2F" },
  { id: "jeans", name: "Jeans", hex: "#4682B4" }
];

export default function FashionCalculator() {
  const [config, setConfig] = useState<CalculatorConfig>({
    material: "cotton",
    color: "cotton",
    logo: "",
    text: ""
  });

  const [activeStep, setActiveStep] = useState("material");

  const calculatePrice = () => {
    const baseMaterial = materials.find(m => m.id === config.material);
    const basePrice = 35.00;
    return basePrice + (baseMaterial?.price || 0) / 100;
  };

  const selectedColor = colors.find(c => c.id === config.color);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FEFEFE',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      position: 'relative'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        borderBottom: '1px solid #F0F0F0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: '#000000',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}></div>
          <div style={{
            width: '24px',
            height: '24px',
            background: '#000000',
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
          }}></div>
        </div>

        <nav style={{
          display: 'flex',
          gap: '48px',
          alignItems: 'center'
        }}>
          <a href="#" style={{
            color: '#000000',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '400',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>CUSTOM</a>
          <a href="#" style={{
            color: '#000000',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '400',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>LOOKBOOK</a>
          <a href="#" style={{
            color: '#000000',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '400',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>ABOUT US</a>
        </nav>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: 'radial-gradient(circle, #FF6B6B 30%, transparent 30%)',
            backgroundSize: '8px 8px'
          }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#666666'
          }}>
            <span>♡</span>
            <span>FAVORITES</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#666666'
          }}>
            <span>🛍</span>
            <span>BAG</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr 200px',
        gap: '0px',
        minHeight: 'calc(100vh - 120px)',
        position: 'relative'
      }}>
        {/* Left Panel - Configuration Steps */}
        <div style={{
          padding: '80px 0 80px 80px',
          position: 'relative'
        }}>
          {/* Connecting Line */}
          <div style={{
            position: 'absolute',
            left: '140px',
            top: '120px',
            bottom: '120px',
            width: '2px',
            background: 'linear-gradient(to bottom, #E0E0E0 0%, #E0E0E0 100%)'
          }}></div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '60px'
          }}>
            {/* Material Step */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '300',
                color: activeStep === 'material' ? '#000000' : '#999999',
                letterSpacing: '0.5px',
                minWidth: '80px'
              }}>
                Material
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: activeStep === 'material' ? '#000000' : '#E0E0E0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 2
              }}
              onClick={() => setActiveStep('material')}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: activeStep === 'material' ? '#FFFFFF' : '#999999'
                }}></div>
              </div>
            </div>

            {/* Colors Step */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '300',
                color: activeStep === 'colors' ? '#000000' : '#999999',
                letterSpacing: '0.5px',
                minWidth: '80px'
              }}>
                Colors
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: activeStep === 'colors' ? '#000000' : '#E0E0E0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 2
              }}
              onClick={() => setActiveStep('colors')}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: activeStep === 'colors' ? '#FFFFFF' : '#999999'
                }}></div>
              </div>
            </div>

            {/* Logo Step */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '300',
                color: activeStep === 'logo' ? '#000000' : '#999999',
                letterSpacing: '0.5px',
                minWidth: '80px'
              }}>
                Logo
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: activeStep === 'logo' ? '#000000' : '#E0E0E0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 2
              }}
              onClick={() => setActiveStep('logo')}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: activeStep === 'logo' ? '#FFFFFF' : '#999999'
                }}></div>
              </div>
              <div style={{
                fontSize: '12px',
                color: '#CCCCCC',
                letterSpacing: '0.5px'
              }}>
                + 5€
              </div>
            </div>

            {/* Text Step */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '300',
                color: activeStep === 'text' ? '#000000' : '#999999',
                letterSpacing: '0.5px',
                minWidth: '80px'
              }}>
                Text
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: activeStep === 'text' ? '#000000' : '#E0E0E0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 2
              }}
              onClick={() => setActiveStep('text')}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: activeStep === 'text' ? '#FFFFFF' : '#999999'
                }}></div>
              </div>
              <div style={{
                fontSize: '12px',
                color: '#CCCCCC',
                letterSpacing: '0.5px'
              }}>
                + 5€
              </div>
            </div>
          </div>
        </div>

        {/* Center - Product Showcase */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 40px',
          position: 'relative'
        }}>
          {/* Title */}
          <h1 style={{
            fontSize: '18px',
            fontWeight: '400',
            color: '#000000',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '60px',
            textAlign: 'center'
          }}>
            Choose Your Material
          </h1>

          {/* Product Image - Cap */}
          <div style={{
            width: '320px',
            height: '320px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            position: 'relative'
          }}>
            {/* Cap SVG */}
            <svg width="280" height="200" viewBox="0 0 280 200" style={{
              filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.1))'
            }}>
              {/* Cap crown */}
              <ellipse 
                cx="140" cy="80" rx="110" ry="50" 
                fill={selectedColor?.hex || "#F5F5DC"}
                stroke="#E0E0E0"
                strokeWidth="1"
              />
              {/* Cap visor */}
              <ellipse 
                cx="140" cy="130" rx="80" ry="20" 
                fill={selectedColor?.hex || "#F5F5DC"}
                stroke="#E0E0E0"
                strokeWidth="1"
              />
              {/* Cap panels */}
              <path d="M60 80 Q140 45 220 80" stroke="#E0E0E0" strokeWidth="0.5" fill="none"/>
              <path d="M80 80 Q140 55 200 80" stroke="#E0E0E0" strokeWidth="0.5" fill="none"/>
              
              {/* Logo area */}
              <rect 
                x="115" y="65" width="50" height="25" 
                fill="rgba(0,0,0,0.05)" 
                stroke="#CCCCCC" 
                strokeWidth="1" 
                strokeDasharray="2,2"
                rx="2"
              />
            </svg>

            {/* Connecting lines to colors */}
            <div style={{
              position: 'absolute',
              right: '-60px',
              top: '50%',
              width: '120px',
              height: '2px',
              background: 'linear-gradient(to right, #E0E0E0, transparent)',
              transform: 'translateY(-50%)'
            }}></div>
          </div>

          {/* Rotation Controls */}
          <div style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '60px'
          }}>
            <button style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid #E0E0E0',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: '#666666'
            }}>
              ↻
            </button>
            <div style={{
              fontSize: '12px',
              color: '#999999',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              360°
            </div>
            <button style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid #E0E0E0',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: '#666666'
            }}>
              ↺
            </button>
          </div>

          {/* Save for later */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#999999',
            fontSize: '14px',
            cursor: 'pointer',
            letterSpacing: '0.5px'
          }}>
            <span>♡</span>
            Save for later
          </button>
        </div>

        {/* Right Panel - Color Swatches */}
        <div style={{
          padding: '80px 80px 80px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          position: 'relative'
        }}>
          {/* Connecting Line */}
          <div style={{
            position: 'absolute',
            left: '0px',
            top: '120px',
            bottom: '300px',
            width: '2px',
            background: 'linear-gradient(to bottom, #E0E0E0 0%, #E0E0E0 100%)'
          }}></div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            alignItems: 'flex-end'
          }}>
            {colors.map((color, index) => (
              <div key={color.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => setConfig({ ...config, color: color.id })}
              >
                {/* Connecting line */}
                <div style={{
                  position: 'absolute',
                  right: '60px',
                  width: '40px',
                  height: '2px',
                  background: config.color === color.id ? '#000000' : '#E0E0E0',
                  transition: 'all 0.3s ease'
                }}></div>

                <div style={{
                  fontSize: '14px',
                  color: config.color === color.id ? '#000000' : '#999999',
                  letterSpacing: '0.5px',
                  fontWeight: '300',
                  minWidth: '60px',
                  textAlign: 'right',
                  transition: 'all 0.3s ease'
                }}>
                  {color.name}
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: color.hex,
                  border: config.color === color.id ? '3px solid #000000' : '2px solid #E0E0E0',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {config.color === color.id && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: color.hex === '#F5F5DC' ? '#000000' : '#FFFFFF'
                    }}></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom - Price and Buy */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #F0F0F0',
        padding: '32px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px'
      }}>
        <div style={{
          fontSize: '32px',
          fontWeight: '300',
          color: '#000000',
          letterSpacing: '1px'
        }}>
          {calculatePrice().toFixed(2)} €
        </div>
        <button style={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          border: 'none',
          padding: '16px 48px',
          fontSize: '14px',
          fontWeight: '400',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#333333'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#000000'}
        >
          BUY
        </button>
      </div>

      {/* Footer */}
      <footer style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #F0F0F0',
        padding: '16px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: '#999999',
        zIndex: -1,
        paddingBottom: '120px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div>Customer Service</div>
          <div>About</div>
          <div>Retailers</div>
        </div>

        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center'
        }}>
          {['V', 'f', '📷', '⚡', '🐦', 't', '📌'].map((icon, index) => (
            <div key={index} style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              {icon}
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          textAlign: 'right'
        }}>
          <div>Shipping and Returns</div>
          <div>Copyright</div>
          <div>Terms and conditions</div>
        </div>
      </footer>
    </div>
  );
}

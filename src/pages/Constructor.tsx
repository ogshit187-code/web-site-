import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import ProductSelector from "@/components/constructor/ProductSelector";
import CustomizationOptions from "@/components/constructor/CustomizationOptions";
import ImageUploader from "@/components/constructor/ImageUploader";
import PriceCalculator from "@/components/constructor/PriceCalculator";
import OrderSummary from "@/components/constructor/OrderSummary";

export interface ProductConfig {
  garmentType: string;
  garmentQuality: string;
  customizationType: 'print' | 'embroidery' | 'combined';
  printSize: string;
  uploadedImage?: File;
  quantity: number;
}

export default function Constructor() {
  const [config, setConfig] = useState<ProductConfig>({
    garmentType: '',
    garmentQuality: '',
    customizationType: 'print',
    printSize: '',
    quantity: 1
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const updateConfig = (updates: Partial<ProductConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Конструктор изделий
            </h1>
            <p className="text-slate-600 mt-2">Создайте уникальное изделие за несколько простых шагов</p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-600">Шаг {currentStep} из {totalSteps}</span>
              <span className="text-sm text-slate-500">{Math.round((currentStep / totalSteps) * 100)}% завершено</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Constructor steps */}
            <div className="lg:col-span-2 space-y-6">
              {currentStep === 1 && (
                <ProductSelector 
                  config={config} 
                  updateConfig={updateConfig}
                  onNext={nextStep}
                />
              )}
              
              {currentStep === 2 && (
                <CustomizationOptions 
                  config={config} 
                  updateConfig={updateConfig}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}
              
              {currentStep === 3 && (
                <ImageUploader 
                  config={config} 
                  updateConfig={updateConfig}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}
              
              {currentStep === 4 && (
                <PriceCalculator 
                  config={config} 
                  updateConfig={updateConfig}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}
              
              {currentStep === 5 && (
                <OrderSummary 
                  config={config}
                  onPrev={prevStep}
                />
              )}
            </div>

            {/* Right side - Live preview and summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold mb-4">Предварительный просмотр</h3>
                  
                  {/* 3D Preview placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl mb-4 flex items-center justify-center">
                    <div className="text-center text-slate-500">
                      <div className="w-16 h-16 mx-auto mb-2 bg-slate-300 rounded-full"></div>
                      <p className="text-sm">3D предварительный просмотр</p>
                    </div>
                  </div>

                  {/* Configuration summary */}
                  <div className="space-y-2 text-sm">
                    {config.garmentType && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Изделие:</span>
                        <span className="font-medium">{config.garmentType}</span>
                      </div>
                    )}
                    {config.customizationType && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Тип:</span>
                        <span className="font-medium">
                          {config.customizationType === 'print' && 'Печать'}
                          {config.customizationType === 'embroidery' && 'Вышивка'}
                          {config.customizationType === 'combined' && 'Комбинированное'}
                        </span>
                      </div>
                    )}
                    {config.printSize && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Размер:</span>
                        <span className="font-medium">{config.printSize}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-600">Количество:</span>
                      <span className="font-medium">{config.quantity} шт.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


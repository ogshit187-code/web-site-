import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Shirt, Brush, BadgeCheck, Plus, Minus, Upload, Image, X } from "lucide-react";
import ProductPreview3D from "@/components/constructor/ProductPreview3D";

interface CalculatorConfig {
  garmentType: string;
  serviceType: string;
  printSize: string;
  quantity: number;
  uploadedImage?: File;
  printPosition: string;
  customPrintSize: { width: number; height: number };
  garmentColor: string;
}

const garmentTypes = [
  { id: 'tshirt', name: 'Футболка', basePrice: 400 },
  { id: 'hoodie', name: 'Худи', basePrice: 800 },
  { id: 'sweatshirt', name: 'Свитшот', basePrice: 600 },
];

const serviceTypes = [
  { 
    id: 'dtf-logo', 
    name: 'DTF Печать - Логотип', 
    basePrice: 200,
    icon: Brush,
    description: 'Небольшой логотип или текст' 
  },
  { 
    id: 'dtf-full', 
    name: 'DTF Печать - Полноцветный принт', 
    basePrice: 1300,
    icon: Brush,
    description: 'Большой принт, фото, градиенты' 
  },
  { 
    id: 'embr-text', 
    name: 'Машинная вышивка - Надпись', 
    basePrice: 300,
    icon: BadgeCheck,
    description: 'Текст, простые логотипы' 
  },
  { 
    id: 'embr-logo', 
    name: 'Машинная вышивка - Крупный рисунок', 
    basePrice: 2000,
    icon: BadgeCheck,
    description: 'Сложные изображения, большие размеры' 
  },
];

const printSizes = [
  { id: 'small', name: 'Маленький (до 10x10 см)', multiplier: 1 },
  { id: 'medium', name: 'Средний (до 20x20 см)', multiplier: 1.5 },
  { id: 'large', name: 'Большой (до 30x30 см)', multiplier: 2 },
  { id: 'xl', name: 'Очень большой (больше 30 см)', multiplier: 2.5 },
];

export default function PriceCalculator() {
  const [config, setConfig] = useState<CalculatorConfig>({
    garmentType: '',
    serviceType: '',
    printSize: 'medium',
    quantity: 1,
    printPosition: 'chest',
    customPrintSize: { width: 15, height: 15 },
    garmentColor: 'white'
  });

  const [showDetails, setShowDetails] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const selectedGarment = garmentTypes.find(g => g.id === config.garmentType);
  const selectedService = serviceTypes.find(s => s.id === config.serviceType);
  const selectedSize = printSizes.find(s => s.id === config.printSize);

  const calculatePrice = () => {
    if (!selectedGarment || !selectedService) return 0;
    
    const garmentPrice = selectedGarment.basePrice;
    
    // Базовая цена услуги
    let servicePrice = selectedService.basePrice;
    
    // Множитель размера - если выбран стандартный размер
    if (selectedSize) {
      servicePrice *= selectedSize.multiplier;
    } else {
      // Расчет по пользовательскому размеру
      const area = config.customPrintSize.width * config.customPrintSize.height;
      const baseArea = 15 * 15; // базовая площадь 15x15 см
      const sizeMultiplier = Math.max(1, area / baseArea);
      servicePrice *= sizeMultiplier;
    }
    
    // Множитель позиции (некоторые позиции сложнее)
    const positionMultipliers: Record<string, number> = {
      'chest': 1,
      'back': 1.1,
      'sleeve-left': 1.2,
      'sleeve-right': 1.2,
      'hood': 1.3,
    };
    servicePrice *= positionMultipliers[config.printPosition] || 1;
    
    const totalPerItem = garmentPrice + servicePrice;
    
    // Скидки за количество
    let discount = 1;
    if (config.quantity >= 10) discount = 0.9; // 10% скидка от 10 шт
    if (config.quantity >= 20) discount = 0.85; // 15% скидка от 20 шт
    if (config.quantity >= 50) discount = 0.8; // 20% скидка от 50 шт
    
    return Math.round(totalPerItem * config.quantity * discount);
  };

  const pricePerItem = () => {
    const totalPrice = calculatePrice();
    return config.quantity > 0 ? Math.round(totalPrice / config.quantity) : 0;
  };

  const getDiscountText = () => {
    if (config.quantity >= 50) return "Скидка 20%";
    if (config.quantity >= 20) return "Скидка 15%";
    if (config.quantity >= 10) return "Скидка 10%";
    return "";
  };

  const totalPrice = calculatePrice();
  const isConfigComplete = config.garmentType && config.serviceType;

  // Функции для загрузки файлов
  const handleFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      
      // Проверяем тип файла
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        alert('Пожалуйста, загрузите изображение (JPG, PNG, GIF, SVG)');
        return;
      }
      
      // Проверяем размер файла (максимум 10МБ)
      if (file.size > 10 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 10МБ');
        return;
      }
      
      setConfig({...config, uploadedImage: file});
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const removeImage = () => {
    setConfig({...config, uploadedImage: undefined});
  };

  return (
    <section id="calculator" className="container mx-auto py-16 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Калькулятор стоимости</h2>
          </div>
          <p className="text-muted-foreground">Узнайте точную стоимость вашего заказа за 30 секунд</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Левая колонка - настройки */}
          <div className="space-y-6">
            {/* Выбор изделия */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shirt className="w-5 h-5" />
                  Выберите изделие
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={config.garmentType} onValueChange={(value) => setConfig({...config, garmentType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип изделия" />
                  </SelectTrigger>
                  <SelectContent>
                    {garmentTypes.map((garment) => (
                      <SelectItem key={garment.id} value={garment.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{garment.name}</span>
                          <Badge variant="secondary" className="ml-2">от {garment.basePrice}₽</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Выбор услуги */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brush className="w-5 h-5" />
                  Выберите тип работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    const isSelected = config.serviceType === service.id;
                    return (
                      <div
                        key={service.id}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setConfig({...config, serviceType: service.id})}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                            <div>
                              <h3 className="font-medium">{service.name}</h3>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                          </div>
                          <Badge variant={isSelected ? 'default' : 'secondary'}>
                            от {service.basePrice}₽
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Размер принта */}
            {config.serviceType && (
              <Card>
                <CardHeader>
                  <CardTitle>Размер принта</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={config.printSize} onValueChange={(value) => setConfig({...config, printSize: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите размер" />
                    </SelectTrigger>
                    <SelectContent>
                      {printSizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{size.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {size.multiplier === 1 ? 'базовая цена' : `×${size.multiplier}`}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Загрузка изображения */}
            {config.serviceType && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Загрузить макет
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!config.uploadedImage ? (
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
                        dragActive 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">Перетащите изображение сюда</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        или нажмите, чтобы выбрать файл
                      </p>
                      <Button type="button" variant="outline">
                        Выбрать файл
                      </Button>
                      <p className="text-xs text-muted-foreground mt-3">
                        Поддерживаются: JPG, PNG, GIF, SVG • Максимум 10МБ
                      </p>
                    </div>
                  ) : (
                    <div className="relative bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Image className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{config.uploadedImage.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {(config.uploadedImage.size / 1024 / 1024).toFixed(2)} МБ
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={removeImage}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-green-500 h-2 rounded-full w-full"></div>
                      </div>
                      <p className="text-sm text-green-600">✓ Файл загружен успешно</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Количество */}
            {isConfigComplete && (
              <Card>
                <CardHeader>
                  <CardTitle>Количество</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setConfig({...config, quantity: Math.max(1, config.quantity - 1)})}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="text-center min-w-[60px]">
                      <div className="text-2xl font-bold">{config.quantity}</div>
                      <div className="text-sm text-muted-foreground">шт.</div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setConfig({...config, quantity: config.quantity + 1})}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Подсказки по скидкам */}
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>💡 Скидки за количество:</p>
                    <p>• от 10 шт. — скидка 10%</p>
                    <p>• от 20 шт. — скидка 15%</p>
                    <p>• от 50 шт. — скидка 20%</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Средняя колонка - 3D превью */}
          <div className="space-y-6">
            {config.garmentType && (
              <ProductPreview3D
                garmentType={config.garmentType}
                garmentColor={config.garmentColor}
                printPosition={config.printPosition}
                printSize={config.customPrintSize}
                uploadedImage={config.uploadedImage}
                onPositionChange={(position) => setConfig({...config, printPosition: position})}
                onSizeChange={(size) => setConfig({...config, customPrintSize: size})}
              />
            )}
            {!config.garmentType && (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center text-muted-foreground">
                    <Shirt className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Выберите изделие, чтобы увидеть 3D превью</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Правая колонка - итоговая цена */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-center">Итоговая стоимость</CardTitle>
              </CardHeader>
              <CardContent>
                {isConfigComplete ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {totalPrice.toLocaleString()} ₽
                      </div>
                      {getDiscountText() && (
                        <Badge variant="default" className="bg-green-600">
                          {getDiscountText()}
                        </Badge>
                      )}
                    </div>

                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Цена за 1 изделие:</span>
                        <span className="font-medium">{pricePerItem().toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Количество:</span>
                        <span className="font-medium">{config.quantity} шт.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Макет:</span>
                        <span className={`font-medium ${config.uploadedImage ? 'text-green-600' : 'text-gray-500'}`}>
                          {config.uploadedImage ? '✓ Загружен' : 'Не загружен'}
                        </span>
                      </div>
                      {config.quantity >= 10 && (
                        <div className="flex justify-between text-green-600">
                          <span>Скидка:</span>
                          <span className="font-medium">{getDiscountText()}</span>
                        </div>
                      )}
                    </div>

                    <Button 
                      className="w-full h-12 text-lg"
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      Заказать сейчас
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      * Финальная стоимость может измениться в зависимости от сложности макета
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🤔</div>
                    <h3 className="text-lg font-medium mb-2">Выберите параметры</h3>
                    <p className="text-muted-foreground">
                      Выберите изделие и тип работы, чтобы увидеть стоимость
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Дополнительная информация */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Что входит в стоимость?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Изделие выбранного типа и качества</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Печать или вышивка выбранного размера</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Подготовка макета (если нужна) или работа с вашим файлом</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Упаковка заказа</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

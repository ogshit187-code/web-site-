import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Building2, 
  Heart, 
  TrendingUp, 
  ShoppingBag,
  Factory,
  ArrowRight,
  Check
} from "lucide-react";

interface ClientTypeSelectorProps {
  onSelect: (type: 'retail' | 'wholesale') => void;
}

export default function ClientTypeSelector({ onSelect }: ClientTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<'retail' | 'wholesale' | null>(null);

  const clientTypes = [
    {
      id: 'retail' as const,
      title: 'Для себя',
      subtitle: 'Частные заказы',
      description: 'Печать на своих вещах, подарки, персональные принты',
      icon: User,
      color: 'bg-brand-blue',
      features: [
        'Минимальный заказ от 1 шт.',
        'Персональные консультации',
        'Быстрое изготовление',
        'Индивидуальный подход'
      ],
      examples: [
        '🎁 Подарки близким',
        '👕 Уникальные футболки',
        '💕 Парные худи',
        '🎨 Авторские принты'
      ]
    },
    {
      id: 'wholesale' as const,
      title: 'Для бизнеса',
      subtitle: 'Оптовые и коммерческие заказы',
      description: 'Тиражи для маркетплейсов, корпоративная одежда, мерч',
      icon: Building2,
      color: 'bg-brand-green',
      features: [
        'Оптовые скидки от 10 шт.',
        'Работа с ТЗ и макетами',
        'Быстрые тиражи',
        'Специальные цены'
      ],
      examples: [
        '🏪 Товары для маркетплейсов',
        '🏢 Корпоративная одежда',
        '🎪 Мерч для мероприятий',
        '📦 Крупные тиражи'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-large shadow-floating max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-8 text-center border-b">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-foreground rounded-minimal flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-minimal"></div>
            </div>
            <h1 className="text-2xl font-medium">SMOLIN ATELIER</h1>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-medium mb-4">
            Добро пожаловать!
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите, какой тип заказов вас интересует, чтобы мы показали 
            подходящие цены и условия
          </p>
        </div>

        {/* Client Types */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {clientTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              
              return (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all duration-300 hover-scale border-2 ${
                    isSelected 
                      ? 'border-foreground bg-muted/20 scale-105' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="p-6">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${type.color} rounded-large flex items-center justify-center text-white`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium">{type.title}</h3>
                          <p className="text-sm text-muted-foreground">{type.subtitle}</p>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center animate-fade-in">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {type.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <h4 className="font-medium text-sm">Что включено:</h4>
                      <div className="space-y-2">
                        {type.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-foreground rounded-full flex-shrink-0"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Examples */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Примеры заказов:</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {type.examples.map((example, index) => (
                          <div key={index} className="text-muted-foreground">
                            {example}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Action Button */}
          {selectedType && (
            <div className="text-center animate-fade-in">
              <Button 
                onClick={() => onSelect(selectedType)}
                className="bg-foreground text-background hover:bg-foreground/90 h-14 px-12 rounded-minimal text-lg hover-scale"
              >
                {selectedType === 'retail' ? (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Перейти к частным заказам
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Перейти к оптовым заказам
                  </>
                )}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                Вы всегда сможете переключиться между версиями
              </p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t p-6 bg-muted/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Розница: от 1 шт.</span>
              </div>
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4" />
                <span>Опт: от 10 шт.</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="font-medium">Качество • Скорость • Сервис</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductConfig } from "@/pages/Constructor";
import { Shirt, Users, Crown } from "lucide-react";

interface ProductSelectorProps {
  config: ProductConfig;
  updateConfig: (updates: Partial<ProductConfig>) => void;
  onNext: () => void;
}

const garmentTypes = [
  {
    id: 'tshirt',
    name: 'Футболка',
    basePrice: 400,
    icon: Shirt,
    description: 'Классическая футболка из хлопка',
    qualities: [
      { id: 'basic', name: 'Basic', price: 0, description: '100% хлопок, 160г/м²' },
      { id: 'premium', name: 'Premium', price: 200, description: '100% хлопок, 200г/м²' },
      { id: 'luxury', name: 'Luxury', price: 400, description: 'Organic cotton, 220г/м²' }
    ]
  },
  {
    id: 'hoodie',
    name: 'Худи',
    basePrice: 800,
    icon: Users,
    description: 'Теплое худи с капюшоном',
    qualities: [
      { id: 'basic', name: 'Basic', price: 0, description: '80% хлопок, 20% полиэстер' },
      { id: 'premium', name: 'Premium', price: 300, description: '100% хлопок, флис внутри' },
      { id: 'luxury', name: 'Luxury', price: 600, description: 'Organic cotton, премиум флис' }
    ]
  },
  {
    id: 'sweatshirt',
    name: 'Свитшот',
    basePrice: 600,
    icon: Crown,
    description: 'Стильный свитшот без капюшона',
    qualities: [
      { id: 'basic', name: 'Basic', price: 0, description: '80% хлопок, 20% полиэстер' },
      { id: 'premium', name: 'Premium', price: 250, description: '100% хлопок, плотный трикотаж' },
      { id: 'luxury', name: 'Luxury', price: 500, description: 'Organic cotton, премиум качество' }
    ]
  }
];

export default function ProductSelector({ config, updateConfig, onNext }: ProductSelectorProps) {
  const selectedGarment = garmentTypes.find(g => g.id === config.garmentType);
  const selectedQuality = selectedGarment?.qualities.find(q => q.id === config.garmentQuality);

  const handleGarmentSelect = (garmentId: string) => {
    updateConfig({ 
      garmentType: garmentId,
      garmentQuality: '' // Reset quality when changing garment
    });
  };

  const handleQualitySelect = (qualityId: string) => {
    updateConfig({ garmentQuality: qualityId });
  };

  const canProceed = config.garmentType && config.garmentQuality;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            Выберите изделие
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {garmentTypes.map((garment) => {
              const Icon = garment.icon;
              const isSelected = config.garmentType === garment.id;
              
              return (
                <Card 
                  key={garment.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-md hover:bg-slate-50'
                  }`}
                  onClick={() => handleGarmentSelect(garment.id)}
                >
                  <CardContent className="p-4 text-center">
                    <Icon className={`w-12 h-12 mx-auto mb-3 ${isSelected ? 'text-blue-500' : 'text-slate-400'}`} />
                    <h3 className="font-semibold text-slate-900 mb-1">{garment.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">{garment.description}</p>
                    <Badge variant={isSelected ? 'default' : 'secondary'}>
                      от {garment.basePrice} ₽
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedGarment && (
        <Card>
          <CardHeader>
            <CardTitle>Выберите качество материала</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedGarment.qualities.map((quality) => {
                const isSelected = config.garmentQuality === quality.id;
                const totalPrice = selectedGarment.basePrice + quality.price;
                
                return (
                  <Card 
                    key={quality.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-md hover:bg-slate-50'
                    }`}
                    onClick={() => handleQualitySelect(quality.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-slate-900">{quality.name}</h3>
                        <Badge variant={isSelected ? 'default' : 'secondary'}>
                          {totalPrice} ₽
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{quality.description}</p>
                      {quality.price > 0 && (
                        <p className="text-xs text-slate-500 mt-1">+{quality.price} ₽ к базовой цене</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedQuality && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {selectedGarment.name} • {selectedQuality.name}
                </h3>
                <p className="text-sm text-slate-600">{selectedQuality.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">
                  {selectedGarment.basePrice + selectedQuality.price} ₽
                </p>
                <p className="text-sm text-slate-600">базовая цена</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="min-w-32"
        >
          Далее
        </Button>
      </div>
    </div>
  );
}


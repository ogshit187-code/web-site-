import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useClientType } from "@/contexts/ClientTypeContext";
import { 
  Upload, 
  Sparkles, 
  Download, 
  ShoppingCart, 
  Palette, 
  Wand2, 
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Heart,
  Share2,
  Settings,
  Zap,
  Camera,
  User,
  Building2,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

interface AIStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  preview: string;
  category: 'artistic' | 'modern' | 'vintage' | 'abstract';
  color: string;
}

interface GeneratedDesign {
  id: string;
  originalImage: string;
  generatedImage: string;
  style: AIStyle;
  prompt: string;
  timestamp: number;
}

const aiStyles: AIStyle[] = [
  {
    id: 'pop-art',
    name: 'Поп-арт',
    description: 'Яркие цвета, контрастные формы в стиле Энди Уорхола',
    prompt: 'pop art style, vibrant colors, high contrast, Andy Warhol inspired',
    preview: '🎨',
    category: 'artistic',
    color: 'bg-pink-100 text-pink-800'
  },
  {
    id: 'street-art',
    name: 'Стрит-арт',
    description: 'Граффити стиль, городская эстетика',
    prompt: 'street art, graffiti style, urban aesthetic, spray paint effect',
    preview: '🏙️',
    category: 'modern',
    color: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'minimalist',
    name: 'Минимализм',
    description: 'Чистые линии, простые формы, монохром',
    prompt: 'minimalist design, clean lines, simple shapes, monochrome',
    preview: '⚪',
    category: 'modern',
    color: 'bg-gray-100 text-gray-800'
  },
  {
    id: 'cyberpunk',
    name: 'Киберпанк',
    description: 'Неоновые цвета, футуристический стиль',
    prompt: 'cyberpunk style, neon colors, futuristic, digital glitch effect',
    preview: '🌆',
    category: 'modern',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'watercolor',
    name: 'Акварель',
    description: 'Мягкие переходы, художественные мазки',
    prompt: 'watercolor painting style, soft gradients, artistic brushstrokes',
    preview: '🎨',
    category: 'artistic',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'vintage',
    name: 'Винтаж',
    description: 'Ретро стиль, приглушенные тона',
    prompt: 'vintage style, retro aesthetic, muted colors, aged effect',
    preview: '📷',
    category: 'vintage',
    color: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'abstract',
    name: 'Абстракция',
    description: 'Геометрические формы, необычные цвета',
    prompt: 'abstract art, geometric shapes, surreal colors, artistic interpretation',
    preview: '🔷',
    category: 'abstract',
    color: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'cartoon',
    name: 'Мультяшный',
    description: 'Яркий мультипликационный стиль',
    prompt: 'cartoon style, animated, bright colors, fun character design',
    preview: '😊',
    category: 'modern',
    color: 'bg-yellow-100 text-yellow-800'
  }
];

export default function AIDesign() {
  const { isRetail, isWholesale } = useClientType();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<AIStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState<GeneratedDesign[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<GeneratedDesign | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Все стили', color: 'bg-gray-100 text-gray-800' },
    { id: 'artistic', name: 'Художественные', color: 'bg-pink-100 text-pink-800' },
    { id: 'modern', name: 'Современные', color: 'bg-blue-100 text-blue-800' },
    { id: 'vintage', name: 'Винтаж', color: 'bg-amber-100 text-amber-800' },
    { id: 'abstract', name: 'Абстракция', color: 'bg-purple-100 text-purple-800' }
  ];

  const filteredStyles = selectedCategory === 'all' 
    ? aiStyles 
    : aiStyles.filter(style => style.category === selectedCategory);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDesign = async () => {
    if (!uploadedImage || !selectedStyle) return;

    setIsGenerating(true);
    
    // Симуляция AI генерации (в реальном проекте здесь будет API call)
    setTimeout(() => {
      const newDesign: GeneratedDesign = {
        id: Date.now().toString(),
        originalImage: uploadedImage,
        generatedImage: uploadedImage, // В реальности это будет результат ИИ
        style: selectedStyle,
        prompt: customPrompt || selectedStyle.prompt,
        timestamp: Date.now()
      };
      
      setGeneratedDesigns(prev => [newDesign, ...prev]);
      setSelectedDesign(newDesign);
      setIsGenerating(false);
    }, 3000);
  };

  const proceedToOrder = () => {
    if (selectedDesign) {
      // Сохраняем дизайн в localStorage для передачи в калькулятор
      localStorage.setItem('ai-generated-design', JSON.stringify(selectedDesign));
      // Переходим на главную страницу к калькулятору
      window.location.href = '/#calculator';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/10 to-muted/30">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b shadow-minimal">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Назад на главную
              </Link>
              
              <div className="w-px h-6 bg-border"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-blue rounded-large flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-medium">AI Дизайнер</h1>
                  <p className="text-sm text-muted-foreground">Создание принтов с помощью ИИ</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Client Type Badge */}
              <Badge 
                variant="outline" 
                className={`flex items-center gap-2 ${
                  isRetail 
                    ? 'border-brand-blue text-brand-blue bg-brand-blue/5' 
                    : 'border-brand-green text-brand-green bg-brand-green/5'
                }`}
              >
                {isRetail ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                {isRetail ? 'Для себя' : 'Для бизнеса'}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 rounded-large mb-6">
              <Zap className="w-5 h-5 text-brand-purple" />
              <span className="font-medium text-brand-purple">Powered by AI</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-medium mb-6">
              Создайте уникальный принт
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Загрузите свою фотографию, выберите стиль, и наш ИИ создаст потрясающий принт 
              для нанесения на одежду. От фото до заказа за 3 шага!
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Левая панель - Загрузка и стили */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Шаг 1: Загрузка изображения */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center text-white font-medium text-sm">
                      1
                    </div>
                    <h3 className="text-lg font-medium">Загрузите фото</h3>
                  </div>
                  
                  <div 
                    className="border-2 border-dashed border-muted rounded-large p-8 text-center cursor-pointer hover:border-brand-blue/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded" 
                          className="w-full h-48 object-cover rounded-minimal"
                        />
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Заменить фото
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="font-medium mb-2">Нажмите для загрузки</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG до 10MB
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              {/* Шаг 2: Выбор стиля */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center text-white font-medium text-sm">
                      2
                    </div>
                    <h3 className="text-lg font-medium">Выберите стиль</h3>
                  </div>

                  {/* Категории */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map(category => (
                      <Badge
                        key={category.id}
                        variant="outline"
                        className={`cursor-pointer transition-all ${
                          selectedCategory === category.id 
                            ? category.color 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Стили */}
                  <div className="grid grid-cols-2 gap-3">
                    {filteredStyles.map(style => (
                      <div
                        key={style.id}
                        className={`p-3 border-2 rounded-large cursor-pointer transition-all ${
                          selectedStyle?.id === style.id
                            ? 'border-brand-purple bg-brand-purple/5'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                        onClick={() => setSelectedStyle(style)}
                      >
                        <div className="text-2xl mb-2">{style.preview}</div>
                        <h4 className="font-medium text-sm">{style.name}</h4>
                        <p className="text-xs text-muted-foreground">{style.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Кастомный промпт */}
                  <div className="mt-4">
                    <label className="text-sm font-medium mb-2 block">
                      Дополнительные пожелания (опционально)
                    </label>
                    <Textarea
                      placeholder="Опишите дополнительные детали стиля..."
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      className="h-20"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Кнопка генерации */}
              <Button 
                onClick={handleGenerateDesign}
                disabled={!uploadedImage || !selectedStyle || isGenerating}
                className="w-full h-12 bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white font-medium rounded-large"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Генерируем дизайн...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Создать дизайн
                  </>
                )}
              </Button>

            </div>

            {/* Центральная область - Результаты */}
            <div className="lg:col-span-5">
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-6">Сгенерированные дизайны</h3>
                  
                  {isGenerating && (
                    <div className="flex flex-col items-center justify-center h-96 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-medium mb-2">Создаем ваш дизайн</h4>
                      <p className="text-muted-foreground mb-4">ИИ обрабатывает изображение...</p>
                      <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue w-2/3 animate-pulse"></div>
                      </div>
                    </div>
                  )}

                  {!isGenerating && generatedDesigns.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-96 text-center">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h4 className="font-medium mb-2">Здесь появятся ваши дизайны</h4>
                      <p className="text-muted-foreground">
                        Загрузите фото, выберите стиль и нажмите "Создать дизайн"
                      </p>
                    </div>
                  )}

                  {generatedDesigns.length > 0 && (
                    <div className="grid gap-4">
                      {generatedDesigns.map(design => (
                        <div
                          key={design.id}
                          className={`p-4 border-2 rounded-large cursor-pointer transition-all ${
                            selectedDesign?.id === design.id
                              ? 'border-brand-purple bg-brand-purple/5'
                              : 'border-border hover:border-muted-foreground'
                          }`}
                          onClick={() => setSelectedDesign(design)}
                        >
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Оригинал</p>
                              <img 
                                src={design.originalImage} 
                                alt="Original" 
                                className="w-full h-24 object-cover rounded-minimal"
                              />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">AI результат</p>
                              <img 
                                src={design.generatedImage} 
                                alt="Generated" 
                                className="w-full h-24 object-cover rounded-minimal"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge className={design.style.color}>
                              {design.style.name}
                            </Badge>
                            
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Правая панель - Предпросмотр на одежде */}
            <div className="lg:col-span-3">
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-medium text-sm">
                      3
                    </div>
                    <h3 className="text-lg font-medium">Предпросмотр</h3>
                  </div>

                  {selectedDesign ? (
                    <div className="space-y-4">
                      {/* Мини превью на футболке */}
                      <div className="bg-gradient-to-br from-muted/10 to-muted/30 p-6 rounded-large">
                        <svg width="160" height="200" viewBox="0 0 160 200" className="mx-auto mb-4">
                          {/* Футболка */}
                          <path
                            d="M40 40 L40 25 Q40 15 50 15 L110 15 Q120 15 120 25 L120 40 L140 55 L140 180 Q140 190 130 190 L30 190 Q20 190 20 180 L20 55 Z"
                            fill="#ffffff"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />
                          {/* Принт область */}
                          <foreignObject x="55" y="50" width="50" height="40">
                            <img 
                              src={selectedDesign.generatedImage} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                              alt="Print preview"
                            />
                          </foreignObject>
                        </svg>
                        
                        <div className="text-center">
                          <Badge className={selectedDesign.style.color}>
                            {selectedDesign.style.name}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Стиль:</span>
                          <span className="ml-2 font-medium">{selectedDesign.style.name}</span>
                        </div>
                        
                        <div className="text-sm">
                          <span className="text-muted-foreground">Создан:</span>
                          <span className="ml-2">{new Date(selectedDesign.timestamp).toLocaleString('ru')}</span>
                        </div>
                      </div>

                      <Button 
                        onClick={proceedToOrder}
                        className="w-full bg-brand-green hover:bg-brand-green/90 text-white h-12 rounded-large"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Перейти к заказу
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Дизайн будет автоматически применен в калькуляторе
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Выберите дизайн для предпросмотра
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

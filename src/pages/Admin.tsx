import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Users, 
  ShoppingCart, 
  Image, 
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Upload
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  garmentType: string;
  serviceType: string;
  quantity: number;
  totalPrice: number;
  status: "new" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  image?: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Демо данные
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Иван Петров",
      email: "ivan@example.com",
      phone: "+7 999 123-45-67",
      garmentType: "Футболка",
      serviceType: "DTF печать",
      quantity: 5,
      totalPrice: 2500,
      status: "new",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "ORD-002",
      customerName: "Мария Сидорова",
      email: "maria@example.com",
      phone: "+7 999 234-56-78",
      garmentType: "Худи",
      serviceType: "Машинная вышивка",
      quantity: 2,
      totalPrice: 4200,
      status: "in_progress",
      createdAt: "2024-01-14T14:20:00Z"
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Футболка", category: "garment", basePrice: 1700, description: "Классическая футболка" },
    { id: "2", name: "Худи", category: "garment", basePrice: 3200, description: "Теплое худи" },
    { id: "3", name: "DTF печать — логотип", category: "service", basePrice: 200, description: "Небольшой логотип" },
    { id: "4", name: "Машинная вышивка", category: "service", basePrice: 300, description: "Качественная вышивка" }
  ]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "garment",
    basePrice: 0,
    description: ""
  });

  // Контент сайта
  const [siteContent, setSiteContent] = useState({
    heroTitle: "SUMMER SERIES",
    heroSubtitle: "ПЕЧАТЬ DTF И МАШИННАЯ ВЫШИВКА В САНКТ-ПЕТЕРБУРГЕ — СРОК ИЗГОТОВЛЕНИЯ 1 ДЕНЬ.",
    aboutTitle: "Что мы делаем",
    aboutDescription: "Профессиональная печать и вышивка на одежде",
    servicesTitle: "Услуги и цены",
    calculatorTitle: "Рассчитайте стоимость"
  });

  // Медиа файлы
  const [mediaFiles, setMediaFiles] = useState([
    { id: "1", name: "hero-image.jpg", url: "/images/hero-apparel.jpg", type: "image", usage: "Главное изображение" },
    { id: "2", name: "portfolio-1.jpg", url: "/images/portfolio-1.jpg", type: "image", usage: "Портфолио" },
    { id: "3", name: "portfolio-2.jpg", url: "/images/portfolio-2.jpg", type: "image", usage: "Портфолио" }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Простая проверка (в реальном проекте нужна серверная авторизация)
    if (loginData.username === "admin" && loginData.password === "smolin2024") {
      setIsAuthenticated(true);
    } else {
      alert("Неверные данные для входа");
    }
  };

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      new: { label: "Новый", className: "bg-blue-100 text-blue-800" },
      in_progress: { label: "В работе", className: "bg-yellow-100 text-yellow-800" },
      completed: { label: "Готов", className: "bg-green-100 text-green-800" },
      cancelled: { label: "Отменен", className: "bg-red-100 text-red-800" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.basePrice) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name!,
        category: newProduct.category!,
        basePrice: newProduct.basePrice!,
        description: newProduct.description || ""
      };
      setProducts([...products, product]);
      setNewProduct({ name: "", category: "garment", basePrice: 0, description: "" });
    }
  };

  const deleteProduct = (id: string) => {
    if (confirm("Удалить товар?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Функции для работы с контентом
  const saveContent = () => {
    try {
      localStorage.setItem('smolin-site-content', JSON.stringify(siteContent));
      alert('Контент сохранен успешно!');
    } catch (error) {
      alert('Ошибка при сохранении контента');
    }
  };

  const loadContent = () => {
    try {
      const savedContent = localStorage.getItem('smolin-site-content');
      if (savedContent) {
        setSiteContent(JSON.parse(savedContent));
      }
    } catch (error) {
      console.error('Ошибка при загрузке контента:', error);
    }
  };

  // Загружаем сохраненный контент при инициализации
  React.useEffect(() => {
    loadContent();
  }, []);

  const deleteMediaFile = (id: string) => {
    if (confirm("Удалить файл?")) {
      setMediaFiles(mediaFiles.filter(f => f.id !== id));
    }
  };

  // Обработка загрузки файлов
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) { // 5MB лимит
        const reader = new FileReader();
        reader.onload = (e) => {
          const newFile = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            url: e.target?.result as string,
            type: 'image',
            usage: 'Новое изображение'
          };
          setMediaFiles(prev => [...prev, newFile]);
        };
        reader.readAsDataURL(file);
      } else {
        alert(`Файл ${file.name} слишком большой или не является изображением`);
      }
    });
  };

  const triggerFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = handleFileUpload;
    input.click();
  };

  const editMediaFile = (id: string) => {
    const file = mediaFiles.find(f => f.id === id);
    if (!file) return;

    const newUsage = prompt('Описание использования:', file.usage);
    if (newUsage !== null) {
      setMediaFiles(prev => 
        prev.map(f => f.id === id ? { ...f, usage: newUsage } : f)
      );
    }
  };

  // Drag & Drop функциональность
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach((file) => {
      if (file.size <= 5 * 1024 * 1024) { // 5MB лимит
        const reader = new FileReader();
        reader.onload = (e) => {
          const newFile = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            url: e.target?.result as string,
            type: 'image',
            usage: 'Новое изображение'
          };
          setMediaFiles(prev => [...prev, newFile]);
        };
        reader.readAsDataURL(file);
      } else {
        alert(`Файл ${file.name} слишком большой (максимум 5MB)`);
      }
    });
  };

  // Форма входа
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Админ-панель SMOLIN</CardTitle>
            <p className="text-muted-foreground">Войдите для управления сайтом</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Логин"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Демо: admin / smolin2024
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="bg-white border-b shadow-minimal">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-foreground rounded-minimal"></div>
              <h1 className="text-xl font-medium">SMOLIN Админ</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => window.open("/", "_blank")}>
                <Eye className="w-4 h-4 mr-2" />
                Посмотреть сайт
              </Button>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Товары
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Контент
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Медиа
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Клиенты
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* Заказы */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Заказы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-large p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{order.customerName}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(order.status)}
                          <div className="text-lg font-medium mt-1">{order.totalPrice.toLocaleString()} ₽</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Email:</span>
                          <div>{order.email}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Телефон:</span>
                          <div>{order.phone}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Изделие:</span>
                          <div>{order.garmentType}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Количество:</span>
                          <div>{order.quantity} шт.</div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Товары */}
          <TabsContent value="products">
            <div className="grid gap-6">
              {/* Добавление товара */}
              <Card>
                <CardHeader>
                  <CardTitle>Добавить товар</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                      placeholder="Название"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                    <select
                      className="h-10 px-3 rounded-md border border-input bg-background"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="garment">Изделие</option>
                      <option value="service">Услуга</option>
                    </select>
                    <Input
                      type="number"
                      placeholder="Цена"
                      value={newProduct.basePrice || ""}
                      onChange={(e) => setNewProduct({...newProduct, basePrice: Number(e.target.value)})}
                    />
                    <Button onClick={addProduct}>
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Описание"
                    className="mt-4"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </CardContent>
              </Card>

              {/* Список товаров */}
              <Card>
                <CardHeader>
                  <CardTitle>Товары</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {products.map((product) => (
                      <div key={product.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <Badge variant="outline" className="mt-1">
                            {product.category === "garment" ? "Изделие" : "Услуга"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{product.basePrice} ₽</span>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Управление контентом */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Управление контентом сайта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  
                  {/* Главная страница */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Главная страница</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Заголовок Hero</label>
                        <Input 
                          value={siteContent.heroTitle}
                          onChange={(e) => setSiteContent({...siteContent, heroTitle: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Подзаголовок Hero</label>
                        <Textarea 
                          value={siteContent.heroSubtitle}
                          onChange={(e) => setSiteContent({...siteContent, heroSubtitle: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Раздел "О нас" */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Раздел "О нас"</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Заголовок</label>
                        <Input 
                          value={siteContent.aboutTitle}
                          onChange={(e) => setSiteContent({...siteContent, aboutTitle: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Описание</label>
                        <Textarea 
                          value={siteContent.aboutDescription}
                          onChange={(e) => setSiteContent({...siteContent, aboutDescription: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Раздел "Услуги" */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Раздел "Услуги"</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Заголовок услуг</label>
                        <Input 
                          value={siteContent.servicesTitle}
                          onChange={(e) => setSiteContent({...siteContent, servicesTitle: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Заголовок калькулятора</label>
                        <Input 
                          value={siteContent.calculatorTitle}
                          onChange={(e) => setSiteContent({...siteContent, calculatorTitle: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Предпросмотр
                    </Button>
                    <Button onClick={saveContent}>
                      Сохранить изменения
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Управление медиа */}
          <TabsContent value="media">
            <div className="grid gap-6">
              
              {/* Загрузка файлов */}
              <Card>
                <CardHeader>
                  <CardTitle>Загрузка изображений</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragOver 
                        ? 'border-brand-blue bg-brand-blue/10' 
                        : 'border-muted hover:border-brand-blue/50 hover:bg-muted/20'
                    }`}
                    onClick={triggerFileUpload}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-muted rounded-lg mx-auto flex items-center justify-center">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {isDragOver ? 'Отпустите файлы здесь' : 'Загрузите изображения'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {isDragOver 
                            ? 'Файлы будут загружены автоматически'
                            : 'Поддерживаются JPG, PNG, WebP до 5MB'
                          }
                        </p>
                        {!isDragOver && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Нажмите здесь, используйте кнопку или перетащите файлы
                          </p>
                        )}
                      </div>
                      <Button onClick={(e) => {e.stopPropagation(); triggerFileUpload();}}>
                        Выбрать файлы
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Список медиа файлов */}
              <Card>
                <CardHeader>
                  <CardTitle>Медиа библиотека</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mediaFiles.map((file) => (
                      <div key={file.id} className="border rounded-lg p-3 space-y-2">
                        <img 
                          src={file.url} 
                          alt={file.name}
                          className="w-full h-24 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.usage}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => editMediaFile(file.id)}
                            title="Редактировать описание"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => deleteMediaFile(file.id)}
                            title="Удалить файл"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Клиенты */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Клиенты</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Список клиентов появится здесь</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Настройки */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки сайта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Название студии</label>
                  <Input defaultValue="SMOLIN ATELIER" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email для заказов</label>
                  <Input defaultValue="orders@smolin-atelier.ru" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Телефон</label>
                  <Input defaultValue="+7 999 123-45-67" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Адрес</label>
                  <Textarea defaultValue="Санкт-Петербург, ул. Примерная, д. 1" className="mt-1" />
                </div>
                <Button>Сохранить настройки</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

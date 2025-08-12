import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  Download, 
  Eye,
  Clock,
  CheckCircle,
  Truck,
  Star
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'production' | 'shipped' | 'delivered';
  items: {
    name: string;
    quantity: number;
    price: number;
    customization: string;
  }[];
  total: number;
  trackingNumber?: string;
}

interface SavedDesign {
  id: string;
  name: string;
  type: 'print' | 'embroidery';
  garment: string;
  price: number;
  createdAt: string;
  imageUrl: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    items: [
      {
        name: "Футболка Premium",
        quantity: 2,
        price: 1700,
        customization: "DTF печать A4"
      }
    ],
    total: 3400,
    trackingNumber: "RU123456789"
  },
  {
    id: "ORD-002", 
    date: "2024-01-20",
    status: "production",
    items: [
      {
        name: "Худи Oversize",
        quantity: 1,
        price: 2500,
        customization: "Вышивка логотипа"
      }
    ],
    total: 2500
  }
];

const mockSavedDesigns: SavedDesign[] = [
  {
    id: "DES-001",
    name: "Логотип компании",
    type: "print",
    garment: "Футболка",
    price: 1700,
    createdAt: "2024-01-10",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "DES-002",
    name: "Праздничная вышивка",
    type: "embroidery", 
    garment: "Худи",
    price: 2800,
    createdAt: "2024-01-12",
    imageUrl: "/placeholder.svg"
  }
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'processing': return 'bg-yellow-100 text-yellow-800';
    case 'production': return 'bg-blue-100 text-blue-800';
    case 'shipped': return 'bg-purple-100 text-purple-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: Order['status']) => {
  switch (status) {
    case 'processing': return 'Обработка';
    case 'production': return 'В производстве';
    case 'shipped': return 'Отправлен';
    case 'delivered': return 'Доставлен';
    default: return 'Неизвестно';
  }
};

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'processing': return <Clock className="w-4 h-4" />;
    case 'production': return <Settings className="w-4 h-4" />;
    case 'shipped': return <Truck className="w-4 h-4" />;
    case 'delivered': return <CheckCircle className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

export default function Account() {
  const [orders] = useState<Order[]>(mockOrders);
  const [savedDesigns] = useState<SavedDesign[]>(mockSavedDesigns);
  const [userInfo, setUserInfo] = useState({
    name: "Иван Петров",
    email: "ivan@example.com", 
    phone: "+7 (999) 123-45-67",
    city: "Санкт-Петербург"
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-lg font-semibold">
                {userInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{userInfo.name}</h1>
              <p className="text-slate-600">{userInfo.email}</p>
            </div>
          </div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Заказы
              </TabsTrigger>
              <TabsTrigger value="designs" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Сохраненные
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Настройки
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>История заказов</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">Заказ #{order.id}</h3>
                          <p className="text-sm text-slate-600">от {new Date(order.date).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(order.status)} border-0`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{getStatusText(order.status)}</span>
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-medium">{item.price * item.quantity} ₽</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Подробнее
                          </Button>
                          {order.status === 'delivered' && (
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Повторить
                            </Button>
                          )}
                        </div>
                        <span className="font-bold text-lg">Итого: {order.total} ₽</span>
                      </div>
                      
                      {order.trackingNumber && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <p className="text-sm text-slate-600">
                            Трек-номер: <span className="font-mono">{order.trackingNumber}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Designs Tab */}
            <TabsContent value="designs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Сохраненные дизайны</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedDesigns.map((design) => (
                      <div key={design.id} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-slate-500 text-center">
                              <div className="w-12 h-12 mx-auto mb-2 bg-slate-400 rounded"></div>
                              <p className="text-xs">{design.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-slate-900 mb-1">{design.name}</h3>
                          <p className="text-sm text-slate-600 mb-2">{design.garment}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant={design.type === 'print' ? 'default' : 'secondary'}>
                              {design.type === 'print' ? 'Печать' : 'Вышивка'}
                            </Badge>
                            <span className="font-semibold">{design.price} ₽</span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="flex-1">Заказать</Button>
                            <Button size="sm" variant="outline">Изменить</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input 
                        id="name" 
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input 
                        id="phone" 
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Город</Label>
                      <Input 
                        id="city" 
                        value={userInfo.city}
                        onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button className="mt-4">Сохранить изменения</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки уведомлений</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email уведомления</h4>
                        <p className="text-sm text-slate-600">Получать уведомления о статусе заказов</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS уведомления</h4>
                        <p className="text-sm text-slate-600">SMS о готовности заказа</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Промо-рассылка</h4>
                        <p className="text-sm text-slate-600">Специальные предложения и скидки</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}


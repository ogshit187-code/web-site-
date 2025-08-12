import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Heart, ShoppingCart } from "lucide-react";

interface Design {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  tags: string[];
  popularity: number;
}

const mockDesigns: Design[] = [
  {
    id: "1",
    title: "Минималистичный логотип",
    category: "Бизнес",
    price: 200,
    image: "/placeholder.svg",
    tags: ["логотип", "минимализм", "бизнес"],
    popularity: 95
  },
  {
    id: "2", 
    title: "Винтажная типографика",
    category: "Винтаж",
    price: 350,
    image: "/placeholder.svg",
    tags: ["винтаж", "типографика", "ретро"],
    popularity: 87
  },
  {
    id: "3",
    title: "Современный абстрактный принт",
    category: "Абстракция",
    price: 450,
    image: "/placeholder.svg", 
    tags: ["абстракция", "современный", "арт"],
    popularity: 92
  },
  {
    id: "4",
    title: "Геометрический паттерн",
    category: "Геометрия",
    price: 300,
    image: "/placeholder.svg",
    tags: ["геометрия", "паттерн", "современный"],
    popularity: 89
  },
  {
    id: "5",
    title: "Иллюстрация природы",
    category: "Природа",
    price: 400,
    image: "/placeholder.svg",
    tags: ["природа", "иллюстрация", "органика"],
    popularity: 91
  },
  {
    id: "6",
    title: "Спортивный дизайн",
    category: "Спорт",
    price: 280,
    image: "/placeholder.svg",
    tags: ["спорт", "активность", "мотивация"],
    popularity: 88
  }
];

export default function Catalog() {
  const [designs] = useState<Design[]>(mockDesigns);
  const [filteredDesigns, setFilteredDesigns] = useState<Design[]>(mockDesigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const categories = ["all", ...Array.from(new Set(designs.map(d => d.category)))];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterDesigns(term, selectedCategory, sortBy);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterDesigns(searchTerm, category, sortBy);
  };

  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);
    filterDesigns(searchTerm, selectedCategory, sortOption);
  };

  const filterDesigns = (search: string, category: string, sort: string) => {
    let filtered = designs;

    // Search filter
    if (search) {
      filtered = filtered.filter(design => 
        design.title.toLowerCase().includes(search.toLowerCase()) ||
        design.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter(design => design.category === category);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popularity":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

    setFilteredDesigns(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Каталог готовых дизайнов
            </h1>
            <p className="text-slate-600 mt-2">Выберите готовый дизайн или используйте как основу для своего проекта</p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Поиск дизайнов..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger>
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">По популярности</SelectItem>
                  <SelectItem value="price-low">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-high">Цена: по убыванию</SelectItem>
                </SelectContent>
              </Select>

              {/* Results count */}
              <div className="flex items-center text-slate-600">
                Найдено: <span className="font-semibold ml-1">{filteredDesigns.length}</span>
              </div>
            </div>
          </div>

          {/* Designs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigns.map((design) => (
              <Card key={design.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                    {/* Placeholder for design image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-slate-500 text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-slate-400 rounded-lg"></div>
                        <p className="text-sm">{design.title}</p>
                      </div>
                    </div>
                    
                    {/* Overlay buttons */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Heart className="w-4 h-4 mr-1" />
                        В избранное
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Заказать
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-900 line-clamp-1">{design.title}</h3>
                    <Badge variant="secondary" className="text-xs">{design.category}</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {design.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900">от {design.price} ₽</span>
                    <div className="flex items-center text-sm text-slate-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      {design.popularity}% рейтинг
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDesigns.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-slate-200 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Дизайны не найдены</h3>
              <p className="text-slate-600">Попробуйте изменить параметры поиска или фильтры</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

interface PrintPosition {
  id: string;
  name: string;
  x: number; // процент от ширины
  y: number; // процент от высоты
  maxWidth: number; // максимальная ширина в процентах
  maxHeight: number; // максимальная высота в процентах
}

interface ProductPreview3DProps {
  garmentType: string;
  garmentColor?: string;
  printPosition: string;
  printSize: { width: number; height: number }; // в процентах
  uploadedImage?: File;
  onPositionChange: (position: string) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  onColorChange: (color: string) => void;
}

const garmentPositions: Record<string, PrintPosition[]> = {
  tshirt: [
    { id: 'chest', name: 'Грудь', x: 50, y: 35, maxWidth: 25, maxHeight: 30 },
    { id: 'back', name: 'Спина', x: 50, y: 30, maxWidth: 35, maxHeight: 40 },
    { id: 'sleeve-left', name: 'Левый рукав', x: 15, y: 25, maxWidth: 15, maxHeight: 20 },
    { id: 'sleeve-right', name: 'Правый рукав', x: 85, y: 25, maxWidth: 15, maxHeight: 20 },
  ],
  hoodie: [
    { id: 'chest', name: 'Грудь', x: 50, y: 40, maxWidth: 25, maxHeight: 25 },
    { id: 'back', name: 'Спина', x: 50, y: 35, maxWidth: 35, maxHeight: 40 },
    { id: 'sleeve-left', name: 'Левый рукав', x: 15, y: 30, maxWidth: 15, maxHeight: 20 },
    { id: 'sleeve-right', name: 'Правый рукав', x: 85, y: 30, maxWidth: 15, maxHeight: 20 },
    { id: 'hood', name: 'Капюшон', x: 50, y: 15, maxWidth: 20, maxHeight: 15 },
  ],
  sweatshirt: [
    { id: 'chest', name: 'Грудь', x: 50, y: 40, maxWidth: 25, maxHeight: 25 },
    { id: 'back', name: 'Спина', x: 50, y: 35, maxWidth: 35, maxHeight: 40 },
    { id: 'sleeve-left', name: 'Левый рукав', x: 15, y: 30, maxWidth: 15, maxHeight: 20 },
    { id: 'sleeve-right', name: 'Правый рукав', x: 85, y: 30, maxWidth: 15, maxHeight: 20 },
  ],
};

const garmentColors = [
  { id: 'white', name: 'Белый', color: '#FFFFFF', border: '#E5E7EB' },
  { id: 'black', name: 'Черный', color: '#1F2937', border: '#374151' },
  { id: 'gray', name: 'Серый', color: '#6B7280', border: '#9CA3AF' },
  { id: 'navy', name: 'Темно-синий', color: '#1E3A8A', border: '#3B82F6' },
  { id: 'red', name: 'Красный', color: '#DC2626', border: '#EF4444' },
];

export default function ProductPreview3D({
  garmentType,
  garmentColor = 'white',
  printPosition,
  printSize,
  uploadedImage,
  onPositionChange,
  onSizeChange,
  onColorChange
}: ProductPreview3DProps) {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingPrint, setIsDraggingPrint] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [printOffset, setPrintOffset] = useState({ x: 0, y: 0 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Получаем позиции для текущего типа одежды
  const positions = garmentPositions[garmentType] || garmentPositions.tshirt;
  const currentPosition = positions.find(p => p.id === printPosition) || positions[0];
  const selectedColor = garmentColors.find(c => c.id === garmentColor) || garmentColors[0];

  // Создаем URL для загруженного изображения
  React.useEffect(() => {
    if (uploadedImage) {
      const url = URL.createObjectURL(uploadedImage);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(null);
    }
  }, [uploadedImage]);

  const handlePositionClick = (positionId: string) => {
    onPositionChange(positionId);
    setPrintOffset({ x: 0, y: 0 }); // Сброс смещения при смене позиции
  };

  const handleSizeChange = (dimension: 'width' | 'height', delta: number) => {
    const newSize = { ...printSize };
    newSize[dimension] = Math.max(5, Math.min(currentPosition.maxWidth, newSize[dimension] + delta));
    onSizeChange(newSize);
  };

  // Функции для перетаскивания принта
  const handlePrintMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPrint(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePrintMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPrint) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    // Конвертируем пиксели в проценты (примерно)
    const offsetX = (deltaX / 400) * 100;
    const offsetY = (deltaY / 400) * 100;
    
    // Ограничиваем смещение в разумных пределах
    const maxOffset = 20;
    const newOffsetX = Math.max(-maxOffset, Math.min(maxOffset, printOffset.x + offsetX));
    const newOffsetY = Math.max(-maxOffset, Math.min(maxOffset, printOffset.y + offsetY));
    
    setPrintOffset({ x: newOffsetX, y: newOffsetY });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePrintMouseUp = () => {
    setIsDraggingPrint(false);
  };

  const getGarmentSVG = () => {
    const baseStyle = {
      fill: selectedColor.color,
      stroke: selectedColor.border,
      strokeWidth: 2
    };

    switch (garmentType) {
      case 'hoodie':
        return (
          <g>
            {/* Основа худи */}
            <path
              d="M 100 120 L 100 300 L 300 300 L 300 120 C 300 100 280 80 260 80 L 240 80 L 240 60 C 240 40 220 20 200 20 C 180 20 160 40 160 60 L 160 80 L 140 80 C 120 80 100 100 100 120 Z"
              style={baseStyle}
            />
            {/* Капюшон */}
            <path
              d="M 160 80 C 160 60 180 40 200 40 C 220 40 240 60 240 80"
              style={{ ...baseStyle, fill: 'none', strokeWidth: 3 }}
            />
            {/* Карман-кенгуру */}
            <rect x="160" y="180" width="80" height="40" rx="10" style={{ ...baseStyle, fill: 'none' }} />
          </g>
        );
        
      case 'sweatshirt':
        return (
          <g>
            {/* Основа свитшота */}
            <path
              d="M 100 120 L 100 300 L 300 300 L 300 120 C 300 100 280 80 260 80 L 140 80 C 120 80 100 100 100 120 Z"
              style={baseStyle}
            />
            {/* Воротник */}
            <ellipse cx="200" cy="80" rx="25" ry="15" style={{ ...baseStyle, fill: 'none' }} />
          </g>
        );
        
      default: // tshirt
        return (
          <g>
            {/* Основа футболки */}
            <path
              d="M 120 100 L 120 300 L 280 300 L 280 100 C 280 80 270 70 250 70 L 150 70 C 130 70 120 80 120 100 Z"
              style={baseStyle}
            />
            {/* Воротник */}
            <ellipse cx="200" cy="70" rx="20" ry="10" style={{ ...baseStyle, fill: 'none' }} />
            {/* Рукава */}
            <ellipse cx="105" cy="110" rx="25" ry="40" style={baseStyle} />
            <ellipse cx="295" cy="110" rx="25" ry="40" style={baseStyle} />
          </g>
        );
    }
  };

  const renderPrintArea = () => {
    if (!currentPosition) return null;

    // Базовая позиция + смещение от перетаскивания
    const baseX = (currentPosition.x / 100) * 400;
    const baseY = (currentPosition.y / 100) * 400;
    const offsetX = (printOffset.x / 100) * 400;
    const offsetY = (printOffset.y / 100) * 400;
    
    const printX = baseX + offsetX - (printSize.width / 100) * 200;
    const printY = baseY + offsetY - (printSize.height / 100) * 200;
    const printWidth = (printSize.width / 100) * 400;
    const printHeight = (printSize.height / 100) * 400;

    return (
      <g>
        {/* Загруженное изображение - паттерн */}
        {imageUrl && (
          <defs>
            <pattern id="print-pattern" x="0" y="0" width="1" height="1">
              <image
                href={imageUrl}
                x="0"
                y="0"
                width={printWidth}
                height={printHeight}
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
        )}
        
        {/* Область принта */}
        <rect
          x={printX}
          y={printY}
          width={printWidth}
          height={printHeight}
          fill={imageUrl ? `url(#print-pattern)` : 'rgba(59, 130, 246, 0.3)'}
          stroke="#3B82F6"
          strokeWidth="2"
          strokeDasharray="5,5"
          rx="4"
          style={{ cursor: 'move' }}
          onMouseDown={handlePrintMouseDown}
        />
        
        {/* Центральная точка с подписью */}
        <g>
          <circle
            cx={baseX + offsetX}
            cy={baseY + offsetY}
            r="4"
            fill="#3B82F6"
          />
          <text
            x={baseX + offsetX}
            y={baseY + offsetY - 10}
            textAnchor="middle"
            fontSize="12"
            fill="#1F2937"
            fontWeight="bold"
          >
            {currentPosition.name}
          </text>
        </g>
        
        {/* Размеры принта */}
        <text
          x={printX + printWidth/2}
          y={printY + printHeight + 15}
          textAnchor="middle"
          fontSize="10"
          fill="#6B7280"
        >
          {printSize.width}×{printSize.height}см
        </text>
      </g>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>3D Превью</span>
            <div className="flex gap-2">
              <Badge variant={view === 'front' ? 'default' : 'outline'}>
                {view === 'front' ? 'Перед' : 'Зад'}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 3D Превью */}
          <div 
            ref={containerRef}
            className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden"
            style={{ height: '400px' }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              className="absolute inset-0"
              style={{ transform: `scale(${zoom})` }}
              onMouseMove={handlePrintMouseMove}
              onMouseUp={handlePrintMouseUp}
              onMouseLeave={handlePrintMouseUp}
            >
              {/* Фон */}
              <rect width="400" height="400" fill="url(#bg-gradient)" />
              
              {/* Градиент для фона */}
              <defs>
                <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9FAFB" />
                  <stop offset="100%" stopColor="#E5E7EB" />
                </linearGradient>
              </defs>
              
              {/* Изделие */}
              {getGarmentSVG()}
              
              {/* Область принта */}
              {renderPrintArea()}
            </svg>

            {/* Элементы управления превью */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setView(view === 'front' ? 'back' : 'front')}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoom(Math.min(2, zoom + 0.2))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Выбор позиции */}
      <Card>
        <CardHeader>
          <CardTitle>Позиция принта</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {positions.map((position) => (
              <Button
                key={position.id}
                variant={printPosition === position.id ? 'default' : 'outline'}
                className="h-auto p-3"
                onClick={() => handlePositionClick(position.id)}
              >
                <div className="text-center">
                  <div className="font-medium">{position.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    макс. {position.maxWidth}×{position.maxHeight}см
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Настройки размера */}
      <Card>
        <CardHeader>
          <CardTitle>Размер принта</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Ширина:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleSizeChange('width', -1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="min-w-[60px] text-center font-mono">
                  {printSize.width}см
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleSizeChange('width', 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Высота:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleSizeChange('height', -1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="min-w-[60px] text-center font-mono">
                  {printSize.height}см
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleSizeChange('height', 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <div>Максимальный размер для {currentPosition?.name}: {currentPosition?.maxWidth}×{currentPosition?.maxHeight}см</div>
              <div className="text-blue-600">💡 Перетащите принт на 3D модели для точного позиционирования</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Выбор цвета изделия */}
      <Card>
        <CardHeader>
          <CardTitle>Цвет изделия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {garmentColors.map((color) => (
              <button
                key={color.id}
                className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                  garmentColor === color.id 
                    ? 'ring-2 ring-blue-500 ring-offset-2' 
                    : 'hover:scale-110'
                }`}
                style={{ 
                  backgroundColor: color.color,
                  borderColor: color.border 
                }}
                onClick={() => onColorChange(color.id)}
                title={color.name}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

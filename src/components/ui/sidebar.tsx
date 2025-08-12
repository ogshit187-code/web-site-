import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Menu, Calculator, Phone, Mail, MapPin, Clock, Star, ChevronRight } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Услуги",
    href: "#services",
    items: [
      { name: "DTF Печать", href: "#services", badge: "от 200₽" },
      { name: "Машинная вышивка", href: "#services", badge: "от 300₽" },
      { name: "Готовые изделия", href: "#services", badge: "от 1700₽" },
    ]
  },
  {
    title: "Инструменты",
    href: "#calculator",
    items: [
      { name: "Калькулятор стоимости", href: "#calculator", icon: Calculator },
      { name: "3D Превью", href: "#calculator" },
      { name: "Портфолио работ", href: "#portfolio" },
    ]
  },
  {
    title: "Информация",
    href: "#about",
    items: [
      { name: "О нас", href: "#about" },
      { name: "Как мы работаем", href: "#process" },
      { name: "Отзывы клиентов", href: "#reviews" },
    ]
  },
  {
    title: "Контакты",
    href: "#contact",
    items: [
      { name: "Связаться с нами", href: "#contact", icon: Phone },
      { name: "Адрес студии", href: "#contact", icon: MapPin },
      { name: "Время работы", href: "#contact", icon: Clock },
    ]
  }
];

const contactInfo = {
  phone: "+7 (812) 000-00-00",
  email: "hello@printstitch.ru",
  address: "Санкт-Петербург",
  hours: "Пн-Пт: 10:00-19:00"
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Закрытие при клике на Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
        } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (href: string) => {
    onClose();
    // Плавная прокрутка к секции
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

    return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
            className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-out shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Print Stitch Studio</h2>
            <p className="text-sm text-gray-500 mt-1">Печать и вышивка на одежде</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full overflow-y-auto pb-20">
          {/* Quick Actions */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Быстрые действия
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start h-12"
                onClick={() => handleLinkClick('#calculator')}
              >
                <Calculator className="w-4 h-4 mr-3" />
                Рассчитать стоимость
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-12"
                onClick={() => handleLinkClick('#contact')}
              >
                <Phone className="w-4 h-4 mr-3" />
                Связаться с нами
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1">
            {menuItems.map((section, index) => (
              <div key={index} className="border-b border-gray-100">
                <button
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{section.title}</span>
                    <ChevronRight 
          className={cn(
                        "w-4 h-4 text-gray-400 transition-transform duration-200",
                        activeSection === section.title ? "rotate-90" : ""
                      )} 
                    />
                  </div>
                </button>

                {/* Subsection */}
        <div
          className={cn(
                    "overflow-hidden transition-all duration-300 ease-out",
                    activeSection === section.title ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="pb-2">
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200 group"
                        onClick={() => handleLinkClick(item.href)}
                      >
                        <div className="flex items-center justify-between pl-4">
                          <div className="flex items-center">
                            {item.icon && <item.icon className="w-4 h-4 mr-3 text-gray-400" />}
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">
                              {item.name}
                            </span>
                          </div>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Контактная информация
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-400 mr-3" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-400 mr-3" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">{contactInfo.address}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">{contactInfo.hours}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">5.0</span>
                </div>
                <span className="text-xs text-gray-500">127 отзывов</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
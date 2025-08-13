import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  servicesTitle: string;
  calculatorTitle: string;
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  saveContent: () => void;
  loadContent: () => void;
}

const defaultContent: SiteContent = {
  heroTitle: "SUMMER SERIES",
  heroSubtitle: "ПЕЧАТЬ DTF И МАШИННАЯ ВЫШИВКА В САНКТ-ПЕТЕРБУРГЕ — СРОК ИЗГОТОВЛЕНИЯ 1 ДЕНЬ.",
  aboutTitle: "Что мы делаем",
  aboutDescription: "Профессиональная печать и вышивка на одежде",
  servicesTitle: "Услуги и цены",
  calculatorTitle: "Рассчитайте стоимость"
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  const saveContent = () => {
    try {
      localStorage.setItem('smolin-site-content', JSON.stringify(content));
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении контента:', error);
      return false;
    }
  };

  const loadContent = () => {
    try {
      const savedContent = localStorage.getItem('smolin-site-content');
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        setContent({ ...defaultContent, ...parsed });
      }
    } catch (error) {
      console.error('Ошибка при загрузке контента:', error);
    }
  };

  // Загружаем контент при инициализации
  useEffect(() => {
    loadContent();
  }, []);

  // Автосохранение при изменении контента
  useEffect(() => {
    const timer = setTimeout(() => {
      saveContent();
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

  const value: ContentContextType = {
    content,
    updateContent,
    saveContent,
    loadContent
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

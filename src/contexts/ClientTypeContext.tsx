import { createContext, useContext, useState, ReactNode } from "react";

export type ClientType = 'retail' | 'wholesale';

interface ClientTypeContextType {
  clientType: ClientType | null;
  setClientType: (type: ClientType) => void;
  isRetail: boolean;
  isWholesale: boolean;
  resetClientType: () => void;
}

const ClientTypeContext = createContext<ClientTypeContextType | undefined>(undefined);

export function ClientTypeProvider({ children }: { children: ReactNode }) {
  const [clientType, setClientTypeState] = useState<ClientType | null>(null);

  const setClientType = (type: ClientType) => {
    setClientTypeState(type);
    // Сохраняем в localStorage для следующих посещений
    localStorage.setItem('smolin-client-type', type);
  };

  const resetClientType = () => {
    setClientTypeState(null);
    localStorage.removeItem('smolin-client-type');
  };

  const value: ClientTypeContextType = {
    clientType,
    setClientType,
    isRetail: clientType === 'retail',
    isWholesale: clientType === 'wholesale',
    resetClientType
  };

  return (
    <ClientTypeContext.Provider value={value}>
      {children}
    </ClientTypeContext.Provider>
  );
}

export function useClientType() {
  const context = useContext(ClientTypeContext);
  if (context === undefined) {
    throw new Error('useClientType must be used within a ClientTypeProvider');
  }
  return context;
}

// Хук для получения цен в зависимости от типа клиента
export function usePricing() {
  const { isRetail, isWholesale } = useClientType();

  const getPriceMultiplier = () => {
    if (isWholesale) return 0.8; // 20% скидка для оптовиков
    return 1; // Обычная цена для розницы
  };

  const getMinimumQuantity = () => {
    if (isWholesale) return 10;
    return 1;
  };

  const getDiscountBreakpoints = () => {
    if (isWholesale) {
      return [
        { min: 10, discount: 0.2, label: "20% скидка" },
        { min: 50, discount: 0.25, label: "25% скидка" },
        { min: 100, discount: 0.3, label: "30% скидка" },
        { min: 500, discount: 0.35, label: "35% скидка" }
      ];
    } else {
      return [
        { min: 5, discount: 0.05, label: "5% скидка" },
        { min: 10, discount: 0.1, label: "10% скидка" },
        { min: 20, discount: 0.15, label: "15% скидка" },
        { min: 50, discount: 0.2, label: "20% скидка" }
      ];
    }
  };

  return {
    getPriceMultiplier,
    getMinimumQuantity,
    getDiscountBreakpoints,
    isRetail,
    isWholesale
  };
}

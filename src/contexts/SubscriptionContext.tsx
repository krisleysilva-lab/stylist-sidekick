import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  limits: {
    users: number;
    clients: number;
    appointments: number;
    storage: string;
  };
}

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan | null;
  plans: SubscriptionPlan[];
  isLoading: boolean;
  subscribeTo: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  hasFeature: (feature: string) => boolean;
  isWithinLimits: (limit: string, current: number) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const plans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    interval: 'monthly',
    features: ['agenda-basica', 'max-10-clientes', 'branding-cabelleira'],
    limits: {
      users: 1,
      clients: 10,
      appointments: 50,
      storage: '100MB'
    }
  },
  {
    id: 'professional',
    name: 'Profissional',
    price: 29.90,
    interval: 'monthly',
    features: ['agenda-completa', 'clientes-ilimitados', 'financeiro', 'whatsapp', 'sem-branding'],
    limits: {
      users: 3,
      clients: -1, // ilimitado
      appointments: -1,
      storage: '5GB'
    }
  },
  {
    id: 'salon',
    name: 'Salão',
    price: 79.90,
    interval: 'monthly',
    features: ['tudo-profissional', 'usuarios-ilimitados', 'loja-online', 'fidelidade', 'conteudo', 'relatorios-avancados'],
    limits: {
      users: -1,
      clients: -1,
      appointments: -1,
      storage: '50GB'
    }
  }
];

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Simular busca do plano atual
      const savedPlan = localStorage.getItem('cabelleira_plan');
      if (savedPlan) {
        const plan = plans.find(p => p.id === savedPlan);
        setCurrentPlan(plan || plans[0]);
      } else {
        setCurrentPlan(plans[0]); // Plano gratuito por padrão
      }
    }
    setIsLoading(false);
  }, [user]);

  const subscribeTo = async (planId: string) => {
    setIsLoading(true);
    try {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        // Em produção, integrar com Stripe
        localStorage.setItem('cabelleira_plan', planId);
        setCurrentPlan(plan);
      }
    } catch (error) {
      throw new Error('Erro ao processar assinatura');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async () => {
    setIsLoading(true);
    try {
      // Em produção, cancelar no Stripe
      localStorage.setItem('cabelleira_plan', 'free');
      setCurrentPlan(plans[0]);
    } catch (error) {
      throw new Error('Erro ao cancelar assinatura');
    } finally {
      setIsLoading(false);
    }
  };

  const hasFeature = (feature: string): boolean => {
    return currentPlan?.features.includes(feature) || false;
  };

  const isWithinLimits = (limit: string, current: number): boolean => {
    if (!currentPlan) return false;
    const limitValue = currentPlan.limits[limit as keyof typeof currentPlan.limits];
    if (typeof limitValue === 'number') {
      return limitValue === -1 || current < limitValue;
    }
    return true;
  };

  const value = {
    currentPlan,
    plans,
    isLoading,
    subscribeTo,
    cancelSubscription,
    hasFeature,
    isWithinLimits
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};
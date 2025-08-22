import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Navegação
    'nav.dashboard': 'Dashboard',
    'nav.scheduling': 'Agenda',
    'nav.clients': 'Clientes',
    'nav.financial': 'Financeiro',
    'nav.store': 'Loja',
    'nav.loyalty': 'Fidelidade',
    'nav.content': 'Conteúdo',
    'nav.admin': 'Admin',
    'nav.profile': 'Perfil',
    
    // Landing Page
    'hero.title': 'Cabelleira',
    'hero.subtitle': 'O sistema definitivo criado para quem vive da beleza e quer escalar como empresária',
    'hero.description': 'Agende, venda, fidelize, aprenda e lucre — tudo em um só lugar.',
    'hero.cta': 'Começar Agora',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Bem-vinda de volta',
    'dashboard.revenue': 'Faturamento',
    'dashboard.clients': 'Clientes',
    'dashboard.appointments': 'Agendamentos',
    
    // Autenticação
    'auth.login': 'Entrar',
    'auth.register': 'Criar Conta',
    'auth.email': 'Email',
    'auth.password': 'Senha',
    'auth.name': 'Nome',
    'auth.forgotPassword': 'Esqueci minha senha',
  },
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.scheduling': 'Schedule',
    'nav.clients': 'Clients',
    'nav.financial': 'Financial',
    'nav.store': 'Store',
    'nav.loyalty': 'Loyalty',
    'nav.content': 'Content',
    'nav.admin': 'Admin',
    'nav.profile': 'Profile',
    
    'hero.title': 'Cabelleira',
    'hero.subtitle': 'The definitive system created for beauty professionals who want to scale as entrepreneurs',
    'hero.description': 'Schedule, sell, retain, learn and profit — all in one place.',
    'hero.cta': 'Get Started',
    
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.revenue': 'Revenue',
    'dashboard.clients': 'Clients',
    'dashboard.appointments': 'Appointments',
    
    'auth.login': 'Sign In',
    'auth.register': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.forgotPassword': 'Forgot password',
  },
  es: {
    'nav.dashboard': 'Panel',
    'nav.scheduling': 'Agenda',
    'nav.clients': 'Clientes',
    'nav.financial': 'Financiero',
    'nav.store': 'Tienda',
    'nav.loyalty': 'Fidelidad',
    'nav.content': 'Contenido',
    'nav.admin': 'Admin',
    'nav.profile': 'Perfil',
    
    'hero.title': 'Cabelleira',
    'hero.subtitle': 'El sistema definitivo creado para profesionales de la belleza que quieren escalar como empresarias',
    'hero.description': 'Agenda, vende, fideliza, aprende y lucra — todo en un solo lugar.',
    'hero.cta': 'Empezar Ahora',
    
    'dashboard.title': 'Panel',
    'dashboard.welcome': 'Bienvenida de vuelta',
    'dashboard.revenue': 'Facturación',
    'dashboard.clients': 'Clientes',
    'dashboard.appointments': 'Citas',
    
    'auth.login': 'Iniciar Sesión',
    'auth.register': 'Crear Cuenta',
    'auth.email': 'Email',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre',
    'auth.forgotPassword': 'Olvidé mi contraseña',
  },
  fr: {
    'nav.dashboard': 'Tableau de bord',
    'nav.scheduling': 'Agenda',
    'nav.clients': 'Clients',
    'nav.financial': 'Financier',
    'nav.store': 'Boutique',
    'nav.loyalty': 'Fidélité',
    'nav.content': 'Contenu',
    'nav.admin': 'Admin',
    'nav.profile': 'Profil',
    
    'hero.title': 'Cabelleira',
    'hero.subtitle': 'Le système définitif créé pour les professionnels de la beauté qui veulent évoluer en tant qu\'entrepreneurs',
    'hero.description': 'Planifiez, vendez, fidélisez, apprenez et profitez — tout en un seul endroit.',
    'hero.cta': 'Commencer Maintenant',
    
    'dashboard.title': 'Tableau de bord',
    'dashboard.welcome': 'Bon retour',
    'dashboard.revenue': 'Chiffre d\'affaires',
    'dashboard.clients': 'Clients',
    'dashboard.appointments': 'Rendez-vous',
    
    'auth.login': 'Se connecter',
    'auth.register': 'Créer un compte',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.name': 'Nom',
    'auth.forgotPassword': 'Mot de passe oublié',
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cabelleira_language') as Language;
    if (savedLanguage && ['pt', 'en', 'es', 'fr'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Detectar idioma do navegador
      const browserLang = navigator.language.split('-')[0];
      if (['pt', 'en', 'es', 'fr'].includes(browserLang)) {
        setLanguage(browserLang as Language);
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('cabelleira_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
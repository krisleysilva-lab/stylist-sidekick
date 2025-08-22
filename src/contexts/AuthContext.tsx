import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'professional' | 'receptionist';
  salon?: {
    id: string;
    name: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de token armazenado
    const checkAuth = async () => {
      const token = localStorage.getItem('cabelleira_token');
      if (token) {
        // Em produção, validar token com Supabase
        const userData = localStorage.getItem('cabelleira_user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Em produção, usar Supabase Auth
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'admin',
        salon: {
          id: '1',
          name: 'Salão Exemplo'
        }
      };
      
      localStorage.setItem('cabelleira_token', 'mock_token');
      localStorage.setItem('cabelleira_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Em produção, usar Supabase Auth
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: 'admin'
      };
      
      localStorage.setItem('cabelleira_token', 'mock_token');
      localStorage.setItem('cabelleira_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('cabelleira_token');
    localStorage.removeItem('cabelleira_user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
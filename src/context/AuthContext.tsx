
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, signIn, signOut } from '@/lib/supabase';
import { toast } from 'sonner';
import { User } from '@/types';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for session on mount
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          // Get user profile from session
          const { data: userData } = await supabase.auth.getUser();
          
          if (userData.user) {
            setUser({
              id: userData.user.id,
              email: userData.user.email || '',
              name: userData.user.user_metadata?.name,
              role: userData.user.user_metadata?.role || 'employee',
              avatarUrl: userData.user.user_metadata?.avatar_url,
            });
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
    
    // Listen for auth changes
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { user: authUser } = session;
        
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          name: authUser.user_metadata?.name,
          role: authUser.user_metadata?.role || 'employee',
          avatarUrl: authUser.user_metadata?.avatar_url,
        });
        
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Demo user special case
      if (email === 'demo' && password === 'demo') {
        setUser({
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
          role: 'admin',
          avatarUrl: '',
        });
        setIsAuthenticated(true);
        toast.success('Login bem-sucedido!');
        return;
      }
      
      const { user: authUser } = await signIn(email, password);
      
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          name: authUser.user_metadata?.name,
          role: authUser.user_metadata?.role || 'employee',
          avatarUrl: authUser.user_metadata?.avatar_url,
        });
        
        setIsAuthenticated(true);
        toast.success('Login bem-sucedido!');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logout realizado com sucesso');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

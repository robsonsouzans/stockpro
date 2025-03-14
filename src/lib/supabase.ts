
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// This is a placeholder for the Supabase URL and anon key
// In a real application, you would get these from environment variables
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

// Create a single supabase client for the whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signIn = async (email: string, password: string) => {
  // For demo user
  if (email === 'demo' && password === 'demo') {
    return {
      user: {
        id: '1',
        email: 'demo@example.com',
        user_metadata: {
          name: 'Demo User',
          role: 'admin'
        }
      },
      session: {
        access_token: 'fake-token',
        expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
      }
    };
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(error.message || 'Erro ao fazer login');
    throw error;
  }
};

export const signUp = async (email: string, password: string, metadata: any) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      }
    });
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(error.message || 'Erro ao criar conta');
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    toast.error(error.message || 'Erro ao sair da conta');
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    toast.success('Email de recuperação enviado');
  } catch (error: any) {
    toast.error(error.message || 'Erro ao solicitar redefinição de senha');
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId);
    
    if (error) throw error;
    toast.success('Perfil atualizado com sucesso');
  } catch (error: any) {
    toast.error(error.message || 'Erro ao atualizar perfil');
    throw error;
  }
};

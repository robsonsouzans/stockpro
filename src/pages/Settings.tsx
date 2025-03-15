
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [cacheEnabled, setCacheEnabled] = useState(() => {
    return localStorage.getItem('cacheEnabled') !== 'false';
  });

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    toast.success(`Modo ${checked ? 'escuro' : 'claro'} ativado`);
  };

  const handleCacheChange = (checked: boolean) => {
    setCacheEnabled(checked);
    localStorage.setItem('cacheEnabled', String(checked));
    toast.success(`Cache ${checked ? 'ativado' : 'desativado'}`);
  };

  const clearCache = () => {
    // Limpar cache do aplicativo (exceto autenticação)
    const keysToPreserve = ['user', 'theme', 'cacheEnabled'];
    
    Object.keys(localStorage).forEach(key => {
      if (!keysToPreserve.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    
    // Limpar cache da sessão
    sessionStorage.clear();
    
    toast.success('Cache limpo com sucesso');
  };

  return (
    <DashboardLayout title="Configurações">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="cache">Cache</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Preferências de Interface</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Modo Escuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Ative para usar o tema escuro na aplicação
                  </p>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={handleDarkModeChange} 
                />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Informações do Perfil</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={user?.name || ''} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ''} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Input id="role" value={user?.role || ''} readOnly />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="cache" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Configurações de Cache</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Cache Local</Label>
                  <p className="text-sm text-muted-foreground">
                    Armazena dados localmente para melhor desempenho
                  </p>
                </div>
                <Switch 
                  checked={cacheEnabled} 
                  onCheckedChange={handleCacheChange} 
                />
              </div>
              
              <Separator />
              
              <div>
                <Button 
                  variant="destructive" 
                  onClick={clearCache}
                  className="mt-4"
                >
                  Limpar Cache
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Isso removerá todos os dados em cache, exceto a sessão do usuário.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;

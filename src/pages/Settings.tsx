
import React, { useState, useEffect } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BellRing, 
  Clock, 
  Eye, 
  Lock, 
  LogOut, 
  Moon, 
  RefreshCcw, 
  Shield, 
  Sun, 
  UserCircle 
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
  const { user, logout } = useAuth();
  
  // Theme settings
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  
  // Cache settings
  const [cacheEnabled, setCacheEnabled] = useState(() => {
    return localStorage.getItem('cacheEnabled') !== 'false';
  });
  
  // Font size
  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('fontSize') || '100');
  });
  
  // Animation settings
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    return localStorage.getItem('animationsEnabled') !== 'false';
  });
  
  // Language preference
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'pt-BR';
  });
  
  // Notification settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('notificationsEnabled') !== 'false';
  });

  // Apply font size
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  // Apply animations setting
  useEffect(() => {
    if (animationsEnabled) {
      document.documentElement.classList.remove('no-animations');
    } else {
      document.documentElement.classList.add('no-animations');
    }
    localStorage.setItem('animationsEnabled', String(animationsEnabled));
  }, [animationsEnabled]);

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
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem('language', value);
    toast.success('Idioma atualizado');
  };
  
  const handleNotificationsChange = (checked: boolean) => {
    setNotificationsEnabled(checked);
    localStorage.setItem('notificationsEnabled', String(checked));
    toast.success(`Notificações ${checked ? 'ativadas' : 'desativadas'}`);
  };

  const clearCache = () => {
    // Clear application cache (except authentication)
    const keysToPreserve = ['user', 'theme', 'cacheEnabled', 'fontSize', 'language', 'animationsEnabled', 'notificationsEnabled'];
    
    Object.keys(localStorage).forEach(key => {
      if (!keysToPreserve.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    
    // Clear session storage
    sessionStorage.clear();
    
    toast.success('Cache limpo com sucesso');
  };
  
  const resetSettings = () => {
    // Reset to defaults
    setDarkMode(false);
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    
    setCacheEnabled(true);
    localStorage.setItem('cacheEnabled', 'true');
    
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
    localStorage.setItem('fontSize', '100');
    
    setAnimationsEnabled(true);
    document.documentElement.classList.remove('no-animations');
    localStorage.setItem('animationsEnabled', 'true');
    
    setLanguage('pt-BR');
    localStorage.setItem('language', 'pt-BR');
    
    setNotificationsEnabled(true);
    localStorage.setItem('notificationsEnabled', 'true');
    
    toast.success('Configurações restauradas para os valores padrão');
  };

  return (
    <DashboardLayout title="Configurações">
      <Tabs defaultValue="appearance" className="space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
          <Button 
            variant="outline" 
            size="sm"
            className="gap-1 h-8"
            onClick={resetSettings}
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Restaurar Padrões
          </Button>
        </div>
        
        <TabsList className="w-full flex justify-start overflow-x-auto pb-px">
          <TabsTrigger value="appearance" className="gap-1">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-1">
            <UserCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1">
            <BellRing className="h-4 w-4" />
            <span className="hidden sm:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="gap-1">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Idioma</span>
          </TabsTrigger>
          <TabsTrigger value="cache" className="gap-1">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Cache</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Segurança</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Preferências de Interface</h3>
            <div className="space-y-6">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center gap-2">
                    {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    Modo Escuro
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {darkMode ? 'Desative para usar o tema claro' : 'Ative para usar o tema escuro'}
                  </p>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={handleDarkModeChange} 
                />
              </div>
              
              <Separator />
              
              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Tamanho da Fonte</Label>
                  <Badge variant="outline">{fontSize}%</Badge>
                </div>
                <Slider 
                  value={[fontSize]} 
                  min={75} 
                  max={150} 
                  step={5}
                  onValueChange={(value) => setFontSize(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Menor</span>
                  <span>Padrão</span>
                  <span>Maior</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Animations Toggle */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Animações</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar efeitos de transição e animações na interface
                  </p>
                </div>
                <Switch 
                  checked={animationsEnabled} 
                  onCheckedChange={(checked) => {
                    setAnimationsEnabled(checked);
                    toast.success(`Animações ${checked ? 'ativadas' : 'desativadas'}`);
                  }} 
                />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Informações do Perfil</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xl font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-medium text-lg">{user?.name || 'Usuário'}</p>
                  <p className="text-muted-foreground">{user?.email || 'email@exemplo.com'}</p>
                </div>
              </div>
              
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
                <div className="flex gap-3">
                  <Input id="role" value={user?.role || 'Admin'} readOnly className="flex-1" />
                  <Badge className="self-center">Admin</Badge>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="destructive-outline" 
                  onClick={logout} 
                  className="mt-4 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground flex gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sair da Conta
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Preferências de Notificações</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificações do Sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber alertas sobre atualizações e eventos importantes
                  </p>
                </div>
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={handleNotificationsChange} 
                />
              </div>
              
              <Separator />
              
              {notificationsEnabled && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Alertas de Estoque</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações quando o estoque estiver baixo
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Relatórios Semanais</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber resumos semanais por email
                      </p>
                    </div>
                    <Switch />
                  </div>
                </>
              )}
            </div>
          </Card>
        </TabsContent>
        
        {/* Language Settings */}
        <TabsContent value="language" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Preferências de Idioma</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma da Interface</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  O idioma selecionado será aplicado após recarregar a página
                </p>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="date-format">Formato de Data</Label>
                <Select defaultValue="dd/mm/yyyy">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/mm/yyyy">DD/MM/AAAA</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/DD/AAAA</SelectItem>
                    <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="time-format">Formato de Hora</Label>
                <Select defaultValue="24h">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 horas</SelectItem>
                    <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Cache Settings */}
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
                  variant="outline" 
                  onClick={clearCache}
                  className="flex gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Limpar Cache
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Isso removerá todos os dados em cache, exceto a sessão do usuário.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Segurança da Conta</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-base flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Alterar Senha
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Recomendamos alterar sua senha regularmente para maior segurança
                </p>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" placeholder="••••••••" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" placeholder="••••••••" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••" />
                  </div>
                </div>
                
                <Button className="mt-4">
                  Atualizar Senha
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label className="text-base">Sessões Ativas</Label>
                <p className="text-sm text-muted-foreground">
                  Este dispositivo (Navegador atual)
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Encerrar Outras Sessões
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

const Globe = (props: React.ComponentPropsWithoutRef<"svg">) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default Settings;

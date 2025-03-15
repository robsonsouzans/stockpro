
import { LogOut, User, Settings, ChevronRight, Upload } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserProfileProps = {
  isOpen: boolean;
};

const UserProfile = ({ isOpen }: UserProfileProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string>(user?.avatarUrl || "");

  const handleLogout = async () => {
    await logout();
  };

  const handleNavigateToSettings = () => {
    navigate("/settings");
  };

  // Simulação de upload de avatar - em produção isso seria feito com uma função real de upload
  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setAvatar(e.target.result as string);
            // Aqui em uma aplicação real você faria o upload para o backend
            // E atualizaria o objeto user
          }
        };
        reader.readAsDataURL(target.files[0]);
      }
    };
    input.click();
  };

  // Get the first letter of the user's name for the avatar
  const userInitial = user?.name?.charAt(0) || "U";

  return (
    <div className="p-4 border-t border-sidebar-border mt-auto transition-all duration-200">
      {isOpen ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-sidebar-accent group">
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleAvatarClick}>
                  <AvatarImage src={avatar} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium truncate max-w-[120px]">{user?.name || "Usuário"}</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate max-w-[120px]">{user?.email || "email@exemplo.com"}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-all" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer gap-2"
              onClick={handleAvatarClick}
            >
              <Upload className="h-4 w-4" />
              Alterar foto
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer gap-2"
              onClick={handleNavigateToSettings}
            >
              <Settings className="h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-destructive gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleAvatarClick}>
                  <AvatarImage src={avatar} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">
                {user?.name || "Usuário"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNavigateToSettings}
                  className="h-8 w-8 rounded-full hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground"
                  aria-label="Configurações"
                >
                  <Settings size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Configurações
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="h-8 w-8 rounded-full hover:bg-sidebar-accent text-destructive/70 hover:text-destructive"
                  aria-label="Sair"
                >
                  <LogOut size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Sair
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

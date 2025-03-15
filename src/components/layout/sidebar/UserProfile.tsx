
import { LogOut, User, Settings, ChevronRight } from "lucide-react";
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

type UserProfileProps = {
  isOpen: boolean;
};

const UserProfile = ({ isOpen }: UserProfileProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const handleNavigateToSettings = () => {
    navigate("/settings");
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
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="font-medium">{userInitial}</span>
                </div>
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
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors">
                  <span className="font-medium">{userInitial}</span>
                </div>
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

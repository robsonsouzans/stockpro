
import { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

type NavbarProps = {
  title?: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Navbar = ({ title = "Dashboard", sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Estoque baixo", message: "5 produtos com estoque baixo" },
    { id: 2, title: "Nova movimentação", message: "Entrada de produtos registrada" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to add shadow to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "z-20 glass sticky top-0 transition-all duration-300",
        isScrolled && "shadow-md"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100/50 lg:hidden"
          >
            <Menu size={22} className="text-gray-600" />
          </button>

          {/* Page title */}
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-9 pr-4 py-2 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 w-64 text-sm"
            />
            <Search size={16} className="absolute left-3 text-gray-400" />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-100/50 transition-colors relative"
            >
              <Bell size={20} className="text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass-card rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in">
                <div className="p-3 border-b border-gray-100/20">
                  <h3 className="font-medium">Notificações</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 border-b border-gray-100/20 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    >
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <button className="text-primary text-sm hover:underline">
                    Ver todas
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="User avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="font-medium text-sm">
                  {user?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  ChevronLeft,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Truck,
  User,
  X,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    // Add animation delay for items when sidebar opens
    if (isOpen) {
      const timer = setTimeout(() => {
        setAnimateItems(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimateItems(false);
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
  };

  // Menu items
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Produtos",
      icon: <Package size={20} />,
      path: "/products",
    },
    {
      name: "Estoque",
      icon: <Box size={20} />,
      path: "/inventory",
    },
    {
      name: "Movimentações",
      icon: <Truck size={20} />,
      path: "/inventory/movements",
    },
    {
      name: "Relatórios",
      icon: <BarChart3 size={20} />,
      path: "/reports",
    },
    {
      name: "Configurações",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "glass-card fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0 -translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* Close button - mobile only */}
        <button
          className="absolute right-4 top-4 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Sidebar header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100/20 h-16">
          {isOpen ? (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
                GE
              </div>
              <h1 className="ml-2 font-bold">StockPro</h1>
            </div>
          ) : (
            <div className="h-8 w-8 mx-auto rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
              GE
            </div>
          )}

          {/* Toggle button - desktop only */}
          <button
            className="hidden lg:block p-1 rounded-full hover:bg-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronLeft
              size={18}
              className={cn("text-gray-500 transition-transform duration-300", !isOpen && "rotate-180")}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={item.name}
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    animateItems ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                    // Add slight delay to each item
                    index > 0 && `transition-delay-${index * 50}`
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-100/50"
                    )}
                    title={!isOpen ? item.name : undefined}
                  >
                    <span className={cn("flex-shrink-0", isActive && "text-primary")}>
                      {item.icon}
                    </span>
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile */}
        <div className="p-4 border-t border-gray-100/20 mt-auto">
          {isOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  <User size={16} />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">{user?.name || "Usuário"}</p>
                  <p className="text-xs text-gray-500">{user?.role || "admin"}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100/50 transition-colors"
                title="Sair"
              >
                <LogOut size={18} className="text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600" title={user?.name || "Usuário"}>
                <User size={16} />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100/50 transition-colors"
                title="Sair"
              >
                <LogOut size={18} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


import { ReactNode } from "react";
import MenuItem from "./MenuItem";
import { 
  BarChart3, 
  Box, 
  LayoutDashboard, 
  Package, 
  Settings, 
  Truck 
} from "lucide-react";

type MenuItemType = {
  name: string;
  icon: ReactNode;
  path: string;
};

type MenuListProps = {
  isOpen: boolean;
  animateItems: boolean;
};

const MenuList = ({ isOpen, animateItems }: MenuListProps) => {
  // Menu items
  const menuItems: MenuItemType[] = [
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
    <nav className="flex-1 py-6 px-3 overflow-y-auto">
      <ul className="space-y-1">
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.name}
            path={item.path}
            name={item.name}
            icon={item.icon}
            isOpen={isOpen}
            index={index}
            animateItems={animateItems}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MenuList;

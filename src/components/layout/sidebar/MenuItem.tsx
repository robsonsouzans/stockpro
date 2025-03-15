
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type MenuItemProps = {
  path: string;
  name: string;
  icon: ReactNode;
  isOpen: boolean;
  index: number;
  animateItems: boolean;
};

const MenuItem = ({ path, name, icon, isOpen, index, animateItems }: MenuItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  const menuItem = (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-gray-600 hover:bg-gray-100/50"
      )}
    >
      <span className={cn("flex-shrink-0", isActive && "text-primary")}>
        {icon}
      </span>
      {isOpen && <span className="truncate">{name}</span>}
    </Link>
  );

  return (
    <li
      className={cn(
        "transition-all duration-300 ease-in-out",
        animateItems ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {!isOpen ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {menuItem}
            </TooltipTrigger>
            <TooltipContent side="right">
              {name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        menuItem
      )}
    </li>
  );
};

export default MenuItem;

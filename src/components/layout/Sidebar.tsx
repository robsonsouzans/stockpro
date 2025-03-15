
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebar/SidebarHeader";
import MenuList from "./sidebar/MenuList";
import UserProfile from "./sidebar/UserProfile";
import MobileOverlay from "./sidebar/MobileOverlay";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile overlay */}
      <MobileOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Sidebar */}
      <aside
        className={cn(
          "glass-card fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0 -translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* Sidebar header */}
        <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Navigation */}
        <MenuList isOpen={isOpen} animateItems={animateItems} />

        {/* User profile */}
        <UserProfile isOpen={isOpen} />
      </aside>
    </>
  );
};

export default Sidebar;


import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarHeaderProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarHeader = ({ isOpen, toggleSidebar }: SidebarHeaderProps) => {
  return (
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
        onClick={toggleSidebar}
      >
        <ChevronLeft
          size={18}
          className={cn("text-gray-500 transition-transform duration-300", !isOpen && "rotate-180")}
        />
      </button>
    </div>
  );
};

export default SidebarHeader;

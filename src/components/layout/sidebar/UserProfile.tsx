
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type UserProfileProps = {
  isOpen: boolean;
};

const UserProfile = ({ isOpen }: UserProfileProps) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
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
  );
};

export default UserProfile;

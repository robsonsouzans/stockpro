
import { X } from "lucide-react";

type MobileOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileOverlay = ({ isOpen, onClose }: MobileOverlayProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <button
        className="fixed right-4 top-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-40 lg:hidden"
        onClick={onClose}
        aria-label="Fechar menu"
      >
        <X size={20} className="text-gray-600" />
      </button>
    </>
  );
};

export default MobileOverlay;

import React from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-navy flex flex-col z-50 shadow-2xl animate-in slide-in-from-left duration-200">
        <div className="absolute top-4 right-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-light"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="h-full overflow-hidden">
          <Sidebar onCloseMobile={onClose} />
        </div>
      </div>
    </div>
  );
};


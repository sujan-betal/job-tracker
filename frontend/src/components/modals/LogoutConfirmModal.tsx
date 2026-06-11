import React from "react";
import { createPortal } from "react-dom";
import { LogOut, X } from "lucide-react";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal = ({ isOpen, onClose, onConfirm }: LogoutConfirmModalProps) => {
  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 bg-[#04060A]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-md bg-[#0D111A] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[#1A2333]">
          <div className="flex items-center gap-2 text-red-400">
            <LogOut size={18} />
            <h3 className="text-md font-bold text-white">Sign Out</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            Are you sure you want to sign out? You will need to sign in again to access your account.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#1A2333] bg-[#0A0D14]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modal, document.body);
  }

  return modal;
};

export default LogoutConfirmModal;

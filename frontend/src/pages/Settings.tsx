import React, { useState } from "react";
import { useAuth } from "../contextApi/AuthContext";
import { User, Mail, Shield, LogOut, Key } from "lucide-react";
import LogoutConfirmModal from "../components/modals/LogoutConfirmModal";

const Settings = () => {
  const { user, logout } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-200 p-8 px-6 md:px-12 font-sans relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="border-b border-[#1A2333] pb-6 mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your account settings, profile information, and security preferences.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile Card */}
        <div className="bg-[#0E131F]/90 border border-[#1E293B] rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-indigo-500"></div>

          <h3 className="text-lg font-bold text-white mb-6">Profile Settings</h3>

          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#1A2333] mb-6">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-500/20 flex-shrink-0">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "US"}
            </div>
            
            <div className="flex-1 text-center sm:text-left space-y-1">
              <h4 className="text-md font-bold text-white">{user?.name}</h4>
              <p className="text-slate-400 text-xs">{user?.email}</p>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Job Seeker Account
              </span>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            {/* Name field */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-[#1A2333]/50">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <User size={15} className="text-slate-500" />
                Full Name
              </span>
              <span className="text-slate-200 mt-1 sm:mt-0 font-semibold">{user?.name}</span>
            </div>

            {/* Email field */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-[#1A2333]/50">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Mail size={15} className="text-slate-500" />
                Email Address
              </span>
              <span className="text-slate-200 mt-1 sm:mt-0 font-semibold">{user?.email}</span>
            </div>

            {/* Account Role */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Shield size={15} className="text-slate-500" />
                Account Status
              </span>
              <span className="text-green-400 mt-1 sm:mt-0 font-semibold">Active & Synced</span>
            </div>
          </div>
        </div>

        {/* Security & System Actions */}
        <div className="bg-[#0E131F]/90 border border-[#1E293B] rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500/50 to-purple-500/50"></div>

          <h3 className="text-lg font-bold text-white mb-6">Security & Account Actions</h3>

          <div className="space-y-4">
            {/* Password Change Info */}
            <div className="flex items-center justify-between p-3.5 bg-slate-800/20 border border-[#1E293B] rounded-xl text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Key size={16} className="text-purple-400" />
                <span>Password management is currently configured via local system settings.</span>
              </div>
            </div>

            {/* Logout button */}
            <>
            <button
              onClick={() => setIsLogoutOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 text-red-400 font-bold text-sm rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
              <LogOut size={16} />
              Sign Out of Tracker
            </button>
            <LogoutConfirmModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} onConfirm={logout} />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

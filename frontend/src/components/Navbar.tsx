import React from "react";
import { useAuth } from "../contextApi/AuthContext";
import { LogOut, Bell, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Dashboard Overview";
      case "/applications": return "Job Applications";
      case "/interviews": return "Interviews Log";
      case "/offers": return "Offers Received";
      case "/contacts": return "Recruiter Contacts";
      case "/documents": return "Documents Vault";
      case "/settings": return "System Settings";
      default: return "Job Tracker";
    }
  };

  return (
    <header className="h-[70px] bg-[#0D1117] border-b border-[#1E2738] px-6 md:px-10 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Page Title */}
      <div>
        <h2 className="text-md font-bold text-slate-100 tracking-tight">{getPageTitle()}</h2>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4.5">
        {/* Search Placeholder */}
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            disabled
            placeholder="Global search (coming soon)..."
            className="pl-9 pr-4 py-1.5 bg-[#131B27]/50 border border-[#1E2738] rounded-lg text-xs text-slate-400 placeholder-slate-600 outline-none w-56"
          />
        </div>

        {/* Alerts */}
        <button className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-white/[0.02] transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
        </button>

        {/* Divider */}
        <span className="w-px h-5 bg-[#1E2738]"></span>

        {/* User Card */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">
            {user?.name ? user.name.slice(0, 2) : "JS"}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-[12px] font-semibold text-slate-200 leading-none">{user?.name || "Job Seeker"}</p>
            <p className="text-[10px] text-slate-500 leading-none mt-1">Online</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

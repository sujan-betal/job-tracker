import { LogOut } from "lucide-react";
import NavItem             from "./NavItem";
import { useSidebar }      from "./useSidebar";
import { NAV_ITEMS }       from "./Sidebar.constants";
import type { SidebarProps } from "./Sidebar.types";

const Sidebar = ({
  userName     = "Aditya Kumar",
  userRole     = "Job Seeker",
  userInitials = "AK",
}: SidebarProps) => {
  const { isActive, handleNavClick } = useSidebar();

  return (
    <aside className="w-[230px] min-h-screen bg-[#0D1117] border-r border-[#1E2738] flex flex-col py-6 flex-shrink-0 sticky top-0">

      {/* ── Brand ── */}
      <div className="flex items-center gap-2.5 px-5 pb-6 border-b border-[#1E2738] mb-5">
        <span className="text-xl">⚡</span>
        <span className="text-lg font-bold text-slate-100 tracking-tight">
          Tracker
        </span>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 flex flex-col gap-1 px-3">
        <p className="text-[10px] font-bold text-slate-700 tracking-widest px-2.5 pb-2.5 uppercase">
          Main Menu
        </p>

        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isActive={isActive(item.path)}
            onClick={handleNavClick}
          />
        ))}
      </nav>

      {/* ── User Profile ── */}
      <div className="px-3">
        <div className="h-px bg-[#1E2738] mx-1 mb-4" />

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#131B27] border border-[#1E2738] cursor-pointer group">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
            {userInitials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] font-semibold text-slate-200 truncate">
              {userName}
            </p>
            <p className="text-[11px] text-slate-600">{userRole}</p>
          </div>

          {/* Logout icon */}
          <LogOut
            size={14}
            className="text-slate-600 group-hover:text-slate-400 transition-colors"
          />
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
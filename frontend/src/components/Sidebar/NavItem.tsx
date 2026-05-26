// src/components/Sidebar/NavItem.tsx

import type { NavItem as NavItemType } from "./Sidebar.types";

interface NavItemProps {
  item:    NavItemType;
  isActive: boolean;
  onClick: (path: string) => void;
}

const NavItem = ({ item, isActive, onClick }: NavItemProps) => {
  const Icon = item.icon;

  return (
    <div
      onClick={() => onClick(item.path)}
      className={`
        relative flex items-center gap-3 px-3 py-2.5
        rounded-lg cursor-pointer text-sm font-medium
        transition-all duration-150 select-none
        ${isActive
          ? "bg-purple-500/10 text-purple-400"
          : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-400"
        }
      `}
    >
      {/* Lucide Icon */}
      <Icon
        size={17}
        className={isActive ? "text-purple-400" : "text-slate-600"}
      />

      {/* Label */}
      <span className="flex-1">{item.label}</span>

      {/* Badge */}
      {item.badge && (
        <span className="text-[10px] font-bold bg-purple-500/15 text-purple-400 px-2 py-0.5 rounded-full">
          {item.badge}
        </span>
      )}

      {/* Active right bar */}
      {isActive && (
        <span className="absolute right-0 top-[20%] bottom-[20%] w-[3px] bg-purple-400 rounded-l-full" />
      )}
    </div>
  );
};

export default NavItem;
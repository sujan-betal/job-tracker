import type { LucideIcon } from "lucide-react";

export interface NavItem {
  icon:   LucideIcon;
  label:  string;
  path:   string;
  badge?: number;
}

export interface SidebarProps {
  userName?:     string;
  userRole?:     string;
  userInitials?: string;
}

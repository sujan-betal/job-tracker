// src/components/Sidebar/Sidebar.types.ts

import type { LucideIcon } from "lucide-react";

export interface NavItem {
  icon:   LucideIcon;   // lucide-react icon — company standard
  label:  string;
  path:   string;
  badge?: number;
}

export interface SidebarProps {
  userName?:     string;
  userRole?:     string;
  userInitials?: string;
}
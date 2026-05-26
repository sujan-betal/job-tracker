// src/components/Sidebar/Sidebar.constants.ts

import {
  LayoutDashboard,
  BriefcaseBusiness,
  CalendarCheck,
  Gift,
  Users,
  FolderOpen,
  Settings,
} from "lucide-react";

import type { NavItem } from "./Sidebar.types";

export const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard,  label: "Dashboard",    path: "/"             },
  { icon: BriefcaseBusiness,label: "Applications", path: "/applications", badge: 0},
  { icon: CalendarCheck,    label: "Interviews",   path: "/interviews",   badge: 0 },
  { icon: Gift,             label: "Offers",       path: "/offers"       },
  { icon: Users,            label: "Contacts",     path: "/contacts"     },
  { icon: FolderOpen,       label: "Documents",    path: "/documents"    },
  { icon: Settings,         label: "Settings",     path: "/settings"     },
];
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Award,
  Users,
  FolderOpen,
  Settings,
} from "lucide-react";
import type { NavItem } from "./Sidebar.types";

export const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard,  label: "Dashboard",    path: "/"             },
  // Applications are shown on the Dashboard recent section — remove separate page
  // { icon: Briefcase,        label: "Applications", path: "/applications" },
  { icon: Calendar,         label: "Interviews",   path: "/interviews"   },
  { icon: Award,            label: "Offers",       path: "/offers"       },
  { icon: Users,            label: "Contacts",     path: "/contacts"     },
  { icon: FolderOpen,       label: "Documents",    path: "/documents"    },
  { icon: Settings,         label: "Settings",     path: "/settings"     },
];

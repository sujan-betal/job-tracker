// src/components/Sidebar/useSidebar.ts

import { useNavigate, useLocation } from "react-router-dom";

export const useSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  const isActive       = (path: string): boolean => activePath === path;
  const handleNavClick = (path: string): void    => navigate(path);

  return {
    isActive,
    handleNavClick,
  };
};
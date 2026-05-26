import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

// Baad mein token check karega
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = true; // TODO: real auth check
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

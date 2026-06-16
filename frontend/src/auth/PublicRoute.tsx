import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center text-slate-200">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-medium text-slate-400">Verifying session...</p>
      </div>
    );
  }

  // If already logged in, redirect to dashboard/home
  return token ? <Navigate to="/" replace /> : <>{children}</>;
};

export default PublicRoute;

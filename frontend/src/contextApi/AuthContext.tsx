import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import JOBTRACKER_URLS from "../constants/urlConstants";
import { getCallParams, makeCall } from "../services/helper";

interface User {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      let storedToken = localStorage.getItem("token");
      let storedUser = localStorage.getItem("user");

      // Handle cases where token might be "undefined" or "null" as strings
      if (storedToken === "undefined" || storedToken === "null") {
        localStorage.removeItem("token");
        storedToken = null;
      }

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
          
          // Proactively fetch latest profile to verify token validity
          const params = getCallParams("GET", null, true, storedToken);
          const response = await makeCall(JOBTRACKER_URLS.PROFILE, params, false);
          
          if (response && response.success) {
            const freshUser = response.data;
            setUser(freshUser);
            localStorage.setItem("user", JSON.stringify(freshUser));
          } else {
            console.warn("Session invalid or expired, logging out");
            logout();
          }
        } catch (error) {
          console.error("Auth initialization failed", error);
          logout();
        }
      } else {
        // Ensure state is clean if no token
        setToken(null);
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

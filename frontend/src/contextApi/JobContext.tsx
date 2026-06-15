import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { JobService } from "../services/job.service";
import { useAuth } from "./AuthContext";

interface Stats {
  total_applied: number;
  in_progress: number;
  reviews: number;
  offers: number;
}

interface JobContextType {
  stats: Stats;
  refreshStats: () => Promise<void>;
  loading: boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [stats, setStats] = useState<Stats>({
    total_applied: 0,
    in_progress: 0,
    reviews: 0,
    offers: 0,
  });
  const [loading, setLoading] = useState(false);

  const refreshStats = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await JobService.getStats();
      if (response && response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      refreshStats();
    }
  }, [token, refreshStats]);

  return (
    <JobContext.Provider value={{ stats, refreshStats, loading }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};

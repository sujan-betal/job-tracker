import { getCallParams, makeCall } from "./helper";
import JOBTRACKER_URLS from "../constants/urlConstants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiCall = async (url: string, method: string = "GET", body: any = null) => {
  const token = localStorage.getItem("token");
  const params = getCallParams(method, body, true, token || undefined);
  console.log(`🌐 [apiCall] ${method} ${url}`, { body, hasToken: !!token });
  return await makeCall(url, params, false);
};

export interface JobApplication {
  id?: number;
  company: string;
  position: string;
  location?: string;
  salary?: string;
  status: "applied" | "in_progress" | "review" | "offer" | "rejected";
  appliedDate: string;
  jobUrl?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const JobService = {
  getAll: async () => {
    return await apiCall(JOBTRACKER_URLS.GET_ALL_APPLICATIONS, "GET");
  },

  getRecent: async () => {
    return await apiCall(JOBTRACKER_URLS.GET_RECENT, "GET");
  },

  getStats: async () => {
    return await apiCall(JOBTRACKER_URLS.GET_STATS, "GET");
  },

  create: async (data: Omit<JobApplication, "id">) => {
    // Attempting the most standard path first
    return await apiCall(JOBTRACKER_URLS.ADD_APPLICATION, "POST", data);
  },

  update: async (id: number | string, data: Partial<JobApplication>) => {
    return await apiCall(JOBTRACKER_URLS.UPDATE_APPLICATION(id), "PUT", data);
  },

  delete: async (id: number | string) => {
    return await apiCall(JOBTRACKER_URLS.DELETE_APPLICATION(id), "DELETE");
  },
};

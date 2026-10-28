import { getCallParams, makeCall } from "./helper";
import JOBTRACKER_URLS from "../constants/urlConstants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const demoApplications: JobApplication[] = [
  { id: 101, company: "Northstar Labs", position: "Frontend Engineer", location: "Remote", salary: "₹18–22 LPA", status: "in_progress", appliedDate: "2026-10-22", notes: "Technical interview scheduled" },
  { id: 102, company: "Brightside Studio", position: "Product Designer", location: "Bengaluru", salary: "₹16–20 LPA", status: "review", appliedDate: "2026-10-18", notes: "Portfolio shared with hiring team" },
  { id: 103, company: "Cloudline Systems", position: "Full Stack Developer", location: "Remote", salary: "₹20–26 LPA", status: "offer", appliedDate: "2026-10-11", notes: "Offer received" },
  { id: 104, company: "Mosaic Digital", position: "UI Engineer", location: "Pune", salary: "₹14–18 LPA", status: "applied", appliedDate: "2026-10-08", notes: "Follow up next week" },
  { id: 105, company: "Greenfield Tech", position: "React Developer", location: "Hyderabad", salary: "₹15–19 LPA", status: "rejected", appliedDate: "2026-10-02", notes: "Closed after first round" },
];

const isDemoMode = () => localStorage.getItem("demo_mode") === "true";
const demoStats = () => ({
  success: true,
  data: {
    total_applied: demoApplications.length,
    in_progress: demoApplications.filter((job) => job.status === "in_progress").length,
    reviews: demoApplications.filter((job) => job.status === "review").length,
    offers: demoApplications.filter((job) => job.status === "offer").length,
  },
});
const readOnlyDemo = () => Promise.reject(new Error("This is a read-only demo. Changes are not saved."));

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
    if (isDemoMode()) return { success: true, data: demoApplications };
    return await apiCall(JOBTRACKER_URLS.GET_ALL_APPLICATIONS, "GET");
  },

  getRecent: async () => {
    if (isDemoMode()) return { success: true, data: demoApplications.slice(0, 4) };
    return await apiCall(JOBTRACKER_URLS.GET_RECENT, "GET");
  },

  getStats: async () => {
    if (isDemoMode()) return demoStats();
    return await apiCall(JOBTRACKER_URLS.GET_STATS, "GET");
  },

  create: async (data: Omit<JobApplication, "id">) => {
    if (isDemoMode()) return readOnlyDemo();
    // Attempting the most standard path first
    return await apiCall(JOBTRACKER_URLS.ADD_APPLICATION, "POST", data);
  },

  update: async (id: number | string, data: Partial<JobApplication>) => {
    if (isDemoMode()) return readOnlyDemo();
    return await apiCall(JOBTRACKER_URLS.UPDATE_APPLICATION(id), "PUT", data);
  },

  delete: async (id: number | string) => {
    if (isDemoMode()) return readOnlyDemo();
    return await apiCall(JOBTRACKER_URLS.DELETE_APPLICATION(id), "DELETE");
  },
};

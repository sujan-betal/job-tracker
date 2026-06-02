import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
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
    const response = await axios.get(`${API_BASE_URL}/applications`, getHeaders());
    return response.data;
  },

  getRecent: async () => {
    const response = await axios.get(`${API_BASE_URL}/applications/recent`, getHeaders());
    return response.data;
  },

  getStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/applications/stats`, getHeaders());
    return response.data;
  },

  create: async (data: Omit<JobApplication, "id">) => {
    const response = await axios.post(`${API_BASE_URL}/applications`, data, getHeaders());
    return response.data;
  },

  update: async (id: number, data: Partial<JobApplication>) => {
    const response = await axios.put(`${API_BASE_URL}/applications/${id}`, data, getHeaders());
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/applications/${id}`, getHeaders());
    return response.data;
  },
};

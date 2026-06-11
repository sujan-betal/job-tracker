import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/user/register`, { name, email, password });
    return response.data;
  },

  getProfile: async (token: string) => {
    const response = await axios.get(`${API_BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: () => localStorage.getItem("token"),
};

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const JOBTRACKER_URLS = {
  // User
  REGISTER: `${baseUrl}/user/register`,
  LOGIN:    `${baseUrl}/user/login`,
};

export default JOBTRACKER_URLS;
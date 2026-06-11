const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const JOBTRACKER_URLS = {
  // Auth & User
  REGISTER: `${baseUrl}/user/register`,
  LOGIN:    `${baseUrl}/user/login`,
  PROFILE:  `${baseUrl}/user/profile`,
  
  // Applications (General)
  GET_ALL_APPLICATIONS: `${baseUrl}/applications`,
  GET_STATS:            `${baseUrl}/applications/stats`,
  GET_RECENT:           `${baseUrl}/applications/recent`,
  
  // Applications (Specific Actions)
  ADD_APPLICATION:    `${baseUrl}/applications/add`,
  UPDATE_APPLICATION: (id: string | number) => `${baseUrl}/applications/${id}`,
  DELETE_APPLICATION: (id: string | number) => `${baseUrl}/applications/${id}`,

  // Legacy/Alternative Mounts (Ensuring compatibility)
  ADD_APP_ALT: `${baseUrl}/user/add`,
};

export default JOBTRACKER_URLS;
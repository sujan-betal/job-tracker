const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const JOBTRACKER_URLS = {
  // Auth & User
  REGISTER: `${baseUrl}/user/register`,
  LOGIN:    `${baseUrl}/user/login`,
  PROFILE:  `${baseUrl}/user/profile`,
  UPLOAD_PROFILE_IMAGE: `${baseUrl}/user/profile-image`,
  
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

  // Documents
  UPLOAD_DOCUMENT: `${baseUrl}/document/upload`,
  GET_DOCUMENTS:   `${baseUrl}/documents`,

  // Contacts
  GET_CONTACTS: `${baseUrl}/contacts`,
  ADD_CONTACT:  `${baseUrl}/contacts`,
  DELETE_CONTACT: (id: string | number) => `${baseUrl}/contacts/${id}`,
};

export default JOBTRACKER_URLS;
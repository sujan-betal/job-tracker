const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const JOBTRACKER_URLS = {
  // Auth & User
  REGISTER: `${baseUrl}/user/register`,
  LOGIN:    `${baseUrl}/user/login`,
  PROFILE:  `${baseUrl}/user/profile`,
  UPLOAD_PROFILE_IMAGE: `${baseUrl}/user/profile/image`,

  // Applications (General)
  GET_ALL_APPLICATIONS: `${baseUrl}/user/applications`,
  GET_STATS:            `${baseUrl}/user/applications/stats`,
  GET_RECENT:           `${baseUrl}/user/applications/recent`,

  // Applications (Specific Actions)
  ADD_APPLICATION:    `${baseUrl}/user/applications/add`,
  UPDATE_APPLICATION: (id: string | number) => `${baseUrl}/user/applications/${id}`,
  DELETE_APPLICATION: (id: string | number) => `${baseUrl}/user/applications/${id}`,

  // Legacy/Alternative Mounts (Ensuring compatibility)
  ADD_APP_ALT: `${baseUrl}/user/add`,

  // Documents
  UPLOAD_DOCUMENT: `${baseUrl}/user/document/upload`,
  GET_DOCUMENTS:   `${baseUrl}/user/documents`,

  // Contacts
  GET_CONTACTS: `${baseUrl}/user/contacts`,
  ADD_CONTACT:  `${baseUrl}/user/contacts`,
  UPDATE_CONTACT: (id: string | number) => `${baseUrl}/user/contacts/${id}`,
  DELETE_CONTACT: (id: string | number) => `${baseUrl}/user/contacts/${id}`,
};

export default JOBTRACKER_URLS;
// Auth related API calls yahan hongi

export const AuthService = {
  login: async (email: string, password: string) => {
    // TODO: real API call
    console.log("Login:", email, password);
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  getToken: () => localStorage.getItem("token"),
};

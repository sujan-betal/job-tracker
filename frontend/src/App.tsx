import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contextApi/AuthContext";
import { JobProvider } from "./contextApi/JobContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <JobProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </JobProvider>
    </AuthProvider>
  );
};

export default App;

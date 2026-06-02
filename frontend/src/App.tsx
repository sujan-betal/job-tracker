import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contextApi/AuthContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

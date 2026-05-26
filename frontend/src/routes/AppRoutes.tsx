import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/applications" element={<div>Applications</div>} />
      <Route path="/interviews" element={<div>Interviews</div>} />
      <Route path="/offers" element={<div>Offers</div>} />
      <Route path="/contacts" element={<div>Contacts</div>} />
      <Route path="/documents" element={<div>Documents</div>} />
      <Route path="/settings" element={<div>Settings</div>} />
    </Routes>
  );
};

export default AppRoutes;

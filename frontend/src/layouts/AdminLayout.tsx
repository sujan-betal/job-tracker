import { ReactNode } from "react";
import Sidebar from "../components/Sidebar/index"

interface AdminLayoutProps {
  children: ReactNode;
}

// Baad mein yahan Sidebar aur Header add hoga
const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      {/* Sidebar yahan aayega */}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

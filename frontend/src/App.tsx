import { BrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AdminLayout>
        <AppRoutes />
      </AdminLayout>
    </BrowserRouter>
  );
};

export default App;

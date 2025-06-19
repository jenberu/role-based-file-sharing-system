import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPge from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import Login from "./pages/auth/Login";
import DashboardLayout from "./pages/DashboardLayout";
import DashBoard from "./components/layout/dashboard";
import ManageUser from "./pages/auth/manageUser";
import ManageFile from "./pages/files/manageFiles";
import ChangePassword from "./components/auth/changePassword";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPge />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/admin/manage_employees" element={<ManageUser />} />
            <Route path="/dashboard/manage_files" element={<ManageFile />} />
            <Route path="/user/change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

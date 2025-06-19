import Sidebar from "../components/layout/sidebar";
import { useLocalStorage } from "../hooks/useLocalStirage";
import Navbar from "../components/layout/dashboeardNavbar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { getItem } = useLocalStorage("currUser");
  const user = getItem();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar role={user?.role} />
        <main className="flex-1 ml-64 p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

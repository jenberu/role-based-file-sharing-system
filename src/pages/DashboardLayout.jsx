import Sidebar from "../components/layout/sidebar";
import { useLocalStorage } from "../hooks/useLocalStirage";
import Navbar from "../components/layout/dashboeardNavbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { getItem } = useLocalStorage("currUser");
  const user = getItem();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 pt-16"> {/* Add pt-16 to account for fixed navbar */}
        {/* Fixed Sidebar - width controlled by Sidebar component */}
        <Sidebar role={user?.role} />
        
        {/* Main content with left margin matching sidebar width */}
        <main className="flex-1 ml-64 p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

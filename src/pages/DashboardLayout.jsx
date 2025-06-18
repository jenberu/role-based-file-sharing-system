import Sidebar from "../components/layout/sidebar";
import { useLocalStorage } from "../hooks/useLocalStirage";
import Navbar from "../components/layout/dashboeardNavbar";
const DashboardLayout = ({ children }) => {
  const { getItem } = useLocalStorage("currUser");
  const user = getItem();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar role={user?.role} />
        <main className="ml-64 p-6 w-full bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

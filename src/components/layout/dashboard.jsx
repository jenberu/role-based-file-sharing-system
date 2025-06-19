import { useLocalStorage } from "../../hooks/useLocalStirage";
import AdminDashboard from "./adminDashboard";
import EmployeeDashboard from "./employeDashboard";
const Dashboard = () => {
  const { getItem } = useLocalStorage("currUser");
  const user = getItem();
  const role = user?.role || "USER"; 

  return (
    <div className="p-6 ml-64">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username}</h1>

      {role === "ADMIN" && <AdminDashboard />}
      {role !== "ADMIN" && <EmployeeDashboard />}
    </div>
  );
};

export default Dashboard;

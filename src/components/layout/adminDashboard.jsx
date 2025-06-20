import Card from "../ui/card";
import { useGetTotalUsersQuery } from "../../api/auth";
import { useGetTotalDocumentsQuery } from "../../api/fileApi";

const AdminDashboard = () => {
  const { data: userData, isLoading: usersLoading } = useGetTotalUsersQuery();
  const { data: docData, isLoading: docsLoading } = useGetTotalDocumentsQuery();

  return (
    <div className="space-y-4">
      <Card
        title="Total Users"
        count={usersLoading ? "..." : userData?.total || 0}
        link="/admin/manage_employees"
      />
      <Card
        title="Uploaded Documents"
        count={docsLoading ? "..." : docData?.total || 0}
        link='/dashboard/manage_files'
      />
      <Card title="Pending Access Requests" count={6} />
      <Card title="System Logs" link="/admin/logs" />
    </div>
  );
};

export default AdminDashboard;

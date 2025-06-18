import Card from '../ui/card';
const AdminDashboard = () => (
  <div className="space-y-4">
    <Card title="Total Users" count={123} />
    <Card title="Uploaded Documents" count={57} />
    <Card title="Pending Access Requests" count={6} />
    <Card title="System Logs" link="/admin/logs" />
  </div>
);
export default AdminDashboard;
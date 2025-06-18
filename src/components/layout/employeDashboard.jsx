import Card from '../ui/card';
const EmployeeDashboard = () => (
  <div className="space-y-4">
    <Card title="My Files" count={10} link="/documents" />
    <Card title="Pending Approvals" count={1} />
    <Card title="Recent Notifications" link="/notifications" />
  </div>
);
export default EmployeeDashboard;

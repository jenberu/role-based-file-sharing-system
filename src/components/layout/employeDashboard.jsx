import Card from "../ui/card";
const EmployeeDashboard = () => (
  <div className="space-y-4">
    <Card title=" Files in Your Department" count={10}
      link="/dashboard/manage_files" />
    <Card title="Pending Approvals" count={1} />
    <Card title="Recent Notifications" link="/notifications" />
  </div>
);
export default EmployeeDashboard;

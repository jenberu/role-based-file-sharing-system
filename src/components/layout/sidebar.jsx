import { Link, useLocation ,useNavigate} from "react-router-dom";
import { FiHome, FiUsers, FiFileText, FiLogOut, FiBell } from "react-icons/fi";
import { useLocalStorage } from "../../hooks/useLocalStirage";
import { useState, useEffect } from "react";
import NotificationModal from "../modals/notifications";
import { toast } from "react-toastify";

const Sidebar = ({ role }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { removeItem } = useLocalStorage("currUser");
  const [open, setOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notificationList, setNotificationList] = useState([]);
  const handleLogout = () => {
    removeItem();
    navigate("/login", { replace: true });
  };
  const handleNotificationClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchNotifications = async () => {
    try {
      // Replace with real API call
      setNotificationList([]);
      setUnreadNotifications(0);
    } catch (err) {
      toast.error("something went wrong while fetching notifications");
    }
  };

  const markNotificationsAsRead = () => {
    setUnreadNotifications(0);
    setOpen(false);
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] top-16 w-64 bg-blue-900 text-white flex flex-col justify-between fixed z-10">
      <div className="space-y-4 p-6">
        <nav className="flex flex-col space-y-2">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-2 p-2 rounded ${
              pathname == "/dashboard" ? "bg-yellow-600" : "hover:bg-yellow-600"
            }`}
          >
            <FiHome size={24} />
            <span className="text-xl">Dashboard</span>
          </Link>

          <Link
            to="/dashboard/manage_files"
            className={`flex items-center space-x-2 p-2 rounded  ${
              pathname == "/dashboard/manage_files" ? "bg-yellow-600" : "hover:bg-yellow-600"
            }`}
          >
            <FiFileText size={24} />
            <span className="text-xl">Documents</span>
          </Link>

          {(role === "ADMIN" || role === "HR") && (
            <div className={`flex items-center justify-between ${
                  pathname === "/admin/manage_employees"
                    ? "bg-yellow-600"
                    : "hover:bg-yellow-600"
                }`}>
              <Link
                to="/admin/manage_employees"
                className={`flex items-center space-x-2 p-2 rounded `}
              >
                <FiUsers size={24} />
                <span className="text-xl">Employees</span>
              </Link>

              <Link
                to="/admin/add_employee"
                className="ml-4 text-sm  text-white px-2 py-1 rounded"
              >
                + Add
              </Link>
            </div>
          )}
        </nav>
      </div>

      <div className="p-6 border-t border-blue-700">
        <Link
          to="/notifications"
          className={`flex items-center justify-between p-2 rounded  ${
            pathname == "/notifications"
              ? "bg-yellow-600"
              : "hover:bg-yellow-600"
          }`}
        >
          <div className="flex items-center space-x-2">
            <FiBell size={24} />
            <span className="text-xl">Notifications</span>
          </div>
          {notificationList.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {notificationList.length}
            </span>
          )}
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 hover:bg-yellow-700 p-2 rounded w-full"
        >
          <FiLogOut size={24} />
          <span className="text-xl">Logout</span>
        </button>
      </div>
      <NotificationModal
        open={open}
        handleClose={handleClose}
        notificationList={notificationList}
        markAsRead={markNotificationsAsRead}
      />
    </div>
  );
};

export default Sidebar;

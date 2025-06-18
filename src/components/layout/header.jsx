// src/components/Header.jsx
import { Link } from "react-router-dom";
import TeamWorkLogo from "../../assets/teamwork_logo.jpg";

const Header = () => {
  return (
<header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="px-4">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
<img
  src={TeamWorkLogo}
  alt="TeamWork Company"
  className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-md"
/>
            <span className="ml-3 text-xl font-bold text-gray-900 hidden md:inline">
              TeamWork Software Company
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Employee Login
            </Link>
            <Link
              to="/help"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

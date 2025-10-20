/* eslint-disable no-unused-vars */
// src/components/Header.jsx
import { useNavigate } from "react-router-dom";
import TeamWorkLogo from "../../assets/teamwork_logo.jpg";
import { useLazyGetMeQuery } from "../../api/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [triggerGetMe] = useLazyGetMeQuery();

  const handleEmployeeLogin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await triggerGetMe().unwrap(); // Calls /me/ endpoint
      navigate("/dashboard"); // Token valid
    } catch (error) {
      navigate("/login"); // Invalid or expired token
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="px-4">
        <div className="flex justify-between h-20 items-center">
          <Link to='/'>
            <div className="flex items-center">
              <img
                src={TeamWorkLogo}
                alt="TeamWork Company"
                className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              <span className="ml-3 text-xl font-bold text-gray-900 hidden md:inline">
                TeamWork IT Solution
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleEmployeeLogin}
              className="px-4 py-2 text-2xl font-medium cursor-pointer text-blue-600 hover:text-blue-800"
            >
              Login
            </button>
            <a
              href="https://my-portfolio-8cmi.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2  text-blue-600 text-2xl font-medium  hover:text-gray-800"
            >
              about developer
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

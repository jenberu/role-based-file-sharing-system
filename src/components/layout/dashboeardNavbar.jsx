import { Link, useNavigate } from "react-router-dom";
import { FiBell,FiMaximize, FiSun, FiMoon } from "react-icons/fi";
import { useLocalStorage } from "../../hooks/useLocalStirage";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/themeSlice";

const Navbar = () => {
  const { getItem, removeItem } = useLocalStorage("currUser");
  const user = getItem(); // Assumes user object contains { username }
  const navigate = useNavigate();

 
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeItem();
    navigate("/login");
  };
  const handleThemeToggle = () => dispatch(toggleTheme());
  return (
    <div className="w-full h-16 top-0 left-0 bg-blue-900 text-white px-6 py-3 flex items-center justify-between shadow-md fixed">
      <div>
        <Link to="/dashboard" className="text-xl font-bold text-white">
          TeamWork Docs
        </Link>
      </div>

      <div className="flex items-center gap-5 text-sm">
        <span>
          WELCOME, <span className="font-semibold">{user?.username?.toUpperCase()}</span>
        </span>
        <Link to="/" className="hover:underline text-white">VIEW SITE</Link>
        <Link to="/change-password" className="hover:underline text-white">CHANGE PASSWORD</Link>
        <button onClick={handleLogout} className="hover:underline text-white">LOG OUT</button>

        <button onClick={handleThemeToggle}>
          {theme === "light" ? <FiMoon className="text-lg" /> : <FiSun className="text-lg" />}
        </button>

        <FiMaximize className="text-lg cursor-pointer" />

   
      </div>

     
    </div>
  );
};

export default Navbar;

// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import TeamWorkLogo from '../../assets/teamwork_logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-gray-800 pt-8 w-full">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img src={TeamWorkLogo} alt="TeamWork Company" className="h-10" />
            <p className="text-gray-400 text-base">
              Internal document sharing platform for TeamWork Company employees.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Resources
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/help" className="text-base text-gray-400 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/policies" className="text-base text-gray-400 hover:text-white">
                      Document Policies
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-xl font-semibold text-gray-300 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/" className="text-base text-gray-400 hover:text-white">
                      IT Support
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:documents@teamwork.com" className="text-base text-gray-400 hover:text-white">
                      Document Team
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pb-4 border-t border-gray-700 pt-8">
          <p className="text-xl text-gray-400 text-center">
            &copy; {new Date().getFullYear()} TeamWork Company. For internal use only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

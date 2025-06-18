// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 py-20 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-600">404</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center px-5 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow"
            >
              <FiArrowLeft className="mr-2" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

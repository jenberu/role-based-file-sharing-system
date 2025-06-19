// src/pages/TeamWorkLanding.jsx
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { FEATURES, POLICIES, FEATURES_ICON } from "../utils/landingConstants";
import { motion } from "framer-motion";
import HeroImage from "../assets/hero_image_1.jpg";

const LandingPge = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white pt-20">
      <Header />

      {/* Hero Section */}
      <div
        className="mx-8 px-6  sm:px-6 lg:px-8 py-16"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              TeamWork <span className="text-blue-600">Document Hub</span>
            </h1>
            <p className="mt-3 text-xl text-gray-600 sm:mt-5 sm:text-xl max-w-md md:max-w-lg">
              Secure internal document sharing for TeamWork Company employees
            </p>
            <div className="mt-10 flex justify-center md:justify-start space-x-4">
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl text-base font-medium shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Access Documents <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/help"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                How To Use
              </Link>
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex justify-center md:justify-end"
          >
            <img
              src={HeroImage}
              alt="TeamWork illustration"
              className="w-full h-full max-w-full rounded-[30%] shadow-lg object-cover "
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your secure document workspace
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
              Designed exclusively for TeamWork Company employees
            </p>
          </div>

          <div className="mt-12 grid  gap-8 md:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                {" "}
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#52be80] text-white mx-auto">
                      {<feature.icon />}
                    </div>
                    <h3 className="mt-8 text-[24px] font-medium text-gray-900 text-center">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-[20px] text-gray-500 text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Policy Section */}
      <div className="py-12 text-gray-900 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              TeamWork Document Policies
            </h2>
            <p className="mt-4 max-w-2xl text-xl mx-auto">
              Please review our document handling guidelines
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {POLICIES.map((policy, index) => (
                <motion.div
                  key={index}
                  className="pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  
                  <div className="flow-root  bg-white rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-100 text-blue-600 mx-auto">
                        <FEATURES_ICON className="h-6 w-6" />
                      </div>
                      <p className="mt-8 text-[20px] font-medium text-center">
                        {policy}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPge;

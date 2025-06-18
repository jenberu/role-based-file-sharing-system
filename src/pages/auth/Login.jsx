// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add actual login logic here
    console.log("Logging in with", formData);
    navigate("/dashboard"); // example redirection
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-blue-200">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-blue-700">
            Welcome to <span className="text-gray-800">TeamWork Docs</span>
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            Please log in to access internal documents
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center items-center py-3 px-6 border border-transparent text-white text-base font-medium rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md transition"
            >
              <FiLogIn className="mr-2" /> Login
            </button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-500 mt-4">
          Forgot password?{" "}
          <a href="/reset-password" className="text-blue-600 hover:underline">
            Reset it here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

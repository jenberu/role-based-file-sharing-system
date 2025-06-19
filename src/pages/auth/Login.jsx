import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import { useLoginMutation } from "../../api/auth";
import { useLocalStorage } from "../../hooks/useLocalStirage"; // adjust path if needed
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { setItem: setCurrentUser } = useLocalStorage("currUser");

  const [error, setError] = useState("");

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(values).unwrap();
      setCurrentUser(response.user);
      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      const message =
        err?.data?.detail || "Invalid username or password. Please try again.";
      toast.error(message);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-blue-200">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-blue-700">
              Welcome to <span className="text-gray-800">TeamWork Docs</span>
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Please log in to access internal documents
            </p>
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center font-medium">
              {error}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-gray-700">
                      Username
                    </label>
                    <Field
                      name="username"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-gray-700">
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className={`w-full flex items-center justify-center cursor-pointer py-3 px-6 rounded-xl text-white font-medium transition shadow-md
    ${
      isSubmitting || isLoading
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
                  >
                    <FiLogIn className="mr-2" />
                    {isLoading ? "Logging in..." : "Log In"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="text-sm text-center text-gray-500 mt-4">
            Forgot password?{" "}
            <a href="/reset-password" className="text-blue-600 hover:underline">
              Reset it here
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

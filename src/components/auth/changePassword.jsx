import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useChangePasswordMutation } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();
  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    old_password: Yup.string().required("Old password is required"),
    new_password: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .required("New password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm your new password"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await changePassword({
        old_password: values.old_password,
        new_password: values.new_password,
      }).unwrap();

      toast.success("Password changed successfully!");
      resetForm();
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err?.data?.detail || err?.data?.message || "Failed to change password";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Old Password</label>
              <Field
                type="password"
                name="old_password"
                className="w-full border border-amber-300 px-3 py-2 rounded"
              />
              <ErrorMessage
                name="old_password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">New Password</label>
              <Field
                type="password"
                name="new_password"
                className="w-full border border-amber-300 px-3 py-2 rounded"
              />
              <ErrorMessage
                name="new_password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Confirm New Password
              </label>
              <Field
                type="password"
                name="confirm_password"
                className="w-full border px-3 border-amber-300  py-2 rounded"
              />
              <ErrorMessage
                name="confirm_password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={` ${
                isLoading && "cursor-not-allowed"
              } w-full bg-blue-600 text-white py-2 cursor-pointer rounded hover:bg-blue-700 disabled:opacity-50`}
            >
              {isLoading ? "Changing..." : "Change Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;

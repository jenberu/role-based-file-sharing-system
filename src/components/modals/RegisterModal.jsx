// src/components/auth/RegisterModal.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../api/auth";
import { useGetDepartmentsQuery } from "../../api/departmentApi";
import { CircularProgress } from "@mui/material";

export default function RegisterModal({ onClose }) {
  const [register, { isLoading }] = useRegisterMutation();
  const { data: departments = [], isLoading: deptLoading } =
    useGetDepartmentsQuery();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    role: "",
    department: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password2: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    first_name: Yup.string()
      .matches(/^[A-Za-z\s-]*$/, "Only letters allowed")
      .nullable(),
    last_name: Yup.string()
      .matches(/^[A-Za-z\s-]*$/, "Only letters allowed")
      .nullable(),
    role: Yup.string().required("Role is required"),
    department: Yup.string().required("Department is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await register(values).unwrap();
      toast.success("🎉 Registration successful!");
      onClose();
    } catch (err) {
      if (err.data) {
        Object.entries(err.data).forEach(([key, message]) => {
          toast.error(
            `${key}: ${Array.isArray(message) ? message.join(" ") : message}`
          );
        });
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setSubmitting(false);
    }
  };
  if (deptLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-opacity-40 z-50 flex justify-center bg-black/50 items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] relative">
        <button
          onClick={onClose}
          className="absolute top-0 cursor-pointer right-4 text-[34px] text-red-600"
          title="close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {" "}
          Empolyee Register
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                {["username", "email", "first_name", "last_name"].map(
                  (field) => (
                    <div key={field}>
                      <label className="block font-medium capitalize">
                        {field.replace("_", " ")}
                      </label>
                      <Field
                        type="text"
                        name={field}
                        className="w-full border border-amber-200  rounded px-3 py-2"
                      />
                      <ErrorMessage
                        name={field}
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  )
                )}
                <div>
                  <label className="block font-medium">Role</label>
                  <Field
                    as="select"
                    name="role"
                    className="w-full border border-amber-200  rounded px-3 py-2 bg-white"
                  >
                    <option value="">Select Role</option>
                    {["ADMIN", "HR", "EMPLOYEE"].map((role) => (
                      <option key={role} value={role}>
                        {role || "N/A"}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                {/* Department Dropdown */}
                <div>
                  <label className="block font-medium">Department</label>
                  <Field
                    as="select"
                    name="department"
                    className="w-full border border-amber-200 rounded px-3 py-2 bg-white"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept?.id} value={dept?.id}>
                        {dept?.name || "N/A"}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="department"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-medium">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full border border-amber-200  rounded px-3 py-2"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-medium">Confirm Password</label>
                  <Field
                    type="password"
                    name="password2"
                    className="w-full border border-amber-200  rounded px-3 py-2"
                  />
                  <ErrorMessage
                    name="password2"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                {isSubmitting || isLoading ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUploadDocumentMutation } from "../../api/fileApi";
import { useGetDepartmentsQuery } from "../../api/departmentApi";
import { useLocalStorage } from "../../hooks/useLocalStirage";
import { toast } from "react-toastify";
import { FILE_CATEGORY } from "../../utils/constant";

const UploadFileModal = ({ onClose }) => {
  const { getItem: getCurrentUser } = useLocalStorage("currUser");
  const isAdmin = getCurrentUser()?.role === "ADMIN";
  console.log("isAdmin:", isAdmin);
  const { data: departments = [] } = useGetDepartmentsQuery();
  const [uploadDocs, { isLoading }] = useUploadDocumentMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "report",
      file: null,
      department: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
      file: Yup.mixed().required("Required"),
      ...(isAdmin && {
        department: Yup.string().required("Required"),
      }),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("file", values.file);
      if (isAdmin) {
        formData.append("department", values.department);
      }

      try {
        await uploadDocs(formData).unwrap();
        toast.success("Document uploaded successfully!");
        resetForm();
        onClose();
      } catch (err) {
        const errorMessage =
          err?.data?.error || "Failed to upload document. Please try again.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Upload File</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-sm hover:underline"
            title="close"
          >
            ✖
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-full mt-1 p-2 border rounded"
            />
            {formik.errors.name && (
              <p className="text-red-500 text-xs">{formik.errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="w-full mt-1 p-2 border rounded"
            />
            {formik.errors.description && (
              <p className="text-red-500 text-xs">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              className="w-full mt-1 p-2 border rounded"
            >
              {FILE_CATEGORY.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {isAdmin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                onChange={formik.handleChange}
                value={formik.values.department}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {formik.errors.department && (
                <p className="text-red-500 text-xs">
                  {formik.errors.department}
                </p>
              )}
            </div>
          )}

          <div className="mb-4 cursor-pointer">
            <label className="block text-sm font-medium text-gray-700">
              File
            </label>
            <input
              type="file"
              name="file"
              onChange={(event) =>
                formik.setFieldValue("file", event.currentTarget.files[0])
              }
              className="w-full mt-1"
            />
            {formik.errors.file && (
              <p className="text-red-500 text-xs">{formik.errors.file}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {isLoading ? "Uploading..." : "Upload File"}
          </button>
        </form>
      </div>
    </div>
  );
};

UploadFileModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UploadFileModal;

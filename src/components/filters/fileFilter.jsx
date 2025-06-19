import { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FILE_CATEGORY, FILTER_DATE} from "../../utils/constant";
import { useLocalStorage } from "../../hooks/useLocalStirage";
import { useGetDepartmentsQuery } from "../../api/departmentApi";
import { CircularProgress } from "@mui/material";

const FileFilter = ({ onFilter }) => {
  const { getItem: gteCurrentUser } = useLocalStorage("currUser");
  const { data: departments = [], isLoading: deptLoading } =
    useGetDepartmentsQuery();
  const currentUser = gteCurrentUser();
  const [filters, setFilters] = useState({
    category: "All",
    uploadedDate: "Any date",
    department: "All",
  });
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isUploadDateOpen, setIsUploadDateOpen] = useState(false);
  const handleCategoryFilter = (category) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    onFilter(newFilters);
    setIsCatOpen(false);
  };
  const handleUploadedDateFilter = (date) => {
    const newFilters = { ...filters, uploadedDate: date };
    setFilters(newFilters);
    onFilter(newFilters);
    setIsUploadDateOpen(false);
  };
  const handleDepartmentFilter = (department) => {
    const newFilters = { ...filters, department };
    setFilters(newFilters);
    onFilter(newFilters);
  };
  const clearFilters = () => {
    const newFilters = {
      category: "All",
      uploadedDate: "Any date",
      department: "All",
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };
  if (deptLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-4 shadow-md w-full">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-white text-lg font-semibold px-2 py-1 bg-teal-700 rounded w-fit">
          FILTER
        </span>
        <button
          onClick={clearFilters}
          className="text-red-500 text-sm hover:underline w-fit  cursor-pointer"
        >
          ✖ Clear all filters
        </button>
      </div>

      {/* Department Dropdown */}
      {currentUser?.role === "ADMIN" && (
        <div className="mb-4">
          <h3 className="text-base font-semibold text-gray-700 dark:text-white mb-2">
            By Department
          </h3>
          <select
            value={filters.department}
            onChange={(e) => handleDepartmentFilter(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="All">All</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4 relative">
        <h3 className="text-base font-semibold text-gray-700 dark:text-white mb-2">
          By category
        </h3>
        <button
          onClick={() => setIsCatOpen(!isCatOpen)}
          className="w-full flex  cursor-pointer justify-between items-center px-3 py-2 rounded border border-gray-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <span>{filters.category}</span>
          {isCatOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {isCatOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-md max-h-60 overflow-auto">
            {FILE_CATEGORY.map((category) => (
              <button
                key={category}
                className={`w-full text-left px-3 py-2  cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-600 ${
                  filters.category === category
                    ? "bg-yellow-500 text-white font-medium"
                    : "text-gray-800 dark:text-white"
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Dropdown */}
      <div className="relative">
        <h3 className="text-base font-semibold text-gray-700 dark:text-white mb-2">
          By Date
        </h3>

        <button
          onClick={() => setIsUploadDateOpen(!isUploadDateOpen)}
          className="w-full flex justify-between  cursor-pointer items-center px-3 py-2 rounded border border-gray-100 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <span>{filters.uploadedDate}</span>
          {isUploadDateOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {isUploadDateOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-md max-h-60 overflow-auto">
            {FILTER_DATE.map((date) => (
              <button
                key={date}
                className={`w-full text-left px-3 py-2  cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-600 ${
                  filters.uploadedDate === date
                    ? "bg-yellow-500 text-white font-medium"
                    : "text-gray-800 dark:text-white"
                }`}
                onClick={() => handleUploadedDateFilter(date)}
              >
                {date}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

FileFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FileFilter;

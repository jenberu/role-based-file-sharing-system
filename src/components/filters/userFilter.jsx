import { useState } from "react";
import PropTypes from "prop-types";
import {FILTER_DATE} from "../../utils/constant";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useGetDepartmentsQuery } from "../../api/departmentApi";
import { CircularProgress } from "@mui/material";

const UserFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    department: "All",
    createdDate: "Any date",
  });
    const { data: departments = [], isLoading: deptLoading } =
      useGetDepartmentsQuery();
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const handleDepartmentFilter = (department) => {
    const newFilters = { ...filters, department };
    setFilters(newFilters);
    onFilter(newFilters);
    setIsDeptOpen(false);
  };
  const handleDateFilter = (date) => {
    const newFilters = { ...filters, createdDate: date };
    setFilters(newFilters);
    onFilter(newFilters);
    setIsDateOpen(false);
  };
  const clearFilters = () => {
    const newFilters = { department: "All", createdDate: "Any date" };
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
      <div className="mb-4 relative">
        <h3 className="text-base font-semibold text-gray-700 dark:text-white mb-2">
          By department
        </h3>
        <button
          onClick={() => setIsDeptOpen(!isDeptOpen)}
          className="w-full flex  cursor-pointer justify-between items-center px-3 py-2 rounded border border-gray-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <span>{filters.department}</span>
          {isDeptOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {isDeptOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-md max-h-60 overflow-auto">
            {departments.map((department) => (
              <button
                key={department.id}
                className={`w-full text-left px-3 py-2  cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-600 ${
                  filters.department === department.name
                    ? "bg-yellow-500 text-white font-medium"
                    : "text-gray-800 dark:text-white"
                }`}
                onClick={() => handleDepartmentFilter(department.name)}
              >
                {department.name || "N/A"}
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
          onClick={() => setIsDateOpen(!isDateOpen)}
          className="w-full flex justify-between  cursor-pointer items-center px-3 py-2 rounded border border-gray-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <span>{filters.createdDate}</span>
          {isDateOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {isDateOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-md max-h-60 overflow-auto">
            {FILTER_DATE.map((date) => (
              <button
                key={date}
                className={`w-full text-left px-3 py-2  cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-600 ${
                  filters.createdDate === date
                    ? "bg-yellow-500 text-white font-medium"
                    : "text-gray-800 dark:text-white"
                }`}
                onClick={() => handleDateFilter(date)}
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

UserFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default UserFilter;

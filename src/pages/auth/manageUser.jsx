import { useState, useEffect } from "react";
import UserTable from "../../components/tables/userTable";
import { formatDate } from "../../utils/format";
import UserFilter from "../../components/filters/userFilter";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../api/auth";
import { CircularProgress } from "@mui/material";
import RegisterModal from "../../components/modals/RegisterModal";
const ManageUser = () => {
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    if (users && users.length) {
      setFilteredUsers(users);
    }
  }, [users]);
  console.log("Users data:", users);
  const handleFilter = (filters) => {
    let filtered = users;

    // Filter by department
    if (filters.department && filters.department !== "All") {
      filtered = filtered.filter(
        (u) =>
          u.department?.name?.toLowerCase() === filters.department.toLowerCase()
      );
    }

    // Filter by join date
    if (filters.createdDate && filters.createdDate !== "Any date") {
      const today = new Date();
      let targetDate = new Date();
      switch (filters.createdDate) {
        case "Today":
          targetDate.setDate(today.getDate() - 1);

          break;
        case "Past 7 days":
          targetDate.setDate(today.getDate() - 7);
          break;
        case "This month":
          targetDate.setMonth(today.getMonth() - 1);
          break;
        case "This year":
          targetDate.setFullYear(today.getFullYear() - 1);

          break;
        default:
          targetDate = null;

          break;
      }

      if (targetDate) {
        filtered = filtered.filter(
          (user) => new Date(user.date_joined) >= targetDate
        );
      }
    }

    setFilteredUsers(filtered);
  };

  const handleUserClick = (id) => {
    navigate(`/admin/users/${id}/edit`);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setShowRegister(true);
  };

  const columns = [
    { label: "username", renderCell: (item) => item.username },
    {
      label: "First Name",
      renderCell: (item) => (
        <span
          onClick={() => handleUserClick(item.id)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {item.first_name}
        </span>
      ),
    },
    {
      label: "Last Name",
      renderCell: (item) => (
        <span className="text-blue-600 hover:underline cursor-pointer">
          {item.last_name}
        </span>
      ),
    },
    { label: "Role", renderCell: (item) => item.role },
    { label: "Email", renderCell: (item) => item.email },

    {
      label: "Department",
      renderCell: (item) => item.department?.name || "N/A",
    },
    {
      label: "Created At",
      renderCell: (item) => formatDate(item.date_joined),
    },
    {
      label: "Last Login",
      renderCell: (item) => formatDate(item.last_login),
    },
  ];
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }
  if (error)
    return (
      <div className="text-red-500 p-4">
        Error fetching users: {error.message || "Unknown error"}
      </div>
    );

  return (
    <>
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4 text-lg font-semibold">
        <h1>User Management</h1>
        <button
          onClick={handleAddUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          Add User <span className="text-xl ml-2">+</span>
        </button>
      </div>

      {/* Layout Container */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* User Table */}
        <div className="w-full lg:w-4/5">
          {!error && filteredUsers.length > 0 && !isLoading ? (
            <UserTable data={{ nodes: filteredUsers }} columns={columns} />
          ) : (
            <div className="p-4 text-gray-500">No users found</div>
          )}
        </div>

        {/* Filter */}
        <div className="w-full lg:w-1/5">
          <UserFilter onFilter={handleFilter} />
        </div>
      </div>
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
};

export default ManageUser;

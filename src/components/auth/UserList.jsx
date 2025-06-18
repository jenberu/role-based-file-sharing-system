import { useEffect, useState, useCallback } from "react";
import { getUsers } from "../../../services/api/userApi";
import UserTable from "../../components/tables/UserTable";
import { useSnackbar } from "../../../contexts/hooks";
import { formatDate } from "../../utils/format";
import UserFilter from "../../components/filters/UserFilter";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(false);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setError(false);
    try {
      const result = await getUsers();
      setUsers(result.data);
      setFilteredUsers(result.data);
    } catch (err) {
      setError(true);
      showSnackbar(err.message || "Error fetching users", "error");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleFilter = (filters) => {
    let filtered = users;
    if (filters.role && filters.role !== "All") {
      filtered = filtered.filter((u) => u.role === filters.role);
    }
    if (filters.status && filters.status !== "All") {
      filtered = filtered.filter((u) => u.status === filters.status);
    }
    setFilteredUsers(filtered);
  };

  const handleUserClick = (id) => {
    navigate(`/admin/users/${id}/edit`);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    navigate("/admin/users/add");
  };

  const columns = [
    { label: "ID", renderCell: (item) => item.id },
    {
      label: "Full Name",
      renderCell: (item) => (
        <span
          onClick={() => handleUserClick(item.id)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {item.first_name} {item.last_name}
        </span>
      ),
    },
    { label: "Email", renderCell: (item) => item.email },
    { label: "Role", renderCell: (item) => item.role },
    { label: "Department", renderCell: (item) => item.department?.name || "N/A" },
    {
      label: "Created At",
      renderCell: (item) => formatDate(item.created_at),
    },
    {
      label: "Updated At",
      renderCell: (item) => formatDate(item.updated_at),
    },
  ];

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
          {!error ? (
            <UserTable data={{ nodes: filteredUsers }} columns={columns} />
          ) : (
            <p className="text-red-500">Something went wrong. Please try again.</p>
          )}
        </div>

        {/* Filter */}
        <div className="w-full lg:w-1/5">
          <UserFilter onFilter={handleFilter} />
        </div>
      </div>
    </>
  );
};

export default UserList;

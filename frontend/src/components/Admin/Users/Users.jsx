import React, { useState, useEffect, useMemo } from "react";
import { useSelector,useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiUserCheck,
  FiUserX,
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { getAllUsers } from "../../../store/adminSlice";

// --- Enhanced Data for Demonstration ---
const usersData = [
  {
    id: "USER-001",
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    role: "Property Owner",
    status: "Active",
    joinDate: "2023-12-15",
    properties: 3,
    location: "Siliguri, West Bengal",
  },
  {
    id: "USER-002",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91 87654 32109",
    role: "Property Owner",
    status: "Active",
    joinDate: "2023-11-20",
    properties: 2,
    location: "Patna, Bihar",
  },
  {
    id: "USER-003",
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 76543 21098",
    role: "Property Seeker",
    status: "Inactive",
    joinDate: "2023-10-10",
    properties: 0,
    location: "Kolkata, West Bengal",
  },
  {
    id: "USER-004",
    name: "Sneha Gupta",
    email: "sneha.gupta@email.com",
    phone: "+91 65432 10987",
    role: "Property Owner",
    status: "Suspended",
    joinDate: "2023-09-05",
    properties: 1,
    location: "Mumbai, Maharashtra",
  },
  {
    id: "USER-005",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 54321 09876",
    role: "Admin",
    status: "Active",
    joinDate: "2023-08-15",
    properties: 0,
    location: "Delhi",
  },
  {
    id: "USER-006",
    name: "Anjali Mehta",
    email: "anjali.mehta@email.com",
    phone: "+91 43210 98765",
    role: "Property Seeker",
    status: "Active",
    joinDate: "2023-07-22",
    properties: 0,
    location: "Ahmedabad, Gujarat",
  },
  {
    id: "USER-007",
    name: "Sanjay Reddy",
    email: "sanjay.reddy@email.com",
    phone: "+91 32109 87654",
    role: "Property Owner",
    status: "Inactive",
    joinDate: "2023-06-30",
    properties: 5,
    location: "Hyderabad, Telangana",
  },
];

// --- Animation Variants ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
// };
// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1 },
// };

// --- Main Users Component ---
const Users = () => {
  const dispatch = useDispatch();
  // State for filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Redux state
  const { users, loading } = useSelector((state) => state.admin);
  console.log("Users from Redux:", users);
  // const [loading, setLoading] = useState(true);

  console.log("Users Component Rendered", users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
  console.log("Users from Redux after useeffects:", users);
}, [users]);



  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
      }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <FiUserCheck className="w-4 h-4" />;
      case 'Inactive': return <FiUser className="w-4 h-4" />;
      case 'Suspended': return <FiUserX className="w-4 h-4" />;
      default: return <FiUser className="w-4 h-4" />;
    }
  };
  const getRoleColor = (role) => {
    switch (role) {
      case 'Property Owner': return 'bg-blue-100 text-blue-800';
      case 'Property Seeker': return 'bg-purple-100 text-purple-800';
      case 'Admin': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
      }
  };

  // Memoized filtering logic
  const filteredUsers = useMemo(() => {
    return users && users?.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchLower === "" ||
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.id.toLowerCase().includes(searchLower);

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchTerm, roleFilter, statusFilter]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter, rowsPerPage]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // total user and active user 
  // const totalUsers = users.length;
  // const activeUsers = users.filter((user) => user.status === 'Active').length;
  const totalUsers = users?.length || 0;
const activeUsers = users?.filter(u => u.status)?.length || 0;

  return (
    <motion.div
      className="space-y-6"
      // variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        // variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">
            Manage all user accounts and permissions.
          </p>
        </div>
        {/* <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors w-full md:w-auto">
          Add New User
        </button> */}
      </motion.div>

      <motion.div
        // variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
             <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FiUser className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
             <p className="text-2xl font-bold text-gray-800">{activeUsers}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiUserCheck className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        {/* <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Property Owners</p>
              <p className="text-2xl font-bold text-gray-800">892</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FiShield className="text-purple-600 text-xl" />
            </div>
          </div>
        </div> */}
        {/* <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-2xl font-bold text-gray-800">23</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <FiUserX className="text-red-600 text-xl" />
            </div>
          </div>
        </div> */}
      </motion.div>

      <motion.div
        // variants={itemVariants}
        className="bg-white rounded-lg shadow-sm"
      >
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            User Accounts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2 focus:ring-pink-500 focus:border-pink-500"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Property Owner">Property Owner</option>
                <option value="Property Seeker">Property Seeker</option>
                <option value="Admin">Admin</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2 focus:ring-pink-500 focus:border-pink-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="w-full hidden lg:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Properties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {paginatedUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900 flex items-center">
                          <FiMail className="w-3 h-3 mr-1.5 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiPhone className="w-3 h-3 mr-1.5 text-gray-400" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {getStatusIcon(user.status)}
                        <span className="ml-1.5">{user.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 text-center">
                      {user.properties}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1">
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {/* Mobile Card List */}
          <div className="lg:hidden p-4 space-y-4">
            <AnimatePresence>
              {paginatedUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-50/70 p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.id}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {getStatusIcon(user.status)}
                      <span className="ml-1.5">{user.status}</span>
                    </span>
                  </div>
                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Role:</span>{" "}
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {user.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Properties:</span>{" "}
                      {user.properties}
                    </p>
                    <p>
                      <span className="font-semibold">Joined:</span>{" "}
                      {user.joinDate}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 p-1">
                      <FiEye className="w-5 h-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 p-1">
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center p-4 text-sm text-gray-600 gap-4">
          <div className="flex items-center space-x-2">
            <span>Rows per page:</span>
            <div className="relative">
              <select
                className="appearance-none bg-transparent font-semibold pr-6 cursor-pointer focus:outline-none"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
              <FiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Users;

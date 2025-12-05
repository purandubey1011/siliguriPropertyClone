import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiRefreshCw,
  FiCheckCircle,
  FiXCircle,
  FiFileText,
  FiMail,
  FiCalendar,
  FiEye,
  FiEdit2,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiFilter,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperty } from "../../../store/propertySlice";

// --- Animation Variants ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
// };
// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
// };

// --- LocalStorage Keys ---
const STORAGE_KEYS = {
  SEARCH_TERM: "admin_dashboard_search_term",
  STATUS_FILTER: "admin_dashboard_status_filter",
  TYPE_FILTER: "admin_dashboard_type_filter",
  DATE_FILTER: "admin_dashboard_date_filter",
  CUSTOM_DATE_FROM: "admin_dashboard_custom_date_from",
  CUSTOM_DATE_TO: "admin_dashboard_custom_date_to",
  ROWS_PER_PAGE: "admin_dashboard_rows_per_page",
  SHOW_FILTERS: "admin_dashboard_show_filters",
};

// --- Helper Functions for LocalStorage ---
const getFromLocalStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage: ${key}`, error);
  }
};

const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
  }
};

// Date filter options
const dateFilterOptions = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last7days", label: "Last 7 Days" },
  { value: "last30days", label: "Last 30 Days" },
  { value: "thisMonth", label: "This Month" },
  { value: "lastMonth", label: "Last Month" },
  { value: "custom", label: "Custom Range" },
];

const getStatusColor = (status) => {
  const lowerStatus = status?.toLowerCase() || "";
  switch (lowerStatus) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status) => {
  const lowerStatus = status?.toLowerCase() || "";
  switch (lowerStatus) {
    case "pending":
      return <FiCalendar className="w-4 h-4" />;
    case "approved":
      return <FiCheckCircle className="w-4 h-4" />;
    case "rejected":
      return <FiXCircle className="w-4 h-4" />;
    default:
      return <FiCalendar className="w-4 h-4" />;
  }
};

// Helper function to check if a date falls within the selected range
const isDateInRange = (date, dateFilter, customDateFrom, customDateTo) => {
  if (!date) return false;

  const propertyDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  switch (dateFilter) {
    case "all":
      return true;
    case "today":
      return propertyDate.toDateString() === today.toDateString();
    case "yesterday":
      return propertyDate.toDateString() === yesterday.toDateString();
    case "last7days":
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return propertyDate >= sevenDaysAgo && propertyDate <= today;
    case "last30days":
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return propertyDate >= thirtyDaysAgo && propertyDate <= today;
    case "thisMonth":
      return (
        propertyDate.getMonth() === today.getMonth() &&
        propertyDate.getFullYear() === today.getFullYear()
      );
    case "lastMonth":
      const lastMonth = new Date(today);
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return (
        propertyDate.getMonth() === lastMonth.getMonth() &&
        propertyDate.getFullYear() === lastMonth.getFullYear()
      );
    case "custom":
      if (!customDateFrom && !customDateTo) return true;
      const fromDate = customDateFrom ? new Date(customDateFrom) : new Date(0);
      const toDate = customDateTo ? new Date(customDateTo) : new Date();
      return propertyDate >= fromDate && propertyDate <= toDate;
    default:
      return true;
  }
};

// Helper function to format date
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// --- Sub-components ---

const StatCard = ({ title, value, icon, bgColor, iconBgColor }) => (
  <motion.div  className={`p-5 rounded-2xl ${bgColor}`}>
    <p className="text-sm text-gray-600">{title}</p>
    <div className="flex justify-between items-end mt-2">
      <p className="text-3xl lg:text-4xl font-bold text-gray-800">{value}</p>
      <div className={`p-3 rounded-full ${iconBgColor}`}>{icon}</div>
    </div>
  </motion.div>
);

const FilterPanel = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  dateFilter,
  setDateFilter,
  customDateFrom,
  setCustomDateFrom,
  customDateTo,
  setCustomDateTo,
  propertyTypes,
  showFilters,
  setShowFilters,
  activeFiltersCount,
  clearAllFilters,
}) => (
  <div className="mb-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
      <h2 className="text-lg font-bold text-gray-800">Property Listing</h2>
      <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            showFilters
              ? "bg-pink-50 border-pink-200 text-pink-700"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FiFilter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition-colors"
          >
            <FiX className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>
    </div>

    <AnimatePresence>
      {showFilters && (
        <motion.div
          // initial={{ height: 0, opacity: 0 }}
          // animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Filter Options
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1"
                >
                  <FiX className="w-4 h-4" />
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                  >
                    <option value="All">All Types</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <div className="relative">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                  >
                    {dateFilterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Custom Date Range - only show when custom is selected */}
              {dateFilter === "custom" && (
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Custom Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={customDateFrom}
                      onChange={(e) => setCustomDateFrom(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                      placeholder="From"
                    />
                    <input
                      type="date"
                      value={customDateTo}
                      onChange={(e) => setCustomDateTo(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
                      placeholder="To"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const PropertyTable = ({ properties }) => {
  // Initialize state from localStorage with default values
  const [searchTerm, setSearchTerm] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.SEARCH_TERM, "")
  );
  const [statusFilter, setStatusFilter] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.STATUS_FILTER, "All")
  );
  const [typeFilter, setTypeFilter] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.TYPE_FILTER, "All")
  );
  const [dateFilter, setDateFilter] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.DATE_FILTER, "all")
  );
  const [customDateFrom, setCustomDateFrom] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.CUSTOM_DATE_FROM, "")
  );
  const [customDateTo, setCustomDateTo] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.CUSTOM_DATE_TO, "")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.ROWS_PER_PAGE, 5)
  );
  const [showFilters, setShowFilters] = useState(() =>
    getFromLocalStorage(STORAGE_KEYS.SHOW_FILTERS, false)
  );

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.SEARCH_TERM, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.STATUS_FILTER, statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.TYPE_FILTER, typeFilter);
  }, [typeFilter]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.DATE_FILTER, dateFilter);
  }, [dateFilter]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.CUSTOM_DATE_FROM, customDateFrom);
  }, [customDateFrom]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.CUSTOM_DATE_TO, customDateTo);
  }, [customDateTo]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.ROWS_PER_PAGE, rowsPerPage);
  }, [rowsPerPage]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.SHOW_FILTERS, showFilters);
  }, [showFilters]);

  const propertyTypes = useMemo(() => {
    const types = [
      ...new Set(properties.map((prop) => prop.propertyType).filter(Boolean)),
    ];
    return types.sort();
  }, [properties]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm !== "") count++;
    if (statusFilter !== "All") count++;
    if (typeFilter !== "All") count++;
    if (dateFilter !== "all") count++;
    return count;
  }, [searchTerm, statusFilter, typeFilter, dateFilter]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setTypeFilter("All");
    setDateFilter("all");
    setCustomDateFrom("");
    setCustomDateTo("");

    removeFromLocalStorage(STORAGE_KEYS.SEARCH_TERM);
    removeFromLocalStorage(STORAGE_KEYS.STATUS_FILTER);
    removeFromLocalStorage(STORAGE_KEYS.TYPE_FILTER);
    removeFromLocalStorage(STORAGE_KEYS.DATE_FILTER);
    removeFromLocalStorage(STORAGE_KEYS.CUSTOM_DATE_FROM);
    removeFromLocalStorage(STORAGE_KEYS.CUSTOM_DATE_TO);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchLower === "" ||
        (prop.propertyTitle &&
          prop.propertyTitle.toLowerCase().includes(searchLower)) ||
        (prop._id && prop._id.toLowerCase().includes(searchLower)) ||
        (prop.firstName &&
          prop.firstName.toLowerCase().includes(searchLower)) ||
        (prop.lastName && prop.lastName.toLowerCase().includes(searchLower));

      const matchesStatus =
        statusFilter === "All" ||
        (prop.verification &&
          prop.verification.toLowerCase() === statusFilter.toLowerCase());

      const matchesType =
        typeFilter === "All" ||
        (prop.propertyType && prop.propertyType === typeFilter);

      const matchesDate = isDateInRange(
        prop.createdAt || prop.updatedAt || prop.submittedDate,
        dateFilter,
        customDateFrom,
        customDateTo
      );

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [
    properties,
    searchTerm,
    statusFilter,
    typeFilter,
    dateFilter,
    customDateFrom,
    customDateTo,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    statusFilter,
    typeFilter,
    dateFilter,
    customDateFrom,
    customDateTo,
    rowsPerPage,
  ]);

  const totalPages = Math.ceil(filteredProperties.length / rowsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(
    startIndex + rowsPerPage - 1,
    filteredProperties.length
  );

  return (
    <motion.div
      // variants={itemVariants}
      className="mt-8 bg-white p-4 sm:p-6 rounded-2xl shadow-sm"
    >
      <FilterPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        customDateFrom={customDateFrom}
        setCustomDateFrom={setCustomDateFrom}
        customDateTo={customDateTo}
        setCustomDateTo={setCustomDateTo}
        propertyTypes={propertyTypes}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        activeFiltersCount={activeFiltersCount}
        clearAllFilters={clearAllFilters}
      />

      <div className="overflow-x-auto hidden lg:block">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 font-medium bg-gray-50">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Type</th>
              <th className="p-3">Submitted by</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <AnimatePresence>
              {paginatedProperties.map((prop) => (
                <motion.tr
                  key={prop._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-700">
                    {prop._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="p-3 text-gray-700">
                    {prop.propertyTitle || prop.title}
                  </td>
                  <td className="p-3 text-gray-700">{prop.propertyType}</td>
                  <td className="p-3 text-gray-700">{`${prop.firstName} ${prop.lastName}`}</td>
                  <td className="p-3 text-gray-600 text-xs">
                    {formatDate(
                      prop.createdAt || prop.updatedAt || prop.submittedDate
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        prop.verification
                      )}`}
                    >
                      {getStatusIcon(prop.verification)}
                      <span className="ml-1.5">{prop.verification}</span>
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-gray-500 hover:text-blue-600 p-1.5 rounded-full hover:bg-gray-100">
                        <FiEye />
                      </button>
                      <Link
                        to={`/admin/dashboard/${prop._id}`}
                        className="text-gray-500 hover:text-green-600 p-1.5 rounded-full hover:bg-gray-100"
                      >
                        <FiEdit2 />
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        <AnimatePresence>
          {paginatedProperties.map((prop) => (
            <motion.div
              key={prop._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-50/50 p-4 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-gray-800">
                    {prop.propertyTitle || prop.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {prop._id.slice(-6).toUpperCase()} • {prop.propertyType}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    prop.verification
                  )}`}
                >
                  {getStatusIcon(prop.verification)}
                  <span className="ml-1.5">{prop.verification}</span>
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-3">
                {formatDate(
                  prop.createdAt || prop.updatedAt || prop.submittedDate
                )}
              </div>
              <div className="border-t border-gray-200 my-3"></div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  By:{" "}
                  <span className="font-medium text-gray-800">{`${prop.firstName} ${prop.lastName}`}</span>
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <button className="text-gray-500 hover:text-blue-600 p-1.5 rounded-full hover:bg-gray-100">
                    <FiEye />
                  </button>
                  <Link
                    to={`/admin/dashboard/${prop._id}`}
                    className="text-gray-500 hover:text-green-600 p-1.5 rounded-full hover:bg-gray-100"
                  >
                    <FiEdit2 />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>Rows per page:</span>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="appearance-none bg-transparent font-semibold pr-6 focus:outline-none"
              >
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <FiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <span>
            Showing{" "}
            {filteredProperties.length > 0 ? `${startIndex}-${endIndex}` : 0} of{" "}
            {filteredProperties.length} properties
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-pink-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Admindashboard = () => {
  const properties = useSelector((state) => state.property.properties);
  const dispatch = useDispatch();
  const totalProperties = properties.length;

  const rejectedProperties = properties.filter(
    (property) => property.verification === "rejected"
  );
  const approvedProperties = properties.filter(
    (property) => property.verification === "approved"
  );
  const pendingProperties = properties.filter(
    (property) => property.verification === "pending"
  );

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  const statCardsData = [
    {
      title: "Pending Listings",
      value: pendingProperties.length,
      icon: <FiRefreshCw className="text-pink-600" />,
      bgColor: "bg-pink-50",
      iconBgColor: "bg-pink-100",
    },
    {
      title: "Approved Listings",
      value: approvedProperties.length,
      icon: <FiCheckCircle className="text-indigo-600" />,
      bgColor: "bg-indigo-50",
      iconBgColor: "bg-indigo-100",
    },
    {
      title: "Rejected Listings",
      value: rejectedProperties.length,
      icon: <FiXCircle className="text-yellow-600" />,
      bgColor: "bg-yellow-50",
      iconBgColor: "bg-yellow-100",
    },
    {
      title: "Total Properties",
      value: totalProperties,
      icon: <FiFileText className="text-orange-600" />,
      bgColor: "bg-orange-50",
      iconBgColor: "bg-orange-100",
    },
  ];

  return (
    <>
      {properties.length > 0 ? (
        <motion.div
          // variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.section
            // variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {statCardsData.map((card) => (
              <StatCard key={card.title} {...card} />
            ))}
          </motion.section>

          <section>
            <PropertyTable properties={properties} />
          </section>
        </motion.div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">Loading properties...no property rigth now</p>
        </div>
      )}
    </>
  );
};

export default Admindashboard;

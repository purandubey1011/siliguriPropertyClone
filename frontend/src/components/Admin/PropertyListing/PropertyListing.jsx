import React, { useState, useMemo, useEffect } from "react";
import {
  FiHome,
  FiMapPin,
  FiUser,
  FiCalendar,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperty } from "../../../store/propertySlice";

// --- Enhanced Data for Demonstration ---
// const propertiesData = [
//   {
//     id: "PROP-001",
//     title: "Modern 2BHK Apartment",
//     type: "Apartment",
//     location: "Siliguri, West Bengal",
//     price: "₹45,00,000",
//     owner: "Rahul Sharma",
//     status: "Pending",
//     submittedDate: "2024-01-15",
//     bedrooms: 2,
//     bathrooms: 2,
//     area: "1200 sq ft",
//   },
//   {
//     id: "PROP-002",
//     title: "Spacious 3BHK Villa",
//     type: "Villa",
//     location: "Patna, Bihar",
//     price: "₹85,00,000",
//     owner: "Priya Patel",
//     status: "Approved",
//     submittedDate: "2024-01-14",
//     bedrooms: 3,
//     bathrooms: 3,
//     area: "2500 sq ft",
//   },
//   {
//     id: "PROP-003",
//     title: "Cozy 1BHK Flat",
//     type: "Flat",
//     location: "Kolkata, West Bengal",
//     price: "₹25,00,000",
//     owner: "Amit Kumar",
//     status: "Rejected",
//     submittedDate: "2024-01-13",
//     bedrooms: 1,
//     bathrooms: 1,
//     area: "800 sq ft",
//   },
//   {
//     id: "PROP-004",
//     title: "Commercial Plot",
//     type: "Plot",
//     location: "Siliguri, West Bengal",
//     price: "₹1,20,00,000",
//     owner: "Sneha Gupta",
//     status: "Approved",
//     submittedDate: "2024-01-12",
//     bedrooms: 0,
//     bathrooms: 0,
//     area: "5000 sq ft",
//   },
//   {
//     id: "PROP-005",
//     title: "Downtown Office Space",
//     type: "Office",
//     location: "Patna, Bihar",
//     price: "₹60,000/mo",
//     owner: "Vikram Singh",
//     status: "Pending",
//     submittedDate: "2024-01-11",
//     bedrooms: 0,
//     bathrooms: 1,
//     area: "1500 sq ft",
//   },
//   {
//     id: "PROP-006",
//     title: "Luxury Penthouse",
//     type: "Apartment",
//     location: "Kolkata, West Bengal",
//     price: "₹2,50,00,000",
//     owner: "Anjali Mehta",
//     status: "Approved",
//     submittedDate: "2024-01-10",
//     bedrooms: 4,
//     bathrooms: 4,
//     area: "3500 sq ft",
//   },
//   {
//     id: "PROP-007",
//     title: "Retail Shop Front",
//     type: "Shop",
//     location: "Siliguri, West Bengal",
//     price: "₹30,000/mo",
//     owner: "Sanjay Reddy",
//     status: "Rejected",
//     submittedDate: "2024-01-09",
//     bedrooms: 0,
//     bathrooms: 1,
//     area: "600 sq ft",
//   },
// ];

const PropertyListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const dispatch = useDispatch();
  const { properties, loading } = useSelector((state) => state.property);
  console.log("Properties from Redux:", properties);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "Approved":
        return <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "Rejected":
        return <FiXCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      default:
        return <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  const total = properties?.length || 0;
  const pending = properties?.filter((p) => p.verification === "pending").length || 0;
  const approved =
    properties?.filter((p) => p.verification === "approved").length || 0;
  const rejected =
    properties?.filter((p) => p.verification === "rejected").length || 0;

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  useEffect(() => {
    console.log("Properties from Redux after useeffects:", properties);
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return (
      properties &&
      properties?.filter((prop) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          searchLower === "" ||
          prop.title.toLowerCase().includes(searchLower) ||
          prop.id.toLowerCase().includes(searchLower) ||
          prop.location.toLowerCase().includes(searchLower) ||
          prop.owner.toLowerCase().includes(searchLower);

        const matchesStatus =
          statusFilter === "All" || prop.status === statusFilter;
        const matchesType = typeFilter === "All" || prop.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
      })
    );
  }, [searchTerm, statusFilter, typeFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, rowsPerPage]);

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

  const StatCard = ({ icon, label, value, bgColor, iconColor }) => (
    <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-gray-600 truncate">{label}</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
            {value}
          </p>
        </div>
        <div
          className={`${bgColor} p-2 sm:p-3 rounded-full flex-shrink-0 ml-2`}
        >
          {React.cloneElement(icon, {
            className: `${iconColor} text-base sm:text-lg lg:text-xl`,
          })}
        </div>
      </div>
    </div>
  );

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="min-w-0 flex-1 mr-3">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {property.propertyTitle}
            </h3>

            {/* ID + Type */}
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {property._id} • {property.propertyType}
            </p>
          </div>

          {/* STATUS */}
          <span
            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
              property.verification
            )} flex-shrink-0`}
          >
            {getStatusIcon(property.verification)}
            <span className="ml-1 hidden sm:inline">
              {property.verification}
            </span>
          </span>
        </div>

        <div className="space-y-2 text-xs sm:text-sm">
          {/* LOCATION */}
          <div className="flex items-center text-gray-600">
            <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
            <span className="truncate">
              {property.address}, {property.city}
            </span>
          </div>

          {/* OWNER NAME */}
          <div className="flex items-center text-gray-600">
            <FiUser className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
            <span className="truncate">
              {property.firstName} {property.lastName}
            </span>
          </div>
        </div>

        {/* PRICE */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Price</p>
            <p className="font-bold text-gray-900 text-sm sm:text-base">
              ₹{property.rent || property.bookingAmount}
            </p>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1.5 sm:p-2 rounded-lg transition-colors">
              <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1.5 sm:p-2 rounded-lg transition-colors">
              <FiEdit2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1.5 sm:p-2 rounded-lg transition-colors">
              <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileFilters = () => (
    <div className={`lg:hidden ${showMobileFilters ? "block" : "hidden"}`}>
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={() => setShowMobileFilters(false)}
      >
        <div
          className="fixed inset-y-0 right-0 w-80 max-w-full bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="All">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Flat">Flat</option>
                <option value="Plot">Plot</option>
                <option value="Office">Office</option>
                <option value="Shop">Shop</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
              Property Listing
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Manage property submissions and approvals
            </p>
          </div>
          <Link
            to="/owner/listing"
            className="bg-pink-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-pink-700 transition-colors text-sm sm:text-base font-medium w-full sm:w-auto"
          >
            Add New Property
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
    <StatCard
      icon={<FiHome />}
      label="Total Properties"
      value={total}
      bgColor="bg-blue-100"
      iconColor="text-blue-600"
    />
    <StatCard
      icon={<FiCalendar />}
      label="Pending Review"
      value={pending}
      bgColor="bg-yellow-100"
      iconColor="text-yellow-600"
    />
    <StatCard
      icon={<FiCheckCircle />}
      label="Approved"
      value={approved}
      bgColor="bg-green-100"
      iconColor="text-green-600"
    />
    <StatCard
      icon={<FiXCircle />}
      label="Rejected"
      value={rejected}
      bgColor="bg-red-100"
      iconColor="text-red-600"
    />
  </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Filters Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Property Submissions
              </h2>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="All">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Flat">Flat</option>
                  <option value="Plot">Plot</option>
                  <option value="Office">Office</option>
                  <option value="Shop">Shop</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="lg:hidden">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>
          </div>

          {/* Results Counter */}
          <div className="px-4 sm:px-6 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              Showing{" "}
              {filteredProperties.length > 0 ? `${startIndex}-${endIndex}` : 0}{" "}
              of {filteredProperties.length} properties
              {(statusFilter !== "All" ||
                typeFilter !== "All" ||
                searchTerm) && (
                <span className="ml-2 text-pink-600 font-medium">
                  (filtered)
                </span>
              )}
            </p>
          </div>

          {/* Properties Grid/List */}
          <div className="p-4 sm:p-6">
            {paginatedProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiHome className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {paginatedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 border-t border-gray-200 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <div className="relative">
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                  <FiChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <MobileFilters />
    </div>
  );
};

export default PropertyListing;

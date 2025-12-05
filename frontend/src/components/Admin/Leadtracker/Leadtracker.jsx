import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
} from "react-icons/fi";

// Enhanced data with varied dates for filtering demonstration
const leadsData = [
  { id: '#2123', propertyTitle: '2BHK in Sevoke', name: 'Anjali Gupta', contact: '96112 23344', date: new Date().toISOString() },
  { id: '#2124', propertyTitle: 'Plot in Matigara', name: 'Rohan Sharma', contact: '98765 43210', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() },
  { id: '#2125', propertyTitle: '3BHK Villa', name: 'Priya Patel', contact: '87654 32109', date: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString() },
  { id: '#2126', propertyTitle: 'Office Space', name: 'Amit Kumar', contact: '76543 21098', date: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString() },
  { id: '#2127', propertyTitle: '1BHK Apartment', name: 'Sneha Singh', contact: '65432 10987', date: new Date(new Date().setDate(new Date().getDate() - 40)).toISOString() },
  { id: '#2128', propertyTitle: 'Shop for Rent', name: 'Vikram Reddy', contact: '54321 09876', date: new Date(new Date().setDate(new Date().getDate() - 100)).toISOString() },
  { id: '#2129', propertyTitle: 'Luxury Duplex', name: 'Neha Joshi', contact: '43210 98765', date: new Date().toISOString() },
  { id: '#2130', propertyTitle: 'Land in Darjeeling', name: 'Sanjay Verma', contact: '32109 87654', date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString() },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Leadtracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredLeads = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return leadsData.filter((lead) => {
      const searchLower = searchTerm.toLowerCase();
      const leadDate = new Date(lead.date);

      const matchesSearch =
        searchLower === "" ||
        lead.id.toLowerCase().includes(searchLower) ||
        lead.propertyTitle.toLowerCase().includes(searchLower) ||
        lead.name.toLowerCase().includes(searchLower);
      
      const matchesDate = dateFilter === "All Time" ||
        (dateFilter === "Today" && leadDate >= today) ||
        (dateFilter === "This Week" && leadDate >= weekStart) ||
        (dateFilter === "This Month" && leadDate >= monthStart);

      return matchesSearch && matchesDate;
    });
  }, [searchTerm, dateFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter, rowsPerPage]);

  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(startIndex + rowsPerPage - 1, filteredLeads.length);

  return (
    <motion.div
      className="bg-gray-50 min-h-screen font-sans p-4 sm:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <motion.header variants={itemVariants} className="mb-8">
          <p className="text-sm text-gray-500">Dashboard</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">Lead Tracker</h1>
        </motion.header>

        <motion.main
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID, Property, Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option>All Time</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm hidden lg:table">
              <thead className="text-left text-gray-500 font-medium bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4">Lead ID</th>
                  <th className="px-6 py-4">Property Title</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                <AnimatePresence>
                  {paginatedLeads.map((lead, index) => (
                    <motion.tr
                      key={lead.id + index}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-dotted border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium">{lead.id}</td>
                      <td className="px-6 py-4">{lead.propertyTitle}</td>
                      <td className="px-6 py-4">{lead.name}</td>
                      <td className="px-6 py-4">{lead.contact}</td>
                      <td className="px-6 py-4">{new Date(lead.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <a href="#" className="text-pink-600 font-semibold underline hover:text-pink-700">View Details</a>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            <div className="lg:hidden p-4 space-y-4">
              <AnimatePresence>
                {paginatedLeads.map((lead, index) => (
                  <motion.div
                    key={lead.id + index}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-800">{lead.propertyTitle}</p>
                        <p className="text-xs text-gray-500">{lead.id}</p>
                      </div>
                      <p className="text-xs text-gray-500">{new Date(lead.date).toLocaleDateString()}</p>
                    </div>
                    <div className="border-t border-gray-200 my-3"></div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Name: <span className="font-medium text-gray-800">{lead.name}</span></p>
                        <p className="text-sm text-gray-600">Contact: <span className="font-medium text-gray-800">{lead.contact}</span></p>
                      </div>
                      <a href="#" className="w-full sm:w-auto text-center bg-pink-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-pink-700 transition">
                        View Details
                      </a>
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
                <select value={rowsPerPage} onChange={e => setRowsPerPage(Number(e.target.value))} className="appearance-none bg-transparent font-semibold pr-6 cursor-pointer focus:outline-none">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <FiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <span>
              {filteredLeads.length > 0 ? `${startIndex}-${endIndex}` : 0} of {filteredLeads.length}
            </span>
            <div className="flex space-x-2">
              <button onClick={() => setCurrentPage(p => p - 1)} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50" disabled={currentPage === 1}>
                <FiChevronLeft />
              </button>
              <button onClick={() => setCurrentPage(p => p + 1)} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50" disabled={currentPage === totalPages || totalPages === 0}>
                <FiChevronRight />
              </button>
            </div>
          </div>
        </motion.main>
      </div>
    </motion.div>
  );
};

export default Leadtracker;
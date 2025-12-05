import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiBookOpen, FiCrosshair, FiUsers, FiSettings, FiLogOut, FiBell, FiMenu, FiX
} from 'react-icons/fi';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../store/authSlice';
import ProfileDropdown from '../../components/ProfileDropdown';

// --- Data for the Component ---

const navLinks = [
  { name: 'Dashboard', icon: <FiHome />, href: '/admin/dashboard' },
  { name: 'Property Listing', icon: <FiBookOpen />, href: '/admin/property-listing' },
  // { name: 'Lead Tracker', icon: <FiCrosshair />, href: '/admin/leadtracker' },
  { name: 'Users', icon: <FiUsers />, href: '/admin/users' },
];

// --- Animation Variants ---

// const sidebarVariants = {
//   hidden: { x: '-100%' },
//   visible: { x: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
//   exit: { x: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } },
// };

// const navListVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
// };

// const navItemVariants = {
//   hidden: { x: -20, opacity: 0 },
//   visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
// };


// --- Sub-components for UI Sections ---

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
const logoutHandler = () => {
   dispatch(logOutUser()); 
}

  return <motion.aside 
    className="fixed lg:relative inset-y-0 left-0 w-64 flex-shrink-0 bg-white p-4 flex flex-col border-r border-gray-200 z-50"
    // variants={sidebarVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <div className="flex items-center justify-between p-4">
      <Link to="/" className="text-xl font-bold">
        <span className="text-blue-600">siliguri</span><span className="text-pink-500">properties</span><span className="text-pink-500 text-sm">.com</span>
      </Link>
      <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-800">
        <FiX className="w-6 h-6" />
      </button>
    </div>
    <motion.nav 
      className="flex-grow mt-8" 
      role="navigation" 
      aria-label="Admin navigation"
      // variants={navListVariants}
    >
      <ul className="space-y-2">
        {navLinks.map(link => ( 
          <motion.li key={link.name} >
            <NavLink 
              to={link.href} 
              onClick={toggleSidebar} // Close sidebar on mobile nav click
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  isActive 
                    ? 'bg-pink-100 text-pink-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
    <motion.div  className="mt-auto space-y-2">
      <motion.a  href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg font-semibold text-sm text-gray-600 hover:bg-gray-100 transition-colors">
        <FiSettings className="text-xl" /><span>Settings</span>
      </motion.a>
      <motion.p onClick={() => logoutHandler()} className="flex items-center space-x-3 px-4 py-2.5 rounded-lg font-semibold text-sm text-red-500 hover:bg-red-50 transition-colors">
        <FiLogOut className="text-xl" /><span>Logout</span>
      </motion.p>
    </motion.div>
  </motion.aside>
};

const Header = ({ onMenuClick }) => (
  <motion.header 
    // initial={{ y: -20, opacity: 0 }}
    // animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="flex justify-between items-center"
  >
    <div className="flex items-center space-x-4">
      <button onClick={onMenuClick} className="lg:hidden text-gray-600 hover:text-gray-900">
        <FiMenu className="w-6 h-6" />
      </button>
      <div>
        <p className="text-gray-600">Welcome,</p>
        <h1 className="text-xl font-bold text-pink-600">Puran dubey</h1>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <button className="relative text-gray-500 hover:text-gray-800">
        <FiBell className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-50"></span>
      </button>
   {/* User */}
      <ProfileDropdown/>
    </div>
  </motion.header>
);

const Adminlayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    // Close sidebar on route change on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans relative">
      <div className="hidden lg:flex">
        <Sidebar isOpen={true} toggleSidebar={() => {}} />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <motion.div
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            />
          </>
        )}
      </AnimatePresence>
      
      <main className="flex-1 p-6 sm:p-8 flex flex-col">
        <Header onMenuClick={toggleSidebar} />
        <div className="flex-grow mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              // initial={{ opacity: 0, y: 15 }}
              // animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 0, y: 15 }}
              // transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Adminlayout;
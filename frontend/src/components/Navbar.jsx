import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../store/authSlice";
import ProfileDropdown from "./ProfileDropdown";

const navLinks = [
  { text: "Home", to: "/" },
  { text: "View Properties", to: "/user/list" },
  { text: "List Property", to: "/owner/signup" },
  { text: "About", to: "/user/about" },
  { text: "Contact", to: "/user/contact" },
];




const Navbar = ({ bgcolor = "rgba(100, 116, 139, 0.2)" }) => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  // Close dropdown when clicking outside

  const navVariants = {
    top: {
      backgroundColor: `${bgcolor}`,
      borderColor: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 1)", 
      borderColor: "rgba(229, 231, 235, 1)",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    },
  };

  const location = useLocation();
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const tl = gsap.timeline();
  //     tl.fromTo(
  //       navRef.current,
  //       { y: -80, opacity: 0 },
  //       { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  //     );
  //     tl.fromTo(
  //       ".nav-item",
  //       { y: -20, opacity: 0 },
  //       { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
  //       "-=0.5"
  //     );
  //   }, navRef);
  //   return () => ctx.revert();
  // }, []);

  // Effect to listen for scroll changes and update state
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);


  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full pt-4 mt-2  ${
          location.pathname == "/" ? "md:mt-5" : "md:mt-0"
        }  sm:pt-6 z-40`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <motion.nav
            ref={navRef}
            variants={navVariants}
            initial="top"
            style={{ backgroundColor: bgcolor }}
            animate={isScrolled ? "scrolled" : "top"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`rounded-full px-2  md:py-3 md:px-4 mx-2 flex border justify-between items-center backdrop-blur-md 
              ${isScrolled ? "text-gray-800" : "text-white"}
            `}
          >
            {/* Logo */}
            <Link to="/" className="ml-2 nav-item">
              <div className="text-sm md:text-xl font-bold">
                <span
                  className={isScrolled ? "text-[#003366]" : "text-[#003366]"}
                >
                  siliguri
                </span>
                <span
                  className={isScrolled ? "text-[#AA005D]" : "text-[#AA005D]"}
                >
                  properties
                </span>
                <span
                  className={`${
                    isScrolled ? "text-[#AA005D]" : "text-[#AA005D]"
                  } text-sm`}
                >
                  .com
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 text-sm font-light">
              {navLinks.map((link, i) =>
                link.to ? (
                  <Link
                    key={i}
                    to={link.to}
                    className={`nav-item hover:text-pink-500 transition-colors`}
                  >
                    {link.text}
                  </Link>
                ) : (
                  <a
                    key={i}
                    href={link.href}
                    className={`nav-item hover:text-pink-500 transition-colors`}
                  >
                    {link.text}
                  </a>
                )
              )}
            </div>

            {/* Desktop User Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {user == null ? (
                <div>
                  {" "}
                  <Link
                    to={"/signin"}
                    className={`nav-item mr-3 text-sm font-light hover:text-pink-500 transition-colors`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to={"/signup"}
                    className={`nav-item text-sm border rounded-full px-5 py-2 transition-colors
                ${
                  isScrolled
                    ? "border-gray-800 hover:bg-gray-800 hover:text-white"
                    : "border-white hover:bg-white hover:text-black"
                }
              `}
                  >
                    Create Account
                  </Link>
                </div>
              ) : (
                <ProfileDropdown isScrolled={isScrolled} />
              )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden">
              <button onClick={toggleMenu} className="text-2xl p-2">
                {isMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed top-0 left-0 w-full h-screen bg-slate-900/95 backdrop-blur-lg z-40 pt-28 p-8"
          >
            <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
              {navLinks.map((link, i) =>
                link.to ? (
                  <Link
                    key={i}
                    to={link.to}
                    onClick={toggleMenu}
                    className="text-2xl font-light hover:text-pink-400 transition-colors"
                  >
                    {link.text}
                  </Link>
                ) : (
                  <a
                    key={i}
                    href={link.href}
                    onClick={toggleMenu}
                    className="text-2xl font-light hover:text-pink-400 transition-colors"
                  >
                    {link.text}
                  </a>
                )
              )}
              <hr className="w-2/3 border-gray-600 my-4" />
              {user == null ? (
                <>
                  {" "}
                  <Link
                    to={"/signin"}
                    onClick={toggleMenu}
                    className="text-2xl font-light hover:text-pink-400 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to={"/signup"}
                    onClick={toggleMenu}
                    className="text-xl border border-white rounded-full px-8 py-3 hover:bg-white hover:text-black transition-colors"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="text-2xl font-light hover:text-pink-400 transition-colors"
                  >
                    Profile Settings
                  </Link>
                  {user.usertype == "owner" ? (
                    <Link
                      to="/owner/myproperties"
                      className="text-2xl font-light hover:text-pink-400 transition-colors"
                    >
                      My Properties
                    </Link>
                  ) : (
                    ""
                  )}
                  {user.usertype == "admin" ? (
                    <Link
                      to="/admin/dashboard"
                      className="text-2xl font-light hover:text-pink-400 transition-colors"
                    >
                      Admin Dashbooard
                    </Link>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => {
                      dispatch(logOutUser());
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-2xl font-light hover:text-pink-400 transition-colors px-4 py-2  text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

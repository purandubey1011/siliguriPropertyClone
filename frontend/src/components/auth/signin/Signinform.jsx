import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  LoginInUser,
  selectAuthError,
  selectAuthMessage,
  selectAuthStatus,
} from "../../../store/authSlice";
import Navbar from "../../Navbar";
import { toast } from "react-toastify";

const sideImageUrl =  "https://images.unsplash.com/photo-1582647509900-96801d340b69?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735";

const leftColumnVariants = {
  hidden: { x: "-50%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const rightColumnVariants = {
  hidden: { x: "50%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const formContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const formItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Signinform = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const message = useSelector(selectAuthMessage);
  const error = useSelector(selectAuthError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginInUser({ email, password })).then((res) => {
      console.log(res)
   
        if(res.type === 'auth/login/fulfilled'){
          toast.success(res.payload.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(-1)
        } else{
        toast.error(res.payload, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  const handleForgotSubmit = (e) => {
  e.preventDefault();

  if (!forgotEmail.trim()) return;

  dispatch(forgotPassword({ email: forgotEmail }))
    .unwrap()
    .then((res) => {
      alert(res.message || "Reset link sent to your email!");
      setShowForgotPopup(false);
      setForgotEmail("");
    })
    .catch((err) => {
      alert(err || "Failed to send reset link");
    });
};


  return (
    <div className="min-h-screen flex flex-col px-2 md:px-0 font-sans bg-gray-50 overflow-hidden relative">
      <Navbar bgcolor="#CC0066" />

      {/* --- FORGOT PASSWORD POPUP --- */}
      {showForgotPopup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowForgotPopup(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
              onClick={() => setShowForgotPopup(false)}
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Forgot Password
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter your registered email to receive a reset link.
            </p>
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="forgotEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="forgotEmail"
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 rounded-md font-medium hover:bg-pink-700 transition"
              >
                Send Reset Link
              </button>
            </form>
          </motion.div>
        </div>
      )}
      {/* --- END POPUP --- */}

      <div className="flex-1 flex flex-col lg:flex-row">
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white"
          // variants={leftColumnVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mx-auto w-full max-w-sm lg:w-96"
            // variants={formContainerVariants}
          >
            <motion.div >
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Login for free to access to any of our products
              </p>
            </motion.div>

            <div className="mt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                  </div>
                </motion.div>

                <motion.div >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  className="text-right"
                >
                  <button
                    type="button"
                    onClick={() => setShowForgotPopup(true)}
                    className="text-sm text-pink-600 hover:text-pink-500 font-medium"
                  >
                    Forget your password?
                  </button>
                </motion.div>

                <motion.div >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Loading..." : "Sign in"}
                  </motion.button>
                </motion.div>

              
              </form>

              <motion.div  className="mt-6">
                <div className="text-sm text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    Sign up
                  </Link>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <button
                    onClick={() =>
                      window.open(
                        `${import.meta.env.VITE_BACKEND_URI}/auth/google`,
                        "_self"
                      )
                    }
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-pink-600 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <FcGoogle className="h-5 w-5 mr-2" />
                    Sign in with Google
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 hidden lg:block relative"
          initial="hidden"
          animate="visible"
        >
          <img
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            src={sideImageUrl}
            alt="Couple looking at a modern house"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Signinform;

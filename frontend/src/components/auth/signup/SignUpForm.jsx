import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ResgisterUser, selectAuthError, selectAuthMessage, selectAuthStatus } from '../../../store/authSlice';
import Navbar from '../../Navbar';

const sideImageUrl = "https://images.unsplash.com/photo-1582647509900-96801d340b69?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735";

// const leftColumnVariants = {
//   hidden: { x: '-50%', opacity: 0 },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const rightColumnVariants = {
//   hidden: { x: '50%', opacity: 0 },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const formContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.4,
//     },
//   },
// };

// const formItemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { type: 'spring', stiffness: 100 },
//   },
// };

const Signupform = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const message = useSelector(selectAuthMessage);
  const error = useSelector(selectAuthError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
     ResgisterUser({
      username,
      email,
      password
     })
    );
  };

  return (
    <div className="min-h-screen flex px-2 md:px-0 flex-col font-sans bg-gray-50 overflow-hidden">
      <Navbar bgcolor='#CC0066'/>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full bg-white shadow px-4 py-4 flex md:mt-12 items-center justify-between"
      >
        {/* <Link to={"/"} className="text-2xl font-bold text-gray-800">
         <img loading='lazy' loading="lazy" src="/photos/logo.png" alt="Logo" />
        </Link> */}
      </motion.nav>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* --- Image Column (Now on the Left) --- */}
        <motion.div
          className="w-full lg:w-1/2 hidden lg:block relative"
          // variants={leftColumnVariants}
          initial="hidden"
          animate="visible"
        >
          <img loading='lazy' 
            className="absolute inset-0 h-full w-full object-cover"
            src={sideImageUrl}
            alt="Couple looking at a modern house"
          />
        </motion.div>
        
        {/* --- Form Column (Now on the Right) --- */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white"
          // variants={rightColumnVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mx-auto w-full max-w-sm lg:w-96"
            // variants={formContainerVariants}
          >
            <motion.div >
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create an account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Get started for free to list your property or find a new home.
              </p>
            </motion.div>
            <div className="mt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <motion.div >
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input id="username" name="username" type="text" autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                  </div>
                </motion.div>

                <motion.div >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                  </div>
                </motion.div>

                <motion.div >
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                </motion.div>

                <motion.div >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Creating...' : 'Create account'}
                  </motion.button>
                </motion.div>
                
                {(message || error) && (
                  <motion.div className="mt-2">
                    <p className={`text-sm ${error ? 'text-red-600' : 'text-green-600'}`}>
                      {error || message}
                    </p>
                  </motion.div>
                )}
              </form>

              <motion.div  className="mt-6">
                <div className="text-sm text-center">
                  <Link to="/signin" className="font-medium">
                    Already have an account? <span className='font-medium text-pink-600 hover:text-pink-500'>Sign in</span>  
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
                
                <div className="grid grid-cols-1 gap-3">
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
                  {/* <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-pink-600 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-700">
                    <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
                    Sign up with Facebook
                  </button> */}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signupform;
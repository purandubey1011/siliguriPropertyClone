

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiMessageSquare, FiList, FiUsers, FiPhone, FiChevronDown, FiUser } from 'react-icons/fi';
import Navbar from '../../Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createOwner } from '../../../store/propertySlice';
import { getCurrentUser } from '../../../store/authSlice';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

//features
const features = [
  { icon: <FiShield />, text: 'GFS Verified Listings' },
  { icon: <FiMessageSquare />, text: 'Personal Assistance' },
  { icon: <FiList />, text: 'Free To List' },
  { icon: <FiUsers />, text: 'Strong Buyer Network' },
];

const familyImageUrl = "https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1934";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15, delayChildren: 0.5 },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { type: 'spring', stiffness: 100 },
//   },
// };

// const featuresContainerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.1 } },
// };

// const imageVariants = {
//     hidden: { y: 50, opacity: 0, scale: 0.9 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { type: 'spring', stiffness: 50, delay: 0.8 },
//     },
// };

const Listinghero = () => {
   const [loading, setloading] = useState(false);
  const [listingType, setListingType] = useState('Rent');
  
  const [form, setForm] = useState(() => {
    try {
      const savedForm = localStorage.getItem('listingFormData');
      return savedForm ? JSON.parse(savedForm) : { name: '', mobile: '' };
    } catch (error) {
      console.error("Error parsing form data from localStorage:", error);
      return { name: '', mobile: '' };
    }
  });


  useEffect(() => {
    localStorage.setItem('listingFormData', JSON.stringify(form));
  }, [form]);
  



 const dispatch = useDispatch();
 const navigate = useNavigate();

  const handleFormSubmit = () => {
        setloading(true);
       dispatch(createOwner(form)).then((res) => {
         console.log(res)
         if (res.type === 'property/createowner/fulfilled') {
             localStorage.removeItem('listingFormData');
             dispatch(getCurrentUser())
            navigate('/owner/listing');
         }else{
           toast.error("Please login to continue", {
             position: "bottom-right",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light",
           })
         navigate('/signin');
         }
       }).finally(() => {
         setloading(false);
       })
  };

  return (
    <div className="font-sans  bg-white">
      <div className="bg-[#d9006c] text-white  rounded-b-[3rem] sm:rounded-b-[4rem] relative z-10 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="py-6">
             <Navbar bgcolor={"#d9006c"} />
          </header>

          <motion.main
            className="text-center pt-16 pb-8"
            // variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
          <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-8 text-center"
          // variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Post Your Property for FREE
          </motion.h1>
          <motion.p  className="mt-6 max-w-2xl mx-auto text-white/80 text-lg">
            Get genuine buyers and tenants, manage leads, and close deals faster—all with zero brokerage.
          </motion.p>
  
          <motion.div className=" max-w-3xl mx-auto backdrop-blur-sm p-4 sm:p-6 rounded-2xl">
            <div className="flex justify-center items-center">
             {/* <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="tel" placeholder="Username" className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} type="tel" placeholder="Mobile Number" className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div> */}
              <button onClick={handleFormSubmit} className="w-44 md:w-64 md:col-span-1 bg-white/90 text-pink-600 font-bold rounded-lg py-3 flex items-center justify-center hover:bg-white/80  shadow-white/20">
                 Start Now
              </button>
            </div>
          </motion.div>
        </motion.div>
            
            <motion.div
              // variants={featuresContainerVariants}
              className=" flex flex-wrap justify-center items-center gap-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  // variants={itemVariants}
                  className="flex items-center space-x-3 px-6"
                >
                   {index > 0 && <div className="h-6 w-px bg-white/30 hidden sm:block"></div>}
                  <div className="text-2xl">{feature.icon}</div>
                  <span className="font-semibold text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.main>
        </div>
      </div>

      <div className="relative px-4 -mt-16 sm:-mt-20 z-10">
        <motion.div
          className="max-w-7xl mx-auto"
          // variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="rounded-2xl shadow-2xl overflow-hidden">
            <img loading='lazy' 
              src={familyImageUrl}
              alt="Happy family under a symbolic roof"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Listinghero;
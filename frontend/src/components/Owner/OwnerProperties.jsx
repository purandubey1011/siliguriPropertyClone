import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperty } from '../../store/propertySlice';
import { Link } from 'react-router-dom';
import { FiHome, FiMapPin, FiEdit2, FiTrash2, FiEye, FiCalendar, FiCheckCircle, FiXCircle, FiPlus } from 'react-icons/fi';
import Navbar from '../Navbar';

// --- Animation Variants ---
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
    transition: { type: 'spring', stiffness: 100 },
  },
};

// --- Helper Functions for Styling ---
const getStatusClasses = (status) => {
  const lowerStatus = status?.toLowerCase() || 'pending';
  switch (lowerStatus) {
    case 'approved': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status) => {
  const lowerStatus = status?.toLowerCase() || 'pending';
  switch (lowerStatus) {
    case 'approved': return <FiCheckCircle />;
    case 'rejected': return <FiXCircle />;
    case 'pending': return <FiCalendar />;
    default: return <FiCalendar />;
  }
};

// --- Reusable Property Card Sub-component ---
const PropertyCard = ({ property }) => {
  const ownerName = `${property.firstName || ''} ${property.lastName || ''}`.trim();
  const location = `${property.city || ''}, ${property.state || ''}`.trim();
  const imageUrl = property.mediaFiles?.[0]?.url || 'https://images.unsplash.com/photo-1618858510480-d079a17fd586?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'; 


  const displayPrice = () => {
    if (property.rent) {
      return `₹${property.rent.toLocaleString()}/month`;
    }
    if (property.projectUnits ) {
        const startingPrice = property.projectUnits[0].priceFrom;
        const endingPrice = property.projectUnits[property.projectUnits.length - 1].priceTo;
      return `₹${startingPrice} - ₹${endingPrice}`;
    }
    return 'Price not listed';
  };

  return (
    <motion.div 
      variants={itemVariants} 
      whileHover={{ y: -5 }} 
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative">
        <img loading='lazy' src={imageUrl} alt={property.propertyTitle || property.title} className="w-full h-48 object-cover" />
        <span className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClasses(property.verification)}`}>
          {getStatusIcon(property.verification)}
          {property.verification}
        </span>
      </div>
      <div className="p-5">
        <p className="text-sm text-pink-600 font-semibold">{property.propertyType}</p>
        <h3 className="text-xl font-bold text-gray-900 truncate mt-1">{property.propertyTitle || property.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <FiMapPin className="mr-2 text-gray-400" />
          <span>{location}</span>
        </div>
        <p className="text-lg font-bold text-gray-800 mt-4">{displayPrice()}</p>
        <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Posted: <span className="font-medium text-gray-700">{new Date(property.createdAt).toLocaleDateString()}</span>
          </p>
          <div className="flex space-x-2">
            <Link to={`/user/propertydetail/${property._id}`} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"><FiEye /></Link>
            <Link to={`/owner/edit-property/${property._id}`} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-green-600 transition-colors"><FiEdit2 /></Link>
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors"><FiTrash2 /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
const OwnerProperties = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const properties = useSelector((state) => state.property.properties);
    console.log('user -> ',user, 'propperty6+->' , properties)
 
    
    
    const UserProperty = useMemo(() => {
        if (!user || !properties) return [];
        return properties.filter(property => user.owner === properties._id);
    }, [properties, user]);
    console.log(UserProperty.length)
      


    useEffect(() => {
        if (!properties || properties.length === 0) {
            dispatch(getAllProperty());
        }
    }, []);

  return (
    <motion.div
        className="bg-gray-50 min-h-screen font-sans px-6 p-4 sm:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <Navbar bgcolor='#CC0066'/>
      <div className="max-w-7xl mx-auto">
        <motion.header variants={itemVariants} className="flex mt-24 flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
                <p className="text-gray-600 mt-1">View, manage, and edit all your listings in one place.</p>
            </div>
            <Link 
                to="/owner/listing"
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-pink-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-pink-700 transition-colors"
            >
                <FiPlus />
                List New Property
            </Link>
        </motion.header>

        <main>
            {UserProperty ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {UserProperty.map(property => (
                        <PropertyCard key={property._id} property={property} />
                        
                    ))}
                </div>
            ) : (
                <motion.div variants={itemVariants} className="text-center py-20 px-6 bg-white rounded-xl border border-dashed">
                    <FiHome className="mx-auto text-5xl text-gray-300" />
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">You haven't listed any properties yet.</h3>
                    <p className="mt-2 text-gray-500">Start by listing your first property to attract buyers and tenants.</p>
                    <Link 
                        to="/owner/list-property"
                        className="mt-6 inline-block bg-pink-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-pink-700 transition-colors"
                    >
                        List Your First Property
                    </Link>
                </motion.div>
            )}
        </main>
      </div>
    </motion.div>
  );
}

export default OwnerProperties;
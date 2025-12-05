import React from 'react';
import { FiMapPin, FiCheckCircle } from 'react-icons/fi';

const propertiesData = [
  { id: 1, imageSrc: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', tags: ['Flat', '2&3BHK'], title: '2BHK Flat in Matigara', builder: 'by Renka International Pvt Ltd', isVerified: true, location: 'Thanisandra, Bangalore', priceRange: '₹2Cr-₹5Cr' },
  { id: 2, imageSrc: 'https://images.unsplash.com/photo-1570129477492-45c003edd2e0?auto=format&fit=crop&w=800&q=80', tags: ['Flat', '2&3BHK'], title: '2BHK Flat in Matigara', builder: 'by Renka International Pvt Ltd', isVerified: true, location: 'Thanisandra, Bangalore', priceRange: '₹2Cr-₹5Cr' },
  { id: 3, imageSrc: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80', tags: ['Flat', '2&3BHK'], title: '2BHK Flat in Matigara', builder: 'by Renka International Pvt Ltd', isVerified: true, location: 'Thanisandra, Bangalore', priceRange: '₹2Cr-₹5Cr' },
  { id: 4, imageSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', tags: ['Flat', '2&3BHK'], title: '2BHK Flat in Matigara', builder: 'by Renka International Pvt Ltd', isVerified: true, location: 'Thanisandra, Bangalore', priceRange: '₹2Cr-₹5Cr' },
  { id: 5, imageSrc: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80', tags: ['Flat', '2&3BHK'], title: '2BHK Flat in Matigara', builder: 'by Renka International Pvt Ltd', isVerified: true, location: 'Thanisandra, Bangalore', priceRange: '₹2Cr-₹5Cr' },
  { id: 6, imageSrc: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80', tags: ['Flat', '2&3BHK'], title: '2BHK Flat in Matigara', builder: 'by Renka International Pvt Ltd', isVerified: true, location: 'Thanisandra, Bangalore', priceRange: '₹2Cr-₹5Cr' },
  { id: 7, imageSrc: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', tags: ['Flat', '2&3BHK'], title: '2BHK Flat in Matigara', builder: 'by Renka International Pvt Ltd', isVerified: true, location: 'Thanisandra, Bangalore', priceRange: '₹2Cr-₹5Cr' },
  { id: 8, imageSrc: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', tags: ['Flat', '2&3BHK'], title: '2BHK Flat in Matigara', builder: 'by Renka International Pvt Ltd', isVerified: true, location: 'Thanisandra, Bangalore', priceRange: '₹2Cr-₹5Cr' },
  { id: 9, imageSrc: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80', tags: ['Flat', '2&3BHK'], title: '2BHK Flat in Matigara', builder: 'by Renka International Pvt Ltd', isVerified: true, location: 'Thanisandra, Bangalore', priceRange: '₹2Cr-₹5Cr' },
];

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-gray-900/40 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Image */}
        <div className="relative">
          <img
            loading="lazy"
            src={property.imageSrc}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 flex space-x-2">
            {property.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 truncate">{property.title}</h3>

          <div className="flex flex-wrap items-center mt-1 text-xs gap-2">
            <p className="text-gray-500 truncate">{property.builder}</p>

            {property.isVerified && (
              <span className="bg-pink-100 text-[#E11D48] text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                <FiCheckCircle className="text-xs" />
                <span>Verified</span>
              </span>
            )}

            <p className="text-lg font-bold text-pink-600 ml-auto">{property.priceRange}</p>
          </div>

          {/* Location + Button */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-600">
              <FiMapPin className="mr-2 text-pink-600" />
              <span>{property.location}</span>
            </div>
            <button className="px-6 bg-pink-600 text-white font-bold py-2.5 rounded-full hover:bg-pink-700 transition-colors">
              Contact Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedPropertyinRegion = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-3xl font-bold mb-12 text-gray-800">
          Featured Properties in Patna
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertiesData.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyinRegion;

import React from 'react';
import { FiMapPin } from 'react-icons/fi';

const propertiesData = [
  {
    id: 1,
    imageSrc:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1974&q=80',
    tag: 'Flat',
    name: 'Ranka Ankura',
    builder: 'by Renka International Pvt Ltd',
    price: '₹30k',
    period: '/Month',
    location: 'Thanisandra, Bangalore',
    bhk: '2&3BHK',
  },
  {
    id: 2,
    imageSrc:
      'https://images.unsplash.com/photo-1622015663319-e97e697503ee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1377',
    tag: 'Flat',
    name: 'Ranka Ankura',
    builder: 'by Renka International Pvt Ltd',
    price: '₹30k',
    period: '/Month',
    location: 'Thanisandra, Bangalore',
    bhk: '2&3BHK',
  },
  {
    id: 3,
    imageSrc:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=2070&q=80',
    tag: 'Flat',
    name: 'Ranka Ankura',
    builder: 'by Renka International Pvt Ltd',
    price: '₹30k',
    period: '/Month',
    location: 'Thanisandra, Bangalore',
    bhk: '2&3BHK',
  },
  {
    id: 4,
    imageSrc:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2070&q=80',
    tag: 'Flat',
    name: 'Ranka Ankura',
    builder: 'by Renka International Pvt Ltd',
    price: '₹30k',
    period: '/Month',
    location: 'Thanisandra, Bangalore',
    bhk: '2&3BHK',
  },
  {
    id: 5,
    imageSrc:
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=2070&q=80',
    tag: 'Flat',
    name: 'Ranka Ankura',
    builder: 'by Renka International Pvt Ltd',
    price: '₹30k',
    period: '/Month',
    location: 'Thanisandra, Bangalore',
    bhk: '2&3BHK',
  },
  {
    id: 6,
    imageSrc:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2070&q=80',
    tag: 'Flat',
    name: 'Ranka Ankura',
    builder: 'by Renka International Pvt Ltd',
    price: '₹30k',
    period: '/Month',
    location: 'Thanisandra, Bangalore',
    bhk: '2&3BHK',
  },
];

// const DottedLine = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="1440"
//     height="1263"
//     viewBox="0 0 1440 1263"
//     fill="none"
//     className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-auto pointer-events-none z-0"
//     style={{ maxWidth: '1440px' }}
//   >
//     <path
//       d="M1513.53 1261.2C1496.94 1207.78 1403.05 1123.1 1298.6 1052.93C1194.14 982.763 1080.26 924.414 970.38 870.877C860.5 817.339 749.941 765.979 640.057 702.878C530.173 639.778 418.098 561.395 355.481 490.978C312.426 442.541 293.207 398.866 231.567 347.972C175.785 301.926 101.288 263.246 32.5091 226.429C-36.2695 189.611 -113.309 144.898 -156.613 100.129C-200.566 54.6758 -191.722 25.2925 -152.148 22.8258C-112.574 20.3591 -48.9515 39.4064 15.1139 62.1212C79.1792 84.8359 146.482 111.747 205.185 127.494C263.888 143.241 314.503 146.371 322.178 122.128C329.854 97.8851 281.158 40.6173 211.552 1.70115"
//       stroke="white"
//       strokeWidth="2"
//       strokeMiterlimit="10"
//       strokeLinecap="round"
//       strokeDasharray="6.3 11.82"
//       opacity="0.2"
//     />
//   </svg>
// );

const Exploreneighbour = () => {
  return (
    <div className="bg-[#0B3462] py-20 px-4 sm:px-6 lg:px-8 font-sans rounded-4xl relative overflow-hidden">
      {/* <DottedLine /> */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Explore Neighbourhood - Thanisandra
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {propertiesData.map((property) => (
            <div
              key={property.id}
              className="bg-blue-800/30 p-2 rounded-2xl group transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full">
                <div className="relative">
                  <img
                    loading="lazy"
                    className="w-full h-56 object-cover"
                    src={property.imageSrc}
                    alt={property.name}
                  />
                  <div className="absolute top-4 left-4 bg-gray-100/80 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {property.tag}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {property.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {property.builder}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-pink-600">
                      {property.price}
                      <span className="text-sm font-medium text-gray-500">
                        {property.period}
                      </span>
                    </p>
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-600">
                      <FiMapPin className="mr-2 text-pink-600" />
                      <span>{property.location}</span>
                    </div>
                    <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {property.bhk}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exploreneighbour;

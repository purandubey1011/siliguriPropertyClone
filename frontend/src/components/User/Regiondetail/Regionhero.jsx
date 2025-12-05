import React, { useState } from 'react';
import { FiMapPin, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const backgroundImageUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80';

const VerifiedToggle = () => {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <button
      onClick={() => setIsChecked(!isChecked)}
      className="flex items-center justify-between bg-white text-pink-700 font-semibold rounded-lg px-4 py-2 w-full h-full text-sm"
    >
      <span>Verified</span>
      <div
        className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
          isChecked ? 'bg-pink-100' : 'bg-gray-200'
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            isChecked ? 'translate-x-4 bg-pink-600' : 'bg-gray-400'
          }`}
        ></div>
      </div>
    </button>
  );
};

const Regionhero = () => {
  return (
    <div
      className="relative min-h-screen bg-cover pt-10 md:pt-0 bg-center font-sans flex flex-col"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <main className="relative z-10 flex flex-col items-center justify-center flex-grow text-center text-white px-4 py-16">
        {/* Tag */}
        <div className="bg-[#FFFFFF80] border border-[#FFFFFF] backdrop-blur-sm rounded-full px-5 py-2 text-sm font-semibold mb-4">
          4 Places Available
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
          Patna / Bihar
        </h1>

        {/* Search Box */}
        <div className="mt-10 lg:mt-12 w-full max-w-4xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-full p-4 sm:p-2 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-1 shadow-2xl">
            
            {/* Location Input */}
            <div className="w-full sm:flex-1 flex items-center px-2 sm:px-4">
              <FiMapPin className="text-gray-400 mr-3 text-xl" />
              <div className="w-full text-left">
                <label className="text-xs text-gray-500">Location in Patna</label>
                <input
                  type="text"
                  defaultValue="Bihar, Patna"
                  className="w-full text-sm font-semibold text-gray-800 bg-transparent border-none focus:ring-0 p-0"
                />
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-200 sm:hidden"></div>

            {/* Property Type */}
            <div className="w-full sm:flex-1 flex items-center px-2 sm:px-4 relative">
              <div className="w-full text-left">
                <label className="text-xs text-gray-500">Property Type</label>
                <select className="w-full text-sm font-semibold text-gray-800 bg-transparent border-none focus:ring-0 p-0 appearance-none cursor-pointer">
                  <option>Flat</option>
                  <option>House</option>
                </select>
              </div>
              <FiChevronDown className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="w-full h-[1px] bg-gray-200 sm:hidden"></div>

            {/* BHK Type */}
            <div className="w-full sm:flex-1 flex items-center px-2 sm:px-4 relative">
              <div className="w-full text-left">
                <label className="text-xs text-gray-500">BHK Type</label>
                <select className="w-full text-sm font-semibold text-gray-800 bg-transparent border-none focus:ring-0 p-0 appearance-none cursor-pointer">
                  <option>1 BHK</option>
                  <option>2 BHK</option>
                </select>
              </div>
              <FiChevronDown className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Search Button */}
            <button className="w-full sm:w-auto bg-pink-600 text-white rounded-xl sm:rounded-full px-8 py-4 sm:py-3 text-base font-semibold hover:bg-pink-700 transition-colors flex-shrink-0">
              Search Now
            </button>
          </div>

          {/* Filters Row */}
          <div className="mt-6 w-full mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <button className="bg-white text-pink-700 font-semibold rounded-lg px-4 py-2 flex items-center justify-between text-sm">
              <span>₹0 - ₹15Cr</span>
              <FiChevronUp className="text-pink-700" />
            </button>

            <button className="bg-black/20 border border-white/30 text-white font-medium rounded-lg px-4 py-2 flex items-center justify-between hover:bg-black/30 text-sm">
              <span>Posted By</span>
              <FiChevronDown />
            </button>

            <button className="bg-black/20 border border-white/30 text-white font-medium rounded-lg px-4 py-2 flex items-center justify-between hover:bg-black/30 text-sm">
              <span>Purpose</span>
              <FiChevronDown />
            </button>

            <button className="bg-black/20 border border-white/30 text-white font-medium rounded-lg px-4 py-2 flex items-center justify-between hover:bg-black/30 text-sm">
              <span>Size</span>
              <FiChevronDown />
            </button>

            <div className="col-span-1">
              <VerifiedToggle />
            </div>

            <button className="bg-black/20 border border-white/30 text-white font-medium rounded-lg px-4 py-2 flex items-center justify-between hover:bg-black/30 text-sm">
              <span>Availability</span>
              <FiChevronDown />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Regionhero;

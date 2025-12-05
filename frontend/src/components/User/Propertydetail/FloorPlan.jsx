import React, { useState } from 'react';
import { BsTextareaResize } from 'react-icons/bs';
import { FiTag, FiDownload } from 'react-icons/fi';
import { RiBuildingLine } from 'react-icons/ri';

const floorPlans = [
  {
    type: '2 BHK',
    title: 'Type A - 2 Bedrooms',
    image: 'https://plus.unsplash.com/premium_photo-1682377521720-3a43955c8329?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1166',
    specs: [
      { icon: <BsTextareaResize />, label: 'Carpet Area', value: '850 sq.ft' },
      { icon: <RiBuildingLine />, label: 'Super Built-up Area', value: '1100 sq.ft' },
      { icon: <FiTag />, label: 'Starting Price', value: '₹ 85 Lacs' },
    ],
  },
  {
    type: '3 BHK',
    title: 'Type B - 3 Bedrooms',
    image: 'https://plus.unsplash.com/premium_photo-1682377521720-3a43955c8329?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1166',
    specs: [
      { icon: <BsTextareaResize />, label: 'Carpet Area', value: '1150 sq.ft' },
      { icon: <RiBuildingLine />, label: 'Super Built-up Area', value: '1500 sq.ft' },
      { icon: <FiTag />, label: 'Starting Price', value: '₹ 1.2 Cr' },
    ],
  },
  {
    type: '4 BHK',
    title: 'Type C - 4 Bedrooms',
    image: 'https://plus.unsplash.com/premium_photo-1682377521720-3a43955c8329?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1166',
    specs: [
      { icon: <BsTextareaResize />, label: 'Carpet Area', value: '1600 sq.ft' },
      { icon: <RiBuildingLine />, label: 'Super Built-up Area', value: '2100 sq.ft' },
      { icon: <FiTag />, label: 'Starting Price', value: '₹ 1.8 Cr' },
    ],
  },
];

const tabs = ['2 BHK', '3 BHK', '4 BHK'];

const SpecItem = ({ icon, label, value }) => (
  <div className="bg-pink-50/60 p-4 rounded-lg flex items-center space-x-4">
    <div className="text-pink-600 text-2xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const FloorPlans = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const activePlan = floorPlans.find((plan) => plan.type === activeTab);

  return (
    <div className="bg-gray-50 font-sans py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Floor Plans
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Explore our thoughtfully designed floor plans, crafted to maximize space, comfort, and natural light.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                // onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-full relative ${
                  activeTab === tab
                    ? 'bg-pink-600 text-white'
                    : 'text-gray-600 hover:bg-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Floor Plan Image */}
          <div className="bg-gray-100 p-4 rounded-2xl">
            <img
              src={activePlan.image}
              alt={`${activePlan.title} Floor Plan`}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          {/* Right Side: Details */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {activePlan.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {activePlan.specs.map((spec, index) => (
                <SpecItem
                  key={index}
                  icon={spec.icon}
                  label={spec.label}
                  value={spec.value}
                />
              ))}
            </div>

            <button className="mt-4 w-full sm:w-auto bg-[#D10369] text-white font-bold py-3 px-8 rounded-full flex items-center justify-center space-x-2 hover:bg-pink-700 transition-colors shadow-lg">
              <FiDownload />
              <span>Download Brochure</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlans;

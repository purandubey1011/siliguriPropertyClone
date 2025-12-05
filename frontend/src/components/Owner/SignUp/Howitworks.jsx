import React from 'react';
import { FiEdit, FiCamera, FiCheckCircle, FiHeart } from 'react-icons/fi';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FiEdit />,
      title: 'Add Property Details',
      description:
        'Fill out a simple form with your property’s location, size, price, and amenities.',
    },
    {
      icon: <FiCamera />,
      title: 'Upload Photos & Videos',
      description:
        'Showcase your property with high-quality images and a video tour to attract more viewers.',
    },
    {
      icon: <FiCheckCircle />,
      title: 'Get Verified Leads',
      description:
        'Receive inquiries from genuine buyers and tenants directly in your dashboard.',
    },
    {
      icon: <FiHeart />,
      title: 'Finalize Your Deal',
      description:
        'Connect with interested parties, schedule visits, and close the deal without any brokers.',
    },
  ];

  return (
    <div className="py-20 px-2 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-16">
          Simple Steps to Rent or Sell
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center text-2xl text-white bg-pink-600 w-12 h-12 rounded-full mx-auto mb-4 font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;

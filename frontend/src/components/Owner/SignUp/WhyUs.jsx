import React from 'react';
import { FiShield, FiThumbsUp, FiTrendingUp, FiUsers } from 'react-icons/fi';

const WhyUsSection = () => {
  const features = [
    {
      icon: <FiShield />,
      title: 'Zero Brokerage',
      description:
        'Save thousands on commissions by connecting with buyers and tenants directly.',
    },
    {
      icon: <FiUsers />,
      title: 'Verified Leads',
      description:
        'We verify every profile to ensure you only get genuine, high-intent inquiries.',
    },
    {
      icon: <FiThumbsUp />,
      title: 'Free Listing',
      description:
        'List your property in minutes with no hidden fees or charges. It’s completely free.',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Expert Assistance',
      description:
        'Our dedicated team provides support at every step, from listing to closing the deal.',
    },
  ];

  return (
    <div className="py-20 px-2 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Why List Your Property with GFS Realtors?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 bg-white rounded-xl shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 text-pink-600 rounded-full mb-4 text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUsSection;

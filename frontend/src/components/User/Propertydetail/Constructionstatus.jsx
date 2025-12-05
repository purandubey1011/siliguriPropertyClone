import React, { useEffect, useState } from 'react';
import { FiMap } from 'react-icons/fi';

const phasesData = [
  {
    title: 'Phase 1',
    description: 'Under construction completion in July 2025',
  },
  // {
  //   title: 'Phase 2',
  //   description: 'New launch completion in Dec, 2030',
  // },
  // {
  //   title: 'Phase 3',
  //   description: 'New launch completion in April, 2031',
  // },
];

const StatusCard = ({ phase }) => {
  return (
    <div className="bg-[#FBFBFB] p-6 rounded-xl space-y-4 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300">
      <FiMap className="w-7 h-7 text-[#D10369]" strokeWidth={2} />
      <h3 className="text-2xl font-bold text-gray-900">{phase.title}</h3>
      <p className="text-gray-600">{phase.description}</p>
    </div>
  );
};

const ConstructionStatus = () => {

  
  return (
    <div className="bg-gray-50 font-sans py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Construction Status
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {phasesData.map((phase, index) => (
            <StatusCard key={index} phase={phase} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConstructionStatus;

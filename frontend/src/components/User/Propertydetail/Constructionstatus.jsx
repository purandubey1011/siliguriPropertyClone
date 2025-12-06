import React from 'react';
import { FiMap } from 'react-icons/fi';

// ------------------
// Helper: Format Possession Date
// ------------------
const formatPossessionDate = (isoDate) => {
  if (!isoDate) return "Date not available";

  const date = new Date(isoDate);
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
};

// ------------------
// Status Card Component
// ------------------
const StatusCard = ({ phase }) => {
  return (
    <div className="bg-[#FBFBFB] p-6 rounded-xl space-y-3 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300">
      <FiMap className="w-7 h-7 text-[#D10369]" strokeWidth={2} />
      <h3 className="text-2xl font-bold text-gray-900">{phase.title}</h3>
      <p className="text-gray-600">{phase.description}</p>
    </div>
  );
};

// ------------------
// MAIN COMPONENT
// ------------------
const ConstructionStatus = ({ filteredProperty }) => {
  console.log("ConstructionStatus - filteredProperty:", filteredProperty);

  // Prepare dynamic phase data
  const formattedDate = formatPossessionDate(filteredProperty?.dateOfPossession);
  console.log('xxxxxxxxx',filteredProperty?.typeOfPossession)

  const phasesData = [
    {
      title: "Phase 1",
      description: `Completion in ${formattedDate}`,
    },
  ];

  return (
    <div className="bg-gray-50 font-sans py-16 sm:py-24 lg:py-0 border-b pb-5 border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-1">
        
        {/* Section Title */}
        <div className="mb-5">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Construction Status
          </h1>
        </div>

        {/* Cards */}
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

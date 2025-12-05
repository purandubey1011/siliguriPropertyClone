import React from "react";
import { RiBankLine, RiTrainLine } from "react-icons/ri";

// --- Static data for the location advantages ---
const advantagesData = [
  {
    icon: "hospital", // Custom 'H' icon
    title: "Desun Hospital",
    distance: "3.1 KM",
  },
  {
    icon: <RiBankLine />,
    title: "Bangalore University",
    distance: "3.1 KM",
  },
  {
    icon: <RiTrainLine />,
    title: "City Metro",
    distance: "3.1 KM",
  },
];



// --- Main LocationAdvantages Component ---
const LocationAdvantages = ({locationAdvantages}) => {
  console.log('locationAdvantages ->',locationAdvantages);
  // data format is - [{no icon, title: "Desun Hospital", range: "3.1 KM"}, {...}, ...]
  // shivam map thi data properly with icon

  // --- Single Card Component ---
const AdvantageCard = ({ icon, title, distance }) => {
  const renderIcon = () => {
    if (icon === "hospital") {
      return (
        <div className="w-8 h-8 rounded-full border-2 border-[#D10369] text-[#D10369] flex items-center justify-center font-bold text-lg">
          H
        </div>
      );
    }
    return <div className="text-[#D10369] text-3xl">{icon}</div>;
  };

  return (
    <div className="bg-[#FFF9FB] p-6 rounded-2xl space-y-4 hover:shadow-md transition-all">
      {renderIcon()}
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p>
        <span className="text-2xl font-bold text-[#D10369]">{distance}</span>
        <span className="text-sm text-gray-500 ml-1.5">away</span>
      </p>
    </div>
  );
};

  return (
    <div className="bg-gray-50 font-sans py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Location Advantages
          </h1>
          <p className="mt-2 text-gray-600">
            Matiga is one of the prime locations to buy a home in Siliguri
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantagesData.map((advantage, index) => (
            <AdvantageCard
              key={index}
              icon={advantage.icon}
              title={advantage.title}
              distance={advantage.distance}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationAdvantages;

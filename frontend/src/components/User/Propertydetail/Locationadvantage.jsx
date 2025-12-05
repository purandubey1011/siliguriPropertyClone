import React from "react";
import {
  RiBankLine,
  RiTrainLine,
  RiHospitalLine,
  RiBusLine,
  RiBuildingLine,
  RiRoadMapLine,
  RiMapPinLine,
  RiFlightTakeoffLine,
} from "react-icons/ri";

// -------- ICON AUTO-DETECT FUNCTION --------
const detectIcon = (title) => {
  const text = title.toLowerCase();

  if (text.includes("hospital") || text.includes("clinic"))
    return <RiHospitalLine />;

  if (text.includes("bank")) return <RiBankLine />;

  if (text.includes("metro") || text.includes("train") || text.includes("rail"))
    return <RiTrainLine />;

  if (text.includes("bus")) return <RiBusLine />;

  if (text.includes("university") || text.includes("school") || text.includes("college"))
    return <RiBuildingLine />;

  if (text.includes("airport")) return <RiFlightTakeoffLine />;

  if (text.includes("mall") || text.includes("market"))
    return <RiMapPinLine />;

  if (text.includes("road") || text.includes("highway"))
    return <RiRoadMapLine />;

  // DEFAULT ICON
  return <RiMapPinLine />;
};

// ---------------------------------------------------
const LocationAdvantages = ({ locationAdvantages = [] }) => {

  const AdvantageCard = ({ icon, title, distance }) => {
    return (
      <div className="bg-[#FFF9FB] p-6  space-y-4 hover:shadow-md transition-all border rounded-2xl border-pink-300">
        <div className="text-[#D10369] text-3xl">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-800 capitalize">{title}</h3>
        <p>
          <span className="text-2xl font-bold text-[#D10369]">{distance}</span>
          <span className="text-md text-gray-500 ml-1.5">away</span>
        </p>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 font-sans py-16 sm:py-24 lg:py-7">
      <div className="container mx-auto px-4 sm:px-6 lg:px-1">
        {/* Section Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Location Advantages
          </h1>
          <p className="mt-2 text-gray-600">
            Matiga is one of the prime locations to buy a home in Siliguri
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {locationAdvantages.length > 0 ? (
            locationAdvantages.map((adv, index) => (
              <AdvantageCard
                key={index}
                icon={detectIcon(adv.title)}
                title={adv.title}
                distance={adv.range || adv.distance}
              />
            ))
          ) : (
            <p>No location advantages found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationAdvantages;

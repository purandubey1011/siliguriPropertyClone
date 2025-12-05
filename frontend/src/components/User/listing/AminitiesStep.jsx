import { FiPlus } from "react-icons/fi";
import { Checkbox, FormField } from "./Listingform";


const AmenitiesStep = ({ 
  data,
  handleChange,
  handleAmenityChange,
  customAmenityInput,
  onCustomAmenityChange,
  onAddCustomAmenity,
  customAmenities,
  errors
}) => {
  const amenitiesList = [
  "Lift",
  "Car Parking",
  "Power Backup",
  "Water Supply",
  "Security",
  "Gymnasium",
  "Swimming Pool",
  "Clubhouse",
  "Gas Pipeline",
  "Park",
  "Servant Room",
  "AC",
  "Water Storage",
  "Air Conditioned",
  "Banquet Hall",
  "Conference Room",
  "Intercom Facility",
  "Internet/Wi-Fi Connectivity",
  "Jogging and Strolling Track",
  "Maintenance Staff",
  "Outdoor Tennis Courts",
  "Private Garage",
  "Private Terrace/Garden",
  "Rainwater Harvesting",
  "Reserved Parking",
  "Vaastu Compliant",
  "Visitor Parking",
  "Waste Disposal",
  "Wrap Around Balcony"
];

  return (
    <> 
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-4">
        {amenitiesList.map((amenity) => (
          <Checkbox
            key={amenity}
            id={amenity}
            label={amenity}
            checked={!!data.amenities[amenity]}
            onChange={handleAmenityChange}
          />
        ))}
        {customAmenities.map((amenity) => (
          <Checkbox
            key={amenity}
            id={amenity}
            label={amenity}
            checked={!!data.amenities[amenity]}
            onChange={handleAmenityChange}
          />
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          {" "}
          Add Custom Amenity{" "}
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={customAmenityInput}
            onChange={onCustomAmenityChange}
            placeholder="e.g., Rooftop Garden"
            className="flex-grow bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          
          <button
            type="button"
            onClick={onAddCustomAmenity}
            className="bg-pink-100 text-pink-600 font-semibold rounded-lg p-2.5 inline-flex items-center justify-center transition-colors hover:bg-pink-200"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AmenitiesStep;
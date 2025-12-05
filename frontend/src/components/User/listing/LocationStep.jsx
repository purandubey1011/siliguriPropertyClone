import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { FormField } from "./Listingform";
import { FiMap } from "react-icons/fi";
import { useState } from "react";

const LocationStep = ({ data, handleChange, setFormData, errors }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [markerPosition, setMarkerPosition] = useState(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMapCenter({ lat, lng });
      setMarkerPosition({ lat, lng });
    }
  };

  // -----------------------------
  // LOCATION ADVANTAGES HANDLERS
  // -----------------------------

  const handleAdvantageChange = (index, field, value) => {
    const updated = data.locationAdvantages.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );

    setFormData((prev) => {
      const newData = { ...prev, locationAdvantages: updated };
      localStorage.setItem("propertyFormData", JSON.stringify(newData));
      return newData;
    });
  };

  const addAdvantage = () => {
    const updated = [...data.locationAdvantages, { title: "", range: "" }];

    setFormData((prev) => {
      const newData = { ...prev, locationAdvantages: updated };
      localStorage.setItem("propertyFormData", JSON.stringify(newData));
      return newData;
    });
  };

  const removeAdvantage = (index) => {
    const updated = data.locationAdvantages.filter((_, i) => i !== index);

    setFormData((prev) => {
      const newData = { ...prev, locationAdvantages: updated };
      localStorage.setItem("propertyFormData", JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Address */}
        <FormField label="Address / Street" error={errors?.address}>
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors?.address ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </FormField>

        {/* City */}
        <FormField label="City" error={errors?.city}>
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors?.city ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </FormField>

        {/* State */}
        <FormField label="State" error={errors?.state}>
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors?.state ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </FormField>

        {/* Pincode */}
        <FormField label="Pincode" error={errors?.pincode}>
          <input
            type="text"
            name="pincode"
            value={data.pincode}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors?.pincode ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </FormField>

        {/* ------------------------------------------- */}
        {/* LOCATION ADVANTAGES (DYNAMIC FIELDS)        */}
        {/* ------------------------------------------- */}
        <div className="mt-6 md:col-span-2">
          <h3 className="text-md font-medium mb-3 text-gray-500">
            Location Advantages
          </h3>

          {data.locationAdvantages.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4"
            >
              <FormField label="Advantage Title">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    handleAdvantageChange(index, "title", e.target.value)
                  }
                  placeholder="e.g., Near Airport, Near School"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
                             focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </FormField>

              <FormField label="Distance (km)">
                <input
                  type="number"
                  value={item.range}
                  onChange={(e) =>
                    handleAdvantageChange(index, "range", e.target.value)
                  }
                  placeholder="e.g., 2"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
                             focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </FormField>

              <button
                type="button"
                onClick={() => removeAdvantage(index)}
                className="text-red-600 border border-red-400 px-3 py-2 rounded-lg hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addAdvantage}
            className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            + Add More Advantage
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;

import React, { useState, useEffect, useRef } from "react";
import { MapPin, ChevronDown, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Homehero = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [formData, setFormData] = useState({
    location: "",
    propertyType: "Flat",
    bedrooms: "1BHK",
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const locationInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Load user preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        if (preferences.activeTab) setActiveTab(preferences.activeTab);
        if (preferences.formData) setFormData(preferences.formData);
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    }
    setIsAnimated(true);
  }, []);

  // Save user preferences to localStorage whenever they change
  useEffect(() => {
    const preferences = {
      activeTab,
      formData,
    };
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [activeTab, formData]);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (formData.location.trim().length < 1) {
      setLocationSuggestions([]);
      return;
    }

    // Debounce API call by 300ms
    debounceTimerRef.current = setTimeout(() => {
      fetchLocationSuggestions(formData.location);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [formData.location]);

  const fetchLocationSuggestions = async (query) => {
    setIsLoadingLocations(true);
    try {
      // Using OpenStreetMap Nominatim API for location autocomplete
      // This is free and doesn't require an API key
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=8&addressdetails=1`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const suggestions = data.map((item) => ({
          display_name: item.display_name,
          name: item.name,
          type: item.type,
          lat: item.lat,
          lon: item.lon,
        }));
        setLocationSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocationSuggestions([]);
    } finally {
      setIsLoadingLocations(false);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
    setShowSuggestions(true);
  };

  const handleLocationSelect = (suggestion) => {
    setFormData({ ...formData, location: suggestion.display_name });
    setShowSuggestions(false);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log("Form submitted:", { ...formData, transactionType: activeTab });

    // Show alert with form data
    //     alert(`Search Parameters:
    // Action: ${activeTab}
    // Location: ${formData.location || 'Not specified'}
    // Property Type: ${formData.propertyType}
    // BHK: ${formData.bhk}`);

    navigate(
      `/user/list?propertyType=${activeTab}&location=${encodeURIComponent(
        formData.location
      )}&type=${formData.propertyType}&bhk=${formData.bedrooms}`
    );
  };
  console.log(formData.bedrooms);

 const getBhkOptions = (type) => {
  switch (type) {
    case "Office":
      return [
        { optvalue: "Open Desk", label: "Open Desk" },
        { optvalue: "1 Cabin", label: "1 Cabin" },
        { optvalue: "2 Cabins", label: "2 Cabins" },
        { optvalue: "3+ Cabins", label: "3+ Cabins" },
      ];
    case "Plot":
      return [
        { optvalue: "0-500 sq.ft", label: "0-500 sq.ft" },
        { optvalue: "500-1000 sq.ft", label: "500-1000 sq.ft" },
        { optvalue: "1000-1500 sq.ft", label: "1000-1500 sq.ft" },
        { optvalue: "1500+ sq.ft", label: "1500+ sq.ft" },
      ];
    default:
      return [
        { optvalue: 1, label: "1BHK" },
        { optvalue: 2, label: "2BHK" },
        { optvalue: 3, label: "3BHK" },
        { optvalue: 4, label: "4BHK" },
        { optvalue: 5, label: "4BHK+" },
      ];
  }
};


  const bhkOptions = getBhkOptions(formData.propertyType);

  const handlePropertyTypeChange = (e) => {
    const newType = e.target.value;
    console.log(newType);
    const options = getBhkOptions(newType);
    setFormData((prev) => ({
      ...prev,
      propertyType: newType,
      bhk: options[0],
    }));
  };

  return (
    <div
      className="relative h-[97vh] sm:max-h-[95vh] m-4 sm:m-6 rounded-3xl bg-cover bg-center font-sans "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1723110994499-df46435aa4b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1179')`,
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 rounded-3xl bg-pink-800/10" />

      <main className="relative z-10 flex flex-col items-center justify-center h-full min-h-screen py-16 lg:py-16 px-4 text-center text-white">
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl font-bold  drop-shadow-lg transition-all duration-1000 `}
        >
          Find <span className="text-[#CC0066]">Perfect</span> Place
          <br />
          To Live Life.
        </h1>

        <p
          className={`mt-5 max-w-3xl text-sm sm:text-base md:text-lg text-gray-200 font-light drop-shadow-md transition-all duration-1000 delay-200 `}
        >
          From luxurious city apartments to peaceful countryside retreats,
          explore our featured properties designed to match your lifestyle, meet
          your dreams, and offer comfort and quality.
        </p>

        <div className="mt-8 lg:mt-8 w-full max-w-4xl">
          <div
            className={`flex items-center justify-center flex-wrap gap-2 mb-10 transition-all duration-1000 delay-400 `}
          >
            {["Buy", "Rent", "Lease", "Sell"].map((tab, index) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#CC0066] text-white scale-105 shadow-lg"
                    : "bg-white/10 text-white hover:bg-black/50"
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            className={`bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-full p-4 lg:p-2 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-1 shadow-2xl w-full transition-all duration-1000 delay-700 `}
          >
            {/* Location Input with Autocomplete */}
            <div className="w-full lg:flex-1 flex items-center px-2 lg:px-4 relative">
              <div className="w-full text-left" ref={locationInputRef}>
                <label className="text-xs text-gray-500 font-medium">
                  Location
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter a location..."
                    value={formData.location}
                    onChange={handleLocationChange}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                    className="w-full text-sm font-semibold text-gray-800 bg-transparent border-none focus:outline-none p-0"
                  />
                  {/* {isLoadingLocations ? (
                    <Loader2
                      className="text-gray-400 animate-spin flex-shrink-0"
                      size={20}
                    />
                  ) : (
                    <MapPin className="text-gray-400 flex-shrink-0" size={20} />
                  )} */}
                   <MapPin className="text-gray-400 flex-shrink-0" size={20} />
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto z-50 border border-gray-200"
                  >
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleLocationSelect(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors text-sm border-b border-gray-100 last:border-b-0 flex items-start gap-2"
                      >
                        <MapPin
                          size={16}
                          className="text-gray-400 flex-shrink-0 mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-800 truncate">
                            {suggestion.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {suggestion.display_name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* No results message */}
                {showSuggestions &&
                  !isLoadingLocations &&
                  formData.location.length >= 3 &&
                  locationSuggestions.length === 0 && (
                    <div
                      ref={suggestionsRef}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 border border-gray-200 px-4 py-3"
                    >
                      <p className="text-sm text-gray-500">
                        No locations found
                      </p>
                    </div>
                  )}
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-200 lg:w-[1px] lg:h-10"></div>

            {/* Property Type Dropdown */}
            <div className="w-full lg:flex-1 flex items-center px-2 lg:px-4">
              <div className="w-full text-left">
                <label className="text-xs text-gray-500 font-medium">
                  Property Type
                </label>
                <div className="flex items-center">
                  <select
                    value={formData.propertyType}
                    onChange={handlePropertyTypeChange}
                    className="w-full text-sm font-semibold text-gray-800 bg-transparent border-none focus:outline-none p-0 appearance-none cursor-pointer"
                  >
                    <option>Flat/Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Office</option>
                    <option>Plot</option>
                    <option>Project</option>
                  </select>
                  <ChevronDown
                    className="text-gray-400 pointer-events-none flex-shrink-0"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-200 lg:w-[1px] lg:h-10"></div>

            {/* BHK / Size Dropdown (dynamic based on property type) */}
            <div className="w-full lg:flex-1 flex items-center px-2 lg:px-4">
              <div className="w-full text-left">
                <label className="text-xs text-gray-500 font-medium">BHK</label>
                <div className="flex items-center">
                  <select
                    value={formData.bedrooms}
                    onChange={(e) =>
                      setFormData({ ...formData, bedrooms: e.target.value })
                    }
                    className="w-full text-sm font-semibold text-gray-800 bg-transparent border-none focus:outline-none p-0 appearance-none cursor-pointer"
                  >
                    {bhkOptions.map((opt) => (
                      <option key={opt.label} value={opt.optvalue}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="text-gray-400 pointer-events-none flex-shrink-0"
                    size={20}
                  />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full lg:w-auto bg-[#CC0066] text-white rounded-full lg:rounded-r-full px-8 py-3 md:py-4 lg:py-3 text-base font-semibold hover:bg-pink-700 transition-colors flex-shrink-0 shadow-lg hover:shadow-xl"
            >
              Search Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homehero;

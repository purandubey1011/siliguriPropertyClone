import React, { useState, useEffect, useRef } from 'react';
import { FiMapPin, FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Loader2, MapPin } from 'lucide-react';

const Underline = () => (
  <svg className="absolute -bottom-2 left-0 w-full h-auto" viewBox="0 0 250 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="underline-path" d="M2 9.76191C28.2051 3.52841 120.2 -4.39959 248 9.76191" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);


const VerifiedToggle = () => {
    const [isChecked, setIsChecked] = useState(true);
    return (
        <button
            onClick={() => setIsChecked(!isChecked)}
            className="flex items-center justify-between bg-white text-pink-700 font-semibold rounded-lg px-4 py-2 space-x-3 w-full h-full"
        >
            <span>Verified</span>
            <div className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ${isChecked ? 'bg-pink-100' : 'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isChecked ? 'translate-x-4 bg-pink-600' : 'bg-gray-400'}`}></div>
            </div>
        </button>
    )
}

const Listhero = () => {
  const componentRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: '₹0 - ₹15Cr',
    postedBy: 'Posted By',
    purpose: 'Purpose',
    size: 'Size',
    availability: 'Availability'
  });

  const dropdownOptions = {
    priceRange: [
      '₹0 - ₹15Cr',
      '₹15Cr - ₹30Cr',
      '₹30Cr - ₹45Cr',
      '₹45Cr - ₹60Cr',
      '₹60Cr+'
    ],
    postedBy: ['Owner', 'Agent', 'Builder'],
    purpose: ['Buy', 'Rent', 'PG/Hostel'],
    size: ['0-500 sq.ft', '500-1000 sq.ft', '1000-1500 sq.ft', '1500+ sq.ft'],
    availability: ['Ready to Move', 'Under Construction']
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.filter-dropdown')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // const handleFilterClick = (filterName) => {
  //   setActiveDropdown(activeDropdown === filterName ? null : filterName);
  // };

  // const handleOptionSelect = (filterName, value) => {
  //   setFilters(prev => ({ ...prev, [filterName]: value }));
  //   setActiveDropdown(null);
  // };

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  //     tl.fromTo('.list-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
      
  //     tl.from('.underline-path', { opacity: 0, duration: 1 }, "-=0.7");
      
  //     tl.fromTo('.list-searchbar', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.7 }, "-=0.5");
  //     tl.fromTo('.list-filter', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.3");

  //   }, componentRef);
  //   return () => ctx.revert();
  // }, []);

   const [activeTab, setActiveTab] = useState('Buy');
  const [formData, setFormData] = useState({
    location: '',
    propertyType: 'Flat',
    bedrooms: '1BHK'
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
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        if (preferences.activeTab) setActiveTab(preferences.activeTab);
        if (preferences.formData) setFormData(preferences.formData);
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
    setIsAnimated(true);
  }, []);

  useEffect(() => {
    const preferences = {
      activeTab,
      formData
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [activeTab, formData]);

  useEffect(() => {

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (formData.location.trim().length < 1) {
      setLocationSuggestions([]);
      return;
    }

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
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&addressdetails=1`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const suggestions = data.map(item => ({
          display_name: item.display_name,
          name: item.name,
          type: item.type,
          lat: item.lat,
          lon: item.lon
        }));
        setLocationSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
    setShowSuggestions(true);
  };

  const handleLocationSelect = (suggestion) => {
    setFormData({ ...formData, location: suggestion.display_name });
    setShowSuggestions(false);
  };

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log('Form submitted:', { ...formData, transactionType: activeTab });
     
navigate(`/user/list?propertyType=${activeTab}&location=${encodeURIComponent(formData.location)}&type=${formData.propertyType}&bhk=${formData.bedrooms}`);
window.location.reload();
};



  const getBhkOptions = (type) => {
    switch (type) {
      case 'Office':
        return ['Open Desk', '1 Cabin', '2 Cabins', '3+ Cabins'];
      case 'Plot':
        return ['0-500 sq.ft', '500-1000 sq.ft', '1000-1500 sq.ft', '1500+ sq.ft'];
      default:
        return [{ optvalue:1, label: '1BHK'}, { optvalue:2, label: '2BHK'}, {optvalue:3, label: '3BHK'}, {optvalue:4, label: '4BHK'}, {optvalue:5, label: '4BHK+'}];
    }
  };

  const bhkOptions = getBhkOptions(formData.propertyType);

  const handlePropertyTypeChange = (e) => {
    const newType = e.target.value;
    console.log(newType)
    const options = getBhkOptions(newType);
    setFormData(prev => ({ ...prev, propertyType: newType, bhk: options[0] }));
  };

  return (
    <div ref={componentRef} className="font-sans bg-[#d9006c] pt-40  px-2 md:px-0 md:rounded-b-3xl">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-20 text-center">
        
        <h1 className="list-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-md">
          Find Your Best Place {' '}
          <span className="relative inline-block">
           For You
            <Underline />
          </span>
        </h1>

      <div className="mt-8  mx-auto lg:mt-12 w-full max-w-4xl">
          <div className={`flex items-center justify-center flex-wrap gap-2 mb-4 transition-all duration-1000 delay-400 `}>
            {['Buy', 'Rent', 'Lease' , 'Sell'].map((tab, index) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[#CC0066] text-white scale-105 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-black/50'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={`bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-full p-4 lg:p-2 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-1 shadow-2xl w-full transition-all duration-1000 delay-700 `}>
            
            {/* Location Input with Autocomplete */}
            <div className="w-full lg:flex-1 flex items-center px-2 lg:px-4 relative">
              <div className="w-full text-left" ref={locationInputRef}>
                <label className="text-xs text-gray-500 font-medium">Location</label>
                <div className='flex items-center gap-2'>
                  <input
                    type="text"
                    placeholder="Enter a location..."
                    value={formData.location}
                    onChange={handleLocationChange}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    className="w-full text-sm font-semibold text-gray-800 bg-transparent border-none focus:outline-none p-0"
                  />
                  {isLoadingLocations ? (
                    <Loader2 className="text-gray-400 animate-spin flex-shrink-0" size={20} />
                  ) : (
                    <MapPin className="text-gray-400 flex-shrink-0" size={20} />
                  )}
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
                        <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-800 truncate">{suggestion.name}</div>
                          <div className="text-xs text-gray-500 truncate">{suggestion.display_name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* No results message */}
                {showSuggestions && !isLoadingLocations && formData.location.length >= 3 && locationSuggestions.length === 0 && (
                  <div 
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 border border-gray-200 px-4 py-3"
                  >
                    <p className="text-sm text-gray-500">No locations found</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full h-[1px] bg-gray-200 lg:w-[1px] lg:h-10"></div>

            {/* Property Type Dropdown */}
            <div className="w-full lg:flex-1 flex items-center px-2 lg:px-4">
              <div className="w-full text-left">
                <label className="text-xs text-gray-500 font-medium">Property Type</label>
                <div className='flex items-center'>
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
                  <ChevronDown className="text-gray-400 pointer-events-none flex-shrink-0" size={20} />
                </div>
              </div>
            </div>
            
            <div className="w-full h-[1px] bg-gray-200 lg:w-[1px] lg:h-10"></div>

            {/* BHK / Size Dropdown (dynamic based on property type) */}
            <div className="w-full lg:flex-1 flex items-center px-2 lg:px-4">
              <div className="w-full text-left">
                <label className="text-xs text-gray-500 font-medium">BHK</label>
                <div className='flex items-center'>
                  <select 
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full text-sm font-semibold text-gray-800 bg-transparent border-none focus:outline-none p-0 appearance-none cursor-pointer"
                  >
                    {bhkOptions.map((opt) => (
                      <option key={opt.label} value={opt.optvalue}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="text-gray-400 pointer-events-none flex-shrink-0" size={20} />
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

        {/* <div className="mt-6 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="list-filter opacity-0 relative filter-dropdown">
                <button 
                    onClick={() => handleFilterClick('priceRange')}
                    className={`w-full bg-white text-pink-700 font-semibold rounded-lg px-4 py-2 flex items-center justify-between ${activeDropdown === 'priceRange' ? 'rounded-b-none' : ''}`}
                >
                    <span>{filters.priceRange}</span>
                    {activeDropdown === 'priceRange' ? <FiChevronUp className="text-pink-700"/> : <FiChevronDown className="text-pink-700"/>}
                </button>
                {activeDropdown === 'priceRange' && (
                    <div className="absolute z-50 w-full bg-white border border-gray-100 rounded-b-lg shadow-lg">
                        {dropdownOptions.priceRange.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionSelect('priceRange', option)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-pink-700"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="list-filter opacity-0 relative filter-dropdown">
                <button 
                    onClick={() => handleFilterClick('postedBy')}
                    className={`w-full bg-white/20 border border-white/30 text-white font-medium rounded-lg px-4 py-2 flex items-center justify-between hover:bg-white/30 ${activeDropdown === 'postedBy' ? 'rounded-b-none' : ''}`}
                >
                    <span>{filters.postedBy}</span>
                    {activeDropdown === 'postedBy' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {activeDropdown === 'postedBy' && (
                    <div className="absolute z-50 w-full bg-white border border-gray-100 rounded-b-lg shadow-lg">
                        {dropdownOptions.postedBy.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionSelect('postedBy', option)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-pink-700"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="list-filter opacity-0 relative filter-dropdown">
                <button 
                    onClick={() => handleFilterClick('purpose')}
                    className={`w-full bg-white/20 border border-white/30 text-white font-medium rounded-lg px-4 py-2 flex items-center justify-between hover:bg-white/30 ${activeDropdown === 'purpose' ? 'rounded-b-none' : ''}`}
                >
                    <span>{filters.purpose}</span>
                    {activeDropdown === 'purpose' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {activeDropdown === 'purpose' && (
                    <div className="absolute z-50 w-full bg-white border border-gray-100 rounded-b-lg shadow-lg">
                        {dropdownOptions.purpose.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionSelect('purpose', option)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-pink-700"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="list-filter opacity-0 relative filter-dropdown">
                <button 
                    onClick={() => handleFilterClick('size')}
                    className={`w-full bg-white/20 border border-white/30 text-white font-medium rounded-lg px-4 py-2 flex items-center justify-between hover:bg-white/30 ${activeDropdown === 'size' ? 'rounded-b-none' : ''}`}
                >
                    <span>{filters.size}</span>
                    {activeDropdown === 'size' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {activeDropdown === 'size' && (
                    <div className="absolute z-50 w-full bg-white border border-gray-100 rounded-b-lg shadow-lg">
                        {dropdownOptions.size.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionSelect('size', option)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-pink-700"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="list-filter opacity-0 col-span-2 sm:col-span-1">
              <VerifiedToggle />
            </div>

            <div className="list-filter opacity-0 lg:hidden col-span-2 sm:col-span-1 relative filter-dropdown">
                <button 
                    onClick={() => handleFilterClick('availability')}
                    className={`w-full bg-white/20 border border-white/30 text-white font-medium rounded-lg px-4 py-2 flex items-center justify-between hover:bg-white/30 ${activeDropdown === 'availability' ? 'rounded-b-none' : ''}`}
                >
                    <span>{filters.availability}</span>
                    {activeDropdown === 'availability' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {activeDropdown === 'availability' && (
                    <div className="absolute z-50 w-full bg-white border border-gray-100 rounded-b-lg shadow-lg">
                        {dropdownOptions.availability.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionSelect('availability', option)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-pink-700"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div> */}
      </div>
    </div>
  );
};

export default Listhero;
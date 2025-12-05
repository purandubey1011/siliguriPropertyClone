import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FiCheck, FiChevronDown, FiX } from "react-icons/fi";
import { getFilteredProperties } from "../../../store/propertySlice";
import { useDispatch } from "react-redux";

const initialFilters = {
  propertyRatings: { 5: false, 4: false, 3: false },
  price: { type: "range", value: "1-5" },
  propertyTypes: { apartment: false, land: false, farm: false },
  area: { type: null, value: "0-2000" },
  postedBy: { owner: false, builder: false, dealer: false, feature: false },
  localities: {
    hosur: false,
    koramangala: false,
    devanahalli: false,
    jp: false,
  },
  facingDirection: { east: false, north: false, south: false, west: false },
  verification: { photos: false, videos: false },
  purchaseType: { resale: false, newBooking: false },
};

const priceRanges = [
  { label: "Rs. 0-1 Cr", value: "below-1cr" },
  { label: "Rs. 1-5 Cr", value: "1-5" },
  { label: "Rs. 5-10 Cr", value: "5-10" },
  { label: "Rs. 10-15 Cr", value: "10-15" },
  { label: "Rs. 15-20 Cr", value: "15-20" },
  { label: "Rs. 20+ Cr", value: "20+" },
];

const areaRanges = [
  { label: "Below 500 sq.ft", value: "below-500" },
  { label: "500-1000 sq.ft", value: "around-1000" },
  { label: "1000-2000 sq.ft", value: "0-2000" },
  { label: "2000-4000 sq.ft", value: "2000-4000" },
  { label: "4000-6000 sq.ft", value: "4000-6000" },
  { label: "6000-8000 sq.ft", value: "6000-8000" },
  { label: "8000-10000 sq.ft", value: "8000-10000" },
  { label: "10000+ sq.ft", value: "10000+" },
];

const FilterSection = ({ title, onClear, children, clearable = true }) => (
  <div className="py-4 border-b border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-800">{title}</h3>
      {clearable && (
        <button
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-pink-600"
        >
          Clear <FiChevronDown className="inline-block" />
        </button>
      )}
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const CustomCheckbox = ({ label, id, rating, checked, onChange }) => (
  <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <div
      className={`w-5 h-5 flex-shrink-0 border-2 ${
        checked ? "bg-pink-600 border-pink-600" : "border-gray-300"
      } rounded flex items-center justify-center transition-all`}
    >
      {checked && <FiCheck className="text-white w-3.5 h-3.5" />}
    </div>
    <span className="text-sm text-gray-700">{label}</span>
    {rating && (
      <span
        className={`text-xs text-white px-2 py-0.5 rounded flex items-center space-x-1 ${
          rating >= 4 ? "bg-green-500" : "bg-yellow-500"
        }`}
      >
        <span>{rating.toFixed(1)}</span>
        <FaStar />
      </span>
    )}
  </label>
);

const CustomRadio = ({ label, id, name, value, checked, onChange }) => (
  <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer">
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <div
      className={`w-5 h-5 flex-shrink-0 border-2 ${
        checked ? "border-pink-600" : "border-gray-300"
      } rounded-full flex items-center justify-center transition-all`}
    >
      {checked && (
        <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
      )}
    </div>
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

const FiltersSidebar = ({ data, setData, isSidebarOpen, setIsSidebarOpen }) => {
  const [filters, setFilters] = useState(() => {
    try {
      const savedFilters = localStorage.getItem("propertyFilters");
      return savedFilters ? JSON.parse(savedFilters) : initialFilters;
    } catch (error) {
      return initialFilters;
    }
  });

  const dispatch = useDispatch();

  // Save filters to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("propertyFilters", JSON.stringify(filters));
    } catch (error) {
      console.error("Failed to save filters to localStorage:", error);
    }
  }, [filters]);

  useEffect(() => {
    dispatch(getFilteredProperties({ ...data, filters: filters }));
  }, [filters]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const handleCheckboxChange = (section, key) =>
    setFilters((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section][key] },
    }));

  const handleRangeChange = (section, value) => {
    setFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        value,
        type: "range",
      },
    }));
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
    localStorage.removeItem("propertyFilters");
  };

  const handleClearSection = (section) =>
    setFilters((prev) => ({ ...prev, [section]: initialFilters[section] }));

  const SidebarContent = () => (
    <aside className="p-4 border-gray-200 lg:border rounded-lg h-full overflow-y-auto lg:h-auto lg:overflow-y-visible">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Filters</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-pink-600"
          >
            Clear all
          </button>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-pink-600"
          >
            <FiX size={24} />
          </button>
        </div>
      </div>

      <FilterSection
        title="Property ratings"
        onClear={() => handleClearSection("propertyRatings")}
      >
        <CustomCheckbox
          id="rating-5"
          label="5.0"
          rating={5.0}
          checked={filters.propertyRatings[5]}
          onChange={() => handleCheckboxChange("propertyRatings", 5)}
        />
        <CustomCheckbox
          id="rating-4"
          label="4.0 & above"
          rating={4.0}
          checked={filters.propertyRatings[4]}
          onChange={() => handleCheckboxChange("propertyRatings", 4)}
        />
        <CustomCheckbox
          id="rating-3"
          label="3.0 & above"
          rating={3.0}
          checked={filters.propertyRatings[3]}
          onChange={() => handleCheckboxChange("propertyRatings", 3)}
        />
      </FilterSection>

      <FilterSection
        title="Price range"
        onClear={() => handleClearSection("price")}
      >
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <CustomRadio
              key={range.value}
              id={`price-${range.value}`}
              name="price-range"
              label={range.label}
              value={range.value}
              checked={filters.price.value === range.value}
              onChange={() => handleRangeChange("price", range.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Types of property"
        onClear={() => handleClearSection("propertyTypes")}
      >
        <CustomCheckbox
          id="type-apt"
          label="Residential Apartment"
          checked={filters.propertyTypes.apartment}
          onChange={() => handleCheckboxChange("propertyTypes", "apartment")}
        />
        <CustomCheckbox
          id="type-land"
          label="Residential Land"
          checked={filters.propertyTypes.land}
          onChange={() => handleCheckboxChange("propertyTypes", "land")}
        />
        <CustomCheckbox
          id="type-farm"
          label="Farm House"
          checked={filters.propertyTypes.farm}
          onChange={() => handleCheckboxChange("propertyTypes", "farm")}
        />
      </FilterSection>

      <FilterSection title="Area" onClear={() => handleClearSection("area")}>
        <div className="space-y-2">
          {areaRanges.map((range) => (
            <CustomRadio
              key={range.value}
              id={`area-${range.value}`}
              name="area-range"
              label={range.label}
              value={range.value}
              checked={filters.area.value === range.value}
              onChange={() => handleRangeChange("area", range.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Posted by"
        onClear={() => handleClearSection("postedBy")}
      >
        <CustomCheckbox
          id="posted-owner"
          label="Owner"
          checked={filters.postedBy.owner}
          onChange={() => handleCheckboxChange("postedBy", "owner")}
        />
        <CustomCheckbox
          id="posted-builder"
          label="Builder"
          checked={filters.postedBy.builder}
          onChange={() => handleCheckboxChange("postedBy", "builder")}
        />
        <CustomCheckbox
          id="posted-dealer"
          label="Dealer"
          checked={filters.postedBy.dealer}
          onChange={() => handleCheckboxChange("postedBy", "dealer")}
        />
        <CustomCheckbox
          id="posted-feature"
          label="Feature Dealer"
          checked={filters.postedBy.feature}
          onChange={() => handleCheckboxChange("postedBy", "feature")}
        />
      </FilterSection>

      <FilterSection
        title="Localities"
        onClear={() => handleClearSection("localities")}
      >
        <CustomCheckbox
          id="loc-hosur"
          label="Hosur Road"
          rating={4.0}
          checked={filters.localities.hosur}
          onChange={() => handleCheckboxChange("localities", "hosur")}
        />
        <CustomCheckbox
          id="loc-kora"
          label="Koramangala"
          rating={3.0}
          checked={filters.localities.koramangala}
          onChange={() => handleCheckboxChange("localities", "koramangala")}
        />
        <CustomCheckbox
          id="loc-dev"
          label="Devanahalli"
          rating={3.0}
          checked={filters.localities.devanahalli}
          onChange={() => handleCheckboxChange("localities", "devanahalli")}
        />
        <CustomCheckbox
          id="loc-jp"
          label="Jp Nagar"
          rating={3.0}
          checked={filters.localities.jp}
          onChange={() => handleCheckboxChange("localities", "jp")}
        />
      </FilterSection>

      <FilterSection
        title="Facing Direction"
        onClear={() => handleClearSection("facingDirection")}
      >
        <CustomCheckbox
          id="face-east"
          label="East"
          checked={filters.facingDirection.east}
          onChange={() => handleCheckboxChange("facingDirection", "east")}
        />
        <CustomCheckbox
          id="face-north"
          label="North"
          checked={filters.facingDirection.north}
          onChange={() => handleCheckboxChange("facingDirection", "north")}
        />
        <CustomCheckbox
          id="face-south"
          label="South"
          checked={filters.facingDirection.south}
          onChange={() => handleCheckboxChange("facingDirection", "south")}
        />
        <CustomCheckbox
          id="face-west"
          label="West"
          checked={filters.facingDirection.west}
          onChange={() => handleCheckboxChange("facingDirection", "west")}
        />
      </FilterSection>

      <FilterSection title="Verification" clearable={false}>
        <button
          onClick={() => handleCheckboxChange("verification", "photos")}
          className="flex items-center justify-between text-sm w-full"
        >
          <span>Properties with photos</span>
          <div
            className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
              filters.verification.photos ? "bg-pink-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                filters.verification.photos ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </div>
        </button>
        <button
          onClick={() => handleCheckboxChange("verification", "videos")}
          className="flex items-center justify-between text-sm w-full"
        >
          <span>Properties with videos</span>
          <div
            className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
              filters.verification.videos ? "bg-pink-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                filters.verification.videos ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </div>
        </button>
      </FilterSection>

      <FilterSection
        title="Purchase type"
        onClear={() => handleClearSection("purchaseType")}
      >
        <CustomCheckbox
          id="purchase-resale"
          label="Resale"
          checked={filters.purchaseType.resale}
          onChange={() => handleCheckboxChange("purchaseType", "resale")}
        />
        <CustomCheckbox
          id="purchase-new"
          label="New Booking"
          checked={filters.purchaseType.newBooking}
          onChange={() => handleCheckboxChange("purchaseType", "newBooking")}
        />
      </FilterSection>
    </aside>
  );

  return (
    <>
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-black/20 bg-opacity-50 z-30 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white z-40 shadow-xl transition-transform duration-300 ease-in-out lg:static lg:w-auto lg:h-auto lg:z-auto lg:translate-x-0 lg:shadow-none lg:bg-transparent ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="hidden lg:block">
          <SidebarContent />
        </div>
        <div className="lg:hidden h-full">
          <SidebarContent />
        </div>
      </div>
    </>
  );
};

export default FiltersSidebar;
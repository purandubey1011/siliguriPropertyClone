import React, { useState } from "react";
import { MapPin, CheckCircle, ChevronDown, FilterX } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Utility: Format Price (Handles Crores/Lakhs) ---
export const formatPrice = (price) => {
  if (!price) return "Price on Request";
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString()}`;
};

// --- Component: Skeleton Loader ---
const PropertySkeleton = () => (
  <div className="bg-white md:h-80 rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row animate-pulse">
    <div className="w-full md:w-1/3 h-56 md:h-full bg-gray-200"></div>
    <div className="flex-1 p-6 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex gap-2 mt-4">
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
    </div>
  </div>
);

// --- Component: Property Card ---
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const displayPrice = property.rent || property.price || 0;

  const handleClick = () => {
    navigate(`/user/propertydetail/${property._id}`);
  };

  const getPropertyImage = () => {
    if (property.featuredImage?.length > 0) {
      return property.featuredImage[0].url;
    }
    return "https://imgs.search.brave.com/qqeKWCEx-ixB7YEFXO2PL7zUlw6sRRqCBe1SdmzKUgg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDgv/ODkyLzE4OC9zbWFs/bC80MDQtZXJyb3It/Y29uY2VwdC1mb3It/bGFuZGluZy1wYWdl/LWZyZWUtdmVjdG9y/LmpwZw";
  };

  const getPropertyOptions = () => {
    const options = [];
    if (property.bedrooms) options.push({ type: "Beds", value: `${property.bedrooms} BHK` });
    if (property.area) options.push({ type: "Area", value: `${property.area} sq.ft` });
    if (property.furnishing) options.push({ type: "Furnishing", value: property.furnishing });
    return options.slice(0, 3);
  };

  const isVerified = property.verification === "approved";

  return (
    <div 
      onClick={handleClick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      <div className="relative w-full md:w-80 flex-shrink-0 h-64 md:h-auto overflow-hidden">
        <img
          loading="lazy"
          src={getPropertyImage()}
          alt={property.propertyTitle}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {property.propertyType}
        </span>

        {property.transactionType && (
          <span
            className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
              property.transactionType === "Sell"
                ? "bg-pink-100 text-pink-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            For {property.transactionType}
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-pink-600 transition-colors">
              {property.propertyTitle}
            </h2>

            <div className="flex items-center mt-2 mb-4 text-gray-500 text-sm">
              <MapPin size={16} className="text-pink-600 mr-1.5" />
              <span className="truncate">{property.address}, {property.city}</span>

              {isVerified && (
                <span className="ml-3 bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-0.5 rounded-full flex items-center font-semibold">
                  <CheckCircle size={12} className="mr-1" /> Verified
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
              {getPropertyOptions().map((opt, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <p className="text-xs text-gray-400 uppercase font-semibold">{opt.type}</p>
                  <p className="font-semibold text-gray-700">{opt.value}</p>
                </div>
              ))}
            </div>

            {property.amenities && Object.keys(property.amenities).some(k => property.amenities[k]) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(property.amenities)
                  .filter(([_, val]) => val)
                  .slice(0, 3)
                  .map(([key]) => (
                    <span key={key} className="text-xs bg-gray-50 text-gray-500 border px-2 py-1 rounded">
                      {key}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-5 md:p-6 md:border-l border-gray-100 flex flex-row items-center md:flex-col md:w-64 bg-gray-50/50">
          <div className="flex-1 md:text-center md:mb-4">
            <p className="text-2xl font-extrabold text-gray-900">{formatPrice(displayPrice)}</p>
            {property.area && displayPrice > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                ₹{Math.round(displayPrice / property.area)} / sq.ft
              </p>
            )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${property.phoneNumber}`; }}
            className="bg-gray-900 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-pink-600 transition-colors shadow-lg md:w-full"
          >
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT: ResultsList ---
const ResultsList = ({ verifiedProperties = [], loading = false }) => {
  const [sortBy, setSortBy] = useState("relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Sorting logic
  const getSortedProperties = () => {
    if (!Array.isArray(verifiedProperties)) return [];
    const sorted = [...verifiedProperties];

    switch (sortBy) {
      case "price-low-high":
        return sorted.sort((a, b) => (a.rent || a.price || 0) - (b.rent || b.price || 0));
      case "price-high-low":
        return sorted.sort((a, b) => (b.rent || b.price || 0) - (a.rent || a.price || 0));
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return sorted;
    }
  };

  const sortedProperties = getSortedProperties();

  // Pagination slice
  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = sortedProperties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage);

  // Reset page on sort change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  // LOADING STATE
  if (loading) {
    return (
      <div className="px-2 md:px-0 max-w-7xl mx-auto py-8 space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
        {[1, 2, 3].map((i) => <PropertySkeleton key={i} />)}
      </div>
    );
  }

  // EMPTY STATE
  if (!loading && sortedProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="bg-pink-50 p-6 rounded-full mb-4">
          <FilterX className="h-12 w-12 text-pink-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">No Properties Found</h3>
        <p className="text-gray-500 mt-2 max-w-md">
          Try removing some filters or searching another location.
        </p>
      </div>
    );
  }

  // SUCCESS STATE
  return (
    <div className="px-2 md:px-0 max-w-7xl mx-auto py-8">
      {/* Header */}
      <header className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-gray-800">
          <span className="font-bold text-lg">{verifiedProperties.length} Properties Found</span>
          {verifiedProperties[0]?.city && (
            <span className="text-gray-500 ml-2 hidden sm:inline">
              in {verifiedProperties[0].city}
            </span>
          )}
        </h1>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-white border px-4 py-2 rounded-lg text-sm font-medium hover:border-pink-500"
          >
            Sort by: {sortBy}
            <ChevronDown size={16} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border">
              {["relevance", "price-low-high", "price-high-low", "newest"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-pink-50 ${
                    sortBy === option ? "text-pink-600 font-bold bg-pink-50" : ""
                  }`}
                >
                  {option.replace(/-/g, " ").toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Property List */}
      <main className="space-y-6">
        {currentProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </main>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">

          {/* Prev */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm border ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-pink-50 hover:border-pink-400"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-lg border text-sm flex items-center justify-center ${
                currentPage === i + 1
                  ? "bg-pink-600 text-white border-pink-600"
                  : "hover:bg-pink-50 hover:border-pink-400"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm border ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-pink-50 hover:border-pink-400"
            }`}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
};

export default ResultsList;

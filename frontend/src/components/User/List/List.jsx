// PropertyListings.jsx (or your parent component)

import React, { useEffect, useState } from 'react';


import { FiFilter } from 'react-icons/fi'; // Icon for the button
import FiltersSidebar from './FilterSidebar';
import ResultsList from './ResultsList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperty, getFilteredProperties } from '../../../store/propertySlice';
import { useSearchParams } from 'react-router-dom';


const PropertyListings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch();
  const [data, setData] = useState({   
    propertyType: searchParams.get("propertyType")|| "",
    location: searchParams.get("location")|| "",
    bhk: searchParams.get("bhk")||"",
    type: searchParams.get("type")||"",});

  useEffect(() => {
     dispatch(getFilteredProperties(data))
    }, [searchParams]);
    
    const allProperties = useSelector((state) => state.property.properties);
  const verifiedProperties = allProperties.filter((property) => property.verification === "approved");

  console.log(allProperties)
  console.log(verifiedProperties)

  return (
    <div className="bg-white font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        

        <div className="lg:hidden px-2 md:px-0 py-4 border-b border-gray-200">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex  items-center justify-center w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold bg-white shadow-sm"
          >
            <FiFilter className="mr-2 text-pink-600" />
            Show Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 py-4 lg:py-8">
          <div className="w-full lg:w-1/4 xl:w-1/5">

            <FiltersSidebar data={data} setData={setData}  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          </div>

          <div className="w-full lg:w-3/4 xl:w-4/5">
            <ResultsList  verifiedProperties={verifiedProperties}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;
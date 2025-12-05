import React, { useEffect, useState } from "react";
import {
  FiMapPin,
  FiCheckCircle,
  FiHeart,
  FiShare2,
  FiChevronDown,
  FiPhone,
} from "react-icons/fi";

import {
  FaBed,
  FaBath,
  FaCar,
} from "react-icons/fa";
import {
  BsBuilding,
  BsCircle,
  BsArrowsFullscreen,
} from "react-icons/bs";
import { MdChair, MdBalcony, MdAreaChart, MdOutlineSimCardDownload } from "react-icons/md";
import LocationAdvantages from "./Locationadvantage.jsx";
import FloorPlans from "./FloorPlan.jsx";
import ConstructionStatus from "./Constructionstatus.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperty } from "../../../store/propertySlice.js";
import dummy from "../../../assets/default.png";


const Propertydetail = () => {
  let [propertyData, setPropertyData] = useState([]);
  // const [images, setimages] = useState([])

  let dispatch = useDispatch();

  let params = useParams();
  let propertyId = params.id;

   const user = useSelector((state) => state.auth.user);
   

   useEffect(() => {
      dispatch(getAllProperty()).then((data)=>{
       setPropertyData(data?.payload?.properties);
     })
   }, [propertyId]);

   function getSinglePropertyById(id) {
     return propertyData.find((property) => property._id === id);
   }
   
   const filteredProperty = getSinglePropertyById(propertyId)
   console.log('single property data ->',filteredProperty);


  //  let {address } = filteredProperty || {};
  //  console.log('address',address);


  const{
    propertyTitle,
    firstName,
    lastName,
    verification,
    address,
    city,
    rent,
    builtUpArea,
    superBuiltUpArea,
    propertyType,
    typeOfPossession,
    furnishing,
    bedrooms,
    bathrooms,
    ageofproperty,
    transactionType,
    numberofbalconies,
    facing,
    parking,
    description,
    floorno,
    mediaFiles,
    numberofcarparking,
    watersupply,
    ownershipType ,
    brochure,
    phoneNumber,
    whatsappNumber,
    locationAdvantages
  } = filteredProperty || {};
  console.log('filteredProperty',filteredProperty);




const images = filteredProperty?.mediaFiles?.map((img) => img.url) || [];
console.log(dummy)
console.log(images)

  const overview = [
    { icon: <FaBed />, label: "Bedrooms", value:bedrooms },
    { icon: <MdAreaChart />, label: "Super Area", value:superBuiltUpArea },
    { icon: <BsBuilding />, label: "Property Type", value: propertyType },
    { icon: <BsCircle />, label: "Status", value:typeOfPossession },
    { icon: <MdChair />, label: "Furnishing", value:furnishing },
    { icon: <FiCheckCircle />, label: "Verification", value:verification},
    { icon: <FaBath />, label: "Bathrooms", value:bathrooms},
    { icon: <FaCar />, label: "Parking", value:parking },
    { icon: <MdBalcony />, label: "Balconies", value:numberofbalconies},
  ];

  const details = [
    { label: "Property ID", value: "Not Specified" },
    { label: "Age of Property", value: ageofproperty|| "Not Specified" },
    { label: "Transaction Type", value:transactionType|| "Not Specified" },
    { label: "Floor Number", value: floorno || "Not Specified" },
    { label: "Facing", value: facing|| "Not Specified" },
    { label: "Car Parking", value:numberofcarparking|| "Not Specified" },
    { label: "Water Supply", value:watersupply|| "Not Specified" },
    { label: "Ownership", value: ownershipType|| "Not Specified" },
  ];

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    }
    return `₹${price?.toLocaleString("en-IN")}`;
  };

  return (
    <div className="mt-20 font-sans bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-3">
            {/* --- Gallery --- */}
            <div className="flex flex-col md:flex-row gap-4 h-[500px]">
              <div className="relative w-full md:w-3/4 h-full rounded-2xl overflow-hidden group">
                <img
                  loading="lazy"
                  src={images?.[0] || dummy }
                  alt="Main property view"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 flex flex-col gap-3">
                  <button className="bg-white/80 p-3 rounded-full text-gray-700 hover:bg-white hover:text-pink-600 transition">
                    <BsArrowsFullscreen />
                  </button>
                  <button className="bg-white/80 p-3 rounded-full text-gray-700 hover:bg-white hover:text-pink-600 transition">
                    <FiShare2 />
                  </button>
                  <button className="bg-white/80 p-3 rounded-full text-gray-700 hover:bg-white hover:text-pink-600 transition">
                    <FiHeart />
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/4 flex md:flex-col gap-4">
                {images.slice(1, 4).map((src, i) => (
                  <div
                    key={i}
                    className="relative w-1/3 md:w-full h-full rounded-2xl overflow-hidden"
                  >
                    <img
                      loading="lazy"
                      src={src || dummy}
                      alt={`Property view ${i + 2}`}
                      className="w-full h-full object-cover"
                    />
                    {i === 2 && images.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white cursor-pointer">
                        <span className="text-2xl font-bold">+3</span>
                        <span className="text-sm">More</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* --- Header --- */}
            <div className="flex flex-col md:flex-row mt-9 justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {propertyTitle}
                </h1>
                <div className="flex items-center mt-2 space-x-4">
                  <p className="text-sm text-gray-600">
                    by {firstName} {lastName}
                  </p>
                  <span className="bg-pink-100 text-pink-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <FiCheckCircle />
                    <span>Verified</span>
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <FiMapPin className="mr-2 text-pink-600" />
                  <span>{`${address}, ${city}`}</span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 text-left md:text-right">
                <p className="text-3xl font-extrabold text-gray-900">
                  {formatPrice(rent)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ₹{Math.round(rent / builtUpArea)}/sq.ft
                </p>
                <div className="flex flex-wrap md:flex-nowrap gap-2 mt-3">
                  {/* <a
                    href={brochureUrl}
                    className="flex items-center gap-2 text-pink-600 font-bold py-2.5 px-6 rounded-full border border-pink-600 hover:bg-pink-50"
                  >
                    <MdOutlineSimCardDownload /> Download Brochure
                  </a> */}
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex items-center gap-2 bg-[#d9006c] text-white font-bold py-2.5 px-6 rounded-full hover:bg-pink-700"
                  >
                    <FiPhone /> Contact Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* --- MAIN SECTION --- */}
          <main className="lg:col-span-2 space-y-6">
            <div className="border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* <div className="bg-[#FFF9FB] p-6 rounded-xl w-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Construction Status</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {typeOfPossession}
                  </h3>
                </div>
                <FiChevronDown className="text-[#D10369] h-7 w-7" />
              </div>
            </div> */}

            {/* <FloorPlans filteredProperty={filteredProperty}/> */}

            <div className=" border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-5">
                Property Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                {overview.map((item) => (
                  <div
                    className="flex items-center space-x-3"
                    key={item.label}
                  >
                    <div className="text-pink-600 text-2xl">{item.icon}</div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-semibold text-gray-800">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Property Details
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6">
                {details.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-semibold text-gray-800 break-words">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <LocationAdvantages locationAdvantages={locationAdvantages}/>
            <ConstructionStatus filteredProperty={getSinglePropertyById(propertyId)}/>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
              <h4 className="font-bold text-lg text-gray-800">Contact Agent</h4>
              <div className="flex items-center space-x-4 mt-4 bg-gray-50 p-3 rounded-lg">
                <img
                  loading="lazy"
                  src="https://i.pravatar.cc/60?u=agent"
                  alt="Agent"
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <p className="font-bold text-gray-800"> puran dubey</p>
                  <p className="text-sm text-gray-600">+91 761727610</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <a
                  href="tel:9876543210"
                  className="border text-center border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 text-center text-white font-semibold py-2 rounded-lg hover:bg-pink-700 transition"
                >
                  Send A Request
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Propertydetail;

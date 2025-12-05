import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
  FiHome,
  FiMap,
  FiGrid,
  FiCamera,
  FiPlus,
  FiAlertCircle,
  FiFileText,
} from "react-icons/fi";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { createProperty } from "../../../store/propertySlice";
import { id, tr } from "zod/v4/locales";
import BasicInfoStep from "./BasicInfo.jsx";
import LocationStep from "./LocationStep.jsx";
import UploadStep from "./UploadStep.jsx";
import AmenitiesStep from "./AminitiesStep.jsx";
import Discreption from "./Discription.jsx";
import FireSafetyMeasures from "./Firesafetymeasure.jsx";
import { toast } from "react-toastify";

// --- Validation Schemas ---
const propertySchema = z.object({
title: z.enum(["Mr", "Mrs"]),
  propertyTitle: z.string().min(5, "Property title must be at least 5 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  area: z.string().min(1, "Area is required"),

  propertyType: z.enum([
    "Flat/Apartment",
    "Villa",
    "Independent House",
    "Land/Plot",
    "Project",
    "Office",
    "Retail",
    "Storage",
    "Industry",
    "Hospitality",
    "Plot/Land",
  ]),

  transactionType: z.enum(["Sell", "Rent", "Lease", "PG"]),
  tenantType: z.enum(["Any", "Family", "Bachelors (Men)", "Bachelors (Women)", "Company"]),

  rent: z.string().regex(/^\d+$/, "Rent must be a valid number"),
  security: z.string().regex(/^\d+$/, "Security deposit must be a valid number"),

  negotiable: z.boolean(),

  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().regex(/^\d{6}$/, "Must be a valid 6-digit pincode"),

  amenities: z.record(z.any()),

  description: z.string().min(10, "Description must be at least 10 characters"),
  ReraId: z.string().optional().or(z.literal("")),

  bedrooms: z.string().regex(/^\d+$/, "Must be a valid number"),
  bathrooms: z.string().regex(/^\d+$/, "Must be a valid number"),
  kitchen: z.string().regex(/^\d+$/, "Must be a valid number"),

  floorno: z.string(),
  totalfloors: z.string(),
  facing: z.string(),

  ageofproperty: z.string(),
  parking: z.boolean(),

  numberofcarparking: z.string(),
  numberofbikeparking: z.string(),
  watersupply: z.string(),

  furnishing: z.string(),

  numberofbalconies: z.string(),

  projectUnits: z.array(z.any()),
typeOfApartment: z.string().optional(),
builtUpArea: z.string().optional(),
superBuiltUpArea: z.string().optional(),
typeOfPossession: z.string().optional(),
dateOfPossession: z.string().optional(),
rate: z.string().optional(),
bookingAmount: z.string().optional(),
  typeOfParking: z.string().optional(),
    // recent changes for villa
    totalPlotArea: z.string().min(1, "Plot area is required").regex(/^\d+$/, "Must be a number"),
  vacantArea: z.string().min(1, "Vacant area is required").regex(/^\d+$/, "Must be a number"),
  buildingArea: z.string().min(1, "Building area is required").regex(/^\d+$/, "Must be a number"),
  terraceType: z.string().min(1, "Terrace type is required"),
  plotArea: z.string().min(1, "Plot area is required"),
  plotAreaUnit: z.string(), // To store Sqft or Katha
  totalProjectArea: z.string().min(1, "Total project area is required"),
  landStatus: z.string().min(1, "Land status is required"), // Registered/Unregistered
  gatedSociety: z.boolean(),
  projectStatus: z.string().min(1, "Project status is required"), // Ready/Under Construction
  maintenancePeriod: z.string(), // Monthly/Yearly
    // -------------------------------------------------------------------------------



    // Project-Level Fields (from ProjectForm)
totalProjectArea: z.string().optional(),
totalFlats: z.string().optional(),
totalFloors: z.string().optional(),
projectStatus: z.string().optional(),
ownershipType: z.string().optional(),
maintenanceCharges: z.string().optional(),
ratePerSqft: z.string().optional(),
furnishing: z.string().optional(),


    propertyKind: z.string().min(0,"This field is required"),
  // pricefrom : z.string().min(1, "Minimum price is required").regex(/^\d+$/, "Must be a valid number"),
  // priceto: z.string().min(1, "Maximum price is required").regex(/^\d+$/, "Must be a valid number"),
  phoneNumber : z.string().min(1, "Phone number is required").regex(/^\d+$/, "Must be a valid number"),

});

export const FormField = ({ label, children, error, className = "" }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-600 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <FiAlertCircle />
          {error}
        </p>
      )}
    </div>
  );
};

export const Checkbox = ({ id, label, checked, onChange }) => (
  <label
    htmlFor={id}
    className="flex items-center space-x-3 cursor-pointer group"
  >
    <input
      id={id}
      name={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
    />
    <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors">
      {label}
    </span>
  </label>
);



const Listingform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // console.log(user);
  const getInitialFormData = () => {
    const savedData = localStorage.getItem("propertyFormData");
    const savedStep = localStorage.getItem("propertyFormStep");
    const savedAmenities = localStorage.getItem("propertyCustomAmenities");
    const savedFormData = localStorage.getItem("propertyFormData");

    return {
      formData: savedData
        ? JSON.parse(savedData)
        : {
          title: "Mr",
          propertyTitle: "",
          firstName: "",
          lastName: "",
          propertyType: "Flat/Apartment",
          tenantType: "Any",
          description: "",
          area: "",
          bedrooms: "",
          bathrooms: "",
          rent: "",
          security: "",
          negotiable: false,
          address: "",
          city: "",
          state: "",
          pincode: "",
          locationAdvantages: [{ title: "", range: "" }],
          amenities: {},
          mediaFiles: [],
          kitchen: "",
          floorno: "",
          totalfloors: "",
          facing: "",
          ageofproperty: "",
          parking: false,
          numberofcarparking: "",
          numberofbikeparking: "",
          watersupply: "",
          furnishing: "Unfurnished",
          projectUnits: [{
            typeOfApartment: "1 BHK",
            typeOfPossession: "Ready to Move",
            possessionDate:"",
            ageofproperty:"",
            priceFrom: "",
            priceTo: "",
            areaFrom: "",
            areaTo: "",
            agent:"",
            
            
          }],
          transactionType: "Sell",
          builtUpArea: "",
          superBuiltUpArea: "",
          numberofbalconies: "",
          propertyKind: "Residential",
          typeOfPossession: "Ready to Move",
          id: user?._id,
          ownershipType: "Freehold",
          minnoofSeats:"",
          maxnoofSeats:"",
          noOfCabin:"",
          // ----------------------------------
          // pricefrom: "",
          // priceto: "",
          noOfMeetingRooms:"",
          OfficeWashrooom:"",
          receptionArea:"",
          pantryType:"",
          fireSafety:[],
          noofstaircases:"",
          lift:"",
          passengerLift:"",
          serviceLift:"",
          featuredImage:[],
          brochure:[],
          floorPlan:[],
          whatsappNumber:"",
          phoneNumber:"",
          dateOfPossession:"",
          maintenanceCharges:"",
          typeOfParking:"",
          ReraId:"",
          bookingAmount:"",

          totalPlotArea: "",
          vacantArea: "",
          buildingArea: "",
          terraceType: "",

          plotArea: "",
          plotAreaUnit: "Sqft", // Default to Sqft
          totalProjectArea: "",
          landStatus: "Registered",
          gatedSociety: false,
          projectStatus: "Ready to Move",
          maintenancePeriod: "Monthly",


          // NEW GLOBAL PROJECT FIELDS
  totalProjectArea: "",
  totalFlats: "",
  totalFloors: "",
  projectStatus: "Under Construction", // Default
  ageofproperty: "",      // For Ready to Move
  possessionDate: "",     // For Under Construction
  ownershipType: "Freehold",
  parking: false,
  maintenanceCharges: "",
  ratePerSqft: "",
  furnishing: "Unfurnished",
          },
      currentStep: savedStep ? parseInt(savedStep) : 1,
      customAmenities: savedAmenities ? JSON.parse(savedAmenities) : [],
    };
  };
  const Isvalid = () => {
    if (
      formData.propertyType == "Flat/Apartment" ||
      formData.propertyType == "Villa" ||
      formData.propertyType == "Independent House"
    ) {
      return true;
    }
    return false;
  };

  const Isproject = () => {
    if (formData.propertyType == "Project") {
      return true;
    }
    return false;
  };

  const initialData = getInitialFormData();
  const [currentStep, setCurrentStep] = useState(initialData.currentStep);
  const [customAmenityInput, setCustomAmenityInput] = useState("");
  const [customAmenities, setCustomAmenities] = useState(
    initialData.customAmenities
  );
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialData.formData);
  console.log(formData);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const steps = [
    { number: 1, title: "Basic & Property Info", icon: <FiHome /> },
    { number: 2, title: "Location", icon: <FiMap /> },
    { number: 3, title: "About Property", icon: <FiFileText /> },
    { number: 4, title: "Amenities", icon: <FiGrid /> },
    { number: 5, title: "Photos", icon: <FiCamera /> },
  ];

  const validateCurrentStep = () => {
    let stepValid = true;
    const newErrors = {};

    try {
      switch (currentStep) {
        case 1:
          const basicInfoResult = propertySchema
            .pick({
              title: true,
              firstName: true,
              lastName: true,
              propertyKind:true,
              transactionType: true,
              propertyType: true,
              phoneNumber: true,
            })
            .safeParse(formData);

          if (!basicInfoResult.success) {
            stepValid = false;
            basicInfoResult.error.issues.forEach((issue) => {
              newErrors[issue.path[0]] = issue.message;
            });
          }
          break;

        case 2:
          // Validate location fields
          const locationResult = propertySchema
            .pick({
              address: true,
              city: true,
              state: true,
              pincode: true,
            })
            .safeParse(formData);

          if (!locationResult.success) {
            stepValid = false;
            locationResult.error.issues.forEach((issue) => {
              newErrors[issue.path[0]] = issue.message;
            });
          }
          break;

        case 3:
          const descriptionResult = propertySchema
            .pick({
              propertyTitle:true,
              description: Isvalid(),
              ReraId:Isvalid(),
              typeOfApartment:Isvalid(),
              bedrooms: Isvalid(),
              bathrooms: Isvalid(),
              kitchen: Isvalid(),
              numberofbalconies:Isvalid(),
              floorno: Isvalid(),
              totalfloors: Isvalid(),
              facing: Isvalid(),
              area:Isvalid(),
              builtUpArea:Isvalid(),
              superBuiltUpArea:Isvalid(),
              typeOfPossession:Isvalid(),
              dateOfPossession:Isvalid(),
              furnishing:Isvalid(),
              ageofproperty: Isvalid(),
              rent: Isvalid(),
              rate: Isvalid(),
              bookingAmount: Isvalid(),
              maintenanceCharges: Isvalid(),
              maintenancePeriod: Isvalid(),
              typeOfParking: Isvalid(),
              parking: Isvalid(),
              numberofcarparking: Isvalid(),
              numberofbikeparking: Isvalid(),
              watersupply: Isvalid(),
              furnishing: Isvalid(),
              numberofbalconies: Isvalid(),
              // pricefrom: Isproject(),
              // priceto: Isproject(),

              totalPlotArea: formData.propertyType === "Villa",
              vacantArea: formData.propertyType === "Villa",
              buildingArea: formData.propertyType === "Villa",
              terraceType: formData.propertyType === "Villa",
           
            })  
            .safeParse(formData);
          if (!descriptionResult.success) {
            console.log(descriptionResult);
            stepValid = false;
            descriptionResult.error.issues.forEach((issue) => {
              newErrors[issue.path[0]] = issue.message;
            });
          }
          break;
      }
    } catch (error) {
      console.error("Validation error:", error);
      stepValid = false;
    }

    setErrors(newErrors);
    return stepValid;
  };

  const handleNext = () => {
    
    if (validateCurrentStep()) {
      const nextStep = Math.min(currentStep + 1, steps.length);
      setCurrentStep(nextStep);
      localStorage.setItem("propertyFormStep", nextStep.toString());
    }
    console.log('mfknjjnfjrejffjfefshiva');
    
  };

  const handlePrev = () => {
    const prevStep = Math.max(currentStep - 1, 1);
    setCurrentStep(prevStep);
    localStorage.setItem("propertyFormStep", prevStep.toString());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      localStorage.setItem("propertyFormData", JSON.stringify(newData));
      return newData;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e) =>
    setFormData((prev) => {
      const newData = { ...prev, [e.target.id]: e.target.checked };
      localStorage.setItem("propertyFormData", JSON.stringify(newData));
      return newData;
    });

  const handleAmenityChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        amenities: { ...prev.amenities, [id]: checked },
      };
      localStorage.setItem("propertyFormData", JSON.stringify(newData));
      return newData;
    });
  };

  const handleAddCustomAmenity = () => {
    const newAmenity = customAmenityInput.trim();
    if (newAmenity && !customAmenities.includes(newAmenity)) {
      setCustomAmenities((prev) => {
        const newAmenities = [...prev, newAmenity];
        localStorage.setItem(
          "propertyCustomAmenities",
          JSON.stringify(newAmenities)
        );
        return newAmenities;
      });
      setFormData((prev) => {
        const newData = {
          ...prev,
          amenities: { ...prev.amenities, [newAmenity]: true },
        };
        localStorage.setItem("propertyFormData", JSON.stringify(newData));
        return newData;
      });
      setCustomAmenityInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {

    //   const result = propertySchema.safeParse(formData);

    //   if (!result.success) {
    //     const newErrors = {};
    //     result.error.issues.forEach((issue) => {
    //       newErrors[issue.path[0]] = issue.message;
    //     });
    //     setErrors(newErrors);
    //     return;
    //   }

    //   // Clear stored form data after successful submission
    //   localStorage.removeItem('propertyFormData');
    //   localStorage.removeItem('propertyFormStep');
    //   localStorage.removeItem('propertyCustomAmenities');

    //   alert("Form submitted for approval!");
    // } catch (error) {
    //   console.error("Form submission error:", error);
    // }
  };

  const stepComponents = [
    <BasicInfoStep
      data={formData}
      handleChange={handleChange}
      handleCheckboxChange={handleCheckboxChange}
      errors={errors}
    />,
    isLoaded ? (
      <LocationStep
        data={formData}
        handleChange={handleChange}
        setFormData={setFormData}
        errors={errors}
      />
    ) : (
      <div className="text-center p-8 text-gray-500">Loading Map...</div>
    ),
    <Discreption
      data={formData}
      handleChange={handleChange}
      handleCheckboxChange={handleCheckboxChange}
      errors={errors}
    />,
    <AmenitiesStep
      handleChange={handleChange}
      data={formData}
      handleAmenityChange={handleAmenityChange}
      customAmenityInput={customAmenityInput}
      onCustomAmenityChange={(e) => setCustomAmenityInput(e.target.value)}
      onAddCustomAmenity={handleAddCustomAmenity}
      customAmenities={customAmenities}
      errors={errors}
    />,

    <UploadStep handleChange={handleChange} data={formData} initialFiles={formData.mediaFiles} acceptedTypes={['image/jpeg', 'image/png' , "video,mp4"]}  onFilesChange={(newfiles) =>handleChange({ target: { name: "mediaFiles", value: [...newfiles] } }) }/>
  ];
  
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="font-sans py-16 px-6 pt-36 bg-gray-50 min-h-screen">
      <motion.header
        // initial={{ y: -20, opacity: 0 }}
        // animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700">
          Submit Property Details
        </h1>
      </motion.header>

      <main className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-xl">
        <div className="mb-10">
          <div className="relative mb-2">
            <div className="h-2 w-full bg-gray-200 rounded-full"></div>
            <motion.div
              className="absolute top-0 left-0 h-2 bg-pink-600 rounded-full"
              // initial={{ width: 0 }}
              // animate={{ width: `${progressPercentage}%` }}
              // transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.number} className="text-center w-1/4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto transition-colors duration-300 ${
                    currentStep >= step.number
                      ? "bg-pink-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.icon}
                </div>
                <p
                  className={`mt-2 text-xs font-semibold hidden sm:block ${
                    currentStep >= step.number
                      ? "text-pink-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              // initial={{ opacity: 0, x: 50 }}
              // animate={{ opacity: 1, x: 0 }}
              // exit={{ opacity: 0, x: -50 }}
              // transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {" "}
                {steps[currentStep - 1].title}{" "}
              </h2>
              {stepComponents[currentStep - 1]}
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center">
            <motion.button
              type="button"
              onClick={handlePrev}
              className="bg-gray-200 text-gray-700 font-semibold rounded-lg px-6 py-3 inline-flex items-center space-x-2 transition-colors hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentStep === 1}
              // whileHover={{ scale: currentStep > 1 ? 1.05 : 1 }}
              // whileTap={{ scale: currentStep > 1 ? 0.95 : 1 }}
            >
              <FiArrowLeft />
              <span>Previous</span>
            </motion.button>
            {currentStep < steps.length ? (
              <motion.button
                type="button"
                onClick={handleNext}
                className="bg-pink-600 text-white font-semibold rounded-lg px-6 py-3 inline-flex items-center space-x-2 hover:bg-pink-700"
                // whileHover={{ scale: 1.05 }}
                // whileTap={{ scale: 0.95 }}
              >
                <span>Next </span>
                <FiArrowRight />
              </motion.button>
            ) : (
              <motion.button
                onClick={() => {
                  dispatch(createProperty(formData)).then((res) => {
                    console.log(res);
                    if (res.type === "property/create/fulfilled") {
                      localStorage.removeItem("propertyFormData");
                      localStorage.removeItem("propertyFormStep");
                      localStorage.removeItem("propertyCustomAmenities");
                      toast.success("Property submitted successfully", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      })
                        navigate("/");
                    }
                  });
                }}
                type="submit"
                className="bg-green-600 text-white font-semibold rounded-lg px-6 py-3 inline-flex items-center space-x-2 transition-colors hover:bg-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Submit</span>
                <FiCheck />
              </motion.button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default Listingform;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiShield,
  FiUser,
  FiPlus,
  FiTrash2,
  FiDownload,
  FiImage,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperty, updateProperty } from "../../../store/propertySlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
// };
// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
// };

const SectionCard = ({ title, children, className = "" }) => (
  <motion.div
    // variants={itemVariants}
    className={`bg-white rounded-xl shadow-sm p-6 ${className}`}
  >
    <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
    {children}
  </motion.div>
);

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 font-medium truncate">
      {value || "N/A"}
    </div>
  </div>
);

const EditableDetailItem = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  options = [],
  disabled = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1.5">
      {label}
    </label>
    {type === "select" ? (
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    )}
  </div>
);

const Checkbox = ({ id, label, checked, onChange, disabled = false }) => (
  <label
    htmlFor={id}
    className={`flex items-center space-x-3 cursor-pointer group ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    <input
      id={id}
      name={id}
      type="checkbox"
      checked={checked || false}
      onChange={onChange}
      disabled={disabled}
      className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 disabled:cursor-not-allowed"
    />
    <span
      className={`text-gray-700 font-medium transition-colors ${
        !disabled ? "group-hover:text-pink-600" : ""
      }`}
    >
      {label}
    </span>
  </label>
);

const ProjectUnitItem = ({ unit, index, onChange, onRemove, isEditing }) => (
  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-medium text-gray-800">Unit {index + 1}</h4>
      {isEditing && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700"
        >
          <FiTrash2 size={16} />
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <EditableDetailItem
        label="Type of Apartment"
        name={`projectUnits.${index}.typeOfApartment`}
        value={unit.typeOfApartment}
        onChange={onChange}
        type="select"
        options={[
          "1 BHK",
          "2 BHK",
          "3 BHK",
          "4 BHK",
          "5+ BHK",
          "Studio",
          "Penthouse",
        ]}
        disabled={!isEditing}
      />
      <EditableDetailItem
        label="Possession Type"
        name={`projectUnits.${index}.typeOfPossession`}
        value={unit.typeOfPossession}
        onChange={onChange}
        type="select"
        options={["Ready to Move", "Under Construction", "New Launch"]}
        disabled={!isEditing}
      />
      <EditableDetailItem
        label="Price From (₹)"
        name={`projectUnits.${index}.priceFrom`}
        value={unit.priceFrom}
        onChange={onChange}
        type="number"
        disabled={!isEditing}
      />
      <EditableDetailItem
        label="Price To (₹)"
        name={`projectUnits.${index}.priceTo`}
        value={unit.priceTo}
        onChange={onChange}
        type="number"
        disabled={!isEditing}
      />
      <EditableDetailItem
        label="Area From (sq.ft.)"
        name={`projectUnits.${index}.areaFrom`}
        value={unit.areaFrom}
        onChange={onChange}
        type="number"
        disabled={!isEditing}
      />
      <EditableDetailItem
        label="Area To (sq.ft.)"
        name={`projectUnits.${index}.areaTo`}
        value={unit.areaTo}
        onChange={onChange}
        type="number"
        disabled={!isEditing}
      />
      <EditableDetailItem
        label="Agent"
        name={`projectUnits.${index}.agent`}
        value={unit.agent}
        onChange={onChange}
        disabled={!isEditing}
      />
    </div>
  </div>
);

const Admindashboarddetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const properties = useSelector((state) => state.property.properties);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [propertyId, setPropertyId] = useState(null);

  // Fetch properties on mount
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        await dispatch(getAllProperty()).unwrap();
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      localStorage.setItem("propertyId", id);
      setPropertyId(id);
      fetchProperties();
    }
  }, [id, dispatch]);

  // Get the single property
  const singleProperty = properties.find((property) => property._id === propertyId);

  // Update form data when singleProperty changes
  useEffect(() => {
    if (singleProperty) {
      const initialFormData = {
        title: singleProperty.title || "",
        propertyTitle: singleProperty.propertyTitle || "",
        firstName: singleProperty.firstName || "",
        lastName: singleProperty.lastName || "",
        propertyType: singleProperty.propertyType || "",
        tenantType: singleProperty.tenantType || "",
        transactionType: singleProperty.transactionType || "",
        city: singleProperty.city || "",
        state: singleProperty.state || "",
        rent: singleProperty.rent || "",
        security: singleProperty.security || "",
        area: singleProperty.area || "",
        bedrooms: singleProperty.bedrooms || "",
        bathrooms: singleProperty.bathrooms || "",
        pincode: singleProperty.pincode || "",
        address: singleProperty.address || "",
        description: singleProperty.description || "",
        negotiable: singleProperty.negotiable || false,
        amenities: singleProperty.amenities || {},
        verification: singleProperty.verification || "pending",
        kitchen: singleProperty.kitchen || "",
        floorno: singleProperty.floorno || "",
        totalfloors: singleProperty.totalfloors || "",
        facing: singleProperty.facing || "",
        ageofproperty: singleProperty.ageofproperty || "",
        parking: singleProperty.parking || "",
        numberofcarparking: singleProperty.numberofcarparking || "",
        numberofbikeparking: singleProperty.numberofbikeparking || "",
        watersupply: singleProperty.watersupply || "",
        furnishing: singleProperty.furnishing || "",
        numberofbalconies: singleProperty.numberofbalconies || "",
        projectUnits: singleProperty.projectUnits || [],
      };

      setFormData(initialFormData);
    }
  }, [singleProperty]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("projectUnits.")) {
      const [, index, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        projectUnits: prev.projectUnits.map((unit, i) =>
          i === parseInt(index) ? { ...unit, [field]: value } : unit
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleAmenityChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [id]: checked,
      },
    }));
  };

  const addProjectUnit = () => {
    const newUnit = {
      typeOfApartment: "",
      typeOfPossession: "",
      priceFrom: "",
      priceTo: "",
      areaFrom: "",
      areaTo: "",
      agent: "",
    };
    setFormData((prev) => ({
      ...prev,
      projectUnits: [...prev.projectUnits, newUnit],
    }));
  };

  const removeProjectUnit = (index) => {
    setFormData((prev) => ({
      ...prev,
      projectUnits: prev.projectUnits.filter((_, i) => i !== index),
    }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await dispatch(
        updateProperty({
          id: singleProperty._id,
          data: formData,
        })
      ).unwrap();
      
      toast.success("Changes saved successfully!");
      setIsEditing(false);
      
      // Refresh the property list
      await dispatch(getAllProperty()).unwrap();
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Error saving changes: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationChange = async (newVerification) => {
    const previousVerification = formData.verification;
    
    // Optimistically update UI
    setFormData((prev) => ({
      ...prev,
      verification: newVerification,
    }));

    try {
      const res = await dispatch(
        updateProperty({
          id: singleProperty._id,
          data: {
            verification: newVerification,
          },
        })
      );

      if (res.type === "property/updateproperty/fulfilled") {
        toast.success("Verification Status Updated Successfully");
        // Refresh the property list in background
        dispatch(getAllProperty());
      } else {
        toast.error("Something went wrong");
        // Revert on error
        setFormData((prev) => ({
          ...prev,
          verification: previousVerification,
        }));
      }
    } catch (error) {
      toast.error("Failed to update verification status");
      // Revert on error
      setFormData((prev) => ({
        ...prev,
        verification: previousVerification,
      }));
    }
  };

  const handleCancel = () => {
    if (singleProperty) {
      const resetFormData = {
        title: singleProperty.title || "",
        propertyTitle: singleProperty.propertyTitle || "",
        firstName: singleProperty.firstName || "",
        lastName: singleProperty.lastName || "",
        propertyType: singleProperty.propertyType || "",
        tenantType: singleProperty.tenantType || "",
        transactionType: singleProperty.transactionType || "",
        city: singleProperty.city || "",
        state: singleProperty.state || "",
        rent: singleProperty.rent || "",
        security: singleProperty.security || "",
        area: singleProperty.area || "",
        bedrooms: singleProperty.bedrooms || "",
        bathrooms: singleProperty.bathrooms || "",
        pincode: singleProperty.pincode || "",
        address: singleProperty.address || "",
        description: singleProperty.description || "",
        negotiable: singleProperty.negotiable || false,
        amenities: singleProperty.amenities || {},
        verification: singleProperty.verification || "pending",
        kitchen: singleProperty.kitchen || "",
        floorno: singleProperty.floorno || "",
        totalfloors: singleProperty.totalfloors || "",
        facing: singleProperty.facing || "",
        ageofproperty: singleProperty.ageofproperty || "",
        parking: singleProperty.parking || "",
        numberofcarparking: singleProperty.numberofcarparking || "",
        numberofbikeparking: singleProperty.numberofbikeparking || "",
        watersupply: singleProperty.watersupply || "",
        furnishing: singleProperty.furnishing || "",
        numberofbalconies: singleProperty.numberofbalconies || "",
        projectUnits: singleProperty.projectUnits || [],
      };

      setFormData(resetFormData);
    }
    setIsEditing(false);
  };

  if (loading || !singleProperty) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  const allAmenities = [
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
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-8">
      <motion.div
        className="max-w-5xl mx-auto"
        // variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header  className="mb-8">
          <p className="text-sm text-gray-500">Dashboard / Property</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-1 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing
                ? formData.propertyTitle
                : singleProperty.propertyTitle}
            </h1>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="border border-gray-300 text-gray-700 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition w-full sm:w-auto"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <select
                    value={formData.verification || "pending"}
                    onChange={(e) => handleVerificationChange(e.target.value)}
                    className={`border font-semibold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      formData.verification === "approved"
                        ? "border-green-500 text-green-700 "
                        : formData.verification === "rejected"
                        ? "border-red-500 text-red-700 "
                        : "border-yellow-500 text-yellow-700"
                    }`}
                  >
                    <option value="pending" className="text-yellow-700">
                      ● Pending
                    </option>
                    <option value="approved" className="text-green-700">
                      ✓ Approved
                    </option>
                    <option value="rejected" className="text-red-700">
                      ✗ Rejected
                    </option>
                  </select>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="border border-pink-600 text-pink-600 font-bold py-2 px-6 rounded-full hover:bg-pink-50 transition w-full sm:w-auto"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.header>

        <main className="space-y-8">
          <SectionCard title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <EditableDetailItem
                label="Title"
                name="title"
                value={isEditing ? formData.title : singleProperty.title}
                onChange={handleChange}
                type="select"
                options={["Mr", "Mrs", "Ms", "Dr"]}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="First Name"
                name="firstName"
                value={
                  isEditing ? formData.firstName : singleProperty.firstName
                }
                onChange={handleChange}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Last Name"
                name="lastName"
                value={isEditing ? formData.lastName : singleProperty.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </SectionCard>

          <SectionCard title="Property Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <EditableDetailItem
                label="Property Title"
                name="propertyTitle"
                value={
                  isEditing
                    ? formData.propertyTitle
                    : singleProperty.propertyTitle
                }
                onChange={handleChange}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Property Type"
                name="propertyType"
                value={
                  isEditing
                    ? formData.propertyType
                    : singleProperty.propertyType
                }
                onChange={handleChange}
                type="select"
                options={[
                  "Flat/Apartment",
                  "Villa",
                  "Independent House",
                  "Land/Plot",
                  "Project",
                ]}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Transaction Type"
                name="transactionType"
                value={
                  isEditing
                    ? formData.transactionType
                    : singleProperty.transactionType
                }
                onChange={handleChange}
                type="select"
                options={["Rent", "Sell", "Lease"]}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Tenant Type"
                name="tenantType"
                value={
                  isEditing ? formData.tenantType : singleProperty.tenantType
                }
                onChange={handleChange}
                type="select"
                options={[
                  "Any",
                  "Family",
                  "Bachelors (Men)",
                  "Bachelors (Women)",
                  "Company",
                ]}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label={
                  singleProperty.transactionType === "Sell"
                    ? "Price (₹)"
                    : "Rent (₹)"
                }
                name="rent"
                value={isEditing ? formData.rent : singleProperty.rent}
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Security Deposit (₹)"
                name="security"
                value={isEditing ? formData.security : singleProperty.security}
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Area (sq.ft.)"
                name="area"
                value={isEditing ? formData.area : singleProperty.area}
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Bedrooms"
                name="bedrooms"
                value={isEditing ? formData.bedrooms : singleProperty.bedrooms}
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Bathrooms"
                name="bathrooms"
                value={
                  isEditing ? formData.bathrooms : singleProperty.bathrooms
                }
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Kitchen"
                name="kitchen"
                value={isEditing ? formData.kitchen : singleProperty.kitchen}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Floor Number"
                name="floorno"
                value={isEditing ? formData.floorno : singleProperty.floorno}
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Total Floors"
                name="totalfloors"
                value={
                  isEditing ? formData.totalfloors : singleProperty.totalfloors
                }
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Facing"
                name="facing"
                value={isEditing ? formData.facing : singleProperty.facing}
                onChange={handleChange}
                type="select"
                options={[
                  "North",
                  "South",
                  "East",
                  "West",
                  "North East",
                  "North West",
                  "South East",
                  "South West",
                ]}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Age of Property (Years)"
                name="ageofproperty"
                value={
                  isEditing
                    ? formData.ageofproperty
                    : singleProperty.ageofproperty
                }
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Parking Available"
                name="parking"
                value={isEditing ? formData.parking : singleProperty.parking}
                onChange={handleChange}
                type="select"
                options={["true", "false"]}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Number of Car Parking"
                name="numberofcarparking"
                value={
                  isEditing
                    ? formData.numberofcarparking
                    : singleProperty.numberofcarparking
                }
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Number of Bike Parking"
                name="numberofbikeparking"
                value={
                  isEditing
                    ? formData.numberofbikeparking
                    : singleProperty.numberofbikeparking
                }
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Water Supply"
                name="watersupply"
                value={
                  isEditing ? formData.watersupply : singleProperty.watersupply
                }
                onChange={handleChange}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Furnishing"
                name="furnishing"
                value={
                  isEditing ? formData.furnishing : singleProperty.furnishing
                }
                onChange={handleChange}
                type="select"
                options={["Fully Furnished", "Semi Furnished", "Unfurnished"]}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Number of Balconies"
                name="numberofbalconies"
                value={
                  isEditing
                    ? formData.numberofbalconies
                    : singleProperty.numberofbalconies
                }
                onChange={handleChange}
                disabled={!isEditing}
              />
              <div className="pt-6">
                <Checkbox
                  id="negotiable"
                  label="Price is Negotiable"
                  checked={
                    isEditing ? formData.negotiable : singleProperty.negotiable
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </SectionCard>

          {(singleProperty.propertyType === "Project" ||
            formData.propertyType === "Project") && (
            <SectionCard title="Project Units">
              <div className="space-y-4">
                {(isEditing
                  ? formData.projectUnits
                  : singleProperty.projectUnits || []
                ).map((unit, index) => (
                  <ProjectUnitItem
                    key={index}
                    unit={unit}
                    index={index}
                    onChange={handleChange}
                    onRemove={removeProjectUnit}
                    isEditing={isEditing}
                  />
                ))}
                {isEditing && (
                  <button
                    type="button"
                    onClick={addProjectUnit}
                    className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium"
                  >
                    <FiPlus />
                    <span>Add Project Unit</span>
                  </button>
                )}
              </div>
            </SectionCard>
          )}

          <SectionCard title="Location Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <EditableDetailItem
                label="Address"
                name="address"
                value={isEditing ? formData.address : singleProperty.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="City"
                name="city"
                value={isEditing ? formData.city : singleProperty.city}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="State"
                name="state"
                value={isEditing ? formData.state : singleProperty.state}
                onChange={handleChange}
                type="select"
                options={[
                  "Andhra Pradesh",
                  "Arunachal Pradesh",
                  "Assam",
                  "Bihar",
                  "Chhattisgarh",
                  "Goa",
                  "Gujarat",
                  "Haryana",
                  "Himachal Pradesh",
                  "Jharkhand",
                  "Karnataka",
                  "Kerala",
                  "Madhya Pradesh",
                  "Maharashtra",
                  "Manipur",
                  "Meghalaya",
                  "Mizoram",
                  "Nagaland",
                  "Odisha",
                  "Punjab",
                  "Rajasthan",
                  "Sikkim",
                  "Tamil Nadu",
                  "Telangana",
                  "Tripura",
                  "Uttar Pradesh",
                  "Uttarakhand",
                  "West Bengal",
                  "Delhi",
                  "Jammu and Kashmir",
                  "Ladakh",
                ]}
                disabled={!isEditing}
              />
              <EditableDetailItem
                label="Pincode"
                name="pincode"
                value={isEditing ? formData.pincode : singleProperty.pincode}
                onChange={handleChange}
                type="number"
                disabled={!isEditing}
              />
            </div>
          </SectionCard>

          <SectionCard title="Media Files">
            <div className="text-gray-600">
              {singleProperty.mediaFiles &&
              singleProperty.mediaFiles.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {singleProperty.mediaFiles.map((file, index) => (
                    <div
                      key={file.id}
                      className="bg-gray-100 rounded-lg p-2 relative group"
                    >
                      <img
                        loading="lazy"
                        src={file.url}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-xs text-gray-500 mt-2 truncate">
                        {file.name}
                      </p>
                      {file.tag && (
                        <span className="absolute top-3 right-3 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                          {file.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No media files uploaded</p>
              )}
            </div>
          </SectionCard>

          {singleProperty.featuredImage &&
            singleProperty.featuredImage.length > 0 && (
              <SectionCard title="Featured Image">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {singleProperty.featuredImage.map((file, index) => (
                    <div key={file.id} className="bg-gray-100 rounded-lg p-2">
                      <img
                        loading="lazy"
                        src={file.url}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-xs text-gray-500 mt-2 truncate">
                        {file.name}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

          {singleProperty.floorPlan && singleProperty.floorPlan.length > 0 && (
            <SectionCard title="Floor Plan">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {singleProperty.floorPlan.map((file, index) => (
                  <div key={file.id} className="bg-gray-100 rounded-lg p-2">
                    <img
                      loading="lazy"
                      src={file.url}
                      alt={file.name}
                      className="w-full h-48 object-contain rounded"
                    />
                    <p className="text-xs text-gray-500 mt-2 truncate">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {singleProperty.brochure && singleProperty.brochure.length > 0 && (
            <SectionCard title="Brochure">
              <div className="space-y-3">
                {singleProperty.brochure.map((file, index) => (
                  <a
                    key={file.id}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <FiDownload className="text-pink-600" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <span className="text-pink-600 text-sm font-medium">
                      Download
                    </span>
                  </a>
                ))}
              </div>
            </SectionCard>
          )}

          {singleProperty.fireSafety &&
            singleProperty.fireSafety.length > 0 && (
              <SectionCard title="Fire Safety Documents">
                <div className="space-y-3">
                  {singleProperty.fireSafety.map((file, index) => (
                    <a
                      key={file.id}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition"
                    >
                      <div className="flex items-center space-x-3">
                        <FiDownload className="text-pink-600" size={20} />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <span className="text-pink-600 text-sm font-medium">
                        Download
                      </span>
                    </a>
                  ))}
                </div>
              </SectionCard>
            )}

          <SectionCard title="Description & Notes">
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Enter property description..."
                className="w-full bg-white border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed text-sm">
                {singleProperty.description || "No description provided."}
              </p>
            )}
          </SectionCard>

          <SectionCard title="Amenities">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {isEditing
                ? allAmenities.map((amenity) => (
                    <Checkbox
                      key={amenity}
                      id={amenity}
                      label={amenity}
                      checked={!!formData.amenities?.[amenity]}
                      onChange={handleAmenityChange}
                    />
                  ))
                : Object.entries(singleProperty.amenities || {}).map(
                    ([amenity, isAvailable]) =>
                      isAvailable && (
                        <div
                          key={amenity}
                          className="flex items-center space-x-2 text-gray-700"
                        >
                          <FiCheckCircle className="text-green-500" />
                          <span>{amenity}</span>
                        </div>
                      )
                  )}
            </div>
          </SectionCard>

          <SectionCard title="Property Metadata">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <DetailItem label="Property ID" value={singleProperty._id} />
              <DetailItem label="Owner ID" value={singleProperty.owner} />
              <DetailItem
                label="Verification Status"
                value={
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      singleProperty.verification === "approved"
                        ? "bg-green-100 text-green-800"
                        : singleProperty.verification === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {singleProperty.verification?.toUpperCase() || "PENDING"}
                  </span>
                }
              />
              <DetailItem
                label="Created Date"
                value={new Date(singleProperty.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              />
              <DetailItem
                label="Last Updated"
                value={new Date(singleProperty.updatedAt).toLocaleDateString(
                  "en-IN",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              />
            </div>
          </SectionCard>
        </main>
      </motion.div>
    </div>
  );
};

export default Admindashboarddetail;
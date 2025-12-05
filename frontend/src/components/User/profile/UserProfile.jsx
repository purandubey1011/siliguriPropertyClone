import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit2,
  Save,
  X,
  Building,
  Eye,
  Heart,
  Shield,
  LogOut,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import Navbar from "../../Navbar";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  // --- 1. Initial State (Simulating data from your API) ---
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  // Refs for file inputs
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { properties } = useSelector((state) => state.property);

  // Filter only logged-in user's properties
  const userProperties = Array.isArray(properties)
    ? properties.filter((p) => user?.properties?.includes(p._id))
    : [];

  // Count Approved/Pending
  const getCounts = (list) => {
    if (!Array.isArray(list) || list.length === 0) {
      return { approved: "N/A", pending: "N/A" };
    }

    const approved = list.filter((p) => p.verification === "approved").length;
    const pending = list.filter((p) => p.verification !== "approved").length;

    return { approved, pending };
  };

  const { approved, pending } = getCounts(userProperties);

  // Mock Data based on your previous JSON structure
  // const [formData, setFormData] = useState({
  //   firstName: "Shivam",
  //   lastName: "Tiwari",
  //   title: "Mr",
  //   email: "shivam.tiwari@example.com", // Added field
  //   phoneNumber: "6264667946",
  //   whatsappNumber: "5243677895",
  //   address: "Barkheda Pathani",
  //   city: "Bhopal",
  //   state: "MP",
  //   pincode: "462001",
  //   bio: "Real estate enthusiast looking for premium properties in Bhopal.",
  //   role: "Property Owner",
  //   profileImage: "", // Empty to test fallback
  //   coverImage: ""    // Empty to test fallback
  // });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        // Add other fields if they exist in user object
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        role: user.usertype === "owner" ? "Property Owner" : user.usertype,
        properties: user.properties || [],
        date : user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
        // You can also add profileImage, coverImage if you store them

      }));
    }
  }, [user]);

  // --- 2. Image Fallback Logic ---
  const dummyProfileImage =
    "https://imgs.search.brave.com/yOFX1qSEMWIswSBYLiK9GC4cJjj0gZbFzr7-sfcycHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/Mi8wOC9hdmF0YXIt/ZGVmYXVsdC11c2Vy/LXByb2ZpbGUtaWNv/bi1zb2NpYWwtbWVk/aWEtdmVjdG9yLTU3/MjM0MjA4LmpwZw";
  const dummyCoverImage =
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000&auto=format&fit=crop";

  const displayProfileImage = user?.avatar || dummyProfileImage;
  const displayCoverImage = formData?.coverImage || dummyCoverImage;

  // --- 3. Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [field]: imageUrl,
      }));
    }
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      // alert("Profile Updated Successfully!"); // In real app, use a toast notification
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset logic could go here if you maintain a separate 'originalData' state
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      {/* --- Header / Cover Photo Section --- */}
      <div className="relative h-48 md:h-64 bg-gray-200">
        <img
          src={displayCoverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Hidden Input for Cover Image */}
        <input
          type="file"
          ref={coverInputRef}
          onChange={(e) => handleImageUpload(e, "coverImage")}
          className="hidden"
          accept="image/*"
        />

        {/* Edit Cover Button */}
        {isEditing && (
          <button
            onClick={() => coverInputRef.current.click()}
            className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center transition text-sm"
          >
            <Camera className="w-4 h-4 mr-2" /> Change Cover
          </button>
        )}
      </div>

      {/* --- Main Content Container --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* --- Left Column: Profile Card & Quick Stats --- */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="pt-8 pb-6 px-6 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full p-1 bg-white shadow-lg">
                    <img
                      src={displayProfileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* Hidden Input for Profile Image */}
                  <input
                    type="file"
                    ref={profileInputRef}
                    onChange={(e) => handleImageUpload(e, "profileImage")}
                    className="hidden"
                    accept="image/*"
                  />

                  {isEditing && (
                    <button
                      onClick={() => profileInputRef.current.click()}
                      className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-pink-400 font-medium mb-4">
                  {formData.role}
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full flex items-center">
                    <Shield className="w-3 h-3 mr-1" /> Verified
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    Member since {formData?.date}
                  </span>
                </div>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center shadow-md shadow-blue-200"
                  >
                    <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center"
                    >
                      {loading ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" /> Save
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition flex items-center justify-center"
                    >
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats (Aesthetic touch for Real Estate app) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Navbar />
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                Dashboard
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-blue-800">
                    <Building className="w-5 h-5 mr-3" />
                    <span className="font-medium">Pending Properties</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {pending}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center text-purple-800">
                    <Eye className="w-5 h-5 mr-3" />
                    <span className="font-medium">Approved Properties</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    {approved}
                  </span>
                </div>

                {/* <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                  <div className="flex items-center text-pink-800">
                    <Heart className="w-5 h-5 mr-3" />
                    <span className="font-medium">Favorites</span>
                  </div>
                  <span className="text-2xl font-bold text-pink-600">12</span>
                </div> */}
                <button
                  onClick={() => navigate("/owner/myproperties")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center mt-3"
                >
                  View My Properties
                </button>
              </div>
            </div>
          </div>

          {/* --- Right Column: Details Form --- */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Personal Details
                </h3>
                {isEditing && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                    Editing Mode Enabled
                  </span>
                )}
              </div>

              <form className="space-y-6">
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                    </select>
                  </div>
                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Phone className="w-3 h-3 mr-1 text-gray-400" /> Phone
                      Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1 text-gray-400" />{" "}
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Email (Full Width) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Mail className="w-3 h-3 mr-1 text-gray-400" /> Email
                    Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Address Section */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 mt-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> Location Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1 uppercase">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 uppercase">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 uppercase">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio / About
                  </label>
                  <textarea
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

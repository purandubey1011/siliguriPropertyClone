import React, { useEffect, useState } from "react";
import { Checkbox, FormField } from "./Listingform";
import { FiChevronDown } from "react-icons/fi";
import MediaUpload from "./UploadStep.jsx";
import Uploadbutton from "./Uploadbutton.jsx";

const ProjectForm = ({ data, handleChange, handleCheckboxChange, errors }) => {

    const [autoRate, setAutoRate] = useState(true);
  
  
  console.log(data);

  const onFileChange = (files) => {
    handleChange({
      target: {
        name: "mediaFiles",
        value: files,
      },
    });
  };

  useEffect(() => {
      if (autoRate) {
        if (data.area > 0 && data.rent > 0) {
          const newRate = (data.rent / data.area).toFixed(2);
          if (data.rate !== newRate) {
            handleChange({
              target: { name: "rate", value: newRate }
            });
          }
        }
      }
    }, [data.rent, data.area, autoRate]);

  return (
    <div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

        {(data.projectUnits || []).map((unit, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Unit {index + 1}</h4>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const newUnits = [...(data.projectUnits || [])];
                    newUnits.splice(index, 1);
                    handleChange({
                      target: {
                        name: "projectUnits",
                        value: newUnits,
                      },
                    });
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Unit
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Project Type" error={errors?.projectName}>
                <div className="relative">
                  <select
                    name="projectType"
                    value={data.projectType}
                    onChange={handleChange}
                    className={`w-full bg-white border ${
                      errors?.projectType ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Warehouse</option>
                    <option value="Land">Land</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </FormField>
              
<FormField
  label="Unit Type"
  error={errors?.projectUnits?.[index]?.typeOfApartment}
>
  <div className="relative">
    <select
      name="typeOfApartment"
      value={unit.typeOfApartment || ""}
      onChange={(e) => {
        const updated = [...data.projectUnits];
        updated[index] = {
          ...unit,
          typeOfApartment: e.target.value,  // UPDATE CORRECT KEY
        };

        handleChange({
          target: {
            name: "projectUnits",
            value: updated,
          },
        });
      }}
      className={`w-full bg-white border ${
        errors?.projectUnits?.[index]?.typeOfApartment
          ? "border-red-500"
          : "border-gray-300"
      } rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500`}
    >
      <option value="">Select Unit Type</option>
      <option value="1 BHK">1 BHK</option>
      <option value="2 BHK">2 BHK</option>
      <option value="3 BHK">3 BHK</option>
      <option value="4 BHK">4 BHK</option>
      <option value="4+ BHK">4+ BHK</option>
    </select>

    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
</FormField>



              <FormField label="Type of Possession">
                <div className="relative">
                  <select
                    value={unit.typeOfPossession}
                    onChange={(e) => {
                      const newUnits = [...(data.projectUnits || [])];
                      newUnits[index] = {
                        ...unit,
                        typeOfPossession: e.target.value,
                      };
                      handleChange({
                        target: {
                          name: "projectUnits",
                          value: newUnits,
                        },
                      });
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option>Ready to Move</option>
                    <option>Under Construction</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <br />

                {unit.typeOfPossession === "Ready to Move" && (
                  <FormField
                    label="Age of Property"
                    error={errors?.projectUnits?.[index]?.ageOfProperty}
                  >
                    <input
                      type="number"
                      min="0"
                      name={`projectUnits[${index}].ageOfProperty`}
                      value={unit.ageOfProperty || ""}
                      onChange={(e) => {
                        const newUnits = [...(unit.ageOfProperty || [])];
                        newUnits[index] = {
                          ...unit,
                          ageOfProperty: e.target.value,
                        };
                        handleChange({
                          target: {
                            name: "projectUnits",
                            value: newUnits,
                          },
                        });
                      }}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="e.g., 1"
                    />
                  </FormField>
                )}

                {unit.typeOfPossession === "Under Construction" && (
                  <FormField
                    label="Possession Date"
                    error={errors?.projectUnits?.[index]?.possessionDate}
                  >
                    <input
                      type="date"
                      name={`projectUnits[${index}].possessionDate`}
                      value={unit.possessionDate || ""}
                      onChange={(e) => {
                        const newUnits = [...(unit.possessionDate || [])];
                        newUnits[index] = {
                          ...unit,
                          possessionDate: e.target.value,
                        };
                        handleChange({
                          target: {
                            name: "projectUnits",
                            value: newUnits,
                          },
                        });
                      }}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </FormField>
                )}
              </FormField>

              {/* ----------------------------------------- */}
              {/* TOTAL PROJECT AREA */}
              {/* ----------------------------------------- */}

              <FormField label="Ownership Type">
                <div className="flex  flex-wrap gap-2 w-full rounded-lg p-1">
                  {[
                    "Freehold",
                    "Leasehold",
                    "Co-operative society",
                    "Power Of Attorney",
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "ownershipType", value: type },
                        })
                      }
                      className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.ownershipType === type
              ? "bg-pink-100 text-pink-700 border border-pink-500  shadow-sm"
              : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
          }
        `}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </FormField>

              <FormField
                label="Total Project Area (in sq.ft)"
                error={errors?.totalProjectArea}
              >
                <input
                  type="number"
                  name="totalProjectArea"
                  value={data.totalProjectArea || ""}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 
    focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter total project area"
                />
              </FormField>

              {/* ----------------------------------------- */}
              {/* TOTAL FLATS */}
              {/* ----------------------------------------- */}
              <FormField
                label="Total Flats in Project"
                error={errors?.totalFlats}
              >
                <input
                  type="number"
                  name="totalFlats"
                  value={data.totalFlats || ""}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 
    focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter total number of flats"
                />
              </FormField>

              {/* ----------------------------------------- */}
              {/* AVAILABLE BHK FLATS */}
              {/* ----------------------------------------- */}

              <FormField
                label="Available BHK Units"
                error={errors?.availableUnits}
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map(
                    (label, index) => {
                      // convert label → key
                      // "1 BHK" → available1BHK
                      // "4+ BHK" → available4PlusBHK
                      const key =
                        "available" +
                        label.replace(" ", "").replace("+", "Plus");

                      return (
                        <div key={index}>
                          <label className="text-sm block mb-1">{label}</label>

                          <input
                            type="number"
                            min="0"
                            name={key}
                            value={data[key] || ""}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="0"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </FormField>

              <FormField
                label="Available Area (sq.ft)"
                error={errors?.availableArea}
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Min Area */}
                  <input
                    type="number"
                    name="availableAreaMin"
                    placeholder="Minimum"
                    value={data.availableAreaMin || ""}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2
      focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />

                  {/* Max Area */}
                  <input
                    type="number"
                    name="availableAreaMax"
                    placeholder="Maximum"
                    value={data.availableAreaMax || ""}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2
      focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </FormField>


              <FormField label="Total Floors" error={errors?.totalFloors}>
                <input
                  type="number"
                  name="totalFloors"
                  placeholder="Enter total number of floors"
                  value={data.totalFloors || ""}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2
    focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </FormField>

              {/* <FormField label="Property Ownership" error={errors?.ownershipType}>
  <div className="relative">
    <select
      name="ownershipType"
      value={data.ownershipType || ""}
      onChange={handleChange}
      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
      appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
      <option value="">Select Ownership</option>
      <option value="Freehold">Freehold</option>
      <option value="Leasehold">Leasehold</option>
    </select>

    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
</FormField> */}

              <FormField label="Maintenance Charges">
                <div className="flex gap-3">
                  <input
                    type="number"
                    min={0}
                    name="maintenanceCharges"
                    value={data.maintenanceCharges}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
          focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />

                  <select
                    name="maintenancePeriod"
                    value={data.maintenancePeriod}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 
          focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </FormField>

              <FormField label="Price Range">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={unit.priceFrom}
                      onChange={(e) => {
                        const newUnits = [...(data.projectUnits || [])];
                        newUnits[index] = {
                          ...unit,
                          priceFrom: e.target.value,
                        };
                        handleChange({
                          target: {
                            name: "projectUnits",
                            value: newUnits,
                          },
                        });
                      }}
                      placeholder="From"
                      className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={unit.priceTo}
                      onChange={(e) => {
                        const newUnits = [...(data.projectUnits || [])];
                        newUnits[index] = { ...unit, priceTo: e.target.value };
                        handleChange({
                          target: {
                            name: "projectUnits",
                            value: newUnits,
                          },
                        });
                      }}
                      placeholder="To"
                      className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </FormField>

                       {/* Show Rate Per Sqft ONLY if NOT Rent → Residential → Flat */}
                 {(data.transactionType === "Rent" && data.propertyType === "Project" ) && (
              
              <FormField label="Per sq/ft cost">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              
                  <input
                    type="number"
                    min={0}
                    name="rate"
                    value={data.rate}
                    onChange={(e) => {
                      setAutoRate(false); // USER IS TYPING → SWITCH TO MANUAL MODE
                      handleChange(e);
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              
                {/* Auto / Manual toggle */}
                <div className="flex items-center mt-2 gap-2">
                  <input
                    type="checkbox"
                    checked={autoRate}
                    onChange={() => setAutoRate(!autoRate)}
                  />
                  <label className="text-sm text-gray-500">
                    Auto-calculate rate (₹ = Rent / Area)
                  </label>
                </div>
              </FormField>
              
                 )
                }



                {/* ----------------------------------------- */}
{/* MIN & MAX BHK AVAILABLE */}
{/* ----------------------------------------- */}


                 {(data.transactionType === "Rent" && data.propertyType === "Project" ) && (
<>
<FormField
  label="Minimum BHK Available"
  error={errors?.projectUnits?.[index]?.minBHK}
>
  <div className="relative">
    <select
      name="minBHK"
      value={unit.minBHK || ""}
      onChange={(e) => {
        const updated = [...data.projectUnits];
        updated[index] = {
          ...unit,
          minBHK: e.target.value,
        };

        handleChange({
          target: { name: "projectUnits", value: updated }
        });
      }}
      className={`w-full bg-white border ${
        errors?.projectUnits?.[index]?.minBHK
          ? "border-red-500"
          : "border-gray-300"
      } rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500`}
    >
      <option value="">Select Minimum BHK</option>
      {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
</FormField>

<FormField
  label="Maximum BHK Available"
  error={errors?.projectUnits?.[index]?.maxBHK}
>
  <div className="relative">
    <select
      name="maxBHK"
      value={unit.maxBHK || ""}
      onChange={(e) => {
        const updated = [...data.projectUnits];
        updated[index] = {
          ...unit,
          maxBHK: e.target.value,
        };

        handleChange({
          target: { name: "projectUnits", value: updated }
        });
      }}
      className={`w-full bg-white border ${
        errors?.projectUnits?.[index]?.maxBHK
          ? "border-red-500"
          : "border-gray-300"
      } rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500`}
    >
      <option value="">Select Maximum BHK</option>
      {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
</FormField>
</>

    )}

              <FormField label="Area Range (sq/ft)">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={unit.areaFrom}
                      onChange={(e) => {
                        const newUnits = [...(data.projectUnits || [])];
                        newUnits[index] = { ...unit, areaFrom: e.target.value };
                        handleChange({
                          target: {
                            name: "projectUnits",
                            value: newUnits,
                          },
                        });
                      }}
                      placeholder="From"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={unit.areaTo}
                      onChange={(e) => {
                        const newUnits = [...(data.projectUnits || [])];
                        newUnits[index] = { ...unit, areaTo: e.target.value };
                        handleChange({
                          target: {
                            name: "projectUnits",
                            value: newUnits,
                          },
                        });
                      }}
                      placeholder="To"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </FormField>

              <Checkbox
                id="parking"
                label="Parking"
                checked={data.parking}
                onChange={handleCheckboxChange}
                className=''
                
              />
            </div>
            {data.parking ? (
              <>
                <br />
                <FormField label="Type of Parking">
                  <div className="flex  flex-wrap gap-2 w-full rounded-lg p-1">
                    {["Open Parking", "Covered Parking"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          handleChange({
                            target: { name: "typeOfParking", value: type },
                          })
                        }
                        className={`px-4 flex-wrap py-2 text-sm font-medium rounded-full transition-all duration-200
                      ${
                        data.typeOfParking === type
                          ? "bg-pink-100 text-pink-700 border border-pink-500  shadow-sm"
                          : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
                      }
                    `}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </FormField>
                <FormField
                  label="Number of Bike Parking"
                  error={errors?.numberofbikeparking}
                >
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      name="numberofbikeparking"
                      value={data.numberofbikeparking}
                      onChange={handleChange}
                      placeholder="e.g., 1"
                      className={`w-full bg-white border ${
                        errors?.numberofbikeparking
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    />
                  </div>
                </FormField>
                <FormField
                  label="Number of Car Parking"
                  error={errors?.numberofcarparking}
                >
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      name="numberofcarparking"
                      value={data.numberofcarparking}
                      onChange={handleChange}
                      placeholder="e.g., 1"
                      className={`w-full bg-white border ${
                        errors?.numberofcarparking
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    />
                  </div>
                </FormField>
              </>
            ) : (
              <></>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            const newUnit = {
              typeOfApartment: "1 BHK",
              typeOfPossession: "Ready to Move",
              priceFrom: "",
              priceTo: "",
              areaFrom: "",
              areaTo: "",
            };
            const newUnits = [...(data.projectUnits || []), newUnit];
            handleChange({
              target: {
                name: "projectUnits",
                value: newUnits,
              },
            });
          }}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-pink-500 hover:text-pink-500"
        >
          + Add Another Unit
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;

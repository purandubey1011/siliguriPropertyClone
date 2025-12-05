import { FiChevronDown } from "react-icons/fi";
import { Checkbox, FormField } from "./Listingform";
import { useEffect, useState } from "react";
import Commercialdiscription from "./Commercialdiscription.jsx";
import ProjectForm from "./ProjectForm.jsx";
import Uploadbutton from "./Uploadbutton.jsx";

const Discreption = ({ data, handleChange, handleCheckboxChange, errors }) => {

  const isPlot = data.propertyType === "Plot/Land" || data.propertyType === "Land/Plot";
  const [autoRate, setAutoRate] = useState(true);

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




  console.log("Discription data:", data);
  console.log("handlechnage:", handleChange);
  const toShow = () => {
    if (
      data.propertyType === "Flat/Apartment" ||
      data.propertyType === "Villa" ||
      data.propertyType === "Independent House" ||
      isPlot
    ) {
      return true;
    } else {
      return false;
    }
  };

  // const perSqftcost = () => {
  //   return (data.rent / data.area).toFixed(2);
  // };

  const [noOfBedrooms, setNoOfBedrooms] = useState(["1", "2", "3", "4"]);
  const [noOfBathrooms, setNoOfBathrooms] = useState(["1", "2", "3", "4"]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [bathRoomOtherInput, setBathRoomOtherInput] = useState(false);

  const [otherValue, setOtherValue] = useState(data.bedrooms);
  const [bathRoomValue, setBathRoomValue] = useState(data.bathrooms);







  
  if (data.propertyType != "Project") {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <FormField label="Property Title" error={errors?.propertyTitle}>
            <textarea
              type="text"
              name="propertyTitle"
              value={data.propertyTitle}
              onChange={handleChange}
              className={`w-full bg-white border ${
                errors?.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
          </FormField>
          <FormField label="Description" error={errors?.description}>
            <textarea
              type="text"
              name="description"
              value={data.description}
              onChange={handleChange}
              className={`w-full bg-white border ${
                errors?.description ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
          </FormField>
          <FormField label="Rera Number" error={errors?.ReraId}>
            <input
              type="text"
              name="ReraId"
              value={data.ReraId}
              onChange={handleChange}
              className={`w-full bg-white border ${
                errors?.ReraId ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
          </FormField>
        </div>

        {data.propertyType != "Project" ? (
          <>
            <hr className="my-8 border-gray-200" />
            <h3 className="text-base font-semibold text-gray-500 mb-4">
              Property Details
            </h3>
          </>
        ) : (
          <></>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toShow() ? (
            <>
              {data.propertyType == "Flat/Apartment" ? (
                <>
                  <FormField label="Your apartment is a">
                    <div className="flex  flex-wrap gap-2 w-full rounded-lg p-1">
                      {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Other"].map(
                        (type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "typeOfApartment",
                                  value: type,
                                },
                              })
                            }
                            className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.typeOfApartment === type
              ? "bg-pink-100 text-pink-700 border border-pink-500  shadow-sm"
              : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
          }
        `}
                          >
                            {type}
                          </button>
                        )
                      )}
                    </div>
                  </FormField>
                </>
              ) : (
                <></>
              )}

              <FormField label="Number of Bedrooms">
                <div className="flex gap-2 w-max rounded-lg p-1">
                  {noOfBedrooms.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "bedrooms", value: type },
                        })
                      }
                      className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.bedrooms === type
              ? "bg-pink-100 text-pink-700 border border-pink-500  shadow-sm"
              : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
          }
        `}
                    >
                      {type}
                    </button>
                  ))}
                  {otherValue == "" || noOfBedrooms.includes(data.bedrooms) ? (
                    <></>
                  ) : (
                    <div
                      className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200 bg-pink-100 text-pink-700 border border-pink-500  shadow-sm  
        `}
                    >
                      {otherValue}
                    </div>
                  )}
                </div>
                {!showOtherInput ? (
                  <button
                    type="button"
                    onClick={() => setShowOtherInput(true)}
                    className="mt-3 text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
                  >
                    + Add other
                  </button>
                ) : (
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Enter number"
                      value={otherValue}
                      onChange={(e) => setOtherValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setNoOfBedrooms([...noOfBedrooms, otherValue]);
                          handleChange({
                            target: { name: "bedrooms", value: otherValue },
                          });
                          setShowOtherInput(false);
                          setOtherValue("");
                        } else if (e.key === "Escape") {
                          setShowOtherInput(false);
                          setOtherValue("");
                        }
                      }}
                      className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleChange({
                          target: { name: "bedrooms", value: otherValue },
                        });
                        setShowOtherInput(false);
                        setOtherValue("");
                      }}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      OK
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowOtherInput(false);
                        setOtherValue("");
                      }}
                      className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </FormField>

              <FormField label="Number of Bathrooms">
                <div className="flex gap-2 w-max rounded-lg p-1">
                  {noOfBathrooms.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "bathrooms", value: type },
                        })
                      }
                      className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.bathrooms === type
              ? "bg-pink-100 text-pink-700 border border-pink-500  shadow-sm"
              : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
          }
        `}
                    >
                      {type}
                    </button>
                  ))}
                  {bathRoomValue == "" ||
                  noOfBathrooms.includes(data.bathrooms) ? (
                    <></>
                  ) : (
                    <div
                      className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200 bg-pink-100 text-pink-700 border border-pink-500  shadow-sm  
        `}
                    >
                      {bathRoomValue}
                    </div>
                  )}
                </div>
                {!bathRoomOtherInput ? (
                  <button
                    type="button"
                    onClick={() => setBathRoomOtherInput(true)}
                    className="mt-3 text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
                  >
                    + Add other
                  </button>
                ) : (
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Enter number"
                      value={bathRoomValue}
                      onChange={(e) => setBathRoomValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setNoOfBathrooms([...noOfBathrooms, bathRoomValue]);
                          handleChange({
                            target: { name: "bathrooms", value: bathRoomValue },
                          });
                          setBathRoomOtherInput(false);
                          setBathRoomValue("");
                        } else if (e.key === "Escape") {
                          setBathRoomOtherInput(false);
                          setNoOfBathrooms("");
                        }
                      }}
                      className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleChange({
                          target: { name: "bathrooms", value: bathRoomValue },
                        });
                        setBathRoomOtherInput(false);
                        setBathRoomValue("");
                      }}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      OK
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBathRoomOtherInput(false);
                        setBathRoomValue("");
                      }}
                      className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </FormField>
              <FormField label="Number of kitchen" error={errors?.kitchen}>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    name="kitchen"
                    value={data.kitchen}
                    onChange={handleChange}
                    placeholder="e.g., 1"
                    className={`w-full bg-white border ${
                      errors?.kitchen ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                </div>
              </FormField>
              <FormField label="Number Of Balconies">
                <div className="flex  flex-wrap gap-2 w-full rounded-lg p-1">
                  {["0", "1", "2", "3", "More than 3"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "numberofbalconies", value: type },
                        })
                      }
                      className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.numberofbalconies === type
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
{
  !isPlot && (
    <>
              <FormField label="Carpet Area" error={errors?.area}>
                <div className="relative">
                  <input
                    type="number"
                    name="area"
                    min={0}
                    value={data.area}
                    onChange={handleChange}
                    placeholder="e.g., 110"
                    className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500">
                    sq/ft
                  </span>
                </div>
              </FormField>

              <FormField
                label="Built-up Area(Optional)"
                error={errors?.builtUpArea}
              >
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    name="builtUpArea"
                    value={data.builtUpArea}
                    onChange={handleChange}
                    placeholder="e.g., 110"
                    className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500">
                    sq/ft
                  </span>
                </div>
              </FormField>
              <FormField
                label="Super Built-up Area(Optional)"
                error={errors?.superBuiltUpArea}
              >
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    name="superBuiltUpArea"
                    value={data.superBuiltUpArea}
                    onChange={handleChange}
                    placeholder="e.g., 110"
                    className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500">
                    sq/ft
                  </span>
                </div>
              </FormField>

    </>
  )
}



              {/* --- START VILLA SPECIFIC FIELDS --- */}
{data.propertyType === "Villa" && (
  <>
    <FormField label="Total Plot Area" error={errors?.totalPlotArea}>
      <div className="relative">
        <input
          type="number"
          min={0}
          name="totalPlotArea"
          value={data.totalPlotArea}
          onChange={handleChange}
          placeholder="e.g., 2000"
          className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500">
          sq/ft
        </span>
      </div>
    </FormField>

    <FormField label="Vacant Area" error={errors?.vacantArea}>
      <div className="relative">
        <input
          type="number"
          min={0}
          name="vacantArea"
          value={data.vacantArea}
          onChange={handleChange}
          placeholder="e.g., 500"
          className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500">
          sq/ft
        </span>
      </div>
    </FormField>

    <FormField label="Building Area" error={errors?.buildingArea}>
      <div className="relative">
        <input
          type="number"
          min={0}
          name="buildingArea"
          value={data.buildingArea}
          onChange={handleChange}
          placeholder="e.g., 1500"
          className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500">
          sq/ft
        </span>
      </div>
    </FormField>

    <FormField label="Terrace Type">
      <div className="flex flex-wrap gap-2 w-full rounded-lg p-1">
        {["Open Terrace", "Tin Shade Terrace"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() =>
              handleChange({
                target: { name: "terraceType", value: type },
              })
            }
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
            ${
              data.terraceType === type
                ? "bg-pink-100 text-pink-700 border border-pink-500 shadow-sm"
                : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
            }
          `}
          >
            {type}
          </button>
        ))}
      </div>
    </FormField>
  </>
)}
{/* --- END VILLA SPECIFIC FIELDS --- */}


{/* start plot-land*/}

{isPlot && (
  <>

    {/* TOTAL PROJECT AREA */}
    <FormField label="Total Project Area (Sqft)">
      <input
        type="number"
        min={0}
        name="totalProjectArea"
        value={data.totalProjectArea}
        onChange={handleChange}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
        focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </FormField>

    {/* PLOT AREA */}
    <FormField label="Plot Area">
      <div className="flex gap-3">

        <input
          type="number"
          min={0}
          name="plotArea"
          value={data.plotArea}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
          focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <select
          name="plotAreaUnit"
          value={data.plotAreaUnit}
          onChange={handleChange}
          className="bg-white border border-gray-300 rounded-lg px-3 py-2.5 
          focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="Sqft">Sqft</option>
          <option value="Katha">Katha</option>
          <option value="Acre">Acre</option>
        </select>

      </div>
    </FormField>

    {/* LAND STATUS */}
    <FormField label="Land Status">
      <select
        name="landStatus"
        value={data.landStatus}
        onChange={handleChange}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
        focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="Registered">Registered</option>
        <option value="Unregistered">Unregistered</option>
      </select>
    </FormField>

    {/* GATED SOCIETY */}
    <FormField label="Gated Society">
      <select
        name="gatedSociety"
        value={data.gatedSociety}
        onChange={handleChange}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
        focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
    </FormField>

    {/* PROJECT STATUS */}
    <FormField label="Project Status">
      <select
        name="projectStatus"
        value={data.projectStatus}
        onChange={handleChange}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
        focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="Ready to Move">Ready to Move</option>
        <option value="Under Construction">Under Construction</option>
      </select>
    </FormField>

    {/* RATE PER KATHA */}
    <FormField label="Rate (Per Katha)">
      <input
        type="number"
        min={0}
        name="rate"
        value={data.rate}
        onChange={(e) => {
          setAutoRate(false);
          handleChange(e);
        }}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 
        focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </FormField>

    {/* MAINTENANCE */}
    {/* <FormField label="Maintenance Charges">
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
    </FormField> */}

  </>
)

}

{/* end of the plot-lan */}






{/* Hide Floor Number for Independent House */}
              {(
  data.propertyType !== "Independent House" && 
  !(
    data.transactionType === "Rent" &&
    data.propertyType === "Villa"
  )
)  && (
                <FormField label="Floor Number" error={errors?.floorno}>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      name="floorno"
                      value={data.floorno}
                      onChange={handleChange}
                      placeholder="e.g., 1"
                      className={`w-full bg-white border ${
                        errors?.floorno ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    />
                  </div>
                </FormField>
              )}

              {/* Add Total House Area specifically for Independent House */}
              {data.propertyType === "Independent House" && (
                <FormField label="Total House Area" error={errors?.totalHouseArea}>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      name="totalHouseArea"
                      value={data.totalHouseArea}
                      onChange={handleChange}
                      placeholder="e.g., 2000"
                      className={`w-full bg-white border ${
                        errors?.totalHouseArea ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    />
                     <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500">
                      sq/ft
                    </span>
                  </div>
                </FormField>
              )}

              <FormField label="Total Floors" error={errors?.totalfloors}>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    name="totalfloors"
                    value={data.totalfloors}
                    onChange={handleChange}
                    placeholder="e.g., 2"
                    className={`w-full bg-white border ${
                      errors?.totalfloors ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                </div>
              </FormField>

              <FormField label="Availabity Status">
                <div className="flex  flex-wrap gap-2 w-full rounded-lg p-1">
                  {["Ready to Move", "Under Construction"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "typeOfPossession", value: type },
                        })
                      }
                      className={`px-4 flex-wrap py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.typeOfPossession === type
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
              {data.typeOfPossession == "Under Construction" && (
                <FormField label="Possession Date">
                  <input
                    type="date"
                    name="dateOfPossession"
                    value={data.dateOfPossession}
                    onChange={handleChange}
                    placeholder="e.g., 1"
                    className={`w-full bg-white border ${
                      errors?.dateOfPossession
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                </FormField>
              )}
  

              {/* This is 1.1 change as per the doc */}

              {data.typeOfPossession === "Ready to Move" && (

              <FormField label="Age of Property" error={errors?.ageofproperty}>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    name="ageofproperty"
                    value={data.ageofproperty}
                    onChange={handleChange}
                    placeholder="e.g., 1"
                    className={`w-full bg-white border ${
                      errors?.ageofproperty
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                </div>
              </FormField>
              )}

              <FormField label="Furnishing">
                <div className="flex  flex-wrap gap-2 w-full rounded-lg p-1">
                  {["Fully Furnished", "Semi Furnished", "Unfurnished"].map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          handleChange({
                            target: { name: "furnishing", value: type },
                          })
                        }
                        className={`px-4 flex-wrap py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.furnishing === type
              ? "bg-pink-100 text-pink-700 border border-pink-500  shadow-sm"
              : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
          }
        `}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>
              </FormField>
            </>
          ) : (
            <div className="col-span-2">
              <Commercialdiscription
                data={data}
                handleChange={handleChange}
                handleCheckboxChange={handleCheckboxChange}
                errors={errors}
              />
            </div>
          )}

          <FormField label="Facing" error={errors?.facing}>
            <div className="relative">
              <input
                type="text"
                name="facing"
                value={data.facing}
                onChange={handleChange}
                placeholder="North, South, East, West"
                className={`w-full bg-white border ${
                  errors?.facing ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
            </div>
          </FormField>

          <FormField label="Expected Rent/Cost">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                ₹
              </span>
              <input
                type="number"
                min={0}
                name="rent"
                value={data.rent}
                onChange={handleChange}
                placeholder="e.g., 25000"
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </FormField>

          {/* Show Rate Per Sqft ONLY if NOT Rent → Residential → Flat */}
   {!(data.transactionType === "Rent" && data.propertyType === "Flat/Apartment" || data.propertyType === "Villa" || data.propertyType === "Independent House") && (

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
  



          <FormField label="Booking Amount">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                ₹
              </span>
              <input
                type="number"
                min={0}
                name="bookingAmount"
                value={data.bookingAmount}
                onChange={handleChange}
                placeholder="e.g., 25000"
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </FormField>
          {/* <FormField label="Maintenance Charge">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                ₹
              </span>
              <input
                type="number"
                min={0}
                name="maintenanceCharges"
                value={data.maintenanceCharges}
                onChange={handleChange}
                placeholder="e.g., 25000"
                className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
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
          {data.transactionType === "rent" ? (
            <>
              <FormField label="Security Deposit" error={errors?.security}>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={0}
                    name="security"
                    value={data.security}
                    onChange={handleChange}
                    placeholder="e.g., 50000"
                    className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </FormField>
              <Checkbox
                id="negotiable"
                label="Rent is Negotiable"
                checked={data.negotiable}
                onChange={handleCheckboxChange}
              />
            </>
          ) : (
            <></>
          )}

{
  !isPlot && (
    <>
              <Checkbox
            id="parking"
            label="Parking"
            checked={data.parking}
            onChange={handleCheckboxChange}
            className
          />
    </>
  )
}
          {data.parking ? (
            <>
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
      </>
    );

    
  }
  
  else {
    return (
      <>
        <FormField label="Property Title" error={errors?.propertyTitle}>
          <textarea
            type="text"
            name="propertyTitle"
            value={data.propertyTitle}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors?.firstName ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </FormField>
        <FormField label="Description" error={errors?.description}>
          <textarea
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors?.description ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </FormField>
        {/* {Broucher} */}
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <FormField label={"Upload Brochure"}>
              <input
                type="text"
                readOnly
                value={data?.brochure[0]?.url}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </FormField>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <a
              href={data?.brochure[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              View
            </a>
            <Uploadbutton
              initialFiles={data.brochure}
              tagName="Upload Brochure"
              onFilesChange={(e) => {
                handleChange({ target: { name: "brochure", value: e } });
              }}
              acceptedTypes={["application/pdf"]}
            />
          </div>
        </div>


        

        <ProjectForm
          data={data}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          errors={errors}
        />
      </>
    );
  }
};

export default Discreption;

import React from "react";
import { FormField } from "./Listingform";
import FireSafetyMeasures from "./Firesafetymeasure";

const Commercialdiscription = ({
  data,
  handleChange,
  handleCheckboxChange,
  errors,
}) => {


  console.log("commer",data)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="Carpet Area" error={errors?.area}>
        <div className="relative">
          <input
            type="number"
            name="area"
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

      <FormField label="Built-up Area(Optional)" error={errors?.builtUpArea}>
        <div className="relative">
          <input
            type="number"
            name="area"
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
            name="area"
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


{!(data.propertyType ==="Storage" || data.propertyType === "Industry" || data.propertyType === "Hospitality") && (
  
        <FormField label="Minimum No. of seats" error={errors?.minnoofSeats}>
        <div className="relative">
          <input
            type="number"
            name="area"
            value={data.minnoofSeats}
            onChange={handleChange}
            placeholder="e.g., 110"
            className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </FormField>
)}


{!data.propertyType ==="Hospitality" && (


      <FormField
        label="Maximum No. of seats(Optional)"
        error={errors?.maxnoofSeats}
      >
        <div className="relative">
          <input
            type="number"
            name="area"
            value={data.maxnoofSeats}
            onChange={handleChange}
            placeholder="e.g., 110"
            className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </FormField>
)}


      {/* <FormField label="No. of Cabin" error={errors?.noOfCabin}>
        <div className="relative">
          <input
            type="number"
            name="area"
            value={data.noOfCabin}
            onChange={handleChange}
            placeholder="e.g., 2"
            className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </FormField> */}
 
      <FormField label="Washroom">
        <div className="flex gap-2 w-max rounded-lg p-1">
          {["Available", "Not Available"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "OfficeWashrooom", value: type },
                })
              }
              className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.OfficeWashrooom === type
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
        data?.propertyType === "Hospitality" &&(

      <FormField label="Reception Area">
        <div className="flex gap-2 w-max rounded-lg p-1">
          {["Available", "Not Available"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "receptionArea", value: type },
                })
              }
              className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.receptionArea === type
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

        )
      }



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


      <FormField label="Pantry Type">
        <div className="flex gap-2 w-max rounded-lg p-1">
          {["Private", "Shared", "Not-Available"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "pantryType", value: type },
                })
              }
              className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.pantryType === type
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
      <FireSafetyMeasures data={data} handleChange={handleChange} />
      <FormField label="Number of Staircases">
        <div className="flex gap-2 w-max rounded-lg p-1">
          {["0", "1", "2", "3", "More than 3"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "noofstaircases", value: type },
                })
              }
              className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.noofstaircases === type
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






{data.transactionType === "Rent" &&
 data.propertyKind === "Commercial" &&
 data.propertyType === "Hospitality" && (
  <>
    {/* TOTAL PLOT */}
    <FormField
      label="Total Plot"
      error={errors?.totalPlot}
    >
      <input
        type="number"
        name="totalPlot"
        value={data.totalPlot || ""}
        onChange={handleChange}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 
                  focus:outline-none focus:ring-2 focus:ring-pink-500"
        placeholder="e.g., 5000"
      />
    </FormField>

    {/* TOTAL ROOMS */}
    <FormField
      label="Total Rooms"
      error={errors?.totalRooms}
    >
      <input
        type="number"
        name="totalRooms"
        value={data.totalRooms || ""}
        onChange={handleChange}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 
                  focus:outline-none focus:ring-2 focus:ring-pink-500"
        placeholder="e.g., 25"
      />
    </FormField>
  </>
)}



      <FormField label="Floor Number" error={errors?.floorno}>
        <div className="relative">
          <input
            type="number"
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
      <FormField label="Total Floors" error={errors?.totalfloors}>
        <div className="relative">
          <input
            type="number"
            name="totalfloors"
            value={data.totalfloors}
            onChange={handleChange}
            placeholder="e.g., 1"
            className={`w-full bg-white border ${
              errors?.totalfloors ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </div>
      </FormField>
      <FormField label="Lift">
        <div className="flex gap-2 w-max rounded-lg p-1">
          {["Available", "Not Available"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "lift", value: type },
                })
              }
              className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.lift === type
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
      <FormField label="Passenger Lift" error={errors?.passengerLift}>
        <div className="relative">
          <input
            type="number"
            name="totalfloors"
            value={data.passengerLift}
            onChange={handleChange}
            placeholder="e.g., 1"
            className={`w-full bg-white border ${
              errors?.passengerLift ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </div>
      </FormField>
      <FormField label="Service Lift" error={errors?.serviceLift}>
        <div className="relative">
          <input
            type="number"
            name="totalfloors"
            value={data.serviceLift}
            onChange={handleChange}
            placeholder="e.g., 1"
            className={`w-full bg-white border ${
              errors?.serviceLift ? "border-red-500" : "border-gray-300"
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


{data.typeOfPossession === "Ready to Move" && (
  <FormField
    label="Age of Property"
    error={errors?.ageOfProperty}
  >
    <input
      type="number"
      min="0"
      name="ageOfProperty"   
      value={data.ageOfProperty || ""}
      onChange={(e) => {
        handleChange({
          target: {
            name: "ageOfProperty", 
            value: e.target.value,
          },
        });
      }}
      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
      placeholder="e.g., 1"
    />
  </FormField>
)}

              {data.typeOfPossession == "Under Construction" && (
                <FormField label="Possession Date">
                  <input
                    type="date"
                    name="dateOfPossession"
                    value={data.dateOfPossession}
 onChange={(e) => {
        handleChange({
          target: {
            name: "ageOfProperty",   // ✅ FIXED NAME
            value: e.target.value,
          },
        }); 
      }
    }  
        
                  placeholder="e.g., 1"
                    className={`w-full bg-white border ${
                      errors?.dateOfPossession
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                </FormField>
              )}




    </div>
  );
};

export default Commercialdiscription;
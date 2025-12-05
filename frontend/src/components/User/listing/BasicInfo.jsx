import { FiChevronDown } from "react-icons/fi";
import { Checkbox, FormField } from "./Listingform";
import MediaUpload from "./UploadStep.jsx";
import ProjectForm from "./ProjectForm.jsx";

const BasicInfoStep = ({
  data,
  handleChange,
  handleCheckboxChange,
  errors,
}) => {
  console.log(data);
  return (
    <>
      <h3 className="text-base font-semibold text-gray-500 mb-4">
        Your Contact Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Title" error={errors?.title}>
          <div className="relative">
            <select
              name="title"
              value={data.title}
              onChange={handleChange}
              className={`w-full bg-white border ${
                errors?.title ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500`}
            >
              <option>Mr</option>
              <option>Mrs</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </FormField>
        <FormField label="First Name" error={errors?.firstName}>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors?.firstName ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </FormField>
        <FormField label="Last Name" error={errors?.lastName}>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors?.lastName ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </FormField>
         <FormField label="Phone Number" error={errors?.phoneNumber}>
          <input
            type="text"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors?.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </FormField>
         <FormField label="Whatsapp Number" error={errors?.whatsappNumber}>
          <input
            type="text"
            name="whatsappNumber"
            value={data.whatsappNumber}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors?.whatsappNumber ? "border-red-500" : "border-gray-300"
            } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
        </FormField>
        
      </div>
      <hr className="my-8 border-gray-200" />
      <h3 className="text-base font-semibold text-gray-500 mb-4">
        Property & Rent Details
      </h3>
      {/* <FormField label="Property Title" error={errors?.propertyTitle}>
        <textarea
          type="text"
          name="propertyTitle"
          value={data.propertyTitle}
          onChange={handleChange}
          className={`w-full bg-white border ${
            errors?.firstName ? "border-red-500" : "border-gray-300"
          } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500`}
        />
      </FormField> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="You are looking to">
          <div className="flex gap-2 w-max rounded-lg p-1">
            {["Sell", "Rent","Lease", "PG"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  handleChange({
                    target: { name: "transactionType", value: type },
                  })
                }
                className={`px-4  py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.transactionType === type
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
        
          <FormField label="And it's a">
      
          <div className="flex mb-2 ">
     
           {["Residential", "Commercial"].map((type) => (
            <div key={type}> 
             <input className="rounded-full  " checked={data.propertyKind == type} type="radio" id={type}  onChange={()=>handleChange({target:{name:"propertyKind",value:type}})} value={type} name="propertyKind" />
              <label className="ml-1 mr-4" htmlFor={type}>{type}</label></div>
           ))}

          </div>
   
     {data.propertyKind == "Residential" ? (
      <>
       <div className="flex  flex-wrap gap-2 w-full rounded-lg p-1">
            {["Flat/Apartment", "Villa", "Independent House", "Land/Plot", "Project"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  handleChange({
                    target: { name: "propertyType", value: type },
                  })
                }
                className={`px-4 flex-wrap py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.propertyType === type
              ? "bg-pink-100 text-pink-700 border border-pink-500  shadow-sm"
              : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
          }
        `}
              >
                {type}
              </button>
            ))}
          </div></>):(
            <>
          <div className="flex  flex-wrap gap-2 w-full rounded-lg p-1">
            {["Office", "Retail", "Storage", "Industry", "Hospitality","Plot/Land"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  handleChange({
                    target: { name: "propertyType", value: type },
                  })
                }
                className={`px-4 flex-wrap py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.propertyType === type
              ? "bg-pink-100 text-pink-700 border border-pink-500  shadow-sm"
              : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-50"
          }
        `}
              >
                {type}
              </button>
            ))}
          </div>
          </>)}
        </FormField>
        {/* {(data.propertyType == "Flat/Apartment" ||
        data.propertyType == "Independent House" ||
        data.propertyType == "Villa") && (data.propertyKind !="Commercial" )? (
          <FormField label="Preferred Tenant">
             <div className="flex  flex-wrap gap-2 w-full rounded-lg p-1">
            {["Family", "Couple", "Single", "Others" , "Any"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  handleChange({
                    target: { name: "tenantType", value: type },
                  })
                }
                className={`px-4 flex-wrap py-2 text-sm font-medium rounded-full transition-all duration-200
          ${
            data.tenantType === type
              ? "bg-pink-100 text-pink-700 border border-pink-500  shadow-sm"
              : ""
          }
        `}
              >
                {type}
              </button>
            ))}
          </div>
          </FormField>
        ) : (
          <></>
        )} */}
        {/* {data.propertyType != "Project" ? (
          <>
            {" "}
            <FormField label="Expected Rent/Cost">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="rent"
                  value={data.rent}
                  onChange={handleChange}
                  placeholder="e.g., 25000"
                  className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </FormField>
            {data.propertyType == "Flat/Apartment" ||
            data.propertyType == "Independent House" ||
            data.propertyType == "Villa" ? (
              <FormField label="Security Deposit" error={errors?.security}>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="security"
                    value={data.security}
                    onChange={handleChange}
                    placeholder="e.g., 50000"
                    className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </FormField>
            ) : (
              <></>
            )}
            <FormField label="Area" error={errors?.area}>
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
            <div className="md:col-span-2 flex items-end pb-2">
              {data.propertyType == "Flat/Apartment" ||
              data.propertyType == "Independent House" ||
              data.propertyType == "Villa" ? (
                <Checkbox
                  id="negotiable"
                  label="Rent is Negotiable"
                  checked={data.negotiable}
                  onChange={handleCheckboxChange}
                />
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <div className="md:col-span-2">
            <ProjectForm
              data={data}
              handleChange={handleChange}
              handleCheckboxChange={handleCheckboxChange}
              errors={errors}
            />
          </div>
        )} */}
      </div>
    </>
  );
};

export default BasicInfoStep;

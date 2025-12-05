import React from "react";

const CheckIcon = () => (
  <svg
    className="w-8 h-8 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="10.5"
      stroke="#d9006c"
      strokeWidth="1.5"
      strokeDasharray="1 1"
    />
    <path
      d="M8 12.5L10.5 15L16 9.5"
      stroke="#d9006a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const sectionData = {
  images: [
    "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  ],
  title: "Why Buy or Rent in Patna?",
  description:
    "Patna is emerging as a real estate hotspot with growing infrastructure and connectivity. Whether you're buying or renting, the city offers great value and long-term potential.",
  points: [
    "High rental demand in Kankarbagh & Boring Road",
    "Affordable land investment in Bihta & Naubatpur.",
    "Ideal for investors, working professionals, and families",
  ],
};

const Whybuy = () => {
  return (
    <div className="font-sans px-2 md:px-0">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Image Grid */}
          <div className="grid grid-cols-2 gap-4 h-[400px] md:h-[500px]">
            <div className="col-span-2 rounded-xl overflow-hidden">
              <img
                loading="lazy"
                src={sectionData.images[0]}
                alt="Cityscape of Patna"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-xl overflow-hidden">
              <img
                loading="lazy"
                src={sectionData.images[1]}
                alt="Street in Patna"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 rounded-xl overflow-hidden">
              <img
                loading="lazy"
                src={sectionData.images[2]}
                alt="Lakeside in Patna"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="md:pl-8">
            <h2 className="text-4xl lg:text-5xl font-light mb-6 text-gray-900">
              {sectionData.title}
            </h2>
            <p className="leading-relaxed mb-10 text-gray-800">
              {sectionData.description}
            </p>
            <ul className="space-y-6">
              {sectionData.points.map((point, index) => (
                <li key={index} className="flex items-center text-gray-800">
                  <CheckIcon />
                  <span className="ml-4 text-md font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whybuy;

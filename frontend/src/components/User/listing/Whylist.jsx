import React from "react";

const featuresAndBenefitsData = [
  { feature: "GFS Verified Listings", benefit: "Builds trust with buyers" },
  { feature: "Personal Assistance", benefit: "We help close deals fast" },
  { feature: "Free to List", benefit: "No upfront fee for property owners" },
  { feature: "Strong Buyer Network", benefit: "1000+ daily visitors" },
];

const Whylist = () => {
  return (
    <div className="font-sans pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Why List With GFS?
          </h2>
        </header>

        {/* Feature Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow-xl">
          {/* Table Header */}
          <div className="grid grid-cols-2">
            <div className="p-5 border-b border-r border-gray-200">
              <h3 className="text-lg font-bold text-pink-600">Features</h3>
            </div>
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-bold text-pink-600">Benefit</h3>
            </div>
          </div>

          {/* Table Body */}
          <div>
            {featuresAndBenefitsData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 text-gray-700 "
              >
                <div
                  className={`p-5 border-r border-gray-200 ${
                    index < featuresAndBenefitsData.length - 1 ? "border-b" : ""
                  }`}
                >
                  <p className="font-medium">{item.feature}</p>
                </div>
                <div
                  className={`p-5 border-gray-200 ${
                    index < featuresAndBenefitsData.length - 1 ? "border-b" : ""
                  }`}
                >
                  <p>{item.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whylist;

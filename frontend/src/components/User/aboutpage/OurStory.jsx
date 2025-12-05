import React from "react";
import {
  IoHomeOutline,
  IoMegaphoneOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { FiTarget } from "react-icons/fi";

const servicesData = [
  {
    icon: <IoHomeOutline />,
    title: "Buy / Rent / Lease",
    description: "Residential and commercial properties across cities.",
  },
  {
    icon: <FiTarget />,
    title: "Land & Plots",
    description: "Verified land deals with legal support.",
  },
  {
    icon: <IoMegaphoneOutline />,
    title: "Project Marketing",
    description: "For developers and builders across Bihar & North Bengal.",
  },
  {
    icon: <IoChatbubbleEllipsesOutline />,
    title: "End-to-End Support",
    description: "Site visits, negotiation, paperwork, documentation.",
  },
];

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171";

const OurStory = () => {
  return (
    <div className="font-sans px-2 md:px-0">
      {/* --- Top Section: Our Story --- */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-5xl md:text-[3.3vw] font-bold text-gray-500 leading-tight">
              Our Story
            </h2>
          </div>
          <div>
            <div className="text-gray-700 leading-relaxed text-lg space-y-4">
              <p>
                We started with a simple idea — to make property search easy,
                transparent, and trustworthy.
              </p>
              <p>
                Finding the right home or investment shouldn’t be stressful.
                That’s why we built a platform that connects buyers, sellers,
                and renters with verified properties and real people — no
                middlemen, no confusion.
              </p>
              <p>
                From city apartments to countryside plots, we’ve helped
                thousands discover the right space for their needs. What drives
                us is not just property — it’s people, dreams, and smart
                decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Section: Services --- */}
      <div className="relative py-20 sm:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl sm:text-[2.7vw] font-bold drop-shadow-lg">
            Everything You Need, Under One Roof
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Travel anywhere in the world
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-left flex items-center space-x-5 border border-white/20"
              >
                <div className="bg-white/10 p-3 rounded-full text-3xl flex-shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{service.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;

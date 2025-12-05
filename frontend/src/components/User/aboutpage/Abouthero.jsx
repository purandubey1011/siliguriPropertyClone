import React from "react";
import {
  IoSparklesOutline,
  IoHomeOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";

const images = [
  "https://images.unsplash.com/photo-1587913560680-7f8187bf9634?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1587913560680-7f8187bf9634?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
];

const stats = [
  { icon: <IoSparklesOutline />, text: "20+ Years Of Trust" },
  { icon: <IoHomeOutline />, text: "1000+ Properties Served" },
  { icon: <IoChatbubbleEllipsesOutline />, text: "Personalized Assistance" },
];

const StatItem = ({ icon, text }) => (
  <div className="flex items-center justify-center p-4">
    <div className="text-pink-700 text-3xl mr-4">{icon}</div>
    <span className="font-bold text-lg text-gray-600">{text}</span>
  </div>
);

const Abouthero = () => {
  return (
    <div className="bg-white px-2 md:px-0 mt-20 font-sans">
      <div className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-6">
        {/* --- Header Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#676565] leading-tight">
              Trusted Real Estate
              <br />
              Experts in{" "}
              <span className="text-[#163d65]">Siliguri, Bihar,</span>
              <br />
              <span className="text-[#163d65]">North Bengal & Sikkim</span>
            </h1>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-gray-500 text-lg leading-relaxed">
              With two decades of local experience and verified property
              solutions, GFS Realtors is more than just a name — we are your
              property partner.
            </p>
          </div>
        </div>

        {/* --- Image Grid --- */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                loading="lazy"
                src={src}
                alt={`Property view ${index + 1}`}
                className="w-full h-72 sm:h-96 object-cover"
              />
            </div>
          ))}
        </div>

        {/* --- Stats Section --- */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {stats.map((stat, index) => (
              <StatItem key={index} icon={stat.icon} text={stat.text} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abouthero;

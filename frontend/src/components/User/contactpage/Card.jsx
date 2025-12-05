import React from 'react';
import { FiMapPin } from 'react-icons/fi';

const images = [
  'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332',
  'https://images.unsplash.com/photo-1616137303871-05ce745f9cdb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332',
  'https://images.unsplash.com/photo-1722942723472-e18bf17439fe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
  'https://images.unsplash.com/photo-1722858813735-ddb261233a84?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
];

const DecorativeLine = () => (
  <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1222"
      height="419"
      viewBox="0 0 1222 419"
      fill="none"
    >
      <path
        d="M-16.3493 374.104C-33.016 319.771 -44.5493 204.804 42.6507 179.604C151.651 148.104 206.651 86.1043 191.651 55.1043C176.651 24.1043 229.651 -108.896 291.151 11.6043C352.651 132.104 505.651 610.104 667.651 332.604C829.651 55.1043 1167.15 51.6042 1221.15 128.104"
        stroke="white"
        strokeDasharray="10 10"
      />
    </svg>

    <div className="absolute" style={{ top: '150px', left: '350px' }}>
      <FiMapPin className="text-white text-2xl" />
    </div>
  </div>
);

const ImageCollage = () => (
  <div className="absolute inset-y-0 -right-10 w-full lg:w-3/4 transform lg:rotate-8 lg:scale-125">
    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-4">
      {images.map((src, index) => (
        <div key={index} className="rounded-xl overflow-hidden shadow-lg">
          <img
            loading="lazy"
            src={src}
            alt={`Property ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>
);

const Card = () => {
  return (
    <div className="bg-white p-6 md:p-4 lg:p-8">
      <div className="relative bg-[#d0066b] rounded-3xl overflow-hidden font-sans">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="relative lg:w-3/5 p-8 md:p-12 lg:p-16 text-white z-10">
            <h2 className="text-4xl md:text-5xl font-medium leading-tight">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="mt-4 text-white/80 max-w-md text-lg">
              Book your luxury home rental today and explore the coastline in style.
            </p>
            <div>
              <button className="mt-8 bg-white text-[#d9006c] font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors">
                Explore Now
              </button>
            </div>
            <DecorativeLine />
          </div>

          {/* Right Section */}
          <div className="relative lg:w-2/5 min-h-[400px] lg:min-h-0">
            <ImageCollage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

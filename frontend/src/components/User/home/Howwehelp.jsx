import React, { useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

const stepsData = [
  {
    id: 1,
    title: 'Show Interest',
    description:
      'Browse our trusted, verified listings and tell us what you like. We have properties for every need and budget.',
    imageSrc:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'We Step In',
    description:
      'Our GFS team personally connects with you to guide, support, and answer any questions.',
    imageSrc:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Site Visit',
    description:
      'We arrange a convenient time for you to visit the properties that caught your eye and see them for yourself.',
    imageSrc:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Close The Deal',
    description:
      'We assist with all paperwork and negotiations to ensure a smooth, transparent, and successful transaction.',
    imageSrc:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
  },
];

const Howwehelp = () => {
  const [activeStep, setActiveStep] = useState(2);
  const activeStepData = stepsData.find((step) => step.id === activeStep);

  return (
    <div className="font-sans overflow-hidden bg-gradient-to-r from-pink-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-16 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left">
            <div className="inline-block bg-[#FBE7F1] border border-[#EDA2C7] text-pink-600 rounded-full px-4 py-2 text-sm mb-4">
              <HiOutlineMenuAlt2 className="inline-block mr-2 text-lg" />
              How We Help You
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Simplifying Property Deals, Step by Step
            </h2>

            {/* Step Selector */}
            <div className="mt-8 flex justify-center lg:justify-start space-x-2">
              {stepsData.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center justify-center rounded-lg font-bold transition-all duration-300 ${
                    activeStep === step.id
                      ? 'w-20 h-10 bg-pink-600 text-white scale-110 shadow-lg'
                      : 'w-10 h-10 border border-pink-400 text-pink-600 hover:bg-pink-100'
                  }`}
                >
                  {activeStep === step.id ? 'Step ' : ''}
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative h-[500px] w-full flex justify-center items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white w-[85%] md:w-3/4">
              <img
                loading="lazy"
                src={activeStepData.imageSrc}
                alt={activeStepData.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute flex flex-col justify-between bottom-0 top-0 left-0 right-0 p-6 bg-[#0000004D] text-white">
                <div className="flex items-center space-x-4">
                  <span className="text-sm uppercase tracking-wider">Step</span>
                  <span className="text-5xl lg:text-6xl font-bold opacity-80">
                    {String(activeStep).padStart(2, '0')}
                  </span>
                  <span className="flex-1 border-b border-white/30"></span>
                  <h3 className="text-xl lg:text-2xl font-semibold">
                    {activeStepData.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm md:text-base">
                  {activeStepData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Howwehelp;

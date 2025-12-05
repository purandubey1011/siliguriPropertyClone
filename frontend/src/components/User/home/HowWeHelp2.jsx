import React from 'react';
import { FiAlignLeft } from 'react-icons/fi';

const stepsData = [
  {
    stepNumber: '01',
    title: 'We Step In',
    description:
      'Our GFS team personally connects with you to guide, support, and answer any questions.',
    imageSrc:
      'https://ik.imagekit.io/6ub8gavnw/5026b088841577e1091c48c6af3baa9c5eccee2d.jpg',
  },
  {
    stepNumber: '02',
    title: 'Show Interest',
    description:
      'Browse trusted, verified listings and tap "Contact" to get started.',
    imageSrc:
      'https://ik.imagekit.io/6ub8gavnw/807a914420fe6a15307d24a5c786f9c032889662.jpg',
  },
  {
    stepNumber: '03',
    title: 'You Close Confidently',
    description:
      'We coordinate with the property owner and handle the details — so you can seal the deal with confidence.',
    imageSrc:
      'https://ik.imagekit.io/6ub8gavnw/46ec5be47ea15a9a1c17599b20c9957cfe81831f.jpg',
  },
];

const StepCard = ({ step }) => (
  <div className="flex flex-col px-2 md:px-0 text-center md:text-left">
    <div className="overflow-hidden rounded-2xl shadow-lg mb-3">
      <img
        src={step.imageSrc}
        alt={step.title}
        className="w-full h-64 object-cover"
      />
    </div>
    <p className="text-pink-400 font-semibold mb-2">Step {step.stepNumber}</p>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
    <p className="text-gray-600 leading-5 max-w-sm mx-auto md:mx-0">
      {step.description}
    </p>
  </div>
);

const HowWeHelp2 = () => {
  return (
    <div className="bg-pink-50/50 font-sans py-16 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mx-auto md:mx-0 mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-pink-200 text-pink-600 font-semibold px-4 py-2 rounded-full mb-4">
            <FiAlignLeft />
            <span>How We Help You</span>
          </div>
          <h1 className="text-4xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Simplifying Property Deals, Step by Step
          </h1>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
          {stepsData.map((step) => (
            <StepCard key={step.stepNumber} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowWeHelp2;

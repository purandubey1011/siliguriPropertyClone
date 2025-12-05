import React, { useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiArrowUpRight, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const localitiesData = [
  { name: 'Sarjapur Road', projects: 96, rating: 5, image: 'https://plus.unsplash.com/premium_photo-1669223464660-08f06bffabc0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', imagePosition: 'right' },
  { name: 'Whitefield', projects: 84, rating: 4, image: 'https://plus.unsplash.com/premium_photo-1669223464660-08f06bffabc0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', imagePosition: 'left' },
  { name: 'Koramangala', projects: 78, rating: 5, image: 'https://plus.unsplash.com/premium_photo-1669223464660-08f06bffabc0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', imagePosition: 'left' },
  { name: 'Electronic City', projects: 112, rating: 4, image: 'https://plus.unsplash.com/premium_photo-1669223464660-08f06bffabc0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', imagePosition: 'right' },
];

const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, index) => (
        <FaStar key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'} />
      ))}
      <span className="text-sm text-gray-500 ml-2">{rating} Star</span>
    </div>
  );
};

const LocalityCard = ({ locality, onProjectsClick }) => (
  <div
    className={`flex-none w-80 sm:w-96 lg:w-[450px] bg-white rounded-xl shadow-xl p-6 flex flex-col-reverse md:flex-row gap-6 items-center ${
      locality.imagePosition === 'left' ? 'md:flex-row-reverse' : ''
    }`}
  >
    <div className="flex-1 space-y-2 w-full md:w-auto text-center md:text-left">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{locality.name}</h3>
      <p className="text-gray-500">{locality.projects} New Projects</p>
      <StarRating rating={locality.rating} />
      <button
        onClick={onProjectsClick}
        className="w-full bg-[#D1006B] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-around"
      >
        <span className='text-lg'>Projects</span>
        <FiArrowUpRight className="text-2xl" />
      </button>
    </div>
    <div className="w-full h-48 md:w-40 flex-shrink-0">
      <img
        src={locality.image}
        alt={locality.name}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  </div>
);

const EmergingLocalities = () => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleNavigateToLocality = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/projects/${slug}`);
  };

  return (
    <div className="bg-white py-16 sm:py-24 font-sans overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            Emerging Localities
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Localities with recent development in Bangalore East
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => handleScroll('left')}
            className="absolute top-1/2 -translate-y-1/2 -left-0 z-10 bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white opacity-0 md:opacity-100"
            aria-label="Scroll left"
          >
            <FiChevronLeft size={24} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex space-x-4 sm:space-x-8 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex-none w-px sm:w-2 md:w-4 lg:w-8"></div>

            {localitiesData.map((locality, index) => (
              <div key={`${locality.name}-${index}`}>
                <LocalityCard
                  locality={locality}
                  onProjectsClick={() => handleNavigateToLocality(locality.name)}
                />
              </div>
            ))}

            <div className="flex-none w-px sm:w-2 md:w-4 lg:w-8"></div>
          </div>

          <button
            onClick={() => handleScroll('right')}
            className="absolute top-1/2 -translate-y-1/2 -right-0 z-10 bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white opacity-0 md:opacity-100"
            aria-label="Scroll right"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergingLocalities;

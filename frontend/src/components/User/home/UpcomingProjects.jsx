import React, { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { gsap } from 'gsap';
import { Check } from 'lucide-react';
import { MdVerified } from 'react-icons/md';

const projects = [
  {
    id: 1,
    groupName: 'FLY HIGH GROUPS',
    logo: 'https://plus.unsplash.com/premium_photo-1686090448517-2f692cc45187?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    projectName: 'Fly High Blocks',
    address: '65 Central Park West PH, New York City, NY 10023',
    apartmentType: '3, 4 BHK Apartments',
    priceRange: '$500k-1500k',
    image: 'https://plus.unsplash.com/premium_photo-1686090448517-2f692cc45187?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    status: 'For Sale',
  },
  {
    id: 2,
    groupName: 'SKYLINE ESTATES',
    logo: 'https://plus.unsplash.com/premium_photo-1686090448517-2f692cc45187?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    projectName: 'The Zenith Tower',
    address: '123 Beacon Street, Boston, MA 02116',
    apartmentType: '2, 3 BHK Penthouses',
    priceRange: '$800k-2200k',
    image: 'https://plus.unsplash.com/premium_photo-1686090448517-2f692cc45187?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    status: 'New Launch',
  },
  {
    id: 3,
    groupName: 'OCEANVIEW PROPERTIES',
    logo: 'https://plus.unsplash.com/premium_photo-1686090448517-2f692cc45187?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    projectName: 'Marina Sands',
    address: '45 Ocean Drive, Miami, FL 33139',
    apartmentType: '1, 2 BHK Suites',
    priceRange: '$400k-950k',
    image: 'https://plus.unsplash.com/premium_photo-1686090448517-2f692cc45187?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    status: 'For Sale',
  },
];

const ProjectCard = ({ project }) => {
  if (!project) return null;
  return (
    <div className="bg-[#efeded] w-full max-w-4xl rounded-3xl shadow-lg overflow-hidden px-2 flex flex-col-reverse md:flex-row">
      <div className="w-full md:w-5/12 p-8 flex flex-col">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src={project.logo}
              alt={`${project.groupName} Logo`} 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-gray-800">{project.groupName}</h2>
              <a href="#" className="text-sm text-gray-600 underline hover:text-[#D2046D]">
                View All Projects
              </a>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{project.projectName}</h3>
          <p className="text-gray-700 mt-1">{project.address}</p>
          <p className="text-xl font-semibold text-gray-800 mt-6">{project.apartmentType}</p>
        </div>
        <div className="mt-8">
          <p className="text-gray-600">Starting From</p>
          <p className="text-4xl font-bold text-gray-900 tracking-tight">
            {project.priceRange}
          </p>
          <button className="mt-6 w-full bg-[#D2046D] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-transform hover:scale-105">
            Contact Now
          </button>
        </div>
      </div>
      <div className="w-full md:w-7/12 relative aspect-[4/3] md:aspect-auto">
        <img
          src={project.image}
          alt={project.projectName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className='absolute top-4 flex items-center gap-2 right-4 bg-white text-green-700 text-sm font-semibold px-4 py-1.5 rounded-md shadow-sm'>< MdVerified/> Rera Approved</span>
        <span className="absolute bottom-4 left-4 bg-white text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-md shadow-sm">
          {project.status}
        </span>
      </div>
    </div>
  );
};


const UpcomingProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return; 
    setIsAnimating(true);
    

    gsap.to(cardRef.current, {
      x: "-100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {

        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
        gsap.set(cardRef.current, { x: "100%" });
        

        gsap.to(cardRef.current, {
          x: "0%",
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => setIsAnimating(false), 
        });
      },
    });
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    gsap.to(cardRef.current, {
      x: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
        gsap.set(cardRef.current, { x: "-100%" });
        
        gsap.to(cardRef.current, {
          x: "0%",
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => setIsAnimating(false),
        });
      },
    });
  };

  return (
    <div className="bg-[#FFF9FB] font-sans px-1 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Upcoming Projects
          </h1>
          <p className="mt-3 text-gray-500 text-lg">
            Visit these projects and get early bird benefits
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-4xl flex items-center justify-center">
          <button 
            // onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 -left-5 sm:-left-12 z-20 bg-[#D2046D] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          

          <div className="w-full overflow-hidden">
            <div ref={cardRef}>
              <ProjectCard project={projects[currentIndex]} />
            </div>
          </div>

          <button 
            // onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 -right-5 sm:-right-12 z-20 bg-[#D2046D] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingProjects;
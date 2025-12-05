import React, { useEffect, useRef } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';


// gsap.registerPlugin(ScrollTrigger);


const regionData = {
  siliguri: { name: 'Siliguri', places: '4 Places', img: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=730' },
  sikkim: { name: 'Sikkim', places: '4 Places', img: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=730' },
  patna: { name: 'Patna / Bihar', places: '4 Places', img: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=730' },
  northBengal: { name: 'North Bengal Towns', places: '4 Places', img: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=730' },
};

const RegionCard = ({ name, places, img, className = '' }) => (
  <a
    href="#"
    className={`block relative rounded-3xl overflow-hidden group cursor-pointer bg-cover bg-center  ${className}`}
    style={{ backgroundImage: `url(${img})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
      <h3 className="text-lg md:text-3xl md:font-bold text-white leading-tight">{name}</h3>
      <p className="text-gray-300 text-sm md:text-base mt-1">{places}</p>
    </div>
    <FiArrowUpRight className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-white text-3xl opacity-70 " />
  </a>
);

const Explorebyregion = () => {
  const componentRef = useRef(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: componentRef.current,
  //         start: 'top 80%',
  //         toggleActions: 'play none none reverse',
  //       },
  //     });

  //     tl.fromTo('.explore-title', 
  //       { opacity: 0, y: 50 },
  //       { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  //     )
  //     .fromTo('.explore-p', 
  //       { opacity: 0, y: 30 },
  //       { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
  //       "-=0.6"
  //     )
  //     .fromTo('.explore-card', 
  //       { opacity: 0, y: 50 },
  //       { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
  //       "-=0.5"
  //     )
  //     .fromTo('.explore-button',
  //       { opacity: 0, scale: 0.8 },
  //       { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
  //       "-=0.3"
  //     );

  //   }, componentRef);
  //   return () => ctx.revert();
  // }, []);

  return (
    <div ref={componentRef} className="bg-white text-gray-900 py-24 px-6 md:px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="explore-title  text-4xl md:text-5xl font-medium text-gray-800">Explore by Region</h2>
          <p className="explore-p  text-gray-500 mt-2">Travel anywhere in the world</p>
        </div>

        {/* Region Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Tall Card */}
          <div className="explore-card ">
            <RegionCard {...regionData.siliguri} className="h-96 md:h-auto lg:h-[600px]" />
          </div>

          {/* Column 2: Two Stacked Cards */}
          <div className="explore-card  grid grid-cols-2 md:grid-cols-1 gap-6">
            <RegionCard {...regionData.sikkim} className="h-52 md:h-full" />
            <RegionCard {...regionData.patna} className="h-52 md:h-full" />
          </div>

          {/* Column 3: Tall Card */}
          <div className="explore-card ">
            <RegionCard {...regionData.northBengal} className="h-96 md:h-auto md:aspect-[3/4] lg:h-[600px]" />
          </div>
        </div>

        {/* "Explore Now" Button */}
        <div className="flex justify-center mt-16">
          <button className="explore-button  text-pink-600 border border-pink-600 rounded-full px-10 py-3 font-semibold ">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explorebyregion;
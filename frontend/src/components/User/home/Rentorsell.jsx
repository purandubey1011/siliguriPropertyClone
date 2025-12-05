import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Rentorsell = () => {
  const componentRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Timeline for text animations
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: componentRef.current,
//           start: 'top 80%',
//           toggleActions: 'play none none reverse',
//         },
//       });

//       tl.fromTo(
//         '.rent-title',
//         { opacity: 0, y: 40 },
//         { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
//       )
//         .fromTo(
//           '.rent-p',
//           { opacity: 0, y: 30 },
//           { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
//           '-=0.5'
//         )
//         .fromTo(
//           '.rent-btn',
//           { opacity: 0, scale: 0.9 },
//           { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
//           '-=0.4'
//         );

//       // Separate animation for the image
//       gsap.fromTo(
//         '.rent-img',
//         { opacity: 0, x: 80, scale: 1.05 },
//         {
//           opacity: 1,
//           x: 0,
//           scale: 1,
//           duration: 1.2,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: componentRef.current,
//             start: 'top 85%',
//             toggleActions: 'play none none reverse',
//           },
//         }
//       );
//     }, componentRef);

//     return () => ctx.revert();
//   }, []);

  return (
    <div ref={componentRef} className="font-sans mx-6 my-12 sm:p-8">
      <div className="relative max-w-7xl mx-auto border border-[#CBCACA] bg-gradient-to-r from-pink-50/80 to-white rounded-3xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column */}
          <div className="p-8 sm:p-12 lg:p-16 text-center lg:text-left lg:w-3/5 xl:w-1/2 z-10">
            <h2 className="rent-title  text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
              Got a Property to<br />
              <span className="">Rent</span> or{' '}
              <span className="text-[#D63183]">Sell?</span>
            </h2>
            <p className="rent-p mt-2 text-gray-700 max-w-md mx-auto lg:mx-0 text-lg leading-snug">
              Got a property to rent or sell? Let us help you close with confidence.
            </p>
            <button className="rent-btn  mt-4 bg-[#D11A75] text-white font-semibold px-10 py-3 rounded-full shadow-md">
              Explore Now
            </button>
          </div>

          {/* Right Column */}
          <div className="h-80 md:h-96 lg:h-auto lg:flex-1 flex justify-center items-center">
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1568605115459-4b731184f961?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
              alt="Modern house for rent or sell"
              className="rent-img  h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rentorsell;

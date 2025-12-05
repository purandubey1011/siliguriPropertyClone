import React, { useEffect, useRef } from 'react';
import { BsCardChecklist } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { IoLocationSharp } from 'react-icons/io5';


// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';



// gsap.registerPlugin(ScrollTrigger);


const DottedLine = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1440" height="487" viewBox="0 0 1440 487" fill="none"
    className="absolute left-1/2 -translate-x-1/2 top-36 w-full h-auto pointer-events-none z-0"
    style={{ maxWidth: '1440px' }}
  >
    <path
      className="dotted-path"
      opacity="0.2"
      d="M1465 486C1429.43 441.191 1324.02 412.581 1217.33 405.618C1110.64 398.655 1002.32 409.826 899.02 423.46C795.722 437.094 692.89 453.404 585.376 457.154C477.863 460.903 362.026 450.23 285.579 416.742C233.006 393.698 199.823 360.612 132.686 346.694C71.9334 334.11 0.849466 340.891 -65.2658 346.007C-131.381 351.122 -206.967 353.262 -258.105 334.165C-310.014 314.768 -316.543 278.84 -288.921 251.447C-261.298 224.053 -206.752 203.803 -150.269 187.067C-93.7855 170.331 -33.1051 155.899 16.4186 135.326C65.9423 114.753 104.04 86.2147 98.9282 56.334C93.8162 26.4533 33.2613 -2.17999 -34.3786 1.28569"
      stroke="#6F56FA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeDasharray="6.3 11.82"
    />
  </svg>
);

const featuresData = [
  { icon: BsCardChecklist, text: "Not Just Listings Personal Help from Start to Finish" },
  { icon: GoVerified, text: "GFS Verified Properties Only" },
  { icon: FiPhoneCall, text: "Real Assistance We Call You & Help You Close" },
  { icon: IoLocationSharp, text: "Deep Local Knowledge in Every City We Serve" },
  { icon: BsCardChecklist, text: "All Properties are RERA Approved" },
];

const Gfs = () => {
  const componentRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: componentRef.current,
//           start: 'top 80%', 
//           end: 'bottom top',
//           toggleActions: 'play none none reverse',
//         }
//       });
      
//       tl.from('.dotted-path', { opacity: 0, duration: 1, ease: 'none' }, 0.2);
      
//       tl.fromTo('.gfs-title', 
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
//         0.5 
//       );

//       tl.fromTo('.gfs-card', 
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
//         "-=0.5" 
//       );

//     }, componentRef); 

//     return () => ctx.revert(); 
//   }, []);

  return (
    <div ref={componentRef} className="relative px-2 font-sans overflow-hidden">
      {/* <DottedLine /> */}
      <div className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 gfs-title ">
          <h2 className="text-4xl md:text-[3vw] font-base text-gray-800 ">
            Why GFS Works
            <br />
            Better Than Portals
          </h2>
        </div>


        <div className="flex justify-center flex-wrap  gap-8">
          {featuresData.map((feature, index) => {
            const IconComponent = feature.icon;
            return (

              <div key={index} className="gfs-card w-80 bg-[#FEFEFF] overflow-hidden relative border border-gray-200 rounded-2xl flex flex-col transform">

                <div className="w-20 h-20 relative -left-2 -top-2 mb-6 flex items-center justify-center rounded-full bg-violet-100 flex-shrink-0">
                  <IconComponent className="text-4xl text-indigo-900" />
                </div>

                <p className="text-black px-4 pb-6">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gfs;
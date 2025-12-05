import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const blogPostsData = [
  {
    id: 1,
    imageSrc: 'https://images.unsplash.com/photo-1721222205991-d74bcb224330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
    title: 'From Search to Signature: The GFS Way',
    description: 'ExchangeWire’s Industry Review 2025 provides a definitive guide to the year ahead,...',
  },
  {
    id: 2,
    imageSrc: 'https://images.unsplash.com/photo-1560026301-88340cf16be7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    title: 'ExchangeWire’s Industry Review 2025',
    description: 'ExchangeWire’s Industry Review 2025 provides a definitive guide to the year ahead,...',
  },
  {
    id: 3,
    imageSrc: 'https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    title: 'ExchangeWire’s Industry Review 2025',
    description: 'ExchangeWire’s Industry Review 2025 provides a definitive guide to the year ahead,...',
  },
];

const PropertyBlog = () => {
  const componentRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: componentRef.current,
//           start: 'top 80%', 
//           toggleActions: 'play none none reverse',
//         },
//       });


//       tl.fromTo('.blog-title', 
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
//       );
//       tl.fromTo('.blog-card', 
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
//         "-=0.5" 
//       );

//     }, componentRef); 

//     return () => ctx.revert(); 
//   }, []);

  return (
    <div  className="text-white font-sans py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="blog-title  text-4xl md:text-5xl font-light text-black">
            The GFS
            <br />
            Property Blog
          </h2>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 px-2 md:px-0 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPostsData.map((post) => (
            <div 
              key={post.id} 
              className="blog-card  bg-white rounded-xl overflow-hidden shadow-xs shadow-gray-900/50"
            >
              <img loading='lazy' 
                src={post.imageSrc} 
                alt={post.title} 
                className="w-full h-56 object-cover" 
              />
              <div className="p-8">
                <span className="bg-pink-100 text-pink-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                  Blog
                </span>
                <h3 className="mt-5 text-xl font-bold text-gray-900 leading-tight">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {post.description}
                </p>
                <a 
                  href="" 
                  className="mt-6 inline-block text-pink-600 font-bold border-b-2 border-pink-600 pb-1 "
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyBlog;
import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = () => {
  // State to track whether the button should be visible
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility based on scroll position
  const toggleVisibility = () => {
    // Show button if page is scrolled down more than 300px
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to handle the scroll-to-top action
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This provides the smooth scrolling effect
    });
  };

  // Set up a scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          bg-pink-600 
          text-white 
          font-bold 
          rounded-full 
          w-12 h-12 
          flex 
          items-center 
          justify-center 
          shadow-lg 
          hover:bg-pink-700 
          focus:outline-none 
          focus:ring-2 
          focus:ring-pink-500 
          focus:ring-opacity-50
          transition-opacity 
          duration-300 
          ease-in-out
          ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ScrollToTop;
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sunita Sharma',
      location: 'Siliguri',
      text: 'Listing my flat was surprisingly easy. I found a great tenant in just one week! The entire process was seamless.',
    },
    {
      name: 'Amit Kumar',
      location: 'Patna',
      text: 'GFS Realtors has a huge network. I received over 15 genuine inquiries for my plot within days. Highly recommended.',
    },
    {
      name: 'Priya Chettri',
      location: 'Gangtok',
      text: 'The zero brokerage promise is real! I saved a lot of money and the team was very helpful throughout.',
    },
  ];

  return (
    <div className="py-20 px-2 md:px-0 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-[2.9vw] font-bold text-center text-gray-800 mb-12">
          What Owners Say About Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
              <FaQuoteLeft className="text-pink-600 text-2xl mb-4" />
              <p className="text-gray-600 font-semibold italic mb-6">{testimonial.text}</p>
              <div className="flex items-center">
                <img
                  loading="lazy"
                  src={`https://i.pravatar.cc/40?img=${index + 10}`}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-lg text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;

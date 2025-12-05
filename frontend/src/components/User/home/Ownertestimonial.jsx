import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "We came in with a Pinterest board full of ideas and left with the home of our dreams! The team made everything so easy, listening to every little detail and turning our scattered thoughts into something magical.",
    projectImage:
      "https://images.unsplash.com/photo-1613225948418-75203137b5db?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1255",
    author: {
      name: "Rohan Ranjith",
      location: "Bengaluru, Karnataka",
      avatar:
        "https://images.unsplash.com/photo-1631306006587-104f389b9411?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    },
  },
  {
    id: 2,
    quote:
      "The direct connection with genuine buyers was a game-changer. We sold our plot in Siliguri without any brokerage fees, saving us a significant amount of money. The process was transparent and fast.",
    projectImage:
      "https://images.unsplash.com/photo-1613225948418-75203137b5db?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1255",
    author: {
      name: "Priya Sharma",
      location: "Siliguri, West Bengal",
      avatar:
        "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    },
  },
  {
    id: 3,
    quote:
      "Finding a tenant for our commercial space in Patna was always a hassle. With GFS, we received verified leads and their personal assistance helped us close the deal in record time. Highly professional!",
    projectImage:
      "https://images.unsplash.com/photo-1613225948418-75203137b5db?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1255",
    author: {
      name: "Amit Kumar",
      location: "Patna, Bihar",
      avatar:
        "https://images.unsplash.com/photo-1567784177951-6fa58317e16b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    },
  }
];

const Ownertestimonial = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);

  const handleUserSelect = (id) => {
    const newTestimonial = testimonials.find((t) => t.id === id);
    if (newTestimonial) setActiveTestimonial(newTestimonial);
  };

  const activeUser = activeTestimonial;
  const otherUsers = testimonials.filter((t) => t.id !== activeUser.id);

  return (
    <div className="bg-white font-sans p-5">
      <div className="bg-[#0B2D52] rounded-3xl py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div key={activeUser.id}>
            <div className="mb-7 inline-block shadow-xl rounded-2xl overflow-hidden">
              <img
                loading="lazy"
                src={activeUser.projectImage}
                alt="Dream home project"
                className="w-full max-w-sm h-auto rounded-2xl object-cover"
              />
            </div>
            <blockquote className="text-2xl md:text-3xl font-normal text-white leading-snug max-w-3xl mx-auto">
              “{activeUser.quote}”
            </blockquote>
          </div>

          {/* Avatar Section */}
          <div className="mt-8 flex justify-center items-center space-x-3 sm:space-x-4">
            <div className="bg-gray-200 p-2 rounded-xl flex items-center shadow-lg ring-2 ring-white/50">
              <img
                loading="lazy"
                src={activeUser.author.avatar}
                alt={activeUser.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3 text-left">
                <p className="font-bold text-gray-900">
                  {activeUser.author.name}
                </p>
                <p className="text-sm text-gray-800">
                  {activeUser.author.location}
                </p>
              </div>
            </div>

            {otherUsers.map((user) => (
              <div
                key={user.id}
                // onClick={() => handleUserSelect(user.id)}
                className="cursor-pointer"
              >
                <img
                  loading="lazy"
                  src={user.author.avatar}
                  alt={user.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ownertestimonial;

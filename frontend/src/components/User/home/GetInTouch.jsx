import React from "react";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1165";

const GetInTouch = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center font-sans py-12 px-6 md:px-4 overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white max-w-5xl mx-auto">
        {/* Tag */}
        <div className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full mb-6">
          Get In Touch
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-12 drop-shadow-lg">
          Let's Make Your Property
          <br />
          Journey Effortless
        </h1>

        {/* Subheading */}
        <p className="mt-4 max-w-2xl text-gray-200 font-light drop-shadow-md">
          We’d love to hear from you! Whether you’re buying, selling, or listing
          a property, our team is here to guide you every step of the way. Reach
          out today and let’s turn your real estate goals into reality!
        </p>

        {/* Glassmorphic Form */}
        <div className="mt-8 w-full max-w-4xl p-8 sm:p-12 bg-white/10 backdrop-blur-xs rounded-3xl border border-white/20 shadow-2xl">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="relative">
                <input
                  type="text"
                  id="first-name"
                  placeholder="First Name"
                  className="peer w-full bg-transparent border-b-2 border-white/30 text-white placeholder-transparent focus:outline-none focus:border-white py-2"
                />
                <label
                  htmlFor="first-name"
                  className="absolute left-0 -top-5 text-sm text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-white"
                >
                  First Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="last-name"
                  placeholder="Last Name"
                  className="peer w-full bg-transparent border-b-2 border-white/30 text-white placeholder-transparent focus:outline-none focus:border-white py-2"
                />
                <label
                  htmlFor="last-name"
                  className="absolute left-0 -top-5 text-sm text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-white"
                >
                  Last Name
                </label>
              </div>

              <div className="relative md:col-span-2">
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className="peer w-full bg-transparent border-b-2 border-white/30 text-white placeholder-transparent focus:outline-none focus:border-white py-2"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-5 text-sm text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-white"
                >
                  Email Address
                </label>
              </div>

              <div className="relative md:col-span-2">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="peer w-full bg-transparent border-b-2 border-white/30 text-white placeholder-transparent focus:outline-none focus:border-white py-2"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-5 text-sm text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-white"
                >
                  Password
                </label>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full bg-white text-black font-bold py-4 rounded-full"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;

import React from "react";
import {
  FiMapPin,
  FiClock,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const backgroundImageUrl =
  "https://plus.unsplash.com/premium_photo-1661963439471-0d0eeb1330d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171";

const socialLinks = [
  {
    icon: <FaFacebookF />,
    href: "https://www.facebook.com/GFS.Realtors/?ref=embed_page#",
  },
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/gfsrealtors/?hl=en",
  },
  {
    icon: <FaLinkedinIn />,
    href: "https://www.linkedin.com/company/gfs-realtors/?originalSubdomain=in",
  },
];

const Contacthero = () => {
  return (
    <div
      className="relative mt-20 md:mt-30 m-5 bg-cover bg-center rounded-4xl font-sans"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Dark Blue Overlay */}
      <div className="absolute inset-0 bg-[#022a53b7] rounded-4xl" />

      <div className="relative max-w-7xl mx-auto py-20 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* --- Left Column --- */}
          <div className="text-white">
            <h1 className="text-4xl sm:text-[2.6vw] font-bold">
              We're Here to Help
            </h1>
            <p className="mt-3 text-blue-200 font-medium">
              Reach out for bookings, inquiries, or personalized packages!
            </p>

            <div className="mt-12 space-y-8">
              {/* Visit Us */}
              <div className="flex">
                <FiMapPin className="text-3xl text-blue-300 mr-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">
                    Visit or Reach Out to Us
                  </h3>
                  <p className="text-blue-200 mt-1">
                    GFS Realtors Office – Head Office
                  </p>
                  <p className="text-blue-200">
                    Sanat Trade Centre, Sevoke Road, Siliguri, West Bengal –
                    734001
                  </p>
                </div>
              </div>

              <hr className="border-white/20" />

              {/* Open Hours */}
              <div className="flex">
                <FiClock className="text-3xl text-blue-300 mr-5 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">Open Hours</h3>
                  <p className="text-blue-200 mt-1">
                    Mon-Sat | 10:00 AM – 7:00 PM
                  </p>
                </div>
              </div>

              <hr className="border-white/20" />

              {/* Contact & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex">
                  <FiPhone className="text-3xl text-blue-300 mr-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold">Contact Details</h3>
                    <p className="text-blue-200 mt-2">
                      Booking Inquiries:{" "}
                      <a
                        href="tel:+919932066666"
                        className="hover:underline"
                      >
                        +91-99320 66666
                      </a>
                    </p>
                    <p className="text-blue-200">
                      Support:{" "}
                      <a
                        href="tel:+919733038888"
                        className="hover:underline"
                      >
                        +91-97330 38888
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <FiMail className="text-3xl text-blue-300 mr-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold">Email Us</h3>
                    <p className="text-blue-200 mt-2">Bookings:</p>
                    <a
                      href="mailto:contact@siliguriproperties.com"
                      className="hover:underline text-blue-100"
                    >
                      contact@siliguriproperties.com
                    </a>
                    <p className="text-blue-200 mt-2">General Inquiries:</p>
                    <a
                      href="mailto:contact@siliguriproperties.com"
                      className="hover:underline text-blue-100"
                    >
                      contact@siliguriproperties.com
                    </a>
                  </div>
                </div>
              </div>

              <hr className="border-white/20" />

              {/* Follow Us */}
              <div className="flex items-center space-x-4">
                <h3 className="text-xl font-semibold">Follow Us :</h3>
                <div className="flex space-x-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 border-1 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#003366] text-lg"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- Right Column (Map) --- */}
          <div>
            <div className="bg-white p-2 rounded-2xl h-[60vh] shadow-2xl">
              
              <iframe className="w-full h-full rounded-xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114041.02710606715!2d88.34887066974346!3d26.719407442130894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e44114f5441dcd%3A0xdeb5c4702063edff!2sSiliguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1761820374024!5m2!1sen!2sin" allowFullScreen=""
                loading="lazy"
                title="GFS Realtors Map"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacthero;

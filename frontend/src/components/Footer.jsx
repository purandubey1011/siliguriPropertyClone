import React from "react";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: FaFacebookF, href: "https://www.facebook.com/GFS.Realtors/?ref=embed_page#" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/gfs-realtors/?originalSubdomain=in" },
  { icon: FaInstagram, href: "https://www.instagram.com/gfsrealtors/?hl=en" },
];

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 lg:gap-36">

          {/* Column 1: Logo & Description */}
          <div>
            <div className="bg-white px-4 py-2 rounded-md inline-block">
              <span className="text-xl font-bold">
                <span className="text-[#003366]">siliguri</span>
                <span className="text-[#AA005D]">properties</span>
                <span className="text-[#AA005D] text-sm">.com</span>
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed">
              GFS Realtors is a professional company at Siliguri providing services in Real Estate,
              Finance, Legal and Allied sectors. The group is managed by a team of professionals and
              vibrant entrepreneurs with a strong focus on the future.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <FiMapPin className="text-white text-lg mr-3 mt-1 flex-shrink-0" />
                <span>
                  Sanat Trade Center, 1st Floor, Sevoke Road, Siliguri-734001, West Bengal
                </span>
              </li>
              <li className="flex items-start">
                <FiPhone className="text-white text-lg mr-3 mt-1 flex-shrink-0" />
                <span>+91-99320 66666 / +91-9733038888</span>
              </li>
              <li className="flex items-start">
                <FiMail className="text-white text-lg mr-3 mt-1 flex-shrink-0" />
                <a href="mailto:info@gfsrealtors.com" className="text-gray-400">
                  Info@gfsrealtors.com
                </a>
              </li>
            </ul>

            <div className="flex items-center mt-6">
              <h3 className="text-sm font-semibold text-white mr-4">Social Media</h3>
              <div className="flex space-x-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-white bg-[#222] rounded-full"
                  >
                    <link.icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-[#3B3B3B]" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap justify-center space-x-6 mb-4 sm:mb-0">
            <a href="#" className="text-gray-400">About Us</a>
            <a href="#" className="text-gray-400">Contact</a>
            <a href="#" className="text-gray-400">Privacy Policy</a>
            <Link to={"/user/blog"} className="text-gray-400">Blog</Link>
          </div>
          <p className="text-gray-500">Copyright © 2025 • Lift Media Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";
import { MdOutlineArrowOutward, MdVerified } from "react-icons/md";

const projects = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    title: "65 Central Park West PH, New York City, NY 10023",
    price: "$8,000/ mo",
    rooms: 3,
    baths: 2,
    sqft: 2400,
    forSale: true,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    title: "65 Central Park West PH, New York City, NY 10023",
    price: "$8,000/ mo",
    rooms: 3,
    baths: 2,
    sqft: 2400,
    forSale: true,
    showGoToProperty: true,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    title: "65 Central Park West PH, New York City, NY 10023",
    price: "$8,000/ mo",
    rooms: 3,
    baths: 2,
    sqft: 2400,
    forSale: true,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    title: "70 Lincoln Center Plaza, New York City, NY 10023",
    price: "$9,500/ mo",
    rooms: 4,
    baths: 3,
    sqft: 2800,
    forSale: true,
  },
];

const ProjectCard = ({ project }) => (
  <div className="flex-none w-[320px] bg-white rounded-2xl shadow-md overflow-hidden group ">
    <div className="relative h-52">
      {/* <span className="absolute top-1/2 left-1/2 z-20 hidden group-hover:flex items-center -translate-x-1/2 -translate-y-1/2 bg-white text-[#D32079] text-sm font-semibold px-3 py-1 rounded-md shadow">
        Go to property <MdOutlineArrowOutward />
      </span> */}
      <div className="h-full hidden w-full bg-white/25 absolute z-10 "></div>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      {project.forSale && (
        <>
          <span className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-white text-green-700 text-xs font-semibold px-3 py-1 rounded-md shadow">
            <MdVerified /> Rera Approved
          </span>
          <span className="absolute bottom-2 left-2 z-20 bg-white text-[#D32079] text-xs font-semibold px-3 py-1 rounded-md shadow">
            For Sale
          </span>
        </>
      )}
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-4 h-16">
        <h3 className="text-base font-semibold text-gray-800 pr-4 leading-tight">
          {project.title}
        </h3>
        <div className="bg-[#D90B80] text-white text-sm font-bold px-3 py-2 rounded-lg whitespace-nowrap flex-shrink-0">
          {project.price}
        </div>
      </div>
      <div className="flex items-center text-gray-500 text-sm">
        <div className="flex items-center space-x-2">
          <FaBed className="text-gray-400" />
          <span>{project.rooms} Room</span>
        </div>
        <div className="flex items-center space-x-2 pl-4 ml-4 border-l border-gray-200">
          <FaBath className="text-gray-400" />
          <span>{project.baths} Bath</span>
        </div>
        <div className="flex items-center space-x-2 pl-4 ml-4 border-l border-gray-200">
          <BsGrid className="text-gray-400" />
          <span>{project.sqft} SQFT</span>
        </div>
      </div>
    </div>
  </div>
);

const RecommendedProjects = () => {
  return (
    <div className="bg-white py-16 md:py-24 font-sans relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-[2.7vw] font-bold text-gray-800">
            Recommended Projects
          </h1>
          <p className="mt-4 text-gray-500 text-md">
            The most searched projects in Bangalore East
          </p>
        </div>

        {/* Horizontal Scroll (Static) */}
        <div className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide lg:justify-center lg:items-center">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProjects;

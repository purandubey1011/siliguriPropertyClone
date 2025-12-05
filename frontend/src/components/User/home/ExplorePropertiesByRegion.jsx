import React from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";

const projects = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
    title: "65 Central Park West PH, New York City, NY 10023",
    price: "$8,000/ mo",
    rooms: 3,
    baths: 2,
    sqft: 2400,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
    title: "65 Central Park West PH, New York City, NY 10023",
    price: "$8,000/ mo",
    rooms: 3,
    baths: 2,
    sqft: 2400,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
    title: "65 Central Park West PH, New York City, NY 10023",
    price: "$8,000/ mo",
    rooms: 3,
    baths: 2,
    sqft: 2400,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
    title: "70 Lincoln Center Plaza, New York City, NY 10023",
    price: "$9,500/ mo",
    rooms: 4,
    baths: 3,
    sqft: 2800,
  },
];

const ProjectCard = ({ project }) => (
  <div className="flex-none w-[340px] bg-white rounded-2xl shadow-md overflow-hidden">
    <div className="relative h-52">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      <span className="absolute bottom-2 left-2 bg-white text-[#D32079] text-xs font-semibold px-3 py-1 rounded-md shadow">
        For Sale
      </span>
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

const ExplorePropertiesByRegion = () => {
  return (
    <div className="bg-white md:pb-24 font-sans">
      <div className="container mx-auto px-4">
        <div className="mb-12 px-4">
          <h1 className="text-4xl md:text-4xl font-medium text-gray-800">
            Explore Properties by Region
          </h1>
          <p className="mt-4 text-gray-500 text-md">
            Travel anywhere in the world
          </p>
        </div>

        <div className="flex overflow-x-auto space-x-6 py-4 -mx-4 px-4 scrollbar-hide lg:justify-center lg:items-center">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePropertiesByRegion;

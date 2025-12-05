import React from "react";

const teamMembers = [
  {
    name: "Ethan Varter",
    role: "Senior Consultant",
    imageSrc:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    name: "Ethan Varter",
    role: "Senior Consultant",
    imageSrc:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    name: "Ethan Varter",
    role: "Senior Consultant",
    imageSrc:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
];

const TeamMemberCard = ({ name, role, imageSrc }) => (
  <div
    className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-cover bg-center"
    style={{ backgroundImage: `url(${imageSrc})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/30 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6">
      <h3 className=" text-3xl font-bold text-white">{name}</h3>
      <p className="text-blue-200 text-sm mt-1">{role}</p>
    </div>
  </div>
);

const Peoplebehind = () => {
  return (
    <div className="font-sans px-2 md:px-0">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-4xl font-bold text-[#194775]">
            Meet the People
            <br />
            Behind GFS
          </h2>
          <p className="mt-4 text-xl text-[#194775]">Our expertise</p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              role={member.role}
              imageSrc={member.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Peoplebehind;

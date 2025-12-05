import React, { useState } from 'react';
import { FiUser, FiPocket, FiBarChart2, FiShield } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const filterTabs = [
  { name: 'All', icon: null },
  { name: "Buyer's Guide", icon: <FiUser /> },
  { name: 'Investment Tips', icon: <FiPocket /> },
  { name: 'Local Trends', icon: <FiBarChart2 /> },
  { name: 'Legal & Finance', icon: <FiShield /> },
];

const blogPostsData = [
  {
    id: 1,
    imageSrc:
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80',
    date: 'Oct 2, 2024',
    category: 'Local Trends',
    author: {
      name: 'Rakesh Kumar',
      avatarSrc: 'https://i.pravatar.cc/32?img=1',
    },
    title:
      'Luxury Market Outlook: High-End Properties Navigate Economic Uncertainty in 2025',
  },
  {
    id: 2,
    imageSrc:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    date: 'Sep 28, 2024',
    category: "Buyer's Guide",
    author: {
      name: 'Priya Sharma',
      avatarSrc: 'https://i.pravatar.cc/32?img=2',
    },
    title:
      'First-Time Homebuyer Mistakes to Avoid in the Current Market',
  },
  {
    id: 3,
    imageSrc:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
    date: 'Sep 25, 2024',
    category: 'Investment Tips',
    author: {
      name: 'Amit Singh',
      avatarSrc: 'https://i.pravatar.cc/32?img=3',
    },
    title:
      'Top 5 Up-and-Coming Neighborhoods for Real Estate Investment',
  },
];

const allPosts = [
  ...blogPostsData,
  ...blogPostsData.map((p) => ({ ...p, id: p.id + 3 })),
  ...blogPostsData.map((p) => ({ ...p, id: p.id + 6 })),
];

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/user/blog/${post.id}`)}
      className="group cursor-pointer "
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          loading="lazy"
          src={post.imageSrc}
          alt={post.title}
          className="w-full aspect-[4/3] object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="pt-4">
        <div className="flex items-center space-x-2">
          <span className="bg-[#F2F5F7] backdrop-blur text-[#003366] text-sm px-2.5 py-1 rounded-md">
            {post.date}
          </span>
          <span className="bg-[#F2F5F7] backdrop-blur text-[#003366] text-sm px-2.5 py-1 rounded-md">
            {post.category}
          </span>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-1.5 bg-[#F2F5F7] backdrop-blur text-[#003366] text-sm pl-1 pr-2.5 py-1 rounded-md">
            <img
              loading="lazy"
              src={post.author.avatarSrc}
              alt={post.author.name}
              className="w-4 h-4 rounded-full"
            />
            <span>{post.author.name}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold mt-2 text-gray-900">
          {post.title}
        </h3>
      </div>
    </div>
  );
};

const Blogmain = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPosts =
    activeFilter === 'All'
      ? allPosts
      : allPosts.filter((post) => post.category === activeFilter);

  return (
    <div className="font-sans px-2 md:px-0 mt-10 md:mt-20 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto py-10 md:py-24 px-4 sm:px-6 lg:px-8 ">
        {/* --- Heading --- */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold leading-16">
            Insights, Tips & Property Advice – From GFS Realtors
          </h1>
          <p className="mt-6 text-gray-600 max-w-xl">
            Stay informed with expert-backed articles on buying, renting,
            investing, and property trends across Siliguri, Bihar, Sikkim &
            North Bengal.
          </p>
        </div>

        {/* --- Filter Tabs --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filterTabs.map((tab) => (
            <button
              key={tab.name}
            //   onClick={() => setActiveFilter(tab.name)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold flex items-center space-x-2 transition-all duration-300
                ${
                  activeFilter === tab.name
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20'
                    : 'border border-pink-500 text-pink-500 hover:bg-pink-500/10'
                }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* --- Blog Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogmain;

import React from 'react';

const relatedPostsData = [
  {
    id: 1,
    imageSrc:
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80',
    date: 'Dec 5, 2024',
    category: 'Local Trends',
    author: { name: 'Rajesh Kumar', avatarSrc: 'https://i.pravatar.cc/32?img=1' },
    title:
      'Luxury Market Outlook: High-End Properties Navigate Economic Uncertainty in 2025',
  },
  {
    id: 2,
    imageSrc:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    date: 'Dec 5, 2024',
    category: 'Local Trends',
    author: { name: 'Rajesh Kumar', avatarSrc: 'https://i.pravatar.cc/32?img=2' },
    title:
      'Luxury Market Outlook: High-End Properties Navigate Economic Uncertainty in 2025',
  },
  {
    id: 3,
    imageSrc:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
    date: 'Dec 5, 2024',
    category: 'Local Trends',
    author: { name: 'Rajesh Kumar', avatarSrc: 'https://i.pravatar.cc/32?img=3' },
    title:
      'Luxury Market Outlook: High-End Properties Navigate Economic Uncertainty in 2025',
  },
];

const RelatedBlogCard = ({ post }) => (
  <a href="#" className="group block">
    <div className="overflow-hidden rounded-2xl mb-5 shadow-md">
      <img
        loading="lazy"
        src={post.imageSrc}
        alt={post.title}
        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <div className="flex items-center flex-wrap gap-x-3 gap-y-2 text-sm text-gray-700">
      <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
        {post.date}
      </span>
      <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
        {post.category}
      </span>
      <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-full font-medium">
        <img
          loading="lazy"
          src={post.author.avatarSrc}
          alt={post.author.name}
          className="w-5 h-5 rounded-full"
        />
        <span>{post.author.name}</span>
      </div>
    </div>

    <h3 className="mt-4 text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors leading-snug">
      {post.title}
    </h3>
  </a>
);

const Relatedblog = () => {
  return (
    <div className="bg-white font-sans px-2 md:px-0">
      <div className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-12">
          Other Related Blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {relatedPostsData.map((post) => (
            <RelatedBlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Relatedblog;

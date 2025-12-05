import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Pagination = ({ currentPage = 1 }) => {
  const pages = [1, 2, 3, '...', 8, 9, 10];

  return (
    <nav className="flex items-center justify-between mt-20 pb-8 border-b border-gray-700">
      <button className="flex items-center space-x-2 font-semibold text-pink-500 hover:text-pink-400 transition-colors">
        <FiArrowLeft />
        <span>Previous</span>
      </button>
      <div className="flex items-center space-x-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={index} className="px-2 text-gray-500">
                ...
              </span>
            );
          }
          const isActive = page === currentPage;
          return (
            <button
              key={index}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${
                isActive
                  ? 'bg-pink-600 text-white'
                  : 'hover:bg-pink-600/50 hover:text-white'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button className="flex items-center space-x-2 font-semibold text-pink-500 hover:text-pink-400 transition-colors">
        <span>Next</span>
        <FiArrowRight />
      </button>
    </nav>
  );
};

const Detail = () => {
  const articleData = {
    title: 'Insights, Tips & Property Advice – From GFS Realtors',
    date: 'Oct 2, 2024',
    category: 'Local Trends',
    author: {
      name: 'Rakesh Kumar',
      avatarSrc: 'https://i.pravatar.cc/32?img=1',
    },
    imageSrc:
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80',
  };

  return (
    <div className="font-sans py-20 md:py-36 px-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {articleData.title}
          </h1>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
            <span className="bg-gray-800 text-gray-300 text-sm font-semibold px-4 py-2 rounded-md">
              {articleData.date}
            </span>
            <span className="bg-gray-800 text-gray-300 text-sm font-semibold px-4 py-2 rounded-md">
              {articleData.category}
            </span>
            <div className="flex items-center space-x-2 bg-gray-800 text-gray-300 text-sm font-semibold pl-2 pr-4 py-2 rounded-md">
              <img
                loading="lazy"
                src={articleData.author.avatarSrc}
                alt={articleData.author.name}
                className="w-5 h-5 rounded-full"
              />
              <span>{articleData.author.name}</span>
            </div>
          </div>
        </header>

        {/* Main Image */}
        <div className="mt-12">
          <img
            loading="lazy"
            src={articleData.imageSrc}
            alt="Luxury modern home with a pool at dusk"
            className="w-full h-auto rounded-3xl max-h-[80vh] object-cover shadow-2xl shadow-black/30"
          />
        </div>

        {/* Article */}
        <article className="prose prose-invert prose-lg max-w-none mt-16">
          <p>
            A grid system is a design tool used to arrange content on a webpage.
            It is a series of vertical and horizontal lines that create a matrix
            of intersecting points, which can be used to align and organize page
            elements. Grid systems are used to create a consistent look and feel
            across a website, and can help to make the layout more visually
            appealing and easier to navigate.
          </p>

          <p>
            If you’ve been to New York City and have walked the streets, it is
            easy to figure out how to get from one place to another because of
            the grid system that the city is built on. Just as the predictability
            of a city grid helps locals and tourists get around easily, so do
            webpage grids improve page readability and scannability.
          </p>

          <blockquote className="border-pink-500">
            Definition: A grid is made up of columns, gutters, and margins that
            provide a structure for the layout of elements on a page.
          </blockquote>

          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1167"
            alt="Modern home office"
            className="rounded-2xl w-full mt-6 shadow-lg shadow-black/30"
          />

          <p>
            There are three common grid types used in websites and interfaces:
            column grid, modular grid, and hierarchical grid.
          </p>

          <p>
            <strong>Column grid</strong> involves dividing a page into vertical
            columns. UI elements and content are then aligned to these columns.
          </p>

          <p>
            <strong>Modular grid</strong> extends the column grid further by
            adding rows to it. This intersection of columns and rows make up
            modules to which elements and content are aligned.
          </p>

          <p>
            <strong>Hierarchical grid:</strong> Content is organized by importance
            using columns, rows, and modules.
          </p>

          <h3>Breaking Down the Grid</h3>
          <p>
            Regardless of the type of grid you are using, the grid is made up of
            three elements: columns, gutters, and margins.
          </p>

          <p>
            <strong>Columns:</strong> Columns take up most of the real estate in
            a grid. Elements and content are placed in columns.
          </p>

          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80"
            alt="Luxury modern home exterior"
            className="rounded-2xl my-6 w-full shadow-lg shadow-black/30"
          />

          <p>
            <strong>Gutters:</strong> The gutter is the space between columns that
            separates elements and content from different columns.
          </p>

          <h3>Examples of Grids In Use</h3>
          <p>
            Our first example is from{' '}
            <a href="#" className="text-pink-400 underline hover:text-pink-300">
              The New York Times
            </a>
            . This screen utilizes a hierarchical grid to create a newspaper-like
            reading experience.
          </p>
        </article>

        {/* Pagination */}
        <Pagination currentPage={1} />
      </div>
    </div>
  );
};

export default Detail;

'use client'

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { FaUser, FaCalendar, FaArrowRight } from "react-icons/fa";

const 
Blog = () => {
  const blogPosts = [
    {
      imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      title: "Getting Started with Modern ",
      description: "Learn the fundamentals of modern web development including Rea.",
      author: "John Doe",
      publishDate: "2024-01-15",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f",
      title: "The Future of Artificial Intelligence",
      description: "Explore the latest trends and innovations in AI and machine learning technologies.",
      author: "Jane Smith",
      publishDate: "2024-01-14",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      title: "Mastering Cloud Architecture",
      description: "Deep dive into cloud computing architecture and best practices for scalable solutions.",
      author: "Mike Johnson",
      publishDate: "2024-01-13",
    },
  ];

  return (
    <div className=" bg-gray-100 px-4 py-12 ">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Latest Blog Posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              {...post}
              onReadMore={() => console.log(`Reading more about ${post.title}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogCard = ({ imageUrl, title, description, author, publishDate, onReadMore }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643";

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const formattedDate = publishDate ? format(new Date(publishDate), "MMM dd, yyyy") : "";

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl ">
      <div className="relative h-48 overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 ">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        <img
          src={imageError ? fallbackImage : imageUrl}
          alt={title}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${!isLoaded ? "opacity-0" : "opacity-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      </div>

      <div className="p-6">
        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 ">
          {title}
        </h3>
        <p className="mb-4 line-clamp-3 text-gray-600 ">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500 ">
              <FaUser className="mr-2" />
              <span>{author}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 ">
              <FaCalendar className="mr-2" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <button
            onClick={onReadMore}
            className="group/btn flex items-center rounded-lg bg-[#02325a] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
          >
            Read More
            <FaArrowRight className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  onReadMore: PropTypes.func
};

export default Blog;
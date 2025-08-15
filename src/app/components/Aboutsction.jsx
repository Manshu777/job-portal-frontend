'use client'
import { useState } from "react";
import { FaBriefcase, FaArrowRight } from "react-icons/fa";

const AboutSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3"
              alt="Team of professionals collaborating in a modern office setting"
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl" />
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Good Life Begins With A Good Company
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
  We specialize in connecting talented professionals with top-tier, forward-thinking companies across various industries. Whether you're looking to take the next big step in your career or explore exciting new opportunities, your dream job is just a click away. Let us help shape your professional journey.
</p>


          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              className="flex items-center justify-center px-8 py-3 bg-[#02325a] text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Search for jobs"
            >
              <FaBriefcase className="mr-2" />
              Search Jobs
            </button>

            <button
              className="flex items-center justify-center px-8 py-3 border-2 border-[#02325a] text-[#02325a] rounded-lg hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Learn more about our services"
            >
              Learn More
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
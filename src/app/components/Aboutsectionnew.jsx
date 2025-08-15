'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Aboutsectionnew = () => {
  return (
    <div className='w-full min-h-[70vh] flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-10 px-4 sm:px-10 lg:px-20 py-16 sm:py-20 bg-gradient-to-b from-white to-[#3093aa1c]'>
      <motion.div 
        className='w-full lg:w-[40%] dot-img-add relative'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img 
          src='/img/banner-price.png' 
          alt='Hire Boat Illustration'
          className='relative z-30 rounded-br-[80px] rounded-tl-[80px] w-full h-auto object-cover shadow-xl'
        />
      </motion.div>
      
      <motion.div 
        className='w-full lg:w-[50%] flex flex-col justify-center gap-6'
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <motion.span 
          className='text-lg sm:text-xl font-semibold text-[#02325a] uppercase tracking-wider'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          About Hire Boat
        </motion.span>
        
        <motion.h2 
          className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Connect Employers and Candidates with Hire Boat
        </motion.h2>
        
        <motion.p 
          className='text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Hire Boat is your intelligent hiring assistant, designed to seamlessly connect employers with top-tier candidates. Streamline your recruitment process with smart matching and efficient job postings.
        </motion.p>
        
        <motion.h3 
          className='text-xl sm:text-2xl font-semibold text-gray-800 mt-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Empowering Employers
        </motion.h3>
        
        <motion.p 
          className='text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Post your job openings and let Hire Boat find the perfect candidates, from full-time professionals to talented interns, tailored to your company’s needs.
        </motion.p>
        
        <motion.h3 
          className='text-xl sm:text-2xl font-semibold text-gray-800 mt-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Empowering Candidates
        </motion.h3>
        
        <motion.p 
          className='text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          Discover exciting career opportunities with Hire Boat, connecting you to employers who value your skills and aspirations across industries.
        </motion.p>
        
        <motion.button 
          className='mt-6 px-6 py-3 text-lg font-semibold text-white bg-[#02325a] hover:bg-[#54428b] rounded-md transition-all duration-300 w-fit'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Explore Hire Boat
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Aboutsectionnew;
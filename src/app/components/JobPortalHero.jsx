'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {  FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { motion } from 'framer-motion';
import Autosuggest from 'react-autosuggest';
import { TypeAnimation } from 'react-type-animation';
import { baseurl } from './common';

const locations = [
  "New York",
  "San Francisco",
  "London",
  "Tokyo",
  "Singapore",
  "Berlin",
  "Toronto",
  "Sydney"
];



const Herosection = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const handleSearch = () => {
    if (!searchInput.trim() && !locationInput.trim()) return;
    const query = `/jobs?page=1${searchInput ? `&job_title=${encodeURIComponent(searchInput)}` : ''}${locationInput ? `&location=${encodeURIComponent(locationInput)}` : ''}`;
    router.push(query);
  };

  const fetchJobSuggestions = async ({ value }) => {
    try {
      const response = await fetch(`${baseurl}/job-titles?search=${encodeURIComponent(value)}`);
      const data = await response.json();
      if (data.status === 'success') {
        setSuggestions(data.data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching job suggestions:', error);
      setSuggestions([]);
    }
  };

  const fetchLocationSuggestions = ({ value }) => {
    const filteredLocations = locations.filter(location =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setLocationSuggestions(filteredLocations);
  };

  const onJobSuggestionSelected = useCallback((event, { suggestion }) => {
    setSearchInput(suggestion);
  }, []);

  const onLocationSuggestionSelected = useCallback((event, { suggestion }) => {
    setLocationInput(suggestion);
  }, []);

  const renderSuggestion = (suggestion) => (
    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
      {suggestion}
    </div>
  );

  const jobInputProps = {
    value: searchInput,
    onChange: (event, { newValue }) => setSearchInput(newValue),
    className: 'w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#02325a] transition-all duration-300',
  };

  const locationInputProps = {
    value: locationInput,
    onChange: (event, { newValue }) => setLocationInput(newValue),
    className: 'w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#02325a] transition-all duration-300',
    placeholder: 'Location'
  };

  return (
    <div className='w-full min-h-[70vh] flex items-center justify-center bg-[#fff9f3] add-img-bg py-12 px-4 sm:px-6 lg:px-10'>
      <motion.div 
        className='content relative z-30 flex flex-col justify-center items-center w-full max-w-5xl'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1 
          className='text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Find Your Dream Job Today!
        </motion.h1>
        <motion.p 
          className='text-lg sm:text-xl md:text-2xl text-center mb-8 max-w-2xl'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </motion.p>

        <motion.div 
          className='searchbox flex flex-col sm:flex-row items-center gap-4 sm:gap-2 justify-center w-full max-w-3xl bg-white rounded-3xl shadow-xl p-4 sm:p-6 md:p-8'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className='relative w-full sm:w-[40%]'>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={fetchJobSuggestions}
              onSuggestionsClearRequested={() => setSuggestions([])}
              getSuggestionValue={(suggestion) => suggestion}
              renderSuggestion={renderSuggestion}
              inputProps={jobInputProps}
              onSuggestionSelected={onJobSuggestionSelected}
              theme={{
                container: 'relative w-full',
                suggestionsContainer: 'absolute z-50 w-full bg-white rounded-md mt-1 max-h-60 overflow-auto shadow-lg',
                suggestion: 'cursor-pointer',
                suggestionHighlighted: 'bg-gray-100'
              }}
            />
            <span className='absolute top-1/2 left-3 transform -translate-y-1/2'>
              {/* <LuBriefcaseBusiness className='text-xl text-slate-500' /> */}
            </span>
            {!searchInput && (
              <div className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <TypeAnimation
                  sequence={[
                    'Search for Full Stack Developer',
                    2000,
                    'Search for Software Engineer',
                    2000,
                    'Search for Data Scientist',
                    2000,
                    'Search for Product Manager',
                    2000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  style={{ fontSize: '1rem' }}
                />
              </div>
            )}
          </div>
          <div className='relative w-full sm:w-[40%]'>
            <Autosuggest
              suggestions={locationSuggestions}
              onSuggestionsFetchRequested={fetchLocationSuggestions}
              onSuggestionsClearRequested={() => setLocationSuggestions([])}
              getSuggestionValue={(suggestion) => suggestion}
              renderSuggestion={renderSuggestion}
              inputProps={locationInputProps}
              onSuggestionSelected={onLocationSuggestionSelected}
              theme={{
                container: 'relative w-full',
                suggestionsContainer: 'absolute z-50 w-full bg-white rounded-md mt-1 max-h-60 overflow-auto shadow-lg',
                suggestion: 'cursor-pointer',
                suggestionHighlighted: 'bg-gray-100'
              }}
            />
            <span className='absolute top-1/2 left-3 transform -translate-y-1/2'>
              <FaMapMarkerAlt className='text-xl text-slate-500' />
            </span>
          </div>
          <div className='w-full sm:w-[20%]'>
            <motion.button 
              className='w-full px-4 py-3 text-lg md:text-xl text-white font-semibold bg-[#02325a] hover:bg-[#54428b] rounded-md transition-all duration-300 flex items-center justify-center'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
            >
              <FaSearch className='mr-2' />
              Find Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Herosection;
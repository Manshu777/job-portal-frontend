'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/app/components/Sidebar';
import { useRouter } from 'next/navigation';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {
  UserIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  MapPinIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { baseurl } from '@/app/components/common';
import axios from 'axios';
import Swal from 'sweetalert2';

const CandidatesDashboard = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    keywords: [],
    locations: [],
    minExperience: '',
    maxExperience: '',
    minSalary: '',
    maxSalary: '',
    education: '',
    active: '',
    experienceType: 'any',
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);

  // Experience range options
  const experienceOptions = [
    { value: '0.25', label: '3 Months' },
    { value: '0.5', label: '6 Months' },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: (i + 1).toString(),
      label: `${i + 1} ${i + 1 === 1 ? 'Year' : 'Years'}`,
    })),
  ];

  const getMaxExperienceOptions = () => {
    if (!formData.minExperience) return experienceOptions;
    const minValue = parseFloat(formData.minExperience);
    return experienceOptions.filter(
      (option) => parseFloat(option.value) > minValue
    );
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);
    if (savedSearches.length > 0) {
      setFormData(savedSearches[0]); // Load the most recent search into the form
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'experienceType') {
      // Clear localStorage and recent searches when experienceType changes
      localStorage.removeItem('recentSearches');
      setRecentSearches([]);
      // Reset form fields
      setFormData({
        ...formData,
        experienceType: value,
        minExperience: '',
        maxExperience: '',
        minSalary: '',
        maxSalary: '',
        keywords: [],
        locations: [],
        education: '',
        active: '',
      });
    } else if (name === 'minSalary' || name === 'maxSalary') {
      const numValue = value ? parseInt(value.replace(/,/g, '')) : '';
      if (numValue === '' || (numValue >= 0 && numValue <= 99999999)) {
        setFormData({ ...formData, [name]: numValue });
      }
    } else if (name === 'minExperience') {
      const newMaxExperience =
        formData.maxExperience &&
        parseFloat(formData.maxExperience) <= parseFloat(value)
          ? ''
          : formData.maxExperience;
      setFormData({ ...formData, minExperience: value, maxExperience: newMaxExperience });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle keyword input change to detect commas
  const handleKeywordInputChange = (inputValue, { action }) => {
    if (action === 'input-change') {
      if (inputValue.includes(',')) {
        const newKeyword = inputValue.replace(',', '').trim();
        if (newKeyword && formData.keywords.length < 10) {
          const newOption = {
            value: newKeyword.toLowerCase(),
            label: newKeyword,
            __isNew__: true,
          };
          setFormData({
            ...formData,
            keywords: [...formData.keywords, newOption].slice(0, 10),
          });
          setKeywordInput('');
          return '';
        }
        return newKeyword;
      }
      setKeywordInput(inputValue);
      return inputValue;
    }
    return inputValue;
  };

  // Handle keyword select (including custom options)
  const handleKeywordChange = (selectedOptions, actionMeta) => {
    let selectedKeywords = selectedOptions ? selectedOptions.slice(0, 10) : [];
    if (actionMeta.action === 'create-option') {
      const newOption = actionMeta.option;
      selectedKeywords = [
        ...selectedKeywords.filter((opt) => opt.__isNew__ !== true),
        { value: newOption.value.toLowerCase(), label: newOption.value, __isNew__: true },
      ].slice(0, 10);
    }
    setFormData({ ...formData, keywords: selectedKeywords });
  };

  // Handle location input change to detect commas
  const handleLocationInputChange = (inputValue, { action }) => {
    if (action === 'input-change') {
      if (inputValue.includes(',')) {
        const newLocation = inputValue.replace(',', '').trim();
        if (newLocation && formData.locations.length < 3) {
          const newOption = {
            value: newLocation.toLowerCase(),
            label: newLocation,
            __isNew__: true,
          };
          setFormData({
            ...formData,
            locations: [...formData.locations, newOption].slice(0, 3),
          });
          setLocationInput('');
          return '';
        }
        return newLocation;
      }
      setLocationInput(inputValue);
      return inputValue;
    }
    return inputValue;
  };

  // Handle location select (including custom options)
  const handleLocationChange = (selectedOptions, actionMeta) => {
    let selectedLocations = selectedOptions ? selectedOptions.slice(0, 3) : [];
    if (actionMeta.action === 'create-option') {
      const newOption = actionMeta.option;
      selectedLocations = [
        ...selectedLocations.filter((opt) => opt.__isNew__ !== true),
        { value: newOption.value.toLowerCase(), label: newOption.value, __isNew__: true },
      ].slice(0, 3);
    }
    setFormData({ ...formData, locations: selectedLocations });
  };

  // Validate fields
  const validateFields = () => {
    const { experienceType, keywords, locations, minExperience, maxExperience, education } = formData;

    if (experienceType === 'fresher') {
      if (education === '') return 'Education is required for Fresher Only';
    } else if (experienceType === 'experienced') {
      if (!minExperience || !maxExperience) return 'Minimum and Maximum Experience are required for Experienced';
      if (parseFloat(minExperience) >= parseFloat(maxExperience)) {
        return 'Minimum experience must be less than maximum experience';
      }
    } else if (experienceType === 'any') {
      if (keywords.length === 0) return 'At least one Keyword is required for Any';
      if (education === '') return 'Education is required for Any';
    }

    if (formData.minSalary && formData.maxSalary) {
      if (parseInt(formData.minSalary) >= parseInt(formData.maxSalary)) {
        return 'Minimum salary must be less than maximum salary';
      }
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateFields();
    if (validationError) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: validationError,
        confirmButtonColor: '#02325a',
      });
      return;
    }

    const newRecent = [formData, ...recentSearches].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));

    const queryParams = new URLSearchParams({
      keywords: formData.keywords.map((k) => k.value).join(','),
      locations: formData.locations.map((l) => l.value).join(','),
      minExperience: formData.experienceType === 'fresher' ? '' : formData.minExperience,
      maxExperience: formData.experienceType === 'fresher' ? '' : formData.maxExperience,
      minSalary: formData.experienceType === 'fresher' ? '' : formData.minSalary,
      maxSalary: formData.experienceType === 'fresher' ? '' : formData.maxSalary,
      education: formData.education,
      active: formData.active,
      experienceType: formData.experienceType,
    }).toString();
    router.push(`/employer/candidate-data?${queryParams}`);
  };

  // Format and parse INR functions
  const formatINR = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseINR = (value) => {
    return value.replace(/,/g, '');
  };

  // Fetch suggestions from API
  const fetchSuggestions = async (inputValue, type) => {
    if (!inputValue) return [];
    try {
      const response = await axios.get(`${baseurl}/suggestions`, {
        params: { query: inputValue, type },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching ${type} suggestions:`, error);
      return [];
    }
  };

  const loadKeywordOptions = (inputValue) => fetchSuggestions(inputValue, 'keywords');
  const loadLocationOptions = (inputValue) => fetchSuggestions(inputValue, 'locations');

  // Handle loading a recent search
  const handleLoadRecent = (search) => {
    setFormData(search);
  };

  // Recent Searches content for Sidebar
  const recentSearchesContent = (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-3">Recent Searches</h2>
      {recentSearches.length > 0 ? (
        <ul className="space-y-3">
          {recentSearches.map((search, index) => (
            <li key={index} className="border-b pb-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  <strong>Type:</strong> {search.experienceType}
                </span>
                <span className="text-sm text-gray-600">
                  <strong>Keywords:</strong> {search.keywords.map(k => k.label).join(', ')}
                </span>
                <span className="text-sm text-gray-600">
                  <strong>Locations:</strong> {search.locations.map(l => l.label).join(', ')}
                </span>
                <button
                  onClick={() => handleLoadRecent(search)}
                  className="mt-2 py-1 px-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600"
                >
                  Load
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-600">No recent searches</p>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        recentSearchesContent={recentSearchesContent}
      />
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
              Find Candidates
            </h1>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience Type
                </label>
                <div className="mt-1 flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="experienceType"
                      id="fresher"
                      value="fresher"
                      checked={formData.experienceType === 'fresher'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#02325a] focus:ring-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="fresher"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Fresher Only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="experienceType"
                      id="experienced"
                      value="experienced"
                      checked={formData.experienceType === 'experienced'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#02325a] focus:ring-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="experienced"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Experienced
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="experienceType"
                      id="any"
                      value="any"
                      checked={formData.experienceType === 'any'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#02325a] focus:ring-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="any"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Any
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="keywords"
                  className="block text-sm font-medium text-gray-700"
                >
                  Keywords (up to 10, type and add with comma or enter)
                </label>
                <AsyncCreatableSelect
                  isMulti
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleKeywordChange}
                  onInputChange={handleKeywordInputChange}
                  inputValue={keywordInput}
                  className="mt-1"
                  classNamePrefix="select"
                  placeholder="Select or type keywords..."
                  maxMenuHeight={200}
                  isClearable
                  isSearchable
                  loadOptions={loadKeywordOptions}
                  formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                />
              </div>
              {formData.experienceType !== 'fresher' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="minExperience"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Minimum Experience
                      </label>
                      <select
                        name="minExperience"
                        id="minExperience"
                        value={formData.minExperience}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      >
                        <option value="">Select Min Experience</option>
                        {experienceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="maxExperience"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Maximum Experience
                      </label>
                      <select
                        name="maxExperience"
                        id="maxExperience"
                        value={formData.maxExperience}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      >
                        <option value="">Select Max Experience</option>
                        {getMaxExperienceOptions().map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="minSalary"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Minimum Monthly Salary (INR)
                      </label>
                      <input
                        type="text"
                        name="minSalary"
                        id="minSalary"
                        value={formatINR(formData.minSalary)}
                        onChange={(e) =>
                          handleInputChange({
                            target: { name: 'minSalary', value: parseINR(e.target.value) },
                          })
                        }
                        placeholder="e.g., 30,000"
                        className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="maxSalary"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Maximum Monthly Salary (INR)
                      </label>
                      <input
                        type="text"
                        name="maxSalary"
                        id="maxSalary"
                        value={formatINR(formData.maxSalary)}
                        onChange={(e) =>
                          handleInputChange({
                            target: { name: 'maxSalary', value: parseINR(e.target.value) },
                          })
                        }
                        placeholder="e.g., 1,00,000"
                        className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label
                  htmlFor="locations"
                  className="block text-sm font-medium text-gray-700"
                >
                  Locations (up to 3, type and add with comma or enter)
                </label>
                <AsyncCreatableSelect
                  isMulti
                  name="locations"
                  value={formData.locations}
                  onChange={handleLocationChange}
                  onInputChange={handleLocationInputChange}
                  inputValue={locationInput}
                  className="mt-1"
                  classNamePrefix="select"
                  placeholder="Select or type locations..."
                  maxMenuHeight={200}
                  isClearable
                  isSearchable
                  loadOptions={loadLocationOptions}
                  formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                />
              </div>
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm font-medium text-gray-700"
                >
                  Minimum Education
                </label>
                <select
                  name="education"
                  id="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                >

                   <option value="">Select Minimum Education</option>

                  <option value="any">Any</option>
                  <option value="graduate">Graduate</option>
                  <option value="post-graduate">Post Graduate</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="active"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Active
                </label>
                <select
                  name="active"
                  id="active"
                  value={formData.active}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                >
                  <option value="">Select Active Period</option>
                  <option value="3-days">Last 3 Days</option>
                  <option value="7-days">Last 7 Days</option>
                  <option value="15-days">Last 15 Days</option>
                  <option value="1-month">Last 1 Month</option>
                  <option value="3-months">Last 3 Months</option>
                  <option value="7-months">Last 7 Months</option>
                  <option value="1-year">Last 1 Year</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 sm:py-3 px-4 rounded-lg bg-[#02325a] text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Search Candidates
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesDashboard;
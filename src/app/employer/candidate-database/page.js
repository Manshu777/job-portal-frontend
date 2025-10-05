'use client';
import { useState, useEffect } from 'react';
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
import Sidebar from '@/app/components/Sidebar';
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
  const [recentSearches, setRecentSearches] = useState([]);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Experience range options
  const experienceOptions = [
    { value: '0', label: 'Fresher' },
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
      // localStorage.removeItem('recentSearches');
      // setRecentSearches([]);
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

  // Handle keyword select
  const handleKeywordChange = (selectedOptions, actionMeta) => {
    let selectedKeywords = selectedOptions ? selectedOptions.slice(0, 10) : [];
    if (actionMeta.action === 'create-option' || actionMeta.action === 'select-option') {
      const newOption = actionMeta.option || { value: keywordInput.toLowerCase(), label: keywordInput, __isNew__: true };
      if (keywordInput && !selectedKeywords.some(opt => opt.value === newOption.value)) {
        selectedKeywords = [
          ...selectedKeywords.filter((opt) => opt.__isNew__ !== true || opt.value !== newOption.value),
          newOption,
        ].slice(0, 10);
      }
      setKeywordInput('');
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

  // Handle location select
  const handleLocationChange = (selectedOptions, actionMeta) => {
    let selectedLocations = selectedOptions ? selectedOptions.slice(0, 3) : [];
    if (actionMeta.action === 'create-option' || actionMeta.action === 'select-option') {
      const newOption = actionMeta.option || { value: locationInput.toLowerCase(), label: locationInput, __isNew__: true };
      if (locationInput && !selectedLocations.some(opt => opt.value === newOption.value)) {
        selectedLocations = [
          ...selectedLocations.filter((opt) => opt.__isNew__ !== true || opt.value !== newOption.value),
          newOption,
        ].slice(0, 3);
      }
      setLocationInput('');
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
        confirmButtonColor: '#1e40af',
      });
      return;
    }

    const stringifiedForm = JSON.stringify(formData);
    const isDuplicate = recentSearches.some(search => JSON.stringify(search) === stringifiedForm);
    if (!isDuplicate) {
      const newRecent = [formData, ...recentSearches].slice(0, 10);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    }

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

  // Recent Searches content
  const recentSearchesContent = (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg h-fit">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <BriefcaseIcon className="h-6 w-6 mr-2 text-indigo-600" />
        Recent Searches (Last 10)
      </h2>
      {recentSearches.length > 0 ? (
        <ul className="space-y-4 max-h-[600px] overflow-y-auto">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-800">
                    <strong>Type:</strong> {search.experienceType.charAt(0).toUpperCase() + search.experienceType.slice(1)}
                  </span>
                </div>
                {search.keywords.length > 0 && (
                  <div className="flex items-center">
                    <CodeBracketIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      <strong>Keywords:</strong> {search.keywords.map(k => k.label).join(', ')}
                    </span>
                  </div>
                )}
                {search.locations.length > 0 && (
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      <strong>Locations:</strong> {search.locations.map(l => l.label).join(', ')}
                    </span>
                  </div>
                )}
                {search.education && (
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      <strong>Education:</strong> {search.education.charAt(0).toUpperCase() + search.education.slice(1)}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => handleLoadRecent(search)}
                  className="mt-3 py-2 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                >
                  Apply Search
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">No recent searches yet</p>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        recentSearchesContent={recentSearchesContent}
      />
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto w-full">
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Find Top Candidates
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Type
                  </label>
                  <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0">
                    {['fresher', 'experienced', 'any'].map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="experienceType"
                          id={type}
                          value={type}
                          checked={formData.experienceType === type}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label
                          htmlFor={type}
                          className="ml-2 text-sm font-medium text-gray-700 capitalize"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="keywords"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="mt-1 text-sm"
                    classNamePrefix="select"
                    placeholder="e.g., JavaScript, Python..."
                    maxMenuHeight={200}
                    isClearable
                    isSearchable
                    loadOptions={loadKeywordOptions}
                    formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: '#d1d5db',
                        boxShadow: 'none',
                        '&:hover': { borderColor: '#4f46e5' },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: '#e0e7ff',
                        color: '#4f46e5',
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: '#4f46e5',
                      }),
                    }}
                  />
                </div>
                {formData.experienceType !== 'fresher' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="minExperience"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Minimum Experience
                        </label>
                        <select
                          name="minExperience"
                          id="minExperience"
                          value={formData.minExperience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-sm"
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
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Maximum Experience
                        </label>
                        <select
                          name="maxExperience"
                          id="maxExperience"
                          value={formData.maxExperience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-sm"
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
                          className="block text-sm font-medium text-gray-700 mb-2"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="maxSalary"
                          className="block text-sm font-medium text-gray-700 mb-2"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-sm"
                        />
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <label
                    htmlFor="locations"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="mt-1 text-sm"
                    classNamePrefix="select"
                    placeholder="e.g., Mumbai, Delhi..."
                    maxMenuHeight={200}
                    isClearable
                    isSearchable
                    loadOptions={loadLocationOptions}
                    formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: '#d1d5db',
                        boxShadow: 'none',
                        '&:hover': { borderColor: '#4f46e5' },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: '#e0e7ff',
                        color: '#4f46e5',
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: '#4f46e5',
                      }),
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Minimum Education
                  </label>
                  <select
                    name="education"
                    id="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-sm"
                  >
                    <option value="">Select Minimum Education</option>
                    <option value="any">Any</option>
                    <option value="under-graduate">Under Graduate</option>
                    <option value="graduate"> Graduate</option>
                    <option value="post-graduate">Post Graduate</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="active"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Active
                  </label>
                  <select
                    name="active"
                    id="active"
                    value={formData.active}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-sm"
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
                    className="w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                  >
                    Search Candidates
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-80 xl:w-96">
            {recentSearchesContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesDashboard;
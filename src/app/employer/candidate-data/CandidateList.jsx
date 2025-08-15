'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import {
  UserIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  MapPinIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';

import { BiMedal } from "react-icons/bi";
import { MdWorkHistory } from 'react-icons/md';
import { baseurl } from '@/app/components/common';
import { FaMapMarkerAlt, FaGlobe, FaPhone, FaCoins, FaFileAlt, FaKey, FaBan, FaUser, FaGraduationCap, FaLanguage, FaCity, FaBriefcase, FaClock } from 'react-icons/fa';
  const ageRange = Array.from({ length: 33 }, (_, i) => 18 + i); // 18 to 50
const ProfileDetails = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-[#02325a]">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-gray-800">{value || 'N/A'}</p>
    </div>
  </div>
);

const colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
];

const getRandomColor = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const CandidateCard = ({ candidate }) => {
  const [showPhone, setShowPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(candidate.number || 'xxxxxxx');
  const [isLoading, setIsLoading] = useState(false);

  function formatIndianSalary(amount) {
    const num = Number(amount);
    if (isNaN(num)) return amount;
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2).replace(/\.00$/, '') + ' Lac';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2).replace(/\.00$/, '') + 'k';
    }
    return num.toString();
  }

  const revealNumber = async (candidateId) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseurl}/reveal-number`,
        { candidate_id: candidateId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('employerToken')}` },
        }
      );
      setPhoneNumber(response.data.number || 'N/A');
      setShowPhone(true);
      alert(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error revealing number';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatExperience = () => {
    const years = candidate.experience_years || 0;
    const months = candidate.experience_months || 0;
    return `${years} Year${years !== 1 ? "s" : ""} ${months} Month${months !== 1 ? "s" : ""}`;
  };

  const skills = candidate.skills
    ? Array.isArray(candidate.skills)
      ? candidate.skills
      : []
    : [];

  const jobRoles = (() => {
    try {
      return JSON.parse(candidate.job_roles || "[]");
    } catch {
      return [];
    }
  })();

  const experience = `${candidate.experience_years || 0} yrs ${candidate.experience_months || 0} mos`;

  const colorClass = getRandomColor(candidate.id || candidate.full_name);
  return (
    <div className="bg-white rounded-lg shadow p-5 border border-gray-200 flex flex-col gap-3 mb-6 max-w-3xl">
      <div className="flex items-center gap-2">
        <div className={`bg-[#02325a] px-4 py-2 rounded-full text-2xl font-semibold text-white`} >
          { candidate.full_name.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{candidate.full_name}</h3>
          <div className='flex mt-1 gap-2'>
            <div className="text-md flex items-center gap-2 text-[#5e6c84] font-semibold">
              <FaBriefcase className="text-base text-[#02325a]" />
              {experience}
            </div>
            <div className="text-md flex items-center gap-2 text-[#5e6c84] font-semibold">
              <FaCoins className="text-base text-[#02325a]" />
              {formatIndianSalary(candidate.current_salary)}
            </div>
            <div className="text-md flex items-center gap-2 text-[#5e6c84] font-semibold">
              <FaMapMarkerAlt className="text-base text-[#02325a]" />
              {candidate.city}, {candidate.state}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-items-start flex-col my-4 gap-2">
        <div className='flex w-full gap-5 my-1'>
          <span className='text-xl flex items-center gap-2 text-gray-500'>
            <FaBriefcase className='text-[20px]' />Current / Latest
          </span>
          <span className="flex text-xl items-center text-[#02325a] gap-1">
            {candidate.job_title}, {candidate.company_name}
          </span>
        </div>
        <div className='flex w-full gap-5 iniciativa-1'>
          <span className='text-xl flex items-center gap-2 text-gray-500'>
            <FaMapMarkerAlt className='text-[20px]' />Pref. Location
          </span>
          <span className="flex text-xl items-center text-[#02325a] gap-1">
            {candidate.city}, {candidate.state}
          </span>
        </div>
        <div className='flex w-full gap-5 my-1'>
          <span className='text-xl flex items-center gap-2 text-gray-500'>
            <BiMedal className='text-[20px]' />Skills
          </span>
          <span className="flex text-xl items-center text-[#02325a] gap-1">
            {skills && skills.length > 0 ? (
              skills.map((skill, idx) => (
                <span key={idx} className="bg-blue-50 text-[#02325a] rounded-full px-3 py-1">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-400">No skills listed</span>
            )}
          </span>
        </div>
        <div className='flex w-full gap-5 my-1'>
          <span className='text-xl flex items-center gap-2 text-gray-500'>
            <FaGraduationCap className='text-[20px]' />Education
          </span>
          <span className="flex text-xl items-center text-[#02325a] gap-1">
            {candidate.degree} in {candidate.specialization}, {candidate.college_name}
          </span>
        </div>
      </div>
      <div className="mt-1">
        {candidate.number_revealed ? (
          <div className="flex items-center bg-blue-100 text-blue-900 px-4 py-2 rounded-lg font-bold gap-2 w-fit">
            <FaPhone /> {candidate.number}
          </div>
        ) : (
          <button
            className={`bg-[#02325a] text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition ${
              isLoading || showPhone ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => revealNumber(candidate.id)}
            disabled={isLoading || showPhone}
          >
            <FaPhone />
            {isLoading ? 'Revealing...' : showPhone ? phoneNumber : 'View Phone Number'}
          </button>
        )}
      </div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4 p-5 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
    <div className="flex items-center space-x-3">
      <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
    </div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-2">
        <div className="h-5 w-5 bg-gray-300 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
      </div>
    ))}
    <div className="h-10 w-full bg-gray-300 rounded-lg mt-4"></div>
  </div>
);

const CandidateList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    router.push('/employer/candidate-database');
  };

  const [filters, setFilters] = useState(() => {
    const params = Object.fromEntries(searchParams);
    return {
      has_resume: false,
      number_revealed: false,
      must_have_keywords: params.keywords || '',
      exclude_keywords: '',
      active: params.active || '',
      min_age: '',
      max_age: '',
      gender: '',
      degree: params.education || '',
      specialization: '',
      language: '',
      department: '',
      city: params.locations || '',
      english_fluency: '',
      experience_type: params.experienceType === 'any' ? [] : [params.experienceType] || [],
      shift_preference: [],
      min_experience: params.minExperience ? parseInt(params.minExperience, 10) : '',
      max_experience: params.maxExperience ? parseInt(params.maxExperience, 10) : '',
      min_salary: params.minSalary ? parseInt(params.minSalary, 10) : '',
      max_salary: params.maxSalary ? parseInt(params.maxSalary, 10) : '',
    };
  });

  const [candidates, setCandidates] = useState([]);
  const [filterOptions, setFilterOptions] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
   last_page: 1,
    next_page_url: null,
    prev_page_url: null,
    total: 0,
    per_page: 10,
  });

  useEffect(() => {
    console.log('searchParams:', Object.fromEntries(searchParams));
    console.log('searchParams size:', searchParams.size);
    console.log('Current URL:', window.location.href);
  }, [searchParams]);

  const fetchCandidates = async (page = 1, perPage = pagination.per_page) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        ...Object.fromEntries(
          Object.entries(filters).filter(([key, value]) => {
            if (Array.isArray(value)) return value.length > 0;
            if (key === 'has_resume' || key === 'number_revealed') return true;
            return value !== '' && value !== false && value !== null;
          })
        ),
        page,
        per_page: perPage,
        has_resume: filters.has_resume ? '1' : '0',
        number_revealed: filters.number_revealed ? '1' : '0',
        ...(filters.experience_type.length > 0 && { experience_type: filters.experience_type.join(',') }),
        ...(filters.shift_preference.length > 0 && { shift_preference: filters.shift_preference }),
      }).toString();
      console.log('queryParams:', queryParams);
      const response = await axios.get(`${baseurl}/filter?${queryParams}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('employerToken')}` }
      });
      const { data, filters: filtersOptions, pagination: responsePagination } = response.data;
      setCandidates(data);
      setFilterOptions(filtersOptions || filterOptions);
      console.log('filterOptions', filtersOptions);
      setPagination({ ...responsePagination, per_page: perPage });
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setError(
        err.response?.data?.messages || 'An error occurred while fetching candidates.'
      );
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && (name === 'has_resume' || name === 'number_revealed')) {
      setFilters((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'checkbox' && name === 'experience_type') {
      setFilters((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v) => v !== value),
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const revealNumber = (candidateId) => {
    axios.post(`${baseurl}/reveal-number`, { candidate_id: candidateId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('employerToken')}` }
    })
      .then(response => {
        setCandidates(candidates.map(candidate =>
          candidate.id === candidateId ? { ...candidate, number: response.data.number } : candidate
        ));
        alert(response.data.message);
      })
      .catch(error => {
        alert(error.response?.data?.error || 'Error revealing number');
      });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        if (key === 'has_resume' || key === 'number_revealed') return value === true;
        return value !== '' && value !== false && value !== null;
      })
    );
    const urlParams = {
      keywords: cleanedFilters.must_have_keywords || '',
      locations: cleanedFilters.city || '',
      minExperience: cleanedFilters.min_experience || '',
      maxExperience: cleanedFilters.max_experience || '',
      minSalary: cleanedFilters.min_salary || '',
      maxSalary: cleanedFilters.max_salary || '',
      education: cleanedFilters.degree || '',
      active: cleanedFilters.active || '',
      experienceType: cleanedFilters.experience_type?.length > 0 ? cleanedFilters.experience_type.join(',') : 'any',
      numberRevealed: cleanedFilters.number_revealed ? '1' : '0',
    };
    const query = new URLSearchParams(urlParams).toString();
    router.push(`/employer/candidate-data?${query}`, { scroll: false });
    fetchCandidates(1, pagination.per_page);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      fetchCandidates(page, pagination.per_page);
    }
  };

  const handlePerPageChange = (e) => {
    const perPage = parseInt(e.target.value, 10);
    setPagination((prev) => ({ ...prev, per_page: perPage, current_page: 1 }));
    fetchCandidates(1, perPage);
  };

  useEffect(() => {
    fetchCandidates(1, pagination.per_page);
  }, [filters]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
          <div className="w-full lg:w-1/3 sticky top-4">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FaUser className="mr-2 text-[#02325a]" /> Filter Candidates
              </h2>
              <form className="space-y-6" onSubmit={handleFilterSubmit}>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="has_resume"
                      checked={filters.has_resume}
                      onChange={handleFilterChange}
                      className="mr-2 h-5 w-5 text-[#02325a] focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <FaFileAlt className="mr-2 text-[#02325a]" /> Candidates with Resume
                  </label>
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="number_revealed"
                      checked={filters.number_revealed}
                      onChange={handleFilterChange}
                      className="mr-2 h-5 w-5 text-[#02325a] focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <FaPhone className="mr-2 text-[#02325a]" /> Number Revealed
                  </label>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaKey className="mr-2 text-[#02325a]" /> Must-Have Keywords
                  </label>
                  <input
                    type="text"
                    name="must_have_keywords"
                    placeholder="e.g., JavaScript, Python"
                    value={filters.must_have_keywords}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaBan className="mr-2 text-[#02325a]" /> Exclude Keywords
                  </label>
                  <input
                    type="text"
                    name="exclude_keywords"
                    placeholder="e.g., PHP, Ruby"
                    value={filters.exclude_keywords}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaUser className="mr-2 text-[#02325a]" /> Status
                  </label>
                  <select
                    name="active"
                    value={filters.active}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  >
                    <option value="">Select Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <FaUser className="mr-2 text-[#02325a]" /> Min Age
        </label>
        <select
          name="min_age"
          value={filters.min_age}
          onChange={handleFilterChange}
          className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
        >
          <option value="" disabled>Select Min Age</option>
          {ageRange
            .filter(age => !filters.max_age || age <= filters.max_age)
            .map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <FaUser className="mr-2 text-[#02325a]" /> Max Age
        </label>
        <select
          name="max_age"
          value={filters.max_age}
          onChange={handleFilterChange}
          className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
        >
          <option value="" disabled>Select Max Age</option>
          {ageRange
            .filter(age => !filters.min_age || age >= filters.min_age)
            .map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
        </select>
      </div>
    </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaUser className="mr-2 text-[#02325a]" /> Gender
                  </label>
                  <select
                    name="gender"
                    value={filters.gender}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaGraduationCap className="mr-2 text-[#02325a]" /> Degree
                  </label>
                  <select
                    name="degree"
                    value={filters?.degree}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  >
                    <option value="">Select Degree</option>
                    {filterOptions?.degrees?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} ({option.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaGraduationCap className="mr-2 text-[#02325a]" /> Specialization
                  </label>
                  <select
                    name="specialization"
                    value={filters?.specialization}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  >
                    <option value="">Select Specialization</option>
                    {filterOptions?.specializations?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} ({option.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaLanguage className="mr-2 text-[#02325a]" /> Language
                  </label>
                  <select
                    name="language"
                    value={filters?.language}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  >
                    <option value="">Select Language</option>
                    {filterOptions?.languages?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} ({option.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaBriefcase className="mr-2 text-[#02325a]" /> Department
                  </label>
                  <select
                    name="department"
                    value={filters.department}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  >
                    <option value="">Select Department</option>
                    {filterOptions?.departments?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} ({option.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaCity className="mr-2 text-[#02325a]" /> Current City
                  </label>
                  <select
                    name="city"
                    value={filters?.city}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  >
                    <option value="">Select City</option>
                    {filterOptions?.cities?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} ({option.count})
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaLanguage className="mr-2 text-[#02325a]" /> English Fluency
                  </label>
                  <select
                    name="english_fluency"
                    value={filters?.english_fluency}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  >
                    <option value="">Select Fluency Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="fluent">Fluent</option>
                  </select>
                </div> */}
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaBriefcase className="mr-2 text-[#02325a]" /> Employment Type
                  </label>
                  <div className="space-y-2">
                  {/* {  console.log('employment_types',filterOptions?.employment_types)} */}
                    {filterOptions?.employment_types?.map((option) => (
                      <label key={option.value} className="flex items-center">
                         {  console.log('employment_types',option)}
                        <input
                          type="checkbox"
                          name="experience_type"
                          value={option.value}
                          checked={filters?.experience_type?.includes(option.value)}
                          onChange={handleFilterChange}
                          className="h-5 w-5 text-[#02325a] focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 flex items-center">
                             {option.value} ({option.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaClock className="mr-2 text-[#02325a]" /> Shift Preference
                  </label>
                  <select
                    name="shift_preference"
                    value={filters?.shift_preference}
                    onChange={handleFilterChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50"
                  >
                    <option value="">Select Shift Preference</option>
                    {filterOptions?.shift_preferences?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} ({option.count})
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Candidate Profiles
                </h2>
                <button
                  onClick={handleBack}
                  className="py-2 px-4 bg-gray-600 text-white rounded-lg text-sm sm:text-base hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
              </div>
              {!loading && candidates.length > 0 && (
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <button
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={!pagination.prev_page_url}
                    className={`py-2 px-4 rounded-lg text-sm sm:text-base ${
                      !pagination.prev_page_url
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#02325a] text-white hover:bg-blue-700'
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm sm:text-base text-gray-700">
                    Page {pagination.current_page} of {pagination.last_page} ({pagination.total} candidates)
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Items per page:</label>
                    <select
                      value={pagination.per_page}
                      onChange={handlePerPageChange}
                      className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                  </div>
                  <button
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={!pagination.next_page_url}
                    className={`py-2 px-4 rounded-lg text-sm sm:text-base ${
                      !pagination.next_page_url
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#02325a] text-white hover:bg-blue-700'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
              {loading ? (
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <SkeletonLoader key={i} />
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-600 text-center text-sm sm:text-base">{error}</p>
              ) : candidates.length === 0 ? (
                <p className="text-gray-500 text-center text-sm sm:text-base">
                  No candidates found. Try adjusting your filters.
                </p>
              ) : (
                <div className="space-y-6">
                  <Suspense fallback={<div>Loading filters...</div>}>
                    {candidates.map((candidate, ind) => (
                      <CandidateCard key={ind} candidate={candidate} />
                    ))}
                  </Suspense>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;
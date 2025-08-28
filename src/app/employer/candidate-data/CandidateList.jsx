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


const CandidateCard = ({ candidate,onViewProfile }) => {
  const [showPhone, setShowPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(candidate.number || 'xxxxxxx');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


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
      ? candidate.skills.slice(0, 4) // Limit to 4 skills
      : []
    : [];

  const jobRoles = (() => {
    try {
      return JSON.parse(candidate.job_roles || "[]");
    } catch {
      return [];
    }
  })();

  const preferredJobTitles = (() => {
    try {
      return JSON.parse(candidate.preferred_job_titles || "[]");
    } catch {
      return [];
    }
  })();

  const preferredLocations = (() => {
    try {
      return JSON.parse(candidate.preferred_locations || "[]");
    } catch {
      return [];
    }
  })();

   const candidateSkils = (() => {
    try {
      return JSON.parse(candidate.skills || "[]");
    } catch {
      return [];
    }
  })();

  const isFresher = candidate.experience_level === 'Fresher';
  const experience = `${candidate.experience_years || 0} yrs ${candidate.experience_months || 0} mos`;

  const colorClass = getRandomColor(candidate.id || candidate.full_name);
  return (
        <>
    <div className="bg-white rounded-lg shadow p-5 border border-gray-200 flex flex-col gap-3 mb-6 max-w-3xl">
      <div className="flex items-center gap-2">
        <div className={`bg-[#02325a] px-4 py-2 rounded-full text-2xl font-semibold text-white`} >
          {candidate.full_name.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{candidate.full_name}</h3>
          <div className='flex mt-1 gap-2'>
            {!isFresher && (
              <>
                <div className="text-md flex items-center gap-2 text-[#5e6c84] font-semibold">
                  <FaBriefcase className="text-base text-[#02325a]" />
                  {experience}
                </div>
                <div className="text-md flex items-center gap-2 text-[#5e6c84] font-semibold">
                  <FaCoins className="text-base text-[#02325a]" />
                  {formatIndianSalary(candidate.current_salary)}
                </div>
              </>
            )}
            {isFresher && (
              <div className="text-md flex items-center gap-2 text-[#5e6c84] font-semibold">
                <span className="bg-green-100 text-green-800 rounded-full px-3 py-1">Fresher</span>
              </div>
            )}
            <div className="text-md flex items-center gap-2 text-[#5e6c84] font-semibold">
              <FaMapMarkerAlt className="text-base text-[#02325a]" />
              {candidate.city}, {candidate.state}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-items-start flex-col my-4 gap-2">
        {!isFresher && (
          <div className='flex w-full gap-5 my-1'>
            <span className='text-xl flex items-center gap-2 text-gray-500'>
              <FaBriefcase className='text-[20px]' />Current / Latest
            </span>
            <span className="flex text-xl items-center text-[#02325a] gap-1">
              {candidate.job_title}, {candidate.company_name}
            </span>
          </div>
        )}
        <div className='flex w-full gap-5 my-1'>
          <span className='text-xl flex items-center gap-2 text-gray-500'>
            <FaMapMarkerAlt className='text-[20px]' />Pref. Location
          </span>
          <span className="flex text-xl items-center text-[#02325a] gap-1">
            {preferredLocations.length > 0 ? preferredLocations.join(', ') : `${candidate.city}, ${candidate.state}`}
          </span>
        </div>
        <div className='flex w-full gap-5 my-1'>
          <span className='text-xl flex items-center gap-2 text-gray-500'>
            <FaBriefcase className='text-[20px]' />Pref. Job Titles
          </span>
          <span className="flex text-xl items-center text-[#02325a] gap-1">
            {preferredJobTitles.length > 0 ? preferredJobTitles.join(', ') : 'Not specified'}
          </span>
        </div>
        <div className='flex w-full gap-5 my-1'>
          <span className='text-xl flex items-center gap-2 text-gray-500'>
            <BiMedal className='text-[20px]' />Skills
          </span>
          <span className="flex text-xl items-center text-[#02325a] gap-1">
            {candidateSkils && candidateSkils.length > 0 ? (
              candidateSkils.map((skill, idx) => (
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

         <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 hover:bg-green-700 transition"
            onClick={toggleSidebar}
          >
            <FaUser /> View Profile
          </button>
      </div>
    </div>


       <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
           >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Candidate Profile</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={toggleSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-full">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Personal Information</h3>
              <p className="text-sm text-gray-600"><strong>Full Name:</strong> {candidate.full_name}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {candidate.email}</p>
              <p className="text-sm text-gray-600"><strong>Phone:</strong> {candidate.number_revealed ? candidate.number : phoneNumber}</p>
              <p className="text-sm text-gray-600"><strong>Gender:</strong> {candidate.gender}</p>
              <p className="text-sm text-gray-600"><strong>Date of Birth:</strong> {new Date(candidate.dob).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {candidate.address}</p>
              <p className="text-sm text-gray-600"><strong>City:</strong> {candidate.city}</p>
              <p className="text-sm text-gray-600"><strong>State:</strong> {candidate.state}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700">Professional Details</h3>
              <p className="text-sm text-gray-600"><strong>Job Title:</strong> {candidate.job_title || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Company:</strong> {candidate.company_name || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Experience:</strong> {formatExperience()}</p>
              <p className="text-sm text-gray-600"><strong>Current Salary:</strong> {formatIndianSalary(candidate.current_salary)}</p>
              <p className="text-sm text-gray-600"><strong>Employment Type:</strong> {candidate.employment_type || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Experience Level:</strong> {candidate.experience_level || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Job Roles:</strong> {jobRoles.length > 0 ? jobRoles.join(', ') : 'None'}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700">Education</h3>
              <p className="text-sm text-gray-600"><strong>Degree:</strong> {candidate.degree || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Specialization:</strong> {candidate.specialization || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>College:</strong> {candidate.college_name || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Passing Marks:</strong> {candidate.passing_marks || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Education Level:</strong> {candidate.education_level || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Currently Pursuing:</strong> {candidate.currently_pursuing || 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Highest Education:</strong> {candidate.highest_education || 'N/A'}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700">Preferences</h3>
              <p className="text-sm text-gray-600"><strong>Preferred Job Titles:</strong> {preferredJobTitles.length > 0 ? preferredJobTitles.join(', ') : 'Not specified'}</p>
              <p className="text-sm text-gray-600"><strong>Preferred Locations:</strong> {preferredLocations.length > 0 ? preferredLocations.join(', ') : 'Not specified'}</p>
              <p className="text-sm text-gray-600"><strong>Preferred Languages:</strong> {candidate.preferred_language || 'Not specified'}</p>
              <p className="text-sm text-gray-600"><strong>Prefers Night Shift:</strong> {candidate.prefers_night_shift ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-600"><strong>Prefers Day Shift:</strong> {candidate.prefers_day_shift ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-600"><strong>Work from Home:</strong> {candidate.work_from_home ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-600"><strong>Work from Office:</strong> {candidate.work_from_office ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-600"><strong>Field Job:</strong> {candidate.field_job ? 'Yes' : 'No'}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {/* {candidateSkills.length > 0 ? (
                  candidateSkills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-50 text-[#02325a] rounded-full px-3 py-1 text-sm">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No skills listed</p>
                )} */}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700">Activity</h3>
              <p className="text-sm text-gray-600"><strong>Active User:</strong> {candidate.active_user ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-600"><strong>Last Login:</strong> {candidate.last_login ? new Date(candidate.last_login).toLocaleString() : 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Total Jobs Applied:</strong> {candidate.total_jobs_applied || 0}</p>
              <p className="text-sm text-gray-600"><strong>Total Job Views:</strong> {candidate.total_job_views || 0}</p>
              <p className="text-sm text-gray-600"><strong>Profile Visited:</strong> {candidate.profile_visited ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-600"><strong>Created At:</strong> {candidate.created_at ? new Date(candidate.created_at).toLocaleString() : 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Updated At:</strong> {candidate.updated_at ? new Date(candidate.updated_at).toLocaleString() : 'N/A'}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700">Additional Information</h3>
              <p className="text-sm text-gray-600"><strong>English Level:</strong> {candidate.english_level || 'Not specified'}</p>
              <p className="text-sm text-gray-600"><strong>Notice Period:</strong> {candidate.notice_period || 'Not specified'}</p>
              <p className="text-sm text-gray-600"><strong>Experience Type:</strong> {candidate.experience_type || 'Not specified'}</p>
              <p className="text-sm text-gray-600"><strong>Start Date:</strong> {candidate.start_date ? new Date(candidate.start_date).toLocaleDateString() : 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>End Date:</strong> {candidate.end_date ? new Date(candidate.end_date).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}


    
    </>
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
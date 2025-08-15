'use client';

import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import Sidebar from '../../components/Sidebar';
import { baseurl } from '@/app/components/common';
import { parseISO, addDays, isAfter } from 'date-fns';
import axios from 'axios';
import { HiDotsVertical } from 'react-icons/hi';

import {useRouter} from 'next/navigation';
const MyJobs = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    skills: '',
    salaryRange: '',
    jobType: 'full-time',
    location: '',
    deadline: '',
  });

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('employerToken');
      if (!token) return;

      try {
        const res = await axios.get(`${baseurl}/employer/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.success) {
          setIsLoggedIn(res.data.data);
        }
      } catch (err) {
        console.error('Not logged in or invalid token');
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);


  console.log('isLoggedI',isLoggedIn.id)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const employerId = isLoggedIn.id;
          console.log('isLogged',employerId)
        const response = await fetch(`${baseurl}/jobs/employer/${employerId}`);
        const result = await response.json();

        if (result.status === 'success') {
          setJobs(result.data);
        } else {
          console.error('Failed to fetch jobs:', result.message);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, [isLoggedIn.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
 girl};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsJobModalOpen(false);
  };

  console.log('isLoggedIn.is_verified',isLoggedIn)

  // Check if employer is not verified
  if (isLoggedIn.is_verified === 0 || isLoggedIn.is_verified === null || isLoggedIn.is_blocked === 1 ) {
    return (
         <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-xl transform transition-all animate-fadeIn">
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                Profile in Review Mode
                <span className="ml-3 inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </h2>
            </div>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Your employer account is currently under review by our admin team. Once verified, you'll be able to post jobs and allow candidates to log in and apply. Please wait for admin approval or contact support for assistance.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/employer/verify-status" // Replace with your verification status page URL
                className="px-6 py-3 bg-[#02325a] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Check Verification Status
              </a>
              <a
                href="/contact" // Replace with your support page URL
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
              >
                Contact Support
              </a>
            </div>
            <p className="text-sm text-gray-500 text-center mt-6">
              We typically review accounts within 24-48 hours. Thank you for your patience!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render the full dashboard if verified
  return (
    <div className="flex bg-gray-100">
           <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}  />
      <div className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-20'
          }`} >
      
        <div className="mb-8 px-[2%] py-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Job Postings</h2>
          <div className="grid grid-cols-1 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-gray-600">No jobs posted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{value}</span>
        <div className={`flex items-center ${isPositive ? 'text-[#02325a]' : 'text-red-500'}`}>
          {isPositive ? <BiTrendingUp size={24} /> : <BiTrendingDown size={24} />}
          <span className="ml-1">{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job }) => {
  let additionalRequirements = { skills: [] };
  try {
    if (job?.additional_requirements && typeof job.additional_requirements === 'string') {
      additionalRequirements = JSON.parse(job.additional_requirements);
    }
  } catch (error) {
    console.error('Error parsing additional_requirements:', error);
  }

  console.log(job)

  const createdAt = job?.created_at ? parseISO(job.created_at) : new Date();
  const deadline = addDays(createdAt, job?.job_expire_time || 14);
  const deadlineFormatted = deadline.toLocaleDateString();
  const isExpired = isAfter(new Date(), deadline);
  const status = isExpired ? 'Expired' : 'Active';
  const verify = job.is_verified ? 'Active' : 'Not Active';

  const postedDate = createdAt.toLocaleDateString();

    const skills = typeof job?.additional_requirements === 'string' 
    ? JSON.parse(job.additional_requirements) 
    : job?.additional_requirements || [];

  return (
      <div className="bg-white w-full mx-auto shadow-sm rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-5">
        {/* Header with Job Title, Status, and Menu */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {job?.job_title || 'Untitled Job'}
          </h3>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}
            >
              {status}
            </span>
            <HiDotsVertical className="text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>
        </div>

        {/* Simplified Job Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Location:</span> {job?.location || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Posted:</span> {postedDate}
            </p>
            {/* <p className="text-sm text-gray-600">
              <span className="font-medium">Deadline:</span> {deadlineFormatted}
            </p> */}
             <p className="text-sm text-gray-600">
              <span className="font-medium">Posted by:</span> {job?.employer?.name || 'N/A'}
            </p>
          </div>
          
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Salary:</span>{' '}
              {job?.min_salary && job?.max_salary 
                ? `₹${parseInt(job.min_salary).toLocaleString()} - ₹${parseInt(job.max_salary).toLocaleString()}`
                : 'N/A'}
            </p>
            {parseFloat(job?.incentive) >= 1 && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Incentive:</span>{' '}
                ₹{parseFloat(job.incentive).toLocaleString()}
              </p>
            )}
            <p className="text-sm text-gray-600">
              <span className="font-medium">Type:</span> {job?.job_type || 'N/A'} • {job?.work_location_type || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Skills:</span>{' '}
              {skills.length > 0 ? skills.join(', ') : 'None'}
            </p>
           
            <p className="text-sm text-gray-600">
              <span className="font-medium">Company:</span> {job?.company?.name || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
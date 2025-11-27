"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import axios from "axios";
import { baseurl, storageLink } from "@/app/components/common";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaPhone,
  FaCoins,
  FaFileAlt,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaClock,
} from "react-icons/fa";
import { BiMedal } from "react-icons/bi";

// CandidateCard and SkeletonLoader components remain unchanged
const ProfileDetails = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-[#02325a]">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-gray-800">{value || "N/A"}</p>
    </div>
  </div>
);

const CandidateCard = ({ candidate }) => {
  const [showPhone, setShowPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(candidate.number || "xxxxxxx");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function formatIndianSalary(amount) {
    const num = Number(amount);
    if (isNaN(num)) return amount;
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2).replace(/\.00$/, "") + " Cr";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2).replace(/\.00$/, "") + " Lac";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2).replace(/\.00$/, "") + "k";
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("employerToken")}`,
          },
        }
      );
      setPhoneNumber(response.data.number || "N/A");
      setShowPhone(true);
      alert(response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error revealing number";
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

  const candidateSkills = (() => {
    try {
      return JSON.parse(candidate.skills || "[]");
    } catch {
      return [];
    }
  })();

  const isFresher = candidate.experience_level === "Fresher";
  const experience = `${candidate.experience_years || 0} yrs ${candidate.experience_months || 0} mos`;
  const isImmediateJoiner = candidate.notice_period && Number(candidate.notice_period) <= 30;
  const isFluentEnglish = candidate.english_level === "Fluent";

  return (
    <>
      <div className="bg-white rounded-lg shadow p-5 border border-gray-200 flex flex-col gap-3 mb-6 max-w-3xl">
        <div className="flex items-center gap-3">
          {candidate.profile_pic ? (
            <img
              src={`${storageLink}${candidate.profile_pic}`}
              alt={`${candidate.full_name}'s profile`}
              className="w-18 h-18 rounded-full object-cover border-2 border-[#02325a]"
            />
          ) : (
            <div
              className="bg-[#02325a] w-12 h-12 rounded-full flex items-center justify-center text-2xl font-semibold text-white"
            >
              {candidate?.full_name?.charAt(0) || "N"}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {candidate.full_name}
            </h3>
            <div className="flex mt-1 gap-2 flex-wrap">
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
                  <span className="bg-green-100 text-green-800 rounded-full px-3 py-1">
                    Fresher
                  </span>
                </div>
              )}
              {isImmediateJoiner && (
                <div className="text-md flex items-center gap-2 text-[#5e6c84] font-semibold">
                  <span className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1">
                    Immediate Joiner
                  </span>
                </div>
              )}
              {isFluentEnglish && (
                <div className="text-md flex items-center gap-2 text-[#5e6c84] font-semibold">
                  <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                    Fluent English
                  </span>
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
            <div className="flex w-full gap-5 my-1">
              <span className="text-xl flex items-center gap-2 text-gray-500">
                <FaBriefcase className="text-[20px]" />
                Current / Latest
              </span>
              <span className="flex text-xl items-center text-[#02325a] gap-1">
                {candidate.job_title}, {candidate.company_name}
              </span>
            </div>
          )}
          <div className="flex w-full gap-5 my-1">
            <span className="text-xl flex items-center gap-2 text-gray-500">
              <FaMapMarkerAlt className="text-[20px]" />
              Pref. Location
            </span>
            <span className="flex text-xl items-center text-[#02325a] gap-1">
              {preferredLocations?.length > 0
                ? preferredLocations?.join(", ")
                : `${candidate.city}, ${candidate.state}`}
            </span>
          </div>
          <div className="flex w-full gap-5 my-1">
            <span className="text-xl flex items-center gap-2 text-gray-500">
              <FaBriefcase className="text-[20px]" />
              Pref. Job Titles
            </span>
            <span className="flex text-xl items-center text-[#02325a] gap-1">
              {preferredJobTitles.length > 0
                ? preferredJobTitles.join(", ")
                : "Not specified"}
            </span>
          </div>
          <div className="flex w-full gap-5 my-1">
            <span className="text-xl flex items-center gap-2 text-gray-500">
              <BiMedal className="text-[20px]" />
              Skills
            </span>
            <span className="flex text-xl items-center text-[#02325a] gap-1">
              {candidateSkills && candidateSkills.length > 0 ? (
                candidateSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-[#02325a] rounded-full px-3 py-1"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No skills listed</span>
              )}
            </span>
          </div>
          <div className="flex w-full gap-5 my-1">
            <span className="text-xl flex items-center gap-2 text-gray-500">
              <FaGraduationCap className="text-[20px]" />
              Education
            </span>
            <span className="flex text-xl items-center text-[#02325a] gap-1">
              {candidate.degree} in {candidate.specialization},{" "}
              {candidate.college_name}
            </span>
          </div>
          <div className="flex w-full gap-5 my-1">
            <span className="text-xl flex items-center gap-2 text-gray-500">
              <FaFileAlt className="text-[20px]" />
              Resume
            </span>
            <span className="flex text-xl items-center text-[#02325a] gap-2">
              {candidate.has_resume ? (
                <>
                  <a
                    href={`${baseurl}/resume/${candidate.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </>
              ) : (
                <span className="text-gray-400">No resume available</span>
              )}
            </span>
          </div>
        </div>
        <div className="mt-1 flex justify-between">
          {candidate.number_revealed ? (
            <div className="flex items-center bg-blue-100 text-blue-900 px-4 py-2 rounded-lg font-bold gap-2 w-fit">
              <FaPhone /> {candidate.number}
            </div>
          ) : (
            <button
              className={`bg-[#02325a] text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition ${
                isLoading || showPhone ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => revealNumber(candidate.id)}
              disabled={isLoading || showPhone}
            >
              <FaPhone />
              {isLoading
                ? "Revealing..."
                : showPhone
                ? phoneNumber
                : "View Phone Number"}
            </button>
          )}
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 hover:bg-green-700 transition"
            onClick={toggleSidebar}
          >
            <FaUser /> View Full Profile Free
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[600px] bg-gradient-to-br from-white to-gray-100 shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b bg-white/80 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaUser className="text-[#02325a]" /> Candidate Profile
          </h2>
          <button
            className="text-white bg-[#02325a] hover:bg-blue-700 rounded-full p-2 transition-colors"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-8 overflow-y-auto h-full">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaUser className="text-[#02325a]" /> Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-sm text-gray-600">
                  <strong>Full Name:</strong> {candidate.full_name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {candidate.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong>{" "}
                  {candidate.number_revealed ? candidate.number : phoneNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Gender:</strong> {candidate.gender}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(candidate.dob).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {candidate.address}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>City:</strong> {candidate.city}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>State:</strong> {candidate.state}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaBriefcase className="text-[#02325a]" /> Professional Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-sm text-gray-600">
                  <strong>Job Title:</strong> {candidate.job_title || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Company:</strong> {candidate.company_name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Experience:</strong> {formatExperience()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Current Salary:</strong>{" "}
                  {formatIndianSalary(candidate.current_salary)}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Employment Type:</strong>{" "}
                  {candidate.employment_type || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Experience Level:</strong>{" "}
                  {candidate.experience_level || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Notice Period:</strong>{" "}
                  {isImmediateJoiner ? "Immediate Joiner" : candidate.notice_period || "Not specified"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Job Roles:</strong>{" "}
                  {jobRoles.length > 0 ? jobRoles.join(", ") : "None"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-[#02325a]" /> Education
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-sm text-gray-600">
                  <strong>Degree:</strong> {candidate.degree || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Specialization:</strong>{" "}
                  {candidate.specialization || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>College:</strong> {candidate.college_name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Passing Marks:</strong>{" "}
                  {candidate.passing_marks || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Education Level:</strong>{" "}
                  {candidate.education_level || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Currently Pursuing:</strong>{" "}
                  {candidate.currently_pursuing || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Highest Education:</strong>{" "}
                  {candidate.highest_education || "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-[#02325a]" /> Resume
              </h3>
              {candidate.has_resume ? (
                <div className="flex items-center gap-2">
                  <a
                    href={`${baseurl}/resume/${candidate.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-2 font-medium"
                  >
                    <FaFileAlt /> View Resume
                  </a>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
              ) : (
                <p className="text-sm text-gray-600">No resume available</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaGlobe className="text-[#02325a]" /> Preferences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-sm text-gray-600">
                  <strong>Preferred Job Titles:</strong>{" "}
                  {preferredJobTitles?.length > 0
                    ? preferredJobTitles?.join(", ")
                    : "Not specified"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Preferred Locations:</strong>{" "}
                  {preferredLocations?.length > 0
                    ? preferredLocations?.join(", ")
                    : "Not specified"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Preferred Languages:</strong>{" "}
                  {candidate.preferred_language || "Not specified"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Prefers Night Shift:</strong>{" "}
                  {candidate.prefers_night_shift ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Prefers Day Shift:</strong>{" "}
                  {candidate.prefers_day_shift ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Work from Home:</strong>{" "}
                  {candidate.work_from_home ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Work from Office:</strong>{" "}
                  {candidate.work_from_office ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Field Job:</strong>{" "}
                  {candidate.field_job ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BiMedal className="text-[#02325a]" /> Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidateSkills.length > 0 ? (
                  candidateSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-[#02325a] rounded-full px-3 py-1 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No skills listed</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaClock className="text-[#02325a]" /> Activity
              </h3>
              <div class-Div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-sm text-gray-600">
                  <strong>Active User:</strong>{" "}
                  {candidate.active_user ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Last Login:</strong>{" "}
                  {candidate.last_login
                    ? new Date(candidate.last_login).toLocaleString()
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Total Jobs Applied:</strong>{" "}
                  {candidate.total_jobs_applied || 0}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Total Job Views:</strong>{" "}
                  {candidate.total_job_views || 0}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Profile Visited:</strong>{" "}
                  {candidate.profile_visited ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Created At:</strong>{" "}
                  {candidate.created_at
                    ? new Date(candidate.created_at).toLocaleString()
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Updated At:</strong>{" "}
                  {candidate.updated_at
                    ? new Date(candidate.updated_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] duration-300 mb-[100px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaGlobe className="text-[#02325a]" /> Additional Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-sm text-gray-600">
                  <strong>English Level:</strong>{" "}
                  {isFluentEnglish ? "Fluent" : candidate.english_level || "Not specified"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Notice Period:</strong>{" "}
                  {isImmediateJoiner ? "Immediate Joiner" : candidate.notice_period || "Not specified"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Experience Type:</strong>{" "}
                  {candidate.experience_type || "Not specified"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Start Date:</strong>{" "}
                  {candidate.start_date
                    ? new Date(candidate.start_date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>End Date:</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState({ id: null });
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("matches");
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

  // Set initial activeTab based on query parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "matches" || tab === "applied") {
      setActiveTab(tab);
    } else {
      setActiveTab("matches"); // Default to matches if no valid tab is specified
    }
  }, [searchParams]);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("employerToken");
      if (!token) {
        router.push("/employer/login");
        return;
      }

      try {
        const res = await axios.get(`${baseurl}/employer/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.success) {
          setIsLoggedIn(res.data.data);
        } else {
          router.push("/employer/login");
        }
      } catch (err) {
        console.error("Not logged in or invalid token", err);
        router.push("/employer/login");
      }
    };

    checkLogin();
  }, [router]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!isLoggedIn?.id) return;

      try {
        const token = localStorage.getItem("employerToken");
        const jobId = slug; // Use slug as jobId

        const dashboardResponse = await axios.get(
          `${baseurl}/jobs/${jobId}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (dashboardResponse.data.status === "success") {
          setJobs([
            {
              id: jobId,
              matches: dashboardResponse.data.data.matches,
              applications: dashboardResponse.data.data.applications,
            },
          ]);
        } else {
          console.error("Failed to fetch job dashboard:", dashboardResponse.data.message);
        }
      } catch (error) {
        console.error(`Error fetching dashboard for job ${jobId}:`, error);
      }
    };

    fetchJobs();
  }, [isLoggedIn?.id, slug]);

  // Normalize candidates data to ensure consistent structure
  const candidates = activeTab === "matches"
    ? jobs[0]?.matches || []
    : (jobs[0]?.applications || []).map((app) => ({
        ...app.candidate,
        number_revealed: app.candidate.number_revealed || false,
      }));

  const fetchCandidates = async (page = 1, perPage = pagination.per_page) => {
    setLoading(true);
    setError(null);
    try {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const paginatedCandidates = candidates.slice(start, end);

      setPagination({
        current_page: page,
        last_page: Math.ceil(candidates.length / perPage),
        total: candidates.length,
        per_page: perPage,
        next_page_url: page < Math.ceil(candidates.length / perPage) ? page + 1 : null,
        prev_page_url: page > 1 ? page - 1 : null,
      });
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError("Error fetching candidates");
    } finally {
      setLoading(false);
    }
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
    if (jobs.length > 0) {
      fetchCandidates(1, pagination.per_page);
    }
  }, [jobs, activeTab]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="max-w-5xl mx-auto w-full">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Candidate Profiles
              </h2>
              <button
                onClick={() => router.push("/employer/candidate-database")}
                className="py-2 px-4 bg-gray-600 text-white rounded-lg text-sm sm:text-base hover:bg-gray-700 transition-colors"
              >
                Back to Candidate Database
              </button>
            </div>
            <div className="flex mb-6">
              <button
                className={`py-2 px-4 text-sm sm:text-base font-semibold rounded-l-lg ${
                  activeTab === "matches"
                    ? "bg-[#02325a] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveTab("matches")}
              >
                Matches
              </button>
              <button
                className={`py-2 px-4 text-sm sm:text-base font-semibold rounded-r-lg ${
                  activeTab === "applied"
                    ? "bg-[#02325a] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveTab("applied")}
              >
                Applied
              </button>
            </div>
            {!loading && candidates.length > 0 && (
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={!pagination.prev_page_url}
                  className={`py-2 px-4 rounded-lg text-sm sm:text-base ${
                    !pagination.prev_page_url
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#02325a] text-white hover:bg-blue-700"
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm sm:text-base text-gray-700">
                  Page {pagination.current_page} of {pagination.last_page} (
                  {pagination.total} candidates)
                </span>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Items per page:
                  </label>
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
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#02325a] text-white hover:bg-blue-700"
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
              <p className="text-red-600 text-center text-sm sm:text-base">
                {error}
              </p>
            ) : candidates.length === 0 ? (
              <p className="text-gray-500 text-center text-sm sm:text-base">
                No {activeTab === "matches" ? "matching" : "applied"} candidates found for this job.
              </p>
            ) : (
              <div className="space-y-6">
                <Suspense fallback={<div>Loading candidates...</div>}>
                  {candidates.slice(
                    (pagination.current_page - 1) * pagination.per_page,
                    pagination.current_page * pagination.per_page
                  ).map((candidate, ind) => (
                    <CandidateCard key={ind} candidate={candidate} />
                  ))}
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;
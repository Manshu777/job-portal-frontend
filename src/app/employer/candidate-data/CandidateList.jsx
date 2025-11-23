"use client";

import { useState, Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import {
  UserIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  MapPinIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { BiMedal } from "react-icons/bi";
import { MdWorkHistory } from "react-icons/md";
import { baseurl, storageLink } from "@/app/components/common";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaPhone,
  FaCoins,
  FaFileAlt,
  FaKey,
  FaBan,
  FaUser,
  FaGraduationCap,
  FaLanguage,
  FaCity,
  FaBriefcase,
  FaClock,
} from "react-icons/fa";
import AsyncCreatableSelect from "react-select/async-creatable";
import { FaChevronDown } from "react-icons/fa";
const ageRange = Array.from({ length: 33 }, (_, i) => 18 + i); // 18 to 50

const ProfileDetails = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-[#02325a]">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-gray-800">{value || "N/A"}</p>
    </div>
  </div>
);

const loadOptions = async (inputValue, field, filterOptions) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const fieldMap = {
    language: "languages",
    city: "cities",
    specialization: "specializations",
    degree: "degrees",
  };

  const options = filterOptions[fieldMap[field]] || [];
  const filteredOptions = options
    .filter((option) =>
      option.value.toLowerCase().includes(inputValue.toLowerCase())
    )
    .map((option) => ({
      value: option.value,
      label: `${option.value} (${option.count})`,
    }));

  return filteredOptions;
};

const getSelectOptions = (values, allOptions) => {
  if (!values || !Array.isArray(values)) return [];
  return values.map((value) => {
    const option = allOptions?.find((opt) => opt.value === value);
    return option
      ? { value: option.value, label: `${option.value} (${option.count})` }
      : { value, label: value };
  });
};

const getSelectedValues = (selectedOptions) => {
  if (!selectedOptions || !Array.isArray(selectedOptions)) return [];
  return selectedOptions.map((opt) => opt.value);
};


const formatDateRange = (start, end, isCurrent) => {
  const format = (date) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  };

  const startFmt = format(start);
  const endFmt = isCurrent ? "Present" : format(end);

  return `${startFmt} - ${endFmt}`;
};

const formatExperienceTotal = (years, months) => {
  years = parseInt(years) || 0;
  months = parseInt(months) || 0;
  const totalYears = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const y = years + totalYears;
  const m = remainingMonths;

  if (y === 0 && m === 0) return "Fresher";
  if (y === 0) return `${m} month${m > 1 ? "s" : ""}`;
  if (m === 0) return `${y} year${y > 1 ? "s" : ""}`;
  return `${y} yr${y > 1 ? "s" : ""} ${m} mo`;
};

const formatIndianSalary = (salary) => {
  if (!salary) return "Not disclosed";
  const num = parseFloat(salary);
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)} K`;
  return `₹${num}`;
};


const CandidateCard = ({ candidate, onViewProfile }) => {
  const [showPhone, setShowPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(candidate.number || "xxxxxxx");
  const [emailNumber, setemailNumber] = useState(candidate.email || "xxxxxxx");

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
      setemailNumber(response.data.email || "N/A")
      setShowPhone(true);
  
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

  const skills = candidate.skills
    ? Array.isArray(candidate.skills)
      ? candidate.skills.slice(0, 4)
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
              src={`${storageLink}${candidate?.profile_pic}`}
              alt={`${candidate.full_name}'s profile`}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#02325a]"
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
              {preferredLocations.length > 0
                ? preferredLocations.join(", ")
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[600px] bg-gradient-to-br from-white to-gray-100 shadow-2xl transform transition-transform duration-500 ease-in-out z-[999] ${
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
                  <strong>Email:</strong>   {candidate.number_revealed ? candidate.email : emailNumber}
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
  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
    <span className="flex items-center gap-2">
      <FaBriefcase className="text-[#02325a]" /> Work Experience
    </span>
    {/* Optional: Show total experience badge */}
    {candidate.experiences && candidate.experiences.length > 0 && (
      <span className="text-xs bg-[#02325a] text-white px-3 py-1 rounded-full">
        {formatExperienceTotal(candidate.experience_years, candidate.experience_months)}
      </span>
    )}
  </h3>

  {candidate.experiences && candidate.experiences.length > 0 ? (
    <div className="space-y-6">
      {candidate.experiences.map((exp, index) => (
        <div
          key={exp.id || index}
          className={`relative border-l-4 ${
            exp.currently_working ? "border-green-500" : "border-[#02325a]"
          } pl-5 py-4 bg-gray-50 rounded-r-lg shadow-sm`}
        >
          {/* Current Job Indicator */}
          {exp.currently_working && (
            <span className="absolute -top-3 -left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Current
            </span>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {/* Job Title */}
            <p className="text-gray-800 font-medium col-span-2">
              {exp.job_title || "Not Specified"}
            </p>

            {/* Company Name */}
            <p className="text-gray-700">
              <strong>Company:</strong> {exp.company_name || "Not Mentioned"}
            </p>

            {/* Department / Function */}
            {exp.department && (
              <p className="text-gray-700">
                <strong>Department:</strong> {exp.department}
              </p>
            )}

            {/* Duration */}
            <p className="text-gray-700">
              <strong>Duration:</strong>{" "}
              {formatDateRange(exp.start_date, exp.end_date, exp.currently_working)}
            </p>

            {/* Employment Type */}
            {exp.employment_type && (
              <p className="text-gray-700">
                <strong>Type:</strong>{" "}
                <span className="capitalize">{exp.employment_type.replace(/_/g, " ")}</span>
              </p>
            )}

            {/* Notice Period (only if not current) */}
            {!exp.currently_working && candidate.notice_period && (
              <p className="text-gray-700 sm:col-span-2">
                <strong>Notice Period:</strong>{" "}
                {isImmediateJoiner ? "Immediate Joiner" : candidate.notice_period}
              </p>
            )}

            {/* Current Salary (only show for current job) */}
            {exp.currently_working && candidate.current_salary && (
              <p className="text-gray-700">
                <strong>Current Salary:</strong>{" "}
                {formatIndianSalary(candidate.current_salary)}
              </p>
            )}

            {/* Job Description (optional) */}
            {exp.job_description && (
              <div className="col-span-2 mt-2">
                <p className="text-gray-600 text-xs leading-relaxed">
                  {exp.job_description}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 text-gray-500 italic">
      {candidate.experience_years > 0 || candidate.experience_months > 0
        ? `${formatExperienceTotal(
            candidate.experience_years,
            candidate.experience_months
          )} of experience (details not added)`
        : "Fresher / No experience added"}
    </div>
  )}
</div>

            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] duration-300">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
    <FaGraduationCap className="text-[#02325a]" /> Education
  </h3>

  {candidate.educations && candidate.educations.length > 0 ? (
    <div className="space-y-6">
      {candidate.educations.map((edu, index) => (
        <div
          key={edu.id || index}
          className="border-l-4 border-[#02325a] pl-4 py-3 bg-gray-50 rounded-r-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {/* Education Level & Degree */}
            <p className="text-gray-700">
              <strong className="text-gray-900">Degree:</strong>{" "}
              {edu.education_level || edu.degree || "Not Specified"}
            </p>

            {/* Specialization */}
            <p className="text-gray-700">
              <strong className="text-gray-900">Specialization:</strong>{" "}
              {edu.specialization || "N/A"}
            </p>

            {/* College Name */}
            <p className="text-gray-700">
              <strong className="text-gray-900">Institute:</strong>{" "}
              {edu.college_name || "Not Mentioned"}
            </p>

            {/* Year of Completion */}
            <p className="text-gray-700">
              <strong className="text-gray-900">Year:</strong>{" "}
              {edu.complete_years || edu.complete_month
                ? `${edu.complete_years || ""}${edu.complete_month ? ` - ${edu.complete_month}` : ""}`
                : "N/A"}
            </p>

            {/* Education Type (Graduation / Post Graduation) */}
            <p className="text-gray-700 capitalize">
              <strong className="text-gray-900">Level:</strong>{" "}
              {edu.education_type?.replace("_", " ") || "Not Specified"}
            </p>

            {/* Currently Pursuing */}
            <p className="text-gray-700">
              <strong className="text-gray-900">Status:</strong>{" "}
              <span className={`font-medium ${edu.pursuing ? "text-green-600" : "text-gray-600"}`}>
                {edu.pursuing ? "Currently Pursuing" : "Completed"}
              </span>
            </p>

            {/* Passing Marks (Optional) */}
            {edu.passing_marks && (
              <p className="text-gray-700 sm:col-span-2">
                <strong className="text-gray-900">Marks/CGPA:</strong> {edu.passing_marks}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 italic">No education details added yet.</p>
  )}
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
                  {preferredJobTitles.length > 0
                    ? preferredJobTitles.join(", ")
                    : "Not specified"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Preferred Locations:</strong>{" "}
                  {preferredLocations.length > 0
                    ? preferredLocations.join(", ")
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <strong>End Date:</strong>{" "}
                  {candidate.end_date
                    ? new Date(candidate.end_date).toLocaleDateString()
                    : "N/A"}
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

const MultiSelectCheckbox = ({
  name,
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle checkbox change
  const handleCheckboxChange = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 cursor-pointer flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span className="text-gray-700">
          {value.length > 0
            ? value
                .map(
                  (val) =>
                    options.find((opt) => opt.value === val)?.label || val
                )
                .join(", ")
            : placeholder}
        </span>
        <FaChevronDown
          className={`text-gray-500 transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options?.length > 0 ? (
            options.map((option) => (
              <label
                key={option.value}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                  className="mr-2 h-4 w-4 text-[#02325a] border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  {option.label} ({option.count})
                </span>
              </label>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

const CandidateList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    router.push("/employer/candidate-database");
  };

  const [filters, setFilters] = useState(() => {
    const params = Object.fromEntries(searchParams);
    const parseArrayParam = (param) => {
      if (!param) return [];
      return Array.isArray(param) ? param : param.split(",");
    };

    return {
      has_resume: false,
      number_revealed: params.number_revealed || "",
      number_revealed_period: "",
      show_number_revealed_period: false,
      must_have_keywords: params.keywords || "",
      exclude_keywords: "",
      active: params.active || "",
      min_age: "",
      max_age: "",
      gender: "",
      degree: parseArrayParam(params.education),
      specialization: parseArrayParam(params.specialization),
      language: parseArrayParam(params.language),
      department: parseArrayParam(params.department), // Changed to array
      city: parseArrayParam(params.locations),
      english_fluency: "",
      experience_type:
        params.experienceType === "any"
          ? []
          : parseArrayParam(params.experienceType),
      shift_preference: parseArrayParam(params.shift_preference),
      min_experience: params.minExperience
        ? parseInt(params.minExperience, 10)
        : "",
      max_experience: params.maxExperience
        ? parseInt(params.maxExperience, 10)
        : "",
      min_salary: params.minSalary ? parseInt(params.minSalary, 10) : "",
      max_salary: params.maxSalary ? parseInt(params.maxSalary, 10) : "",
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
    console.log("searchParams:", Object.fromEntries(searchParams));
    console.log("searchParams size:", searchParams.size);
    console.log("Current URL:", window.location.href);
  }, [searchParams]);

  // Fetch full filter options once on mount (no query params for full list)
  useEffect(() => {
    const fetchFullFilterOptions = async () => {
      try {
        const response = await axios.get(`${baseurl}/filter`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("employerToken")}`,
          },
        });
        setFilterOptions(response.data.filters);
      } catch (err) {
        console.error("Error fetching full filter options:", err);
      }
    };

    fetchFullFilterOptions();
  }, []);

  const fetchCandidates = async (page = 1, perPage = pagination.per_page) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        ...Object.fromEntries(
          Object.entries(filters).filter(([key, value]) => {
            if (Array.isArray(value)) return value.length > 0;
            if (key === "has_resume" || key === "show_number_revealed_period")
              return true;
            return value !== "" && value !== false && value !== null;
          })
        ),
        page,
        per_page: perPage,
        has_resume: filters.has_resume ? "1" : "0",
        ...(filters.experience_type.length > 0 && {
          experience_type: filters.experience_type.join(","),
        }),
        ...(filters.shift_preference.length > 0 && {
          shift_preference: filters.shift_preference.join(","),
        }),
        ...(filters.degree.length > 0 && { degree: filters.degree.join(",") }),
        ...(filters.specialization.length > 0 && {
          specialization: filters.specialization.join(","),
        }),
        ...(filters.language.length > 0 && {
          language: filters.language.join(","),
        }),
        ...(filters.department.length > 0 && {
          department: filters.department.join(","),
        }), // Added department
        ...(filters.city.length > 0 && { city: filters.city.join(",") }),
        ...(filters.show_number_revealed_period &&
          filters.number_revealed_period && {
            number_revealed: filters.number_revealed_period,
          }),
        ...(!filters.show_number_revealed_period &&
          filters.number_revealed && {
            number_revealed: filters.number_revealed,
          }),
      }).toString();

      console.log("queryParams:", queryParams);
      const response = await axios.get(`${baseurl}/filter?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("employerToken")}`,
        },
      });
      const {
        data,
        filters: filtersOptions,
        pagination: responsePagination,
      } = response.data;
      setCandidates(data);
      // Do not update filterOptions here to keep full options always
      setPagination({ ...responsePagination, per_page: perPage });
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError(
        err.response?.data?.messages ||
          "An error occurred while fetching candidates."
      );
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "has_resume") {
      setFilters((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "checkbox" && name === "experience_type") {
      setFilters((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v) => v !== value),
      }));
    } else if (type === "checkbox" && name === "show_number_revealed_period") {
      setFilters((prev) => ({
        ...prev,
        [name]: checked,
        number_revealed: checked ? "" : prev.number_revealed,
        number_revealed_period: checked ? prev.number_revealed_period : "",
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (selectedValues, field) => {
    setFilters((prev) => ({
    ...prev,
    [field]: selectedValues,
    ...(field === "degree" && { active: "" }), // Reset active filter when degree is changed
  }));
};
  const revealNumber = (candidateId) => {
    axios
      .post(
        `${baseurl}/reveal-number`,
        { candidate_id: candidateId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("employerToken")}`,
          },
        }
      )
      .then((response) => {
        setCandidates(
          candidates.map((candidate) =>
            candidate.id === candidateId
              ? { ...candidate, number: response.data.number }
              : candidate
          )
        );
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response?.data?.error || "Error revealing number");
      });
  };
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        if (key === "has_resume" || key === "show_number_revealed_period")
          return value === true;
        return value !== "" && value !== false && value !== null;
      })
    );

    const urlParams = {
      keywords: cleanedFilters.must_have_keywords || "",
      locations: cleanedFilters.city?.join(",") || "",
      minExperience: cleanedFilters.min_experience || "",
      maxExperience: cleanedFilters.max_experience || "",
      minSalary: cleanedFilters.min_salary || "",
      maxSalary: cleanedFilters.max_salary || "",
      education: cleanedFilters.degree?.join(",") || "",
      specialization: cleanedFilters.specialization?.join(",") || "",
      language: cleanedFilters.language?.join(",") || "",
      department: cleanedFilters.department?.join(",") || "", // Added department
      active: cleanedFilters.active || "",
      experienceType:
        cleanedFilters.experience_type?.length > 0
          ? cleanedFilters.experience_type.join(",")
          : "any",
      number_revealed: cleanedFilters.show_number_revealed_period
        ? cleanedFilters.number_revealed_period
        : cleanedFilters.number_revealed || "",
      shift_preference: cleanedFilters.shift_preference?.join(",") || "",
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
    <div className="flex min-h-screen  bg-gradient-to-br from-blue-50 to-gray-100 ">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="flex flex-col  lg:flex-row gap-6 lg:gap-4 max-w-[80rem] mx-auto w-full">
          <div className="sticky w-[30%] top-4">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaUser className="mr-2 text-[#02325a]" /> Filter Candidates
              </h2>

              <form className="space-y-6" onSubmit={handleFilterSubmit}>
                <div>
                  <label className="flex items-center text-md font-semibold text-gray-800">
                    <input
                      type="checkbox"
                      name="has_resume"
                      checked={filters.has_resume}
                      onChange={handleFilterChange}
                      className="mr-3 h-6 w-6 text-[#02325a] border-2 text-md border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 cursor-pointer transition-transform duration-200 hover:scale-110"
                    />
                    <FaFileAlt className="mr-2 text-[#02325a] text-lg" />{" "}
                    Candidates with Resume
                  </label>
                </div>
                <div>
                  <label className="flex items-center text-md font-semibold text-gray-800">
                    <input
                      type="checkbox"
                      name="show_number_revealed_period"
                      checked={filters.show_number_revealed_period}
                      onChange={handleFilterChange}
                      className="mr-3 h-6 w-6 text-[#02325a] border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 cursor-pointer transition-transform duration-200 hover:scale-110"
                    />
                    <FaPhone className="mr-2 text-[#02325a] text-lg" /> Filter
                    by Number Revealed 
                  </label>
                  {filters.show_number_revealed_period && (
                    <select
                      name="number_revealed_period"
                      value={filters.number_revealed_period}
                      onChange={handleFilterChange}
                      className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50 text-gray-700"
                    >
                      <option value="">Select Period</option>
                      <option value="last-15-days">Last 15 Days</option>
                      <option value="last-30-days">Last 30 Days</option>
                      <option value="last-90-days">Last 90 Days</option>
                    </select>
                  )}
                  {!filters.show_number_revealed_period && (
                    <select
                      name="number_revealed"
                      value={filters.number_revealed}
                      onChange={handleFilterChange}
                      className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-white/50 text-gray-700"
                    >
                      <option value="">Select Status</option>
                      <option value="1">Already Unlocked</option>
                      <option value="0">Not Unlocked</option>
                    </select>
                  )}
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
                      <option value="" disabled>
                        Select Min Age
                      </option>
                      {ageRange
                        .filter(
                          (age) => !filters.max_age || age <= filters.max_age
                        )
                        .map((age) => (
                          <option key={age} value={age}>
                            {age}
                          </option>
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
                      <option value="" disabled>
                        Select Max Age
                      </option>
                      {ageRange
                        .filter(
                          (age) => !filters.min_age || age >= filters.min_age
                        )
                        .map((age) => (
                          <option key={age} value={age}>
                            {age}
                          </option>
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
                    <FaGraduationCap className="mr-2 text-[#02325a]" /> Degrees
                  </label>
                  <MultiSelectCheckbox
                    name="degree"
                    options={
                      filterOptions?.degrees?.map((option) => ({
                        value: option.value,
                        label: option.value,
                        count: option.count,
                      })) || []
                    }
                    value={filters.degree}
                    onChange={(values) => handleSelectChange(values, "degree")}
                    placeholder="Select Degrees..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaGraduationCap className="mr-2 text-[#02325a]" />{" "}
                    Specializations
                  </label>
                  <MultiSelectCheckbox
                    name="specialization"
                    options={
                      filterOptions?.specializations?.map((option) => ({
                        value: option.value,
                        label: option.value,
                        count: option.count,
                      })) || []
                    }
                    value={filters.specialization}
                    onChange={(values) =>
                      handleSelectChange(values, "specialization")
                    }
                    placeholder="Select Specializations..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaLanguage className="mr-2 text-[#02325a]" /> Languages
                  </label>
                  <MultiSelectCheckbox
                    name="language"
                    options={
                      filterOptions?.languages?.map((option) => ({
                        value: option.value,
                        label: option.value,
                        count: option.count,
                      })) || []
                    }
                    value={filters.language}
                    onChange={(values) =>
                      handleSelectChange(values, "language")
                    }
                    placeholder="Select Languages..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaBriefcase className="mr-2 text-[#02325a]" /> Department
                  </label>
                  <MultiSelectCheckbox
                    name="department"
                    options={
                      filterOptions?.departments?.map((option) => ({
                        value: option.value,
                        label: option.value,
                        count: option.count,
                      })) || []
                    }
                    value={filters.department}
                    onChange={(values) =>
                      handleSelectChange(values, "department")
                    }
                    placeholder="Select Departments..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaCity className="mr-2 text-[#02325a]" /> Cities
                  </label>
                  <MultiSelectCheckbox
                    name="city"
                    options={
                      filterOptions?.cities?.map((option) => ({
                        value: option.value,
                        label: option.value,
                        count: option.count,
                      })) || []
                    }
                    value={filters.city}
                    onChange={(values) => handleSelectChange(values, "city")}
                    placeholder="Select Cities..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FaClock className="mr-2 text-[#02325a]" /> Shift Preference
                  </label>
                  <select
                    name="shift_preference"
                    value={filters.shift_preference?.[0] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFilters((prev) => ({
                        ...prev,
                        shift_preference: value ? [value] : [],
                      }));
                    }}
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

                <button
                  type="submit"
                  className="w-full bg-[#02325a] text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </div>
          <div className="w-[70%]">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Candidate Profiles
                </h2>
                <button
                  onClick={handleBack}
                  className="py-2 px-4 bg-gray-600 text-white rounded-lg text-sm sm:text-base hover:bg-gray-700 transition-colors"
                >
                  Modify Search
                </button>
              </div>
              {!loading && candidates.length > 0 && (
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <button
                    onClick={() =>
                      handlePageChange(pagination.current_page - 1)
                    }
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
                    onClick={() =>
                      handlePageChange(pagination.current_page + 1)
                    }
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
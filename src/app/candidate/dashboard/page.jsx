"use client";
import { baseurl } from "@/app/components/common";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaBirthdayCake,
  FaPhone,
  FaGraduationCap,
  FaUniversity,
  FaBriefcase,
  FaBuilding,
  FaClock,
  FaSun,
  FaMoon,
  FaHome,
  FaLaptop,
  FaLanguage,
  FaCode,
  FaLock,
  FaEdit,
  FaChartLine,
  FaUserTie,
  FaRegStar,
  FaStar,
  FaTimes,
  FaImage,
  FaFilePdf,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaIndustry,
  FaDollarSign,
  FaExclamationTriangle,
} from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { FiSettings, FiEdit2, FiSave, FiX } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import CVGeneration from "../CVgenerationcandidate/CVGeneration";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    full_name: "",
    dob: "",
    gender: "",
    number: "",
    email: "",
    address: "",
    city: "",
    state: "",
    degree: "",
    specialization: "",
    college_name: "",
    education_level: "",
    highest_education: "",
    currently_pursuing: "",
    passing_marks: "",
    experience_years: "",
    experience_months: "",
    experience_level: "",
    is_working: "",
    notice_period: "",
    job_title: "",
    job_roles: [],
    preferred_job_titles: [],
    company_name: "",
    current_salary: "",
    prefers_night_shift: false,
    prefers_day_shift: true,
    work_from_home: false,
    work_from_office: true,
    field_job: false,
    preferred_language: "",
    skills: [],
    password: "",
    profile_pic: "",
    resume: "",
    english_level: "",
    preferred_locations: "",
    preferred_languages: [],
    educations: [],
  });
  const [tempData, setTempData] = useState(userData);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [fileErrors, setFileErrors] = useState({ profilePic: "", resume: "" });
  const [ViewModel, setViewModel] = useState(false);
  const [CvBuilder, setCvBuilder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newJobRole, setNewJobRole] = useState("");
  const [newPreferredJobTitle, setNewPreferredJobTitle] = useState("");
  const [newPreferredLanguage, setNewPreferredLanguage] = useState("");
  const [error, setError] = useState("");
  const [alldata, setAlldata] = useState({}); // Add this state for education data
  const storageLink = 'http://localhost:8000/storage';

  // File validation constraints
  const MAX_PROFILE_PIC_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
  const ALLOWED_RESUME_TYPES = ['application/pdf'];

  const validateFile = (file, type) => {
    if (!file) return true;
    if (type === 'profilePic') {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setFileErrors(prev => ({ ...prev, profilePic: "Only JPG, JPEG, or PNG files are allowed" }));
        return false;
      }
      if (file.size > MAX_PROFILE_PIC_SIZE) {
        setFileErrors(prev => ({ ...prev, profilePic: "Profile picture must be less than 2MB" }));
        return false;
      }
    } else if (type === 'resume') {
      if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
        setFileErrors(prev => ({ ...prev, resume: "Only PDF files are allowed" }));
        return false;
      }
      if (file.size > MAX_RESUME_SIZE) {
        setFileErrors(prev => ({ ...prev, resume: "Resume must be less than 5MB" }));
        return false;
      }
    }
    return true;
  };


  const formatSalary = (salary) => {
    if (!salary) return "Not provided";
    return `₹${parseFloat(salary).toLocaleString('en-IN')}/month`;
  };

  const fetchData = async (token) => {
    if (!token) {
      router.push("/");
    } else {
      try {
        setLoading(true);
        const response = await axios.get(`${baseurl}/candidateprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = {
          ...response.data.data, // Note: Your API returns data in a data object
          job_roles: typeof response.data.data.job_roles === 'string'
            ? JSON.parse(response.data.data.job_roles || '[]')
            : response.data.data.job_roles || [],
          skills: typeof response.data.data.skills === 'string'
            ? JSON.parse(response.data.data.skills || '[]')
            : response.data.data.skills || [],
          preferred_languages: typeof response.data.data.preferred_languages === 'string'
            ? JSON.parse(response.data.data.preferred_languages || '[]')
            : response.data.data.preferred_languages || [],
          preferred_job_titles: typeof response.data.data.preferred_job_titles === 'string'
            ? JSON.parse(response.data.data.preferred_job_titles || '[]')
            : response.data.data.preferred_job_titles || [],
        };
        
        // Handle education data
        const educationData = {};
        if (data.educations && data.educations.length > 0) {
          data.educations.forEach(edu => {
            if (edu.education_type === 'graduation') {
              educationData.graduation = {
                education_level: edu.education_level,
                specialization: edu.specialization,
                college_name: edu.college_name,
                complete_years: edu.complete_years,
                complete_month: edu.complete_month,
              };
            } else if (edu.education_type === 'post_graduation') {
              educationData.postGraduation = {
                education_level: edu.education_level,
                specialization: edu.specialization,
                college_name: edu.college_name,
                complete_years: edu.complete_years,
                complete_month: edu.complete_month,
              };
            }
          });
        }
        setAlldata(educationData);
        
        console.log("Fetched user data:", data);
        setUserData(data);
        setTempData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("port_tok");
    fetchData(token);
  }, []);

  useEffect(() => {
    if (profilePicFile) {
      if (validateFile(profilePicFile, 'profilePic')) {
        const objectUrl = URL.createObjectURL(profilePicFile);
        setProfilePicPreview(objectUrl);
        setFileErrors(prev => ({ ...prev, profilePic: "" }));
        return () => URL.revokeObjectURL(objectUrl);
      } else {
        setProfilePicFile(null);
        setProfilePicPreview("");
      }
    }
  }, [profilePicFile]);

const formatDate = (dateString) => {
  if (!dateString) return "Not provided";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();

  // Add ordinal suffix
  const ordinalSuffix = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${ordinalSuffix(day)} ${month}, ${year}`;
};
  useEffect(() => {
    if (resumeFile && !validateFile(resumeFile, 'resume')) {
      setResumeFile(null);
      setFileErrors(prev => ({ ...prev, resume: fileErrors.resume }));
    } else {
      setFileErrors(prev => ({ ...prev, resume: "" }));
    }
  }, [resumeFile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const handleCheckboxChange = (field) => {
    setTempData({ ...tempData, [field]: !tempData[field] });
  };

  const addSkill = () => {
    if (newSkill.trim() && tempData.skills.length < 10) {
      setTempData({
        ...tempData,
        skills: [...tempData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...tempData.skills];
    updatedSkills.splice(index, 1);
    setTempData({ ...tempData, skills: updatedSkills });
  };

  const addJobRole = () => {
    if (newJobRole.trim() && tempData.job_roles.length < 10) {
      setTempData({
        ...tempData,
        job_roles: [...tempData.job_roles, newJobRole.trim()],
      });
      setNewJobRole("");
    }
  };

  const removeJobRole = (index) => {
    const updatedJobRoles = [...tempData.job_roles];
    updatedJobRoles.splice(index, 1);
    setTempData({ ...tempData, job_roles: updatedJobRoles });
  };

  const addPreferredJobTitle = () => {
    if (newPreferredJobTitle.trim() && tempData.preferred_job_titles.length < 5) {
      setTempData({
        ...tempData,
        preferred_job_titles: [...tempData.preferred_job_titles, newPreferredJobTitle.trim()],
      });
      setNewPreferredJobTitle("");
    }
  };

  const removePreferredJobTitle = (index) => {
    const updatedTitles = [...tempData.preferred_job_titles];
    updatedTitles.splice(index, 1);
    setTempData({ ...tempData, preferred_job_titles: updatedTitles });
  };

  const addPreferredLanguage = () => {
    if (newPreferredLanguage.trim() && tempData.preferred_languages.length < 5) {
      setTempData({
        ...tempData,
        preferred_languages: [...tempData.preferred_languages, newPreferredLanguage.trim()],
      });
      setNewPreferredLanguage("");
    }
  };

  const removePreferredLanguage = (index) => {
    const updatedLanguages = [...tempData.preferred_languages];
    updatedLanguages.splice(index, 1);
    setTempData({ ...tempData, preferred_languages: updatedLanguages });
  };

  const saveChanges = async () => {
    if (fileErrors.profilePic || fileErrors.resume) {
      setError("Please fix file upload errors before saving.");
      return;
    }
    try {
      const token = localStorage.getItem("port_tok");
      const formData = new FormData();
      
      // Add basic fields
      for (const key in tempData) {
        if (['skills', 'job_roles', 'preferred_job_titles', 'preferred_languages'].includes(key)) {
          formData.append(key, JSON.stringify(tempData[key]));
        } else if (tempData[key] !== null && tempData[key] !== undefined) {
          formData.append(key, tempData[key]);
        }
      }

      // Add education data
      Object.entries(alldata).forEach(([key, value]) => {
        if (key === "graduation" || key === "postGraduation") {
          Object.entries(value).forEach(([subKey, subVal]) => {
            formData.append(`${key}.${subKey}`, subVal ?? "");
          });
        } else if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, v));
        } else {
          formData.append(key, value ?? "");
        }
      });

      if (profilePicFile) {
        formData.append('profile_pic', profilePicFile);
      }
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }
     
      const response = await axios.post(
        `${baseurl}/updatecandidate/${token}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        fetchData(token);
        setEditMode(false);
        setError("");
        setProfilePicFile(null);
        setResumeFile(null);
        setProfilePicPreview("");
      } else {
        setError(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setError(error.response?.data?.message || "An error occurred while updating your profile.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUserTie className="mr-2 text-[#02325a]" /> Candidate Portal
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <IoMdNotificationsOutline size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <FiSettings size={20} />
            </button>
            <div className="flex items-center">
              {userData.profile_pic ? (
                <img
                  src={`${storageLink}/${userData.profile_pic}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  {userData.full_name ? userData.full_name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {userData.full_name || "Candidate"}!
            </h2>
            <p className="opacity-90">
              Here's your complete profile overview
            </p>
          </div>
          {editMode ? (
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                onClick={saveChanges}
                className="bg-white text-[#02325a] hover:bg-blue-50 px-4 py-2 rounded-lg font-medium flex items-center"
              >
                <FiSave className="mr-2" /> Save Changes
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setTempData(userData);
                  setProfilePicFile(null);
                  setResumeFile(null);
                  setProfilePicPreview("");
                  setFileErrors({ profilePic: "", resume: "" });
                }}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium flex items-center"
              >
                <FiX className="mr-2" /> Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 md:mt-0 bg-white text-[#02325a] hover:bg-blue-50 px-4 py-2 rounded-lg font-medium flex items-center"
            >
              <FiEdit2 className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 font-medium text-sm flex items-center ${
              activeTab === "profile"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaUser className="mr-2" /> Profile
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 font-medium text-sm flex items-center ${
              activeTab === "stats"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaChartLine className="mr-2" /> Statistics
          </button>
          <button
            onClick={() => setActiveTab("CV-Builder")}
            className={`px-4 py-2 font-medium text-sm flex items-center ${
              activeTab === "CV-Builder"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <IoIosDocument className="mr-2" /> Build Your CV
          </button>
        </div>
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <DashboardCard
                title="Personal Information"
                icon={<FaUser className="text-blue-500" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    editMode={editMode}
                    icon={<FaUser />}
                    label="Full Name"
                    name="full_name"
                    value={editMode ? tempData.full_name : userData.full_name}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaBirthdayCake />}
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={editMode ? tempData.dob : formatDate(userData.dob)}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaUser />}
                    label="Gender"
                    name="gender"
                    value={editMode ? tempData.gender : userData.gender}
                    onChange={handleInputChange}
                    selectOptions={["Male", "Female", "Other"]}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaPhone />}
                    label="Phone Number"
                    name="number"
                    type="tel"
                    value={editMode ? tempData.number : userData.number}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaEnvelope />}
                    label="Email"
                    name="email"
                    type="email"
                    value={editMode ? tempData.email : userData.email}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaMapMarkerAlt />}
                    label="City"
                    name="city"
                    value={editMode ? tempData.city : userData.city}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaMapMarkerAlt />}
                    label="State"
                    name="state"
                    value={editMode ? tempData.state : userData.state}
                    onChange={handleInputChange}
                  />
                  <div className="col-span-2">
                    <div className="flex items-center mb-1">
                      <FaImage className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Profile Picture</span>
                    </div>
                    {editMode ? (
                      <div>
                        {profilePicPreview || userData.profile_pic ? (
                          <img
                            src={profilePicPreview || `${storageLink}/${userData.profile_pic}`}
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full object-cover mb-2"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                            No Image
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={(e) => setProfilePicFile(e.target.files[0])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        {fileErrors.profilePic && (
                          <p className="text-red-500 text-sm mt-1">{fileErrors.profilePic}</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        {userData.profile_pic ? (
                          <img
                            src={`${storageLink}/${userData.profile_pic}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                          />
                        ) : (
                          <p className="text-gray-800 font-semibold">Not provided</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Education"
                icon={<FaGraduationCap className="text-blue-500" />}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EditableField
                      editMode={editMode}
                      icon={<FaGraduationCap />}
                      label="Highest Education"
                      name="highest_education"
                      value={editMode ? tempData.highest_education : userData.highest_education}
                      onChange={handleInputChange}
                    />
                    <EditableField
                      editMode={editMode}
                      icon={<FaLanguage />}
                      label="English Level"
                      name="english_level"
                      value={editMode ? tempData.english_level : userData.english_level}
                      onChange={handleInputChange}
                      selectOptions={["Beginner", "Intermediate", "Advanced", "Fluent"]}
                    />
                  </div>
                  
                  {/* Graduation Education */}
                  {alldata.graduation && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaGraduationCap className="mr-2" />
                        Graduation Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Degree:</span>
                          <p className="font-medium">{alldata.graduation.education_level || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Specialization:</span>
                          <p className="font-medium">{alldata.graduation.specialization || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">College:</span>
                          <p className="font-medium">{alldata.graduation.college_name || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Completion:</span>
                          <p className="font-medium">
                            {alldata.graduation.complete_month} {alldata.graduation.complete_years || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Post Graduation Education */}
                  {alldata.postGraduation && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaGraduationCap className="mr-2" />
                        Post Graduation Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Degree:</span>
                          <p className="font-medium">{alldata.postGraduation.education_level || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Specialization:</span>
                          <p className="font-medium">{alldata.postGraduation.specialization || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">College:</span>
                          <p className="font-medium">{alldata.postGraduation.college_name || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Completion:</span>
                          <p className="font-medium">
                            {alldata.postGraduation.complete_month} {alldata.postGraduation.complete_years || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DashboardCard>

              <DashboardCard
                title="Work Experience"
                icon={<FaBriefcase className="text-blue-500" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    editMode={editMode}
                    icon={<FaClock />}
                    label="Experience Level"
                    name="experience_level"
                    value={editMode ? tempData.experience_level : userData.experience_level}
                    onChange={handleInputChange}
                    selectOptions={["Fresh", "Experienced", "Senior"]}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaClock />}
                    label="Total Experience (Years)"
                    name="experience_years"
                    type="number"
                    value={editMode ? tempData.experience_years : userData.experience_years}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaClock />}
                    label="Experience (Months)"
                    name="experience_months"
                    type="number"
                    value={editMode ? tempData.experience_months : userData.experience_months}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaBriefcase />}
                    label="Current Job Title"
                    name="job_title"
                    value={editMode ? tempData.job_title : userData.job_title}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaBuilding />}
                    label="Current Company"
                    name="company_name"
                    value={editMode ? tempData.company_name : userData.company_name}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaDollarSign />}
                    label="Current Salary"
                    name="current_salary"
                    type="number"
                    value={editMode ? tempData.current_salary : userData.current_salary}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaCalendarAlt />}
                    label="Notice Period"
                    name="notice_period"
                    value={editMode ? tempData.notice_period : userData.notice_period}
                    onChange={handleInputChange}
                  />
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-2">
                      <FaBriefcase className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Current Job Roles</span>
                      {editMode && (
                        <span className="text-xs text-gray-500 ml-auto">
                          {tempData.job_roles.length}/10
                        </span>
                      )}
                    </div>
                    {editMode ? (
                      <div>
                        <div className="flex mb-2">
                          <input
                            type="text"
                            value={newJobRole}
                            onChange={(e) => setNewJobRole(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addJobRole()}
                            placeholder="Add job role and press Enter"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            onClick={addJobRole}
                            disabled={!newJobRole.trim() || tempData.job_roles.length >= 10}
                            className="bg-blue-500 text-white px-3 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-gray-300"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tempData.job_roles.map((role, index) => (
                            <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                              {role}
                              <button
                                onClick={() => removeJobRole(index)}
                                className="ml-1 text-[#02325a] hover:text-blue-800"
                              >
                                <FaTimes size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {userData.job_roles.length > 0 ? (
                          userData.job_roles.map((role, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {role}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No job roles added</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-2">
                      <FaBriefcase className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Preferred Job Titles</span>
                      {editMode && (
                        <span className="text-xs text-gray-500 ml-auto">
                          {tempData.preferred_job_titles.length}/5
                        </span>
                      )}
                    </div>
                    {editMode ? (
                      <div>
                        <div className="flex mb-2">
                          <input
                            type="text"
                            value={newPreferredJobTitle}
                            onChange={(e) => setNewPreferredJobTitle(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addPreferredJobTitle()}
                            placeholder="Add preferred job title"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            onClick={addPreferredJobTitle}
                            disabled={!newPreferredJobTitle.trim() || tempData.preferred_job_titles.length >= 5}
                            className="bg-green-500 text-white px-3 py-2 rounded-r-lg hover:bg-green-600 disabled:bg-gray-300"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tempData.preferred_job_titles.map((title, index) => (
                            <div key={index} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                              {title}
                              <button
                                onClick={() => removePreferredJobTitle(index)}
                                className="ml-1 text-green-800 hover:text-red-500"
                              >
                                <FaTimes size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {userData.preferred_job_titles.length > 0 ? (
                          userData.preferred_job_titles.map((title, index) => (
                            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              {title}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No preferred job titles</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-1">
                      <FaFilePdf className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Resume</span>
                    </div>
                    {editMode ? (
                      <div>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => setResumeFile(e.target.files[0])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        {fileErrors.resume && (
                          <p className="text-red-500 text-sm mt-1">{fileErrors.resume}</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        {userData.resume ? (
                          <div className="flex items-center gap-4">
                            <p className="text-gray-800 font-semibold">{userData.resume}</p>
                            <button
                              onClick={() => setViewModel(true)}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
                            >
                              Preview Resume
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-800 font-semibold">Not provided</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </DashboardCard>
            </div>
            <div className="space-y-6">
              <DashboardCard
                title="Preferences"
                icon={<FaRegStar className="text-blue-500" />}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaSun className="text-yellow-500 mr-3" />
                      <span>Day Shift</span>
                    </div>
                    {editMode ? (
                      <input
                        type="checkbox"
                        checked={tempData.prefers_day_shift}
                        onChange={() => handleCheckboxChange("prefers_day_shift")}
                        className="h-5 w-5 text-blue-600 rounded"
                      />
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userData.prefers_day_shift
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {userData.prefers_day_shift ? "Yes" : "No"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaMoon className="text-indigo-500 mr-3" />
                      <span>Night Shift</span>
                    </div>
                    {editMode ? (
                      <input
                        type="checkbox"
                        checked={tempData.prefers_night_shift}
                        onChange={() => handleCheckboxChange("prefers_night_shift")}
                        className="h-5 w-5 text-blue-600 rounded"
                      />
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userData.prefers_night_shift
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {userData.prefers_night_shift ? "Yes" : "No"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaHome className="text-[#02325a] mr-3" />
                      <span>Work From Home</span>
                    </div>
                    {editMode ? (
                      <input
                        type="checkbox"
                        checked={tempData.work_from_home}
                        onChange={() => handleCheckboxChange("work_from_home")}
                        className="h-5 w-5 text-[#02325a] rounded"
                      />
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userData.work_from_home
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {userData.work_from_home ? "Yes" : "No"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaBuilding className="text-gray-500 mr-3" />
                      <span>Work From Office</span>
                    </div>
                    {editMode ? (
                      <input
                        type="checkbox"
                        checked={tempData.work_from_office}
                        onChange={() => handleCheckboxChange("work_from_office")}
                        className="h-5 w-5 text-blue-600 rounded"
                      />
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userData.work_from_office
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {userData.work_from_office ? "Yes" : "No"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaBriefcase className="text-orange-500 mr-3" />
                      <span>Field Job</span>
                    </div>
                    {editMode ? (
                      <input
                        type="checkbox"
                        checked={tempData.field_job}
                        onChange={() => handleCheckboxChange("field_job")}
                        className="h-5 w-5 text-[#02325a] rounded"
                      />
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userData.field_job
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {userData.field_job ? "Yes" : "No"}
                      </span>
                    )}
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Skills & Languages"
                icon={<FaCode className="text-blue-500" />}
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <FaCode className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Technical Skills</span>
                      {editMode && (
                        <span className="text-xs text-gray-500 ml-auto">
                          {tempData.skills.length}/10
                        </span>
                      )}
                    </div>
                    {editMode ? (
                      <div>
                        <div className="flex mb-2">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addSkill()}
                            placeholder="Add skill and press Enter"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            onClick={addSkill}
                            disabled={!newSkill.trim() || tempData.skills.length >= 10}
                            className="bg-blue-500 text-white px-3 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-gray-300"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tempData.skills.map((skill, index) => (
                            <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                              {skill}
                              <button
                                onClick={() => removeSkill(index)}
                                className="ml-1 text-[#02325a] hover:text-blue-800"
                              >
                                <FaTimes size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {userData?.skills?.length > 0 ? (
                          userData?.skills?.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No skills added</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <FaLanguage className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Preferred Languages</span>
                      {editMode && (
                        <span className="text-xs text-gray-500 ml-auto">
                          {tempData.preferred_languages.length}/5
                        </span>
                      )}
                    </div>
                    {editMode ? (
                      <div>
                        <div className="flex mb-2">
                          <input
                            type="text"
                            value={newPreferredLanguage}
                            onChange={(e) => setNewPreferredLanguage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addPreferredLanguage()}
                            placeholder="Add language"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            onClick={addPreferredLanguage}
                            disabled={!newPreferredLanguage.trim() || tempData?.preferred_languages?.length >= 5}
                            className="bg-purple-500 text-white px-3 py-2 rounded-r-lg hover:bg-purple-600 disabled:bg-gray-300"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">

                          {/* {tempData?.preferred_languages?.map((lang, index) => (
                            <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                              {lang}
                              <button
                                onClick={() => removePreferredLanguage(index)}
                                className="ml-1 text-purple-800 hover:text-red-500"
                              >
                                <FaTimes size={12} />
                              </button>
                            </div>
                          ))} */}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        
                        {/* {userData?.preferred_languages?.length > 0 ? (
                          userData?.preferred_languages?.map((lang, index) => (
                            <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                              {lang}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No languages added</span>
                        )} */}
                      </div>
                    )}

                    {/* {console.log("Preferred Languages:", userData?.preferred_languages)} */}
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Account Information"
                icon={<FaLock className="text-blue-500" />}
              >
                <div className="space-y-2">
                  <EditableField
                    editMode={editMode}
                    icon={<FaLock />}
                    label="Password"
                    name="password"
                    type="password"
                    value={editMode ? tempData.password : "••••••••"}
                    onChange={handleInputChange}
                  />
                  <div>
                    <span className="text-gray-500 flex items-center mb-1">
                      <FaExclamationTriangle className="mr-2" />
                      <span className="text-sm font-medium">Profile Status</span>
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      userData.doneprofile 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {userData.doneprofile ? "Profile Complete" : "Profile Incomplete"}
                    </span>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </div>
        )}
        {activeTab === "stats" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Your Profile Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Profile Completion"
                value={`${calculateCompletion(userData)}%`}
                icon={<FaUser className="text-blue-500" />}
                progress={calculateCompletion(userData)}
              />
              <StatCard
                title="Profile Strength"
                value={calculateStrength(userData)}
                icon={<FaStar className="text-yellow-500" />}
                progress={calculateStrengthScore(userData)}
              />
              <StatCard
                title="Jobs Applied"
                value={userData.total_jobs_applied || 0}
                icon={<FaBriefcase className="text-green-500" />}
              />
            </div>
          </div>
        )}
        {activeTab === "CV-Builder" && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            {userData?.resume ? (
              <>
                {!CvBuilder && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setViewModel(true)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
                    >
                      View Your CV
                    </button>
                    <button
                      onClick={() => setCvBuilder(true)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
                    >
                      Build Your CV
                    </button>
                  </div>
                )}
                {CvBuilder && (
                  <div className="relative">
                    <button
                      onClick={() => setCvBuilder(false)}
                      className="absolute right-4 top-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition mb-4 float-right"
                    >
                      Close CV Builder
                    </button>
                    <CVGeneration />
                  </div>
                )}
              </>
            ) : (
              <CVGeneration />
            )}
          </div>
        )}
      </main>
      {ViewModel && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-[rgba(0,0,0,0.75)] px-4">
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setViewModel(false)}
              className="absolute top-[14px] right-2 text-gray-600 hover:text-red-500 text-xl font-bold z-10"
            >
              X
            </button>
            <div className="w-full h-[90vh]">
              <iframe
                src={`${storageLink}/${userData?.resume}`}
                width="100%"
                height="100%"
                className="rounded-b-lg"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper components
const DashboardCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="border-b border-gray-200 px-6 py-4 flex items-center">
      <div className="mr-3">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const EditableField = ({
  editMode,
  icon,
  label,
  name,
  value,
  onChange,
  type = "text",
  selectOptions,
}) => {
  return (
    <div>
      <div className="flex items-center mb-1">
        <span className="text-gray-500 mr-2">{icon}</span>
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
      {editMode ? (
        selectOptions ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select {label.toLowerCase()}</option>
            {selectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        )
      ) : (
        <p className="text-gray-800 font-semibold">{value || "Not provided"}</p>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, progress }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs">
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-900 mb-3">{value}</p>
    {progress && (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#02325a] h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )}
  </div>
);

// Helper functions
const calculateCompletion = (data) => {
  const fields = [
    data?.full_name,
    data?.dob,
    data?.gender,
    data?.number,
    data?.email,
    data?.city,
    data?.state,
    data?.highest_education,
    data?.experience_level,
    data?.job_title,
    data?.company_name,
    data?.current_salary,
    data?.job_roles?.length > 0,
    data?.skills?.length > 0,
    data?.preferred_job_titles?.length > 0,
    data?.profile_pic,
    data?.resume,
    alldata?.graduation,
    alldata?.postGraduation,
  ];
  const filledFields = fields.filter((field) => Boolean(field)).length;
  return Math.round((filledFields / fields.length) * 100);
};

const calculateStrength = (data) => {
  const score = calculateStrengthScore(data);
  if (score > 80) return "Excellent";
  if (score > 60) return "Good";
  if (score > 40) return "Basic";
  return "Weak";
};

const calculateStrengthScore = (data) => {
  let score = 0;
  if (data.full_name) score += 10;
  if (data.dob) score += 5;
  if (data.gender) score += 5;
  if (data.number) score += 10;
  if (data.email) score += 10;
  if (data.city || data.state) score += 5;
  if (data.highest_education) score += 10;
  if (data.experience_level) score += 10;
  if (data.job_title) score += 15;
  if (data.company_name) score += 15;
  if (data.current_salary) score += 10;
  if (data.job_roles?.length > 0) score += 15;
  if (data.skills?.length > 0) score += 20;
  if (data.preferred_job_titles?.length > 0) score += 10;
  if (data.profile_pic) score += 5;
  if (data.resume) score += 5;
  if (alldata?.graduation) score += 10;
  if (alldata?.postGraduation) score += 10;
  return Math.min(score, 100);
};

export default Dashboard;
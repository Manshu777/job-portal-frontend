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
    degree: "",
    college_name: "",
    passing_marks: "",
    experience_years: "",
    job_roles: [],
    job_title: "",
    experience_months: "",
    company_name: "",
    prefers_night_shift: false,
    prefers_day_shift: true,
    work_from_home: false,
    work_from_office: true,
    field_job: false,
    preferred_language: "",
    skills: [],
    password: "",
  });
  const [tempData, setTempData] = useState(userData); // Initialize with userData
  const [ViewModel, setViewModel] = useState(false);
  const [CvBuilder, setCvBuilder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newJobRole, setNewJobRole] = useState(""); // Added for job_roles input
  const [error, setError] = useState(""); // Added for error handling

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
        setUserData(response.data);
        setTempData(response.data);
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

  // const addJobRole = () => {
  //   if (newJobRole.trim() && tempData.job_roles.length < 10) {
  //     setTempData({
  //       ...tempData,
  //       job_roles: [...tempData.job_roles, newJobRole.trim()],
  //     });
  //     setNewJobRole("");
  //   }
  // };

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("port_tok");
      // Ensure job_roles and skills are sent as JSON strings
      const payload = {
        ...tempData,

        skills: JSON.stringify(tempData.skills),
      };
      const response = await axios.post(
        `${baseurl}/updatecandidate/${ton}`,
        payload
      );
      if (response.data.success) {
        setUserData(tempData);
        setEditMode(false);
        setError("");
      } else {
        setError(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setError("An error occurred while updating your profile.");
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
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {userData.full_name
                  ? userData.full_name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {}

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
                    onClick={() => setEditMode(false)}
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
          </div>
        )}

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
              activeTab === "CV-Builder" // Fixed condition
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
                    value={editMode ? tempData.dob : userData.dob}
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
                </div>
              </DashboardCard>

              <DashboardCard
                title="Education"
                icon={<FaGraduationCap className="text-blue-500" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    editMode={editMode}
                    icon={<FaGraduationCap />}
                    label="Degree"
                    name="degree"
                    value={editMode ? tempData.degree : userData.degree}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaUniversity />}
                    label="College Name"
                    name="college_name"
                    value={
                      editMode ? tempData.college_name : userData.college_name
                    }
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaGraduationCap />}
                    label="Passing Marks"
                    name="passing_marks"
                    type="number"
                    value={
                      editMode ? tempData.passing_marks : userData.passing_marks
                    }
                    onChange={handleInputChange}
                  />
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
                    label="Experience (Years)"
                    name="experience_years"
                    type="number"
                    value={
                      editMode
                        ? tempData.experience_years
                        : userData.experience_years
                    }
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaClock />}
                    label="Experience (Months)"
                    name="experience_months"
                    type="number"
                    value={
                      editMode
                        ? tempData.experience_months
                        : userData.experience_months
                    }
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaBriefcase />}
                    label="Job Title"
                    name="job_title"
                    value={editMode ? tempData.job_title : userData.job_title}
                    onChange={handleInputChange}
                  />
                  <EditableField
                    editMode={editMode}
                    icon={<FaBuilding />}
                    label="Company Name"
                    name="company_name"
                    value={
                      editMode ? tempData.company_name : userData.company_name
                    }
                    onChange={handleInputChange}
                  />
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-2">
                      <FaBriefcase className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">
                        Job Roles
                      </span>
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
                            disabled={
                              !newJobRole.trim() ||
                              tempData.job_roles.length >= 10
                            }
                            className="bg-blue-500 text-white px-3 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-gray-300"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {/* {tempData.job_roles.map((role, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                            >
                              {role}
                              <button
                                onClick={() => removeJobRole(index)}
                                className="ml-1 text-[#02325a] hover:text-blue-800"
                              >
                                <FaTimes size={12} />
                              </button>
                            </div>
                          ))} */}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {/* {userData.job_roles.length > 0 ? (
                          userData.job_roles.map((role, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                              {role}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">
                            No job roles added
                          </span>
                        )} */}
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
                        onChange={() =>
                          handleCheckboxChange("prefers_day_shift")
                        }
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
                        onChange={() =>
                          handleCheckboxChange("prefers_night_shift")
                        }
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
                        onChange={() =>
                          handleCheckboxChange("work_from_office")
                        }
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
                title="Skills & Language"
                icon={<FaCode className="text-blue-500" />}
              >
                <div className="space-y-4">
                  <EditableField
                    editMode={editMode}
                    icon={<FaLanguage />}
                    label="Preferred Language"
                    name="preferred_language"
                    value={
                      editMode
                        ? tempData.preferred_language
                        : userData.preferred_language
                    }
                    onChange={handleInputChange}
                  />
                  <div>
                    <div className="flex items-center mb-2">
                      <FaCode className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">
                        Skills
                      </span>
                      {editMode && (
                        <span className="text-xs text-gray-500 ml_INVALID_VALUE_in_value_for_column_candidates_job_roles_at_position_0_in_value_for_column_candidates_job_roles/auto">
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
                            disabled={
                              !newSkill.trim() || tempData.skills.length >= 10
                            }
                            className="bg-blue-500 text-white px-3 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-gray-300"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {/* {tempData.skills.map((skill, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                            >
                              {skill}
                              <button
                                onClick={() => removeSkill(index)}
                                className="ml-1 text-[#02325a] hover:text-blue-800"
                              >
                                <FaTimes size={12} />
                              </button>
                            </div>
                          ))} */}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {/* {userData.skills.length > 0 ? (
                          userData.skills.map((才, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No skills added</span>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Account Information"
                icon={<FaLock className="text-blue-500" />}
              >
                <EditableField
                  editMode={editMode}
                  icon={<FaLock />}
                  label="Password"
                  name="password"
                  type="password"
                  value={editMode ? tempData.password : "••••••••"}
                  onChange={handleInputChange}
                />
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
                title="Last Updated"
                value="Just now"
                icon={<FaEdit className="text-[#02325a]" />}
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
                src="http://127.0.0.1:8000/storage/pdf/qcUtUhAaO43fIzUhfnuWfMlhaQJUEYla5UCkLxa2.pdf"
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
    data.full_name,
    data.dob,
    data.gender,
    data.number,
    data.degree,
    data.college_name,
    data.job_title,
    data.company_name,
    data.job_roles.length > 0,
    data.skills.length > 0,
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
  if (data.degree) score += 10;
  if (data.college_name) score += 10;
  if (data.job_title) score += 15;
  if (data.company_name) score += 15;
  if (data.job_roles.length > 0) score += 15;
  if (data.skills.length > 0) score += 20;
  return Math.min(score, 100);
};

export default Dashboard;

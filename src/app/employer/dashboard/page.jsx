"use client";

import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import Sidebar from "../../components/Sidebar";
import { baseurl } from "@/app/components/common";
import { parseISO, addDays, isAfter,format } from "date-fns";
import axios from "axios";
import { HiDotsVertical,HiTrash } from "react-icons/hi";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2



import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'; // For dropdown menu, install @headlessui/react



const EmployerDashboard = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    skills: "",
    salaryRange: "",
    jobType: "full-time",
    location: "",
    deadline: "",
  });

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("employerToken");
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
        console.error("Not logged in or invalid token");
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  console.log("isLoggedI", isLoggedIn.id);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const employerId = isLoggedIn.id;
        console.log("isLogged", employerId);
        const response = await fetch(`${baseurl}/jobs/employer/${employerId}`);
        const result = await response.json();

        if (result.status === "success") {
          setJobs(result.data);
        } else {
          console.error("Failed to fetch jobs:", result.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [isLoggedIn.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    girl;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsJobModalOpen(false);
  };

  console.log("isLoggedIn.is_verified", isLoggedIn);

  // Check if employer is not verified
  if (
    isLoggedIn.is_verified === 0 ||
    isLoggedIn.is_verified === null ||
    isLoggedIn.is_blocked === 1
  ) {
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
              Your employer account is currently under review by our admin team.
              Once verified, you'll be able to post jobs and allow candidates to
              log in and apply. Please wait for admin approval or contact
              support for assistance.
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
              We typically review accounts within 24-48 hours. Thank you for
              your patience!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render the full dashboard if verified
  return (
    <div className="flex bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className=" mt-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Employer Dashboard
            </h1>
            <button
              onClick={() => router.push("/employer/post-job")}
              className="flex items-center px-4 py-2 bg-[#02325a] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" /> Post New Job
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Job Visits"
              value="12,456"
              change={12}
              isPositive={true}
            />
            <MetricCard
              title="Total Applications"
              value="1,234"
              change={-5}
              isPositive={false}
            />
            <MetricCard
              title="Active Jobs"
              value="45"
              change={8}
              isPositive={true}
            />
            <MetricCard
              title="Pending Reviews"
              value="28"
              change={0}
              isPositive={true}
            />
          </div>
        </div>

        <div className="mb-8 px-[2%] py-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Job Postings
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => <NewJobCard key={job.id} setJobs={setJobs} job={job} />)
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
        <div
          className={`flex items-center ${
            isPositive ? "text-[#02325a]" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <BiTrendingUp size={24} />
          ) : (
            <BiTrendingDown size={24} />
          )}
          <span className="ml-1">{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job }) => {
  let additionalRequirements = { skills: [] };
  try {
    if (
      job?.additional_requirements &&
      typeof job.additional_requirements === "string"
    ) {
      additionalRequirements = JSON.parse(job.additional_requirements);
    }
  } catch (error) {
    console.error("Error parsing additional_requirements:", error);
  }

  const createdAt = job?.created_at ? parseISO(job.created_at) : new Date();
  const deadline = addDays(createdAt, job?.job_expire_time || 14);
  const deadlineFormatted = deadline.toLocaleDateString();
  const isExpired = isAfter(new Date(), deadline);
  const status = isExpired ? "Expired" : "Active";
  const verify = job.is_verified ? "Active" : "Not Active";


    const postedDate = format(createdAt, 'd, MMMM yyyy'); // Updated to desired format

  const skills =
    typeof job?.additional_requirements === "string"
      ? JSON.parse(job.additional_requirements)
      : job?.additional_requirements || [];
  return (
    <div className="bg-white w-full mx-auto shadow-sm rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-5">
        {/* Header with Job Title, Status, and Menu */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {job?.job_title || "Untitled Job"}
          </h3>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                status === "Active"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
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
              <span className="font-medium">Location:</span>{" "}
              {job?.location || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Posted:</span> {postedDate}
            </p>

            {/* <p className="text-sm text-gray-600">
                     <span className="font-medium">Deadline:</span> {deadlineFormatted}
                   </p> */}
            <p className="text-sm text-gray-600">
              <span className="font-medium">Posted by:</span>{" "}
              {job?.employer?.name || "N/A"}
            </p>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Salary:</span>{" "}
              {job?.min_salary && job?.max_salary
                ? `₹${parseInt(job.min_salary).toLocaleString()} - ₹${parseInt(
                    job.max_salary
                  ).toLocaleString()}`
                : "N/A"}
            </p>
            {parseFloat(job?.incentive) >= 1 && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Incentive:</span> ₹
                {parseFloat(job.incentive).toLocaleString()}
              </p>
            )}
            <p className="text-sm text-gray-600">
              <span className="font-medium">Type:</span>{" "}
              {job?.job_type || "N/A"} • {job?.work_location_type || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Skills:</span>{" "}
              {skills.length > 0 ? skills.join(", ") : "None"}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Company:</span>{" "}
              {job?.company?.name || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewJobCard = ({ job, setJobs }) => {
  const createdAt = job?.created_at ? parseISO(job.created_at) : new Date();
  const deadline = addDays(createdAt, job?.job_expire_time || 14);
  const deadlineFormatted = deadline.toLocaleDateString();
  const isExpired = isAfter(new Date(), deadline);

  const postedDate = format(createdAt, 'd, MMMM yyyy'); // Updated to desired format
  const status = isExpired ? "Expired" : "Active";
  const router = useRouter(); // Ensure router is imported and available

  const handleRefreshJob = async () => {
    try {
      const token = localStorage.getItem("employerToken");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Authentication Required",
          text: "Please log in to refresh the job",
          confirmButtonColor: "#02325a",
        }).then(() => router.push("/employer/login"));
        return;
      }

      const response = await axios.put(
        `${baseurl}/jobs/${job.id}/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Job refreshed successfully",
          confirmButtonColor: "#02325a",
        });
        setJobs((prevJobs) =>
          prevJobs.map((j) =>
            j.id === job.id ? { ...j, created_at: response.data.data.created_at } : j
          )
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Failed to refresh job",
          confirmButtonColor: "#02325a",
        });
      }
    } catch (error) {
      console.error("Error refreshing job:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error refreshing job",
        confirmButtonColor: "#02325a",
      });
    }
  };

  const handleEditJob = () => {
    router.push(`/employer/edit-job/${job.id}`);
  };

  const handleDeleteJob = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: `Do you want to delete the job "${job.job_title}"? This action cannot be undone.`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#02325a",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("employerToken");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Authentication Required",
          text: "Please log in to delete the job",
          confirmButtonColor: "#02325a",
        }).then(() => router.push("/employer/login"));
        return;
      }

      const response = await axios.delete(`${baseurl}/jobs/${job.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Job deleted successfully",
          confirmButtonColor: "#02325a",
        });
        setJobs((prevJobs) => prevJobs.filter((j) => j.id !== job.id));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Failed to delete job",
          confirmButtonColor: "#02325a",
        });
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error deleting job",
        confirmButtonColor: "#02325a",
      });
    }
  };

  return (
    <div className="w-full flex bg-white shadow-lg px-5 py-6 rounded-md">
      <div className="w-full flex">
        <div className="w-[50%]">
          <h3 className="text-lg font-semibold text-[#02325a]">
            {job?.job_title || "Untitled Job"}{" "}
            <span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  status === "Active"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {status}
              </span>
            </span>
          </h3>
          <div className="flex my-1 text-md gap-2 text-slate-500">
            <span>{job.location}</span>
            <span className="relative simple-line">Posted on: {postedDate}</span>
            <span>{job?.employer?.name || "N/A"}</span>
          </div>
        </div>

        <div className="w-[15%] flex flex-col justify-start">
          <strong>65796</strong>
          <span className="text-md text-slate-600">Applied to job</span>
        </div>

        <div className="w-[15%] flex flex-col justify-start">
          <strong>{job?.matches || 0}</strong>
          <span className="text-md text-slate-600">Database Matches:</span>
        </div>

        <div className="w-[20%] flex justify-end items-center">
          <Menu as="div" className="relative">
            <MenuButton className="focus:outline-none">
              <HiDotsVertical className="h-6 w-6 text-slate-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleRefreshJob}
                    className={`${
                      active ? "bg-blue-50 text-blue-700" : "text-gray-700"
                    } block w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150`}
                  >
                    Refresh Job
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleEditJob}
                    className={`${
                      active ? "bg-blue-50 text-blue-700" : "text-gray-700"
                    } block w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150`}
                  >
                    Edit Job
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleDeleteJob}
                    className={`${
                      active ? "bg-red-50 text-red-700" : "text-red-600"
                    } flex items-center w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150`}
                  >
                    <HiTrash className="h-4 w-4 mr-2" />
                    Delete Job
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;

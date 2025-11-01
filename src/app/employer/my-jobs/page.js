"use client";

import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import Sidebar from "../../components/Sidebar";
import { baseurl } from "@/app/components/common";
import { parseISO, addDays, isAfter, format } from "date-fns";
import axios from "axios";
import { HiDotsVertical, HiTrash } from "react-icons/hi";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { SlRefresh } from "react-icons/sl";

const MyJobs = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state
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
      setIsLoading(true);
      const token = localStorage.getItem("employerToken");
      if (!token) {
        setIsLoading(false);
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
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Not logged in or invalid token", err);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!isLoggedIn.id) return;

      setIsLoading(true);
      try {
        const token = localStorage.getItem("employerToken");
        const response = await axios.get(`${baseurl}/jobs/employer/${isLoggedIn.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === "success") {
          const jobsWithDetails = await Promise.all(
            response.data.data.map(async (job) => {
              try {
                const dashboardResponse = await axios.get(
                  `${baseurl}/jobs/${job.id}/dashboard`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                if (dashboardResponse.data.status === "success") {
                  return {
                    ...job,
                    matches: dashboardResponse.data.data.matches,
                    applications: dashboardResponse.data.data.applications,
                  };
                }
                return job;
              } catch (error) {
                console.error(`Error fetching dashboard for job ${job.id}:`, error);
                return job;
              }
            })
          );
          setJobs(jobsWithDetails);
        } else {
          console.error("Failed to fetch jobs:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [isLoggedIn.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsJobModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="mt-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">My Jobs</h1>
            <button
              onClick={() => router.push("/employer/post-job")}
              className="flex items-center px-4 py-2 bg-[#02325a] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" /> Post New Job
            </button>
          </div>
          <div className="mb-8 px-[2%]">
         
            <div className="grid grid-cols-1 gap-6">
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <SkeletonJobCard key={i} />
                  ))}
                </div>
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <JobCard key={job.id} job={job} setJobs={setJobs} />
                ))
              ) : (
                <p className="text-gray-600">No jobs posted yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader for Job Cards
const SkeletonJobCard = () => (
  <div className="w-full flex bg-white shadow-lg px-5 py-6 rounded-md animate-pulse">
    <div className="w-full flex">
      <div className="w-[50%]">
        <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
        <div className="flex my-1 text-md gap-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
      <div className="w-[15%] flex flex-col justify-start">
        <div className="h-6 bg-gray-300 rounded w-10 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-24"></div>
      </div>
      <div className="w-[15%] flex flex-col justify-start">
        <div className="h-6 bg-gray-300 rounded w-10 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-24"></div>
      </div>
      <div className="w-[20%] flex justify-end items-center">
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
);

const JobCard = ({ job, setJobs }) => {
  const router = useRouter();

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
            j.id === job.id
              ? { ...j, created_at: response.data.data.created_at }
              : j
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

  const handleViewMatches = () => {
    router.push(`/employer/candidates/${job.id}?tab=matches`);
  };

  const handleViewApplications = () => {
    router.push(`/employer/candidates/${job.id}?tab=applied`);
  };

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
  const postedDate = format(createdAt, "d, MMMM yyyy");

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
            <span>
              {job.location.length > 20
                ? `${job.location.slice(0, 20)}...`
                : job.location}
            </span>
            <span className="relative simple-line">
              Posted on: {postedDate}
            </span>
            <span>{job?.employer?.name || "N/A"}</span>
          </div>
        </div>
        <div className="w-[15%] flex flex-col justify-start">
          <strong>{job?.matches?.length || 0}</strong>
          <span className="text-md text-slate-600">Database Matches</span>
          <button
            onClick={handleViewMatches}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            View Matches
          </button>
        </div>
        <div className="w-[15%] flex flex-col justify-start">
          <strong>{job?.applications?.length || 0}</strong>
          <span className="text-md text-slate-600">Applications</span>
          <button
            onClick={handleViewApplications}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            View Applications
          </button>
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
                    } flex items-center w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150`}
                  >
                      <SlRefresh className="h-4 w-4 mr-2" />
                    Refresh Job
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

export default MyJobs;
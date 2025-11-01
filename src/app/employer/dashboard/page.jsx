"use client";

import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import Sidebar from "../../components/Sidebar";
import { baseurl } from "@/app/components/common";
import { parseISO, addDays, isAfter, format } from "date-fns";
import axios from "axios";
import { HiDotsVertical, HiTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { SlRefresh } from "react-icons/sl";
const EmployerDashboard = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModel, setSuccessModel] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({
    other_certificate: null,
  });
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    salaryRange: "",
    jobType: "full-time",
    location: "",
    deadline: "",
  });

  const handleClose = () => {
    setIsVisible(false);
  };

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
          setIsVisible(res.data.data.is_blocked);
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
        console.log("Fetching jobs for employer ID:", response);

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

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("employerToken");
        const response = await axios.get(`${baseurl}/getall/companies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const filteredData = response.data.data.filter(
          (p) => p.employer_id == isLoggedIn.id
        );
        setCompanies(filteredData);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, [isLoggedIn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsJobModalOpen(false);
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setSelectedFiles({
      ...selectedFiles,
      [name]: files[0],
    });
  };

  const handleSubmitDocs = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", companies[0].id);
    formData.append("other_certificate", selectedFiles.other_certificate);

    try {
      const token = localStorage.getItem("employerToken");
      const response = await axios.post(`${baseurl}/update-docs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setIsModalOpen(false);
        setSuccessModel(true);
      } else {
        alert("Failed to update documents.");
      }
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  };

  const handleSelectChange = (event) => {
    const companyId = event.target.value;
    const selectedCompany = companies.find(
      (company) => company.id === parseInt(companyId)
    );
    setSelectedCompany(selectedCompany);
  };

  if (
    isLoggedIn.is_verified === 1 ||
    isLoggedIn.is_verified === null ||
    isLoggedIn.is_blocked === 1
  ) {
    return (
      <div className="flex py-20 sm:py-40 bg-gradient-to-br from-gray-100 to-gray-200">
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
            {isVisible && (
              <div className="flex items-center bg-red-100 text-red-700 border border-red-300 rounded-lg p-4 shadow-lg mx-auto mb-4">
                <div className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-exclamation-circle text-red-700"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5z" />
                    <path d="M7.002 5.001a.5.5 0 0 1 .492.41L7.5 5.5v3a.5.5 0 0 1-.992.09L6.5 8.5V5.5a.5.5 0 0 1 .502-.499z" />
                    <path d="M8 10a.5.5 0 0 1 .5.5V11a.5.5 0 0 1-.992.09L7.5 11v-.5a.5.5 0 0 1 .5-.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="m-0">
                    <b>Remark: </b>
                    {isLoggedIn.remark}
                  </p>
                </div>
              </div>
            )}
            <div className="flex justify-center gap-4">
              {isVisible && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-[#02325a] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Update Documents
                </button>
              )}
              {isModalOpen && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-2xl shadow-lg w-full sm:w-7xl max-w-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                      Update Documents
                    </h2>
                    <form onSubmit={handleSubmitDocs}>
                      <div className="mb-6">
                        <input type="hidden" value={companies[0]?.id} />
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-1">
                          GST Certificate (PDF) / Company PAN Card (PDF) /
                          Other's Document (PDF)
                        </label>
                        <input
                          type="file"
                          name="other_certificate"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="mt-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {successModel && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-7xl max-w-lg">
                    <h2 className="text-2xl font-semibold text-green-600 text-center mb-4">
                      Documents Updated Successfully
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                      Your documents have been updated successfully. You can now
                      proceed.
                    </p>
                    <div className="flex justify-center">
                      <a
                        href="/"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {!isVisible && (
                <a
                  href="/employer/verify-status"
                  className="px-6 py-3 bg-[#02325a] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Check Verification Status
                </a>
              )}
              <a
                href="/contact"
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

  return (
    <div className="flex bg-gradient-to-br from-blue-50 to-gray-100">
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
          {isVisible && (
            <div className="flex items-center bg-red-100 text-red-700 border border-red-300 rounded-lg p-4 shadow-lg mx-auto mb-4">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-exclamation-circle text-red-700"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5z" />
                  <path d="M7.002 5.001a.5.5 0 0 1 .492.41L7.5 5.5v3a.5.5 0 0 1-.992.09L6.5 8.5V5.5a.5.5 0 0 1 .502-.499z" />
                  <path d="M8 10a.5.5 0 0 1 .5.5V11a.5.5 0 0 1-.992.09L7.5 11v-.5a.5.5 0 0 1 .5-.5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="m-0">{isLoggedIn.remark}</p>
              </div>
              <button
                onClick={handleClose}
                className="text-red-700 font-bold text-lg ml-2 hover:text-red-900"
              >
                ×
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {isLoading ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <SkeletonMetricCard key={i} />
                ))}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="mb-8 px-[2%] py-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Job Postings
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <SkeletonJobCard key={i} />
                ))}
              </div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <NewJobCard key={job.id} setJobs={setJobs} job={job} />
              ))
            ) : (
              <p className="text-gray-600">No jobs posted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader for Metric Cards
const SkeletonMetricCard = () => (
  <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="flex items-center justify-between">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded w-10"></div>
      </div>
    </div>
  </div>
);

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

const NewJobCard = ({ job, setJobs }) => {
  const createdAt = job?.created_at ? parseISO(job.created_at) : new Date();
  const deadline = addDays(createdAt, job?.job_expire_time || 14);
  const deadlineFormatted = deadline.toLocaleDateString();
  const isExpired = isAfter(new Date(), deadline);
  const postedDate = format(createdAt, "d, MMMM yyyy");
  const status = isExpired ? "Expired" : "Active";
  const router = useRouter();

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

  const handleViewMatches = () => {
    router.push(`/employer/candidates/${job.id}?tab=matches`);
  };

  const handleViewApplications = () => {
    router.push(`/employer/candidates/${job.id}?tab=applied`);
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

export default EmployerDashboard;
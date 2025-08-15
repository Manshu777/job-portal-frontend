"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaRegNewspaper } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoLocation, IoSearch, IoIosArrowDown, IoFilterSharp } from "react-icons/io5";
import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
} from "react-icons/fa";
import JobCard from "./JobCard";
import { baseurl } from "./common"
import { useSearchParams } from "next/navigation";


export default function Jobs() {


  const searchparams=useSearchParams();
  const categories = searchparams.get('categories')
  const page = searchparams.get('page')
  const job_type = searchparams.get('job_type')
  const total_experience_required = searchparams.get('total_experience_required')
  const work_location_type = searchparams.get('work_location_type')
  const date_posted = searchparams.get('date_posted')
  const job_title = searchparams.get('job_title')
  
  
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    job_title: "",
    location: "",
    job_type: [],
    work_location_type: [],
    pay_type: [],
    is_walkin_interview: null,
    total_experience_required: [],
    categories: [],
    date_posted: null,
    salary_range: [0, 9999],
  });
  const [jobCategoryLength, setJobCategoryLength] = useState(6);
  const [loading, setLoading] = useState(false);

  const topCompanies = [
    {
      icon: <FaInstagramSquare />,
      name: "Instagram",
      desc: "Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat",
      jobs: 8,
    },
    {
      icon: <FaFacebookSquare />,
      name: "Facebook",
      desc: "At pellentesque amet odio cras imperdiet nisl. Ac magna aliquet massa leo",
      jobs: 12,
    },
    {
      icon: <FaTwitterSquare />,
      name: "Twitter",
      desc: "Odio aliquet tellus tellus maecenas. Faucibus in viverra venenatis phasellus",
      jobs: 11,
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      desc: "Et odio sem tellus ultrices posuere consequat. Tristique nascetur sapien",
      jobs: 11,
    },
  ];

  const jobCategories = [
    { id: 1, label: "E-commerce" },
    { id: 2, label: "Telecommunication" },
    { id: 3, label: "Hotel & Tourism" },
    { id: 4, label: "Education" },
    { id: 5, label: "Financial Services" },
    { id: 6, label: "Healthcare" },
    { id: 7, label: "Information Technology" },
    { id: 8, label: "Marketing & Advertising" },
    { id: 9, label: "Engineering" },
    { id: 10, label: "Human Resources" },
  ];

  const jobTypes = [
    { id: 1, label: "Full-time",value:"full_time" },
    { id: 2, label: "Part-time" ,value:"part_time"},
    { id: 3, label: "Freelance" ,value:"freelance"},
    { id: 4, label: "Internship" ,value:"internship"},
  ];

  const experienceLevels = [
    { id: 1, label: "Fresher", value: 0 },
    { id: 2, label: "Experienced", value: 1 },
  ];

  const datePosted = [
    { id: 1, label: "All", value: null },
    { id: 2, label: "Last 3 Days", value: "last_3_days" },
    { id: 3, label: "Last 10 Days", value: "last_10_days" },
    { id: 4, label: "Last 30 Days", value: "last_30_days" },
  ];

  const workLocationTypes = [
    { id: 1, label: "Work from Home", value: "remote" },
    { id: 2, label: "Work from Office", value: "onsite" },
    { id: 3, label: "Hybrid", value: "hybrid" },
  ];

  const tags = [
    { id: "1", name: "Engineering" },
    { id: "2", name: "Design" },
    { id: "3", name: "UI/UX" },
    { id: "4", name: "Marketing" },
    { id: "5", name: "Management" },
    { id: "6", name: "Software" },
    { id: "7", name: "Construction" },
  ];

  // Function to update URL with current filters and page
  const updateURL = (newFilters = filters, page = currentPage) => {
    const queryParams = new URLSearchParams();
    queryParams.set("page", page?.toString());

    if (newFilters.job_title) queryParams.set("job_title", newFilters.job_title);
    if (newFilters.location) queryParams.set("location", newFilters.location);
    if (newFilters.job_type.length > 0) queryParams.set("job_type", newFilters.job_type.join(","));
    if (newFilters.work_location_type.length > 0)
      queryParams.set("work_location_type", newFilters.work_location_type.join(","));
    if (newFilters.pay_type.length > 0) queryParams.set("pay_type", newFilters.pay_type.join(","));
    if (newFilters.is_walkin_interview !== null)
      queryParams.set("is_walkin_interview", newFilters.is_walkin_interview.toString());
    if (newFilters.total_experience_required.length > 0)
      queryParams.set("total_experience_required", newFilters.total_experience_required.join(","));
    if (newFilters.categories.length > 0) queryParams.set("categories", newFilters.categories.join(","));
    if (newFilters.date_posted) queryParams.set("date_posted", newFilters.date_posted);
    if (newFilters.salary_range[1] !== 9999)
      queryParams.set("salary_max", newFilters.salary_range[1].toString());

    window.history.pushState({}, "", `?${queryParams.toString()}`);
  };

  // Function to parse URL query parameters and set initial filter state
  const parseURLParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const parsedFilters = {
      job_title: queryParams.get("job_title") || "",
      location: queryParams.get("location") || "",
      job_type: queryParams.get("job_type") ? queryParams.get("job_type").split(",") : [],
      work_location_type: queryParams.get("work_location_type")
        ? queryParams.get("work_location_type").split(",")
        : [],
      pay_type: queryParams.get("pay_type") ? queryParams.get("pay_type").split(",") : [],
      is_walkin_interview:
        queryParams.get("is_walkin_interview") !== null
          ? queryParams.get("is_walkin_interview") === "true"
          : null,
      total_experience_required: queryParams.get("total_experience_required")
        ? queryParams.get("total_experience_required").split(",").map(Number)
        : [],
      categories: queryParams.get("categories") ? queryParams.get("categories").split(",") : [],
      date_posted: queryParams.get("date_posted") || null,
      salary_range: [
        0,
        queryParams.get("salary_max") ? parseInt(queryParams.get("salary_max")) : 9999,
      ],
    };
    const page = parseInt(queryParams.get("page")) || 1;

    setFilters(parsedFilters);
    setCurrentPage(page);
  };

  // Fetch jobs from API
  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      // const params = {
      //   page,
      //   job_type: filters.job_type.join(",") || undefined,
      //   location: filters.location || undefined,
      //   work_location_type: filters.work_location_type.join(",") || undefined,
      //   pay_type: filters.pay_type.join(",") || undefined,
      //   is_walkin_interview: filters.is_walkin_interview || undefined,
      //   total_experience_required: filters.total_experience_required.join(",") || undefined,
      //   categories: filters.categories.join(",") || undefined,
      //   date_posted: filters.date_posted || undefined,
      //   salary_min: filters.salary_range[0] || undefined,
      //   salary_max: filters.salary_range[1] || undefined,
      // };
      const  params={
        	job_title:job_title,
          job_type,
          work_location_type,
          date_posted,
          total_experience_required,
          categories,
          page
      };


      // console.log(`${baseurl}/jobs?${params}`)

      const response = await axios.get(`${baseurl}/jobs`, {  params});
      console.log(response.data)
      if (response.data.status === "success") {
        setJobs(response.data.data.data);
        setTotalPages(response.data.data.last_page);
        setCurrentPage(response.data.data.current_page);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Parse URL parameters on mount
  useEffect(() => {
    parseURLParams();
  }, []);

  // Fetch jobs when page or filters change and update URL
  useEffect(() => {
    
    updateURL(filters, currentPage);
    fetchJobs(currentPage);
  }, [currentPage, filters]);

  // Handle filter changes for text inputs and single-value filters
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  // Handle checkbox filters
  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => {
      const currentValues = prev[key];
      if (currentValues.includes(value)) {
        return { ...prev, [key]: currentValues.filter((v) => v !== value) };
      } else {
        return { ...prev, [key]: [...currentValues, value] };
      }
    });
    setCurrentPage(1);
  };

  // Handle salary range change
  const handleSalaryChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      salary_range: [0, parseInt(value)],
    }));
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto">
      <div className="banner h-[25vh] lg:h-[40vh] bg-black flex items-center justify-center text-white">
        <h1 className="font-bold text-3xl lg:text-5xl">Jobs</h1>
      </div>

      <div className="lg:hidden filter-btn px-5 my-3">
        <button className="px-4 w-full flex items-center justify-center gap-x-2 py-2 font-bold rounded bg-[#309689] text-lg text-white">
          Filters <IoFilterSharp />
        </button>
      </div>

      <div className="mt-4 lg:mt-14 px-5 md:px-12 xl:px-32 mx-auto">
        <div className="grid lg:grid-cols-3 gap-y-16 lg:gap-y-0 lg:gap-x-16">
          <div className="lg:col-span-1">
            <div className="bg-[#EBF5F4] rounded-2xl sticky top-0 py-8 lg:py-4 px-3 lg:px-5 space-y-4 lg:space-y-5">
              <div>
                <h6 className="font-semibold text-lg">Search by Job Title</h6>
                <label className="bg-white mt-3 relative w-full flex items-center py-2 px-12 rounded-2xl shadow-sm">
                  <input
                    type="text"
                    placeholder="Job title or company"
                    className="w-full outline-none bg-transparent"
                    value={filters.job_title}
                    onChange={(e) => handleFilterChange("job_title", e.target.value)}
                  />
                  <IoSearch className="absolute text-xl left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </label>
              </div>
              <div>
                <h6 className="font-semibold text-lg">Location</h6>
                <label className="bg-white mt-3 relative w-full flex items-center py-2 px-12 rounded-2xl shadow-sm">
                  <input
                    type="text"
                    placeholder="Choose city"
                    className="w-full outline-none bg-transparent"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                  <IoLocation className="absolute text-xl left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </label>
              </div>
              <div>
                <h6 className="font-semibold text-lg">Category</h6>
                <div className="space-y-2 mt-3">
                  {jobCategories.slice(0, jobCategoryLength).map((elm) => (
                    <label key={elm.id} className="flex justify-between">
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#02325a] border-gray-300 rounded focus:ring-blue-500"
                          checked={filters.categories.includes(elm.label)}
                          onChange={() => handleCheckboxChange("categories", elm.label)}
                        />
                        <span className="text-gray-700">{elm.label}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500">({elm.id})</span>
                      </div>
                    </label>
                  ))}
                  {jobCategories.length !== jobCategoryLength && (
                    <button
                      onClick={() => setJobCategoryLength(jobCategories.length)}
                      className="lg:mt-3 px-4 py-2 font-semibold w-full rounded-lg bg-[#309689] text-base text-white"
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
              <div>
                <h6 className="font-semibold text-lg">Job Type</h6>
                <div className="space-y-2 mt-3">
                  {jobTypes.map((elm) => (
                    <label key={elm.id} className="flex justify-between">
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#02325a] border-gray-300 rounded focus:ring-blue-500"
                          checked={filters.job_type.includes(elm.value.toLowerCase())}
                          onChange={() => handleCheckboxChange("job_type", elm.value.toLowerCase())}
                        />
                        <span className="text-gray-700">{elm.label}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500">({elm.id})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h6 className="font-semibold text-lg">Experience Level</h6>
                <div className="space-y-2 mt-3">
                  {experienceLevels.map((elm) => (
                    <label key={elm.id} className="flex justify-between">
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#02325a] border-gray-300 rounded focus:ring-blue-500"
                          checked={filters.total_experience_required.includes(elm.value)}
                          onChange={() => handleCheckboxChange("total_experience_required", elm.value)}
                        />
                        <span className="text-gray-700">{elm.label}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500">({elm.id})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h6 className="font-semibold text-lg">Work Location</h6>
                <div className="space-y-2 mt-3">
                  {workLocationTypes.map((elm) => (
                    <label key={elm.id} className="flex justify-between">
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#02325a] border-gray-300 rounded focus:ring-blue-500"
                          checked={filters.work_location_type.includes(elm.value)}
                          onChange={() => handleCheckboxChange("work_location_type", elm.value)}
                        />
                        <span className="text-gray-700">{elm.label}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500">({elm.id})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h6 className="font-semibold text-lg">Date Posted</h6>
                <div className="space-y-2 mt-3">
                  {datePosted.map((elm) => (
                    <label key={elm.id} className="flex justify-between">
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          className="w-4 h-4 text-[#02325a] border-gray-300 rounded focus:ring-blue-500"
                          checked={filters.date_posted === elm.value}
                          onChange={() => handleFilterChange("date_posted", elm.value)}
                        />
                        <span className="text-gray-700">{elm.label}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500">({elm.id})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/* <div>
                <h6 className="font-semibold text-lg">Salary</h6>
                <div className="mt-3">
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="9999"
                      className="w-full h-2 bg-green-300 rounded-lg appearance-none cursor-pointer accent-[#02325a]"
                      value={filters.salary_range[1]}
                      onChange={handleSalaryChange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[#000000]">
                      Salary: ${filters.salary_range[0]} - ${filters.salary_range[1]}
                    </p>
                    <span className="text-[#309689] bg-[#3096891A] text-base rounded font-semibold px-2 py-1">
                      Apply
                    </span>
                  </div>
                </div>
              </div> */}
              {/* <div>
                <h6 className="font-semibold text-lg">Tags</h6>
                <div className="space-y-2 mt-3 grid grid-cols-3 gap-4">
                  {tags.map((elm) => (
                    <h5
                      key={elm.id}
                      className="bg-[#3096881e] text-[#309689] rounded-2xl text-center p-1"
                    >
                      {elm.name}
                    </h5>
                  ))}
                </div>
              </div> */}
              <div className="we-hiring h-[460px] relative w-full rounded-2xl bg-[url('/img/jobs/imgbg.avif')] overflow-hidden p-8 text-white">
                <div className="relative z-10">
                  <h5 className="text-3xl lg:text-3xl font-bold">WE ARE HIRING</h5>
                  <p className="text-2xl">Apply Today!</p>
                </div>
                <div className="inset-0 absolute backdrop-blur-3xl" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div>
              <div className="flex items-center justify-between">
                <p>
                  Showing {jobs?.length} of {totalPages * 10} results
                </p>
                <button>Sort by latest</button>
              </div>
              <div className="mt-5 lg:mt-10 grid grid-cols-1 gap-y-5">
                {loading ? (
                  <p>Loading...</p>
                ) : jobs?.length > 0 ? (
                  jobs?.map((job) => <JobCard key={job.id} jobcard={job} />)
                ) : (
                  <p>No jobs found.</p>
                )}
              </div>
              <div className="relative flex lg:justify-center items-center gap-x-4 mt-16 w-full">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded text-sm ${
                      page === currentPage
                        ? "bg-[#309689] text-white"
                        : "border border-[#309689]"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="absolute right-0 border-2 px-4 border-[#6C757D] text-[#6C757D] rounded-lg"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="top-company bg-[#EBF5F4] mx-auto mt-5 lg:mt-16 py-8 lg:py-16 px-5 md:px-12 xl:px-32 mb-8 lg:mb-16">
        <div className="text-center">
          <h5 className="text-3xl lg:text-4xl font-bold">Top Companies</h5>
          <p>
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa
            elementum
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 lg:gap-y-0 lg:grid-cols-4 gap-x-5 lg:gap-x-8 mt-4 lg:mt-8">
          {topCompanies.map((elm, idx) => (
            <div
              key={idx}
              className="py-8 rounded-2xl lg:py-5 px-5 bg-white text-center space-y-3"
            >
              <div className="flex justify-center">
                <h5 className="text-5xl lg:text-3xl mx-auto">{elm.icon}</h5>
              </div>
              <h6 className="font-bold text-lg">{elm.name}</h6>
              <p>{elm.desc}</p>
              <button className="text-[#309689] rounded-2xl bg-[#3096891A] text-base px-2 py-1">
                {elm.jobs} open jobs
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
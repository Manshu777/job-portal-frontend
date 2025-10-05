"use client";
import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import JobFilters from "../components/JobFilters";
import SearchBar from "../components/SearchBar";
import { Briefcase, MapPin, Users, TrendingUp } from "lucide-react";
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";
import Pagination from "../components/Pagination";
import { baseurl } from "../components/common";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    salaryRange: "",
    company: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch applied jobs on mount
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`${baseurl}/get-applications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("port_tok")}`,
          },
        });
        if (response.data.success) {
          setAppliedJobs(response.data.appliedJobIds);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };
    fetchAppliedJobs();
  }, []);

  // Fetch jobs with pagination
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseurl}/jobs?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("port_tok")}`,
          },
        });
        if (response.data.status === "success") {
          setJobs(response.data.data.data);
          setFilteredJobs(response.data.data.data);
          setTotalPages(response.data.data.last_page);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [currentPage]);

  // Apply filters and search
  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.company?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Job type filter
    if (filters.jobType) {
      filtered = filtered.filter((job) => job.job_type === filters.jobType);
    }

    // Salary range filter
    if (filters.salaryRange) {
      const [min, max] = filters.salaryRange.split("-").map(Number);
      filtered = filtered.filter((job) => {
        const minSalary = parseFloat(job.min_salary);
        const maxSalary = parseFloat(job.max_salary);
        return minSalary >= min && maxSalary <= max;
      });
    }

    // Company filter
    if (filters.company) {
      filtered = filtered.filter((job) =>
        (job.company?.name || "").toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [filters, searchTerm, jobs]);

  // Stats for display
  const stats = [
    { icon: Briefcase, label: "Total Jobs", value: jobs.length },
    { icon: MapPin, label: "Cities", value: new Set(jobs.map((job) => job.location)).size },
    { icon: Users, label: "Companies", value: new Set(jobs.map((job) => job.company?.name)).size },
    { icon: TrendingUp, label: "This Week", value: Math.floor(jobs.length * 0.3) },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pb-12 pt-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Dream Job</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            Discover amazing opportunities from top companies worldwide
          </p>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-6 pt-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <JobFilters filters={filters} setFilters={setFilters} />
            </div>
            {/* Job Listings */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{filteredJobs.length} Jobs Found</h2>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => {
                    // Implement sorting logic if needed
                    console.log("Sort by:", e.target.value);
                  }}
                >
                  <option>Sort by: Latest</option>
                  <option>Sort by: Salary</option>
                  <option>Sort by: Company</option>
                </select>
              </div>
              {loading ? (
                <div className="grid gap-6">
                  {[...Array(5)].map((_, index) => (
                    <SkeletonLoader key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredJobs.map((job) => (
                   <JobCard
                    key={job.id}
                    job={job}
                   hasApplied={appliedJobs.includes(job.id)}
                    setAppliedJobs={setAppliedJobs}
                  />
                  ))}
                </div>
              )}
              {filteredJobs.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">No jobs found matching your criteria</div>
                  <button
                    onClick={() => {
                      setFilters({ location: "", jobType: "", salaryRange: "", company: "" });
                      setSearchTerm("");
                    }}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
              {/* Pagination */}
              {!loading && filteredJobs.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
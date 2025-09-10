
"use client";

import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import JobFilters from "./components/JobFilters";
import SearchBar from "./components/SearchBar";

import { jobsData } from "./data/jobs";
import { Briefcase, MapPin, Users, TrendingUp } from "lucide-react";

export default function Home() {
  const [jobs, setJobs] = useState(jobsData);
   console.log(jobsData, "jobsData");
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    salaryRange: "",
    company: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = jobs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply job type filter
    if (filters.jobType) {
      filtered = filtered.filter((job) => job.type === filters.jobType);
    }

    // Apply salary range filter
    if (filters.salaryRange) {
      const [min, max] = filters.salaryRange.split("-").map(Number);
      filtered = filtered.filter((job) => {
        const salary = parseInt(job.salary.replace(/[^0-9]/g, ""));
        return salary >= min && salary <= max;
      });
    }

    // Apply company filter
    if (filters.company) {
      filtered = filtered.filter((job) =>
        job.company.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [filters, searchTerm, jobs]);

  const stats = [
    { icon: Briefcase, label: "Total Jobs", value: jobs?.length },
    {
      icon: MapPin,
      label: "Cities",
      value: new Set(jobs?.map((job) => job?.location)).size,
    },
    {
      icon: Users,
      label: "Companies",
      value: new Set(jobs?.map((job) => job?.company)).size,
    },
    {
      icon: TrendingUp,
      label: "This Week",
      value: Math.floor(jobs?.length * 0.3),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pb-12 pt-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            Discover amazing opportunities from top companies worldwide
          </p>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Main Content */}
      <section className="pb-6 pt-4">
        <div className="max-w-7xl mx-auto ">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <JobFilters filters={filters} setFilters={setFilters} />
            </div>

            {/* Job Listings */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredJobs?.length} Jobs Found
                </h2>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sort by: Latest</option>
                  <option>Sort by: Salary</option>
                  <option>Sort by: Company</option>
                </select>
              </div>

              <div className="grid gap-6">
                {jobsData?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {jobsData?.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">
                    No jobs found matching your criteria
                  </div>
                  <button
                    onClick={() => {
                      setFilters({
                        location: "",
                        jobType: "",
                        salaryRange: "",
                        company: "",
                      });
                      setSearchTerm("");
                    }}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { jobsData } from "../data/jobs"; // Adjust import path if necessary (e.g., ../../data/jobs)

export default function JobFilters({ filters, setFilters, setFilteredJobs }) {
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleFilterChange = (key, value) => {
    // Convert special "all" values back to empty string for filtering logic
    const filterValue = (value === "all-types-option" || value === "any-salary-option") ? "" : value;
    setFilters((prev) => ({ ...prev, [key]: filterValue }));
  };

  const handleExperienceChange = (e) => {
    const { value, checked } = e.target;
    setExperienceLevels((prev) =>
      checked ? [...prev, value] : prev.filter((level) => level !== value)
    );
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategories((prev) =>
      checked ? [...prev, value] : prev.filter((category) => category !== value)
    );
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      jobType: "",
      salaryRange: "",
      company: "",
    });
    setExperienceLevels([]);
    setCategories([]);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...jobsData];

      // Filter by location
      if (filters.location) {
        filtered = filtered.filter((job) =>
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Filter by job type
      if (filters.jobType) {
        filtered = filtered.filter(
          (job) => job.type.toLowerCase() === filters.jobType.toLowerCase()
        );
      }

      // Filter by salary range
      if (filters.salaryRange) {
        const [min, max] = filters.salaryRange.split("-").map(Number);
        filtered = filtered.filter((job) => {
          const salary = parseInt(job.salary.replace(/[^0-9]/g, ""));
          return max
            ? salary >= min && salary <= max
            : salary >= min && salary <= 999999;
        });
      }

      // Filter by company
      if (filters.company) {
        filtered = filtered.filter((job) =>
          job.company.toLowerCase().includes(filters.company.toLowerCase())
        );
      }

      // Filter by experience levels
      if (experienceLevels.length > 0) {
        filtered = filtered.filter((job) =>
          experienceLevels.some((level) =>
            job.experience.toLowerCase().includes(level.toLowerCase())
          )
        );
      }

      // Filter by categories
      if (categories.length > 0) {
        filtered = filtered.filter((job) =>
          categories.some((category) =>
            job.category.toLowerCase().includes(category.toLowerCase())
          )
        );
      }

      // Check if setFilteredJobs is a function before calling it
      if (typeof setFilteredJobs === "function") {
        setFilteredJobs(filtered);
      } else {
        console.warn("setFilteredJobs is not a function. Filtering aborted.");
      }
    };

    applyFilters();
  }, [filters, experienceLevels, categories, setFilteredJobs]);

  const hasActiveFilters =
    Object.values(filters).some((filter) => filter !== "") ||
    experienceLevels.length > 0 ||
    categories.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md sticky top-4">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </h3>
          {hasActiveFilters && (
            <button
              className="flex items-center px-2 py-1 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </button>
          )}
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Location Filter */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location
          </label>
          <input
            id="location"
            placeholder="Enter city or state"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            value={filters.jobType}
            onChange={(e) => handleFilterChange("jobType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all-types-option">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Salary Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary Range
          </label>
          <select
            value={filters.salaryRange}
            onChange={(e) => handleFilterChange("salaryRange", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="any-salary-option">Any Salary</option>
            <option value="0-30000">$0 - $30k</option>
            <option value="30000-50000">$30k - $50k</option>
            <option value="50000-80000">$50k - $80k</option>
            <option value="80000-120000">$80k - $120k</option>
            <option value="120000-999999">$120k+</option>
          </select>
        </div>

        {/* Company Filter */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company
          </label>
          <input
            id="company"
            placeholder="Enter company name"
            value={filters.company}
            onChange={(e) => handleFilterChange("company", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Experience Level */}
        <div>
          <label className="text-sm font-medium mb-3 block">
            Experience Level
          </label>
          <div className="space-y-2">
            {["Entry Level", "Mid Level", "Senior Level", "Executive"].map(
              (level) => (
                <div key={level} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={level}
                    value={level}
                    checked={experienceLevels.includes(level)}
                    onChange={handleExperienceChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={level} className="text-sm font-normal">
                    {level}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="text-sm font-medium mb-3 block">Categories</label>
          <div className="space-y-2">
            {[
              "Technology",
              "Marketing",
              "Design",
              "Sales",
              "Finance",
              "HR",
            ].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={categories.includes(category)}
                  onChange={handleCategoryChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={category} className="text-sm font-normal">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
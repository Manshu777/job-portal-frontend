import React, { useState, useEffect, useRef, useCallback } from "react";
import Select from "react-select";
import { FiBriefcase, FiCalendar, FiDollarSign, FiClock, FiMapPin } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import axios from "axios";

const Three = ({ alldata, handelinputs }) => {
  const [jobRoleSearch, setJobRoleSearch] = useState("");
  const [showJobRoleDropdown, setShowJobRoleDropdown] = useState(false);
  const [filteredJobRoleOptions, setFilteredJobRoleOptions] = useState([]);
  const [locationSearch, setLocationSearch] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredLocationOptions, setFilteredLocationOptions] = useState([]);
  const [isLoadingJobTitles, setIsLoadingJobTitles] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const jobRoleDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const baseurl = "http://localhost:8000/api/v1";

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

    const experienceLevelOptions = [
    { value: "Fresher", label: "Fresher" },
    { value: "Experienced", label: "Experienced" },
  ];

  // Fetch job titles from API
  const fetchJobTitles = useCallback(
    debounce(async (query) => {
      if (!query || query.length < 2) {
        setJobTitleSuggestions([]);
        setFilteredJobRoleOptions([]);
        setShowJobRoleDropdown(false);
        setIsLoadingJobTitles(false);
        return;
      }

      setIsLoadingJobTitles(true);
      try {
        const response = await axios.get(`${baseurl}/job-titles/search`, {
          params: { query },
        });

        if (response.data.data && response.data.data.length > 0) {
          const suggestions = response.data.data.flatMap((item) => {
            const mainTitle = {
              value: item.job_title,
              label: item.job_title,
              id: item.id.toString(),
            };
            const resultTitles = item.results.map((result) => ({
              value: result.text,
              label: result.text,
              id: result.id.toString(),
            }));
            return [mainTitle, ...resultTitles];
          });

          setJobTitleSuggestions(suggestions);
          setFilteredJobRoleOptions(suggestions);
          setShowJobRoleDropdown(true);
        } else {
          setJobTitleSuggestions([]);
          setFilteredJobRoleOptions([]);
          setShowJobRoleDropdown(false);
        }
      } catch (err) {
        setJobTitleSuggestions([]);
        setFilteredJobRoleOptions([]);
        setShowJobRoleDropdown(false);
        console.error("Error fetching job titles:", err);
      } finally {
        setIsLoadingJobTitles(false);
      }
    }, 300),
    []
  );

  // Fetch locations from API
const fetchLocations = useCallback(
  debounce(async (query) => {
    if (!query || query.length < 2) {
      setLocationSuggestions([]);
      setFilteredLocationOptions([]);
      setShowLocationDropdown(false);
      setIsLoadingLocations(false);
      return;
    }

    setIsLoadingLocations(true);
    try {
      const response = await axios.get(`${baseurl}/cities/search`, {
        params: { term: query },
      });

      console.log("Cities API response:", response.data); // Log full response for debugging

      // Check if response.data.data is an array
      if (Array.isArray(response?.data?.data) && response.data.data.length > 0) {
        const suggestions = response.data.data.map((city, index) => ({
          value: city.name,
          label: city.name,
          id: city.id ? city.id.toString() : `fallback-${index}`, // Fallback ID if city.id is missing
        }));
        setLocationSuggestions(suggestions);
        setFilteredLocationOptions(suggestions);
        setShowLocationDropdown(true);
      } else {
        console.warn("No valid city data found in response:", response.data);
        setLocationSuggestions([]);
        setFilteredLocationOptions([]);
        setShowLocationDropdown(false);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setLocationSuggestions([]);
      setFilteredLocationOptions([]);
      setShowLocationDropdown(false);
    } finally {
      setIsLoadingLocations(false);
    }
  }, 300),
  []
);
  // Handle job role search
  const handleJobRoleSearch = (e) => {
    const value = e.target.value;
    setJobRoleSearch(value);
    fetchJobTitles(value);
  };

  // Handle job role selection
  const handleJobRoleSelect = (result) => {
    handelinputs({
      target: { name: "job_roles", value: result.value },
    });
    setJobRoleSearch(result.value);
    setShowJobRoleDropdown(false);
  };

  // Handle preferred job titles selection
  const handlePreferredJobTitles = (selectedOptions) => {
    if (selectedOptions.length <= 3) {
      handelinputs({
        target: { name: "preferred_job_titles", value: selectedOptions.map(opt => opt.value) },
      });
    }
  };

  // Handle preferred locations selection
  const handlePreferredLocations = (selectedOptions) => {
    if (selectedOptions.length <= 3) {
      handelinputs({
        target: { name: "preferred_locations", value: selectedOptions.map(opt => opt.value) },
      });
    }
  };

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (jobRoleDropdownRef.current && !jobRoleDropdownRef.current.contains(event.target)) {
        setShowJobRoleDropdown(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine experience range
  const getExperienceRange = () => {
    switch (alldata.experience_level) {
      case "Fresher":
        return { years: [], months: [] };
      case "Experienced":
      case "Both":
        return { years: [...Array(31)].map((_, i) => i), months: [...Array(12)].map((_, i) => i) };
      default:
        return { years: [...Array(31)].map((_, i) => i), months: [...Array(12)].map((_, i) => i) };
    }
  };

  const { years, months } = getExperienceRange();

  return (
    <div className="bg-white rounded-xl shadow-sm p-2 lg:p-8 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <div className="bg-emerald-100 p-3 rounded-lg mr-4">
          <FiBriefcase className="text-emerald-600 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
          <p className="text-gray-500 text-sm">
            Tell us about your professional background
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2 animate-fade-in mb-6">
          <label
            htmlFor="experience_level"
            className="flex items-center text-sm font-medium text-gray-700 mb-3"
          >
            <FiClock className="mr-2 text-emerald-500" />
            Experience Level
          </label>
          <select
            name="experience_level"
            value={alldata.experience_level || ""}
            onChange={handelinputs}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select experience level</option>
            {experienceLevelOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {alldata.experience_level !== "Fresher" && (
          <>
          

            <div className="animate-fade-in">
              <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <FiClock className="mr-2 text-emerald-500" />
                Total Years of Experience
              </h6>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="years"
                    className="block text-xs text-gray-500 mb-1"
                  >
                    Years
                  </label>
                  <select
                    name="experience_years"
                    value={alldata.experience_years}
                    onChange={handelinputs}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year} {year === 1 ? "year" : "years"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="months"
                    className="block text-xs text-gray-500 mb-1"
                  >
                    Months (optional)
                  </label>
                  <select
                    name="experience_months"
                    value={alldata.experience_months}
                    onChange={handelinputs}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select months</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month} {month === 1 ? "month" : "months"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className=" Animate-fade-in">
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <FiBriefcase className="mr-2 text-emerald-500" />
                Job Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="job_roles"
                  value={jobRoleSearch}
                  onChange={handleJobRoleSearch}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      jobRoleSearch &&
                      !filteredJobRoleOptions.some(
                        (option) =>
                          option.value.toLowerCase() === jobRoleSearch.toLowerCase()
                      )
                    ) {
                      handleJobRoleSelect({ id: "custom", value: jobRoleSearch });
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Type to search job roles..."
                  autoComplete="off"
                />
                {showJobRoleDropdown && (
                  <ul
                    ref={jobRoleDropdownRef}
                    className="absolute w-full z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                  >
                    {filteredJobRoleOptions.length > 0
                      ? filteredJobRoleOptions.map((result) => (
                          <li
                            key={result.id}
                            onClick={() => handleJobRoleSelect(result)}
                            className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 cursor-pointer"
                          >
                            {result.value}
                          </li>
                        ))
                      : jobRoleSearch && (
                          <li
                            onClick={() =>
                              handleJobRoleSelect({
                                id: "custom",
                                value: jobRoleSearch,
                              })
                            }
                            className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 cursor-pointer"
                          >
                            Add "{jobRoleSearch}" as custom job role
                          </li>
                        )}
                  </ul>
                )}
              </div>
            </div>

            <div className="animate-fade-in">
              <h6 className="text-sm font-medium text-gray-700 mb-3">
                Company Name
              </h6>
              <input
                type="text"
                placeholder="e.g. Tech Solutions Inc."
                name="company_name"
                value={alldata.company_name}
                onChange={handelinputs}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div className="animate-fade-in">
              <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <FiDollarSign className="mr-2 text-emerald-500" />
                Current Monthly Salary (INR)
              </h6>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 75000"
                  name="current_salary"
                  value={alldata.current_salary}
                  onChange={handelinputs}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 pl-10"
                />
                <span className="absolute left-3 top-3.5 text-gray-400">₹</span>
              </div>
            </div>

              <div className="space-y-2 animate-fade-in mb-6">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <FiAward className="mr-2 text-blue-500" />
                Are you currently Working in this Company?
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="is_working"
                    value="Yes"
                    checked={alldata.is_working === "Yes"}
                    onChange={handelinputs}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="is_working"
                    value="No"
                    checked={alldata.is_working === "No"}
                    onChange={handelinputs}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {alldata.is_working === "Yes" && (
              <div className="space-y-2 animate-fade-in mb-6">
                <label
                  htmlFor="notice_period"
                  className="flex items-center text-sm font-medium text-gray-700 mb-3"
                >
                  <FiAward className="mr-2 text-blue-500" />
                  Notice Period
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    "No notice Period",
                    "Less than 15 Days",
                    "1 month",
                    "2 month",
                    "3 Or more months",
                  ].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() =>
                        handelinputs({
                          target: { name: "notice_period", value: level },
                        })
                      }
                      className={`px-4 py-2 rounded-full border ${
                        alldata.notice_period === level
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                      } transition-all duration-200`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            

            <div className="animate-fade-in">
              <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <FiCalendar className="mr-2 text-emerald-500" />
                Start Date
              </h6>
              <div className="relative">
                <input
                  type="month"
                  name="start_date"
                  value={alldata.start_date}
                  onChange={handelinputs}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none"
                />
              </div>
            </div>
            {alldata.is_working === "No" && (
              <div className="animate-fade-in mb-6">
                <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FiCalendar className="mr-2 text-emerald-500" />
                  End Date
                </h6>
                <div className="relative">
                  <input
                    type="month"
                    name="end_date"
                    value={alldata.end_date || ""}
                    onChange={handelinputs}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none"
                  />
                </div>
              </div>
            )}
          </>
        )}

        <div className="animate-fade-in">
          <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FiBriefcase className="mr-2 text-emerald-500" />
            Preferred Job Titles
          </h6>
          <Select
            isMulti
            name="preferred_job_titles"
            options={jobTitleSuggestions}
            value={(alldata.preferred_job_titles || []).map((value) => ({
              value,
              label: value,
            }))}
            onChange={handlePreferredJobTitles}
            onInputChange={(inputValue) => fetchJobTitles(inputValue)}
            isLoading={isLoadingJobTitles}
            placeholder="Type to search job titles..."
            className="basic-multi-select"
            classNamePrefix="select"
            maxMenuHeight={200}
            noOptionsMessage={() => "No job titles found, type to search"}
            isOptionDisabled={() => (alldata.preferred_job_titles || []).length >= 3}
          />
          <p className="text-xs text-gray-500 mt-1">
            Select up to 3 preferred job titles
          </p>
        </div>

        {(alldata.experience_level === "Both" || alldata.experience_level === "Fresher") && (
          <div className="animate-fade-in">
            <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiMapPin className="mr-2 text-emerald-500" />
              Preferred Locations
            </label>
            <Select
              isMulti
              name="preferred_locations"
              options={locationSuggestions}
              value={(alldata.preferred_locations || []).map((value) => ({
                value,
                label: value,
              }))}
              onChange={handlePreferredLocations}
              onInputChange={(inputValue) => fetchLocations(inputValue)}
              isLoading={isLoadingLocations}
              placeholder="Type to search locations..."
              className="basic-multi-select"
              classNamePrefix="select"
              maxMenuHeight={200}
              noOptionsMessage={() => "No locations found, type to search"}
              isOptionDisabled={() => (alldata.preferred_locations || []).length >= 3}
            />
            <p className="text-xs text-gray-500 mt-1">
              Select up to 3 preferred locations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Three;
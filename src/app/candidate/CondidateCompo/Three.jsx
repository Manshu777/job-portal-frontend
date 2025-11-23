"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Select from "react-select";
import {
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiMapPin,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiAward,
} from "react-icons/fi";
import axios from "axios";

const Three = ({ alldata, handelinputs, errors }) => {
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
  const [experiences, setExperiences] = useState(alldata.experiences || [
    {
        job_title: "",
        company_name: "",
        start_date: "",
        end_date: "",
        is_current: false,
        salary: "",
        description: "",
      },
  ]);

  const jobRoleDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const baseurl = "http://147.93.18.63:8001/api/v1";

  const experienceLevelOptions = [
    { value: "Fresher", label: "Fresher" },
    { value: "Experienced", label: "Experienced" },
  ];

  // Sync experiences to parent
  useEffect(() => {
    handelinputs({ target: { name: "experiences", value: experiences } });
  }, [experiences]);

  // Add new experience
 const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        job_title: "",
        company_name: "",
        start_date: "",
        end_date: "",
        is_current: false,
        salary: "",
        description: "",
      },
    ]);
  };

  // Update experience field
 // Update experience field
  const updateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "is_current" && value) {
      updated[index].end_date = "";
    }

    setExperiences(updated);
  };

  // Remove experience
  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // Debounce helper
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

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
        console.error("Error fetching job titles:", err);
      } finally {
        setIsLoadingJobTitles(false);
      }
    }, 300),
    []
  );

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

        if (Array.isArray(response?.data?.data) && response.data.data.length > 0) {
          const suggestions = response.data.data.map((city, index) => ({
            value: city.name,
            label: city.name,
            id: city.id ? city.id.toString() : `fallback-${index}`,
          }));
          setLocationSuggestions(suggestions);
          setFilteredLocationOptions(suggestions);
          setShowLocationDropdown(true);
        } else {
          setLocationSuggestions([]);
          setFilteredLocationOptions([]);
          setShowLocationDropdown(false);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    }, 300),
    []
  );

  const handleJobRoleSearch = (e) => {
    const value = e.target.value;
    setJobRoleSearch(value);
    fetchJobTitles(value);
  };

  const handleJobRoleSelect = (result, expIndex) => {
    updateExperience(expIndex, "job_title", result.value);
  };

  const handlePreferredJobTitles = (selectedOptions) => {
    if (selectedOptions.length <= 3) {
      handelinputs({
        target: { name: "preferred_job_titles", value: selectedOptions.map((opt) => opt.value) },
      });
    }
  };

  const handlePreferredLocations = (selectedOptions) => {
    if (selectedOptions.length <= 3) {
      handelinputs({
        target: { name: "preferred_locations", value: selectedOptions.map((opt) => opt.value) },
      });
    }
  };

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

  const hasCurrentJob = experiences.some((exp) => exp.is_current);


  return (
    <div className="bg-white rounded-xl shadow-sm p-2 lg:p-8 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <div className="bg-emerald-100 p-3 rounded-lg mr-4">
          <FiBriefcase className="text-emerald-600 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
          <p className="text-gray-500 text-sm">Tell us about your professional background</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Experience Level */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <FiClock className="mr-2 text-emerald-500" />
            Experience Level
          </label>
          <select
            name="experience_level"
            value={alldata.experience_level || ""}
            onChange={handelinputs}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select experience level</option>
            {experienceLevelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.experience_level && (
            <p className="text-red-500 text-sm">{errors.experience_level}</p>
          )}
        </div>

        {/* Total Experience Summary (Only for Experienced) */}
        {alldata.experience_level !== "Fresher" && (
          <div className="animate-fade-in">
            <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiClock className="mr-2 text-emerald-500" />
              Total Years of Experience
            </h6>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Years</label>
                <select
                  name="experience_years"
                  value={alldata.experience_years || ""}
                  onChange={handelinputs}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                <label className="block text-xs text-gray-500 mb-1">Months (optional)</label>
                <select
                  name="experience_months"
                  value={alldata.experience_months || ""}
                  onChange={handelinputs}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
        )}

        {/* Multiple Work Experiences */}
        {alldata.experience_level !== "Fresher" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h6 className="text-sm font-medium text-gray-700 flex items-center">
                <FiBriefcase className="mr-2 text-emerald-500" />
                Work Experiences
              </h6>
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                <FiPlus /> Add Experience
              </button>
            </div>

            {experiences.length === 0 && (
              <p className="text-gray-500 text-sm">No experiences added yet.</p>
            )}

            {experiences.map((exp, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3 relative"
              >
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={18} />
                </button>

                {/* Job Title */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={exp.job_title}
                    onChange={(e) =>
                      updateExperience(index, "job_title", e.target.value)
                    }
                    placeholder="e.g. Software Engineer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={exp.company_name}
                    onChange={(e) =>
                      updateExperience(index, "company_name", e.target.value)
                    }
                    placeholder="e.g. Google Inc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={exp.start_date}
                      onChange={(e) =>
                        updateExperience(index, "start_date", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {exp.is_current ? "Currently Working" : "End Date"}
                    </label>
                    <input
                      type="month"
                      value={exp.end_date}
                      onChange={(e) =>
                        updateExperience(index, "end_date", e.target.value)
                      }
                      disabled={exp.is_current}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* Current Job */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={exp.is_current}
                    onChange={(e) =>
                      updateExperience(index, "is_current", e.target.checked)
                    }
                    className="rounded text-emerald-600"
                  />
                  I currently work here
                </label>

                {/* Salary */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Monthly Salary (INR)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={exp.salary}
                      onChange={(e) =>
                        updateExperience(index, "salary", e.target.value)
                      }
                      placeholder="75000"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preferred Job Titles */}
        <div className="animate-fade-in">
          <h6 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FiBriefcase className="mr-2 text-emerald-500" />
            Preferred Job Titles
          </h6>
          <Select
            isMulti
            options={jobTitleSuggestions}
            value={(alldata.preferred_job_titles || []).map((v) => ({
              value: v,
              label: v,
            }))}
            onChange={handlePreferredJobTitles}
            onInputChange={fetchJobTitles}
            isLoading={isLoadingJobTitles}
            placeholder="Search job titles..."
            maxMenuHeight={200}
            isOptionDisabled={() =>
              (alldata.preferred_job_titles || []).length >= 3
            }
          />
          <p className="text-xs text-gray-500 mt-1">Select up to 3</p>
        </div>

        {/* Preferred Locations */}
        {(alldata.experience_level === "Both" ||
          alldata.experience_level === "Fresher") && (
          <div className="animate-fade-in">
            <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FiMapPin className="mr-2 text-emerald-500" />
              Preferred Locations
            </label>
            <Select
              isMulti
              options={locationSuggestions}
              value={(alldata.preferred_locations || []).map((v) => ({
                value: v,
                label: v,
              }))}
              onChange={handlePreferredLocations}
              onInputChange={fetchLocations}
              isLoading={isLoadingLocations}
              placeholder="Search locations..."
              maxMenuHeight={200}
              isOptionDisabled={() =>
                (alldata.preferred_locations || []).length >= 3
              }
            />
            <p className="text-xs text-gray-500 mt-1">Select up to 3</p>
          </div>
        )}

        {/* ---------- NOTICE PERIOD (Added) ---------- */}
        {alldata.experience_level !== "Fresher" && (
        <div className="space-y-2 animate-fade-in mb-6">
          
          {/* If user has a current job → only show the correct option (disabled) */}
          {hasCurrentJob ? (
           <>
           <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <FiAward className="mr-2 text-blue-500" />
            Notice Period {hasCurrentJob && "(You are currently employed)"}
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
                  className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                    alldata.notice_period === level
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
           
           </>
          ) : (
            /* Normal selectable buttons when NO current job */
            <>
            </>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default Three;
"use client";
import React, { useState, useEffect } from "react";
import { FiBook, FiAward } from "react-icons/fi";
import Select from "react-select";

const Second = ({ alldata = {}, handelinputs, errors }) => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const EducationLvl = [
    { name: "10th", value: 5 },
    { name: "12th", value: 6 },
    { name: "Diploma", value: 7 },
    { name: "ITI", value: 3 },
    { name: "Graduate", value: 1 },
    { name: "Post Graduate", value: 2 },
  ];

  const experienceLevelOptions = [
    { value: "Fresher", label: "Fresher" },
    { value: "Experienced", label: "Experienced" },
  ];

  const [eduLvl, setEduLvl] = useState(() => {
    const foundLevel = alldata.highest_education
      ? EducationLvl.find((lvl) => lvl.name === alldata.highest_education)
      : null;
    return foundLevel ? foundLevel.value : null;
  });
  const [specializations, setSpecializations] = useState([]);
  const [loadingQualifications, setLoadingQualifications] = useState(false);
  const [loadingSpecializations, setLoadingSpecializations] = useState(false);
  const [error, setError] = useState(null);

  // Fetch qualifications based on highest education level
  useEffect(() => {
    const fetchQualifications = async () => {
      if (!eduLvl || ["5", "6"].includes(eduLvl.toString())) {
        setQualifications([]);
        handelinputs({ target: { name: "education_level", value: "" } });
        handelinputs({ target: { name: "specialization", value: "" } });
        setSpecializations([]);
        setLoading(false);
        return;
      }
      setLoadingQualifications(true);
      setError(null);
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(
          `${apiUrl}/api/v1/qualifications/education-level/${eduLvl}`
        );
        if (!response.ok) throw new Error("Failed to fetch qualifications");
        const data = await response.json();
        if (data.status !== "success")
          throw new Error(data.message || "Failed to fetch qualifications");
        setQualifications(data.data || []);
      } catch (err) {
        setError("Error fetching qualifications. Please try again.");
        console.error(err);
      } finally {
        setLoadingQualifications(false);
        setLoading(false);
      }
    };
    fetchQualifications();
  }, [eduLvl, handelinputs]);

  // Fetch specializations based on selected qualification
  useEffect(() => {
    const fetchSpecializations = async () => {
      if (!alldata.education_level || ["5", "6"].includes(eduLvl.toString())) {
        setSpecializations([]);
        return;
      }
      setLoadingSpecializations(true);
      setError(null);
      try {
        const selectedQualification = qualifications.find(
          (q) => q.title === alldata.education_level
        );
        if (!selectedQualification) {
          setSpecializations([]);
          return;
        }
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(
          `${apiUrl}/api/v1/qualifications/${selectedQualification.id}/specializations`
        );
        if (!response.ok) throw new Error("Failed to fetch specializations");
        const data = await response.json();
        if (data.status !== "success")
          throw new Error(data.message || "Failed to fetch specializations");
        setSpecializations(data.data.specializations || []);
      } catch (err) {
        setError("Error fetching specializations. Please try again.");
        console.error(err);
      } finally {
        setLoadingSpecializations(false);
      }
    };
    fetchSpecializations();
  }, [alldata.education_level, qualifications, eduLvl]);

  // Handle the highest education level change
  const handleEducationLevelChange = (selectedOption) => {
    const level = selectedOption ? selectedOption.value : null;
    const name = selectedOption ? selectedOption.label : "";
    setEduLvl(level);
    handelinputs({ target: { name: "highest_education", value: name } });
    setSpecializations([]); // Reset specializations on education level change
    if (["10th", "12th"].includes(name)) {
      handelinputs({ target: { name: "education_level", value: "" } });
      handelinputs({ target: { name: "specialization", value: "" } });
      handelinputs({ target: { name: "college_name", value: "" } });
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Options for react-select
  const educationLevelOptions = EducationLvl.map((data) => ({
    value: data.value,
    label: data.name,
  }));

  const qualificationOptions = qualifications.map((program) => ({
    value: program.title,
    label: program.title,
  }));

  const specializationOptions = specializations.map((spec) => ({
    value: spec.title,
    label: spec.title,
  }));

  const schoolMediumOptions = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "Other",
  ].map((medium) => ({
    value: medium,
    label: medium,
  }));

  const monthOptions = months.map((month) => ({
    value: month,
    label: month,
  }));

  // Validate year of completion
  const handleYearChange = (e) => {
    const value = e.target.value;
    const currentYear = new Date().getFullYear();
    if (alldata.currently_pursuing === "No" && value > currentYear) {
      setError(
        "Completion year cannot be in the future for completed education."
      );
      return;
    }
    handelinputs(e);
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  console.log("errors", errors);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#d1d5db",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      "&:hover": {
        borderColor: "#10b981",
      },
      boxShadow: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#10b981"
        : state.isFocused
        ? "#ecfdf5"
        : null,
      color: state.isSelected ? "white" : "#374151",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      marginTop: "0.25rem",
      zIndex: 9999, // Add this to ensure the dropdown menu appears above other elements
    }),
  };

  return (
    <div className="w-full p-4 lg:p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-lg mr-4">
          <FiBook className="text-blue-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Education Details
          </h2>
          <p className="text-gray-500 text-sm">
            Fill in your academic information
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 text-red-500 text-sm flex items-center">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-4 text-blue-500 underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="space-y-6">
        {/* Currently Pursuing Toggle */}
        <div className="space-y-2 animate-fade-in">
          <label className="flex items-center text-sm font-medium text-gray-700">
            Are You Currently Pursuing Your Education?
          </label>
          <div className="flex space-x-2">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  handelinputs({
                    target: { name: "currently_pursuing", value: option },
                  })
                }
                className={`px-4 py-2 rounded-full border ${
                  alldata.currently_pursuing === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                } transition-all duration-200`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Education Level Dropdown */}
        <div className="space-y-2 animate-fade-in">
          <label
            htmlFor="highest-education-select"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <FiBook className="mr-2 text-blue-500" />
            {alldata.currently_pursuing === "Yes"
              ? "Currently Pursuing"
              : "Highest Education Level"}
          </label>
          <Select
            inputId="highest-education-select"
            options={educationLevelOptions}
            value={educationLevelOptions.find(
              (option) => option.label === alldata.highest_education
            )}
            onChange={handleEducationLevelChange}
            placeholder={
              alldata.currently_pursuing === "Yes"
                ? "Select Current Education Level"
                : "Select Highest Education Level"
            }
            className="w-full"
  
              styles={customStyles}


  menuPortalTarget={document.body} 
          />
        </div>

        {alldata.highest_education && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["10th", "12th"].includes(alldata.highest_education) ? (
              <>
                {/* School Medium Dropdown */}
                <div className="space-y-2 animate-fade-in">
                  <label
                    htmlFor="school-medium-select"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FiBook className="mr-2 text-blue-500" />
                    School Medium
                  </label>
                  <Select
                    inputId="school-medium-select"
                    options={schoolMediumOptions}
                    value={schoolMediumOptions.find(
                      (option) => option.value === alldata.school_medium
                    )}
                    onChange={(selected) =>
                      handelinputs({
                        target: {
                          name: "school_medium",
                          value: selected ? selected.value : "",
                        },
                      })
                    }
                    placeholder="Select School Medium"
                    className="w-full"
            
                  />
                </div>

                {/* Year of Completion */}
                <div className="space-y-2 animate-fade-in">
                  <label
                    htmlFor="complete-years"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FiAward className="mr-2 text-blue-500" />

                    {alldata.currently_pursuing === "Yes"
                      ? "Year of Completion (Expacted)"
                      : "Year of Completion "}
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 2023"
                    id="complete-years"
                    name="complete_years"
                    value={alldata.complete_years || ""}
                    onChange={handleYearChange}
                    min="1900"
                    max={new Date().getFullYear() + 5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    disabled={alldata.currently_pursuing === "Yes"}
                  />
                </div>

                {/* Completion Month Dropdown */}
                <div className="space-y-2 animate-fade-in">
                  <label
                    htmlFor="complete-month-select"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FiAward className="mr-2 text-blue-500" />
                    Completion Month
                  </label>
                  <Select
                    inputId="complete-month-select"
                    options={monthOptions}
                    value={monthOptions.find(
                      (option) => option.value === alldata.complete_month
                    )}
                    onChange={(selected) =>
                      handelinputs({
                        target: {
                          name: "complete_month",
                          value: selected ? selected.value : "",
                        },
                      })
                    }
                    styles={customStyles}
                    className="w-full text-gray-700"
                    menuPortalTarget={document.body}
                    placeholder="Select Month"
                    classNamePrefix="react-select"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Degree Program Dropdown */}
                <div className="space-y-2 animate-fade-in">
                  <label
                    htmlFor="degree-program-select"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FiAward className="mr-2 text-blue-500" />
                    Degree Program
                  </label>
                  <Select
                    inputId="degree-program-select"
                    options={qualificationOptions}
                    value={qualificationOptions.find(
                      (option) => option.value === alldata.education_level
                    )}
                    onChange={(selected) =>
                      handelinputs({
                        target: {
                          name: "education_level",
                          value: selected ? selected.value : "",
                        },
                      })
                    }
                    placeholder={
                      loadingQualifications
                        ? "Loading..."
                        : "Select Degree Program"
                    }
                    classNamePrefix="react-select"
                    styles={customStyles}
                    className="w-full text-gray-700"
                    menuPortalTarget={document.body}
                  />
                </div>

                {/* Specialization Dropdown */}
                <div className="space-y-2 animate-fade-in">
                  <label
                    htmlFor="specialization-select"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FiAward className="mr-2 text-blue-500" />
                    Specialization
                  </label>
                  <Select
                    inputId="specialization-select"
                    options={specializationOptions}
                    value={specializationOptions.find(
                      (option) => option.value === alldata.specialization
                    )}
                    onChange={(selected) =>
                      handelinputs({
                        target: {
                          name: "specialization",
                          value: selected ? selected.value : "",
                        },
                      })
                    }
                    placeholder={
                      loadingSpecializations
                        ? "Loading..."
                        : "Select Specialization"
                    }
                    classNamePrefix="react-select"
                    styles={customStyles}
                    className="w-full text-gray-700"
                    menuPortalTarget={document.body}
                    isDisabled={
                      loadingSpecializations || !alldata.education_level
                    }
                  />
                </div>

                {/* University/School Name Field */}
                <div className="space-y-2 animate-fade-in">
                  <label
                    htmlFor="college-name"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FiBook className="mr-2 text-blue-500" />
                    University/School Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Harvard University"
                    id="college-name"
                    name="college_name"
                    value={alldata.college_name || ""}
                    onChange={handelinputs}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>

                {/* Year of Completion */}
                <div className="space-y-2 animate-fade-in">
                  <label
                    htmlFor="complete-years"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FiAward className="mr-2 text-blue-500" />
                    {alldata.currently_pursuing === "Yes"
                      ? "Year of Completion (Expacted)"
                      : "Year of Completion "}
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 2023"
                    id="complete-years"
                    name="complete_years"
                    value={alldata.complete_years || ""}
                    onChange={handleYearChange}
                    min="1900"
                    max={new Date().getFullYear() + 5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>

                {/* Completion Month Dropdown */}
                <div className="space-y-2 animate-fade-in">
                  <label
                    htmlFor="complete-month-select"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FiAward className="mr-2 text-blue-500" />
                    Completion Month
                  </label>
                  <Select
                    inputId="complete-month-select"
                    options={monthOptions}
                    value={monthOptions.find(
                      (option) => option.value === alldata.complete_month
                    )}
                    onChange={(selected) =>
                      handelinputs({
                        target: {
                          name: "complete_month",
                          value: selected ? selected.value : "",
                        },
                      })
                    }
          
                    className="w-full"
                    classNamePrefix="react-select"
                       styles={customStyles}
        
                    menuPortalTarget={document.body}
                    placeholder="Select Month"

                    isDisabled={alldata.currently_pursuing === "Yes"}
                  />
                </div>

                {/* School Medium Dropdown */}
                <div className="space-y-2 animate-fade-in">
                  <label
                    htmlFor="school-medium-select"
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    <FiBook className="mr-2 text-blue-500" />
                    School Medium
                  </label>
                  <Select
                    inputId="school-medium-select"
                    styles={customStyles}
                    className="w-full text-gray-700"
                    menuPortalTarget={document.body}
                    options={schoolMediumOptions}
                    value={schoolMediumOptions.find(
                      (option) => option.value === alldata.school_medium
                    )}
                    onChange={(selected) =>
                      handelinputs({
                        target: {
                          name: "school_medium",
                          value: selected ? selected.value : "",
                        },
                      })
                    }
                    placeholder="Select School Medium"
                    classNamePrefix="react-select"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Second;

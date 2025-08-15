"use client";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { HiQuestionMarkCircle, HiTemplate } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { BiCurrentLocation } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

export default function Page() {
  const steps = [
    { id: 1, label: "Job details" },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  const [activeStep, setActiveStep] = useState(1);

  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Facebook",
    "Apple",
    "Netflix",
    "Tesla",
  ];
  const [company, setCompany] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCompanies = companies.filter((item) =>
    item.toLowerCase().includes(company.toLowerCase())
  );

  const handleSelect = (name) => {
    setCompany(name);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setCompany("");
    setShowDropdown(false);
  };

  const jobTitles = [
    "Software Engineer",
    "Accountant",
    "HR Manager",
    "Sales Executive",
    "Marketing Manager",
    "Data Analyst",
    "Graphic Designer",
    "Product Manager",
  ];

  const [jobInput, setJobInput] = useState("");
  const [showJobDropdown, setShowJobDropdown] = useState(false);

  const filteredJobs = jobTitles.filter((job) =>
    job.toLowerCase().includes(jobInput.toLowerCase())
  );

  const handleJobSelect = (job) => {
    setJobInput(job);
    setShowJobDropdown(false);
  };

  const jobCategories = [
    "Accountant",
    "Software Engineer",
    "Sales Executive",
    "Graphic Designer",
    "HR Manager",
    "Marketing Specialist",
    "Customer Support",
  ];

  const [jobCategoryInput, setJobCategoryInput] = useState("");
  const [showJobCategoryDropdown, setShowJobCategoryDropdown] = useState(false);

  const filteredJobCategories = jobCategories.filter((job) =>
    job.toLowerCase().includes(jobCategoryInput.toLowerCase())
  );

  const handleJobCategorySelect = (job) => {
    setJobCategoryInput(job);
    setShowJobCategoryDropdown(false);
  };

  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedTimeType, setSelectedTimeType] = useState("");

  const [locationInput, setLocationInput] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const locationSuggestions = [
    "Koramangala",
    "Indiranagar",
    "Whitefield",
    "HSR Layout",
    "Electronic City",
    "Jayanagar",
    "Marathahalli",
  ];

  const filteredLocations = locationSuggestions.filter((loc) =>
    loc.toLowerCase().includes(locationInput.toLowerCase())
  );

  const handleLocationSelect = (loc) => {
    setLocationInput(loc);
    setShowLocationDropdown(false);
  };

  const clearInput = () => {
    setLocationInput("");
    setShowLocationDropdown(false);
  };

  const [cityInput, setCityInput] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const citySuggestions = [
    "Bangalore",
    "Delhi",
    "Mumbai",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
  ];

  const filteredCities = citySuggestions.filter((city) =>
    city.toLowerCase().includes(cityInput.toLowerCase())
  );

  const handleCitySelect = (city) => {
    setCityInput(city);
    setShowCityDropdown(false);
  };

  const clearCityInput = () => {
    setCityInput("");
    setShowCityDropdown(false);
  };

  const [selectedSalaryType, setSelectedSalaryType] = useState("");

  const [selectedBenefits, setSelectedBenefits] = useState([]);

  const toggleBenefit = (benefit) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefit)
        ? prev.filter((item) => item !== benefit)
        : [...prev, benefit]
    );
  };

  const benefits = [
    "Flexible Working Hours",
    "Weekly Payout",
    "Overtime Pay",
    "Joining Bonus",
    "Annual Bonus",
    "PF",
    "Travel Allowance (TA)",
    "Petrol Allowance",
    "Mobile Allowance",
    "Internet Allowance",
    "Laptop",
    "Health Insurance",
    "ESI (ESIC)",
    "Food/Meals",
    "Accommodation",
  ];

  const [addPerk, setaddPerk] = useState(false);

  const [joiningFees, setJoiningFees] = useState(false);

  const [feeFor, setfeesFor] = useState("");

  const chargeTimingArray = [
    { label: "Before the interview", value: "Before Interview", tag: "Popular" },
    { label: "After job confirmation", value: "After Job Confirmation", tag: "Popular" },
    { label: "Deducted from salary", value: "From Salary", tag: "Popular" }
  ];

  const [freeBePaid,setfreeBePaid]=useState("")
  return (
    <>
      <div className="px-5 md:px-12 xl:px-32 py-4 bg-gray-100 shadow-md">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
            <FaArrowLeftLong className="text-base" />
            <span>Post a Job</span>
          </div>
          <div className="flex items-center gap-5 text-sm md:text-base font-medium text-gray-700">
            <button className="flex items-center gap-2 hover:text-[#02325a] transition">
              <HiQuestionMarkCircle className="text-lg" />
              Support
            </button>
            <button className="p-2 rounded hover:bg-gray-200 transition">
              <RxCross2 className="text-xl" />
            </button>
          </div>
        </header>
      </div>

      <div className="px-5 md:px-12 xl:px-32 bg-[#F3F2EF] py-6 md:py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h5 className="text-gray-700 text-lg lg:text-xl font-semibold">
            Post a new job
          </h5>
          <button className="flex items-center gap-x-1 border border-gray-300 p-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200 transition">
            <HiTemplate />
            Use a Template
          </button>
        </div>

        <div className="flex items-center justify-between bg-white py-4 px-4 rounded-md shadow-sm relative overflow-hidden">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex-1 flex gap-x-2 flex-row items-center relative"
            >
              {/* Step Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium z-10
                  ${
                    activeStep === step.id
                      ? "bg-gray-700 text-white"
                      : activeStep > step.id
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-500"
                  }`}
              >
                {step.id}
              </div>

              {/* Step Label */}
              {step.label && (
                <span className=" text-sm font-medium text-gray-700">
                  {step.label}
                </span>
              )}

              {/* Connector Line */}
              {idx !== steps.length - 1 && (
                <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-300 z-0 translate-x-1/2" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-5">
          <div className="space-y-2">
            <h6 className="text-base font-semibold">Job Details</h6>
            <p className="text-sm text-gray-500">
              We use this information to find the best candidates for the job.
            </p>
            <p className="text-xs text-red-500">*Marked fields are mandatory</p>
          </div>

          <div className="flex items-center gap-x-4">
            <h6 className="text-sm font-medium text-gray-700">
              Company you belong to{" "}
              <span className="font-semibold">dummy Pro</span> (Consultancy)
            </h6>
            <button className="text-[#00223f] font-medium text-sm hover:underline">
              Change
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company input */}
            <div className="flex flex-col space-y-1 relative">
              <label className="text-sm font-medium">
                Company you're hiring for *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    setShowDropdown(true);
                  }}
                  placeholder="Select Company"
                  className="w-full border rounded-md p-2 pr-8 text-sm outline-none focus:ring-2 ring-blue-300"
                />
                {company && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500"
                  >
                    <RxCross2 />
                  </button>
                )}
              </div>

              {showDropdown && filteredCompanies.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm max-h-48 overflow-y-auto text-sm">
                  {filteredCompanies.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(item)}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Job Title */}
            <div className="flex flex-col space-y-1 relative">
              <label className="text-sm font-medium">
                Job Title / Designation *
              </label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Eg. Accountant"
                  value={jobInput}
                  onChange={(e) => {
                    setJobInput(e.target.value);
                    setShowJobDropdown(true);
                  }}
                  onFocus={() => setShowJobDropdown(true)}
                  className="w-full border rounded-md p-2 pr-8 text-sm outline-none focus:ring-2 ring-blue-300"
                />
                {jobInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setJobInput("");
                      setShowJobDropdown(false);
                    }}
                    className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500"
                  >
                    <RxCross2 />
                  </button>
                )}
              </div>

              {showJobDropdown && jobInput && filteredJobs.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto text-sm">
                  {filteredJobs.map((job, index) => (
                    <li
                      key={index}
                      onClick={() => handleJobSelect(job)}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {job}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-1 relative">
            <label className="text-sm font-medium">
              Job Title / Category *
            </label>

            <div className="relative">
              <input
                type="text"
                placeholder="Eg. Accountant"
                value={jobCategoryInput}
                onChange={(e) => {
                  setJobCategoryInput(e.target.value);
                  setShowJobCategoryDropdown(true);
                }}
                onFocus={() => setShowJobCategoryDropdown(true)}
                className="w-full border rounded-md p-2 pr-8 text-sm outline-none focus:ring-2 ring-blue-300"
              />
              {jobCategoryInput && (
                <button
                  type="button"
                  onClick={() => {
                    setJobCategoryInput("");
                    setShowJobCategoryDropdown(false);
                  }}
                  className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500"
                >
                  <RxCross2 />
                </button>
              )}
            </div>

            {showJobCategoryDropdown &&
              jobCategoryInput &&
              filteredJobCategories.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto text-sm">
                  {filteredJobCategories.map((job, index) => (
                    <li
                      key={index}
                      onClick={() => handleJobCategorySelect(job)}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {job}
                    </li>
                  ))}
                </ul>
              )}
          </div>

          {/* Type of Job */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type of Job *</label>
            <div className="flex flex-wrap gap-3">
              {["Full time", "Part time", "Both (Full-Time And Part-Time)"].map(
                (type, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTimeType(type)}
                    className={`py-1 px-4 border rounded-full text-sm transition-colors duration-200
            ${
              selectedTimeType === type
                ? "bg-[#005F3E] text-white border-green-700"
                : "hover:bg-gray-100"
            }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
            <div className="flex items-center gap-x-2 mt-2">
              <input type="checkbox" id="nightShift" />
              <label htmlFor="nightShift" className="text-sm text-gray-700">
                This is a night shift job
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4">
          <div>
            <h6 className="text-base font-semibold">Location</h6>
            <p className="text-xs text-gray-500">
              Let candidates know where they will be working from.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Work Location Type *</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["Work from Office", "Work from Home", "Field Job"].map(
                (type, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedJobType(type)}
                    className={`py-1 px-4 border rounded-full text-sm transition-colors duration-200
            ${
              selectedJobType === type
                ? "bg-[#005F3E] text-white border-green-700"
                : "hover:bg-gray-100"
            }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
            <div>
              {selectedJobType == "Work from Office" && (
                <div className="mt-4">
                  <label className="text-sm font-medium">
                    Office address / landmark *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for your address/locality"
                      value={locationInput}
                      onChange={(e) => {
                        setLocationInput(e.target.value);
                        setShowLocationDropdown(true);
                      }}
                      onFocus={() => setShowLocationDropdown(true)}
                      className="w-full border rounded-md p-2 pr-8 text-sm outline-none focus:ring-2 ring-blue-300"
                    />

                    {locationInput && (
                      <button
                        type="button"
                        onClick={clearInput}
                        className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500"
                      >
                        <RxCross2 />
                      </button>
                    )}

                    {showLocationDropdown &&
                      locationInput &&
                      filteredLocations.length > 0 && (
                        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto text-sm">
                          {filteredLocations.map((loc, index) => (
                            <li
                              key={index}
                              onClick={() => handleLocationSelect(loc)}
                              className="p-2 hover:bg-blue-100 cursor-pointer"
                            >
                              {loc}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>

                  {!locationInput && (
                    <button className="bg-[#1F8268] text-white rounded-lg mt-4 px-5 py-2 flex items-center gap-x-2">
                      <BiCurrentLocation />
                      Use my current Location
                    </button>
                  )}
                </div>
              )}
              {selectedJobType == "Work from Home" && (
                <div className="mt-4">
                  <label className="text-sm font-medium">Job City *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select City"
                      value={cityInput}
                      onChange={(e) => {
                        setCityInput(e.target.value);
                        setShowCityDropdown(true);
                      }}
                      onFocus={() => setShowCityDropdown(true)}
                      className="w-full border rounded-md p-2 pr-8 text-sm outline-none focus:ring-2 ring-blue-300"
                    />

                    {cityInput && (
                      <button
                        type="button"
                        onClick={clearCityInput}
                        className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500"
                      >
                        <RxCross2 />
                      </button>
                    )}

                    {showCityDropdown &&
                      cityInput &&
                      filteredCities.length > 0 && (
                        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto text-sm">
                          {filteredCities.map((city, index) => (
                            <li
                              key={index}
                              onClick={() => handleCitySelect(city)}
                              className="p-2 hover:bg-blue-100 cursor-pointer"
                            >
                              {city}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </div>
              )}

              {selectedJobType == "Field Job" && (
                <div className="mt-4">
                  <label className="text-sm font-medium">
                    Which area will the candidates be working in ? *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for your address/locality"
                      value={locationInput}
                      onChange={(e) => {
                        setLocationInput(e.target.value);
                        setShowLocationDropdown(true);
                      }}
                      onFocus={() => setShowLocationDropdown(true)}
                      className="w-full border rounded-md p-2 pr-8 text-sm outline-none focus:ring-2 ring-blue-300"
                    />

                    {locationInput && (
                      <button
                        type="button"
                        onClick={clearInput}
                        className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500"
                      >
                        <RxCross2 />
                      </button>
                    )}

                    {showLocationDropdown &&
                      locationInput &&
                      filteredLocations.length > 0 && (
                        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto text-sm">
                          {filteredLocations.map((loc, index) => (
                            <li
                              key={index}
                              onClick={() => handleLocationSelect(loc)}
                              className="p-2 hover:bg-blue-100 cursor-pointer"
                            >
                              {loc}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                  {!locationInput && (
                    <button className="bg-[#1F8268] text-white rounded-lg mt-4 px-5 py-2 flex items-center gap-x-2">
                      <BiCurrentLocation />
                      Use my current Location
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4">
          <div>
            <h6 className="text-base font-semibold">Compensation</h6>
            <p className="text-xs text-gray-500">
              Job postings with right salary & incentives will help you find the
              right candidates.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">
              What is the pay type? *
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["Fixed Only", "Fixed + Incentive", "Incentive only"].map(
                (type, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSalaryType(type)}
                    className={`py-1 px-4 border rounded-full text-sm 
            ${
              selectedSalaryType === type
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>

            {selectedSalaryType == "Fixed Only" && (
              <div className="mt-4">
                <label className="text-sm font-semibold">
                  Fixed salary / month *
                </label>
                <div className="flex  mt-2 gap-x-2 flex-col items-center lg:flex-row lg:w-[50%]">
                  <input
                    type="text"
                    placeholder="minium fixes slaary"
                    className="w-full border rounded-md p-2 pr-8 text-sm outline-none focus:ring-2 ring-blue-300"
                  />
                  <span className="bg-gray-100 "> to</span>
                  <input
                    type="text"
                    placeholder="maximum fixed salary"
                    className="w-full border rounded-md p-2 pr-8 text-sm outline-none focus:ring-2 ring-blue-300"
                  />
                </div>
                <div></div>
              </div>
            )}
            {selectedSalaryType == "Fixed + Incentive" && (
              <div className="mt-4">
                <label className="text-sm font-semibold block mb-2">
                  Fixed salary / month (excluding incentives) *
                </label>

                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 lg:w-[80%]">
                  <input
                    type="text"
                    placeholder="Minimum fixed salary"
                    className="w-full border rounded-md p-2 text-sm outline-none focus:ring-2 ring-blue-300"
                  />

                  <span className="text-gray-500">to</span>

                  <input
                    type="text"
                    placeholder="Maximum fixed salary"
                    className="w-full border rounded-md p-2 text-sm outline-none focus:ring-2 ring-blue-300"
                  />

                  <span className="text-gray-500">+</span>

                  <div className="w-full">
                    <label className="text-sm font-medium block mb-1">
                      Average Incentive / month *
                    </label>
                    <input
                      type="text"
                      placeholder="Eg. 2000"
                      className="w-full border rounded-md p-2 text-sm outline-none focus:ring-2 ring-blue-300"
                    />
                  </div>
                </div>
              </div>
            )}
            {selectedSalaryType == "Incentive only" && (
              <div className="w-[70%] mt-4">
                <label className="text-sm font-bold block mb-1">
                  Average Incentive / month *
                </label>
                <input
                  type="text"
                  placeholder="Eg. 2000"
                  className="w-full border rounded-md p-2 text-sm outline-none focus:ring-2 ring-blue-300"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">
              Do you offer any additional perks ?
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {benefits.map((type, i) => {
                const isSelected = selectedBenefits.includes(type);
                return (
                  <button
                    key={i}
                    onClick={() => toggleBenefit(type)}
                    className={`py-1 flex items-center gap-x-2 px-4 border rounded-full text-sm ${
                      isSelected
                        ? "bg-[#005F3E] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {type}
                    <span>{isSelected ? <FaCheck /> : <FaPlus />}</span>
                  </button>
                );
              })}
            </div>
            {addPerk ? (
              <div className="mt-4 w-full lg:w-[40%]">
                <label className="text-sm font-bold block mb-1">
                  Add Other perks
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Add other perks separated by comma"
                    className="w-full border rounded-md p-2 pr-16 text-sm outline-none focus:ring-2 ring-blue-300"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-green-800 px-3 py-1 rounded-md text-sm  font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setaddPerk(true)}
                className="flex mt-4 items-center gap-x-2 text-[#00223f] text-sm font-semibold"
              >
                {" "}
                <FaPlus /> Add Other perks
              </button>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">
              Is there any joining fee or deposit required from the candidate? *
            </label>

            <div className="flex items-center gap-x-2 mt-4">
              <button
                onClick={() => setJoiningFees(true)}
                className="py-1 flex items-center gap-x-2 px-4 border rounded-full text-sm hover:bg-gray-100"
              >
                Yes
              </button>
              <button
                onClick={() => setJoiningFees(false)}
                className="py-1 flex items-center gap-x-2 px-4 border rounded-full text-sm hover:bg-gray-100"
              >
                No
              </button>
            </div>

            {joiningFees && (
              <>
                <div className="mt-4 w-full lg:w-[40%]">
                  <label className="text-sm font-bold block mb-1">
                    Fee amount *
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="₹ 1000"
                      className="w-full border rounded-md p-2 pr-16 text-sm outline-none focus:ring-2 ring-blue-300"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium">
                    What is this fee for? *
                  </label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {[
                      "Asset/ Inventory Charge",
                      "Security deposit( Refundable)",
                      "Registration/ Training Fees",
                      "Commission",
                      "IRDA Exam",
                      "Other Reason",
                    ].map((type, i) => (
                      <button
                        key={i}
                        onClick={() => setfeesFor(type)}
                        className={`py-1 px-4 border rounded-full text-sm 
            ${
              feeFor === type ? "bg-green-700 text-white" : "hover:bg-gray-100"
            }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium">
                  When should the fee be paid? *
                  </label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {chargeTimingArray.map((elm, i) => (
                      <button
                        key={i}
                        onClick={() => setfreeBePaid(elm.label)}
                        className={`py-1 px-4 border rounded-full text-sm 
            ${
              freeBePaid === elm.label ? "bg-green-700 text-white" : "hover:bg-gray-100"
            }`}
                      >
                        {elm.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4 flex justify-center items-center">
          <button className="px-5 rounded-sm py-2 text-white font-semibold bg-[#005F3E] ">
            {" "}
            continue
          </button>
        </div>
      </div>
    </>
  );
}

"use client";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { HiQuestionMarkCircle, HiTemplate } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";

export default function Page() {
  const steps = [
    { id: 1 },
    { id: 2, label: "Candidate  Requirement" },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  const [activeStep, setActiveStep] = useState(1);

  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedEnglishLever, setselectedEnglishLever] = useState(null);
  const [selectExperience, setSelectExperience] = useState(null);

  const [activeFilters, setActiveFilters] = useState({});

  const filters = ["Gender", "Age", "Distance", "Regional Language", "Skills"];

  const handleToggle = (type) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const [genderType, setGenderType] = useState(null);
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
                <span className=" text-base font-bold text-gray-700">
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

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-3">
          <div className="space-y-2">
            <h6 className="text-base font-semibold">Basic Requirements</h6>
            <p className="text-sm text-gray-500">
              We’ll use these requirement details to make your job visible to
              the right candidates.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Minimum Education *
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                "10th or Below 10th",
                "12th pass",
                "Diploma",
                "ITI",
                "Graduate",
                "post Graduate",
              ].map((type, i) => (
                <button
                  onClick={() => setSelectedEducation(i)}
                  key={i}
                  className={`py-1 px-4 border rounded-full text-sm 
            ${
              selectedEducation === i
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">
              English level required *
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["No English", "Basic English", "Good English"].map(
                (type, i) => (
                  <button
                    onClick={() => setselectedEnglishLever(i)}
                    key={i}
                    className={`py-1 px-4 border rounded-full text-sm 
            ${
              selectedEnglishLever === i
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">
              Total experience required *
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["Any", "Experience Only", "Fresher Only"].map((type, i) => (
                <button
                  onClick={() => setSelectExperience(i)}
                  key={i}
                  className={`py-1 px-4 border rounded-full text-sm 
            ${
              selectExperience === i
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4">
          <div>
            <h6 className="text-base font-semibold">
              Additional Requirements (Optional)
            </h6>
            <p className="text-xs text-gray-500">
              Add additional requirement so that we can help you find the right
              candidates{" "}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-3">
              {filters.map((type, i) => (
                <div key={i} className="flex flex-col gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleToggle(type)}
                    className={`py-1 px-4 border flex items-center gap-x-2 rounded-full text-sm transition-all ${
                      activeFilters[type]
                        ? "bg-green-700 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {type}
                    <span>
                      <FaPlus />
                    </span>
                  </button>

                  {activeFilters[type] && (
                    <div className="mt-2 px-4 py-2 borde-t bg-gray-50 rounded-lg text-sm">
                      {type === "Gender" && (
                        <>
                          <label className="text-sm font-semibold text-gray-600">
                            Gender
                          </label>
                          <div className="flex gap-2 mt-2">
                            {["Both", "Male", "Female"].map((gType, i) => (
                              <button
                                key={i}
                                onClick={() => setGenderType(gType)}
                                className={`py-1 px-4 border rounded-full text-sm transition-all ${
                                  genderType === gType
                                    ? "bg-green-700 text-white"
                                    : "hover:bg-gray-100"
                                }`}
                              >
                                {gType}
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                  <div className="flex flex-col gap-y-4">
                  {type === "Age" && (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Min Age"
                            className="border px-2 py-1 rounded"
                          />
                          <input
                            type="number"
                            placeholder="Max Age"
                            className="border px-2 py-1 rounded"
                          />
                        </div>
                      )}

                      {type === "Distance" && (
                        <input
                          type="range"
                          min="1"
                          max="100"
                          className="w-full"
                        />
                      )}

                      {type === "Regional Language" && (
                        <select className="w-full border px-2 py-1 rounded">
                          <option>Hindi</option>
                          <option>Punjabi</option>
                          <option>Marathi</option>
                          <option>Bengali</option>
                        </select>
                      )}

                      {type === "Skills" && (
                        <input
                          type="text"
                          placeholder="e.g., Sales, Teaching"
                          className="w-full border px-2 py-1 rounded"
                        />
                      )}
                  </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4">
          <div>
            <h6 className="text-base font-semibold">Job Description</h6>
            <p className="text-xs text-gray-500">
              Describe the responsibilities of this job and other specific
              requirements here.
            </p>
          </div>

          <div className="mt-4 border">
            <div></div>
          </div>
        </div>

        <div className="bg-white flex gap-x-4 rounded-md shadow-sm py-5 px-4 justify-center items-center">
          <button className="w-32 rounded-sm py-2 text-white font-semibold bg-[#005F3E]">
            Back
          </button>
          <button className="w-32 rounded-sm py-2 text-white font-semibold bg-[#005F3E]">
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

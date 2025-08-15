"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Page() {
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const education = [
    { label: "10th or below 10" },
    { label: "12th pass" },
    { label: "Diploma" },
    { label: "ITI" }, // Removed extra spaces
    { label: "Graduate" },
    { label: "Post Graduate" }, // Fixed inconsistent casing
  ];

  const [pursing, setPurSing] = useState("");

  console.log(pursing, "check");

  const handleNext = () => {
   
    router.push("/candidate-login/job-type");
  };


  return (
    <div className="bg-[#e8e7ea] px-5 md:px-12 xl:px-32 py-8 lg:py-12">
      <div className="w-full xl:h-[87vh] lg:w-[85%] mx-auto flex flex-col lg:flex-row  lg:items-start gap-8">
        {/* Left Section */}
        <div className="w-full  flex flex-row lg:flex-1/2 gap-4 h-full">
          <div className="flex flex-col  flex-1 h-full ">
            <img
              src="https://cdn.apna.co/cloudinary/OnboardingV3NonJobContextBanner.png"
              alt="job"
              className="rounded-3xl  object-center h-full w-full"
            />
            <img
              src="https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/OnboardingV3CompanyLogo.png"
              alt="job"
              className="mx-auto mt-4 h-auto"
            />
          </div>
          <div className=" hidden md:flex lg:hidden  flex-col flex-1 h-full ">
            <img
              src="https://cdn.apna.co/cloudinary/OnboardingV3NonJobContextBanner.png"
              alt="job"
              className="rounded-3xl object-cover object-center h-full w-full max-h-[250px] md:max-h-[420px] lg:max-h-[100px]"
            />
            <img
              src="https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/OnboardingV3CompanyLogo.png"
              alt="job"
              className="mx-auto mt-4 h-auto"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full  flex  flex-col justify-between bg-white rounded-3xl shadow-lg  ">
          <div className="p-4 lg:p-6  border-b border-gray-300 flex flex-col sm:flex-row sm:items-center gap-y-4 justify-between">
            <div className="font-semibold text-lg flex items-center gap-x-4">
              <FaArrowLeftLong  onClick={() => router.push("/candidate-login/educations")}  />
              Experience Details
            </div>
            <div className=" w-[250px] bg-gray-400 rounded-2xl p-2 overflow-x-hidden relative">
              <div className="bg-[#309689] w-[35%] h-full absolute left-0 top-0 "></div>
            </div>
          </div>

          <div className="question space-y-4 lg:space-y-4 p-4 lg:p-6  overflow-y-auto  xl:max-h-[500px]">
            <div>
              <h6 className="text-sm font-semibold">
                Do you have work experience?
              </h6>
              <div className="flex items-center gap-x-4 mt-2">
                <button
                  className={`border rounded-full px-5 py-1 text-xs transition ${
                    selected === "yes"
                      ? "bg-[#eaf8f4] text-[#208268]"
                      : "border-gray-400 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelected("yes")}
                >
                  Yes
                </button>
                <button
                  className={`border rounded-full px-5 py-1 text-xs transition ${
                    selected === "no"
                      ? "bg-[#eaf8f4] text-[#208268]"
                      : "border-gray-400 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelected("no")}
                >
                  No
                </button>
              </div>
            </div>

            {selected && (
              <div className="space-y-4">
                <div>
                  <h6 className="text-sm font-semibold">
                    Total Years of Experience
                  </h6>
                  <div className="flex gap-x-4 mt-2 items-center">
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="">Year</label>
                      <select
                        name=""
                        id=""
                        className="w-full py-2 rounded border border-gray-400 focus:border-green-800 px-4"
                      >
                        <option value="">Years</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                        <option value="">9</option>
                        <option value="">10</option>
                        <option value="">11</option>
                        <option value="">12</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="">Months (optional)</label>
                      <select
                        name=""
                        id=""
                        className="w-full py-2 rounded border border-gray-400 focus:border-green-800 px-4"
                      >
                        <option value="">Months</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                        <option value="">9</option>
                        <option value="">10</option>
                        <option value="">11</option>
                        <option value="">12</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className="text-sm font-semibold">Job Title</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <input
                      type="text"
                      placeholder="e.g Teacher"
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    />
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Job Role</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <input
                      type="text"
                      placeholder="Selected up to 10 role of this job"
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    />
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Company Name</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <input
                      type="text"
                      placeholder="e.g Job portal tech"
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    />
                  </div>
                </div>

                <div>
                  <h6 className="text-sm font-semibold">Current Salary</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Amount</option>
                      <option value="">Homepathic Pharmancy</option>
                      <option value="">Industiral Pharmancy</option>
                      <option value="">Pharma</option>
                      <option value="">Pharmaceutical Managment</option>
                      <option value="">Pharmancy</option>
                      <option value="">other</option>
                      <option value="">Pharma</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h6 className="text-sm font-semibold">Start Date</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                  <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Month</option>
                      <option value="">2</option>
                      <option value="">1</option>
                      <option value="">3</option>
                    </select>

                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Year</option>
                      <option value="">2016</option>
                      <option value="">2017</option>
                      <option value="">2018</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 lg:p-6 border-t border-gray-300">
            <button     onClick={handleNext} className="w-full py-3 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

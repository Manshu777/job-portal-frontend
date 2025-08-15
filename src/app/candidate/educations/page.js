"use client";
import React, { useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
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

  const handleNext = () => {
    
 
    router.push("/candidate/experience");
  };


  return (
    <div className="bg-[#e8e7ea] px-5 md:px-12 xl:px-32 py-8 lg:py-12">
      <div className="w-full xl:h-[85vh] lg:w-[85%] mx-auto flex flex-col lg:flex-row  lg:items-start gap-8">
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
          <div>
            <label htmlFor="education">Your Higher Education</label>
            <input  type="text" placeholder="Your Higher Education" id="education" />
          </div>
          
          <div>
            <label htmlFor="year">Passing year</label>
            <input  type="date" placeholder="Passing year" id="year" />
          </div>

          <div>
            <label htmlFor="school">University/School Name</label>
            <input  type="" placeholder="University/School Name" id="school" />
          </div>







          {/* <div className="p-4 border-b border-gray-300 flex flex-col sm:flex-row sm:items-center gap-y-4 justify-between">
            <div className="font-semibold text-lg flex items-center gap-x-4">
              <FaArrowLeftLong className="cursor-pointer"   onClick={() => router.push("/candidate-login/basic-details")} />
              Education Details
            </div>
            <div className=" w-[250px] bg-gray-400 rounded-2xl p-2 overflow-x-hidden relative">
              <div className="bg-[#309689] w-[20%] h-full absolute left-0 top-0 "></div>
            </div>
          </div>

          <div className="question space-y-4 lg:space-y-8 p-4 overflow-y-auto  xl:max-h-[500px]">
            <div>
              <h6 className="text-sm font-semibold">
                Are you currently pursuing your education?
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



                  {selected && ( <div>
              <h6 className="text-sm font-semibold">
                What are you currently pursing?
              </h6>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                {education.map((elm, index) => (
                  <button
                    key={index}
                    onClick={() => setPurSing(elm.label.trim())}
                    className={`${
                      pursing === elm.label.trim()
                        ? "bg-[#eaf8f4] text-[#208268]"
                        : "border-gray-400"
                    } border px-5 py-2 text-xs rounded-full transition`}
                  >
                    {elm.label}
                  </button>
                ))}
              </div>
            </div>
)}  
           
            {pursing == "12th pass" && (
              <div>
                <h6 className="text-sm font-semibold">School medium</h6>

                <div className="flex items-center gap-x-4 mt-2">
                  <select
                    name=""
                    id=""
                    className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                  >
                    <option value="">English</option>
                    <option value="">Hindi</option>
                    <option value="">Punjabi</option>
                  </select>
                </div>
              </div>
            )}
            {pursing == "10th or below 10" && (
              <div>
                <h6 className="text-sm font-semibold">School medium</h6>

                <div className="flex items-center gap-x-4 mt-2">
                  <select
                    name=""
                    id=""
                    className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                  >
                    <option value="">English</option>
                    <option value="">Hindi</option>
                    <option value="">Punjabi</option>
                  </select>
                </div>
              </div>
            )}
            {pursing == "Diploma" && (
              <div className="space-y-4">
                <div>
                  <h6 className="text-sm font-semibold">Degree</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Advance Diploma</option>
                      <option value="">Diploma</option>
                      <option value="">D.Pharma</option>
                      <option value="">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Specialization</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Ayurvedic Pharmancy</option>
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
                  <h6 className="text-sm font-semibold">College Name</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <input
                      type="text"
                      placeholder="e.g St.stephenns"
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    />
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">School medium</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">English</option>
                      <option value="">hindi</option>
                      <option value="">Punjabi</option>
                      <option value="">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {pursing == "ITI" && (
              <div className="space-y-4">
                <div>
                  <h6 className="text-sm font-semibold">Degree</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Advance Diploma</option>
                      <option value="">Diploma</option>
                      <option value="">D.Pharma</option>
                      <option value="">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Specialization</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Ayurvedic Pharmancy</option>
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
                  <h6 className="text-sm font-semibold">College Name</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <input
                      type="text"
                      placeholder="e.g St.stephenns"
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    />
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Completion year (or expected)</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select name="" id=""   className="w-full py-3 border border-gray-400 focus:border-green-800 px-4">
                        <option value="">Month</option>
                    </select>
                    <select name="" id=""   className="w-full py-3 border border-gray-400 focus:border-green-800 px-4">
                        <option value="">year</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">School medium</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">English</option>
                      <option value="">hindi</option>
                      <option value="">Punjabi</option>
                      <option value="">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {pursing == "Graduate" && (
              <div className="space-y-4">
                <div>
                  <h6 className="text-sm font-semibold">Degree</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Advance Diploma</option>
                      <option value="">Diploma</option>
                      <option value="">D.Pharma</option>
                      <option value="">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Specialization</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Ayurvedic Pharmancy</option>
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
                  <h6 className="text-sm font-semibold">College Name</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <input
                      type="text"
                      placeholder="e.g St.stephenns"
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    />
                  </div>
                </div>

                <div>
                  <h6 className="text-sm font-semibold">Completion year (or expected)</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select name="" id=""   className="w-full py-3 border border-gray-400 focus:border-green-800 px-4">
                        <option value="">Month</option>
                    </select>
                    <select name="" id=""   className="w-full py-3 border border-gray-400 focus:border-green-800 px-4">
                        <option value="">year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h6 className="text-sm font-semibold">School medium</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">English</option>
                      <option value="">hindi</option>
                      <option value="">Punjabi</option>
                      <option value="">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {pursing == "Post Graduate" && (
              <div className="space-y-4">
                <div>
                  <h6 className="text-sm font-semibold">Degree</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Advance Diploma</option>
                      <option value="">Diploma</option>
                      <option value="">D.Pharma</option>
                      <option value="">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Specialization</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">Ayurvedic Pharmancy</option>
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
                  <h6 className="text-sm font-semibold">College Name</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <input
                      type="text"
                      placeholder="e.g St.stephenns"
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    />
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Completion year (or expected)</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select name="" id=""   className="w-full py-3 border border-gray-400 focus:border-green-800 px-4">
                        <option value="">Month</option>
                    </select>
                    <select name="" id=""   className="w-full py-3 border border-gray-400 focus:border-green-800 px-4">
                        <option value="">year</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">School medium</h6>

                  <div className="flex items-center gap-x-4 mt-2">
                    <select
                      name=""
                      id=""
                      className="w-full py-3 border border-gray-400 focus:border-green-800 px-4"
                    >
                      <option value="">English</option>
                      <option value="">hindi</option>
                      <option value="">Punjabi</option>
                      <option value="">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-300">
            <button  onClick={handleNext} className="w-full py-3 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition">
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

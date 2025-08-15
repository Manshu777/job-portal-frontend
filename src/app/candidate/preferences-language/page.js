"use client";
import React, { useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
export default function Page() {
     const router = useRouter();
  const englishLevels = [
    {
      label: "No English",
      desc: "",
    },
    {
      label: "Basic",
      desc: "You can understand/speak basic sentences",
    },
    {
      label: "Intermediate",
      desc: "You can have a conversation in English on some topics",
    },
    {
      label: "Advanced",
      desc: "You can do your entire job in English and speak fluently",
    },
  ];
  const [selectedLevel, setSelectedLevel] = useState("");


  const languages = [
    "English",
    "Spanish",
    "Mandarin",
    "Hindi",
    "French",
    "Arabic",
    "Bengali",
    "Russian",
    "Portuguese",
    "Urdu",
    "German",
    "Japanese",
    "Swahili",
    "Marathi",
    "Telugu",
    "Turkish",
    "Tamil",
    "Italian",
    "Korean",
    "Vietnamese",
    "Punjabi",
    "Gujarati",
    "Persian",
    "Malayalam"
  ];

  const handleNext = () => {
   
    router.push("/candidate-login/resumes");
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
              <FaArrowLeftLong />
              Preferred Language
            </div>
            <div className=" w-[250px] bg-gray-400 rounded-2xl p-2 overflow-x-hidden relative">
              <div className="bg-[#309689] w-[50%] h-full absolute left-0 top-0 "></div>
            </div>
          </div>

          <div className="question space-y-4 lg:space-y-4 p-4 lg:p-6  overflow-y-auto  xl:max-h-[500px]">
            <div className="border border-[#309689] p-2 lg:p-4 rounded-lg">
              <h6 className="text-base">English</h6>

              <div className="space-y-4 lg:mt-4">
                {englishLevels.map((level, index) => (
                  <div key={index} className="flex items-center gap-x-2">
                    <input
                      type="radio"
                      id={level.label}
                      name="englishLevel"
                      value={level.label}
                      checked={selectedLevel === level.label}
                      onChange={() => setSelectedLevel(level.label)}
                      className="cursor-pointer"
                    />
                    <div>
                      <label htmlFor={level.label} className="cursor-pointer">
                        {level.label}
                      </label>
                      <p className="text-xs text-gray-400">{level.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

               {selectedLevel &&    <div>
         <h6 className="font-semibold">Add other languages you can speak (Optional)</h6>


               <div className="flex flex-wrap items-center gap-4 mt-4">
               {languages.map((elm)=>(
                    <button className="border rounded-full px-4 py-2 text-xs transition cursor-pointer">{elm} +</button>
                ))}
               </div>
         </div> } 

      

          </div>

          <div className="p-4 lg:p-6 border-t border-gray-300">
            <button onClick={handleNext}   className="w-full py-3 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

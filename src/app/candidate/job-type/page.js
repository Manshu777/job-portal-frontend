"use client";
import React, { useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter();
  const handleNext = () => {
   
    router.push("/candidate-login/preferences-language");
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
              Preferred Job Type
            </div>
            <div className=" w-[250px] bg-gray-400 rounded-2xl p-2 overflow-x-hidden relative">
              <div className="bg-[#309689] w-[70%] h-full absolute left-0 top-0 "></div>
            </div>
          </div>

          <div className="question space-y-4 lg:space-y-6 p-4 lg:p-6  overflow-y-auto  xl:max-h-[500px]">
            <div>
              <h6 className="text-sm font-semibold">Preferred Shifts</h6>
              <div className="space-y-4 mt-4">
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                  Night Shift
                  <MdCheckBoxOutlineBlank className="text-2xl" />
                </div>
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                  Day Shift
                  <MdCheckBoxOutlineBlank className="text-2xl" />
                </div>
              </div>
            </div>
            <div>
              <h6 className="text-sm font-semibold">Preferred Workplace</h6>
              <div className="space-y-4 mt-4">
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                  Work from Home
                  <MdCheckBoxOutlineBlank className="text-2xl" />
                </div>
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                  Work from Office
                  <MdCheckBoxOutlineBlank className="text-2xl" />
                </div>
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                  Field Job
                  <MdCheckBoxOutlineBlank className="text-2xl" />
                </div>
              </div>
            </div>

            <div>
              <h6 className="text-sm font-semibold"> Preferred Employment Type</h6>
              <div className="space-y-4 mt-4">
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                Full Time

                  <MdCheckBoxOutlineBlank className="text-2xl" />
                </div>
                <div className="px-4  py-3 border border-gray-200  w-full flex justify-between">
                Part Time

                  <MdCheckBoxOutlineBlank className="text-2xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-6 border-t border-gray-300">
            <button onClick={handleNext}  className="w-full py-3 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

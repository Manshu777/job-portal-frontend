"use client";
import React, { useState } from "react";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

export default function Page() {
  return (
    <div className="bg-[#e8e7ea] px-5 md:px-12 xl:px-32 py-8 lg:py-12">
      <div className="w-full xl:h-[80vh] lg:w-[85%] mx-auto flex flex-col lg:flex-row  lg:items-start gap-8">
        {/* Left Section */}
        <div className="w-full   flex flex-row lg:flex-1/2  gap-4 h-full">
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
        <div className="w-full h-full  py-12 flex  flex-col justify-between bg-white rounded-3xl shadow-lg  ">
          <div className="h-full w-full gap-y-8 flex flex-col items-center justify-center">
            <FaCircleCheck className="text-5xl md:text-7xl lg:text-8xl text-[#309689]" />
           <div className="space-y-4 xl:space-y-8 text-center">
           <h6 className="font-semibold text-red-500">✨ Congrulations ✨</h6>
            <p className="text-lg font-bold text-black capitalize">
              your profile is successfully created
            </p>
           </div>

            <p className="text-center">
              pro tips- Keep updating you profile to get more calls from HRs
            </p>
            <button className="w-[70%] mx-auto py-3 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition">
              Procced
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

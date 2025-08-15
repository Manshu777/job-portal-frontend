"use client";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GiEnlightenment } from "react-icons/gi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
export default function Page() {
     const router = useRouter();
  const handleNext = () => {
   
    router.push("/candidate-login/skills");
  };

  return (
    <div className="bg-[#e8e7ea] px-4 sm:px-6 md:px-12 xl:px-32 py-6 md:py-10">
      <div className="w-full xl:h-screen lg:w-[85%] mx-auto flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Left Section */}
        <div className="w-full flex flex-col md:flex-row lg:flex-1/2 gap-4">
          <div className="flex flex-col flex-1">
            <img
              src="https://cdn.apna.co/cloudinary/OnboardingV3NonJobContextBanner.png"
              alt="job"
              className="rounded-2xl object-cover w-full h-auto md:h-[420px] lg:h-full"
            />
            <img
              src="https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/OnboardingV3CompanyLogo.png"
              alt="job"
              className="mx-auto mt-4 w-[40%] sm:w-[30%] md:w-[25%]"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full flex flex-col justify-between bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 lg:p-6 border-b border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="font-semibold text-lg flex items-center gap-x-4">
              <FaArrowLeftLong />
              Resume
            </div>
            <div className="relative w-[250px] bg-gray-300 rounded-2xl h-3 overflow-hidden">
              <div className="bg-[#309689] w-[85%] h-full absolute left-0 top-0"></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-[#faf5ff] space-y-4 lg:space-y-6 p-4 lg:p-6 overflow-y-auto max-h-[500px]">
            <div className="flex flex-col items-center gap-y-3 text-center">
              <h5 className="text-lg font-semibold">Upload your resume!</h5>
              <p className="text-base">Receive 2x job offers after uploading</p>
              <div className="bg-[#fffaed] px-3 py-2 text-xs flex items-center gap-x-2 rounded-md">
                <GiEnlightenment className="text-yellow-600" />
                Takes less than a minute to upload
              </div>
              <div className="text-base flex flex-col items-center">
                <img
                  src="https://img.freepik.com/free-vector/cloud-computing-concept-with-download-upload-data-streaming_1017-31864.jpg?uid=R161951417&ga=GA1.1.534676797.1726821028&semt=ais_keywords_boost"
                  alt="upload"
                  className="w-[50%] md:w-[30%]"
                />
                <div className="mt-4">
                  <p>Upload .pdf or .docx file only</p>
                  <p>(Max file size: 5 MB)</p>
                </div>
              </div>
              {/* Benefits List */}
              <div className="mt-4 lg:mt-6 space-y-3">
                <p className="flex items-center gap-x-2 text-sm">
                  <IoMdCheckmarkCircle className="text-[#00223f]" />
                  Unlock jobs from top companies faster
                </p>
                <p className="flex items-center gap-x-2 text-sm">
                  <IoMdCheckmarkCircle className="text-[#00223f]" />
                  Get direct calls from top HRs
                </p>
                <p className="flex items-center gap-x-2 text-sm">
                  <IoMdCheckmarkCircle className="text-[#00223f]" />
                  Get jobs specifically suited for your role and experience level
                </p>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="p-4 lg:p-6 border-t border-gray-300 space-y-3">
            <button className="w-full py-3 border-2 border-[#2da292] text-[#2da292] font-semibold rounded-lg hover:border-[#3e6e68] active:scale-95 transition">
              Skip
            </button>
            <button onClick={handleNext}  className="w-full py-3 bg-[#309689] text-white font-semibold rounded-lg hover:bg-[#3e6e68] active:scale-95 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

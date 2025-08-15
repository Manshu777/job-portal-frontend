"use client";
import React, { useState } from "react";
import { SlCalender } from "react-icons/sl";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { useRouter } from "next/navigation";
export default function Page() {
   const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const handleNext = () => {
   
    router.push("/candidate-login/preferences-language");
  };

  return (
    <div className="bg-[#e8e7ea] px-5 md:px-12 xl:px-32 py-8 lg:py-12">
      <div className="w-full xl:h-[75vh] lg:w-[85%] mx-auto flex flex-col lg:flex-row  lg:items-stretch gap-8">
        {/* Left Section */}
        <div className="w-full  flex flex-row lg:flex-1/2 gap-4 h-full">
          <div className="flex flex-col   h-full ">
            <img
              src="https://cdn.apna.co/cloudinary/OnboardingV3NonJobContextBanner.png"
              alt="job"
              className="rounded-3xl object-cover object-center h-full w-full "
            />
            <img
              src="https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/OnboardingV3CompanyLogo.png"
              alt="job"
              className="mx-auto mt-4 h-auto"
            />
          </div>
          <div className=" hidden md:flex lg:hidden  flex-col  h-full ">
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
        
        <div className="w-full  flex  flex-col justify-between bg-white rounded-3xl shadow-lg h-full">
          <div>
            <div className="p-4 border-b border-gray-300 flex flex-col sm:flex-row sm:items-center gap-y-4 justify-between">
              <div className="font-semibold text-lg flex items-center gap-x-4">
                <FaArrowLeftLong  />
                Location Details
              </div>
              <div className=" w-[250px] bg-gray-400 rounded-2xl p-2 overflow-x-hidden relative">
                <div className="bg-[#309689] w-[15%] h-full absolute left-0 top-0 "></div>
              </div>
            </div>

          <div className="h-full flex justify-center items-center pt-4 lg:pt-5">
          <div className="p-6 space-y-5  justify-center  flex flex-col  items-center">
              <GrMapLocation className="text-5xl lg:text-7xl text-[#309689]" />
              <h6 className="font-semibold text-lg">Discover the best jobs near you</h6>
              <p className="text-base text-[#000000]">Please share your current location</p>
              <p className="text-xs text-gray-500 text-center">This will help us find the best jobs for you in your current city or a nearby city
</p>
            </div>
          </div>  
          </div>

          <div className="p-4 border-t border-gray-300">
            <button className="w-full flex items-center mb-4 justify-center gap-x-2  py-3 border border-[#309689] text-[#309689] font-semibold rounded-md hover:border-[#53978f] active:-translate-y-2 transition">
              Search city
            </button>
            <button className="w-full flex items-center  justify-center gap-x-2  py-3 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition">
              <MdMyLocation className="text-2xl" />
              Pick Your Current Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



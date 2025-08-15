"use client";
import React, { useState, useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Page() {
  const [candidates, setCandidates] = useState(0);
  const [employers, setEmployers] = useState(0);
  const [cities, setCities] = useState(0);
  const [otp, setOtp] = useState(["", "", "", ""]);

  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCandidates((prev) => (prev < 6 ? prev + 1 : prev));
      setEmployers((prev) => (prev < 7 ? prev + 1 : prev));
      setCities((prev) => (prev < 900 ? prev + 100 : prev));
    }, 50);

    return () => clearInterval(counterInterval);
  }, []);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="relative px-5 md:px-12 xl:px-32 xl:h-screen flex flex-col-reverse gap-y-8 lg:flex-row py-12 md:py-16 items-center justify-between">
      <div className="bg-[#d2dfdd38] absolute inset-0 -z-10"></div>

      <div className="w-full   h-full lg:w-[50%] xl:p-4  flex items-center justify-center">
    <div className="space-y-5 text-center lg:text-left">
    <h5 className="text-2xl md:text-3xl xl:text-5xl font-bold text-gray-800">
          Hire the Right Talent, Fast and Easy.
        </h5>
        <p className="text-base text-gray-600">
          Accelerate your hiring process with our powerful job portal. Whether you're looking for entry-level or experienced professionals, we provide the tools to find the perfect match for your business.
        </p>
        <div className="flex justify-center lg:justify-start items-center gap-x-3 text-green-800">
          <FaPlayCircle className="text-lg" />
          <span className="text-sm font-medium">Watch video</span>
        </div>
        <hr />
        <div className="flex flex-wrap justify-center lg:justify-between gap-5">
          <div className="text-center">
            <h6 className="text-2xl lg:text-3xl font-bold text-green-800">
              {candidates.toLocaleString()} Crores +
            </h6>
            <p className="text-sm md:text-base text-gray-700">Qualified Candidates</p>
          </div>
          <div className="text-center">
            <h6 className="text-2xl lg:text-3xl font-bold text-green-800">
              {employers.toLocaleString()} Lakhs +
            </h6>
            <p className="text-sm md:text-base text-gray-700">Employers using Hiring Boat</p>
          </div>
          <div className="text-center">
            <h6 className="text-2xl lg:text-3xl font-bold text-green-800">
              {cities.toLocaleString()} +
            </h6>
            <p className="text-sm md:text-base text-gray-700">Available Cities</p>
          </div>
        </div>
    </div>
      </div>
      <div className="w-full  h-full lg:w-[50%] flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
          <button className="flex items-center gap-x-2 text-gray-600 hover:text-gray-800">
            <IoArrowBackOutline className="text-xl" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h6 className="text-xl font-semibold text-gray-800 mt-4">Verify OTP</h6>
          <p className="text-sm text-gray-600">A one-time password has been sent to your mobile number</p>
          <p className="text-gray-800 font-medium mt-1">+91 123456789</p>
          <div className="flex justify-start gap-3 mt-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309689]"
              />
            ))}
          </div>
          <p className="text-start text-sm text-gray-500 mt-3">
            Didn't receive OTP? <button className="text-green-700 font-semibold hover:underline">Resend Again</button>
          </p>
          <button className="w-full bg-[#309689] text-white font-semibold py-3 mt-5 rounded-lg shadow-md hover:bg-[#309688f0] transition duration-300">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

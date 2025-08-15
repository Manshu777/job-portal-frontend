"use client";
import React, { useState } from "react";
import { SlCalender } from "react-icons/sl";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

export default function Basic_1() {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  return (
    <div>
      <div>
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          <h6 className="font-semibold text-lg">Basic Details chc</h6>
          <div className="border h-2 bg-gray-200 rounded-2xl">
ss
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="font-semibold text-sm">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00223f]"
            />
          </div>

          <div className="relative">
            <label className="font-semibold text-sm">Date of Birth (DOB)</label>
            <input
              type="text"
              placeholder="Choose date"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00223f]"
            />
            <SlCalender className="absolute right-4 top-12 text-gray-500" />
          </div>

          {/* Gender */}
          <div>
            <label className="font-semibold text-sm">Gender</label>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => setSelectedGender("Male")}
                className={`px-6 py-2 border rounded-full transition ${
                  selectedGender === "Male"
                    ? "bg-[#309689] text-white border-[#02325a]"
                    : "border-[#309689] text-[#309689]"
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setSelectedGender("Female")}
                className={`px-6 py-2 border rounded-full transition ${
                  selectedGender === "Female"
                    ? "bg-[#309689] text-white border-[#02325a]"
                    : "border-[#309689] text-[#309689]"
                }`}
              >
                Female
              </button>
            </div>
          </div>

          <div>
            <label className="font-semibold text-sm">
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00223f]"
            />
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsChecked(!isChecked)}
          >
            {isChecked ? (
              <MdCheckBox className="text-[#00223f] text-lg" />
            ) : (
              <MdCheckBoxOutlineBlank className="text-gray-500 text-lg" />
            )}
            <p className="text-gray-600 text-sm">
              Send me important job updates on WhatsApp
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-300">
        <button className="w-full py-3 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#3e6e68] active:-translate-y-2 transition">
          Next
        </button>
      </div>
    </div>
  );
}

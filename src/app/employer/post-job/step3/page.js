"use client";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { HiQuestionMarkCircle, HiTemplate } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

export default function Page() {
  const steps = [
    { id: 1 },
    { id: 2 },
    { id: 3, label: "Interviewer information" },
    { id: 4 },
    { id: 5 },
  ];

  const [activeStep, setActiveStep] = useState(1);

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

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4">
          <div>
            <h6 className="text-base font-semibold">
              Interview method and address
            </h6>
            <p className="text-xs text-gray-500">
              Let candidates know how interview will be conducted for this job.
            </p>
          </div>
          <div>
            <h6 className="text-sm font-[700] ">
              Is this a walk-in interview ?
            </h6>
            <div className="flex mt-4 flex-col gap-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="yes"
                  className="w-4 h-4 rounded-full border border-gray-400 appearance-none checked:bg-[#00223f] checked:border-transparent"
                />
                <label htmlFor="yes" className="text-sm">
                  Yes
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="no"
                  className="w-4 h-4 rounded-full border border-gray-400 appearance-none checked:bg-[#00223f] checked:border-transparent"
                />
                <label htmlFor="no" className="text-sm">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4">
          <div>
            <h6 className="text-base font-semibold">
              Communication Preferences
            </h6>
            <div className="flex mt-4 w-fit items-start gap-2 p-3 bg-[#EBF3FE] border border-blue-200 rounded-md">
              <svg
                height="20"
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 mt-0.5"
              >
                <path d="M19 9h-4V3H9v6H5l7 7 7-7z" fill="#0074E8" />
                <path d="M5 18v2h14v-2H5z" fill="#0074E8" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
              <p className="text-sm text-gray-800">
                Leads information will be accessible on Hiring Boat portal and
                can be{" "}
                <strong className="font-semibold text-black">
                  downloaded in excel
                </strong>{" "}
                format.
              </p>
            </div>
          </div>
          <div>
            <h6 className="text-base font-semibold">
              Do you want candidates to contactyou via Call / Whatsapp after
              they apply?*
            </h6>
            <div className="flex flex-col gap-y-4 mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="yes"
                  className="w-4 h-4 rounded-full border border-gray-400 appearance-none checked:bg-[#00223f] checked:border-transparent"
                />
                <label htmlFor="yes" className="text-sm">
                  Yes, to myself
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="no"
                  className="w-4 h-4 rounded-full border border-gray-400 appearance-none checked:bg-[#00223f] checked:border-transparent"
                />
                <label htmlFor="no" className="text-sm">
                  Yes, to other recruiter
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="no"
                  className="w-4 h-4 rounded-full border border-gray-400 appearance-none checked:bg-[#00223f] checked:border-transparent"
                />
                <label htmlFor="no" className="text-sm">
                  No, I will contact candidates first
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm py-5 px-4 space-y-4">
          <div>
            <h6 className="text-base font-semibold">
              Notification Preferences
            </h6>
          </div>
          <div>
            <h6 className="text-sm font-[700] flex items-center gap-x-1">
              Every time you receive a matched candidate application,do you want{" "}
              <img
                src="/img/employer/whatsapp.png"
                className="text-green-400 w-8 h-8"
              />
              Whatsapp Alerts from Job portal?*
            </h6>
            <div className="flex flex-col gap-y-4 mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="yes"
                  className="w-4 h-4 rounded-full border border-gray-400 appearance-none checked:bg-[#00223f] checked:border-transparent"
                />
                <label htmlFor="yes" className="text-sm">
                  Yes, to myself
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="no"
                  className="w-4 h-4 rounded-full border border-gray-400 appearance-none checked:bg-[#00223f] checked:border-transparent"
                />
                <label htmlFor="no" className="text-sm">
                  Yes, to other recruiter
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="no"
                  className="w-4 h-4 rounded-full border border-gray-400 appearance-none checked:bg-[#00223f] checked:border-transparent"
                />
                <label htmlFor="no" className="text-sm">
                  No, I will contact candidates first
                </label>
              </div>
            </div>
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

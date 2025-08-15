"use client";
import React, { useState, useEffect } from "react";
import { FaBriefcase, FaBuilding, FaPlayCircle, FaUserTie } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaUserFriends, FaUserCog, FaRocket } from "react-icons/fa";
import FAQSection from "./FAQSection";

export default function EmployerLogin() {
  const [candidates, setCandidates] = useState(0);
  const [employers, setEmployers] = useState(0);
  const [cities, setCities] = useState(0);

  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCandidates((prev) => (prev < 6 ? prev + 1 : prev));
      setEmployers((prev) => (prev < 7 ? prev + 1 : prev));
      setCities((prev) => (prev < 900 ? prev + 100 : prev));
    }, 50);

    return () => clearInterval(counterInterval);
  }, []);


  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      title: "Advanced Job Filters & Assessments",
      content: "Use advanced filters and assessments to find the right candidates faster."
    },
    {
      title: "Smart AI Lead Management",
      content: "AI-powered insights to manage and prioritize job applications."
    }
  ];

  const features = [
    {
      icon: <FaUserFriends className="text-gray-800 text-4xl" />,
      title: "Smart Job Matching",
      description:
        "AI-powered job recommendations to connect candidates with the right opportunities effortlessly.",
    },
    {
      icon: <FaUserCog className="text-gray-800 text-4xl" />,
      title: "Seamless Application Tracking",
      description:
        "Track job applications in real-time with an intuitive dashboard and instant notifications., and profiles efficiently",
    },
    {
      icon: <FaRocket className="text-gray-800 text-4xl" />,
      title: "Employer & Candidate Dashboard",
      description:
        "A dedicated space for employers and candidates to manage listings, applications, and profiles efficiently.",
    },
  ];
  ;

  return (
    <>
    <div className="mx-auto  px-5 md:px-12 xl:px-32">
      <div className="flex flex-wrap items-center justify-between py-10 md:py-12 xl:py-16 gap-8">
        <div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left">
          <h5 className="text-2xl md:text-3xl xl:text-5xl font-bold text-gray-800">
            Hire the Right Talent, Fast and Easy.
          </h5>
          <p className="text-base text-gray-600">
            Accelerate your hiring process with our powerful job portal. Whether
            you're looking for entry-level or experienced professionals, we
            provide the tools to find the perfect match for your business.
          </p>
          <div className="flex justify-center lg:justify-start items-center gap-x-3 text-green-800">
            <FaPlayCircle className="text-lg" />
            <span className="text-sm font-medium">Watch video</span>
          </div>
          <hr />
          {/* Counter Section */}
          <div className="flex flex-wrap justify-center lg:justify-between gap-5">
            <div className="text-center">
              <h6 className="text-2xl lg:text-3xl font-bold text-green-800">
                {candidates.toLocaleString()} Crores +
              </h6>
              <p className="text-sm md:text-base text-gray-700">
                Qualified Candidates
              </p>
            </div>
            <div className="text-center">
              <h6 className="text-2xl lg:text-3xl font-bold text-green-800">
                {employers.toLocaleString()} Lakhs +
              </h6>
              <p className="text-sm md:text-base text-gray-700">
                Employers using Hiring Boat
              </p>
            </div>
            <div className="text-center">
              <h6 className="text-2xl lg:text-3xl font-bold text-green-800">
                {cities.toLocaleString()} +
              </h6>
              <p className="text-sm md:text-base text-gray-700">
                Available Cities
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5">
          <div className="shadow-xl rounded-xl p-6 bg-white">
            <div className="mb-6 text-center lg:text-left">
              <h6 className="text-2xl font-semibold text-gray-800">
                Let’s get started
              </h6>
              <p className="text-gray-600">
                Hire top talent faster with our platform
              </p>
            </div>

            <div className="mb-6">
              <h6 className="text-lg mb-2 font-semibold text-gray-800">
                Mobile number
              </h6>
              <input
                type="text"
                placeholder="Enter 10 digit mobile number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
              />
              <button className="w-full cursor-pointer mt-4 py-2 bg-[#309689] text-white rounded-md hover:bg-[#365b56] active:-translate-y-3 transition duration-300">
                Continue
              </button>
              <div className="relative mt-4 flex items-center justify-center">
                <hr className="border-gray-300 w-full" />
                <p className="absolute bg-white text-gray-700 px-2 text-xs">
                  OR
                </p>
              </div>
            </div>

            <div className="text-center">
              <button className="flex items-center justify-center gap-x-2 text-xs text-gray-500 font-semibold hover:underline">
                <FaBuilding />
                Click here for Enterprise login
              </button>
              <p className="mt-4 text-sm text-gray-500">
                By clicking continue, you agree to the{" "}
                <span className="text-blue-400 cursor-pointer">
                  Terms of Service
                </span>{" "}
                &{" "}
                <span className="text-blue-400 cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 lg:py-8 space-y-7">
        <h6 className="text-xl lg:text-xl font-semibold">
          Trusted by 1,000+ enterprises for seamless hiring solutions
        </h6>

        <Marquee>
          <div className="flex items-center gap-x-10 text-3xl lg:text-5xl font-semibold">
            🚀 Find Your Dream Job | 🔍 Thousands of Job Listings | 💼 Hire Top
            Talent Fast | 📢 Apply Now & Get Hired | 🌟 Trusted by Leading
            Enterprises
          </div>
        </Marquee>
      </div>

      {/* <div className="flex justify-center mt-5 lg:mt-16">
          <h6 className="font-semibold text-2xl md:text-4xl lg:text-4xl text-center inline-block border-b-4 border-gray-500 pb-2">
            A single platform for your hiring needs
          </h6>
        </div> */}

    
    </div>


    {/* try  */}

    <div className="hidden mt-4 lg:mt-16 py-5 px-5 md:px-12 xl:px-32 bg-[#EBF3FE] md:py-10 lg:py-24">
  <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6">
    
    <div className="w-full lg:w-[55%] space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <FaBriefcase className="text-[#309689] text-xl" />
          <h2 className="text-[#309689] font-semibold text-lg">SMART HIRING SOLUTIONS</h2>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">
          Find the right talent faster with AI-driven job matching
        </h1>
        <p className="text-gray-700">
          Our platform helps you connect with top candidates effortlessly, ensuring a smooth hiring process with AI-based recommendations.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {[
          { title: "AI-Powered Job Matching", content: "We analyze job descriptions and recommend the most suitable candidates instantly." },
          { title: "Automated Screening", content: "Save time with smart filters that prioritize high-potential candidates." },
          { title: "Seamless Interview Scheduling", content: "Coordinate interviews with built-in calendar integration." },
        ].map((section, index) => (
          <div
            key={index}
            className="p-4  rounded-md cursor-pointer transition-all duration-300  shadow-sm"
            onClick={() => toggleSection(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              {openSection === index ? (
                <IoIosArrowUp className="text-gray-600 text-xl" />
              ) : (
                <IoIosArrowDown className="text-gray-600 text-xl" />
              )}
            </div>
            {openSection === index && (
              <p className="text-gray-700 mt-2">{section.content}</p>
            )}
          </div>
        ))}
      </div>

      <button className="px-6 py-3 bg-[#309689] text-white font-semibold rounded-lg shadow-md hover:bg-[#257f73] transition duration-300">
        Start Hiring Now
      </button>
    </div>

    <div className="w-full lg:w-[45%] flex justify-center">
      <img
        src="/img/employer/job.png"
        alt="AI-driven job recruitment process"
        className="w-full  object-center rounded-lg shadow-lg"
      />
    </div>

  </div>

  <div className="grid mt-16 grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-start p-6   rounded-lg text-start"
        >
          {feature.icon}
          <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
          <p className="text-gray-600 mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
    
</div>

      {/* try  */}
<div className="hidden py-5 px-5 md:px-12 xl:px-32 bg-[#f1eafa] md:py-10 lg:py-24">
  <div className="flex flex-col lg:flex-row-reverse items-center lg:items-stretch gap-6">
    
    <div className="w-full lg:w-[55%] space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <FaUserTie className="text-[#309689] text-xl" />
          <h2 className="text-[#309689] font-semibold text-lg">Candidate Hiring Portal</h2>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">
          Find & Hire Top Talent Faster Than Ever
        </h1>
        <p className="text-gray-700">
          Our AI-driven platform helps you discover, evaluate, and hire the best candidates with ease, 
          streamlining the entire recruitment process.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {[
          { title: "AI-Driven Candidate Matching", content: "Instantly connect with the most qualified job seekers based on your hiring needs." },
          { title: "Automated Resume Screening", content: "Filter out the best resumes using AI-powered screening tools." },
          { title: "Integrated Interview Scheduling", content: "Simplify coordination with automated interview scheduling and calendar sync." },
        ].map((section, index) => (
          <div
            key={index}
            className="p-4 rounded-md cursor-pointer transition-all duration-300 shadow-sm"
            onClick={() => toggleSection(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              {openSection === index ? (
                <IoIosArrowUp className="text-gray-600 text-xl" />
              ) : (
                <IoIosArrowDown className="text-gray-600 text-xl" />
              )}
            </div>
            {openSection === index && (
              <p className="text-gray-700 mt-2">{section.content}</p>
            )}
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button className="px-6 py-3 bg-[#309689] text-white font-semibold rounded-lg shadow-md hover:bg-[#257f73] transition duration-300">
        Hire Candidates Now
      </button>
    </div>

    {/* Right Image Section */}
    <div className="w-full lg:w-[45%] flex justify-center">
      <img
        src="https://img.freepik.com/free-photo/business-meeting-talking-about-job_53876-94836.jpg?uid=R161951417&ga=GA1.1.534676797.1726821028&semt=ais_keywords_boost"
        alt="Candidate hiring process"
        className="w-full object-center rounded-lg shadow-lg"
      />
    </div>

  </div>

  <div className="grid mt-16 grid-cols-1 md:grid-cols-3 gap-6 p-6">
    {features.map((feature, index) => (
      <div
        key={index}
        className="flex flex-col items-start p-6 rounded-lg text-start"
      >
        {feature.icon}
        <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
        <p className="text-gray-600 mt-2">{feature.description}</p>
      </div>
    ))}
  </div>
</div>


<div className="mt-4 lg:mt-16 py-5 px-5 md:px-12 xl:px-32 bg-[#e7f9f9] md:py-10 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6">
        
            <div className="w-full lg:w-[55%] space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaUserTie className="text-[#309689] text-xl" />
              <h2 className="text-[#309689] font-semibold text-lg">EMPLOYER LOGIN</h2>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">
              Simplify Your Hiring Process with Our Job Portal
            </h1>
            <p className="text-gray-700">
              Manage job postings, track applications, and find the perfect candidates effortlessly.
            </p>
          </div>

              <div className="mt-4 space-y-3">
            {[
              { title: "Secure Employer Dashboard", content: "Access a dedicated dashboard to monitor job postings and applications." },
              { title: "AI-Based Candidate Matching", content: "Get the best candidate recommendations based on job descriptions." },
              { title: "Instant Communication Tools", content: "Message and schedule interviews directly from your dashboard." },
            ].map((section, index) => (
              <div
                key={index}
                className="p-4 rounded-md cursor-pointer transition-all duration-300 shadow-sm"
                onClick={() => toggleSection(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  {openSection === index ? (
                    <IoIosArrowUp className="text-gray-600 text-xl" />
                  ) : (
                    <IoIosArrowDown className="text-gray-600 text-xl" />
                  )}
                </div>
                {openSection === index && (
                  <p className="text-gray-700 mt-2">{section.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="px-6 py-3 bg-[#309689] text-white font-semibold rounded-lg shadow-md hover:bg-[#257f73] transition duration-300">
            Login as Employer
          </button>
        </div>

        {/* Right Image Section */}
        <div className="w-full lg:w-[45%] flex justify-center">
          <img
            src="/img/employer/hiring.png"
            className="w-full object-center "
          />
        </div>

      </div>

      <div className="grid mt-16 grid-cols-1 md:grid-cols-3 md:gap-6 md:p-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-start p-6 rounded-lg text-start"
          >
            {feature.icon}
            <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
      
    </div>

<FAQSection/>

    </>
  );
}

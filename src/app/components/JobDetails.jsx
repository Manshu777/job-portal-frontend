"use client"
import React from "react";
import { CiBookmarkPlus } from "react-icons/ci";
import data from "../jobdata";
import {
  FaDollarSign,
  FaFacebook,
  FaLinkedin,
  FaMapMarkerAlt,
  FaRegNewspaper,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaCheck, FaXTwitter } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineMessage,
} from "react-icons/ai";

import {
  FaBriefcase,
  FaUserTie,
  FaClock,
  FaGraduationCap,
  FaMoneyBillWave,
} from "react-icons/fa";
import JobCard from "./JobCard";

export default function JobDetails({slug,slugProdcut}) {
  const jobDetailsList = [
    {
      name: "Media",
      icon: <FaRegNewspaper />,
    },
    {
      name: "Full Time",
      icon: <MdWork />,
    },
    {
      name: "280000-320000",
      icon: <FaDollarSign />,
    },
    {
      name: "Los Angeles, USA",
      icon: <FaMapMarkerAlt />,
    },
  ];

  const tagss = [
    { id: "1", name: "Full-time" },
    { id: "2", name: "E-commerce" },
    { id: "3", name: "New York" },
    { id: "4", name: "Corporate" },
    { id: "5", name: "Location" },
  ];

 



  const MainJob=[ {
      
    title: "Internal Integration Planner", company: "Bauch, Schuppe and Schulist Co", img: "/img/jobs/joblogo.png"
  },]


  console.log(slug,"slug check")

  const {  
    title = "",     
    company = "",     
    logo = "",     
    salary = "",     
    jobType = "",     
    location = "",     
    industry = "",     
    Description = [],     
    Responsibilities = [],  
    skills = [],  
    tags = [] 
  } = slugProdcut || {}; 

  const jobDetails = [
    { icon: FaBriefcase, label: "Job Type", value: jobType },
    {
      icon: FaUserTie,
      label: "Job Title",
      value: title,
    },
    { icon: FaClock, label: "Experience", value: "5 years" },
    { icon: FaGraduationCap, label: "Degree", value: "Master’s" },
    {
      icon: FaMoneyBillWave,
      label: "Offered Salary",
      value: salary,
    },
    { icon: FaMapMarkerAlt, label: "Location", value: location },
  ];


  const relatedjobs=data.filter((elm)=>elm.jobType==jobType)
  
  return (
    <div className="mx-auto">
      <div className="banner  h-[25vh] lg:h-[40vh] bg-black flex items-center justify-center text-white">
        <h1 className="font-bold text-3xl lg:text-5xl">Job Details</h1>
      </div>

      <div className=" px-5 md:px-12 xl:px-32">
        <div className="mt-5 lg:mt-10 space-y-4">
        <JobCard   jobcard={slugProdcut}/>
        
        </div>

        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-x-8  mt-4 lg:mt-12">
          <div className=" lg:col-span-2">
            <div className="left">
              <div className="space-y-4 lg:space-y-8">
                <div className="space-y-4">
                  <h5 className="font-bold text-xl lg:text-2xl ">
                    Job Description
                  </h5>
                  <div className="space-y-2 text-base">
                    {Description.map((elm,indx)=>(  
                      <p className="text-justify">
                        {elm}
                    </p>      
                    ))}
                 
                  </div>
                </div>
                <div className="space-y-4">
                  <h5 className="font-semibold text-xl lg:text-2xl ">
                    Key Responsibilities
                  </h5>
                  <div className="space-y-2">
                    <ul className="text-base space-y-4">
                    {Responsibilities.map((elm,indx)=>(
                      <li key={indx} className="flex items-baseline gap-x-2">
                        <FaCheck />

                        <p>
                          {elm}
                        </p>
                      </li>
                    ))}
                    
                      
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h5 className="font-semibold text-xl lg:text-2xl ">
                    Professional Skills
                  </h5>
                  <div className="space-y-2">
                    <ul className="text-base space-y-4">
                      {skills.map((elm,indx)=>(
                        <li key={indx} className="flex items-baseline gap-x-2">
                        <FaCheck />

                        <p>
                          {elm}
                        </p>
                      </li>
                      ))}
                     
                    
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h5 className="font-semibold text-xl lg:text-2xl ">Tags:</h5>
                  <div className=" space-y-2 mt-3 flex flex-wrap gap-4">
                    {tags.map((elm,indx) => (
                      <h5
                        key={indx}
                        className="bg-[#3096881e] text-[#309689] rounded-2xl text-center py-1 px-4 lg:px-6"
                      >
                        {elm}
                      </h5>
                    ))}
                  </div>
                </div>
                <div className="share-job flex items-center gap-5">
                  <p className="font-semibold text-lg">Share jobs</p>
                  <div className="flex items-center gap-x-2 text-xl md:text-2xl">
                    <FaFacebook />
                    <FaXTwitter />
                    <FaLinkedin />
                  </div>
                </div>
              </div>

              {/* related jobs  */}

              <div className="mt-5 lg:mt-8">
                <h5 className="font-bold text-xl md:text-2xl lg:text-4xl">
                  Related Jobs
                </h5>
                <p>
                  At eu lobortis pretium tincidunt amet lacus ut aenean aliquet
                </p>
              </div>

              <div className="my-5 lg:my-6 grid grid-cols-1 gap-y-5">
                {relatedjobs.map((elm, indx) => (
                  <JobCard key={indx} jobcard={elm}/>
                ))}
              </div>
            </div>
          </div>
          <div className=" lg:col-span-1 ">
            <div className="space-y-4 sticky top-0 ">
              <div className="bg-[#EBF5F4] rounded-2xl py-8 lg:py-4  px-3 lg:px-5 ">
                <div className="job-overview">
                  <h4 className="capitalize font-semibold text-lg ">
                    job overview
                  </h4>
                  <ul className="mt-4 space-y-4 lg:space-y-6">
                    {jobDetails.map((item, index) => (
                      <li key={index} className="flex items-start gap-x-4">
                        <item.icon className="text-[#309689] text-lg lg:mt-2" />
                        <div>
                          <h6 className="font-semibold">{item.label}</h6>
                          <p>{item.value}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {/* map  */}
                  <div className="map w-full flex justify-center mt-5 lg:mt-6">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109744.22709325235!2d76.6883122770574!3d30.732254422147673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e0!3m2!1sen!2sin!4v1742401982886!5m2!1sen!2sin"
                      width="600"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-2xl"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* form  */}

              <div className="bg-[#EBF5F4] rounded-2xl py-8 lg:py-4  px-3 lg:px-5">
                <div className="form">
                  <h4 className="capitalize font-semibold text-lg ">
                    Send Your Message
                  </h4>

                  <form action="" className="mt-4 lg:mt-4 space-y-4">
                    {/* Full Name */}
                    <div className="relative">
                      <AiOutlineUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        id="name"
                        placeholder="Full Name"
                        className="w-full pl-12 pr-4 py-2 outline-0  rounded-3xl bg-white "
                      />
                    </div>

                    {/* Email Address */}
                    <div className="relative">
                      <AiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        className="w-full pl-12 pr-4 py-2 outline-0 rounded-3xl bg-white "
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <AiOutlinePhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="tel"
                        id="phone"
                        placeholder="Phone No"
                        className="w-full pl-12 pr-4 py-2  outline-0 rounded-3xl bg-white "
                      />
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <AiOutlineMessage className="absolute left-4 top-4 transform -translate-y-1/2 text-gray-500" />
                      <textarea
                        rows={5}
                        id="message"
                        placeholder="Your Message"
                        className="w-full pl-12 pr-4 py-2 outline-0  rounded-3xl bg-white "
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

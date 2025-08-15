import React from 'react';
import { IoMdCheckmark } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function LeftCommonCard() {
  const WhatOffer = [
    {
      img: "/img/employer/1.webp",
      title: "Smart Job Posting",
      description: "Publish your openings effortlessly and reach top talent in record time.",
      list: [
        { desc: "AI-optimized job visibility to attract relevant candidates faster." },
        { desc: "Stay active on the platform for 15 days with unlimited applicants." },
      ],
    },
    {
      img: "/img/employer/2.webp",
      title: "Powerful Candidate Search",
      description: "Dive into our talent pool and connect with the right fit instantly.",
      list: [
        { desc: "Advanced filters to refine and personalize candidate results." },
        { desc: "Direct outreach tools to initiate faster hiring conversations." },
      ],
    },
    {
      img: "/img/employer/3.webp",
      title: "Enhanced Company Branding",
      description: "Let your employer brand shine and attract like-minded professionals.",
      list: [
        { desc: "Custom company profile with logo, culture highlights, and values." },
        { desc: "Employer spotlight placements to increase visibility among job seekers." },
      ],
    },
    {
      img: "/img/employer/4.webp",
      title: "Advanced Hiring Analytics",
      description: "Track, analyze, and improve your recruitment performance effortlessly.",
      list: [
        { desc: "Real-time insights on post performance and applicant behavior." },
        { desc: "Exportable reports for better hiring strategy decisions." },
      ],
    },
  ];

  return (
    <div className="space-y-2 text-white max-w-xl mx-auto">
      <div className="md:pl-20 lg:pl-10">
        <h5 className="text-3xl font-bold mb-2">
          Company <span className="text-green-400">Hire</span>
        </h5>
        <h6 className="text-xl font-medium flex items-center gap-2">
          What does Job Portal Offer? <span>👋</span>
        </h6>
      </div>

   

      <Swiper
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper mt-10"
        spaceBetween={20}
      >
        {WhatOffer.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#483647] p-6 rounded-xl shadow-lg space-y-4 max-w-md mx-auto">
              <img src={item.img} alt={item.title} className='w-8 h-8 lg:h-16 lg:w-16' />
              <h6 className="text-xl font-semibold">{item.title}</h6>
              <p className="text-sm text-gray-300">{item.description}</p>
              <ul className="space-y-2 text-sm">
                {item.list.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <IoMdCheckmark className="text-green-400 mt-1" />
                    <span>{point.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="w-full ">
        <img
          src="/img/employer/left.png"
          alt="Job Portal Illustration"
          className=""
        />
      </div> */}
    </div>
  );
}

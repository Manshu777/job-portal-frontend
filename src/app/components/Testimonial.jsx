// Next.js-Compatible Component Based on Original Testimonial File with Animated Swipable Horizontal Cards + Button Navigation Working

'use client';

import { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import SwiperCore, { Autoplay, Navigation } from 'swiper';

SwiperCore.use([Autoplay, Navigation]);

const testimonialData = [
  {
    name: 'Jane D',
    role: 'CEO',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    feedback: 'Pagedone is simply the best tool of investment in the market right now.'
  },
  {
    name: 'Mark T',
    role: 'Developer',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    feedback: 'This tool has helped me tremendously in building modern UI faster than ever.'
  },
  {
    name: 'Lisa K',
    role: 'Designer',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    feedback: 'Easy to use, flexible, and beautiful designs. Totally worth it!'
  },
  {
    name: 'Tom H',
    role: 'Project Manager',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    feedback: 'From prototyping to deployment, Pagedone makes everything easier.'
  },
  {
    name: 'Emily R',
    role: 'Marketing Lead',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    feedback: 'We use Pagedone in every campaign. It saves us time and money.'
  }
];

const Testimonials = () => {
  useEffect(() => {
    const interval = setTimeout(() => {
      new Swiper('.mySwiper', {
        slidesPerView: 1.1,
        spaceBetween: 20,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
    }, 100); // slight delay to ensure buttons are available

    return () => clearTimeout(interval);
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-center items-center sm:flex-row sm:items-center sm:justify-between max-sm:gap-8">
          <h2 className="text-4xl text-center font-bold text-gray-900 lg:text-left">Testimonials</h2>
          <div className="flex items-center gap-8">
            {/* <button className="swiper-button-prev group flex justify-center items-center border border-solid border-indigo-600 w-12 h-12 transition-all duration-500 rounded-full hover:bg-[#02325a]">
              <svg className="h-6 w-6 text-indigo-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button> */}
            {/* <button className="swiper-button-next group flex justify-center items-center border border-solid border-indigo-600 w-12 h-12 transition-all duration-500 rounded-full hover:bg-[#02325a]">
              <svg className="h-6 w-6 text-indigo-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button> */}
          </div>
        </div>

        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {testimonialData.map((t, index) => (
              <div key={index} className="swiper-slide bg-white border border-solid border-gray-300 rounded-2xl p-6 hover:border-indigo-600 transition-all duration-500">
                <div className="flex items-center mb-6 gap-2 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" fill="currentColor" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-gray-500 leading-7 mb-6 min-h-[96px]">{t.feedback}</p>
                <div className="flex items-center gap-5">
                  <img className="rounded-full object-cover w-12 h-12" src={t.image} alt={t.name} />
                  <div className="grid gap-1">
                    <h5 className="text-gray-900 font-medium">{t.name}</h5>
                    <span className="text-sm text-gray-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
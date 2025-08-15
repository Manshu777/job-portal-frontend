'use client'

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I get started with your service?",
      answer: "Getting started is easy! Simply sign up for an account on our platform, complete your profile, and you'll have immediate access to all our features. We also provide a comprehensive onboarding guide to help you navigate through the initial setup process."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For business accounts, we also offer invoice-based payments with flexible payment terms."
    },
    {
      question: "Can I upgrade or downgrade my subscription plan?",
      answer: "Yes, you can modify your subscription plan at any time. Changes will be reflected in your next billing cycle. When upgrading, you'll have immediate access to new features, and when downgrading, you'll maintain access to your current features until the end of your billing period."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide 24/7 customer support through multiple channels including email, live chat, and phone. Our dedicated support team is always ready to assist you with any questions or technical issues you might encounter."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play Store. Our mobile apps offer the same powerful features as our web platform, allowing you to stay productive on the go."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#02325a] to-purple-600">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">Everything you need to know about our services</p>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border-l-4 border-blue-500"
            >
              <button
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-left font-semibold text-gray-800 text-lg">{faq.question}</span>
                <span className="ml-4 flex-shrink-0">
                  {activeIndex === index ? (
                    <IoIosArrowUp className="h-6 w-6 text-blue-500" />
                  ) : (
                    <IoIosArrowDown className="h-6 w-6 text-blue-500" />
                  )}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-96 py-6 px-6 opacity-100 bg-gradient-to-r from-blue-50 to-transparent"
                    : "max-h-0 py-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Added CTA Section */}
        {/* <div className="mt-20 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#02325a] via-indigo-600 to-purple-600 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/15 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4"></h3>
            <p className="text-lg text-white/90 mb-8">Join thousands of satisfied customers who trust our services.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-white text-[#02325a] font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 blur-2xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-2xl opacity-50"></div>
        </div> */}
      </div>
    </div>
  );
};

export default FAQSection;
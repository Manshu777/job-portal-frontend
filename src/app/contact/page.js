'use client'

import { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaClock, FaLinkedin, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export default function page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  const subjects = [
    "Job Application Support",
    "Technical Issues",
    "Account Related",
    "Business Inquiry",
    "Other"
  ];

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button and follow the registration process. You'll need to provide basic information and verify your email."
    },
    {
      question: "What are the requirements for job posting?",
      answer: "To post a job, ensure you have a verified employer account. Complete your company profile and follow our job posting guidelines."
    },
    {
      question: "How can I update my profile?",
      answer: "Log into your account, navigate to 'Settings', and select 'Edit Profile' to update your information."
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2 || /\d/.test(formData.name)) {
      newErrors.name = "Name must be at least 2 characters and contain no numbers";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        alert("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[30vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl">We're here to help you succeed</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  rows="5"
                  placeholder="Your message"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#02325a] text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Support Information */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <FaPhone className="text-[#02325a] text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Phone Support</h3>
                    <p>+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-[#02325a] text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p>support@jobportal.com</p>
                    <p className="text-sm text-gray-500">24/7 Response</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdLocationOn className="text-[#02325a] text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Office Location</h3>
                    <p>123 Business Avenue</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-[#02325a] text-xl mr-4" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
              <div className="flex space-x-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300">
                  <FaLinkedin className="text-2xl text-[#02325a]" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300">
                  <FaTwitter className="text-2xl text-blue-400" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300">
                  <FaGithub className="text-2xl text-gray-800" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300">
                  <FaInstagram className="text-2xl text-pink-600" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="mb-6">
            {/* <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300"
            /> */}
          </div>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  {faq.question}
                  <span className={`transform transition-transform duration-200 ${activeFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                <div
                  className={`px-6 py-4 bg-gray-50 transition-all duration-200 ${activeFaq === index ? 'block' : 'hidden'}`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="mt-16 bg-[#02325a] rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button className="bg-white text-[#02325a] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              Find a Job
            </button>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300">
              Post a Job
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};



'use client'
import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import Chatbot1 from "./Chatbot1";

const Footer = () => {
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);
 
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setIsNewsletterSubmitted(true);
    setEmail("");
  };

  const navigationLinks = {
    Company: ["About", "Careers", "Press", "Blog"],
    Products: ["Features", "Pricing", "Solutions", "Enterprise"],
    Support: ["Documentation", "Help Center", "Contact", "Status"]
  };

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaGithub, href: "#", label: "GitHub" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <div className="relative w-[150px] h-[50px]">
              <img
                src="https://images.unsplash.com/photo-1563906267088-b029e7101114"
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              Building the future of digital experiences.
            </p>
          </div>

          {/* Navigation Links */}
          {Object.entries(navigationLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-gray-900 font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#02325a] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-gray-900 font-semibold mb-4">Stay Updated</h3>
            {isNewsletterSubmitted ? (
              <p className="text-[#00223f]">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="mt-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#02325a] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex space-x-6 mb-4 sm:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-600 hover:text-[#02325a] transition-colors duration-200"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              © {currentYear} Your Company. All rights reserved.
              <div className="flex space-x-4 mt-2 sm:mt-0 sm:inline-block sm:ml-4">
                <a href="#" className="hover:text-[#02325a] transition-colors duration-200">Privacy Policy</a>
                <span className="hidden sm:inline">·</span>
                <a href="#" className="hover:text-[#02325a] transition-colors duration-200">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Chatbot1 />
    </footer>
  );
};

export default Footer;
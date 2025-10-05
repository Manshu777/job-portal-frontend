'use client'
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import Chatbot1 from "./Chatbot1";

const Footer = () => {
  const pathname = usePathname();
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [showFooter, setShowFooter] = useState(true);

  // Hide footer for employer pages
  useEffect(() => {
    if (pathname.startsWith("/employer")) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [pathname]);

  if (!showFooter) return null;

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
    <footer className="relative bg-[#f0f8ff] text-black pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo Section */}
          <div>
             <img className="h-[80px]" src="/img/logo-rm-boat.png" />
              <span className="text-2xl ml-2 uppercase leading-1">
                Hiring Boat
              </span>
            <p className="text-black text-sm leading-relaxed">
              Empowering digital growth through technology and innovation.
            </p>
          </div>

          {/* Navigation Links */}
          {Object.entries(navigationLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 text-black border-b border-blue-400 pb-2 w-fit">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-black hover:text-black transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black border-b border-blue-400 pb-2 w-fit">
              Stay Updated
            </h3>
            {isNewsletterSubmitted ? (
              <p className="text-green-300 font-medium">Thanks for subscribing! 🎉</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="mt-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="px-4 py-2 rounded-md w-full text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-blue-400 pt-6 flex flex-col sm:flex-row justify-between items-center">
          {/* Social Links */}
          <div className="flex space-x-5 mb-4 sm:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2  rounded-full  transition"
              >
                <social.icon className="w-5 h-5 text-black" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-black text-sm text-center sm:text-right">
            © {currentYear} Your Company. All rights reserved.{" "}
            <a href="#" className="hover:text-black ml-2">Privacy Policy</a> |
            <a href="#" className="hover:text-black ml-2">Terms</a>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot1 />
    </footer>
  );
};

export default Footer;

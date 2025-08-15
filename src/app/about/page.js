'use client'

import React from "react";
import { FaUsers, FaRobot, FaBell, FaCheckCircle, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function page() {
  const features = [
    { icon: <FaRobot className="text-4xl text-[#02325a]" />, title: "AI-Driven Matching", description: "Smart algorithms to match your skills with the perfect job" },
    { icon: <FaUsers className="text-4xl text-[#02325a]" />, title: "Verified Employers", description: "Network of pre-screened and verified hiring companies" },
    { icon: <FaBell className="text-4xl text-[#02325a]" />, title: "Real-time Alerts", description: "Instant notifications for relevant job opportunities" },
    { icon: <FaCheckCircle className="text-4xl text-[#02325a]" />, title: "Easy Applications", description: "Streamlined process to apply with just a few clicks" }
  ];

  const workflowSteps = [
    { number: 1, title: "Create Profile", description: "Sign up and build your professional profile" },
    { number: 2, title: "Browse Jobs", description: "Explore opportunities matching your skills" },
    { number: 3, title: "Apply & Connect", description: "Submit applications and connect with employers" },
    { number: 4, title: "Get Hired", description: "Land your dream job and start your journey" }
  ];

  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      quote: "Found my dream job within weeks! The AI matching really works.",
      name: "Sarah Johnson",
      position: "Senior Developer at TechCorp"
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      quote: "The platform's user experience is unmatched. Highly recommended!",
      name: "Michael Chen",
      position: "Product Manager at InnovateCo"
    },
    {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      quote: "Professional network that actually delivers results.",
      name: "Emily Rodriguez",
      position: "Marketing Director at BrandX"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902"
            alt="Career professionals networking"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Connecting Talent with Opportunity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-200 mb-8"
          >
            Your journey to career success starts here
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#02325a] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Start Your Journey
          </motion.button>
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <p className="text-gray-600 mb-6">
              We are revolutionizing the way people find their dream jobs through innovative technology and human-centered design.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To empower individuals in their career journey by connecting them with meaningful opportunities through cutting-edge technology.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p className="text-gray-600">
                  To become the world's most trusted platform for career growth and professional development.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Team collaboration"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#02325a] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <FaQuoteRight className="text-[#02325a] text-2xl mb-4 mx-auto" />
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


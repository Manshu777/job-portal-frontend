"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import LeftCommonCard from "../LeftCommonCard";
import axios from "axios";
import { baseurl } from "@/app/components/common";
import Swal from 'sweetalert2';
export default function Page() {
  const router = useRouter();
  
  const employeeOptions = [
    { label: "0-50", value: "0-50" },
    { label: "51-100", value: "51-100" },
    { label: "101-300", value: "101-300" },
    { label: "301-500", value: "301-500" },
    { label: "501-1000", value: "501-1000" },
    { label: "1000 above", value: "1000 above" },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    password: "",
    isConsultancy: false,
    agreedTerms: false,
    employees: "",
    contact_phone: "",
    companyLocation:"",
    gst_certificate: null, // New field for GST certificate file
    company_pan_card: null, 
    others_doc: null, // New field for other document file

    // Optional fields (uncomment if needed)
    // companyLocation: "",
    // contactPerson: "",
    // contactPhone: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const [sessionToken, setSessionToken] = useState(null);
  // Replace with actual session_token source
useEffect(() => {
    const token = localStorage.getItem('employerToken');
    setSessionToken(token);
  }, []); // Empty dependency array ensures this runs once on mount




 const handleChange = (e) => {
  const { name, files, type, value, checked } = e.target;
  if (type === "file") {
    setFormData({ ...formData, [name]: files[0] });
  } else if (type === "checkbox") {
    setFormData({ ...formData, [name]: checked });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.agreedTerms) {
      setError("You must agree to the terms and conditions.");
      setLoading(false);
      return;
    }

    // Validation: At least one of gst_certificate, company_pan_card, or others_doc is required
    // If neither gst_certificate nor company_pan_card is provided, others_doc is mandatory
    if (!formData.gst_certificate && !formData.company_pan_card && !formData.others_doc) {
      setError("You must upload at least one of GST Certificate, Company PAN Card, or Other document.");
      setLoading(false);
      return;
    }

    const getEmail = localStorage.getItem("emp-email");
    // Create FormData object for multipart/form-data request
    const payload = new FormData();
    payload.append("name", formData.fullName);
    payload.append("contact_email", getEmail);
    payload.append("company_name", formData.companyName);
    payload.append("contact_phone", formData.contact_phone);
    payload.append("company_location", formData.companyLocation);
    payload.append("password", formData.password);
    payload.append("session_token", sessionToken);

    if (formData.gst_certificate) {
      payload.append("gst_certificate", formData.gst_certificate);
    }
    if (formData.company_pan_card) {
      payload.append("company_pan_card", formData.company_pan_card);
    }
    if (formData.others_doc) {
      payload.append("company_pan_card", formData.others_doc);
    }

    try {
      const response = await axios.post(`${baseurl}/employer/signup`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Signup successful:", response.data);
      localStorage.setItem("employerToken", response.data.token);

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "You have successfully signed up!",
        confirmButtonColor: "#309689",
        timer: 2000,
        timerProgressBar: true,
      });

      window.location.href = "/employer/dashboard";
    } catch (err) {
      console.error("Signup error:", err);
      let errorMessage = "An error occurred during signup.";
      if (err.response?.data?.errors) {
        errorMessage = Object.values(err.response.data.errors).flat().join(", ");
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (!err.response) {
        errorMessage = "Network error. Please check your connection.";
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        confirmButtonColor: "#309689",
      });

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
};

  const companies = [
    "Swiggy",
    "Zomato",
    "Amazon",
    "Google",
    "Flipkart",
    "Infosys",
    "TCS",
    "Wipro",
  ];

  const [company, setCompany] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = companies.filter((item) =>
    item.toLowerCase().includes(company.toLowerCase())
  );

  const handleSelect = (value) => {
    setCompany(value);
    setFormData((prev) => ({ ...prev, companyName: value }));
    setShowDropdown(false);
  };

  return (
    <div className="container mx-auto relative flex flex-col-reverse lg:flex-row items-center xl:items-stretch py-12 md:py-0 gap-y-10">
      <div className="absolute inset-0 bg-[#d2dfdd00] -z-10" />
      <div className="w-full lg:w-[40%] p-6 md:p-10 lg:p-16 bg-[#37283A]">
        <LeftCommonCard />
      </div>
      <div className="w-full flex justify-center bg-[#fff] px-4 md:px-10 py-6">
        <div className="max-w-lg mx-auto lg:max-w-[80%] border border-gray-500 bg-white shadow-2xl rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Let’s get you started!</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
           <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Your full name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="relative">
        <label className="block text-gray-700 font-semibold mb-1">
          Company name
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="e.g. Swiggy"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>


      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="contact_phone"
          value={formData.contact_phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Company Location
        </label>
        <input
          type="text"
          name="companyLocation"
          value={formData.companyLocation}
          onChange={handleChange}
          placeholder="Enter Company Location State"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          GST Certificate (PDF) /  Company PAN Card (PDF) /  Other's Document (PDF)
        </label>
        <input
          type="file"
          name="gst_certificate"
          accept="application/pdf"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>


      <div>
        <p className="text-gray-700 font-medium">
          Number of employees in your company
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {employeeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`border px-4 py-1.5 rounded-full text-sm transition ${
                formData.employees === option.value
                  ? "bg-[#309689] text-white"
                  : "bg-gray-100 hover:bg-blue-100 text-gray-800"
              }`}
              onClick={() =>
                setFormData({ ...formData, employees: option.value })
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-start mt-2 space-x-2">
        <input
          type="checkbox"
          name="agreedTerms"
          checked={formData.agreedTerms}
          onChange={handleChange}
          className="w-5 h-5 mt-1"
          required
        />
        <label className="text-gray-600 text-sm">
          I agree to Hire Bot{" "}
          <span className="text-[#02325a] underline">Terms of Service</span> and{" "}
          <span className="text-[#02325a] underline">Privacy Policy</span>
        </label>
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-[#309689] text-white font-semibold rounded-md hover:bg-[#267a73] transition transform hover:-translate-y-1"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
        </div>
      </div>
    </div>
  );
}
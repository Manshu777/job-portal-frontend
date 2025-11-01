"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import axios from "axios";
import { baseurl } from "@/app/components/common";
import First from "../CondidateCompo/First";
import Second from "../CondidateCompo/Second";
import Three from "../CondidateCompo/Three";
import Four from "../CondidateCompo/Four";
import Five from "../CondidateCompo/Five";
import data from "@/app/jobdata";
import Swal from "sweetalert2";
import { FiChevronLeft, FiChevronRight, FiCheck } from "react-icons/fi";

export default function Page() {
  const [profilePic, setProfilePic] = useState(null);
  const router = useRouter();
  // const [isChecked, setIsChecked] = useState(false);
  // const [selectedGender, setSelectedGender] = useState(null);
  // const [fullName, setFullName] = useState("");
  // const [dob, setDob] = useState("");
  // const [number, setNumber] = useState("");
  const [alldata, setalldata] = useState({
    full_name: "",
    dob: "",
    gender: "",
    number: "",
    degree: "",
    college_name: "",
    passing_marks: "",
    experience_years: "",
    job_roles: "",
    job_title: "",
    experience_months: "",
    company_name: "",
    is_pursuing: "Yes",
    highest_education: "",
    is_working: "Yes",
    notice_period: "",
    prefers_night_shift: 0,
    prefers_day_shift: 1,
    work_from_home: 0,
    work_from_office: 1,
    field_job: 0,
    preferred_language: "",
    skills: [],
    password: "",
    english_level: "",
    highest_education: "",
    
    specialization: "",
    college_name: "",

    preferred_job_titles: [],
    preferred_locations: [],
    highest_education: "",
  currently_pursuing: "No",



  // NESTED education blocks – **exactly** what the API expects
  graduation: {
    education_level: "",
    specialization: "",
    college_name: "",
    complete_years: "",
    complete_month: "",
    school_medium: "",
  },
  postGraduation: {
    education_level: "",
    specialization: "",
    college_name: "",
    complete_years: "",
    complete_month: "",
    school_medium: "",
  },
  
    preferred_languages: [],
    state: "",
    city: "",
    experience_level: ''
  });

  const [resume, setResume] = useState();
  const [nextlen, setnextlen] = useState(1);
  const [errors, setErrors] = useState({}); // State to track validation errors
  const [isStepValid, setIsStepValid] = useState(false); //

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    console.log("Validating step:", step, "with data:", alldata);

    if (step === 2) {
      if (!alldata?.full_name?.trim()) {
        newErrors.full_name = "Full name is required";
        isValid = false;
      }
      if (!alldata?.dob) {
        newErrors.dob = "Date of birth is required";
        isValid = false;
      }
      if (!alldata?.gender) {
        newErrors.gender = "Gender is required";
        isValid = false;
      }
      if (!alldata?.number?.trim() || !/^\d{10}$/.test(alldata.number)) {
        newErrors.number = "Valid 10-digit phone number is required";
        isValid = false;
      }

      if (!alldata?.state) {
        newErrors.state = "State is required";
        isValid = false;
      }

      if (!alldata?.city) {
        newErrors.city = "City is required";
        isValid = false;
      }
    } 
    else if (step === 3) {
      if (!alldata?.highest_education) {
    newErrors.highest_education = "Highest education is required";
    isValid = false;
  }
  
  // Fix: Separate validation for school_medium
  if (["10th", "12th"].includes(alldata.highest_education) && !alldata.school_medium) {
    newErrors.school_medium = "School medium is required";
    isValid = false;
  }
  
  // For Graduate/Post Graduate
 

    }
    else if (step === 4) {
      if(!alldata.experience_level){
          newErrors.experience_level = "Experience Level is required";
        isValid = false;
      }
      
    } else if (step === 5) {
    } else if (step === 6) {
      if (alldata?.skills?.length === 0) {
        newErrors.skills = "At least one skill is required";
        isValid = false;
      }
      if (!alldata?.password?.trim()) {
        newErrors.password = "Password is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    setIsStepValid(isValid);
    return isValid;
  };

  // Re-validate step whenever alldata or resume changes

  // useEffect(() => {
  //   validateStep(nextlen);
  // }, [nextlen]);

  const handelresume = (e) => {
    const file = e.target.files[0];
    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeBytes) {
        setErrors((prev) => ({
          ...prev,
          resume: `File size exceeds ${maxSizeMB}MB limit`,
        }));
        setResume(null);
        Swal.fire({
          title: "File Too Large",
          text: `Please upload a resume smaller than ${maxSizeMB}MB.`,
          icon: "error",
        });
      } else {
        setResume(file);
        setErrors((prev) => {
          const { resume, ...rest } = prev;
          return rest;
        });
      }
    }
  };

 const handelinputs = (e) => {
  const { name, value } = e.target;
  const [parent, child] = name.split('.');

  if (child) {
    setalldata((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [child]: value },
    }));
  } else {
    setalldata((prev) => ({ ...prev, [name]: value }));
  }
};

  const handelgender = (gender) => {
    setalldata({ ...alldata, gender });
  };

  const handelcheckbox = (key, value) => {
    setalldata({ ...alldata, [key]: value });
  };


  const handelSubmit = async () => {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage?.getItem("port_tok") || alldata?.token;
  }

  if (!token) {
    console.error("No token found");
    router.push("/");
    return;
  }

  const formData = new FormData();

  // Define fields that are objects and need to be stringified
  // const nestedObjectFields = ['graduation', 'postGraduation'];

  const arrayFields = ['skills', 'preferred_job_titles', 'preferred_languages', 'preferred_locations'];
const nestedObjectFields = ['graduation', 'postGraduation']; // Add more if needed

Object.entries(alldata).forEach(([key, value]) => {
  // Skip internal or unwanted keys
  if (value === undefined) {
    formData.append(key, "");
    return;
  }

  if (value === null) {
    formData.append(key, "");
    return;
  }

  // Handle array fields (skills, preferred_*, etc.)
  if (arrayFields.includes(key)) {
    const values = Array.isArray(value)
      ? value
      : typeof value === 'string' && value.trim() !== ''
        ? value.split(',').map(item => item.trim()).filter(Boolean)
        : [];

    values.forEach(item => {
      formData.append(`${key}[]`, item);
    });
    return;
  }

  // Handle nested objects: graduation, postGraduation
  if (nestedObjectFields.includes(key) && typeof value === 'object' && value !== null) {
    formData.append(key, JSON.stringify(value));
    return;
  }

  // Default: append scalar values (string, number, boolean)
  formData.append(key, value);
});
  if (resume) {
    formData.append("resume", resume);
  }

  try {
    const response = await axios.post(
      `${baseurl}/updatecandidate/${token}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data.success) {
      Swal.fire({ title: "Success", text: "Profile updated!", icon: "success" });
      router.push("/candidate/dashboard");
    } else {
      Swal.fire({ title: "Error", text: response.data.message || "Update failed", icon: "error" });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({ title: "Error", text: "Submission failed", icon: "error" });
  }
};



  const getcondidate = async (token) => {
    if (!token) {
      router.push("/");
      return;
    }
    try {
      const response = await axios.get(`${baseurl}/candidateinfo/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setalldata(response.data.candidate);
      }
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      router.push("/");
    }
  };

  useEffect(() => {
    // if (typeof window !== "undefined") {
      const token = localStorage?.getItem("port_tok");
      getcondidate(token);
    // }
  }, [router]);

  const addskilles = (skill) => {
    if (
      skill.trim() !== "" &&
      !alldata.skills.includes(skill) &&
      alldata.skills.length < 10
    ) {
      setalldata({ ...alldata, skills: [...alldata.skills, skill] });
    }
  };

  const nextFormlvl = async (nextlen) => {
    const isValid = validateStep(nextlen);

    console.log("Next Level:", nextlen, "Is Valid:", isValid);
    if (isValid) {
      setnextlen(nextlen);
    } else {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill all required fields correctly.",
        icon: "error",
      });
    }
  };

  // console.log("alldata", alldata);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 md:px-12 xl:px-24 py-10 lg:py-14">
      <div className="w-full lg:w-[90%] mx-auto flex flex-col lg:flex-row gap-10">

        <div className="w-full lg:w-1/2 flex flex-col gap-6">

          <div className="relative rounded-3xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              alt="Professional workspace"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">
                  Build Your Career Profile
                </h2>
                <p className="opacity-90">
                  Join thousands of professionals finding their dream jobs
                </p>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-32 overflow-hidden rounded-xl mb-3">
                <img
                  src="https://images.unsplash.com/photo-1570126618953-d437176e8c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80"
                  alt="Full-time jobs"
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="font-semibold text-center">Full-Time Roles</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-32 overflow-hidden rounded-xl mb-3">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                  alt="Part-time jobs"
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="font-semibold text-center">Part-Time Gigs</h3>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Application Form</h1>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-all ${nextlen === step ? "bg-white" : "bg-white/30"
                      }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 opacity-90">Step {nextlen} of 5</p>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8 h-[calc(100%-180px)] overflow-y-auto">
            {nextlen === 1 && (
              <First
                alldata={alldata}
                handelinputs={handelinputs}
                handelgender={handelgender}
                errors={errors}
              />
            )}
            {nextlen === 2 && (
              <Second
                alldata={alldata}
                handelinputs={handelinputs}
                handelgender={handelgender}
                errors={errors}
              />
            )}
            {nextlen === 3 && (
              <Three
                alldata={alldata}
                handelinputs={handelinputs}
                handelgender={handelgender}
                errors={errors}
              />
            )}
            {nextlen === 4 && (
              <Four
                alldata={alldata}
                handelinputs={handelinputs}
                handelcheckbox={handelcheckbox}
                errors={errors}
              />
            )}
            {nextlen === 5 && (
              <Five
                alldata={alldata}
                setalldata={setalldata}
                handelinputs={handelinputs}
                handelresume={handelresume}
                resume={resume}
                errors={errors}
                profile_pic={profilePic}
                setProfilePic={setProfilePic}
              />
            )}
          </div>

          {/* Form Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between">
            <button
              disabled={nextlen === 1}
              onClick={() => setnextlen(nextlen - 1)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${nextlen === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
            >
              <FiChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {nextlen < 5 ? (
              <button
                onClick={() => nextFormlvl(nextlen + 1)}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
                <FiChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handelSubmit}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 animate-pulse transition-all"
              >
                Submit Application
                <FiCheck className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

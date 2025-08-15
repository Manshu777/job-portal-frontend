"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { jobsData } from "../data/jobs";
import {
  ChevronRight,
  Upload,
  FileText,
  CheckCircle,
  Building,
  MapPin,
} from "lucide-react";

export default function JobApplyClient({ params: paramsPromise }) {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    coverLetter: "",
    agreeToTerms: false,
  });

  // Resolve params promise
  const params = use(paramsPromise);
  const resolvedParams = typeof params === 'string' ? JSON.parse(params) : params;

  useEffect(() => {
    if (!resolvedParams?.location || !resolvedParams?.jobname) {
      console.warn('Invalid params:', resolvedParams);
      return;
    }

    console.log('Params:', { location: resolvedParams.location, jobname: resolvedParams.jobname });
    const jobSlug = resolvedParams.jobname.replace(/-/g, " ").trim();
    console.log('Looking for:', { jobSlug, location: resolvedParams.location });

    const foundJob = jobsData.find(
      (j) =>
        j.title.toLowerCase().trim() === jobSlug.toLowerCase() &&
        j.location.toLowerCase().trim() === resolvedParams.location.toLowerCase().trim()
    );

    console.log('Found Job:', foundJob);
    setJob(foundJob);
  }, [resolvedParams]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (!resolvedParams?.location || !resolvedParams?.jobname) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Job URL
          </h1>
          <p className="text-gray-600 mb-8">
            The job URL is invalid. Please check the link or try again.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Job Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="bg-white rounded-lg shadow-md text-center">
            <div className="p-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Application Submitted Successfully!
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for applying to <strong>{job.title}</strong> at{" "}
                <strong>{job.company}</strong>. We've received your application
                and will review it shortly.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/")}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse More Jobs
                </button>
                <button
                  onClick={() =>
                    router.push(`/jobs/${resolvedParams.location}/${resolvedParams.jobname}`)
                  }
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Job Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => router.push("/jobs")}
              className="hover:text-blue-600"
            >
              Jobs
            </button>
            <ChevronRight className="h-4 w-4" />
            <span className="capitalize">{resolvedParams.location}</span>
            <ChevronRight className="h-4 w-4" />
            <button
              onClick={() =>
                router.push(`/jobs/${resolvedParams.location}/${resolvedParams.jobname}`)
              }
              className="hover:text-blue-600"
            >
              {job.title}
            </button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Apply</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">
                  Apply for {job.title}
                </h2>
                <p className="text-gray-600">
                  Fill out the form below to submit your application
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="experience"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Years of Experience *
                        </label>
                        <select
                          onChange={(e) =>
                            handleInputChange("experience", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="noticePeriod"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Notice Period
                        </label>
                        <select
                          onChange={(e) =>
                            handleInputChange("noticePeriod", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select notice period</option>
                          <option value="immediate">Immediate</option>
                          <option value="15-days">15 days</option>
                          <option value="1-month">1 month</option>
                          <option value="2-months">2 months</option>
                          <option value="3-months">3 months</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="currentSalary"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Current Salary (Optional)
                        </label>
                        <input
                          id="currentSalary"
                          placeholder="e.g., $50,000"
                          value={formData.currentSalary}
                          onChange={(e) =>
                            handleInputChange("currentSalary", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="expectedSalary"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Expected Salary
                        </label>
                        <input
                          id="expectedSalary"
                          placeholder="e.g., $60,000"
                          value={formData.expectedSalary}
                          onChange={(e) =>
                            handleInputChange("expectedSalary", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Documents
                    </h3>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload your resume (PDF, DOC, DOCX)
                          </p>
                          <button
                            type="button"
                            className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            Choose File
                          </button>
                        </div>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                        <div className="text-center">
                          <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload cover letter (Optional)
                          </p>
                          <button
                            type="button"
                            className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            Choose File
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label
                      htmlFor="coverLetter"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      placeholder="Tell us why you're interested in this position..."
                      rows={6}
                      value={formData.coverLetter}
                      onChange={(e) =>
                        handleInputChange("coverLetter", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.agreeToTerms}
                      onChange={(e) =>
                        handleInputChange("agreeToTerms", e.target.checked)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!formData.agreeToTerms}
                    >
                      Submit Application
                    </button>
                    <button
                      type="button"
                      className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        router.push(
                          `/jobs/${resolvedParams.location}/${resolvedParams.jobname}`
                        )
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Job Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md sticky top-4">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Job Summary</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex items-center gap-1 text-gray-600 mt-1">
                      <Building className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job Type:</span>
                        <span className="font-medium">{job.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-medium">{job.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary:</span>
                        <span className="font-medium text-green-600">
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">
                      By applying, you agree to receive communications regarding
                      your application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
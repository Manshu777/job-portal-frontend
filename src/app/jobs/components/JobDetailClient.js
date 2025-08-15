"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { jobsData } from "../data/jobs";
import RelatedJobs from "./RelatedJobs";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Building,
  Calendar,
  ChevronRight,
  Heart,
  Share2,
} from "lucide-react";

export default function JobDetailClient({ params: paramsPromise }) {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  // Resolve params promise
  const params = use(paramsPromise);
  const resolvedParams = typeof params === 'string' ? JSON.parse(params) : params;

  useEffect(() => {
    if (!resolvedParams?.location || !resolvedParams?.jobname) {
      console.warn('Invalid params:', resolvedParams);
      return;
    }

    // console.log('Params:', { location: resolvedParams.location, jobname: resolvedParams.jobname });
    const jobSlug = resolvedParams.jobname.replace(/-/g, " ").trim();
    // console.log('Looking for:', { jobSlug, location: resolvedParams.location });

    const foundJob = jobsData.find(
      (j) =>
        j.title.toLowerCase().trim() === jobSlug.toLowerCase() &&
        j.location.toLowerCase().trim() === resolvedParams.location.toLowerCase().trim()
    );

    // console.log('Found Job:', foundJob);

    if (foundJob) {
      setJob(foundJob);
      const related = jobsData
        .filter(
          (j) =>
            j.id !== foundJob.id &&
            (j.category === foundJob.category ||
              j.location === foundJob.location ||
              j.company === foundJob.company)
        )
        .slice(0, 3);
      setRelatedJobs(related);
    }
  }, [resolvedParams]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
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

  const handleApply = () => {
    router.push(`/jobs/${resolvedParams.location}/${resolvedParams.jobname}/apply`);
  };

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
            <span className="text-gray-900 font-medium">{job.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{job.postedDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {job.type}
                      </span>
                      <span className="border border-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {job.category}
                      </span>
                      <span className="border border-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {job.experience}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-lg font-semibold">
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="h-5 w-5" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="h-5 w-5" />
                        <span>{job.applicants} applicants</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className={`p-2 border rounded-lg transition-colors ${
                        isSaved
                          ? "text-red-600 border-red-600"
                          : "text-gray-500 border-gray-300 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                      />
                    </button>
                    <button className="p-2 border border-gray-300 text-gray-500 hover:text-blue-500 rounded-lg transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Job Description</h2>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Responsibilities
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    {job.responsibilities?.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Requirements
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    {job.requirements?.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Skills Required
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Jobs */}
            <RelatedJobs jobs={relatedJobs} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply Section */}
            <div className="bg-white rounded-lg shadow-md mb-6 sticky top-4">
              <div className="p-6">
                <button
                  onClick={handleApply}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-4"
                >
                  Apply Now
                </button>
                <div className="text-center text-sm text-gray-600 mb-4">
                  Quick apply with your profile
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Type:</span>
                    <span className="font-medium">{job.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{job.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium">{job.postedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium text-orange-600">
                      {new Date(
                        Date.now() + 30 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">About {job.company}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {job.companyDescription ||
                      `${job.company} is a leading company in the ${job.category} industry, committed to innovation and excellence.`}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-medium">{job.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company Size:</span>
                      <span className="font-medium">201-500 employees</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded:</span>
                      <span className="font-medium">2010</span>
                    </div>
                  </div>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    View Company Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
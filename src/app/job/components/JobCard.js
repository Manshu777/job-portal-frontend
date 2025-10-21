'use client';
import { useState } from "react";
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Users,
  Heart,
  BookmarkPlus
} from 'lucide-react';
import { baseurl } from "@/app/components/common";
import axios from "axios";
export default function JobCard({ job,hasApplied, setAppliedJobs }) {
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState(null);

  
  const jobUrl = `/jobs/${job.location.toLowerCase().replace(/\s+/g, '-')}/${job?.title?.toLowerCase().replace(/\s+/g, '-')}`;
  const stripHtml = (html) => {
    if (!html) return 'No description available';
    return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  };




   const truncateDescription = (html) => {
    if (!html) return 'No description available';
    // Strip HTML tags and normalize whitespace
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    // Split into words
    const words = text.split(' ');
    // Take first 35 words and append ellipsis if longer
    if (words.length > 35) {
      return words.slice(0, 35).join(' ') + '...';
    }
    return text;
  };


  const handleApply = async () => {
    if (hasApplied) return; // Prevent re-applying

    setIsApplying(true);
    setError(null);

    try {
      const response = await axios.post(
        `${baseurl}/job-applications`,
        { job_posting_id: job.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("port_tok")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setAppliedJobs((prev) => [...prev, job.id]); // Update applied jobs
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to apply for the job");
    } finally {
      setIsApplying(false);
    }
  };


  const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};




  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-600 p-6">
      <div className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <Link href={`job/${job?.slug}`}>
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer mb-2">
                {job?.job_title}
              </h3>
            </Link>
            <div className="flex items-center gap-4 text-gray-600 mb-3">
            
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
              
                <span>{formatDate(job.updated_at)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{job.job_type}</span>
              <span className="border border-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">{job.work_location_type}</span>
              <span className="border border-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">{job?.totalExperienceMax == null ? "Fresher" : job?.totalExperienceMax}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
              <BookmarkPlus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div>
       
       <p className="text-gray-700 mb-6">{truncateDescription(job.job_description)}</p>
         
       
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <span>₹</span>
              <span>{job.min_salary}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Users className="h-4 w-4" />
              <span>{job.applicants} applicants</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Link href={`job/${job?.slug}`}>
              <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                View Details
              </button>
            </Link>
            <button
        onClick={handleApply}
        disabled={hasApplied || isApplying}
        className={` px-4 py-2 rounded-lg text-white ${
          hasApplied
            ? "bg-green-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } transition-colors`}
      >
        {hasApplied ? "Applied" : isApplying ? "Applying..." : "Apply Now"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
} 
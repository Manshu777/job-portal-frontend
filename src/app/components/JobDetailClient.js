'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function JobDetailClient({ job: response }) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Extract job and formatted from response
  const { job, formatted } = response;

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get('http://147.93.18.63:8001/api/v1/job-applications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('port_tok')}`,
          },
        });
        if (response.data.success) {
          setHasApplied(response.data.appliedJobIds.includes(job.id));
        }
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: 'Failed to load application status. Please try again.',
        // });
      }
    };

    if (job?.id) {
      fetchAppliedJobs();
    }
  }, [job?.id]);

  if (!job || !formatted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Job not found
      </div>
    );
  }

  // Derive postedDate from job.created_at
  const postedDate = job.created_at
    ? new Date(job.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  // Derive applicants (using job.viewed_number as fallback)
  const applicants = job.viewed_number || 0;

  // Use formatted salary from backend
  const salary = `${formatted['Job Details']['Min Salary']} - ${formatted['Job Details']['Max Salary']} ${formatted['Job Details']['Pay Type']}`;

  const handleApply = async () => {
    if (hasApplied) return;

    setIsApplying(true);

    try {
      const response = await axios.post(
        'http://147.93.18.63:8001/api/v1/job-applications',
        { job_posting_id: job.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('port_tok')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        setHasApplied(true);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successfully applied for the job!',
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to apply for the job';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => router.push('/jobs')}
              className="hover:text-blue-600"
            >
              Jobs
            </button>
            <ChevronRight className="h-4 w-4" />
            <span className="capitalize">{formatted['Job Details']['Work Location']}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{formatted['Job Details']['Job Title']}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Job Main Card */}
            <div className="bg-white rounded-lg shadow-md mb-6 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {formatted['Job Details']['Job Title']}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span className="font-medium">{formatted['About Company']['Name'] || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{formatted['Job Details']['Work Location']}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{postedDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-lg font-semibold">
                <div className="flex items-center gap-1 text-green-600">
                  <span>₹</span>
                  <span>{salary}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span>{applicants} applicants</span>
                </div>
              </div>
              {formatted['Job Details']['Incentive'] && (
                <div className="mt-2 text-gray-600">
                  <strong>Incentive:</strong> {formatted['Job Details']['Incentive']}
                </div>
              )}
              {formatted['Job Details']['Employment Type'] && (
                <div className="mt-2 text-gray-600">
                  <strong>Employment Type:</strong> {formatted['Job Details']['Employment Type']}
                </div>
              )}
              {formatted['Job Details']['Shift'] && (
                <div className="mt-2 text-gray-600">
                  <strong>Shift:</strong> {formatted['Job Details']['Shift']}
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-md mb-6 p-6">
              <h2 className="text-lg font-semibold mb-4">Job Description</h2>
              <div
                className="text-gray-700 mb-6"
                dangerouslySetInnerHTML={{ __html: job.job_description }}
              />
              {formatted['Requirements']['Additional Requirements']?.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Additional Requirements</h2>
                  <ul className="list-disc grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2  pl-5 text-gray-700">
                    {formatted['Requirements']['Additional Requirements'].map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              {formatted['Requirements']['Perks']?.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Perks</h2>
                  <ul className="list-disc pl-5 text-gray-700">
                    {formatted['Requirements']['Perks'].map((perk, index) => (
                      <li key={index}>{perk}</li>
                    ))}
                  </ul>
                </div>
              )}
              {formatted['Requirements']['Degree Specialization']?.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Degree Specialization</h2>
                  <ul className="list-disc pl-5 text-gray-700">
                    {formatted['Requirements']['Degree Specialization'].map((degree, index) => (
                      <li key={index}>{degree}</li>
                    ))}
                  </ul>
                </div>
              )}
              {formatted['Requirements']['English Level'] && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">English Level</h2>
                  <p className="text-gray-700">{formatted['Requirements']['English Level']}</p>
                </div>
              )}
              {formatted['Requirements']['Gender Preference'] && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Gender Preference</h2>
                  <p className="text-gray-700">{formatted['Requirements']['Gender Preference']}</p>
                </div>
              )}
              {formatted['Job Details']['Role / Category'] && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Role / Category</h2>
                  <p className="text-gray-700">{formatted['Job Details']['Role / Category']}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md mb-6 sticky top-4 p-6">
              <button
                onClick={handleApply}
                disabled={hasApplied || isApplying}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                  hasApplied
                    ? 'bg-green-600 cursor-not-allowed'
                    : isApplying
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {hasApplied ? 'Applied' : isApplying ? 'Applying...' : 'Apply Now'}
              </button>
              <div className="text-center text-sm text-gray-600 mt-2">
                Quick apply with your profile
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-2 ${isSaved ? 'text-red-600' : 'text-gray-600'} hover:text-red-700`}
                >
                  <Heart className="h-5 w-5" />
                  {isSaved ? 'Saved' : 'Save Job'}
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Company Information</h2>
              <p><strong>Name:</strong> {formatted['About Company']['Name'] || 'N/A'}</p>
              <p><strong>Address:</strong> {formatted['About Company']['Address'] || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
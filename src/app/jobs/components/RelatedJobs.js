'use client';

import Link from 'next/link';
import { MapPin, DollarSign, Building } from 'lucide-react';

export default function RelatedJobs({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Related Jobs</h3>
        <p className="text-gray-600">You might also be interested in these positions</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {jobs.map((job) => {
            const jobUrl = `/jobs/${job.location.toLowerCase().replace(/\s+/g, '-')}/${job.title.toLowerCase().replace(/\s+/g, '-')}`;
            
            return (
              <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <Link href={jobUrl}>
                      <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                        {job.title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                    <DollarSign className="h-3 w-3" />
                    <span>{job.salary}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    {job.type}
                  </span>
                  <span className="border border-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {job.experience}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Link href={jobUrl}>
                    <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      View Details
                    </button>
                  </Link>
                  <Link href={`${jobUrl}/apply`}>
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Apply Now
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
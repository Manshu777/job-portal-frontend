'use client';

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

export default function JobCard({ job }) {
  const jobUrl = `/jobs/${job.location.toLowerCase().replace(/\s+/g, '-')}/${job.title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-600 p-6">
      <div className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <Link href={jobUrl}>
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer mb-2">
                {job.title}
              </h3>
            </Link>
            <div className="flex items-center gap-4 text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{job.postedDate}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{job.type}</span>
              <span className="border border-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">{job.category}</span>
              <span className="border border-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">{job.experience}</span>
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
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Users className="h-4 w-4" />
              <span>{job.applicants} applicants</span>
            </div>
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
      </div>
    </div>
  );
} 
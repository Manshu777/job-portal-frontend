export default function SkeletonLoader({ count }) {
    return (
      <div className="space-y-6">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse space-y-4 p-5 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              </div>
            ))}
            <div className="h-10 w-full bg-gray-300 rounded-lg mt-4"></div>
          </div>
        ))}
      </div>
    );
  }
export default function JobCard({ jobcard }) {

  // Parse JSON strings for other_job_titles and degree_specialization
let otherJobTitles = [];
  const rawOtherJobTitles = jobcard?.other_job_titles;

  if (typeof rawOtherJobTitles === "string" && rawOtherJobTitles.trim() !== "") {
    try {
      // Attempt to parse the string as JSON
      otherJobTitles = JSON.parse(rawOtherJobTitles);
      // Ensure the result is an array
      if (!Array.isArray(otherJobTitles)) {
        console.warn(
          `Parsed other_job_titles is not an array: ${rawOtherJobTitles}`,
          otherJobTitles
        );
        otherJobTitles = [];
      }
    } catch (error) {
      console.error(
        `Error parsing other_job_titles: "${error.message}" for value: "${rawOtherJobTitles}"`,
        { jobId: jobcard?.id }
      );
      otherJobTitles = [];
    }
  } else {
    // Handle null, undefined, empty string, or non-string cases
    otherJobTitles = [];
  }
  // Format created_at date
  const formattedDate = new Date(jobcard.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
   <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 transform hover:scale-105 transition-transform duration-300 border border-gray-100 hover:border-[#309689]">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{jobcard.job_title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {otherJobTitles.length > 0 ? (
              otherJobTitles.map((title, idx) => (
                <span
                  key={idx}
                  className="text-sm text-[#309689] bg-[#3096891A] rounded-full px-3 py-1"
                >
                  {title}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500 italic">No additional titles</span>
            )}
          </div>
        </div>
        <button className="bg-[#309689] text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-[#287f74] transition-colors duration-200">
          Apply Now
        </button>
      </div>

      {/* Job Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center space-x-3">
          {/* <MdWork className="text-[#309689] text-xl" /> */}
          <div>
            <span className="font-semibold text-sm">Job Type</span>
            <p className="text-base">{jobcard.job_type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* <FaMapMarkerAlt className="text-[#309689] text-xl" /> */}
          <div>
            <span className="font-semibold text-sm">Location</span>
            <p className="text-base">{jobcard.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* <FaDollarSign className="text-[#309689] text-xl" /> */}
          <div>
            <span className="font-semibold text-sm">Compensation</span>
            <p className="text-base">
              {jobcard.compensation} ({jobcard.pay_type})
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* <IoTimeOutline className="text-[#309689] text-xl" /> */}
          <div>
            <span className="font-semibold text-sm">Work Location</span>
            <p className="text-base">{jobcard.work_location_type}</p>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="space-y-3 text-gray-600">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-sm">Experience Required:</span>
          <p className="text-base">{jobcard.total_experience_required} years</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-sm">Education:</span>
          <div className="flex flex-wrap gap-2">
            {/* {degreeSpecialization?.length > 0 ? (
              degreeSpecialization?.map((degree, idx) => (
                <span
                  key={idx}
                  className="text-sm text-[#309689] bg-[#3096891A] rounded-full px-3 py-1"
                >
                  {degree}
                </span>
              ))
            ) : (
              <span className="text-base">Not specified</span>
            )} */}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-sm">Walk-in Interview:</span>
          <p className="text-base">{jobcard.is_walkin_interview ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <p>
          <span className="font-semibold">Posted:</span> {formattedDate}
        </p>
        <p className="line-clamp-2">
          <span className="font-semibold">Description:</span>{" "}
          {jobcard.job_description || "No description available"}
        </p>
      </div>
    </div>
  );
}
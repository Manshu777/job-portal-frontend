export let jobsData = [];

console.log(jobsData);
async function fetchJobs() {
  const response = await fetch("hhttp://147.93.18.63:8000/api/v1/jobs");
  const apiData = await response.json();
  
  if (!apiData || !apiData.data || !Array.isArray(apiData.data.data)) {
    console.error("Invalid API data structure");
    return;
  }
  
  // Transform API data
// Transform API data to match job_postings table fields
    const transformedData = apiData.data.data.map((job) => ({
      id: job.id || null,
      employerId: job.employer_id || null,
      companyId: job.company_id || null,
      title: job.job_title || "Untitled Job",
      jobType: job.job_type || "N/A",
      industry: job.industry || "Not Specified",
      department: job.department || "Not Specified",
      jobRole: job.job_role || "Not Specified",
      location: job.location || "Unknown",
      latitude: job.latitude || null,
      longitude: job.longitude || null,
      workLocationType: job.work_location_type || "N/A",
      compensation: job.compensation || 0,
      minSalary: job.min_salary || null,
      maxSalary: job.max_salary || null,
      incentive: job.incentive || null,
      payType: job.pay_type || "N/A",
      joiningFee: job.joining_fee ? "Yes" : "No",
      joiningFeeRequired: job.joining_fee_required || null,
      basicRequirements: job.basic_requirements || "None",
      additionalRequirements: job.additional_requirements
        ? JSON.parse(job.additional_requirements)
        : [],
      isWalkinInterview: job.is_walkin_interview ? "Yes" : "No",
      communicationPreference: job.communication_preference || "N/A",
      totalExperienceRequired: job.total_experience_required || 0,
      totalExperienceMax: job.total_experience_max || null,
      otherJobTitles: job.other_job_titles ? JSON.parse(job.other_job_titles) : [],
      preferredRoles: job.preferred_roles || null,
      degreeSpecialization: job.degree_specialization
        ? JSON.parse(job.degree_specialization)
        : [],
      description: job.job_description || "No description available",
      keyResponsibilities: job.key_responsibilities || "None",
      requiredSkills: job.required_skills || "None",
      jobExpireTime: job.job_expire_time || "N/A",
      numberOfCandidatesRequired: job.number_of_candidates_required || 0,
      englishLevel: job.english_level || "Not Specified",
      genderPreference: job.gender_preference || "No Preference",
      perks: job.perks ? JSON.parse(job.perks) : [],
      interviewLocation: job.interview_location || "N/A",
      interviewMode: job.interview_mode || "N/A",
      contactEmail: job.contact_email || "N/A",
      contactPhone: job.contact_phone || "N/A",
      notEmail: job.not_email ? "Yes" : "No",
      viewedNumber: job.viewed_number || 0,
      createdAt: job.created_at ? new Date(job.created_at).toLocaleDateString() : "N/A",
      updatedAt: job.updated_at ? new Date(job.updated_at).toLocaleDateString() : "N/A",
      isVerified: job.is_verified ? "Yes" : "No",
      slug: job.slug || "N/A",
    }));
  
  jobsData = [...jobsData, ...transformedData];
  console.log(jobsData)
}

fetchJobs();

export let jobsData = [];

console.log(jobsData);
async function fetchJobs() {
  const response = await fetch("http://127.0.0.1:8000/api/v1/jobs");
  const apiData = await response.json();

  if (!apiData || !apiData.data || !Array.isArray(apiData.data.data)) {
    console.error("Invalid API data structure");
    return;
  }

  // Transform API data
  const transformedData = apiData.data.data.map((job) => ({
    id: job.id,
    title: job.job_title,
    company: "Unknown", 
    location: job.location,
    type: job.job_type,
    category: "Unknown",
    experience: `${job.total_experience_required} years`,
    salary: job.compensation,
    postedDate: "N/A", 
    applicants: 0, 
    description: job.job_description,
    responsibilities: [], 
    requirements: job.additional_requirements
      ? JSON.parse(job.additional_requirements)
      : [],
    skills: job.additional_requirements
      ? JSON.parse(job.additional_requirements)
      : [],
    companyDescription: "Not Available", 
  }));

  
  jobsData = [...jobsData, ...transformedData];
}

fetchJobs();

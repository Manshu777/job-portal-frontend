
import { notFound } from 'next/navigation';
import JobDetailClient from '../../components/JobDetailClient'

export default async function JobDetail({ params }) {
  const { slug } = params;

  // Fetch job data from the API using the slug
  try {
    const response = await fetch(`http://localhost:8000/api/v1/job/${slug}`, {
      cache: 'no-store', // Ensure fresh data for SSR
    });

    if (!response.ok) {
      // Handle API errors (e.g., 404)
      notFound(); // Redirect to Next.js 404 page
    }

    const job = await response.json();

    console.log('jobjob',job)

    return (
      <>
     <JobDetailClient job={job} />
      </>
    );
  } catch (error) {
    console.error('Error fetching job:', error);
    notFound(); // Redirect to 404 page on fetch error
  }
}


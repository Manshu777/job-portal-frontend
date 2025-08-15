import { Suspense } from 'react';
import CandidateList from './CandidateList';
import SkeletonLoader from './SkeletonLoader'; // Adjust path if needed

// Fallback component for Suspense
const Fallback = () => (
  <div className="flex min-h-screen bg-gray-100">
    <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-auto">
      <SkeletonLoader count={10} />
    </div>
  </div>
);

export default function Page() {
  return (
    <Suspense fallback={<Fallback />}>
      <CandidateList />
    </Suspense>
  );
}
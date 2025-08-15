'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { baseurl } from '@/app/components/common';
import Sidebar from '@/app/components/Sidebar';
import Swal from 'sweetalert2';

const MultiStepJobPostingForm = dynamic(() => import('@/app/components/MultiStepJobPostingForm'), { ssr: false });

const EditJobPage = () => {
  const [userdata, setUserdata] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = useParams(); // Get job ID from URL

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('employerToken');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Required',
          text: 'Please log in to edit the job',
          confirmButtonColor: '#02325a',
        }).then(() => router.push('/employer/login'));
        return;
      }

      try {
        setLoading(true);
        // Run API calls concurrently
        const [profileRes, companiesRes, jobRes] = await Promise.all([
          axios.get(`${baseurl}/employer/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${baseurl}/companies`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${baseurl}/jobs/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Set user data, companies, and job data
        setUserdata(profileRes.data.data);
        setCompanies(companiesRes.data.data);
        setJobData(jobRes.data.data);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load job details. Please try again.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data?.message || 'Failed to load job details',
          confirmButtonColor: '#02325a',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, router]);

  // Handle form submission for updating the job
  const handleUpdateJob = async (formData) => {
    const token = localStorage.getItem('employerToken');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please log in to update the job',
        confirmButtonColor: '#02325a',
      }).then(() => router.push('/employer/login'));
      return;
    }

    try {
      const response = await axios.put(
        `${baseurl}/jobs/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Job updated successfully',
          confirmButtonColor: '#02325a',
        }).then(() => router.push('/employer/dashboard'));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Failed to update job',
          confirmButtonColor: '#02325a',
        });
      }
    } catch (error) {
      console.error('Error updating job:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error updating job',
        confirmButtonColor: '#02325a',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-lg text-red-600">{error || 'Job not found'}</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 lg:p-12 xl:p-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Job</h1>
        <MultiStepJobPostingForm
          companies={companies}
          userdata={userdata}
          jobData={jobData}
          isEditMode={true}
          onSubmit={handleUpdateJob}
        />
      </div>
    </div>
  );
};

export default EditJobPage;



'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { baseurl } from '@/app/components/common';
import Sidebar from '@/app/components/Sidebar';

const ManageCompanies = () => {
  const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [companyFormData, setCompanyFormData] = useState({
    name: '',
    company_location: '',
    contact_person: '',
    contact_phone: '',
    gst_certificate: null,
    other_certificate: null,
  });
  const [companies, setCompanies] = useState([]);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const token = localStorage.getItem('employerToken');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const companiesRes = await axios.get(`${baseurl}/companies`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (companiesRes.data && companiesRes.data.success) {
          setCompanies(companiesRes.data.data || []);
        }
      } catch (err) {
        setError('Failed to load companies');
        console.error(err);
      }
    };

    fetchCompanies();
  }, [router]);

  const handleCompanyChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setCompanyFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setCompanyFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('employerToken');
      const formData = new FormData();
      formData.append('name', companyFormData.name);
      formData.append('company_location', companyFormData.company_location);
      formData.append('contact_person', companyFormData.contact_person);
      formData.append('contact_phone', companyFormData.contact_phone);
      if (companyFormData.gst_certificate) {
        formData.append('gst_certificate', companyFormData.gst_certificate);
      }
      if (companyFormData.other_certificate) {
        formData.append('other_certificate', companyFormData.other_certificate);
      }

      const res = await axios.post(`${baseurl}/add-companies`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data && res.data.success) {
        setSuccess('Company added successfully, awaiting admin approval');
        setCompanyFormData({
          name: '',
          company_location: '',
          contact_person: '',
          contact_phone: '',
          gst_certificate: null,
          other_certificate: null,
        });
        // Refresh companies list
        const companiesRes = await axios.get(`${baseurl}/companies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (companiesRes.data && companiesRes.data.success) {
          setCompanies(companiesRes.data.data || []);
        }
        setShowAddCompanyModal(false); // Close modal after submission
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add company');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAddCompanyModal = () => {
    setShowAddCompanyModal((prev) => !prev);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}  />
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Companies Header */}
          <div className="bg-white shadow-2xl rounded-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Manage Your Companies
              </h1>
              <button
                onClick={toggleAddCompanyModal}
                className="py-2 px-4 rounded-lg shadow-md text-white font-medium text-sm bg-[#00223f] hover:bg-green-700 transition duration-200"
              >
                Add Company
              </button>
            </div>
            <p className="text-gray-600 mb-8">
              View or add new companies below.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
                {success}
              </div>
            )}

            {/* Companies Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Companies</h2>
              {companies.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                          Company Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                          Location
                        </th>
                       
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                          Contact Phone
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies.map((company) => (
                        <tr key={company.id} className="border-t border-gray-200">
                          <td className="py-3 px-4 text-sm text-gray-600">{company.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {company.company_location || 'N/A'}
                          </td>
                         
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {company.contact_phone || 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span
                              className={`font-semibold ${
                                company.is_approved ? 'text-[#00223f]' : 'text-yellow-600'
                              }`}
                            >
                              {company.is_approved ? 'Approved' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center">No companies added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Company Modal */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Add New Company</h2>
              <button
                onClick={toggleAddCompanyModal}
                className="text-gray-600 hover:text-gray-800 text-xl font-bold"
              >
                ×
              </button>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                {success}
              </div>
            )}
            <form onSubmit={handleCompanySubmit} className="space-y-6">
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  id="company_name"
                  name="name"
                  type="text"
                  value={companyFormData.name}
                  onChange={handleCompanyChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-200"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label htmlFor="company_location" className="block text-sm font-medium text-gray-700">
                  Company Location
                </label>
                <input
                  id="company_location"
                  name="company_location"
                  type="text"
                  value={companyFormData.company_location}
                  onChange={handleCompanyChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-200"
                  placeholder="Enter company location"
                />
              </div>
            
              <div>
                <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
                  Contact Phone
                </label>
                <input
                  id="contact_phone"
                  name="contact_phone"
                  type="tel"
                  value={companyFormData.contact_phone}
                  onChange={handleCompanyChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-200"
                  placeholder="Enter contact phone"
                />
              </div>
              <div>
                <label htmlFor="gst_certificate" className="block text-sm font-medium text-gray-700">
                  GST Certificate (PDF, max 2MB)
                </label>
                <input
                  id="gst_certificate"
                  name="gst_certificate"
                  type="file"
                  accept="application/pdf"
                  onChange={handleCompanyChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="other_certificate" className="block text-sm font-medium text-gray-700">
                  Other Certificate (PDF, max 2MB)
                </label>
                <input
                  id="other_certificate"
                  name="other_certificate"
                  type="file"
                  accept="application/pdf"
                  onChange={handleCompanyChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-200"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={toggleAddCompanyModal}
                  className="py-2 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-2 px-4 rounded-lg shadow-md text-white font-medium text-sm transition duration-200 ${
                    loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-[#00223f] hover:bg-green-700'
                  }`}
                >
                  {loading ? 'Adding...' : 'Add Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCompanies;
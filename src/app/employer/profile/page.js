'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { baseurl } from '@/app/components/common';
import Sidebar from '@/app/components/Sidebar';
import { User, Building2, MapPin, Mail,Loader2, Phone, FileText, Save, Edit3,AlertCircle, CheckCircle2, X } from 'lucide-react';

const EditEmployerProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const router = useRouter();
      const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profileFormData, setProfileFormData] = useState({
    name: '',
    company_name: '',
    company_location: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    gst_number: '',
    gst_certificate: null,
    company_pan_card: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('employerToken');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const profileRes = await axios.get(`${baseurl}/employer/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileRes.data && profileRes.data.success) {
          setProfileFormData({
            name: profileRes.data.data.name || '',
            company_name: profileRes.data.data.company_name || '',
            company_location: profileRes.data.data.company_location || '',
            contact_person: profileRes.data.data.contact_person || '',
            contact_email: profileRes.data.data.contact_email || '',
            contact_phone: profileRes.data.data.contact_phone || '',
            gst_number: profileRes.data.data.gst_number || '',
            gst_certificate: null,
            company_pan_card: null,
          });
        }
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      }
    };

    fetchProfile();
  }, [router]);

  const handleEditToggle = () => {
    if (isEditMode) {
      setProfileFormData((prev) => ({
        ...prev,
        gst_certificate: null,
        company_pan_card: null,
      }));
      setFieldErrors({});
      setError(null);
      setSuccess(null);
    }
    setIsEditMode(!isEditMode);
  };

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProfileFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProfileFormData((prev) => ({ ...prev, [name]: value }));
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    try {
      const token = localStorage.getItem('employerToken');
      const formData = new FormData();
      
      // Append only non-empty fields to FormData
      const fields = ['name', 'company_name', 'company_location', 'contact_person', 'contact_phone', 'gst_number'];
      fields.forEach((field) => {
        if (profileFormData[field]) {
          formData.append(field, profileFormData[field]);
        }
      });

      // Append files if they exist
      if (profileFormData.gst_certificate) {
        formData.append('gst_certificate', profileFormData.gst_certificate);
      }
      if (profileFormData.company_pan_card) {
        formData.append('company_pan_card', profileFormData.company_pan_card);
      }

      const res = await axios.post(`${baseurl}/employer/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data && res.data.success) {
        setSuccess('Profile updated successfully');
        setIsEditMode(false);
        setTimeout(() => router.push('/employer/profile'), 2000);
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
        setError('Please correct the errors in the form');
      } else {
        setError(err.response?.data?.message || 'Failed to update profile');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
         <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}  />
      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-2xl rounded-xl p-8 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                  Manage Your Profile
                </h1>
                <p className="text-gray-600 mb-8">
                  Update your employer details below.
                </p>
              </div>
              <button
                onClick={handleEditToggle}
                className={`flex items-center cursor-pointer h-10 space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isEditMode
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-white text-[#02325a] hover:bg-gray-50'
                }`}
              >
                {isEditMode ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center flex items-center justify-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {success}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h2>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={profileFormData.name}
                        onChange={handleProfileChange}
                        disabled={!isEditMode}
                        className={`block w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm transition-all duration-200 ${
                          !isEditMode
                            ? 'bg-gray-50 text-gray-700 cursor-default border-gray-200'
                            : fieldErrors.name
                            ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Enter your full name"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {fieldErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.name[0]}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <div className="relative">
                      <input
                        id="company_name"
                        name="company_name"
                        type="text"
                        value={profileFormData.company_name}
                        onChange={handleProfileChange}
                        disabled={!isEditMode}
                        className={`block w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm transition-all duration-200 ${
                          !isEditMode
                            ? 'bg-gray-50 text-gray-700 cursor-default border-gray-200'
                            : fieldErrors.company_name
                            ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Enter company name"
                      />
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {fieldErrors.company_name && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.company_name[0]}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="company_location" className="block text-sm font-medium text-gray-700">
                    Company Location
                  </label>
                  <div className="relative">
                    <input
                      id="company_location"
                      name="company_location"
                      type="text"
                      value={profileFormData.company_location}
                      onChange={handleProfileChange}
                      disabled={!isEditMode}
                      className={`block w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm transition-all duration-200 ${
                        !isEditMode
                          ? 'bg-gray-50 text-gray-700 cursor-default border-gray-200'
                          : fieldErrors.company_location
                          ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                      placeholder="Enter company location"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {fieldErrors.company_location && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.company_location[0]}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700">
                    Contact Person
                  </label>
                  <div className="relative">
                    <input
                      id="contact_person"
                      name="contact_person"
                      type="text"
                      value={profileFormData.contact_person}
                      onChange={handleProfileChange}
                      disabled={!isEditMode}
                      className={`block w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm transition-all duration-200 ${
                        !isEditMode
                          ? 'bg-gray-50 text-gray-700 cursor-default border-gray-200'
                          : fieldErrors.contact_person
                          ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                      placeholder="Enter contact person"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {fieldErrors.contact_person && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.contact_person[0]}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                    Contact Email
                  </label>
                  <div className="relative">
                    <input
                      id="contact_email"
                      name="contact_email"
                      type="email"
                      value={profileFormData.contact_email}
                      disabled
                      className="block w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-50 text-gray-700 cursor-default rounded-xl shadow-sm"
                      placeholder="Enter contact email"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <input
                      id="contact_phone"
                      name="contact_phone"
                      type="tel"
                      value={profileFormData.contact_phone}
                      onChange={handleProfileChange}
                      disabled={!isEditMode}
                      className={`block w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm transition-all duration-200 ${
                        !isEditMode
                          ? 'bg-gray-50 text-gray-700 cursor-default border-gray-200'
                          : fieldErrors.contact_phone
                          ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                      placeholder="Enter(contact_phone"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {fieldErrors.contact_phone && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.contact_phone[0]}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="gst_number" className="block text-sm font-medium text-gray-700">
                    GST Number
                  </label>
                  <div className="relative">
                    <input
                      id="gst_number"
                      name="gst_number"
                      type="text"
                      value={profileFormData.gst_number}
                      onChange={handleProfileChange}
                      disabled={!isEditMode}
                      className={`block w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm transition-all duration-200 ${
                        !isEditMode
                          ? 'bg-gray-50 text-gray-700 cursor-default border-gray-200'
                          : fieldErrors.gst_number
                          ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                      placeholder="Enter GST number"
                    />
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {fieldErrors.gst_number && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.gst_number[0]}</p>
                  )}
                </div>
                {isEditMode && (
                  <>
                    <div>
                      <label htmlFor="gst_certificate" className="block text-sm font-medium text-gray-700">
                        GST Certificate (PDF, max 2MB)
                      </label>
                      <div className="relative">
                        <input
                          id="gst_certificate"
                          name="gst_certificate"
                          type="file"
                          accept="application/pdf"
                          onChange={handleProfileChange}
                          disabled={!isEditMode}
                          className={`block w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 ${
                            !isEditMode
                              ? 'bg-gray-50 text-gray-700 cursor-default border-gray-200'
                              : fieldErrors.gst_certificate
                              ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                        />
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {fieldErrors.gst_certificate && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.gst_certificate[0]}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="company_pan_card" className="block text-sm font-medium text-gray-700">
                        Company PAN Card (PDF, max 2MB)
                      </label>
                      <div className="relative">
                        <input
                          id="company_pan_card"
                          name="company_pan_card"
                          type="file"
                          accept="application/pdf"
                          onChange={handleProfileChange}
                          disabled={!isEditMode}
                          className={`block w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 ${
                            !isEditMode
                              ? 'bg-gray-50 text-gray-700 cursor-default border-gray-200'
                              : fieldErrors.company_pan_card
                              ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                        />
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {fieldErrors.company_pan_card && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.company_pan_card[0]}</p>
                      )}
                    </div>
                  </>
                )}
                {isEditMode && (
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                          loading
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-[#02325a] hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        }`}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Updating...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployerProfile;
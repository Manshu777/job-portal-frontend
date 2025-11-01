'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaGlobe, FaPhone, FaDownload } from 'react-icons/fa';
import { MdWorkHistory } from 'react-icons/md';
import { baseurl } from '@/app/components/common';

const ProfileDetails = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-[#02325a]">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-gray-800">{value || 'N/A'}</p>
    </div>
  </div>
);

const CandidateCard = ({ candidate }) => {
  const router = useRouter();
  const [showPhone, setShowPhone] = useState(false);

  const formatExperience = () => {
    const years = candidate.experience_years;
    const months = candidate.experience_months;
    if (years === 0 && months === 0) return 'Fresher';
    return `${years} Yr${years !== 1 ? 's' : ''}${months > 0 ? `, ${months} Mo${months !== 1 ? 's' : ''}` : ''}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{candidate.full_name}</h3>
          <p className="text-gray-600">{candidate.job_title || 'N/A'} at {candidate.company_name || 'N/A'}</p>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${candidate.active_user ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {candidate.active_user ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
        <ProfileDetails icon={<MdWorkHistory />} label="Experience" value={formatExperience()} />
        <ProfileDetails icon={<FaMapMarkerAlt />} label="Location" value={`${candidate.city}, ${candidate.state}`} />
        <ProfileDetails icon={<FaGlobe />} label="Language" value={candidate.preferred_language} />
        <ProfileDetails icon={<FaGraduationCap />} label="Education" value={candidate.educations?.[0]?.education_level || 'N/A'} />
        <ProfileDetails icon={<FaBriefcase />} label="Employment" value={candidate.employment_type || 'N/A'} />
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Skills</p>
        <div className="flex flex-wrap gap-1">
          {candidate.skills?.slice(0, 5).map((skill, i) => (
            <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{skill}</span>
          ))}
          {candidate.skills?.length > 5 && <span className="text-xs text-gray-500">+{candidate.skills.length - 5} more</span>}
        </div>
      </div>

      <button
        onClick={() => setShowPhone(!showPhone)}
        className="w-full bg-[#02325a] text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm"
      >
        <FaPhone /> {showPhone && candidate.number_revealed ? candidate.number : 'View Phone'}
      </button>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-50 rounded-xl p-5 border border-gray-200">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
    <div className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
      ))}
    </div>
    <div className="h-10 bg-gray-300 rounded mt-4"></div>
  </div>
);

const MultiSelectFilter = ({ label, name, options, selected, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="space-y-1 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer hover:bg-white p-1 rounded">
          <input
            type="checkbox"
            name={name}
            value={opt.value}
            checked={selected.includes(opt.value)}
            onChange={onChange}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{opt.value}</span>
          <span className="ml-auto text-xs text-gray-500">({opt.count})</span>
        </label>
      ))}
    </div>
  </div>
);

const CandidateList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // === FILTER STATE ===
  const [filters, setFilters] = useState({
    job_title: '',
    must_have_keywords: '',
    exclude_keywords: '',
    min_experience: '',
    max_experience: '',
    city: [],
    degree: [],
    specialization: [],
    education: '',
    experience_type: '',
    active: '',
    per_page: 10,
  });

  const [candidates, setCandidates] = useState([]);
  const [facets, setFacets] = useState({});
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  // === SYNC URL TO FILTERS ===
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    setFilters(prev => ({
      ...prev,
      job_title: params.job_title || '',
      must_have_keywords: params.must_have_keywords || '',
      exclude_keywords: params.exclude_keywords || '',
      min_experience: params.min_experience || '',
      max_experience: params.max_experience || '',
      city: params.city ? params.city.split(',') : [],
      degree: params.degree ? params.degree.split(',') : [],
      specialization: params.specialization ? params.specialization.split(',') : [],
      education: params.education || '',
      experience_type: params.experience_type || '',
      active: params.active || '',
      per_page: parseInt(params.per_page) || 10,
    }));
  }, [searchParams]);

  // === FETCH CANDIDATES + FACETS ===
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          query.append(key, value.join(','));
        } else if (value && !Array.isArray(value)) {
          query.append(key, value);
        }
      });
      query.append('page', pagination.current_page);
      query.append('per_page', filters.per_page);

      const res = await axios.get(`${baseurl}/filter?${query}`);
      const { data, pagination: pg, filters: facetData } = res.data;

      setCandidates(data);
      setFacets(facetData);
      setPagination(pg);
    } catch (err) {
      console.error(err);
      alert('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [filters, pagination.current_page]);

  // === HANDLE FILTER CHANGE ===
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters(prev => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter(v => v !== value),
        current_page: 1
      }));
    } else {
      setFilters(prev => ({ ...prev, [name]: value, current_page: 1 }));
    }
  };

  // === UPDATE URL ===
  const updateURL = () => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (Array.isArray(v) && v.length > 0) query.set(k, v.join(','));
      else if (v) query.set(k, v);
    });
    router.push(`/employer/candidate-data?${query}`, { scroll: false });
  };

  // === EXPORT EXCEL ===
  const exportToExcel = () => {
    const data = candidates.map(c => ({
      Name: c.full_name,
      'Job Title': c.job_title,
      Phone: c.number_revealed ? c.number : 'Hidden',
      Email: c.email || 'N/A',
      Experience: `${c.experience_years}Y ${c.experience_months}M`,
      Location: `${c.city}, ${c.state}`,
      Education: c.educations?.[0]?.education_level || 'N/A',
      Specialization: c.educations?.[0]?.specialization || 'N/A',
      Skills: c.skills?.join(', ') || 'N/A',
      Status: c.active_user ? 'Active' : 'Inactive',
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Candidates');
    XLSX.writeFile(wb, 'candidates.xlsx');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* === FILTERS === */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>

              {/* Keywords */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (Must Have)</label>
                <input
                  type="text"
                  name="must_have_keywords"
                  value={filters.must_have_keywords}
                  onChange={handleFilterChange}
                  onBlur={updateURL}
                  placeholder="e.g. React, Laravel"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Exclude Keywords */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Exclude Keywords</label>
                <input
                  type="text"
                  name="exclude_keywords"
                  value={filters.exclude_keywords}
                  onChange={handleFilterChange}
                  onBlur={updateURL}
                  placeholder="e.g. PHP"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Experience */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <label className="text-xs text-gray-600">Min Exp (Yrs)</label>
                  <input
                    type="number"
                    name="min_experience"
                    value={filters.min_experience}
                    onChange={handleFilterChange}
                    onBlur={updateURL}
                    min="0"
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Max Exp (Yrs)</label>
                  <input
                    type="number"
                    name="max_experience"
                    value={filters.max_experience}
                    onChange={handleFilterChange}
                    onBlur={updateURL}
                    min="0"
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>

              {/* Degree (Multi) */}
              {facets.degrees?.length > 0 && (
                <MultiSelectFilter
                  label="Degree"
                  name="degree"
                  options={facets.degrees}
                  selected={filters.degree}
                  onChange={handleFilterChange}
                  onBlur={updateURL}
                />
              )}

              {/* Specialization (Multi) */}
              {facets.specializations?.length > 0 && (
                <MultiSelectFilter
                  label="Specialization"
                  name="specialization"
                  options={facets.specializations}
                  selected={filters.specialization}
                  onChange={handleFilterChange}
                  onBlur={updateURL}
                />
              )}

              {/* City (Multi) */}
              {facets.cities?.length > 0 && (
                <MultiSelectFilter
                  label="City"
                  name="city"
                  options={facets.cities}
                  selected={filters.city}
                  onChange={handleFilterChange}
                  onBlur={updateURL}
                />
              )}

              {/* Education Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                <select
                  name="education"
                  value={filters.education}
                  onChange={handleFilterChange}
                  onBlur={updateURL}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Any</option>
                  <option value="graduate">Graduate</option>
                  <option value="post-graduate">Post Graduate</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Experience Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Type</label>
                <select
                  name="experience_type"
                  value={filters.experience_type}
                  onChange={handleFilterChange}
                  onBlur={updateURL}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Any</option>
                  <option value="fresher">Fresher</option>
                  <option value="experienced">Experienced</option>
                </select>
              </div>

              {/* Active Status */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="active"
                  value={filters.active}
                  onChange={handleFilterChange}
                  onBlur={updateURL}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Any</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <button
                onClick={updateURL}
                className="w-full bg-[#02325a] text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* === RESULTS === */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-5">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {pagination.total} Candidates Found
                </h2>
                <button
                  onClick={exportToExcel}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  <FaDownload /> Export Excel
                </button>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mb-4 text-sm">
                <button
                  onClick={() => setPagination(p => ({ ...p, current_page: p.current_page - 1 }))}
                  disabled={pagination.current_page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span>Page {pagination.current_page}</span>
                <button
                  onClick={() => setPagination(p => ({ ...p, current_page: p.current_page + 1 }))}
                  disabled={pagination.current_page === pagination.last_page}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              {/* Candidates */}
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => <SkeletonLoader key={i} />)}
                </div>
              ) : candidates.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No candidates match your filters.</p>
              ) : (
                <div className="space-y-4">
                  {candidates.map((c, i) => (
                    <CandidateCard key={c.id || i} candidate={c} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;
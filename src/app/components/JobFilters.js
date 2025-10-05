export default function JobFilters({ filters, setFilters }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white sticky top-[150px] p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Ambala"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleFilterChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary Range</label>
          <select
            name="salaryRange"
            value={filters.salaryRange}
            onChange={handleFilterChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All</option>
            <option value="0-20000">₹0 - ₹20,000</option>
            <option value="20000-40000">₹20,000 - ₹40,000</option>
            <option value="40000-60000">₹40,000 - ₹60,000</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Skymore"
          />
        </div>
      </div>
    </div>
  );
}
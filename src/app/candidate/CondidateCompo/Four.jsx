import React from 'react'
   import { FiMoon, FiSun, FiHome, FiBriefcase, FiMapPin, FiClock } from 'react-icons/fi';
const Four = ({alldata,handelinputs,handelcheckbox}) => {
  return (

<div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow duration-300">
  {/* Header */}
  <div className="mb-6">
    <h2 className="text-xl font-bold text-gray-800">Job Preferences</h2>
    <p className="text-gray-500 text-sm">Select your ideal work conditions</p>
  </div>

  <div className="space-y-8">
    {/* Preferred Shifts */}
    <div className="animate-fade-in">
      <h6 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
        <FiClock className="mr-2 text-indigo-500" />
        Preferred Shifts
      </h6>
      <div className="space-y-3">
        {[
          { name: 'prefers_night_shift', label: 'Night Shift', icon: <FiMoon className="mr-3 text-indigo-500" /> },
          { name: 'prefers_day_shift', label: 'Day Shift', icon: <FiSun className="mr-3 text-amber-500" /> }
        ].map((item) => (
          <label 
            key={item.name}
            className={`flex items-center justify-between px-5 py-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              alldata[item.name] 
                ? 'border-indigo-300 bg-indigo-50' 
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <div className="flex items-center">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <input
              type="checkbox"
              name={item.name}
              checked={alldata[item.name]}
              onChange={() => handelcheckbox(item.name, alldata[item.name] ? 0 : 1)}
              className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
          </label>
        ))}
      </div>
    </div>

    {/* Preferred Workplace */}
    <div className="animate-fade-in">
      <h6 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
        <FiMapPin className="mr-2 text-emerald-500" />
        Preferred Workplace
      </h6>
      <div className="space-y-3">
        {[
          { name: 'work_from_home', label: 'Work from Home', icon: <FiHome className="mr-3 text-emerald-500" /> },
          { name: 'work_from_office', label: 'Work from Office', icon: <FiBriefcase className="mr-3 text-blue-500" /> },
          { name: 'field_job', label: 'Field Job', icon: <FiMapPin className="mr-3 text-amber-500" /> }
        ].map((item) => (
          <label 
            key={item.name}
            className={`flex items-center justify-between px-5 py-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              alldata[item.name] 
                ? 'border-emerald-300 bg-emerald-50' 
                : 'border-gray-200 hover:border-emerald-200'
            }`}
          >
            <div className="flex items-center">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <input
              type="checkbox"
              name={item.name}
              checked={alldata[item.name]}
              onChange={() => handelcheckbox(item.name, alldata[item.name] ? 0 : 1)}
              className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </label>
        ))}
      </div>
    </div>

    {/* Preferred Employment Type */}
    <div className="animate-fade-in">
      <h6 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
        <FiBriefcase className="mr-2 text-purple-500" />
        Preferred Employment Type
      </h6>
      <div className="space-y-3">
        {[
          { value: 'full time', label: 'Full Time' },
          { value: 'part time', label: 'Part Time' }
        ].map((item) => (
          <label 
            key={item.value}
            className={`flex items-center justify-between px-5 py-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              alldata.employment_type === item.value
                ? 'border-purple-300 bg-purple-50' 
                : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            <span>{item.label}</span>
            <input
              type="radio"
              name="employment_type"
              checked={alldata.employment_type === item.value}
              onChange={() => handelcheckbox("employment_type", item.value)}
              className="h-5 w-5 text-purple-600 focus:ring-purple-500"
            />
          </label>
        ))}
      </div>
    </div>
  </div>
</div>

  )
}

export default Four
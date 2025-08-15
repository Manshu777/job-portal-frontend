import React, { useState, useEffect } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import Select from "react-select";
import { State, City } from "country-state-city";

const First = ({ alldata, handelinputs, handelgender,errors }) => {

  const [isChecked, setIsChecked] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Fetch Indian states when component mounts
  useEffect(() => {
    const indiaStates = State.getStatesOfCountry("IN").map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
    setStates(indiaStates);
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      const stateCities = City.getCitiesOfState("IN", selectedState.value).map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setCities(stateCities);
      setSelectedCity(null); // Reset city when state changes
    } else {
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedState]);

  // Handle state selection
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    handelinputs({
      target: {
        name: "state",
        value: selectedOption ? selectedOption.label : "",
      },
    });
  };

  // Handle city selection
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    handelinputs({
      target: {
        name: "city",
        value: selectedOption ? selectedOption.label : "",
      },
    });
  };

  // Custom styles for react-select



  console.log("errors", errors);


  const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: "#d1d5db",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    "&:hover": {
      borderColor: "#10b981",
    },
    boxShadow: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#10b981" : state.isFocused ? "#ecfdf5" : null,
    color: state.isSelected ? "white" : "#374151",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.5rem",
    marginTop: "0.25rem",
    zIndex: 9999, // Add this to ensure the dropdown menu appears above other elements
  }),
};

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-6 space-y-6">
        {/* Full Name Field */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="John Doe"
              name="full_name"
              value={alldata.full_name || ""}
              onChange={handelinputs}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
            {errors.full_name && (
          <p className="text-red-500 text-sm">{errors.full_name}</p>
        )}
          </div>
        </div>

        {/* Date of Birth Field */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <div className="relative">
            <input
              type="date"
              name="dob"
              value={alldata.dob || ""}
              onChange={handelinputs}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none"
            />
            <FiCalendar className="absolute right-3 top-3.5 text-gray-400" />

             {errors.dob && (
          <p className="text-red-500 text-sm">{errors.dob}</p>
        )}
          </div>
        </div>

        {/* Gender Field */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex gap-3">
            {["Male", "Female"].map((gender) => (
              <button
                key={gender}
                onClick={() => handelgender(gender)}
                className={`flex-1 py-2.5 px-4 rounded-lg border transition-all duration-200 ${
                  alldata.gender === gender
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                    : "border-gray-300 text-gray-700 hover:border-emerald-300"
                }`}
              >
                {gender}
              </button>
            ))}
              
          </div>
           {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
        </div>

        {/* Phone Number Field */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+91 (___) ___-____"
            name="number"
            required
            value={alldata.number || ""}
            onChange={handelinputs}
            minLength={10}
            maxLength={15}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
           {errors.number && (
          <p className="text-red-500 text-sm">{errors.number}</p>
        )}
        </div>

        {/* State Selection */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <Select
            options={states}
  value={selectedState}
  onChange={handleStateChange}
  placeholder="Select State"
  styles={customStyles}
  isClearable
  className="text-gray-700"
  menuPortalTarget={document.body} // Render the menu directly under <body>
  
          />

           {errors.state && (
          <p className="text-red-500 text-sm">{errors.state}</p>
        )}
        </div>

        {/* City Selection */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Select
            options={cities}
            value={selectedCity}
            onChange={handleCityChange}
            placeholder="Select City"
            styles={customStyles}
            isClearable
            isDisabled={!selectedState}
            menuPortalTarget={document.body}
            className="text-gray-700"
          />

          {errors.city && (
          <p className="text-red-500 text-sm">{errors.city}</p>
        )}
        </div>

        {/* WhatsApp Checkbox */}
        <div
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200 animate-fade-in"
          onClick={() => setIsChecked(!isChecked)}
        >
          {isChecked ? (
            <MdCheckBox className="text-emerald-500 text-xl flex-shrink-0" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-gray-400 text-xl flex-shrink-0" />
          )}
          <p className="text-gray-600 text-sm">
            Send me important job updates on WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
};

export default First;
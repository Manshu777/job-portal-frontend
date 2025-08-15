import React, { useState } from "react";
import { Plus, Trash2, School, Calendar, Award } from "lucide-react";

const EducationForm = ({ data, onChange, template }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
      achievements: [""],
    };

    onChange({
      ...data,
      education: [...data.education, newEducation],
    });
    setExpandedIndex(data.education.length);
  };

  const removeEducation = (index) => {
    const newEducation = data.education.filter((_, i) => i !== index);
    onChange({
      ...data,
      education: newEducation,
    });
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...data.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    onChange({
      ...data,
      education: newEducation,
    });
  };

  const addAchievement = (eduIndex) => {
    const newEducation = [...data.education];
    newEducation[eduIndex].achievements.push("");
    onChange({
      ...data,
      education: newEducation,
    });
  };

  const updateAchievement = (eduIndex, achIndex, value) => {
    const newEducation = [...data.education];
    newEducation[eduIndex].achievements[achIndex] = value;
    onChange({
      ...data,
      education: newEducation,
    });
  };

  const removeAchievement = (eduIndex, achIndex) => {
    const newEducation = [...data.education];
    newEducation[eduIndex].achievements.splice(achIndex, 1);
    onChange({
      ...data,
      education: newEducation,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-gray-600">
          Add your educational background, starting with the most recent
        </p>
      </div>

      {data.education.map((edu, index) => (
        <div
          key={edu.id}
          className="border border-gray-200 rounded-lg p-6 bg-gray-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {edu.institution || `Education ${index + 1}`}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="text-[#02325a] hover:text-blue-700 font-medium"
              >
                {expandedIndex === index ? "Collapse" : "Expand"}
              </button>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {expandedIndex === index && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution *
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="University name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Bachelor's, Master's, PhD, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study *
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) =>
                      updateEducation(index, "fieldOfStudy", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Computer Science, Business, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPA (Optional)
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) =>
                        updateEducation(index, "gpa", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) =>
                        updateEducation(index, "startDate", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) =>
                        updateEducation(index, "endDate", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievements & Activities
                </label>
                {edu.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) =>
                        updateAchievement(index, achIndex, e.target.value)
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Dean's List, Magna Cum Laude, Student Government"
                    />
                    <button
                      onClick={() => removeAchievement(index, achIndex)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addAchievement(index)}
                  className="flex items-center gap-2 text-[#02325a] hover:text-blue-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Achievement
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-[#02325a] transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Education
      </button>
    </div>
  );
};

export default EducationForm;

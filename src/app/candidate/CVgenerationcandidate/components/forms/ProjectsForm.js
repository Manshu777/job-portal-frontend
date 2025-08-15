import React, { useState } from 'react';
import { Plus, Trash2, FolderOpen, Calendar, Globe, Github, Star, Code } from 'lucide-react';

const ProjectsForm = ({ data, onChange, template }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      githubUrl: '',
      startDate: '',
      endDate: '',
      role: '',
      achievements: [''],
      images: []
    };

    onChange({
      ...data,
      projects: [...data.projects, newProject]
    });
    setExpandedIndex(data.projects.length);
  };

  const removeProject = (index) => {
    const newProjects = data.projects.filter((_, i) => i !== index);
    onChange({
      ...data,
      projects: newProjects
    });
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...data.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value
    };
    onChange({
      ...data,
      projects: newProjects
    });
  };

  const addTechnology = (projectIndex, technology) => {
    if (technology.trim()) {
      const newProjects = [...data.projects];
      newProjects[projectIndex].technologies.push(technology.trim());
      onChange({
        ...data,
        projects: newProjects
      });
    }
  };

  const removeTechnology = (projectIndex, techIndex) => {
    const newProjects = [...data.projects];
    newProjects[projectIndex].technologies.splice(techIndex, 1);
    onChange({
      ...data,
      projects: newProjects
    });
  };

  const addAchievement = (projectIndex) => {
    const newProjects = [...data.projects];
    newProjects[projectIndex].achievements.push('');
    onChange({
      ...data,
      projects: newProjects
    });
  };

  const updateAchievement = (projectIndex, achIndex, value) => {
    const newProjects = [...data.projects];
    newProjects[projectIndex].achievements[achIndex] = value;
    onChange({
      ...data,
      projects: newProjects
    });
  };

  const removeAchievement = (projectIndex, achIndex) => {
    const newProjects = [...data.projects];
    newProjects[projectIndex].achievements.splice(achIndex, 1);
    onChange({
      ...data,
      projects: newProjects
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
        <p className="text-gray-600">Showcase your best projects and technical achievements</p>
      </div>

      {data.projects.map((project, index) => (
        <div key={project.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {project.name || `Project ${index + 1}`}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="text-[#02325a] hover:text-blue-700 font-medium"
              >
                {expandedIndex === index ? 'Collapse' : 'Expand'}
              </button>
              <button
                onClick={() => removeProject(index)}
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
                    Project Name *
                  </label>
                  <div className="relative">
                    <FolderOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Project name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={project.role}
                    onChange={(e) => updateProject(index, 'role', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Lead Developer, Designer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="month"
                      value={project.endDate}
                      onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={project.url}
                      onChange={(e) => updateProject(index, 'url', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://project-demo.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={project.githubUrl}
                      onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the project, its purpose, and your contributions..."
                  required
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      <Code className="w-3 h-3" />
                      {tech}
                      <button
                        onClick={() => removeTechnology(index, techIndex)}
                        className="text-[#02325a] hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add technology (e.g., React, Python, AWS)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target;
                        addTechnology(index, input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.target.previousElementSibling;
                      addTechnology(index, input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-[#02325a] text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Achievements & Features
                </label>
                {project.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Implemented real-time chat feature, Reduced load time by 50%"
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
        onClick={addProject}
        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-[#02325a] transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Project
      </button>

      {data.projects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No projects added yet. Showcase your best work!</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
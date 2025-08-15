import React, { useState, useEffect } from "react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import LanguagesForm from "./forms/LanguagesForm";
import CVPreview from "./CVPreview";
import TemplateCustomizer from "./TemplateCustomizer";
import ExportModal from "./ExportModal";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  FolderOpen,
  Download,
  ArrowLeft,
  ArrowRight,
  Save,
  Eye,
  Settings,
  Palette,
  FileText,
  CheckCircle,
  Clock,
  Zap,
  Crown,
} from "lucide-react";

const CVBuilder = ({ template, onBack, cvData, onDataChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("saved");
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const steps = [
    {
      id: "personal",
      label: "Personal Info",
      icon: User,
      component: PersonalInfoForm,
      required: true,
    },
    {
      id: "experience",
      label: "Experience",
      icon: Briefcase,
      component: ExperienceForm,
      required: true,
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      component: EducationForm,
      required: true,
    },
    {
      id: "skills",
      label: "Skills",
      icon: Award,
      component: SkillsForm,
      required: true,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderOpen,
      component: ProjectsForm,
      required: false,
    },
    {
      id: "certifications",
      label: "Certifications",
      icon: Award,
      component: CertificationsForm,
      required: false,
    },
    {
      id: "languages",
      label: "Languages",
      icon: Languages,
      component: LanguagesForm,
      required: false,
    },
  ];

  const CurrentForm = steps[currentStep].component;

  // Calculate completion percentage
  useEffect(() => {
    const calculateCompletion = () => {
      let completed = 0;
      let total = 0;

      // Personal Info (required)
      total += 5;
      if (cvData.personalInfo.firstName) completed++;
      if (cvData.personalInfo.lastName) completed++;
      if (cvData.personalInfo.email) completed++;
      if (cvData.personalInfo.phone) completed++;
      if (cvData.personalInfo.summary) completed++;

      // Experience (required)
      total += 2;
      if (cvData.experience.length > 0) completed += 2;

      // Education (required)
      total += 2;
      if (cvData.education.length > 0) completed += 2;

      // Skills (required)
      total += 1;
      if (cvData.skills.length > 0) completed++;

      // Optional sections
      total += 4;
      if (cvData.projects.length > 0) completed++;
      if (cvData.certifications.length > 0) completed++;
      if (cvData.languages.length > 0) completed++;
      if (cvData.personalInfo.linkedin || cvData.personalInfo.website)
        completed++;

      setCompletionPercentage(Math.round((completed / total) * 100));
    };

    calculateCompletion();
  }, [cvData]);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoSaveStatus("saving");
      // Simulate auto-save
      setTimeout(() => {
        setAutoSaveStatus("saved");
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [cvData]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const isStepCompleted = (stepIndex) => {
    const step = steps[stepIndex];
    switch (step.id) {
      case "personal":
        return (
          cvData.personalInfo.firstName &&
          cvData.personalInfo.lastName &&
          cvData.personalInfo.email
        );
      case "experience":
        return cvData.experience.length > 0;
      case "education":
        return cvData.education.length > 0;
      case "skills":
        return cvData.skills.length > 0;
      case "projects":
        return true;
      case "certifications":
        return true;
      case "languages":
        return true;
      default:
        return false;
    }
  };

  const getAutoSaveIcon = () => {
    switch (autoSaveStatus) {
      case "saving":
        return <Clock className="w-4 h-4 animate-spin" />;
      case "saved":
        return <CheckCircle className="w-4 h-4 text-[#02325a]" />;
      default:
        return <Save className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Templates
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  CV Builder - {template.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{completionPercentage}% Complete</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-[#02325a] transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Auto-save status */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {getAutoSaveIcon()}
                <span className="hidden sm:inline">
                  {autoSaveStatus === "saving"
                    ? "Saving..."
                    : autoSaveStatus === "saved"
                    ? "Saved"
                    : "Unsaved changes"}
                </span>
              </div>

              {/* Action buttons */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showPreview
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>

              <button
                onClick={() => setShowCustomizer(!showCustomizer)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showCustomizer
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Customize</span>
              </button>

              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#02325a] to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div
          className={`grid gap-8 transition-all duration-300 ${
            showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {/* Form Section */}
          <div className="space-y-6">
            {/* Enhanced Progress Steps */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6 overflow-x-auto">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = isStepCompleted(index);
                  const isCurrent = index === currentStep;

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 cursor-pointer transition-all duration-200 px-3 py-2 rounded-lg min-w-max ${
                        isCurrent ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleStepClick(index)}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isCurrent
                            ? "bg-[#02325a] text-white shadow-lg"
                            : isCompleted
                            ? "bg-[#02325a] text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted && !isCurrent ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="hidden md:block">
                        <span
                          className={`font-medium text-sm ${
                            isCurrent
                              ? "text-[#02325a]"
                              : isCompleted
                              ? "text-[#00223f]"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </span>
                        {step.required && (
                          <div className="text-xs text-gray-500">Required</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="relative">
                <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-[#02325a] to-[#02325a] transition-all duration-500 ease-out"
                    style={{
                      width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {steps[currentStep].label}
                </h2>
                <p className="text-gray-600">
                  {steps[currentStep].required
                    ? "Required section"
                    : "Optional section"}{" "}
                  - Fill in the details below
                </p>
              </div>

              <CurrentForm
                data={cvData}
                onChange={onDataChange}
                template={template}
              />

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    currentStep === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Step {currentStep + 1} of {steps.length}
                  </span>

                  {currentStep === steps.length - 1 ? (
                    <button
                      onClick={() => setShowExportModal(true)}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-[#00223f] to-[#02325a] text-white hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <Zap className="w-4 h-4" />
                      Finish & Export
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#02325a] text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="sticky top-24 h-fit">
              <CVPreview data={cvData} template={template} />
            </div>
          )}
        </div>
      </div>

      {/* Template Customizer Sidebar */}
      {showCustomizer && (
        <TemplateCustomizer
          template={template}
          onClose={() => setShowCustomizer(false)}
          onTemplateChange={() => {}}
        />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          cvData={cvData}
          template={template}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

export default CVBuilder;

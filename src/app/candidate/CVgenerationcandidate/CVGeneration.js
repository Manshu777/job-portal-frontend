import React from "react";
import TemplateSelector from "./components/TemplateSelector";
import CVBuilder from "./components/CVBuilder";
import { FileText } from "lucide-react";

class CVGeneration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: "templates",
      selectedTemplate: null,
      cvData: this.loadFromLocalStorage() || {
        personalInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          website: "",
          summary: "",
          profileImage: "",
          title: "",
        },
        experience: [],
        education: [],
        skills: [],
        certifications: [],
        languages: [],
        projects: [],
        awards: [],
        volunteerWork: [],
        publications: [],
        customSections: [],
      },
      isLoading: true,
      error: null,
    };

    this.handleTemplateSelect = this.handleTemplateSelect.bind(this);
    this.handleStartBuilding = this.handleStartBuilding.bind(this);
    this.handleBackToTemplates = this.handleBackToTemplates.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ isLoading: false });
      this.trackEvent("app_initialized");
    }, 1000);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error.message });
    this.trackEvent("error_occurred", { error: error.message });
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  loadFromLocalStorage() {
    try {
      const savedData = localStorage.getItem("cvData");
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return null;
    }
  }

  saveToLocalStorage(data) {
    try {
      localStorage.setItem("cvData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  trackEvent(eventName, data = {}) {
    console.log(`Tracking event: ${eventName}`, data);
  }

  handleTemplateSelect(template) {
    this.setState({ selectedTemplate: template });
    this.trackEvent("template_selected", { template });
  }

  handleStartBuilding() {
    if (!this.state.selectedTemplate) {
      this.setState({ error: "Please select a template first" });
      return;
    }
    this.setState({ currentStep: "builder", error: null });
    this.trackEvent("start_building");
  }

  handleBackToTemplates() {
    this.setState({ currentStep: "templates", selectedTemplate: null });
    this.trackEvent("back_to_templates");
  }

  handleDataChange(data) {
    this.setState({ cvData: data });
    this.saveToLocalStorage(data);
    this.trackEvent("data_updated");
  }

  handleReset() {
    const resetData = {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        summary: "",
        profileImage: "",
        title: "",
      },
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      languages: [],
      projects: [],
      awards: [],
      volunteerWork: [],
      publications: [],
      customSections: [],
    };
    this.setState({ cvData: resetData, currentStep: "templates", selectedTemplate: null });
    this.saveToLocalStorage(resetData);
    this.trackEvent("cv_reset");
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{this.state.error}</p>
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Reset and Try Again
            </button>
          </div>
        </div>
      );
    }

    if (this.state.isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#02325a] rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to CV Builder
            </h1>
            <p className="text-gray-600">
              Loading your professional CV builder...
            </p>
            <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#02325a] to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.currentStep === "templates") {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <TemplateSelector
            selectedTemplate={this.state.selectedTemplate}
            onTemplateSelect={this.handleTemplateSelect}
            onNext={this.handleStartBuilding}
          />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <CVBuilder
          template={this.state.selectedTemplate}
          onBack={this.handleBackToTemplates}
          cvData={this.state.cvData}
          onDataChange={this.handleDataChange}
          onReset={this.handleReset}
        />
      </div>
    );
  }
}

export default CVGeneration;
import React, { useState, useMemo } from "react";
import {
  templates,
  getTemplatesByCategory,
  getFreeTemplates,
  getPremiumTemplates,
  searchTemplates,
  getFeaturedTemplates,
} from "../data/templates";
import {
  Check,
  Eye,
  Star,
  Filter,
  Search,
  Grid,
  List,
  Crown,
  Zap,
  Award,
  TrendingUp,
  Sparkles,
  Target,
  Users,
  Briefcase,
} from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onTemplateSelect, onNext }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");

  const categories = ["All", ...new Set(templates.map((t) => t.category))];
  const industries = ["All", ...new Set(templates.flatMap((t) => t.industry))];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    if (searchTerm) {
      filtered = searchTemplates(searchTerm);
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (template) => template.category === selectedCategory
      );
    }

    if (selectedIndustry !== "All") {
      filtered = filtered.filter((template) =>
        template.industry.includes(selectedIndustry)
      );
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(
        (template) => template.difficulty === selectedDifficulty
      );
    }

    if (showPremiumOnly) {
      filtered = filtered.filter((template) => template.premium);
    }

    if (showFeatured) {
      filtered = getFeaturedTemplates().filter((template) =>
        filtered.some((f) => f.id === template.id)
      );
    }

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "category":
          return a.category.localeCompare(b.category);
        case "difficulty":
          const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case "popularity":
          // Simulate popularity based on premium status and features
          const aScore = (a.premium ? 2 : 1) + a.features.length;
          const bScore = (b.premium ? 2 : 1) + b.features.length;
          return bScore - aScore;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [
    searchTerm,
    selectedCategory,
    selectedIndustry,
    selectedDifficulty,
    showPremiumOnly,
    showFeatured,
    sortBy,
  ]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Corporate":
        return Briefcase;
      case "Creative":
        return Sparkles;
      case "Modern":
        return Zap;
      case "Tech":
        return Target;
      case "Executive":
        return Crown;
      case "Academic":
        return Award;
      case "Healthcare":
        return Users;
      case "Legal":
        return Briefcase;
      case "Marketing":
        return TrendingUp;
      case "Finance":
        return Briefcase;
      case "Education":
        return Award;
      case "Sales":
        return TrendingUp;
      case "Consulting":
        return Target;
      default:
        return Star;
    }
  };

  const TemplateCard = ({ template }) => {
    const CategoryIcon = getCategoryIcon(template.category);

    return (
      <div
        className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
          selectedTemplate?.id === template.id
            ? "ring-4 ring-blue-500 ring-opacity-50"
            : ""
        }`}
        onClick={() => onTemplateSelect(template)}
      >
        <div className="relative">
          <img
            src={template.previewImage}
            alt={template.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />

          {/* Overlay badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm flex items-center gap-1">
              <CategoryIcon className="w-3 h-3" />
              {template.category}
            </span>
            {template.premium && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-sm">
                <Crown className="w-3 h-3" />
                Premium
              </span>
            )}
            {template.features.includes("ATS-Friendly") && (
              <span className="bg-[#02325a] text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                ATS-Friendly
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                template.difficulty
              )}`}
            >
              {template.difficulty}
            </span>
          </div>

          {selectedTemplate?.id === template.id && (
            <div className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg">
              <Check className="w-4 h-4" />
            </div>
          )}

          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all">
            <Eye className="w-4 h-4" />
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {template.name}
          </h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {template.description}
          </p>

          {/* Industry tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {template.industry.slice(0, 3).map((industry) => (
              <span
                key={industry}
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
              >
                {industry}
              </span>
            ))}
            {template.industry.length > 3 && (
              <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                +{template.industry.length - 3} more
              </span>
            )}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            {template.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                <Award className="w-3 h-3" />
                {feature}
              </span>
            ))}
            {template.features.length > 3 && (
              <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                +{template.features.length - 3} more
              </span>
            )}
          </div>

          {/* Color palette and layout info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: template.colors.primary }}
              />
              <div
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: template.colors.secondary }}
              />
              <div
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: template.colors.accent }}
              />
              <span className="text-xs text-gray-500 ml-2">
                {template.fonts.heading}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {template.layout.columns === 1 ? "1 Column" : "2 Columns"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TemplateListItem = ({ template }) => {
    const CategoryIcon = getCategoryIcon(template.category);

    return (
      <div
        className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer p-6 ${
          selectedTemplate?.id === template.id
            ? "ring-4 ring-blue-500 ring-opacity-50"
            : ""
        }`}
        onClick={() => onTemplateSelect(template)}
      >
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={template.previewImage}
              alt={template.name}
              className="w-24 h-32 object-cover rounded-lg"
            />
            {selectedTemplate?.id === template.id && (
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                <Check className="w-3 h-3" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {template.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium text-gray-700 flex items-center gap-1">
                    <CategoryIcon className="w-3 h-3" />
                    {template.category}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(
                      template.difficulty
                    )}`}
                  >
                    {template.difficulty}
                  </span>
                  {template.premium && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Premium
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <div
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  <div
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: template.colors.secondary }}
                  />
                  <div
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: template.colors.accent }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {template.layout.columns === 1 ? "1 Column" : "2 Columns"}
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-3 text-sm leading-relaxed">
              {template.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-3">
              {template.industry.slice(0, 4).map((industry) => (
                <span
                  key={industry}
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                >
                  {industry}
                </span>
              ))}
              {template.industry.length > 4 && (
                <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                  +{template.industry.length - 4} more
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {template.features.slice(0, 4).map((feature) => (
                <span
                  key={feature}
                  className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                >
                  <Award className="w-3 h-3" />
                  {feature}
                </span>
              ))}
              {template.features.length > 4 && (
                <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                  +{template.features.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Template
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our collection of {templates.length} professionally
              designed templates. Each template is crafted to highlight your
              unique skills and experience across {categories.length - 1}{" "}
              different categories.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
                <option value="difficulty">Sort by Difficulty</option>
                <option value="popularity">Sort by Popularity</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPremiumOnly}
                    onChange={(e) => setShowPremiumOnly(e.target.checked)}
                    className="w-4 h-4 text-[#02325a] border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    Premium Only
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFeatured}
                    onChange={(e) => setShowFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#02325a] border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Featured Only
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing {filteredTemplates.length} of {templates.length}{" "}
                  templates
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid"
                        ? "bg-[#02325a] text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list"
                        ? "bg-[#02325a] text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid/List */}
      <div className="max-w-7xl mx-auto p-6">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedIndustry("All");
                setSelectedDifficulty("All");
                setShowPremiumOnly(false);
                setShowFeatured(false);
              }}
              className="bg-[#02325a] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div
            className={`gap-8 mb-12 ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col max-w-5xl mx-auto space-y-6"
            }`}
          >
            {filteredTemplates.map((template) =>
              viewMode === "grid" ? (
                <TemplateCard key={template.id} template={template} />
              ) : (
                <TemplateListItem key={template.id} template={template} />
              )
            )}
          </div>
        )}

        {/* Continue Button */}
        {selectedTemplate && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-[#02325a] to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-3"
            >
              <Zap className="w-5 h-5" />
              Start Building Your CV
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Template Stats */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#02325a]">
                {templates.length}
              </div>
              <div className="text-gray-600">Total Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00223f]">
                {getFreeTemplates().length}
              </div>
              <div className="text-gray-600">Free Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">
                {getPremiumTemplates().length}
              </div>
              <div className="text-gray-600">Premium Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">
                {industries.length - 1}
              </div>
              <div className="text-gray-600">Industries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">
                {getFeaturedTemplates().length}
              </div>
              <div className="text-gray-600">Featured</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
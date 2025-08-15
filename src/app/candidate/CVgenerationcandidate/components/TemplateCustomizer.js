import React, { useState } from "react";
import { X, Palette, Type, Layout, Save, RotateCcw } from "lucide-react";

const TemplateCustomizer = ({ template, onClose, onTemplateChange }) => {
  const [customTemplate, setCustomTemplate] = useState(template);
  const [activeTab, setActiveTab] = useState("colors");

  const colorPresets = [
    {
      name: "Professional Blue",
      colors: { primary: "#2563eb", secondary: "#64748b", accent: "#0ea5e9" },
    },
    {
      name: "Creative Purple",
      colors: { primary: "#7c3aed", secondary: "#a78bfa", accent: "#f59e0b" },
    },
    {
      name: "Executive Black",
      colors: { primary: "#1f2937", secondary: "#6b7280", accent: "#059669" },
    },
    {
      name: "Tech Cyan",
      colors: { primary: "#0f172a", secondary: "#64748b", accent: "#06b6d4" },
    },
    {
      name: "Warm Orange",
      colors: { primary: "#ea580c", secondary: "#f97316", accent: "#eab308" },
    },
    {
      name: "Forest Green",
      colors: { primary: "#166534", secondary: "#22c55e", accent: "#84cc16" },
    },
  ];

  const fontOptions = [
    { name: "Inter", category: "Modern Sans-serif" },
    { name: "Poppins", category: "Friendly Sans-serif" },
    { name: "Playfair Display", category: "Elegant Serif" },
    { name: "JetBrains Mono", category: "Technical Monospace" },
    { name: "Crimson Text", category: "Academic Serif" },
    { name: "Source Sans Pro", category: "Clean Sans-serif" },
  ];

  const updateColors = (colorUpdate) => {
    setCustomTemplate({
      ...customTemplate,
      colors: { ...customTemplate.colors, ...colorUpdate },
    });
  };

  const updateFonts = (fontUpdate) => {
    setCustomTemplate({
      ...customTemplate,
      fonts: { ...customTemplate.fonts, ...fontUpdate },
    });
  };

  const updateLayout = (layoutUpdate) => {
    setCustomTemplate({
      ...customTemplate,
      layout: { ...customTemplate.layout, ...layoutUpdate },
    });
  };

  const applyColorPreset = (preset) => {
    updateColors(preset.colors);
  };

  const resetToDefault = () => {
    setCustomTemplate(template);
  };

  const saveChanges = () => {
    onTemplateChange(customTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.75)] bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Customize Template
            </h2>
            <p className="text-gray-600">
              Personalize your {template.name} template
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-240px)]">
          <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
                {[
                  { id: "colors", label: "Colors", icon: Palette },
                  { id: "fonts", label: "Fonts", icon: Type },
                  { id: "layout", label: "Layout", icon: Layout },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      વ
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 space-y-6">
              {activeTab === "colors" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Color Presets
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => applyColorPreset(preset)}
                          className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                        >
                          <div className="flex gap-1 mb-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: preset.colors.primary }}
                            />
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor: preset.colors.secondary,
                              }}
                            />
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: preset.colors.accent }}
                            />
                          </div>
                          <div className="text-xs font-medium text-gray-700">
                            {preset.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Custom Colors
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={customTemplate.colors.primary}
                            onChange={(e) =>
                              updateColors({ primary: e.target.value })
                            }
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customTemplate.colors.primary}
                            onChange={(e) =>
                              updateColors({ primary: e.target.value })
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secondary Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={customTemplate.colors.secondary}
                            onChange={(e) =>
                              updateColors({ secondary: e.target.value })
                            }
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customTemplate.colors.secondary}
                            onChange={(e) =>
                              updateColors({ secondary: e.target.value })
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Accent Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={customTemplate.colors.accent}
                            onChange={(e) =>
                              updateColors({ accent: e.target.value })
                            }
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={customTemplate.colors.accent}
                            onChange={(e) =>
                              updateColors({ accent: e.target.value })
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "fonts" && (
                <div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Heading Font
                      </h3>
                      <select
                        value={customTemplate.fonts.heading}
                        onChange={(e) =>
                          updateFonts({ heading: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        {fontOptions.map((font) => (
                          <option key={font.name} value={font.name}>
                            {font.name} - {font.category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Body Font
                      </h3>
                      <select
                        value={customTemplate.fonts.body}
                        onChange={(e) => updateFonts({ body: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        {fontOptions.map((font) => (
                          <option key={font.name} value={font.name}>
                            {font.name} - {font.category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4
                        className="font-semibold mb-2"
                        style={{ fontFamily: customTemplate.fonts.heading }}
                      >
                        Heading Preview
                      </h4>
                      <p
                        className="text-sm"
                        style={{ fontFamily: customTemplate.fonts.body }}
                      >
                        This is how your body text will look with the selected
                        fonts. The combination should be readable and
                        professional.
                      </p>
                    </div>
                  </div>
                </div> // 👈 Added this missing closing tag
              )}

              {activeTab === "layout" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Column Layout
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateLayout({ columns: 1 })}
                        className={`p-4 border rounded-lg transition-colors ${
                          customTemplate.layout.columns === 1
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="w-full h-12 bg-gray-200 rounded mb-2"></div>
                        <div className="text-sm font-medium">Single Column</div>
                      </button>
                      <button
                        onClick={() => updateLayout({ columns: 2 })}
                        className={`p-4 border rounded-lg transition-colors ${
                          customTemplate.layout.columns === 2
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex gap-1 mb-2">
                          <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                          <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                        </div>
                        <div className="text-sm font-medium">Two Column</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Header Style
                    </h3>
                    <div className="space-y-2">
                      {[
                        { value: "centered", label: "Centered" },
                        { value: "left", label: "Left Aligned" },
                        { value: "split", label: "Split Layout" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            updateLayout({ headerStyle: option.value })
                          }
                          className={`w-full p-3 text-left border rounded-lg transition-colors ${
                            customTemplate.layout.headerStyle === option.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Section Spacing
                    </h3>
                    <div className="space-y-2">
                      {[
                        { value: "compact", label: "Compact" },
                        { value: "normal", label: "Normal" },
                        { value: "spacious", label: "Spacious" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            updateLayout({
                              sectionSpacing: option.value,
                            })
                          }
                          className={`w-full p-3 text-left border rounded-lg transition-colors ${
                            customTemplate.layout.sectionSpacing ===
                            option.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <div
                className="space-y-6"
                style={{
                  fontFamily: customTemplate.fonts.body,
                  color: customTemplate.colors.text,
                }}
              >
                <div
                  className={`pb-4 border-b ${
                    customTemplate.layout.headerStyle === "centered"
                      ? "text-center"
                      : customTemplate.layout.headerStyle === "split"
                      ? "flex justify-between items-start"
                      : "text-left"
                  }`}
                >
                  <div>
                    <h1
                      className="text-2xl font-bold mb-2"
                      style={{
                        fontFamily: customTemplate.fonts.heading,
                        color: customTemplate.colors.primary,
                      }}
                    >
                      John Doe
                    </h1>
                    <p className="text-gray-600">Software Engineer</p>
                  </div>
                  {customTemplate.layout.headerStyle === "split" && (
                    <div className="text-sm text-gray-600">
                      <div>john@example.com</div>
                      <div>+1 (555) 123-4567</div>
                    </div>
                  )}
                </div>

                <div
                  className={`grid gap-6 ${
                    customTemplate.layout.columns === 2
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  <div
                    className={`space-y-${
                      customTemplate.layout.sectionSpacing === "compact"
                        ? "4"
                        : customTemplate.layout.sectionSpacing === "spacious"
                        ? "8"
                        : "6"
                    }`}
                  >
                    <div>
                      <h2
                        className="text-lg font-semibold mb-2 border-b pb-1"
                        style={{
                          fontFamily: customTemplate.fonts.heading,
                          color: customTemplate.colors.primary,
                        }}
                      >
                        Experience
                      </h2>
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold">Senior Developer</h3>
                          <p className="text-gray-600">Tech Company</p>
                          <p className="text-sm text-gray-500">
                            2020 - Present
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2
                        className="text-lg font-semibold mb-2 border-b pb-1"
                        style={{
                          fontFamily: customTemplate.fonts.heading,
                          color: customTemplate.colors.primary,
                        }}
                      >
                        Education
                      </h2>
                      <div>
                        <h3 className="font-semibold">Computer Science</h3>
                        <p className="text-gray-600">University Name</p>
                        <p className="text-sm text-gray-500">2016 - 2020</p>
                      </div>
                    </div>
                  </div>

                  {customTemplate.layout.columns === 2 && (
                    <div
                      className={`space-y-${
                        customTemplate.layout.sectionSpacing === "compact"
                          ? "4"
                          : customTemplate.layout.sectionSpacing === "spacious"
                          ? "8"
                          : "6"
                      }`}
                    >
                      <div>
                        <h2
                          className="text-lg font-semibold mb-2 border-b pb-1"
                          style={{
                            fontFamily: customTemplate.fonts.heading,
                            color: customTemplate.colors.primary,
                          }}
                        >
                          Skills
                        </h2>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>JavaScript</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor:
                                      i <= 4
                                        ? customTemplate.colors.accent
                                        : "#e5e7eb",
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>React</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor:
                                      i <= 3
                                        ? customTemplate.colors.accent
                                        : "#e5e7eb",
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveChanges}
              className="flex items-center gap-2 bg-[#02325a] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCustomizer;

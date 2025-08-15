import React, { useState } from "react";
import {
  X,
  Download,
  FileText,
  File,
  Code,
  Printer,
  Settings,
  Crown,
  Zap,
} from "lucide-react";
import CVPreview from "./CVPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ExportModal = ({ cvData, template, onClose }) => {
  const [exportOptions, setExportOptions] = useState({
    format: "pdf",
    quality: "high",
    includeColors: true,
    pageSize: "A4",
    margins: "normal",
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const formatOptions = [
    {
      value: "pdf",
      label: "PDF",
      icon: FileText,
      description: "Best for job applications and printing",
      premium: false,
    },
    {
      value: "docx",
      label: "Word Document",
      icon: File,
      description: "Editable format for further customization",
      premium: true,
    },
    {
      value: "html",
      label: "HTML",
      icon: Code,
      description: "Web format for online portfolios",
      premium: true,
    },
    {
      value: "txt",
      label: "Plain Text",
      icon: FileText,
      description: "Simple text format for ATS systems",
      premium: false,
    },
  ];

  const qualityOptions = [
    {
      value: "standard",
      label: "Standard",
      description: "Good quality, smaller file size",
    },
    {
      value: "high",
      label: "High",
      description: "Best quality, larger file size",
    },
    {
      value: "print",
      label: "Print Ready",
      description: "Optimized for professional printing",
    },
  ];

  const pageSizeOptions = [
    {
      value: "A4",
      label: "A4 (210 × 297 mm)",
      description: "Standard international",
    },
    {
      value: "Letter",
      label: "Letter (8.5 × 11 in)",
      description: "Standard US",
    },
    {
      value: "Legal",
      label: "Legal (8.5 × 14 in)",
      description: "Extended US format",
    },
  ];

  const marginOptions = [
    {
      value: "narrow",
      label: "Narrow",
      description: "More content, less white space",
    },
    { value: "normal", label: "Normal", description: "Balanced layout" },
    {
      value: "wide",
      label: "Wide",
      description: "More white space, cleaner look",
    },
  ];

  const stripOklchFromClone = (element, disableColors = false) => {
    const elements = element.getElementsByTagName("*");
    for (let el of elements) {
      // Handle inline styles
      if (el.style) {
        const inlineStyles = el.getAttribute("style") || "";
        if (inlineStyles.includes("oklch") || disableColors) {
          el.style.backgroundColor = disableColors ? "#ffffff" : inlineStyles.includes("background-color") ? "#ffffff" : el.style.backgroundColor;
          el.style.color = disableColors ? "#000000" : inlineStyles.includes("color") ? "#000000" : el.style.color;
          el.style.backgroundImage = disableColors ? "none" : inlineStyles.includes("background-image") ? "none" : el.style.backgroundImage;
          el.style.borderColor = disableColors ? "#000000" : inlineStyles.includes("border-color") ? "#000000" : el.style.borderColor;
        }
      }

      // Handle computed styles
      const style = window.getComputedStyle(el);
      const properties = [
        "backgroundColor",
        "color",
        "backgroundImage",
        "borderColor",
        "borderTopColor",
        "borderRightColor",
        "borderBottomColor",
        "borderLeftColor",
      ];
      properties.forEach((prop) => {
        if (style[prop] && (style[prop].includes("oklch") || disableColors)) {
          if (prop === "backgroundColor") el.style.backgroundColor = "#ffffff";
          if (prop === "color") el.style.color = "#000000";
          if (prop === "backgroundImage") el.style.backgroundImage = "none";
          if (prop.includes("border")) el.style[prop] = "#000000";
        }
      });

      // Sanitize style attribute
      if (el.getAttribute("style")) {
        let styleAttr = el.getAttribute("style");
        if (styleAttr.includes("oklch") || disableColors) {
          styleAttr = styleAttr
            .replace(/background-color:\s*oklch\([^)]+\)/gi, "background-color: #ffffff")
            .replace(/color:\s*oklch\([^)]+\)/gi, "color: #000000")
            .replace(/background-image:\s*[^;]*oklch\([^)]+\)[^;]*/gi, "background-image: none")
            .replace(/border-color:\s*oklch\([^)]+\)/gi, "border-color: #000000");
          el.setAttribute("style", styleAttr);
        }
      }

      // Handle pseudo-elements
      const pseudoStyles = [":before", ":after"];
      pseudoStyles.forEach((pseudo) => {
        try {
          const pseudoStyle = window.getComputedStyle(el, pseudo);
          if (
            (pseudoStyle.backgroundColor && (pseudoStyle.backgroundColor.includes("oklch") || disableColors)) ||
            (pseudoStyle.color && (pseudoStyle.color.includes("oklch") || disableColors))
          ) {
            const styleSheet = document.createElement("style");
            styleSheet.textContent = `
              ${el.tagName.toLowerCase()}${pseudo} {
                background-color: #ffffff !important;
                color: #000000 !important;
                background-image: none !important;
              }
            `;
            el.appendChild(styleSheet);
          }
        } catch (e) {
          // Ignore errors for unsupported pseudo-elements
        }
      });
    }

    // Sanitize root element styles
    if (element.getAttribute("style")) {
      let styleAttr = element.getAttribute("style");
      if (styleAttr.includes("oklch") || disableColors) {
        styleAttr = styleAttr
          .replace(/background-color:\s*oklch\([^)]+\)/gi, "background-color: #ffffff")
          .replace(/color:\s*oklch\([^)]+\)/gi, "color: #000000")
          .replace(/background-image:\s*[^;]*oklch\([^)]+\)[^;]*/gi, "background-image: none")
          .replace(/border-color:\s*oklch\([^)]+\)/gi, "border-color: #000000");
        element.setAttribute("style", styleAttr);
      }
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(10);

    const originalElement = document.getElementById("cv-content");
    if (!originalElement) {
      console.error("CV content not found");
      setIsExporting(false);
      return;
    }

    // Clone the CV content
    const clone = originalElement.cloneNode(true);

    // Sanitize colors
    stripOklchFromClone(clone, !exportOptions.includeColors);

    // Set explicit dimensions for A4 (595px x 842px at 72 DPI)
    const pageWidth = exportOptions.pageSize === "Letter" ? 612 : 595; // Letter: 8.5in x 72px/in = 612px, A4: 210mm x 2.834px/mm ≈ 595px
    const pageHeight = exportOptions.pageSize === "Letter" ? 792 : 842; // Letter: 11in x 72px/in = 792px, A4: 297mm x 2.834px/mm ≈ 842px
    const margin = exportOptions.margins === "narrow" ? 10 : exportOptions.margins === "normal" ? 20 : 30; // in pixels

    // Render offscreen with fixed dimensions
    const hiddenWrapper = document.createElement("div");
    hiddenWrapper.style.position = "absolute";
    hiddenWrapper.style.left = "-9999px";
    hiddenWrapper.style.top = "0";
    hiddenWrapper.style.backgroundColor = "#ffffff";
    hiddenWrapper.style.width = `${pageWidth}px`;
    hiddenWrapper.style.minHeight = `${pageHeight}px`;
    hiddenWrapper.style.padding = `${margin}px`;
    hiddenWrapper.style.boxSizing = "border-box";
    clone.style.width = `${pageWidth - 2 * margin}px`;
    clone.style.minHeight = `${pageHeight - 2 * margin}px`;
    clone.style.overflow = "visible";
    hiddenWrapper.appendChild(clone);
    document.body.appendChild(hiddenWrapper);

    try {
      setExportProgress(30);
      const canvas = await html2canvas(clone, {
        backgroundColor: "#ffffff",
        scale: exportOptions.quality === "high" ? 2 : 1, // Reduced scale to prevent memory issues
        useCORS: true,
        logging: true,
        width: pageWidth,
        height: clone.scrollHeight, // Capture full height of content
        windowWidth: pageWidth,
        windowHeight: clone.scrollHeight,
      });

      console.log("Canvas dimensions:", canvas.width, canvas.height);

      setExportProgress(60);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [pageWidth, pageHeight],
      });

      const contentWidth = pageWidth - 2 * margin;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      let position = 0;
      while (position < contentHeight) {
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin - position,
          contentWidth,
          contentHeight
        );
        position += pageHeight - 2 * margin;
        if (position < contentHeight) {
          pdf.addPage();
        }
      }

      setExportProgress(90);
      const fileName = `${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_CV.pdf`;
      pdf.save(fileName);

      setExportProgress(100);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      document.body.removeChild(hiddenWrapper);
      setTimeout(() => {
        setExportProgress(0);
        setIsExporting(false);
        onClose();
      }, 500);
    }
  };

  const getFormatIcon = (format) => {
    const option = formatOptions.find((opt) => opt.value === format);
    return option ? option.icon : FileText;
  };

  const isFormatPremium = (format) => {
    const option = formatOptions.find((opt) => opt.value === format);
    return option?.premium || false;
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.75)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 10px 15px rgba(0,0,0,0.2)", width: "100%", maxWidth: "896px", maxHeight: "90vh", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(to right, #02325a, #9333ea)", color: "#ffffff", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 600 }}>Export Your CV</h2>
            <p style={{ color: "#bfdbfe" }}>Choose your preferred format and settings</p>
          </div>
          <button
            onClick={onClose}
            style={{ color: "#ffffff", padding: "8px" }}
            className="hover:text-gray-200"
          >
            <X style={{ width: "24px", height: "24px" }} />
          </button>
        </div>

        <div style={{ padding: "24px", overflowY: "auto", maxHeight: "calc(90vh - 200px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }} className="lg:grid-cols-2">
            {/* Export Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Format Selection */}
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#111827", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FileText style={{ width: "20px", height: "20px" }} />
                  Export Format
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                  {formatOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = exportOptions.format === option.value;
                    const isPremium = option.premium;

                    return (
                      <button
                        key={option.value}
                        onClick={() =>
                          !isPremium &&
                          setExportOptions({
                            ...exportOptions,
                            format: option.value,
                          })
                        }
                        disabled={isPremium}
                        style={{
                          padding: "16px",
                          border: `1px solid ${isSelected ? "#3b82f6" : isPremium ? "#e5e7eb" : "#e5e7eb"}`,
                          borderRadius: "8px",
                          textAlign: "left",
                          transition: "all 0.2s",
                          backgroundColor: isSelected ? "#eff6ff" : isPremium ? "#f3f4f6" : "#ffffff",
                          cursor: isPremium ? "not-allowed" : "pointer",
                          opacity: isPremium ? 0.6 : 1,
                        }}
                        className={isSelected ? "ring-2 ring-blue-200" : ""}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <Icon
                              style={{
                                width: "20px",
                                height: "20px",
                                color: isSelected ? "#02325a" : "#4b5563",
                              }}
                            />
                            <span style={{ fontWeight: 500 }}>{option.label}</span>
                          </div>
                          {isPremium && (
                            <Crown style={{ width: "16px", height: "16px", color: "#eab308" }} />
                          )}
                        </div>
                        <p style={{ fontSize: "14px", color: "#4b5563" }}>{option.description}</p>
                        {isPremium && (
                          <p style={{ fontSize: "12px", color: "#ca8a04", marginTop: "4px" }}>
                            Premium feature
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quality Settings */}
              {exportOptions.format === "pdf" && (
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#111827", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Settings style={{ width: "20px", height: "20px" }} />
                    Quality Settings
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {qualityOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          setExportOptions({
                            ...exportOptions,
                            quality: option.value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: `1px solid ${exportOptions.quality === option.value ? "#3b82f6" : "#e5e7eb"}`,
                          borderRadius: "8px",
                          textAlign: "left",
                          transition: "all 0.2s",
                          backgroundColor: exportOptions.quality === option.value ? "#eff6ff" : "#ffffff",
                        }}
                      >
                        <div style={{ fontWeight: 500 }}>{option.label}</div>
                        <div style={{ fontSize: "14px", color: "#4b5563" }}>{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Page Settings */}
              {(exportOptions.format === "pdf" || exportOptions.format === "docx") && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="md:grid-cols-2">
                  <div>
                    <h4 style={{ fontWeight: 600, color: "#111827", marginBottom: "12px" }}>
                      Page Size
                    </h4>
                    <select
                      value={exportOptions.pageSize}
                      onChange={(e) =>
                        setExportOptions({
                          ...exportOptions,
                          pageSize: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "all 0.2s",
                      }}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {pageSizeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h4 style={{ fontWeight: 600, color: "#111827", marginBottom: "12px" }}>
                      Margins
                    </h4>
                    <select
                      value={exportOptions.margins}
                      onChange={(e) =>
                        setExportOptions({
                          ...exportOptions,
                          margins: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "all 0.2s",
                      }}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {marginOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Additional Options */}
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#111827", marginBottom: "16px" }}>
                  Additional Options
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={exportOptions.includeColors}
                      onChange={(e) =>
                        setExportOptions({
                          ...exportOptions,
                          includeColors: e.target.checked,
                        })
                      }
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#02325a",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        outline: "none",
                      }}
                      className="focus:ring-blue-500"
                    />
                    <div>
                      <span style={{ fontWeight: 500, color: "#111827" }}>Include Colors</span>
                      <p style={{ fontSize: "14px", color: "#4b5563" }}>
                        Keep template colors in the exported file
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview & Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Export Summary */}
              <div style={{ backgroundColor: "#f9fafb", borderRadius: "8px", padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#111827", marginBottom: "16px" }}>
                  Export Summary
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#4b5563" }}>Format:</span>
                    <span style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
                      {React.createElement(
                        getFormatIcon(exportOptions.format),
                        { style: { width: "16px", height: "16px" } }
                      )}
                      {
                        formatOptions.find(
                          (opt) => opt.value === exportOptions.format
                        )?.label
                      }
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#4b5563" }}>Template:</span>
                    <span style={{ fontWeight: 500 }}>{template.name}</span>
                  </div>
                  {exportOptions.format === "pdf" && (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#4b5563" }}>Quality:</span>
                        <span style={{ fontWeight: 500, textTransform: "capitalize" }}>
                          {exportOptions.quality}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#4b5563" }}>Page Size:</span>
                        <span style={{ fontWeight: 500 }}>{exportOptions.pageSize}</span>
                      </div>
                    </>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#4b5563" }}>Colors:</span>
                    <span style={{ fontWeight: 500 }}>
                      {exportOptions.includeColors ? "Included" : "Black & White"}
                    </span>
                  </div>
                </div>
              </div>

              {/* File Preview */}
              <div style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px" }}>
                <h4 style={{ fontWeight: 600, color: "#111827", marginBottom: "12px" }}>
                  File Preview
                </h4>
                <div style={{ backgroundColor: "#f3f4f6", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
                  <div style={{ width: "64px", height: "80px", backgroundColor: "#ffffff", border: "1px solid #d1d5db", borderRadius: "8px", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {React.createElement(getFormatIcon(exportOptions.format), {
                      style: { width: "32px", height: "32px", color: "#4b5563" },
                    })}
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>
                    {cvData.personalInfo.firstName}_
                    {cvData.personalInfo.lastName}_CV.{exportOptions.format}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                    Estimated size: {exportOptions.quality === "high" ? "2-3 MB" : "1-2 MB"}
                  </div>
                </div>
              </div>

              {/* Premium Upgrade */}
              {isFormatPremium(exportOptions.format) && (
                <div style={{ background: "linear-gradient(to right, #fefce8, #ffedd5)", border: "1px solid #fde68a", borderRadius: "8px", padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <Crown style={{ width: "24px", height: "24px", color: "#ca8a04" }} />
                    <h4 style={{ fontWeight: 600, color: "#111827" }}>
                      Premium Feature
                    </h4>
                  </div>
                  <p style={{ color: "#374151", marginBottom: "16px" }}>
                    Unlock advanced export formats and customization options
                    with Bolt Premium.
                  </p>
                  <button style={{ width: "100%", background: "linear-gradient(to right, #eab308, #f97316)", color: "#ffffff", padding: "8px 16px", borderRadius: "8px", fontWeight: 500, transition: "all 0.2s" }} className="hover:from-yellow-600 hover:to-orange-600">
                    Upgrade to Premium
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: "#f9fafb", padding: "16px 24px", borderTop: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "14px", color: "#4b5563" }}>
            {isExporting ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "16px", height: "16px", border: "2px solid #02325a", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                Exporting... {exportProgress}%
              </div>
            ) : (
              "Ready to export your professional CV"
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={onClose}
              disabled={isExporting}
              style={{ padding: "8px 16px", color: "#4b5563", transition: "all 0.2s", opacity: isExporting ? 0.5 : 1 }}
              className="hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || isFormatPremium(exportOptions.format)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(to right, #02325a, #9333ea)",
                color: "#ffffff",
                padding: "8px 24px",
                borderRadius: "8px",
                transition: "all 0.2s",
                opacity: isExporting || isFormatPremium(exportOptions.format) ? 0.5 : 1,
                cursor: isExporting || isFormatPremium(exportOptions.format) ? "not-allowed" : "pointer",
              }}
            >
              {isExporting ? (
                <>
                  <div style={{ width: "16px", height: "16px", border: "2px solid #ffffff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download style={{ width: "16px", height: "16px" }} />
                  Export CV
                </>
              )}
            </button>
          </div>
        </div>

        <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <CVPreview data={cvData} template={template} />
        </div>

        {/* Progress Bar */}
        {isExporting && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", backgroundColor: "#e5e7eb" }}>
            <div
              style={{
                height: "100%",
                background: "linear-gradient(to right, #02325a, #9333ea)",
                transition: "width 0.3s",
                width: `${exportProgress}%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportModal;
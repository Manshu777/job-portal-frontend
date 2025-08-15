import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Calendar,
  Star,
  Award,
  Code,
  Languages,
  ExternalLink,
  Github,
} from "lucide-react";

const CVPreview = ({ data, template }) => {
  // Define HEX color fallbacks
  const colors = {
    primary: "#3b82f6",
    accent: "#10b981",
    secondary: "#6b7280",
    text: "#1f2937",
  };

  const renderSkillLevel = (level) => {
    const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
    const currentLevel = levels.indexOf(level) + 1;

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {[1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            style={{
              width: "12px",
              height: "12px",
              fill: i <= currentLevel ? "#facc15" : "none",
              color: i <= currentLevel ? "#facc15" : "#d1d5db",
            }}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01");
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getLanguageLevel = (level) => {
    const levels = { Native: 4, Fluent: 3, Conversational: 2, Basic: 1 };
    return levels[level] || 1;
  };

  return (
    <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", overflow: "hidden" }}>
      <div style={{ backgroundColor: "#3b82f6", padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#111827", display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: colors.primary }}
          />
          Live Preview
        </h3>
        <p style={{ fontSize: "14px", color: "#4b5563" }}>Your CV updates in real-time</p>
      </div>

      <div style={{ padding: "24px", maxHeight: "800px", overflowY: "auto" }}>
        <div
          style={{
            fontFamily: template.fonts.body,
            color: colors.text,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
          id="cv-content"
        >
          {/* Header */}
          <div
            style={{
              paddingBottom: "24px",
              marginBottom: "24px",
              borderBottom: "1px solid #e5e7eb",
              textAlign: template.layout.headerStyle === "centered" ? "center" : template.layout.headerStyle === "split" ? "flex" : "left",
              display: template.layout.headerStyle === "split" ? "flex" : "block",
              justifyContent: template.layout.headerStyle === "split" ? "space-between" : "initial",
              alignItems: template.layout.headerStyle === "split" ? "flex-start" : "initial",
            }}
          >
            <div style={{ flex: template.layout.headerStyle === "split" ? 1 : "initial" }}>
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  fontFamily: template.fonts.heading,
                  color: colors.primary,
                }}
              >
                {data.personalInfo.firstName} {data.personalInfo.lastName}
              </h1>

              {data.personalInfo.title && (
                <p style={{ fontSize: "18px", fontWeight: 500, color: "#374151", marginBottom: "12px" }}>
                  {data.personalInfo.title}
                </p>
              )}

              {template.layout.headerStyle !== "split" && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", color: "#4b5563", marginBottom: "16px", fontSize: "14px" }}>
                  {data.personalInfo.email && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Mail style={{ width: "16px", height: "16px" }} />
                      {data.personalInfo.email}
                    </div>
                  )}
                  {data.personalInfo.phone && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Phone style={{ width: "16px", height: "16px" }} />
                      {data.personalInfo.phone}
                    </div>
                  )}
                  {data.personalInfo.location && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin style={{ width: "16px", height: "16px" }} />
                      {data.personalInfo.location}
                    </div>
                  )}
                </div>
              )}

              {template.layout.headerStyle !== "split" && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "14px" }}>
                  {data.personalInfo.website && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Globe style={{ width: "16px", height: "16px" }} />
                      <a
                        href={data.personalInfo.website}
                        style={{ color: "#02325a", textDecoration: "none" }}
                        className="hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                  {data.personalInfo.linkedin && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Linkedin style={{ width: "16px", height: "16px" }} />
                      <a
                        href={data.personalInfo.linkedin}
                        style={{ color: "#02325a", textDecoration: "none" }}
                        className="hover:underline"
                      >
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {template.layout.headerStyle === "split" && (
              <div style={{ textAlign: "right", color: "#4b5563", fontSize: "14px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {data.personalInfo.email && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                    <Mail style={{ width: "16px", height: "16px" }} />
                    {data.personalInfo.email}
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                    <Phone style={{ width: "16px", height: "16px" }} />
                    {data.personalInfo.phone}
                  </div>
                )}
                {data.personalInfo.location && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                    <MapPin style={{ width: "16px", height: "16px" }} />
                    {data.personalInfo.location}
                  </div>
                )}
                {data.personalInfo.website && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                    <Globe style={{ width: "16px", height: "16px" }} />
                    <a
                      href={data.personalInfo.website}
                      style={{ color: "#02325a", textDecoration: "none" }}
                      className="hover:underline"
                    >
                      Website
                    </a>
                  </div>
                )}
                {data.personalInfo.linkedin && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                    <Linkedin style={{ width: "16px", height: "16px" }} />
                    <a
                      href={data.personalInfo.linkedin}
                      style={{ color: "#02325a", textDecoration: "none" }}
                      className="hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            )}

            {data.personalInfo.summary && (
              <div style={{ marginTop: "16px" }}>
                <p style={{ color: "#374151", lineHeight: 1.5 }}>
                  {data.personalInfo.summary}
                </p>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div
            style={{
              display: "grid",
              gap: "24px",
              gridTemplateColumns: template.layout.columns === 2 ? "1fr" : "1fr",
            }}
            className={template.layout.columns === 2 ? "lg:grid-cols-3" : ""}
          >
            {/* Primary Column */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
              className={template.layout.columns === 2 ? "lg:col-span-2" : ""}
            >
              {/* Experience */}
              {data.experience.length > 0 && (
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginBottom: "16px",
                      paddingBottom: "8px",
                      borderBottom: `1px solid ${colors.primary}33`,
                      fontFamily: template.fonts.heading,
                      color: colors.primary,
                    }}
                  >
                    Experience
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {data.experience.map((exp, index) => (
                      <div
                        key={index}
                        style={{ position: "relative", paddingLeft: "16px", borderLeft: `2px solid ${colors.accent}66` }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                          <div>
                            <h3 style={{ fontWeight: 600, color: "#111827" }}>
                              {exp.position}
                            </h3>
                            <p style={{ color: "#374151", fontWeight: 500 }}>
                              {exp.company}
                            </p>
                            {exp.location && (
                              <p style={{ fontSize: "14px", color: "#4b5563" }}>
                                {exp.location}
                              </p>
                            )}
                          </div>
                          <div style={{ textAlign: "right", fontSize: "14px", color: "#4b5563" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              <Calendar style={{ width: "12px", height: "12px" }} />
                              {formatDate(exp.startDate)} -{" "}
                              {exp.current ? "Present" : formatDate(exp.endDate)}
                            </div>
                          </div>
                        </div>
                        {exp.description && (
                          <p style={{ fontSize: "14px", color: "#374151", marginBottom: "8px" }}>
                            {exp.description}
                          </p>
                        )}
                        {exp.achievements.length > 0 && exp.achievements[0] && (
                          <ul style={{ fontSize: "14px", color: "#374151", display: "flex", flexDirection: "column", gap: "4px" }}>
                            {exp.achievements
                              .filter((a) => a.trim())
                              .map((achievement, i) => (
                                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                                  <span style={{ color: "#9ca3af", marginTop: "4px" }}>•</span>
                                  {achievement}
                                </li>
                              ))}
                          </ul>
                        )}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                            {exp.technologies.map((tech, i) => (
                              <span
                                key={i}
                                style={{
                                  padding: "4px 8px",
                                  fontSize: "12px",
                                  borderRadius: "9999px",
                                  backgroundColor: `${colors.accent}33`,
                                  color: colors.accent,
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {data.projects.length > 0 && (
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginBottom: "16px",
                      paddingBottom: "8px",
                      borderBottom: `1px solid ${colors.primary}33`,
                      fontFamily: template.fonts.heading,
                      color: colors.primary,
                    }}
                  >
                    Projects
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {data.projects.map((project, index) => (
                      <div
                        key={index}
                        style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px" }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                          <div>
                            <h3 style={{ fontWeight: 600, color: "#111827", display: "flex", alignItems: "center", gap: "8px" }}>
                              {project.name}
                              {project.url && (
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "#02325a" }}
                                >
                                  <ExternalLink style={{ width: "16px", height: "16px" }} />
                                </a>
                              )}
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "#4b5563" }}
                                >
                                  <Github style={{ width: "16px", height: "16px" }} />
                                </a>
                              )}
                            </h3>
                            {project.role && (
                              <p style={{ fontSize: "14px", color: "#4b5563" }}>
                                {project.role}
                              </p>
                            )}
                          </div>
                          {(project.startDate || project.endDate) && (
                            <div style={{ textAlign: "right", fontSize: "14px", color: "#4b5563" }}>
                              {formatDate(project.startDate)} -{" "}
                              {formatDate(project.endDate)}
                            </div>
                          )}
                        </div>
                        <p style={{ fontSize: "14px", color: "#374151", marginBottom: "8px" }}>
                          {project.description}
                        </p>
                        {project.technologies.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                style={{
                                  padding: "4px 8px",
                                  fontSize: "12px",
                                  borderRadius: "9999px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  backgroundColor: `${colors.secondary}33`,
                                  color: colors.secondary,
                                }}
                              >
                                <Code style={{ width: "12px", height: "12px" }} />
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {project.achievements &&
                          project.achievements.length > 0 &&
                          project.achievements[0] && (
                            <ul style={{ fontSize: "14px", color: "#374151", display: "flex", flexDirection: "column", gap: "4px" }}>
                              {project.achievements
                                .filter((a) => a.trim())
                                .map((achievement, i) => (
                                  <li
                                    key={i}
                                    style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
                                  >
                                    <Star style={{ width: "12px", height: "12px", color: "#facc15", marginTop: "4px", flexShrink: 0 }} />
                                    {achievement}
                                  </li>
                                ))}
                            </ul>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
              className={template.layout.columns === 2 ? "lg:col-span-1" : ""}
            >
              {data.education.length > 0 && (
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginBottom: "16px",
                      paddingBottom: "8px",
                      borderBottom: `1px solid ${colors.primary}33`,
                      fontFamily: template.fonts.heading,
                      color: colors.primary,
                    }}
                  >
                    Education
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {data.education.map((edu, index) => (
                      <div
                        key={index}
                        style={{ position: "relative", paddingLeft: "16px", borderLeft: `2px solid ${colors.accent}66` }}
                      >
                        <div style={{ marginBottom: "8px" }}>
                          <h3 style={{ fontWeight: 600, color: "#111827" }}>
                            {edu.degree}
                          </h3>
                          <p style={{ color: "#374151" }}>{edu.fieldOfStudy}</p>
                          <p style={{ fontSize: "14px", color: "#4b5563" }}>
                            {edu.institution}
                          </p>
                          <div style={{ fontSize: "14px", color: "#4b5563", display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                            <Calendar style={{ width: "12px", height: "12px" }} />
                            {formatDate(edu.startDate)} -{" "}
                            {formatDate(edu.endDate)}
                          </div>
                          {edu.gpa && (
                            <p style={{ fontSize: "14px", color: "#4b5563" }}>
                              GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                        {edu.achievements.length > 0 && edu.achievements[0] && (
                          <ul style={{ fontSize: "14px", color: "#374151", display: "flex", flexDirection: "column", gap: "4px" }}>
                            {edu.achievements
                              .filter((a) => a.trim())
                              .map((achievement, i) => (
                                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                                  <span style={{ color: "#9ca3af", marginTop: "4px" }}>•</span>
                                  {achievement}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {data.skills.length > 0 && (
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginBottom: "16px",
                      paddingBottom: "8px",
                      borderBottom: `1px solid ${colors.primary}33`,
                      fontFamily: template.fonts.heading,
                      color: colors.primary,
                    }}
                  >
                    Skills
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {Object.entries(
                      data.skills.reduce((acc, skill) => {
                        if (!acc[skill.category]) acc[skill.category] = [];
                        acc[skill.category].push(skill);
                        return acc;
                      }, {})
                    ).map(([category, skills]) => (
                      <div key={category}>
                        <h3 style={{ fontWeight: 500, color: "#1f2937", marginBottom: "8px" }}>
                          {category}
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {skills.map((skill, index) => (
                            <div
                              key={index}
                              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                            >
                              <span style={{ fontSize: "14px", color: "#374151" }}>
                                {skill.name}
                              </span>
                              {renderSkillLevel(skill.level)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {data.languages.length > 0 && (
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginBottom: "16px",
                      paddingBottom: "8px",
                      borderBottom: `1px solid ${colors.primary}33`,
                      fontFamily: template.fonts.heading,
                      color: colors.primary,
                    }}
                  >
                    Languages
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {data.languages.map((language, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <Languages style={{ width: "16px", height: "16px", color: "#4b5563" }} />
                          <span style={{ color: "#374151" }}>{language.name}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: i <= getLanguageLevel(language.level) ? "#3b82f6" : "#d1d5db",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {data.certifications.length > 0 && (
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginBottom: "16px",
                      paddingBottom: "8px",
                      borderBottom: `1px solid ${colors.primary}`,
                      fontFamily: template.fonts.heading,
                      color: colors.primary,
                    }}
                  >
                    Certifications
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {data.certifications.map((cert, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <Award style={{ width: "16px", height: "16px", color: "#facc15", marginTop: "4px", flexShrink: 0 }} />
                        <div>
                          <h3 style={{ fontWeight: 500, color: "#111827", fontSize: "14px" }}>
                            {cert.name}
                          </h3>
                          <p style={{ fontSize: "14px", color: "#4b5563" }}>{cert.issuer}</p>
                          <p style={{ fontSize: "12px", color: "#6b7280" }}>
                            {formatDate(cert.date)}
                          </p>
                          {cert.credentialId && (
                            <p style={{ fontSize: "12px", color: "#6b7280" }}>
                              ID: {cert.credentialId}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
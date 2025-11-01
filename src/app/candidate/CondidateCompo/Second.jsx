"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Select from "react-select";
import { FiBook, FiAward } from "react-icons/fi";
import { customSelectStyles } from "../../components/constants/SelectStyles";
import {
  EDUCATION_LEVELS,
  MONTHS,
  SCHOOL_MEDIUMS,
} from "../../components/constants/education";
import { baseurl } from "@/app/components/common";

const Second = ({ alldata, handelinputs, errors }) => {
  const [eduLvl, setEduLvl] = useState(null);

  // Separate qualification lists
  const [gradQualifications, setGradQualifications] = useState([]);
  const [postGradQualifications, setPostGradQualifications] = useState([]);
  const [loadingGradQual, setLoadingGradQual] = useState(false);
  const [loadingPostGradQual, setLoadingPostGradQual] = useState(false);

  // Specializations per level
  const [gradSpecializations, setGradSpecializations] = useState([]);
  const [postGradSpecializations, setPostGradSpecializations] = useState([]);
  const [loadingGradSpec, setLoadingGradSpec] = useState(false);
  const [loadingPostGradSpec, setLoadingPostGradSpec] = useState(false);

  const [apiError, setApiError] = useState("");

  // Map highest_education → eduLvl
  useEffect(() => {
    const found = EDUCATION_LEVELS.find((l) => l.name === alldata.highest_education);
    setEduLvl(found ? found.value : null);
  }, [alldata.highest_education]);

  // Fetch Graduation Qualifications (Level 1)
  const fetchGradQualifications = useCallback(async () => {
    setLoadingGradQual(true);
    try {
      const res = await fetch(`${baseurl}/qualifications/education-level/1`);
      const json = await res.json();
      if (json.status !== "success") throw new Error(json.message);
      setGradQualifications(json.data || []);
    } catch (e) {
      setApiError("Failed to load graduation programs");
    } finally {
      setLoadingGradQual(false);
    }
  }, []);

  // Fetch Post-Graduation Qualifications (Level 2)
  const fetchPostGradQualifications = useCallback(async () => {
    setLoadingPostGradQual(true);
    try {
      const res = await fetch(`${baseurl}/qualifications/education-level/2`);
      const json = await res.json();
      if (json.status !== "success") throw new Error(json.message);
      setPostGradQualifications(json.data || []);
    } catch (e) {
      setApiError("Failed to load post-graduation programs");
    } finally {
      setLoadingPostGradQual(false);
    }
  }, []);

  useEffect(() => {
    fetchGradQualifications();
    fetchPostGradQualifications();
  }, [fetchGradQualifications, fetchPostGradQualifications]);

  // Fetch Specializations for Graduation
  const selectedGradQual = useMemo(() => {
    return gradQualifications.find((q) => q.title === alldata?.graduation?.education_level);
  }, [gradQualifications, alldata?.graduation?.education_level]);

  const fetchGradSpecializations = useCallback(async () => {
    if (!selectedGradQual) {
      setGradSpecializations([]);
      return;
    }
    setLoadingGradSpec(true);
    try {
      const res = await fetch(`${baseurl}/qualifications/${selectedGradQual.id}/specializations`);
      const json = await res.json();
      if (json.status !== "success") throw new Error(json.message);
      setGradSpecializations(json.data.specializations || []);
    } catch (e) {
      setApiError("Failed to load graduation specializations");
    } finally {
      setLoadingGradSpec(false);
    }
  }, [selectedGradQual]);

  useEffect(() => {
    fetchGradSpecializations();
  }, [fetchGradSpecializations]);

  // Fetch Specializations for Post-Graduation
  const selectedPostGradQual = useMemo(() => {
    return postGradQualifications.find((q) => q.title === alldata?.postGraduation?.education_level);
  }, [postGradQualifications, alldata?.postGraduation?.education_level]);

  const fetchPostGradSpecializations = useCallback(async () => {
    if (!selectedPostGradQual) {
      setPostGradSpecializations([]);
      return;
    }
    setLoadingPostGradSpec(true);
    try {
      const res = await fetch(`${baseurl}/qualifications/${selectedPostGradQual.id}/specializations`);
      const json = await res.json();
      if (json.status !== "success") throw new Error(json.message);
      setPostGradSpecializations(json.data.specializations || []);
    } catch (e) {
      setApiError("Failed to load post-graduation specializations");
    } finally {
      setLoadingPostGradSpec(false);
    }
  }, [selectedPostGradQual]);

  useEffect(() => {
    fetchPostGradSpecializations();
  }, [fetchPostGradSpecializations]);

  // Reset block
  const resetBlock = (block) => {
    const empty = {
      education_level: "",
      specialization: "",
      college_name: "",
      complete_years: "",
      complete_month: "",
      school_medium: "",
    };
    handelinputs({ target: { name: block, value: empty } });
  };

  // Handle highest education change
  const handleHighestChange = (opt) => {
    const name = opt ? opt.label : "";
    handelinputs({ target: { name: "highest_education", value: name } });

    if (!["Graduate", "Post Graduate"].includes(name)) {
      resetBlock("graduation");
      resetBlock("postGraduation");
    }
  };

  // Handle year validation
  const handleYear = (e, block) => {
    const val = e.target.value;
    const cur = new Date().getFullYear();

    if (alldata.currently_pursuing === "No" && parseInt(val) > cur) {
      setApiError("Completion year cannot be in the future");
      return;
    }
    setApiError("");
    handelinputs({
      target: { name: `${block ? block + "." : ""}complete_years`, value: val },
    });
  };

  // Options
  const educationOptions = EDUCATION_LEVELS.map((e) => ({
    value: e.value,
    label: e.name,
  }));
  const monthOptions = MONTHS.map((m) => ({ value: m, label: m }));
  const mediumOptions = SCHOOL_MEDIUMS.map((m) => ({ value: m, label: m }));

  const gradQualOptions = gradQualifications.map((q) => ({ value: q.title, label: q.title }));
  const postGradQualOptions = postGradQualifications.map((q) => ({ value: q.title, label: q.title }));
  const gradSpecOptions = gradSpecializations.map((s) => ({ value: s.title, label: s.title }));
  const postGradSpecOptions = postGradSpecializations.map((s) => ({ value: s.title, label: s.title }));

  return (
    <div className="space-y-8">
      {/* Currently Pursuing */}
      <div className="flex gap-4">
        {["Yes", "No"].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() =>
              handelinputs({
                target: { name: "currently_pursuing", value: v },
              })
            }
            className={`px-5 py-2 rounded-full border ${
              alldata.currently_pursuing === v
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Highest Education */}
      <div>
        <label className="flex items-center font-medium text-gray-700">
          <FiBook className="mr-2 text-blue-500" />
          {alldata.currently_pursuing === "Yes" ? "Currently Pursuing" : "Highest Education Level"}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Select
          options={educationOptions}
          value={educationOptions.find((o) => o.label === alldata.highest_education)}
          onChange={handleHighestChange}
          placeholder="Select level"
          styles={customSelectStyles}
          menuPortalTarget={document.body}
        />
        {errors.highest_education && (
          <p className="text-red-500 text-sm mt-1">{errors.highest_education}</p>
        )}
      </div>

      {/* 10th / 12th / Diploma / ITI */}
      {eduLvl && [3, 5, 6, 7].includes(eduLvl) && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Degree Program (only for Diploma & ITI) */}
          {[3, 7].includes(eduLvl) && (
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiAward className="mr-2 text-blue-500" />
                Degree Program <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                isLoading={loadingGradQual}
                options={gradQualOptions}
                value={gradQualOptions.find((o) => o.value === alldata?.education_level)}
                onChange={(opt) =>
                  handelinputs({
                    target: { name: "education_level", value: opt?.value ?? "" },
                  })
                }
                placeholder="Select degree"
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>
          )}

          {/* School Medium */}
          <div>
            <label className="flex items-center font-medium text-gray-700">
              <FiBook className="mr-2 text-blue-500" />
              School Medium <span className="text-red-500 ml-1">*</span>
            </label>
            <Select
              options={mediumOptions}
              value={mediumOptions.find((o) => o.value === alldata.school_medium)}
              onChange={(opt) =>
                handelinputs({
                  target: { name: "school_medium", value: opt?.value ?? "" },
                })
              }
              styles={customSelectStyles}
              menuPortalTarget={document.body}
            />
          </div>

          {/* Completion Year */}
          <div>
            <label className="flex items-center font-medium text-gray-700">
              <FiAward className="mr-2 text-blue-500" />
              Completion Year <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              value={alldata.complete_years ?? ""}
              onChange={(e) => handleYear(e, "")}
              min="1900"
              max={new Date().getFullYear() + 5}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Completion Month */}
          <div>
            <label className="flex items-center font-medium text-gray-700">
              <FiAward className="mr-2 text-blue-500" />
              Completion Month <span className="text-red-500 ml-1">*</span>
            </label>
            <Select
              options={monthOptions}
              value={monthOptions.find((o) => o.value === alldata.complete_month)}
              onChange={(opt) =>
                handelinputs({
                  target: { name: "complete_month", value: opt?.value ?? "" },
                })
              }
              styles={customSelectStyles}
              menuPortalTarget={document.body}
            />
          </div>
        </div>
      )}

      {/* GRADUATION */}
      {eduLvl && [1, 2].includes(eduLvl) && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Graduation</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Degree Program */}
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiAward className="mr-2 text-blue-500" />
                Degree Program <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                isLoading={loadingGradQual}
                options={gradQualOptions}
                value={gradQualOptions.find((o) => o.value === alldata?.graduation?.education_level)}
                onChange={(opt) =>
                  handelinputs({
                    target: { name: "graduation.education_level", value: opt?.value ?? "" },
                  })
                }
                placeholder="Select degree"
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
              {errors["graduation.education_level"] && (
                <p className="text-red-500 text-sm mt-1">{errors["graduation.education_level"]}</p>
              )}
            </div>

            {/* Specialization */}
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiAward className="mr-2 text-blue-500" />
                Specialization
              </label>
              <Select
                isLoading={loadingGradSpec}
                isDisabled={!alldata?.graduation?.education_level}
                options={gradSpecOptions}
                value={gradSpecOptions.find((o) => o.value === alldata?.graduation?.specialization)}
                onChange={(opt) =>
                  handelinputs({
                    target: { name: "graduation.specialization", value: opt?.value ?? "" },
                  })
                }
                placeholder="Select specialization"
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>

            {/* College */}
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiBook className="mr-2 text-blue-500" />
                College / University <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={alldata?.graduation?.college_name ?? ""}
                onChange={handelinputs}
                name="graduation.college_name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Completion Year */}
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiAward className="mr-2 text-blue-500" />
                Completion Year <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                value={alldata?.graduation?.complete_years ?? ""}
                onChange={(e) => handleYear(e, "graduation")}
                min="1900"
                max={new Date().getFullYear() + 5}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Completion Month */}
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiAward className="mr-2 text-blue-500" />
                Completion Month <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                options={monthOptions}
                value={monthOptions.find((o) => o.value === alldata?.graduation?.complete_month)}
                onChange={(opt) =>
                  handelinputs({
                    target: { name: "graduation.complete_month", value: opt?.value ?? "" },
                  })
                }
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>

            {/* School Medium */}
            <div>
              {/* <label className="flex items-center font-medium text-gray-700">
                <FiBook className="mr-2 text-blue-500" />
                School Medium
              </label>
              <Select
                options={mediumOptions}
                value={mediumOptions.find((o) => o.value === alldata?.graduation?.school_medium)}
                onChange={(opt) =>
                  handelinputs({
                    target: { name: "graduation.school_medium", value: opt?.value ?? "" },
                  })
                }
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              /> */}
            </div>
          </div>
        </div>
      )}

      {/* POST-GRADUATION */}
      {eduLvl === 2 && (
        <div className="border-t pt-6 mt-8">
          <h3 className="text-xl font-semibold mb-4">Post-Graduation</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Degree Program */}
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiAward className="mr-2 text-blue-500" />
                Degree Program <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                isLoading={loadingPostGradQual}
                options={postGradQualOptions}
                value={postGradQualOptions.find((o) => o.value === alldata?.postGraduation?.education_level)}
                onChange={(opt) =>
                  handelinputs({
                    target: { name: "postGraduation.education_level", value: opt?.value ?? "" },
                  })
                }
                placeholder="Select degree"
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiAward className="mr-2 text-blue-500" />
                Specialization
              </label>
              <Select
                isLoading={loadingPostGradSpec}
                isDisabled={!alldata?.postGraduation?.education_level}
                options={postGradSpecOptions}
                value={postGradSpecOptions.find((o) => o.value === alldata?.postGraduation?.specialization)}
                onChange={(opt) =>
                  handelinputs({
                    target: { name: "postGraduation.specialization", value: opt?.value ?? "" },
                  })
                }
                placeholder="Select specialization"
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>

            {/* College */}
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiBook className="mr-2 text-blue-500" />
                College / University
              </label>
              <input
                type="text"
                value={alldata?.postGraduation?.college_name ?? ""}
                onChange={handelinputs}
                name="postGraduation.college_name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Completion Year */}
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiAward className="mr-2 text-blue-500" />
                Completion Year
              </label>
              <input
                type="number"
                value={alldata?.postGraduation?.complete_years ?? ""}
                onChange={(e) => handleYear(e, "postGraduation")}
                min="1900"
                max={new Date().getFullYear() + 5}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Completion Month */}
            <div>
              <label className="flex items-center font-medium text-gray-700">
                <FiAward className="mr-2 text-blue-500" />
                Completion Month
              </label>
              <Select
                options={monthOptions}
                value={monthOptions.find((o) => o.value === alldata?.postGraduation?.complete_month)}
                onChange={(opt) =>
                  handelinputs({
                    target: { name: "postGraduation.complete_month", value: opt?.value ?? "" },
                  })
                }
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>
          </div>
        </div>
      )}

      {/* API Error */}
      {apiError && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">{apiError}</div>
      )}
    </div>
  );
};

export default Second;
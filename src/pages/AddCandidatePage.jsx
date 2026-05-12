// src/pages/AddCandidatePage.jsx
// Form page to manually add a new candidate.
// Validates all fields inline, dispatches ADD_CANDIDATE to context,
// shows a success toast, resets the form, then redirects to "/" after 2 s.

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineAcademicCap,
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineTag,
  HiOutlineClipboardList,
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import { useCandidates } from "../context/CandidateContext";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const STATUS_OPTIONS = ["Applied", "Interviewing", "Selected", "Rejected"];

const EMPTY_FORM = {
  name:       "",
  email:      "",
  phone:      "",
  college:    "",
  location:   "",
  experience: "",
  skills:     "",
  status:     "Applied",
  bio:        "",
};

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
function validate(form) {
  const errors = {};

  if (!form.name.trim())
    errors.name = "Full name is required.";

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[\d\s\-().]{7,15}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number (digits only, 7–15 chars).";
  }

  if (!form.college.trim())
    errors.college = "College / institution name is required.";

  if (!form.location.trim())
    errors.location = "Location is required.";

  if (form.experience === "" || form.experience === null) {
    errors.experience = "Experience is required.";
  } else {
    const exp = Number(form.experience);
    if (isNaN(exp) || exp < 0 || exp > 50)
      errors.experience = "Experience must be a number between 0 and 50.";
  }

  if (!form.skills.trim())
    errors.skills = "Add at least one skill.";

  if (!form.bio.trim())
    errors.bio = "Bio is required.";

  return errors;
}

// ---------------------------------------------------------------------------
// AddCandidatePage
// ---------------------------------------------------------------------------
function AddCandidatePage() {
  const { addCandidate }    = useCandidates();
  const navigate            = useNavigate();

  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});   // track which fields were blurred
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const redirectTimer = useRef(null);

  // Clean up timer on unmount
  useEffect(() => () => clearTimeout(redirectTimer.current), []);

  // Re-validate touched fields live as user types
  useEffect(() => {
    if (submitted || Object.keys(touched).length > 0) {
      const newErrors = validate(form);
      // Only show errors for touched fields (unless form was submitted)
      const filtered = submitted
        ? newErrors
        : Object.fromEntries(
            Object.entries(newErrors).filter(([k]) => touched[k])
          );
      setErrors(filtered);
    }
  }, [form, touched, submitted]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error field
      const firstKey = Object.keys(validationErrors)[0];
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    // Build candidate object
    const newCandidate = {
      id:          Date.now(),
      name:        form.name.trim(),
      email:       form.email.trim(),
      phone:       form.phone.trim(),
      college:     form.college.trim(),
      location:    form.location.trim(),
      experience:  Number(form.experience),
      skills:      form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      status:      form.status,
      bio:         form.bio.trim(),
      appliedDate: new Date().toISOString().split("T")[0],
    };

    addCandidate(newCandidate);

    // Reset form
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);

    // Show success toast then redirect
    setShowToast(true);
    redirectTimer.current = setTimeout(() => {
      setShowToast(false);
      navigate("/");
    }, 2000);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="detail-page-enter min-h-screen bg-gray-50 dark:bg-gray-950
                    transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Back button ─────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="group mb-6 flex items-center gap-2 text-sm font-medium
                     text-gray-500 dark:text-gray-400
                     hover:text-indigo-600 dark:hover:text-indigo-400
                     transition-colors duration-200"
        >
          <HiOutlineArrowLeft className="w-4 h-4 transition-transform duration-200
                                          group-hover:-translate-x-0.5" />
          Back to Candidates
        </button>

        {/* ── Page header ─────────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Add Candidate
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Fill in the details below to add a new candidate to the dashboard.
          </p>
        </div>

        {/* ── Form card ───────────────────────────────────────────── */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-gray-200/80 dark:border-gray-700/60
                     bg-white dark:bg-gray-800/70
                     shadow-lg shadow-black/5 dark:shadow-black/20
                     overflow-hidden"
        >
          {/* Form sections */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700/60">

            {/* ── Section 1: Personal Info ─────────────────────── */}
            <FormSection icon={<HiOutlineUser />} title="Personal Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  id="field-name"
                  name="name"
                  label="Full Name"
                  placeholder="e.g. Aarav Mehta"
                  icon={<HiOutlineUser />}
                  value={form.name}
                  error={errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <Field
                  id="field-email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="e.g. aarav@example.com"
                  icon={<HiOutlineMail />}
                  value={form.email}
                  error={errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <Field
                  id="field-phone"
                  name="phone"
                  label="Phone Number"
                  placeholder="e.g. +91 98201 34567"
                  icon={<HiOutlinePhone />}
                  value={form.phone}
                  error={errors.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <Field
                  id="field-location"
                  name="location"
                  label="Location"
                  placeholder="e.g. Mumbai, Maharashtra"
                  icon={<HiOutlineLocationMarker />}
                  value={form.location}
                  error={errors.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </FormSection>

            {/* ── Section 2: Academic & Professional ──────────── */}
            <FormSection icon={<HiOutlineAcademicCap />} title="Academic & Professional">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  id="field-college"
                  name="college"
                  label="College / Institution"
                  placeholder="e.g. IIT Bombay"
                  icon={<HiOutlineAcademicCap />}
                  value={form.college}
                  error={errors.college}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <Field
                  id="field-experience"
                  name="experience"
                  type="number"
                  label="Experience (years)"
                  placeholder="e.g. 2"
                  icon={<HiOutlineBriefcase />}
                  value={form.experience}
                  error={errors.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={0}
                  max={50}
                  required
                />
              </div>

              {/* Skills — full width */}
              <div className="mt-5">
                <Field
                  id="field-skills"
                  name="skills"
                  label="Skills"
                  placeholder="e.g. React, Node.js, Tailwind CSS, MongoDB"
                  icon={<HiOutlineTag />}
                  value={form.skills}
                  error={errors.skills}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  hint="Separate multiple skills with commas"
                  required
                />
                {/* Live skill preview pills */}
                {form.skills.trim() && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.skills.split(",").map((s) => s.trim()).filter(Boolean).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full text-xs font-medium
                                   bg-indigo-100 text-indigo-700
                                   dark:bg-indigo-900/40 dark:text-indigo-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </FormSection>

            {/* ── Section 3: Application Info ──────────────────── */}
            <FormSection icon={<HiOutlineClipboardList />} title="Application Details">
              {/* Status dropdown */}
              <div className="mb-5">
                <label
                  htmlFor="field-status"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Application Status
                </label>
                <div className="relative">
                  <HiOutlineClipboardList className="pointer-events-none absolute left-3.5 top-1/2
                                                       -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    id="field-status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl text-sm appearance-none
                               bg-gray-50 dark:bg-gray-900/50
                               border border-gray-300 dark:border-gray-600
                               text-gray-900 dark:text-gray-100
                               focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                               focus:border-indigo-400 dark:focus:border-indigo-500
                               transition-all duration-200 cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2
                                   -translate-y-1/2 text-gray-400 text-xs">
                    ▾
                  </span>
                </div>
              </div>

              {/* Bio textarea */}
              <div>
                <label
                  htmlFor="field-bio"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Bio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <HiOutlineBookOpen className="pointer-events-none absolute left-3.5 top-3.5
                                                  w-4 h-4 text-gray-400" />
                  <textarea
                    id="field-bio"
                    name="bio"
                    rows={4}
                    value={form.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write a short bio about the candidate — background, strengths, goals…"
                    className={`w-full pl-10 pr-4 pt-3 pb-3 rounded-xl text-sm resize-none
                                bg-gray-50 dark:bg-gray-900/50
                                border transition-all duration-200
                                text-gray-900 dark:text-gray-100
                                placeholder-gray-400 dark:placeholder-gray-600
                                focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                ${errors.bio
                                  ? "border-red-400 dark:border-red-600 focus:border-red-400"
                                  : "border-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-500"
                                }`}
                  />
                </div>
                {errors.bio && <ErrorMsg>{errors.bio}</ErrorMsg>}
              </div>
            </FormSection>
          </div>

          {/* ── Form footer: submit ──────────────────────────────── */}
          <div className="flex items-center justify-end gap-3 px-6 py-5
                          bg-gray-50/80 dark:bg-gray-900/30
                          border-t border-gray-100 dark:border-gray-700/60">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold
                         border border-gray-300 dark:border-gray-600
                         text-gray-700 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800
                         transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl
                         text-sm font-semibold text-white
                         bg-gradient-to-r from-violet-600 to-indigo-600
                         hover:from-violet-700 hover:to-indigo-700
                         shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
                         hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200"
            >
              <HiOutlinePaperAirplane className="w-4 h-4 rotate-90" />
              Add Candidate
            </button>
          </div>
        </form>
      </div>

      {/* ── Success toast ─────────────────────────────────────────── */}
      {showToast && <SuccessToast />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FormSection({ icon, title, children }) {
  return (
    <div className="px-6 py-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-indigo-500 dark:text-indigo-400 w-5 h-5">{icon}</span>
        <h2 className="text-xs font-bold uppercase tracking-widest
                       text-gray-500 dark:text-gray-400">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  id, name, label, type = "text", placeholder,
  icon, value, error, onChange, onBlur, hint,
  required, min, max,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold
                                      text-gray-700 dark:text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2
                         -translate-y-1/2 w-4 h-4 text-gray-400">
          {icon}
        </span>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          min={min}
          max={max}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                      bg-gray-50 dark:bg-gray-900/50
                      border transition-all duration-200
                      text-gray-900 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-600
                      focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                      ${error
                        ? "border-red-400 dark:border-red-600 focus:border-red-400"
                        : "border-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-500"
                      }`}
        />
      </div>
      {hint && !error && (
        <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">{hint}</p>
      )}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
}

function ErrorMsg({ children }) {
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500 dark:text-red-400">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
      {children}
    </p>
  );
}

function SuccessToast() {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50
                 flex items-center gap-3
                 px-5 py-4 rounded-2xl
                 bg-emerald-600 text-white
                 shadow-2xl shadow-emerald-600/30
                 animate-toast-in"
    >
      <HiOutlineCheckCircle className="w-6 h-6 flex-shrink-0" />
      <div>
        <p className="text-sm font-bold">Candidate added!</p>
        <p className="text-xs text-emerald-100 mt-0.5">Redirecting to dashboard…</p>
      </div>
    </div>
  );
}

export default AddCandidatePage;

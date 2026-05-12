// src/pages/CandidateDetailPage.jsx
// Full candidate profile page — two-column desktop, single-column mobile.
// Reads :id from URL params, finds the candidate in context, or shows a 404 state.

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineBookOpen,
  HiOutlineTag,
} from "react-icons/hi";
import { useCandidates } from "../context/CandidateContext";

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------
const STATUS_CONFIG = {
  Applied: {
    badge: "bg-blue-100 text-blue-700 ring-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:ring-blue-800",
    dot:   "bg-blue-500",
    bar:   "from-blue-400 to-blue-600",
  },
  Interviewing: {
    badge: "bg-amber-100 text-amber-700 ring-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-800",
    dot:   "bg-amber-500",
    bar:   "from-amber-400 to-amber-600",
  },
  Selected: {
    badge: "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-800",
    dot:   "bg-emerald-500",
    bar:   "from-emerald-400 to-emerald-600",
  },
  Rejected: {
    badge: "bg-red-100 text-red-700 ring-red-200 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-800",
    dot:   "bg-red-500",
    bar:   "from-red-400 to-red-600",
  },
};

// Skill pill colour cycle
const SKILL_COLOURS = [
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  "bg-sky-100    text-sky-700    dark:bg-sky-900/40    dark:text-sky-300",
  "bg-teal-100   text-teal-700   dark:bg-teal-900/40   dark:text-teal-300",
  "bg-pink-100   text-pink-700   dark:bg-pink-900/40   dark:text-pink-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function avatarUrl(name) {
  const seed = encodeURIComponent(name.trim());
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundType=gradientLinear&fontFamily=Arial&fontSize=36`;
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// CandidateDetailPage
// ---------------------------------------------------------------------------
function CandidateDetailPage() {
  const { id }        = useParams();
  const navigate      = useNavigate();
  const { candidates } = useCandidates();

  const candidate = candidates.find((c) => String(c.id) === String(id));

  if (!candidate) return <NotFoundState onBack={() => navigate("/")} />;

  const {
    name, email, phone, location, college,
    experience, bio, skills = [], status, appliedDate,
  } = candidate;

  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Applied;

  return (
    <div className="detail-page-enter min-h-screen bg-gray-50 dark:bg-gray-950
                    transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Back button ─────────────────────────────────────────── */}
        <button
          onClick={() => navigate("/")}
          className="group mb-6 flex items-center gap-2 text-sm font-medium
                     text-gray-500 dark:text-gray-400
                     hover:text-indigo-600 dark:hover:text-indigo-400
                     transition-colors duration-200"
        >
          <HiOutlineArrowLeft
            className="w-4 h-4 transition-transform duration-200
                       group-hover:-translate-x-0.5"
          />
          Back to Candidates
        </button>

        {/* ── Two-column layout ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">

          {/* ══ LEFT COLUMN — Profile card ══════════════════════════ */}
          <aside className="flex flex-col gap-5">

            {/* Profile card */}
            <div className="relative rounded-2xl border border-gray-200/80
                            dark:border-gray-700/60
                            bg-white dark:bg-gray-800/70
                            shadow-lg shadow-black/5 dark:shadow-black/20
                            overflow-hidden">

              {/* Status colour bar at top */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.bar}`} />

              <div className="flex flex-col items-center text-center px-6 py-8 gap-4">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={avatarUrl(name)}
                    alt={`${name}'s avatar`}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-2xl shadow-xl ring-4
                               ring-white dark:ring-gray-700 object-cover"
                    loading="eager"
                  />
                  {/* Pulsing status dot */}
                  <span
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full
                                 ring-2 ring-white dark:ring-gray-800
                                 ${cfg.dot} animate-pulse`}
                    aria-hidden="true"
                  />
                </div>

                {/* Name */}
                <div>
                  <h1 className="text-xl font-extrabold text-gray-900 dark:text-white
                                 tracking-tight leading-tight">
                    {name}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {college || "—"}
                  </p>
                </div>

                {/* Status badge */}
                <span
                  className={`flex items-center gap-1.5 px-3 py-1.5
                               text-sm font-semibold rounded-full ring-1 ${cfg.badge}`}
                >
                  <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                  {status}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 dark:border-gray-700/60 mx-6" />

              {/* Contact info rows */}
              <div className="px-6 py-5 space-y-3.5">
                <ContactRow icon={<HiOutlineMail />}           label="Email"    value={email} />
                <ContactRow icon={<HiOutlinePhone />}          label="Phone"    value={phone} />
                <ContactRow icon={<HiOutlineLocationMarker />} label="Location" value={location} />
                <ContactRow icon={<HiOutlineCalendar />}       label="Applied"  value={formatDate(appliedDate)} />
              </div>
            </div>

            {/* Quick stats card */}
            <div className="grid grid-cols-2 gap-3">
              <StatBox
                label="Experience"
                value={experience === 0 ? "Fresher" : `${experience} yr${experience > 1 ? "s" : ""}`}
                icon={<HiOutlineBriefcase className="w-5 h-5 text-indigo-500" />}
              />
              <StatBox
                label="Skills"
                value={skills.length}
                icon={<HiOutlineTag className="w-5 h-5 text-violet-500" />}
              />
            </div>
          </aside>

          {/* ══ RIGHT COLUMN — Details ══════════════════════════════ */}
          <div className="flex flex-col gap-5">

            {/* Bio section */}
            <Section icon={<HiOutlineBookOpen className="w-5 h-5" />} title="About">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {bio || "No bio provided."}
              </p>
            </Section>

            {/* Skills section */}
            <Section icon={<HiOutlineTag className="w-5 h-5" />} title="Skills">
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium
                                  border border-transparent
                                  ${SKILL_COLOURS[i % SKILL_COLOURS.length]}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                  No skills listed.
                </p>
              )}
            </Section>

            {/* Full profile details */}
            <Section icon={<HiOutlineUser className="w-5 h-5" />} title="Profile Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailField label="Full Name"   value={name} />
                <DetailField label="Email"       value={email} />
                <DetailField label="Phone"       value={phone} />
                <DetailField label="Location"    value={location} />
                <DetailField label="College"     value={college} />
                <DetailField
                  label="Experience"
                  value={experience === 0 ? "Fresher (0 years)" : `${experience} year${experience > 1 ? "s" : ""}`}
                />
                <DetailField label="Applied On"  value={formatDate(appliedDate)} />
                <DetailField label="Status"      value={status} />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Section({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-700/60
                    bg-white dark:bg-gray-800/70
                    shadow-sm shadow-black/3 dark:shadow-black/10
                    overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-2.5 px-6 py-4
                      border-b border-gray-100 dark:border-gray-700/60">
        <span className="text-indigo-500 dark:text-indigo-400">{icon}</span>
        <h2 className="text-sm font-bold uppercase tracking-widest
                       text-gray-500 dark:text-gray-400">
          {title}
        </h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function ContactRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex-shrink-0 w-4 h-4 text-indigo-400 dark:text-indigo-500">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider
                      text-gray-400 dark:text-gray-500 mb-0.5">
          {label}
        </p>
        <p className="text-sm text-gray-800 dark:text-gray-200 truncate font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon }) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-2xl
                    bg-white dark:bg-gray-800/70
                    border border-gray-200/80 dark:border-gray-700/60
                    shadow-sm">
      <div className="flex items-center gap-1.5">
        {icon}
        <p className="text-[10px] font-bold uppercase tracking-widest
                      text-gray-400 dark:text-gray-500">
          {label}
        </p>
      </div>
      <p className="text-xl font-extrabold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function DetailField({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest
                    text-gray-400 dark:text-gray-500 mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 break-words">
        {value || "—"}
      </p>
    </div>
  );
}

function NotFoundState({ onBack }) {
  return (
    <div className="detail-page-enter min-h-screen bg-gray-50 dark:bg-gray-950
                    flex flex-col items-center justify-center gap-6 px-6 text-center">
      {/* Big 404 number */}
      <p className="text-[120px] font-black leading-none select-none
                    text-gray-200 dark:text-gray-800">
        404
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Candidate not found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm text-sm">
          The candidate you're looking for doesn't exist or may have been removed.
        </p>
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl
                   bg-indigo-600 hover:bg-indigo-700
                   text-white text-sm font-semibold
                   shadow-lg shadow-indigo-500/25
                   transition-all duration-200 hover:scale-105"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Candidates
      </button>
    </div>
  );
}

export default CandidateDetailPage;

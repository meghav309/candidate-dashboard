// src/components/CandidateCard.jsx
// Beautiful candidate card with DiceBear avatar, status badge, skills, hover effects,
// and a smooth CSS entrance animation. Clicking anywhere navigates to /candidate/:id.

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineArrowRight,
} from "react-icons/hi";

// ---------------------------------------------------------------------------
// Status config — colour tokens per status value
// ---------------------------------------------------------------------------
const STATUS_CONFIG = {
  Applied: {
    badge:  "bg-blue-100 text-blue-700 ring-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:ring-blue-800",
    dot:    "bg-blue-500",
    glow:   "group-hover:shadow-blue-500/10",
  },
  Interviewing: {
    badge:  "bg-amber-100 text-amber-700 ring-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-800",
    dot:    "bg-amber-500",
    glow:   "group-hover:shadow-amber-500/10",
  },
  Selected: {
    badge:  "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-800",
    dot:    "bg-emerald-500",
    glow:   "group-hover:shadow-emerald-500/10",
  },
  Rejected: {
    badge:  "bg-red-100 text-red-700 ring-red-200 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-800",
    dot:    "bg-red-500",
    glow:   "group-hover:shadow-red-500/10",
  },
};

// Skill pill colour cycle so each tag looks distinct
const SKILL_COLOURS = [
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  "bg-sky-100    text-sky-700    dark:bg-sky-900/40    dark:text-sky-300",
  "bg-teal-100   text-teal-700   dark:bg-teal-900/40   dark:text-teal-300",
  "bg-pink-100   text-pink-700   dark:bg-pink-900/40   dark:text-pink-300",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a DiceBear initials avatar URL from the candidate's name. */
function avatarUrl(name) {
  const seed = encodeURIComponent(name.trim());
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundType=gradientLinear&fontFamily=Arial&fontSize=38`;
}

/** Format ISO date string to "12 May 2024" */
function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// CandidateCard
// ---------------------------------------------------------------------------
function CandidateCard({ candidate, index = 0 }) {
  const { id, name, email, college, skills = [], status, appliedDate } = candidate;
  const navigate = useNavigate();

  const cfg         = STATUS_CONFIG[status] ?? STATUS_CONFIG.Applied;
  const visibleSkills = skills.slice(0, 3);

  /** Navigate on card click — keyboard-accessible too */
  const handleClick = () => navigate(`/candidate/${id}`);
  const handleKey   = (e) => { if (e.key === "Enter" || e.key === " ") handleClick(); };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKey}
      aria-label={`View profile of ${name}`}
      className={`
        candidate-card          /* entrance animation class from index.css */
        group relative flex flex-col cursor-pointer
        rounded-2xl border border-gray-200/80 dark:border-gray-700/60
        bg-white dark:bg-gray-800/70
        shadow-md hover:shadow-2xl ${cfg.glow}
        transition-all duration-300 ease-out
        hover:-translate-y-1.5 hover:border-indigo-300 dark:hover:border-indigo-700
        overflow-hidden outline-none
        focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-gray-900
      `}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* ── Subtle top gradient bar (reflects status colour) ───────── */}
      <div
        className={`h-0.5 w-full transition-all duration-300
                    group-hover:h-1
                    ${status === "Applied"      ? "bg-gradient-to-r from-blue-400 to-blue-600"    :
                      status === "Interviewing" ? "bg-gradient-to-r from-amber-400 to-amber-600"  :
                      status === "Selected"     ? "bg-gradient-to-r from-emerald-400 to-emerald-600" :
                                                  "bg-gradient-to-r from-red-400 to-red-600"}`}
      />

      <div className="flex flex-col flex-1 p-5">

        {/* ── Header: avatar + name + email + status badge ───────── */}
        <div className="flex items-start gap-3.5 mb-4">
          {/* DiceBear avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={avatarUrl(name)}
              alt={`${name} avatar`}
              width={52}
              height={52}
              className="w-13 h-13 rounded-xl ring-2 ring-white dark:ring-gray-700
                         shadow-md object-cover transition-transform duration-300
                         group-hover:scale-105"
              style={{ width: 52, height: 52 }}
              loading="lazy"
            />
            {/* Online-style status dot */}
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full
                           ring-2 ring-white dark:ring-gray-800 ${cfg.dot}`}
              aria-hidden="true"
            />
          </div>

          {/* Name / email */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold text-gray-900 dark:text-white
                           truncate leading-snug
                           group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                           transition-colors duration-200">
              {name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <HiOutlineMail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {email}
              </p>
            </div>
          </div>

          {/* Status badge */}
          <span
            className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1
                         text-xs font-semibold rounded-full ring-1 ${cfg.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${cfg.dot}`} />
            {status}
          </span>
        </div>

        {/* ── College ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-4
                        text-sm text-gray-600 dark:text-gray-400">
          <HiOutlineAcademicCap className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span className="truncate">{college || "—"}</span>
        </div>

        {/* ── Skill pills ────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {visibleSkills.length > 0
            ? visibleSkills.map((skill, i) => (
                <span
                  key={skill}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                               ${SKILL_COLOURS[i % SKILL_COLOURS.length]}`}
                >
                  {skill}
                </span>
              ))
            : (
                <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                  No skills listed
                </span>
              )
          }
          {skills.length > 3 && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium
                             bg-gray-100 text-gray-500
                             dark:bg-gray-700 dark:text-gray-400">
              +{skills.length - 3} more
            </span>
          )}
        </div>

        {/* ── Footer: date + arrow CTA ───────────────────────────────── */}
        <div className="mt-auto flex items-center justify-between pt-4
                        border-t border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            <span>Applied {formatDate(appliedDate)}</span>
          </div>

          <span className="flex items-center gap-1 text-xs font-semibold
                           text-indigo-600 dark:text-indigo-400
                           opacity-0 group-hover:opacity-100
                           translate-x-1 group-hover:translate-x-0
                           transition-all duration-200">
            View profile
            <HiOutlineArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default CandidateCard;

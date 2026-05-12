// src/components/candidates/CandidateCard.jsx
// Card component for a single candidate — shown in the candidates grid.

import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineAcademicCap, HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineCalendar, HiArrowRight } from "react-icons/hi";

// ---------------------------------------------------------------------------
// Status badge colours
// ---------------------------------------------------------------------------
const STATUS_STYLES = {
  Applied:      "bg-blue-100   text-blue-700   dark:bg-blue-900/40   dark:text-blue-300   ring-blue-200   dark:ring-blue-800",
  Interviewing: "bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300  ring-amber-200  dark:ring-amber-800",
  Selected:     "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 ring-emerald-200 dark:ring-emerald-800",
  Rejected:     "bg-red-100    text-red-700    dark:bg-red-900/40    dark:text-red-300    ring-red-200    dark:ring-red-800",
};

const STATUS_DOT = {
  Applied:      "bg-blue-500",
  Interviewing: "bg-amber-500",
  Selected:     "bg-emerald-500",
  Rejected:     "bg-red-500",
};

// ---------------------------------------------------------------------------
// Avatar — initials + gradient background derived from name
// ---------------------------------------------------------------------------
const AVATAR_GRADIENTS = [
  "from-violet-500 to-indigo-500",
  "from-pink-500   to-rose-500",
  "from-amber-500  to-orange-500",
  "from-teal-500   to-cyan-500",
  "from-emerald-500 to-green-500",
  "from-blue-500   to-sky-500",
];

function getGradient(name = "") {
  const idx = name.charCodeAt(0) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[idx];
}

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// ---------------------------------------------------------------------------
// CandidateCard
// ---------------------------------------------------------------------------
function CandidateCard({ candidate }) {
  const {
    id, name, email, college, location, experience,
    skills = [], status, appliedDate, bio,
  } = candidate;

  const gradient  = getGradient(name);
  const initials  = getInitials(name);
  const badgeCls  = STATUS_STYLES[status] ?? STATUS_STYLES.Applied;
  const dotCls    = STATUS_DOT[status]    ?? STATUS_DOT.Applied;

  const formattedDate = appliedDate
    ? new Date(appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  return (
    <article
      className="group relative flex flex-col rounded-2xl border border-gray-200/80
                 dark:border-gray-700/60 bg-white dark:bg-gray-800/60
                 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10
                 dark:hover:shadow-indigo-500/5
                 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />

      <div className="flex flex-col flex-1 p-5">
        {/* ── Header: avatar + name + status ───────────────────────── */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${gradient}
                         flex items-center justify-center text-white font-bold text-sm
                         shadow-md ring-2 ring-white dark:ring-gray-800`}
            aria-hidden="true"
          >
            {initials}
          </div>

          {/* Name, email, status */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate
                           group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                           transition-colors duration-200">
              {name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {email}
            </p>
          </div>

          {/* Status badge */}
          <span className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1
                            text-xs font-semibold rounded-full ring-1 ${badgeCls}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotCls}`} />
            {status}
          </span>
        </div>

        {/* ── Meta info ─────────────────────────────────────────────── */}
        <div className="space-y-2 mb-4">
          <MetaRow icon={<HiOutlineAcademicCap />} text={college} />
          <MetaRow icon={<HiOutlineLocationMarker />} text={location} />
          <div className="flex items-center justify-between">
            <MetaRow
              icon={<HiOutlineBriefcase />}
              text={experience === 0 ? "Fresher" : `${experience} yr${experience > 1 ? "s" : ""} exp`}
            />
            <MetaRow icon={<HiOutlineCalendar />} text={formattedDate} />
          </div>
        </div>

        {/* ── Bio ───────────────────────────────────────────────────── */}
        {bio && (
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed
                        line-clamp-2 mb-4">
            {bio}
          </p>
        )}

        {/* ── Skills ────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-0.5 text-xs font-medium rounded-full
                         bg-gray-100 text-gray-600
                         dark:bg-gray-700/60 dark:text-gray-300
                         border border-gray-200 dark:border-gray-600/50"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full
                             bg-indigo-50 text-indigo-600
                             dark:bg-indigo-900/30 dark:text-indigo-400
                             border border-indigo-100 dark:border-indigo-800/50">
              +{skills.length - 4}
            </span>
          )}
        </div>

        {/* ── View Profile CTA ──────────────────────────────────────── */}
        <Link
          to={`/candidate/${id}`}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 px-4
                     rounded-xl text-sm font-semibold
                     bg-gray-50 hover:bg-indigo-600
                     dark:bg-gray-700/50 dark:hover:bg-indigo-600
                     text-gray-600 hover:text-white
                     dark:text-gray-300 dark:hover:text-white
                     border border-gray-200 hover:border-indigo-600
                     dark:border-gray-600/50 dark:hover:border-indigo-600
                     transition-all duration-200 group/btn"
        >
          View Profile
          <HiArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
}

// ── Small helper ────────────────────────────────────────────────────────────
function MetaRow({ icon, text }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
      <span className="flex-shrink-0 w-3.5 h-3.5">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}

export default CandidateCard;

// src/pages/CandidatesPage.jsx
// Main candidate list page — search, filter, paginated grid of CandidateCard components.

import React, { useState, useEffect } from "react";
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineUserGroup,
  HiOutlineExclamation,
  HiOutlineEmojiSad,
} from "react-icons/hi";
import { useCandidates } from "../context/CandidateContext";
import CandidateCard from "../components/CandidateCard";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PAGE_SIZE    = 6;
const STATUS_OPTIONS = ["All", "Applied", "Interviewing", "Selected", "Rejected"];

const STATUS_COUNT_STYLE = {
  Applied:      "bg-blue-100   text-blue-700   dark:bg-blue-900/40   dark:text-blue-300",
  Interviewing: "bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300",
  Selected:     "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Rejected:     "bg-red-100    text-red-700    dark:bg-red-900/40    dark:text-red-300",
};

// ---------------------------------------------------------------------------
// CandidatesPage
// ---------------------------------------------------------------------------
function CandidatesPage() {
  const {
    candidates,
    filteredCandidates,
    loading,
    error,
    searchQuery,
    setSearch,
    statusFilter,
    setFilter,
  } = useCandidates();

  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever search / filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // ── Pagination calculations ──────────────────────────────────────────────
  const totalPages   = Math.ceil(filteredCandidates.length / PAGE_SIZE);
  const startIdx     = (currentPage - 1) * PAGE_SIZE;
  const paginated    = filteredCandidates.slice(startIdx, startIdx + PAGE_SIZE);
  const hasPrev      = currentPage > 1;
  const hasNext      = currentPage < totalPages;

  // ── Status counts for the filter pills ──────────────────────────────────
  const statusCounts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = s === "All"
      ? candidates.length
      : candidates.filter((c) => c.status === s).length;
    return acc;
  }, {});

  // ---------------------------------------------------------------------------
  // Render states
  // ---------------------------------------------------------------------------
  if (loading) return <LoadingState />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Page Header ───────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Candidates
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage and track all your applicants in one place
            </p>
          </div>

          {/* Total count badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl
                          bg-white dark:bg-gray-800 border border-gray-200
                          dark:border-gray-700 shadow-sm self-start sm:self-auto">
            <HiOutlineUserGroup className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {candidates.length} Total
            </span>
            {filteredCandidates.length !== candidates.length && (
              <span className="text-sm text-gray-400 dark:text-gray-500">
                · {filteredCandidates.length} shown
              </span>
            )}
          </div>
        </div>

        {/* ── Error banner ──────────────────────────────────────────── */}
        {error && (
          <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl
                          bg-amber-50 dark:bg-amber-900/20
                          border border-amber-200 dark:border-amber-800/40
                          text-amber-700 dark:text-amber-400 text-sm">
            <HiOutlineExclamation className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* ── Filters row ───────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2
                                         w-4 h-4 text-gray-400 dark:text-gray-500
                                         pointer-events-none" />
            <input
              id="candidate-search"
              type="text"
              placeholder="Search by name, email, college or skill…"
              value={searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                         bg-white dark:bg-gray-800
                         border border-gray-200 dark:border-gray-700
                         text-gray-900 dark:text-gray-100
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                         focus:border-indigo-400 dark:focus:border-indigo-500
                         shadow-sm transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-gray-600
                           dark:text-gray-500 dark:hover:text-gray-300
                           transition-colors text-lg leading-none"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Status dropdown */}
          <div className="relative">
            <HiOutlineFilter className="absolute left-3.5 top-1/2 -translate-y-1/2
                                         w-4 h-4 text-gray-400 dark:text-gray-500
                                         pointer-events-none" />
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl text-sm appearance-none cursor-pointer
                         bg-white dark:bg-gray-800
                         border border-gray-200 dark:border-gray-700
                         text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                         focus:border-indigo-400 dark:focus:border-indigo-500
                         shadow-sm transition-all duration-200 min-w-[160px]"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s} ({statusCounts[s]})
                </option>
              ))}
            </select>
            {/* Custom chevron */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2
                             text-gray-400 dark:text-gray-500 text-xs">
              ▾
            </span>
          </div>
        </div>

        {/* ── Status filter pills (desktop quick-access) ────────────── */}
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold
                          border transition-all duration-200
                          ${statusFilter === s
                            ? s === "All"
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25"
                              : `${STATUS_COUNT_STYLE[s]} border-transparent shadow-sm`
                            : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
            >
              {s}
              <span className={`px-1.5 py-0.5 rounded-full text-xs
                                ${statusFilter === s && s === "All" ? "bg-white/20 text-white" : "bg-black/10 dark:bg-white/10"}`}>
                {statusCounts[s]}
              </span>
            </button>
          ))}
        </div>

        {/* ── Candidates grid ───────────────────────────────────────── */}
        {filteredCandidates.length === 0 ? (
          <EmptyState searchQuery={searchQuery} statusFilter={statusFilter} onReset={() => { setSearch(""); setFilter("All"); }} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginated.map((candidate, i) => (
                <CandidateCard key={candidate.id} candidate={candidate} index={i} />
              ))}
            </div>

            {/* ── Pagination ────────────────────────────────────────── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2">
                {/* Result range info */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {startIdx + 1}–{Math.min(startIdx + PAGE_SIZE, filteredCandidates.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {filteredCandidates.length}
                  </span>
                </p>

                {/* Prev / page numbers / Next */}
                <div className="flex items-center gap-1">
                  {/* Previous */}
                  <PaginationBtn
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={!hasPrev}
                    aria-label="Previous page"
                  >
                    <HiOutlineChevronLeft className="w-4 h-4" />
                  </PaginationBtn>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      aria-label={`Page ${page}`}
                      aria-current={page === currentPage ? "page" : undefined}
                      className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all duration-200
                                  ${page === currentPage
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                  }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next */}
                  <PaginationBtn
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={!hasNext}
                    aria-label="Next page"
                  >
                    <HiOutlineChevronRight className="w-4 h-4" />
                  </PaginationBtn>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div className="w-12 h-12 rounded-full border-4 border-indigo-200 dark:border-indigo-900
                      border-t-indigo-600 dark:border-t-indigo-400 animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
        Loading candidates…
      </p>
    </div>
  );
}

function EmptyState({ searchQuery, statusFilter, onReset }) {
  const hasFilters = searchQuery || statusFilter !== "All";
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <span className="text-6xl select-none">
        <HiOutlineEmojiSad className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
      </span>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        No candidates found
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        {hasFilters
          ? "No candidates match your current search or filter. Try adjusting them."
          : "No candidates have been added yet. Click 'Add Candidate' to get started."}
      </p>
      {hasFilters && (
        <button
          onClick={onReset}
          className="mt-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700
                     text-white text-sm font-semibold transition-colors duration-200
                     shadow-md shadow-indigo-500/25"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

function PaginationBtn({ children, onClick, disabled, ...rest }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className={`w-8 h-8 rounded-lg flex items-center justify-center
                  transition-all duration-200 text-sm
                  ${disabled
                    ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
    >
      {children}
    </button>
  );
}

export default CandidatesPage;

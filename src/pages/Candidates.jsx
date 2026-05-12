// src/pages/Candidates.jsx
// Main candidate list page — shows all candidates with search, filter, and pagination.
// TODO: Replace this stub with the full implementation.

import React from "react";
import { useCandidates } from "../context/CandidateContext";

function CandidatesPage() {
  const { filteredCandidates, loading, error } = useCandidates();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-indigo-500 text-lg font-medium">
        Loading candidates…
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Candidates
      </h1>

      {error && (
        <p className="mb-4 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-lg">
          ⚠️ {error}
        </p>
      )}

      <p className="text-gray-500 dark:text-gray-400 mb-6">
        {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? "s" : ""} found
      </p>

      <ul className="space-y-3">
        {filteredCandidates.map((c) => (
          <li
            key={c.id}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700
                       bg-white dark:bg-gray-800 shadow-sm"
          >
            <p className="font-semibold text-gray-900 dark:text-white">{c.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.email} · {c.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CandidatesPage;

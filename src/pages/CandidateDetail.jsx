// src/pages/CandidateDetail.jsx
// Individual candidate profile page — accessed via /candidate/:id
// TODO: Replace this stub with the full implementation.

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCandidates } from "../context/CandidateContext";

function CandidateDetailPage() {
  const { id } = useParams();
  const { candidates } = useCandidates();

  const candidate = candidates.find((c) => String(c.id) === String(id));

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Candidate not found.</p>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">
          ← Back to Candidates
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Link to="/" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-6 inline-block">
        ← Back to Candidates
      </Link>

      <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-800 shadow-md space-y-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{candidate.name}</h1>
        <p className="text-gray-500 dark:text-gray-400">{candidate.email} · {candidate.phone}</p>
        <p className="text-gray-600 dark:text-gray-300">{candidate.college} · {candidate.location}</p>
        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
          Status: {candidate.status}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{candidate.bio}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {candidate.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-xs font-medium rounded-full
                         bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CandidateDetailPage;

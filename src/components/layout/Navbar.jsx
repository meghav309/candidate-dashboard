// src/components/layout/Navbar.jsx
// Top navigation bar — shared across all routes.
// Shows the app title, dark mode toggle, and a link to Add Candidate.
// TODO: Replace this stub with the full Navbar implementation.

import React from "react";
import { Link } from "react-router-dom";
import { useCandidates } from "../../context/CandidateContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useCandidates();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between px-6
                    bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700
                    shadow-sm transition-colors duration-300">
      {/* Brand */}
      <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
        TalentDesk
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          to="/add"
          className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700
                     text-white text-sm font-medium transition-colors duration-200"
        >
          + Add Candidate
        </Link>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="p-2 rounded-lg text-gray-500 hover:text-gray-900
                     dark:text-gray-400 dark:hover:text-white
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

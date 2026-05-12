// src/components/Navbar.jsx
// Sleek, fully responsive Navbar for TalentBoard.
// Features: active route highlight, dark mode toggle, mobile hamburger menu.

import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineMenuAlt3,
  HiX,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import { useCandidates } from "../context/CandidateContext";

// ---------------------------------------------------------------------------
// Nav links config — single source of truth for all routes
// ---------------------------------------------------------------------------
const NAV_LINKS = [
  { label: "Candidates", to: "/" },
  { label: "Add Candidate", to: "/add", cta: true },
];

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
function Navbar() {
  const { darkMode, toggleDarkMode } = useCandidates();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Add shadow + blur backdrop when user scrolls down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/30"
          : "bg-white dark:bg-gray-900"
        }
        border-b border-gray-200/70 dark:border-gray-700/60`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Brand ──────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            {/* Animated gradient icon */}
            <span className="flex items-center justify-center w-8 h-8 rounded-lg
                             bg-gradient-to-br from-violet-600 to-indigo-500
                             shadow-md shadow-indigo-500/30
                             group-hover:shadow-indigo-500/50 group-hover:scale-105
                             transition-all duration-200">
              <HiOutlineLightningBolt className="text-white w-4 h-4" />
            </span>
            <span className="text-xl font-extrabold tracking-tight
                             bg-gradient-to-r from-violet-600 to-indigo-500
                             dark:from-violet-400 dark:to-indigo-300
                             bg-clip-text text-transparent
                             select-none">
              TalentBoard
            </span>
          </Link>

          {/* ── Desktop nav ────────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, to, cta }) =>
              cta ? (
                // "Add Candidate" CTA button
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `ml-3 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                     ${isActive
                       ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-105"
                       : "bg-gradient-to-r from-violet-600 to-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105"
                     }`
                  }
                >
                  + {label}
                </NavLink>
              ) : (
                // Regular nav link with active underline indicator
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                     ${isActive
                       ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50"
                       : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60"
                     }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {/* Animated active underline dot */}
                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2
                                         w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                      )}
                    </>
                  )}
                </NavLink>
              )
            )}
          </nav>

          {/* ── Right controls ─────────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="relative flex items-center justify-center w-9 h-9 rounded-xl
                         text-gray-500 dark:text-gray-400
                         hover:text-gray-900 dark:hover:text-white
                         hover:bg-gray-100 dark:hover:bg-gray-800
                         transition-all duration-200 group"
            >
              {/* Icon swap with subtle rotate animation */}
              <span className="absolute transition-all duration-300
                               group-hover:scale-110
                               rotate-0 opacity-100
                               dark:rotate-180 dark:opacity-0">
                <HiOutlineMoon className="w-5 h-5" />
              </span>
              <span className="absolute transition-all duration-300
                               group-hover:scale-110
                               -rotate-180 opacity-0
                               dark:rotate-0 dark:opacity-100">
                <HiOutlineSun className="w-5 h-5 text-amber-400" />
              </span>
            </button>

            {/* Mobile hamburger — visible only on small screens */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl
                         text-gray-500 dark:text-gray-400
                         hover:text-gray-900 dark:hover:text-white
                         hover:bg-gray-100 dark:hover:bg-gray-800
                         transition-all duration-200"
            >
              {mobileOpen
                ? <HiX className="w-5 h-5" />
                : <HiOutlineMenuAlt3 className="w-5 h-5" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="px-4 pb-4 pt-2 space-y-1
                        border-t border-gray-200/70 dark:border-gray-700/60
                        bg-white dark:bg-gray-900">
          {NAV_LINKS.map(({ label, to, cta }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium
                 transition-all duration-200
                 ${cta
                   ? `bg-gradient-to-r from-violet-600 to-indigo-500 text-white
                      hover:shadow-md hover:shadow-indigo-500/30`
                   : isActive
                     ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold"
                     : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                 }`
              }
            >
              {cta ? `+ ${label}` : label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

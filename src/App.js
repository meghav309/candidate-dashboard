// src/App.js
// Root application component.
// Wires together routing, the CandidateProvider, and the shared Navbar.

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CandidateProvider, useCandidates } from "./context/CandidateContext";

import Navbar              from "./components/Navbar";
import CandidatesPage      from "./pages/CandidatesPage";
import CandidateDetailPage from "./pages/CandidateDetailPage";
import AddCandidatePage    from "./pages/AddCandidatePage";
import NotFound            from "./pages/NotFound";

// ---------------------------------------------------------------------------
// AppShell — reads darkMode from context AFTER the provider is mounted.
// We cannot call useCandidates() in the same component that renders
// <CandidateProvider>, so this inner wrapper solves that cleanly.
// ---------------------------------------------------------------------------

function AppShell() {
  const { darkMode } = useCandidates();

  return (
    // The `dark` class on this div activates Tailwind's dark: variants globally.
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Navbar is present on every route */}
        <Navbar />

        {/* Page content sits below the fixed navbar (h-16 = 64px) */}
        <main className="pt-16">
          <Routes>
            {/* Candidate list — home / default page */}
            <Route path="/"              element={<CandidatesPage />} />

            {/* Individual candidate profile */}
            <Route path="/candidate/:id" element={<CandidateDetailPage />} />

            {/* Add a new candidate */}
            <Route path="/add"           element={<AddCandidatePage />} />

            {/* 404 catch-all */}
            <Route path="*"              element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App — mounts the provider, then renders the shell inside it
// ---------------------------------------------------------------------------

function App() {
  return (
    <BrowserRouter>
      <CandidateProvider>
        <AppShell />
      </CandidateProvider>
    </BrowserRouter>
  );
}

export default App;

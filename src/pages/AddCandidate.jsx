// src/pages/AddCandidate.jsx
// Page for manually adding a new candidate to the dashboard.
// TODO: Replace this stub with the full form implementation.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCandidates } from "../context/CandidateContext";

function AddCandidatePage() {
  const { addCandidate } = useCandidates();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", status: "Applied" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    addCandidate({
      id: Date.now(),
      name: form.name,
      email: form.email,
      status: form.status,
      college: "—",
      phone: "—",
      location: "—",
      experience: 0,
      skills: [],
      appliedDate: new Date().toISOString().split("T")[0],
      bio: "",
    });

    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Add Candidate
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Aarav Mehta"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="e.g. aarav@example.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {["Applied", "Interviewing", "Selected", "Rejected"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700
                       text-white font-medium transition-colors duration-200"
          >
            Add Candidate
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800
                       font-medium transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCandidatePage;

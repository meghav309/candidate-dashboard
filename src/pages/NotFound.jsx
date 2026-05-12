// src/pages/NotFound.jsx
// 404 fallback page shown for any unmatched route.

import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
      <p className="text-8xl font-black text-indigo-200 dark:text-indigo-900 select-none">
        404
      </p>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Page not found
      </h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700
                   text-white font-medium transition-colors duration-200"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;

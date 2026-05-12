// src/components/Spinner.jsx
// Reusable centered loading spinner — no external libraries, pure Tailwind.
// Usage: <Spinner /> or <Spinner size="sm" label="Fetching data…" />

import React from "react";

const SIZE_MAP = {
  sm:  { ring: "w-8 h-8  border-[3px]", text: "text-xs" },
  md:  { ring: "w-12 h-12 border-4",    text: "text-sm" },
  lg:  { ring: "w-16 h-16 border-[5px]", text: "text-base" },
};

function Spinner({ size = "md", label = "Loading…", fullPage = true }) {
  const { ring, text } = SIZE_MAP[size] ?? SIZE_MAP.md;

  const content = (
    <div className="flex flex-col items-center justify-center gap-4" role="status" aria-label={label}>

      {/* Outer decorative ring (static, faded) */}
      <div className="relative flex items-center justify-center">
        <span
          className={`${ring} rounded-full border-indigo-100 dark:border-indigo-950`}
          aria-hidden="true"
        />

        {/* Spinning gradient arc */}
        <span
          className={`absolute ${ring} rounded-full animate-spin
                      border-transparent border-t-indigo-600 dark:border-t-indigo-400`}
          aria-hidden="true"
        />

        {/* Inner pulsing dot */}
        <span
          className="absolute w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400
                     animate-pulse"
          aria-hidden="true"
        />
      </div>

      {/* Label */}
      <p className={`${text} font-medium text-gray-500 dark:text-gray-400 animate-pulse`}>
        {label}
      </p>
    </div>
  );

  if (!fullPage) return content;

  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full
                    bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {content}
    </div>
  );
}

export default Spinner;

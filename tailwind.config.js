/** @type {import('tailwindcss').Config} */
module.exports = {
  // Activate dark mode via the `dark` class on <html> or a root div
  darkMode: "class",

  // Tell Tailwind which files to scan for class names
  content: [
    "./src/**/*.{js,jsx}",
    "./public/index.html",
  ],

  theme: {
    extend: {
      // ── Brand colour palette ──────────────────────────────────────────────
      colors: {
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",   // primary indigo
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
      },

      // ── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },

      // ── Border radius ────────────────────────────────────────────────────
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // ── Box shadows ──────────────────────────────────────────────────────
      boxShadow: {
        "card":       "0 2px 8px -2px rgba(0,0,0,0.08), 0 4px 16px -4px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 24px -4px rgba(99,102,241,0.15), 0 4px 12px -4px rgba(0,0,0,0.10)",
        "navbar":     "0 1px 0 0 rgba(0,0,0,0.06)",
        "toast":      "0 8px 32px -4px rgba(0,0,0,0.20)",
      },

      // ── Keyframes registered in Tailwind (usable via animate-* classes) ──
      keyframes: {
        // Fade + slide up — cards
        cardEnter: {
          from: { opacity: "0", transform: "translateY(18px) scale(0.98)" },
          to:   { opacity: "1", transform: "translateY(0)    scale(1)"    },
        },
        // Fade + slide up — pages
        pageEnter: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)"    },
        },
        // Toast slide in
        toastIn: {
          from: { opacity: "0", transform: "translateY(-12px) scale(0.95)" },
          to:   { opacity: "1", transform: "translateY(0)     scale(1)"   },
        },
        // Spinner inner dot pulse variant (for custom spinners)
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        // Float for decorative elements
        float: {
          "0%, 100%": { transform: "translateY(0)"   },
          "50%":      { transform: "translateY(-6px)" },
        },
        // Shimmer for skeleton loaders
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition:  "400px 0" },
        },
      },

      // ── Named animations (expose via animate-* in JSX) ───────────────────
      animation: {
        "card-enter":  "cardEnter 0.4s  cubic-bezier(0.22,1,0.36,1) both",
        "page-enter":  "pageEnter 0.45s cubic-bezier(0.22,1,0.36,1) both",
        "toast-in":    "toastIn   0.35s cubic-bezier(0.22,1,0.36,1) both",
        "float":       "float 3s ease-in-out infinite",
        "shimmer":     "shimmer 1.4s ease-in-out infinite",
      },

      // ── Transition duration ───────────────────────────────────────────────
      transitionDuration: {
        350: "350ms",
      },

      // ── Background sizes ─────────────────────────────────────────────────
      backgroundSize: {
        "dot-grid": "28px 28px",
      },
    },
  },

  plugins: [],
};
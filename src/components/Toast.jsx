// src/components/Toast.jsx
// Floating toast notification — auto-dismisses after 3 s.
// Props:
//   message (string)  — text to display
//   type    (string)  — "success" | "error" | "info" | "warning"
//   onClose (fn)      — called when dismissed (manually or automatically)
//
// Usage example (in a parent):
//
//   const [toast, setToast] = useState(null);
//
//   // show:
//   setToast({ message: "Candidate added!", type: "success" });
//
//   // in JSX:
//   {toast && (
//     <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
//   )}

import React, { useEffect, useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineInformationCircle,
  HiOutlineExclamation,
  HiX,
} from "react-icons/hi";

// ---------------------------------------------------------------------------
// Type config
// ---------------------------------------------------------------------------
const TYPE_CONFIG = {
  success: {
    container: "bg-emerald-600 shadow-emerald-600/30",
    icon:      <HiOutlineCheckCircle className="w-5 h-5 flex-shrink-0" />,
    progress:  "bg-emerald-400",
    label:     "Success",
  },
  error: {
    container: "bg-red-600 shadow-red-600/30",
    icon:      <HiOutlineXCircle className="w-5 h-5 flex-shrink-0" />,
    progress:  "bg-red-400",
    label:     "Error",
  },
  warning: {
    container: "bg-amber-500 shadow-amber-500/30",
    icon:      <HiOutlineExclamation className="w-5 h-5 flex-shrink-0" />,
    progress:  "bg-amber-300",
    label:     "Warning",
  },
  info: {
    container: "bg-indigo-600 shadow-indigo-600/30",
    icon:      <HiOutlineInformationCircle className="w-5 h-5 flex-shrink-0" />,
    progress:  "bg-indigo-400",
    label:     "Info",
  },
};

const DISMISS_MS = 3000;

// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------
function Toast({ message, type = "success", onClose }) {
  const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.info;

  // Visibility state drives the exit animation class
  const [visible, setVisible] = useState(false);

  // Mount → trigger enter animation
  useEffect(() => {
    const enterFrame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(enterFrame);
  }, []);

  // Auto-dismiss after DISMISS_MS
  useEffect(() => {
    const timer = setTimeout(handleClose, DISMISS_MS);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClose() {
    setVisible(false);
    // Wait for exit animation to finish before unmounting
    setTimeout(onClose, 350);
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-label={`${cfg.label}: ${message}`}
      className={`
        fixed top-5 right-5 z-[9999]
        flex items-start gap-3
        min-w-[280px] max-w-sm
        px-4 py-3.5 rounded-2xl
        text-white
        shadow-2xl ${cfg.container}
        transition-all duration-350 ease-out
        ${visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
        }
      `}
    >
      {/* Icon */}
      {cfg.icon}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold leading-tight">{cfg.label}</p>
        <p className="text-xs text-white/80 mt-0.5 leading-snug">{message}</p>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        aria-label="Dismiss notification"
        className="flex-shrink-0 p-0.5 rounded-lg opacity-70 hover:opacity-100
                   hover:bg-white/20 transition-all duration-150"
      >
        <HiX className="w-4 h-4" />
      </button>

      {/* Auto-dismiss progress bar */}
      <span
        className={`absolute bottom-0 left-0 h-0.5 rounded-b-2xl ${cfg.progress}
                    toast-progress`}
        style={{ animationDuration: `${DISMISS_MS}ms` }}
        aria-hidden="true"
      />
    </div>
  );
}

export default Toast;

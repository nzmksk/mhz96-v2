"use client";

import React, { useEffect } from "react";

interface SnackbarProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

function Snackbar({ message, type, onClose, duration = 5000 }: SnackbarProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
      <div
        className={`px-6 py-4 rounded-lg shadow-lg ${
          type === "error"
            ? "bg-red-500 text-white"
            : "bg-green-500 text-white"
        } min-w-[300px] max-w-md`}
        role="alert"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-200 font-bold"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default Snackbar;

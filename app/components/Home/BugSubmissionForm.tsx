"use client";

import React from "react";

interface BugSubmissionFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

function BugSubmissionForm({
  onSubmit,
  onCancel,
  isLoading,
}: BugSubmissionFormProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Report a Bug</h2>

      <form onSubmit={onSubmit}>
        {/* Bug type */}
        <div className="mb-4">
          <label htmlFor="bug-type">
            Bug Type<span className="text-red-700">*</span>
          </label>
          <select
            className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
            id="bug-type"
            name="Bug Type"
            required
          >
            <option value="" disabled selected hidden>
              Select a bug type
            </option>
            <option value="uiux">UI/UX</option>
            <option value="logic">Functional/Logic errors</option>
            <option value="security">Security issues</option>
            <option value="performance">Performance defects</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title">
            Title<span className="text-red-700">*</span>
          </label>
          <input
            className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
            id="title"
            name="Title"
            placeholder="Short description about the bug."
            required
          />
        </div>

        {/* Device type */}
        <div className="mb-4">
          <label htmlFor="device">Device Type</label>
          <select
            className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
            id="device"
            name="Device Type"
          >
            <option value="" disabled selected hidden>
              Select your device type
            </option>
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>

        {/* Operating system */}
        <div className="mb-4">
          <label htmlFor="operating-system">Operating System</label>
          <select
            className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
            id="operating-system"
            name="Operating System"
          >
            <option value="" disabled selected hidden>
              Select your operating system
            </option>
            <option value="windows">Windows</option>
            <option value="macos">MacOS</option>
            <option value="linux">Linux</option>
            <option value="android">Android</option>
            <option value="ios">iOS</option>
            <option value="other-os">Others</option>
          </select>
        </div>

        {/* Browser */}
        <div className="mb-4">
          <label htmlFor="browser">Browser</label>
          <input
            className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
            id="browser"
            name="Browser"
            placeholder="Please include the version, e.g. chrome-v140.0.0"
          />
        </div>

        {/* Details */}
        <div className="mb-4">
          <label htmlFor="bug-details">
            Bug Details<span className="text-red-700">*</span>
          </label>
          <textarea
            className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
            id="bug-details"
            name="Bug Details"
            placeholder="Please provide the details or steps to reproduce the bug."
            rows={5}
            required
          ></textarea>
        </div>

        {/* Nickname */}
        <div className="mb-4">
          <label htmlFor="nickname">Your Name/Nickname</label>
          <input
            className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
            id="nickname"
            name="Nickname"
            placeholder="Leave blank if you want to stay anonymous."
          />
        </div>

        {/* Honeypot field - hidden from users, visible to bots */}
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="name"
            name="Name"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-between text-slate-100">
          <button
            className="bg-blue-500 hover:bg-blue-700 py-3 mr-4 w-1/2 rounded-lg hover:shadow-lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Bug Report"}
          </button>

          <button
            className="bg-slate-700 hover:bg-slate-900 py-3 w-1/2 rounded-lg hover:shadow-lg"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BugSubmissionForm;

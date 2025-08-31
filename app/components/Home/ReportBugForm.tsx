"use client";

import React, { useRef, useState } from "react";

interface ReportBugFormProps {
  onClose: () => void;
}

type BugReportData = {
  bugType: string;
  title: string;
  deviceType?: string;
  os?: string;
  browser?: string;
  details: string;
  nickname?: string;
};

function ReportBugForm({ onClose }: ReportBugFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const modalRef = useRef<HTMLElement | null>(null);

  const closeReportBugForm = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData(e.currentTarget);
    const data: BugReportData = {
      bugType: (form.get("Bug Type") as string) ?? "",
      title: (form.get("Title") as string) ?? "",
      deviceType: (form.get("Device Type") as string) ?? "",
      os: (form.get("Operating System") as string) ?? "",
      browser: (form.get("Browser") as string) ?? "",
      details: (form.get("Bug Details") as string) ?? "",
      nickname: (form.get("Nickname") as string) ?? "Anonymous",
    };

    try {
      await createGithubIssue(data);
      setMessage(
        "Bug report submitted successfully. Thank you for your contribution!"
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("GitHub API error:", error.message);
        setMessage(`Failed to submit bug report: ${error.message}`);
      } else {
        console.error("Unknown error:", error);
        setMessage("Failed to submit bug report due to an unknown error.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center"
      onClick={closeReportBugForm}
      ref={modalRef}
    >
      <div className="bg-white shadow-lg rounded-lg flex flex-col max-w-lg p-8 w-full">
        <h2 className="text-lg font-bold mb-4">Report a Bug</h2>

        <form onSubmit={handleSubmit}>
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
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
    </section>
  );
}

async function createGithubIssue(data: BugReportData): Promise<void> {
  const labels = [data.bugType, data.deviceType, data.os, "bug"].filter(
    Boolean
  );
  const response = await fetch("/api/create-issue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      title: data.title,
      body: `**Details:**
${data.details}

**Device Type:** ${data.deviceType ?? "Not specified"}
**Operating System:** ${data.os ?? "Not specified"}
**Browser:** ${data.browser ?? "Not specified"}

**Submitted by:** ${data.nickname ?? "Anonymous"}`,
      labels: labels,
    }),
  });

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage += `: ${errorData.message}`;
      }
      if (errorData.errors) {
        errorMessage += ` | Details: ${JSON.stringify(errorData.errors)}`;
      }
    } catch {
      // fallback if it's not JSON
      errorMessage += `: ${await response.text()}`;
    }
    throw new Error(errorMessage);
  }
}

export default ReportBugForm;

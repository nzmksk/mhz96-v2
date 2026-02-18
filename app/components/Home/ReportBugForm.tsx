"use client";

import React, { useEffect, useRef, useState } from "react";
import IssueList from "@/app/components/Home/IssueList";
import BugSubmissionForm from "@/app/components/Home/BugSubmissionForm";

interface ReportBugFormProps {
  onClose: () => void;
  showSnackbar: (message: string, type: "success" | "error") => void;
}

type BugReportData = {
  bugType: string;
  title: string;
  deviceType?: string;
  os?: string;
  browser?: string;
  details: string;
  nickname?: string;
  honeypot?: string;
};

interface GitHubLabel {
  name: string;
  color: string;
}

interface GitHubIssue {
  number: number;
  title: string;
  state: string;
  html_url: string;
  created_at: string;
  labels: GitHubLabel[];
  comments: number;
}

function ReportBugForm({ onClose, showSnackbar }: ReportBugFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [isLoadingIssues, setIsLoadingIssues] = useState<boolean>(true);
  const [issuesError, setIssuesError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Trigger fade-in animation after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for fade-out animation to complete before calling onClose
    setTimeout(() => onClose(), 300);
  };

  const closeReportBugForm = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      handleClose();
    }
  };

  async function fetchIssues() {
    setIsLoadingIssues(true);
    setIssuesError(null);

    try {
      const response = await fetch("/api/get-issues");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch issues");
      }

      setIssues(data.issues || []);
    } catch (err: any) {
      console.error("Error fetching issues:", err);
      setIssuesError(err.message || "Failed to load issues");
    } finally {
      setIsLoadingIssues(false);
    }
  }

  useEffect(() => {
    fetchIssues();
  }, []);

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
      honeypot: (form.get("Name") as string) ?? "",
    };

    try {
      await createGithubIssue(data);
      showSnackbar(
        "Bug report submitted successfully. Thank you for your contribution!",
        "success"
      );

      // Refresh the issues list to show the new issue
      await fetchIssues();

      // Close the form after successful submission
      handleClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error("GitHub API error:", error.message);
        showSnackbar(`Failed to submit bug report: ${error.message}`, "error");
      } else {
        console.error("Unknown error:", error);
        showSnackbar("Failed to submit bug report due to an unknown error.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className={`fixed inset-0 backdrop-blur-sm flex justify-center items-center p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={closeReportBugForm}
      ref={modalRef}
    >
      <div className={`bg-white shadow-lg rounded-lg flex flex-col max-w-5xl max-h-[90vh] w-full overflow-hidden transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}>
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Issue List - Left on desktop, Top on mobile */}
          <div className={`w-full md:w-2/5 border-b md:border-b-0 md:border-r border-slate-200 flex justify-center max-h-[30vh] md:max-h-none overflow-y-auto md:overflow-visible ${isLoadingIssues || issues.length > 0 ? "items-start" : "items-center"}`}>
            <IssueList
              issues={issues}
              isLoading={isLoadingIssues}
              error={issuesError}
              onRefresh={fetchIssues}
            />
          </div>

          {/* Bug Submission Form - Right on desktop, Bottom on mobile */}
          <div className="w-full md:w-3/5 flex-1 overflow-y-auto">
            <BugSubmissionForm
              onSubmit={handleSubmit}
              onCancel={handleClose}
              isLoading={isLoading}
            />
          </div>
        </div>
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
      body: `## Description
${data.details}

## System Info
| System Info | Value |
| --- | --- |
| Device type | ${data.deviceType ?? "Unspecified"} |
| Operating system | ${data.os ?? "Unspecified"} |
| Browser | ${data.browser ?? "Unspecified"} |

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

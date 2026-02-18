"use client";

import React from "react";
import {
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

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

interface IssueListProps {
  issues: GitHubIssue[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}

function IssueList({ issues, isLoading, error, onRefresh }: IssueListProps) {
  if (isLoading) {
    return <IssueListSkeleton />;
  }

  if (error) {
    return <IssueListError error={error} onRetry={onRefresh} />;
  }

  if (issues.length === 0) {
    return <IssueListEmpty />;
  }

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Open Issues ({issues.length})</h3>
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          title="Refresh issues"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {issues.map((issue) => (
          <IssueCard key={issue.number} issue={issue} />
        ))}
      </div>
    </div>
  );
}

function IssueCard({ issue }: { issue: GitHubIssue }) {
  const relativeTime = getRelativeTime(issue.created_at);

  return (
    <a
      href={issue.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-sm text-slate-500 font-mono whitespace-nowrap">
            #{issue.number}
          </span>
          <h4 className="text-sm font-medium line-clamp-2 flex-1">
            {issue.title}
          </h4>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
      </div>

      {issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {issue.labels.slice(0, 3).map((label) => (
            <span
              key={label.name}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                // If the label color is very light (like 'ededed'), use a darker background for better contrast
                backgroundColor: label.color == 'ededed' ? `#334155` : `#${label.color}20`,
                color: `#${label.color}`,
                border: `1px solid #${label.color}40`,
              }}
            >
              {label.name}
            </span>
          ))}
          {issue.labels.length > 3 && (
            <span className="text-xs text-slate-400">
              +{issue.labels.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span>{relativeTime}</span>
        {issue.comments > 0 && (
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            <span>{issue.comments}</span>
          </div>
        )}
      </div>
    </a>
  );
}

function IssueListSkeleton() {
  return (
    <div className="p-4 w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse"></div>
        <div className="h-8 w-8 bg-slate-200 rounded-lg animate-pulse"></div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-3 border border-slate-200 rounded-lg">
            <div className="flex items-start gap-2 mb-2">
              <div className="h-4 w-12 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 flex-1 bg-slate-200 rounded animate-pulse"></div>
            </div>
            <div className="flex gap-1 mb-2">
              <div className="h-5 w-16 bg-slate-200 rounded-full animate-pulse"></div>
              <div className="h-5 w-20 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
            <div className="h-3 w-24 bg-slate-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IssueListEmpty() {
  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[300px] text-center">
      <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
      <h3 className="text-lg font-semibold mb-1">No Open Issues</h3>
      <p className="text-sm text-slate-500">
        Great! There are currently no open bug reports.
      </p>
    </div>
  );
}

function IssueListError({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-full text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
      <h3 className="text-lg font-semibold mb-1">Failed to Load Issues</h3>
      <p className="text-sm text-slate-500 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
}

export default IssueList;

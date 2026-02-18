"use client";

import React, { useEffect, useState } from "react";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { GitHubRepo } from "@/app/api/get-repos/route";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
};

const ITEMS_PER_PAGE = 6;

function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch("/api/get-repos");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch repositories");
        }

        setRepos(data.repos || []);
      } catch (err: any) {
        console.error("Error fetching repos:", err);
        setError(err.message || "Failed to load repositories");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const totalPages = Math.ceil(repos.length / ITEMS_PER_PAGE);
  const paginatedRepos = repos.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>

      {isLoading && <ProjectsSkeleton />}

      {error && <ProjectsError error={error} />}

      {!isLoading && !error && repos.length === 0 && (
        <p className="text-slate-300 text-center">No projects found.</p>
      )}

      {!isLoading && !error && repos.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRepos.map((repo) => (
              <ProjectCard key={repo.name} repo={repo} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 0}
                className="p-2 rounded-lg text-white hover:bg-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      i === currentPage
                        ? "bg-blue-500 text-white"
                        : "text-slate-300 hover:bg-slate-500"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-lg text-white hover:bg-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ProjectCard({ repo }: { repo: GitHubRepo }) {
  const relativeTime = getRelativeTime(repo.updated_at);
  const langColor = repo.language
    ? LANGUAGE_COLORS[repo.language] || "#8b949e"
    : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 bg-slate-700/50 border border-slate-600 rounded-xl hover:bg-slate-700 hover:border-slate-500 transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
          {repo.name}
        </h3>
        <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <p className="text-sm text-slate-300 mb-4 line-clamp-2 min-h-[2.5rem]">
        {repo.description || "No description provided."}
      </p>

      <div className="flex items-center gap-4 text-xs text-slate-400">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: langColor || "#8b949e" }}
            />
            <span>{repo.language}</span>
          </div>
        )}
        <span>Updated {relativeTime}</span>
      </div>
    </a>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="p-5 bg-slate-700/50 border border-slate-600 rounded-xl"
        >
          <div className="h-6 w-3/4 bg-slate-600 rounded animate-pulse mb-3" />
          <div className="h-4 w-full bg-slate-600 rounded animate-pulse mb-2" />
          <div className="h-4 w-2/3 bg-slate-600 rounded animate-pulse mb-4" />
          <div className="flex gap-4">
            <div className="h-3 w-20 bg-slate-600 rounded animate-pulse" />
            <div className="h-3 w-24 bg-slate-600 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsError({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mb-3" />
      <h3 className="text-lg font-semibold text-white mb-1">
        Failed to Load Projects
      </h3>
      <p className="text-sm text-slate-400">{error}</p>
    </div>
  );
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30)
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12)
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
}

export default Projects;

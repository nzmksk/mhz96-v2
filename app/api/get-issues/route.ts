import { NextResponse } from "next/server";
import { octokit, username, repository, CACHE_DURATION } from "@/lib/constants";
import { GitHubIssue } from "@/lib/interfaces";

// Cache configuration
let cachedData: {
  issues: GitHubIssue[];
  stats: { reported: number; resolved: number };
} | null = null;
let cacheTimestamp: number | null = null;

export async function GET() {
  try {
    // Check if cache is still valid
    const now = Date.now();
    if (
      cachedData !== null &&
      cacheTimestamp !== null &&
      now - cacheTimestamp < CACHE_DURATION
    ) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
        cacheAge: Math.floor((now - cacheTimestamp) / 1000),
      });
    }

    // Fetch all issues with pagination
    let allIssuesData: any[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/issues",
        {
          owner: username,
          repo: repository,
          state: "all",
          sort: "created",
          direction: "desc",
          per_page: 100,
          page: page,
        }
      );

      allIssuesData = allIssuesData.concat(response.data);

      // If we got less than 100 items, we've reached the last page
      if (response.data.length < 100) {
        hasMorePages = false;
      } else {
        page++;
      }
    }

    // Filter out pull requests
    const allIssues: GitHubIssue[] = allIssuesData
      .filter((issue: any) => !issue.html_url.includes("/pull/"))
      .map((issue: any) => issue as GitHubIssue);

    // Filter for bugs (has "bug" label and NOT "invalid" label)
    const allBugs = allIssues.filter((issue: GitHubIssue) => {
      const hasbugLabel = issue.labels.some((l: any) => l.name === "bug");
      const isValid = issue.labels.some(
        (l: any) => l.name !== "invalid" && l.name !== "duplicate"
      );
      return hasbugLabel && isValid;
    });

    // Filter for open bugs only (to be displayed in open issues section)
    const openBugs = allBugs.filter(
      (issue: GitHubIssue) => issue.state === "open"
    );

    // Calculate stats
    const stats = {
      reported: allBugs.length, // Total bugs reported (open + closed)
      resolved: allBugs.length - openBugs.length, // Closed bugs
    };

    // Update cache
    cachedData = { issues: openBugs, stats };
    cacheTimestamp = now;

    return NextResponse.json({
      issues: openBugs,
      stats,
      cached: false,
      cacheAge: 0,
    });
  } catch (err: any) {
    console.error("GitHub API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch GitHub issues." },
      { status: 500 }
    );
  }
}

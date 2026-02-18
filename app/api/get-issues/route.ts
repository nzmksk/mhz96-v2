import { NextResponse } from "next/server";
import { octokit, username, repository, CACHE_DURATION } from "@/lib/constants";
import { GitHubIssue } from "@/lib/interfaces";

// Cache configuration
let cachedIssues: any[] | null = null;
let cacheTimestamp: number | null = null;

export async function GET() {
  try {
    // Check if cache is still valid
    const now = Date.now();
    if (
      cachedIssues !== null &&
      cacheTimestamp !== null &&
      now - cacheTimestamp < CACHE_DURATION
    ) {
      return NextResponse.json({
        issues: cachedIssues,
        cached: true,
        cacheAge: Math.floor((now - cacheTimestamp) / 1000),
      });
    }

    // Fetch fresh data from GitHub
    const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: username,
      repo: repository,
      state: "open",
      sort: "created",
      direction: "desc",
      per_page: 20,
    });

    // Extract only the fields we need to reduce payload size
    const issues: GitHubIssue[] = response.data
      .map((issue: any) => issue as GitHubIssue)
      .filter((issue: GitHubIssue) => !issue.html_url.includes("/pull/")); // Exclude pull requests

    // Update cache
    cachedIssues = issues;
    cacheTimestamp = now;

    return NextResponse.json({
      issues,
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

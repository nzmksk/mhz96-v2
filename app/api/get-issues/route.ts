import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const username = "nzmksk";
const repository = "mhz96-v2";

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
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
    const issues = response.data
      .map((issue: any) => ({
        number: issue.number,
        title: issue.title,
        html_url: issue.html_url,
        created_at: issue.created_at,
        labels: issue.labels.map((label: any) => ({
          name: label.name,
          color: label.color,
        })),
      }))
      .filter((issue: any) => !issue.html_url.includes("/pull/")); // Exclude pull requests

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

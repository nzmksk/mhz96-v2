import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const username = "nzmksk";

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cachedRepos: any[] | null = null;
let cacheTimestamp: number | null = null;

export async function GET() {
  try {
    const now = Date.now();
    if (
      cachedRepos !== null &&
      cacheTimestamp !== null &&
      now - cacheTimestamp < CACHE_DURATION
    ) {
      return NextResponse.json({
        repos: cachedRepos,
        cached: true,
      });
    }

    const response = await octokit.request("GET /users/{username}/repos", {
      username,
      type: "owner",
      sort: "updated",
      direction: "desc",
      per_page: 100,
    });

    const repos = response.data
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        updated_at: repo.updated_at,
      }));

    cachedRepos = repos;
    cacheTimestamp = now;

    return NextResponse.json({
      repos,
      cached: false,
    });
  } catch (err: any) {
    console.error("GitHub API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch GitHub repositories." },
      { status: 500 }
    );
  }
}

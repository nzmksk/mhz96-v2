import { NextResponse } from "next/server";
import { GitHubRepo } from "@/lib/interfaces";
import { octokit, username, CACHE_DURATION } from "@/lib/constants";

// Cache configuration
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

    const repos: GitHubRepo[] = response.data.filter(
      (repo: any) => !repo.fork
    ) as GitHubRepo[];

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

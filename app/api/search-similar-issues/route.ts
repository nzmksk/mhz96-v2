import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";
import { similarityRatio } from "@/lib/levenshtein";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const username = "nzmksk";
const repository = "mhz96-v2";

export interface SimilarIssue {
  number: number;
  title: string;
  url: string;
  state: string;
  similarity: number;
}

/**
 * Search for similar issues in the repository
 * Uses both GitHub's search API and fuzzy matching
 */
export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    // Search for open issues using GitHub's search API
    const searchQuery = `repo:${username}/${repository} is:issue is:open ${title}`;
    const response = await octokit.request("GET /search/issues", {
      q: searchQuery,
      per_page: 10,
      sort: "created",
      order: "desc",
    });

    // Calculate similarity scores using Levenshtein distance
    const issues: SimilarIssue[] = response.data.items.map((issue: any) => ({
      number: issue.number,
      title: issue.title,
      url: issue.html_url,
      state: issue.state,
      similarity: similarityRatio(title, issue.title),
    }));

    // Filter issues with similarity > 0.6 (60% similar) and sort by similarity
    const similarIssues = issues
      .filter((issue) => issue.similarity > 0.6)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5); // Limit to top 5 most similar

    return NextResponse.json({
      similar: similarIssues,
      count: similarIssues.length,
    });
  } catch (err: any) {
    console.error("Error searching for similar issues:", err);
    return NextResponse.json(
      { error: "Failed to search for similar issues." },
      { status: 500 }
    );
  }
}

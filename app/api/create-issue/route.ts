import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const username = "nzmksk";
const repository = "mhz96-v2";

export async function POST(req: Request) {
  const { title, body, labels } = await req.json();

  if (!title || !body || !labels) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const response = await octokit.request(
      "POST /repos/{owner}/{repo}/issues",
      {
        owner: username,
        repo: repository,
        title,
        body,
        labels,
      }
    );

    return NextResponse.json(response.data);
  } catch (err: any) {
    console.error("GitHub API error:", err);
    return NextResponse.json(
      { error: "Failed to create GitHub issue." },
      { status: 500 }
    );
  }
}

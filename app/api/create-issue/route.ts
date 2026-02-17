import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";
import rateLimit from "@/lib/rateLimit";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const username = "nzmksk";
const repository = "mhz96-v2";

// Rate limiters: 3 per hour and 10 per day
const hourlyLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});

const dailyLimiter = rateLimit({
  interval: 24 * 60 * 60 * 1000, // 24 hours
  uniqueTokenPerInterval: 500,
});

function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return "unknown";
}

export async function POST(req: Request) {
  const { title, body, labels, honeypot } = await req.json();

  // Honeypot check - if filled, it's likely a bot
  if (honeypot) {
    console.log("Honeypot triggered");
    return NextResponse.json(
      { error: "Invalid submission." },
      { status: 400 }
    );
  }

  if (!title || !body || !labels) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  // Get client IP for rate limiting
  const clientIP = getClientIP(req);

  // Check hourly rate limit (3 per hour)
  const hourlyCheck = hourlyLimiter.check(3, `hourly_${clientIP}`);
  if (!hourlyCheck.success) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
        retryAfter: Math.ceil((hourlyCheck.reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": hourlyCheck.limit.toString(),
          "X-RateLimit-Remaining": hourlyCheck.remaining.toString(),
          "X-RateLimit-Reset": hourlyCheck.reset.toString(),
          "Retry-After": Math.ceil((hourlyCheck.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // Check daily rate limit (10 per day)
  const dailyCheck = dailyLimiter.check(10, `daily_${clientIP}`);
  if (!dailyCheck.success) {
    return NextResponse.json(
      {
        error: "Daily submission limit reached. Please try again tomorrow.",
        retryAfter: Math.ceil((dailyCheck.reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": dailyCheck.limit.toString(),
          "X-RateLimit-Remaining": dailyCheck.remaining.toString(),
          "X-RateLimit-Reset": dailyCheck.reset.toString(),
          "Retry-After": Math.ceil((dailyCheck.reset - Date.now()) / 1000).toString(),
        },
      }
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

    return NextResponse.json(response.data, {
      headers: {
        "X-RateLimit-Limit-Hourly": hourlyCheck.limit.toString(),
        "X-RateLimit-Remaining-Hourly": hourlyCheck.remaining.toString(),
        "X-RateLimit-Limit-Daily": dailyCheck.limit.toString(),
        "X-RateLimit-Remaining-Daily": dailyCheck.remaining.toString(),
      },
    });
  } catch (err: any) {
    console.error("GitHub API error:", err);
    return NextResponse.json(
      { error: "Failed to create GitHub issue." },
      { status: 500 }
    );
  }
}

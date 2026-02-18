import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const username = "nzmksk";
const repository = "mhz96-v2";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export {octokit, username, repository, CACHE_DURATION};

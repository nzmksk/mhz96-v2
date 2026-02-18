import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const username = "nzmksk";

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cachedRepos: any[] | null = null;
let cacheTimestamp: number | null = null;

interface RepoOwner {
  login: string; // 'nzmksk'
  id: number; // 107503836
  node_id: string; // 'U_kgDOBmhg3A'
  avatar_url: string; // 'https://avatars.githubusercontent.com/u/107503836?v=4'
  gravatar_id?: string;
  url: string; // 'https://api.github.com/users/nzmksk'
  html_url: string; // 'https://github.com/nzmksk'
  followers_url: string; // 'https://api.github.com/users/nzmksk/followers'
  following_url: string; // 'https://api.github.com/users/nzmksk/following{/other_user}'
  gists_url: string; // 'https://api.github.com/users/nzmksk/gists{/gist_id}'
  starred_url: string; // 'https://api.github.com/users/nzmksk/starred{/owner}{/repo}'
  subscriptions_url: string; // 'https://api.github.com/users/nzmksk/subscriptions'
  organizations_url: string; // 'https://api.github.com/users/nzmksk/orgs'
  repos_url: string; // 'https://api.github.com/users/nzmksk/repos'
  events_url: string; // 'https://api.github.com/users/nzmksk/events{/privacy}'
  received_events_url: string; // 'https://api.github.com/users/nzmksk/received_events'
  type: string; // 'User'
  user_view_type: string; // 'public'
  site_admin: boolean; // false
}

interface RepoPermission {
  admin: boolean; // true,
  maintain: boolean; // true,
  push: boolean; // true,
  triage: boolean; // true,
  pull: boolean; // true
}
export interface GitHubRepo {
  id: number; // 590832055
  node_id: string; // 'R_kgDOIzdhtw'
  name: string; // 'tl-react-mynews'
  full_name: string; // 'nzmksk/tl-react-mynews'
  private: boolean; // false
  owner: RepoOwner;
  html_url: string; // 'https://github.com/nzmksk/tl-react-mynews',
  description: string; // "A news hub web application developed using React.js and Material UI. This project includes the use of (i) React context and (ii) REST API. This project is a part of TalentLabs' Certified Associate in Front-End Development.",
  fork: boolean; // false,
  url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews'
  forks_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/forks'
  keys_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/keys{/key_id}'
  collaborators_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/collaborators{/collaborator}'
  teams_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/teams'
  hooks_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/hooks'
  issue_events_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/issues/events{/number}'
  events_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/events'
  assignees_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/assignees{/user}'
  branches_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/branches{/branch}'
  tags_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/tags'
  blobs_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/git/blobs{/sha}'
  git_tags_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/git/tags{/sha}'
  git_refs_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/git/refs{/sha}'
  trees_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/git/trees{/sha}'
  statuses_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/statuses/{sha}'
  languages_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/languages'
  stargazers_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/stargazers'
  contributors_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/contributors'
  subscribers_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/subscribers'
  subscription_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/subscription'
  commits_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/commits{/sha}'
  git_commits_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/git/commits{/sha}'
  comments_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/comments{/number}'
  issue_comment_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/issues/comments{/number}'
  contents_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/contents/{+path}'
  compare_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/compare/{base}...{head}'
  merges_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/merges'
  archive_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/{archive_format}{/ref}'
  downloads_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/downloads'
  issues_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/issues{/number}'
  pulls_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/pulls{/number}'
  milestones_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/milestones{/number}'
  notifications_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/notifications{?since,all,participating}'
  labels_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/labels{/name}'
  releases_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/releases{/id}'
  deployments_url: string; // 'https://api.github.com/repos/nzmksk/tl-react-mynews/deployments'
  created_at: string; // '2023-01-19T10:14:41Z'
  updated_at: string; // '2023-08-02T17:00:09Z'
  pushed_at: string; // '2023-04-16T20:55:12Z'
  git_url: string; // 'git://github.com/nzmksk/tl-react-mynews.git'
  ssh_url: string; // 'git@github.com:nzmksk/tl-react-mynews.git'
  clone_url: string; // 'https://github.com/nzmksk/tl-react-mynews.git'
  svn_url: string; // 'https://github.com/nzmksk/tl-react-mynews'
  homepage: string;
  size: number; // 1118
  stargazers_count: number; // 0
  watchers_count: number; // 0
  language: string; // 'JavaScript'
  has_issues: boolean; // true
  has_projects: boolean; // true
  has_downloads: boolean; // true
  has_wiki: boolean; // true
  has_pages: boolean; // false
  has_discussions: boolean; // false
  forks_count: number; // 0
  mirror_url?: string; // null
  archived: boolean; // false
  disabled: boolean; // false
  open_issues_count: number; // 0
  license?: string; // null
  allow_forking: boolean; // true
  is_template: boolean; // false
  web_commit_signoff_required: boolean; // false
  has_pull_requests: boolean; // true
  pull_request_creation_policy: string; // 'all'
  topics: string[]; // [ 'material-ui', 'reactjs' ]
  visibility: string; // 'public'
  forks: number; // 0
  open_issues: number; // 0
  watchers: number; // 0
  default_branch: string; // 'master'
  permissions: RepoPermission;
}

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

    const repos: GitHubRepo[] = response.data
      .filter((repo: any) => !repo.fork) as GitHubRepo[];

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

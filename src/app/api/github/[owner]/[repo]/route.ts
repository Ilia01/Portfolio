import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

interface GitHubStats {
  stars: number;
  forks: number;
  lastCommit: string;
  language: string;
  openIssues: number;
}

interface GitHubApiResponse {
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  language: string;
  open_issues_count: number;
}

interface RouteParams {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { owner, repo } = await params;

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: {
          revalidate: 3600, 
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Repository not found" },
          { status: 404 }
        );
      }
      if (response.status === 403) {
        return NextResponse.json(
          { error: "Rate limit exceeded" },
          { status: 429 }
        );
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubApiResponse = await response.json();

    const stats: GitHubStats = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastCommit: data.pushed_at,
      language: data.language,
      openIssues: data.open_issues_count,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch repository stats" },
      { status: 500 }
    );
  }
}

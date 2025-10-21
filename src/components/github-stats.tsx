"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, Clock } from "lucide-react";

interface GitHubStats {
  stars: number;
  forks: number;
  lastCommit: string;
  language: string;
  openIssues: number;
}

interface GitHubStatsProps {
  githubUrl: string;
}

export function GitHubStats({ githubUrl }: GitHubStatsProps) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) {
          setError(true);
          setLoading(false);
          return;
        }

        const [, owner, repo] = match;

        const response = await fetch(`/api/github/${owner}/${repo}`);

        if (!response.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        const data: GitHubStats = await response.json();
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch GitHub stats:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchStats();
  }, [githubUrl]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500 font-mono animate-pulse">
        <span>Loading stats...</span>
      </div>
    );
  }

  if (error || !stats) {
    return null;
  }

  const lastCommitDate = new Date(stats.lastCommit);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - lastCommitDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let lastCommitText = "";
  if (diffDays === 0) {
    lastCommitText = "today";
  } else if (diffDays === 1) {
    lastCommitText = "yesterday";
  } else if (diffDays < 30) {
    lastCommitText = `${diffDays}d ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    lastCommitText = `${months}mo ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    lastCommitText = `${years}y ago`;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
        <Star className="w-3.5 h-3.5 text-yellow-500" />
        <span>{stats.stars.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
        <GitFork className="w-3.5 h-3.5 text-blue-500" />
        <span>{stats.forks}</span>
      </div>

      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
        <Clock className="w-3.5 h-3.5 text-green-500" />
        <span>{lastCommitText}</span>
      </div>

      {stats.language && (
        <div className="px-2 py-1 rounded-md bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
          <span>{stats.language}</span>
        </div>
      )}
    </div>
  );
}

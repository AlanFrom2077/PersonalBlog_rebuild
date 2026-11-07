// 从 GitHub 获取数据。这些函数在服务器端运行。
import { cacheLife } from "next/cache";
import { siteConfig } from "./site";

export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
};

export type ContributionDay = {
  date: string;
  contributionCount: number;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
};

const API = "https://api.github.com";

// "use cache"：这个函数的返回结果会被缓存
// cacheLife("hours")：缓存大约一小时后刷新
// 这样不用每次打开网页都去请求 GitHub（不带 token 的 API 每小时只能请求 60 次）

// ---------- 公开 API：不需要 token ----------

export async function getGitHubUser(): Promise<GitHubUser | null> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(`${API}/users/${siteConfig.githubUsername}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubUser;
  } catch {
    return null;
  }
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(
      `${API}/users/${siteConfig.githubUsername}/repos?sort=updated&per_page=100`,
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as GitHubRepo[];
    // 过滤掉 fork 来的仓库，只展示自己的
    return repos.filter((repo) => !repo.fork);
  } catch {
    return [];
  }
}

// ---------- 贡献记录：需要 token ----------
// GitHub 只在 GraphQL API 里提供贡献日历，而 GraphQL API 必须带 token。
// token 放在项目根目录的 .env.local 文件里：GITHUB_TOKEN=xxxx
// .env.local 不会被提交到 Git，也不会发送到浏览器，所以是安全的。

export async function getContributions(): Promise<ContributionCalendar | null> {
  "use cache";
  cacheLife("hours");

  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays { date contributionCount }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(`${API}/graphql`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: siteConfig.githubUsername } }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.user?.contributionsCollection?.contributionCalendar ?? null;
  } catch {
    return null;
  }
}
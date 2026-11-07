import type { Metadata } from "next";
import RepoCard from "@/components/RepoCard";
import { getGitHubRepos } from "@/lib/github";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "项目" };

export default async function ProjectsPage() {
  const repos = await getGitHubRepos();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">项目</h1>
      <p className="text-mist mt-2 mb-8">
        自动同步自我的{" "}
        <a
          href={`https://github.com/${siteConfig.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sakura hover:underline"
        >
          GitHub
        </a>
      </p>

      {repos.length === 0 ? (
        <p className="text-mist">暂时没能获取到仓库列表，稍后再来看看吧～</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </main>
  );
}

import type { GitHubRepo } from "@/lib/github";

// 常见语言在 GitHub 上的颜色，没列出的用灰色
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Racket: "#3c5caa",
};

export default function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-2xl p-5 flex flex-col gap-3 transition hover:-translate-y-0.5 hover:border-sakura/40 group"
    >
      <h3 className="font-bold text-lg group-hover:text-sakura transition-colors break-all">
        📦 {repo.name}
      </h3>
      <p className="text-sm text-mist flex-1">{repo.description ?? "暂无描述"}</p>
      <div className="flex items-center gap-4 text-xs text-mist">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: languageColors[repo.language] ?? "#9b96b5" }}
            />
            {repo.language}
          </span>
        )}
        <span>⭐ {repo.stargazers_count}</span>
        <span>更新于 {repo.updated_at.slice(0, 10)}</span>
      </div>
    </a>
  );
}

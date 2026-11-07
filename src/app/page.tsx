// 主页：GitHub 风格的个人页（服务器组件，可以直接 await 请求数据）
import Link from "next/link";
import ContributionGraph from "@/components/ContributionGraph";
import PostCard from "@/components/PostCard";
import { getGitHubUser } from "@/lib/github";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default async function Home() {
  const user = await getGitHubUser();
  const latestPosts = getAllPosts().slice(0, 4);

  // GitHub 请求失败时的兜底：直接用 github.com/<用户名>.png 当头像
  const avatar = user?.avatar_url ?? `https://github.com/${siteConfig.githubUsername}.png`;
  const bio = siteConfig.bio || user?.bio || "";

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-12">
      {/* ===== 个人信息 ===== */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt={siteConfig.name}
          className="size-36 rounded-full ring-4 ring-sakura/40 shadow-[0_0_40px_rgb(249_168_212/0.25)]"
        />

        <div className="flex flex-col gap-3 text-center md:text-left">
          <h1 className="text-3xl font-bold">{user?.name || siteConfig.name}</h1>
          <p className="text-mist">@{siteConfig.githubUsername}</p>
          <p className="max-w-xl">{bio}</p>

          {user && (
            <div className="flex gap-4 justify-center md:justify-start text-sm text-mist">
              <span>
                <b className="text-ink">{user.public_repos}</b> 仓库
              </span>
              <span>
                <b className="text-ink">{user.followers}</b> followers
              </span>
              <span>
                <b className="text-ink">{user.following}</b> following
              </span>
            </div>
          )}

          <div className="flex gap-3 justify-center md:justify-start">
            {siteConfig.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-4 py-1.5 rounded-full text-sm hover:text-sakura hover:border-sakura/40 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 贡献热力图 ===== */}
      <section>
        <h2 className="text-xl font-bold mb-4">🌱 提交记录</h2>
        <ContributionGraph />
      </section>

      {/* ===== 最新文章 ===== */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold">✍️ 最新文章</h2>
          <Link href="/blog" className="text-sm text-mist hover:text-sakura transition-colors">
            查看全部 →
          </Link>
        </div>
        {latestPosts.length === 0 ? (
          <p className="text-mist">还没有文章～</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

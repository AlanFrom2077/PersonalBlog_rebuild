"use client";

// 博客列表：搜索 + 分类 + 标签筛选
// 文章数据在服务器端读好，通过 props 传进来；筛选在浏览器里完成
import { useState } from "react";
import PostCard from "@/components/PostCard";
import { CATEGORIES, type Category, type PostMeta } from "@/lib/post-types";

const FILTERS = ["全部", ...CATEGORIES] as const;
type Filter = "全部" | Category;

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<Filter>("全部");
  const [tag, setTag] = useState<string | null>(null);

  const kw = keyword.trim().toLowerCase();

  const filtered = posts.filter((post) => {
    if (category !== "全部" && post.category !== category) return false;
    if (tag && !post.tags.includes(tag)) return false;
    if (kw) {
      const text = [post.title, post.excerpt, ...post.tags].join(" ").toLowerCase();
      if (!text.includes(kw)) return false;
    }
    return true;
  });

  // 再点一次同一个标签 = 取消筛选
  const toggleTag = (t: string) => setTag((prev) => (prev === t ? null : t));

  return (
    <div className="flex flex-col gap-6">
      <input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="🔍 搜索标题、摘要、标签……"
        className="glass w-full rounded-full px-5 py-3 outline-none placeholder:text-mist focus:border-sakura/60 transition"
      />

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1 rounded-full text-sm border transition ${
              category === c
                ? "bg-sakura text-night border-sakura font-semibold"
                : "border-white/15 text-mist hover:text-ink hover:border-white/30"
            }`}
          >
            {c}
          </button>
        ))}

        {tag && (
          <button onClick={() => setTag(null)} className="ml-auto text-sm text-sakura">
            #{tag} ✕
          </button>
        )}
      </div>

      <p className="text-sm text-mist">共 {filtered.length} 篇</p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-mist">没有找到相关文章 (｡•́︿•̀｡)</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} activeTag={tag} onTagClick={toggleTag} />
          ))}
        </div>
      )}
    </div>
  );
}

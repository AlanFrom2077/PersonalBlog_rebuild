"use client";

import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/post-types";

const categoryStyle: Record<PostMeta["category"], string> = {
  技术: "bg-lavender/20 text-lavender",
  日常: "bg-sakura/20 text-sakura",
  其他: "bg-white/10 text-mist",
};

type PostCardProps = {
  post: PostMeta;
  activeTag?: string | null;
  onTagClick?: (tag: string) => void; // 点击标签时调用（博客页用来筛选）
};

export default function PostCard({ post, activeTag, onTagClick }: PostCardProps) {
  return (
    <article className="group glass overflow-hidden rounded-2xl transition hover:-translate-y-0.5 hover:border-sakura/40">
      {/* 封面：有 cover 就显示图片，没有就显示一个渐变色块 */}
      <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-lavender/30 via-night to-sakura/30 flex items-center justify-center text-5xl opacity-60">
            🌸
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className={`px-2 py-0.5 rounded-full ${categoryStyle[post.category]}`}>
            {post.category}
          </span>
          <time className="text-mist">{post.date}</time>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold group-hover:text-sakura transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-mist text-sm line-clamp-2">{post.excerpt}</p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className={`text-xs transition-colors ${
                  activeTag === tag ? "text-sakura" : "text-mist hover:text-sakura"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

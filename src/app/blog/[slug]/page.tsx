// 文章详情页。[slug] 是动态路由：/blog/hello-world 里的 hello-world 就是 slug
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

// 构建时提前生成所有文章页面
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: post?.title ?? "文章不存在", description: post?.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-mist hover:text-sakura transition-colors">
        ← 返回博客
      </Link>

      {post.cover && (
        <div className="relative aspect-video mt-6 overflow-hidden rounded-2xl">
          <Image src={post.cover} alt={post.title} fill priority className="object-cover" />
        </div>
      )}

      <header className="mt-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-mist">
          <time>{post.date}</time>
          <span>·</span>
          <span className="text-lavender">{post.category}</span>
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </header>

      <article className="markdown">
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </article>
    </main>
  );
}

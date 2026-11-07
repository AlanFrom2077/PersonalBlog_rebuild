import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "博客" };

// 服务器组件：在服务器上读取 Markdown 文件，再把数据交给浏览器端的 BlogList 做筛选
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">博客</h1>
      <p className="text-mist mt-2 mb-8">技术笔记、日常碎碎念，和一些别的</p>
      <BlogList posts={posts} />
    </main>
  );
}

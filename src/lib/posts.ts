// 读取 content/posts/ 下的 Markdown 文章
// 这些函数只在服务器端运行（用到了 fs 读文件），浏览器里不能用
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CATEGORIES, type Category, type Post, type PostMeta } from "./post-types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// YAML 里写 date: 2026-11-06 会被解析成 Date 对象，这里统一转成字符串
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function getPostFileNames(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((name) => name.endsWith(".md"));
}

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");

  // gray-matter 把文件拆成两部分：开头 --- 之间的元信息(data) 和正文(content)
  const { data, content } = matter(raw);

  const category: Category = CATEGORIES.includes(data.category) ? data.category : "其他";

  return {
    slug,
    title: data.title ?? slug,
    date: normalizeDate(data.date),
    category,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    // 没写 excerpt 的话，就取正文前 80 个字
    excerpt:
      data.excerpt ??
      content
        .replace(/[#>*`_\-\[\]()!]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80),
    cover: data.cover,
    content,
  };
}

// 所有文章（按日期从新到旧），不含正文
export function getAllPosts(): PostMeta[] {
  return getPostFileNames()
    .map(readPost)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

// 根据 slug 读一篇完整文章，找不到返回 null
export function getPostBySlug(slug: string): Post | null {
  const fileName = getPostFileNames().find((name) => name === `${slug}.md`);
  return fileName ? readPost(fileName) : null;
}

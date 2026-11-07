// 文章相关的类型和常量。
// 单独放一个文件，是因为浏览器端组件（BlogList）也要用 CATEGORIES，
// 而 posts.ts 用到了 fs（只能在服务器运行），浏览器端不能导入它。

export const CATEGORIES = ["日常", "技术", "其他"] as const;
export type Category = (typeof CATEGORIES)[number];

// 文章的元信息（列表页只需要这些）
export type PostMeta = {
  slug: string; // 文件名去掉 .md，用作网址：/blog/<slug>
  title: string;
  date: string; // 格式：2026-11-06
  category: Category;
  tags: string[];
  excerpt: string; // 摘要
  cover?: string; // 封面图路径，比如 /covers/xxx.jpg（图片放在 public/covers/ 里）
};

// 完整文章 = 元信息 + 正文
export type Post = PostMeta & { content: string };

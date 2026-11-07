"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/", label: "主页" },
  { href: "/projects", label: "项目" },
  { href: "/blog", label: "博客" },
  { href: "/resources", label: "资源" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // /blog/xxx 这种文章页也算在「博客」下面，所以用 startsWith 判断
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/70 backdrop-blur">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold whitespace-nowrap bg-linear-to-r from-sakura to-lavender bg-clip-text text-transparent"
        >
          {siteConfig.title}
        </Link>

        {/* 电脑端：横排链接（md 以上才显示） */}
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  isActive(link.href)
                    ? "text-sakura font-semibold"
                    : "text-mist hover:text-ink transition-colors"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 手机端：菜单按钮（md 以上隐藏） */}
        <button
          className="md:hidden text-2xl text-ink"
          onClick={() => setOpen(!open)}
          aria-label="切换菜单"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* 手机端：展开的菜单 */}
      {open && (
        <ul className="md:hidden flex flex-col px-4 pb-4 gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={isActive(link.href) ? "text-sakura font-semibold" : "text-mist"}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

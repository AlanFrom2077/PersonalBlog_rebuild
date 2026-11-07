import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-mist">
      © 2026 {siteConfig.name} · Built with Next.js & Tailwind CSS 🌸
    </footer>
  );
}

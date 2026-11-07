import type { Metadata } from "next";
import { resourceGroups } from "@/data/resources";

export const metadata: Metadata = { title: "资源" };

export default function ResourcesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">资源</h1>
      <p className="text-mist mt-2 mb-10">我常用的工具、学习资料和课程笔记</p>

      <div className="flex flex-col gap-10">
        {resourceGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-xl font-bold mb-4">
              {group.emoji} {group.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-xl p-4 transition hover:-translate-y-0.5 hover:border-sakura/40 group"
                >
                  <h3 className="font-semibold group-hover:text-sakura transition-colors">
                    {item.name} ↗
                  </h3>
                  <p className="text-sm text-mist mt-1">{item.description}</p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

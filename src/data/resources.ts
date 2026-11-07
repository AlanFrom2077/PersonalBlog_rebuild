// 资源页的数据。想加新资源，往对应分组的 items 里加一项就行
export type Resource = {
  name: string;
  url: string;
  description: string;
};

export type ResourceGroup = {
  title: string;
  emoji: string;
  items: Resource[];
};

export const resourceGroups: ResourceGroup[] = [
  {
    title: "开发工具",
    emoji: "🛠️",
    items: [
      { name: "VS Code", url: "https://code.visualstudio.com/", description: "主力编辑器，配合 WSL 插件写代码" },
      { name: "WSL", url: "https://learn.microsoft.com/windows/wsl/", description: "在 Windows 里跑 Linux" },
      { name: "nvm", url: "https://github.com/nvm-sh/nvm", description: "Node.js 版本管理工具" },
    ],
  },
  {
    title: "学习资料",
    emoji: "📚",
    items: [
      { name: "React 官方教程", url: "https://react.dev/learn", description: "React 入门最好的地方" },
      { name: "Next.js 文档", url: "https://nextjs.org/docs", description: "这个博客用的框架" },
      { name: "Tailwind CSS 文档", url: "https://tailwindcss.com/docs", description: "查 class 名必备" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/", description: "HTML / CSS / JS 的百科全书" },
      { name: "The Missing Semester", url: "https://missing.csail.mit.edu/", description: "MIT 的命令行、Git、工具课" },
    ],
  },
  {
    title: "课程笔记",
    emoji: "📝",
    items: [
      // TODO: 换成你自己的笔记仓库链接（确认仓库是公开的）
      { name: "ClassNote", url: "https://github.com/AlanFrom2077/ClassNote", description: "课堂笔记" },
      { name: "C-Notes", url: "https://github.com/AlanFrom2077/C-Notes", description: "C 语言学习笔记" },
    ],
  },
];

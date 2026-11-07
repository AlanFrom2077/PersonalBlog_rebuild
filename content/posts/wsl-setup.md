---
title: 用 WSL 搭建 Next.js 开发环境
date: "2026-11-06"
category: 技术
tags: [WSL, Linux, Node.js]
excerpt: 把很久没用的 WSL 重新捡起来，用 nvm 装好 Node.js，创建第一个 Next.js 项目。
---

## 1. 更新软件源，安装 curl

```bash
sudo apt update
sudo apt install -y curl
```

踩坑：一开始敲成了 `sudo install curl`，漏了 `apt`。`install` 是另一个复制文件的命令，所以报了 `missing destination file operand`。

## 2. 用 nvm 安装 Node.js

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install --lts
```

不用 `apt install nodejs`，因为软件源里的版本太老。

## 3. 创建项目

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
npm run dev
```

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |

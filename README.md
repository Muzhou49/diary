
# 🌷 感恩日记

> 每天记录三件感恩的小事，让生活更温暖美好。

一个温暖治愈的个人感恩日记 PWA 应用。支持文字/语音输入、AI 朋友聊天、情绪统计分析和月度回顾。

**在线体验**：https://muzhou49.github.io/diary

---

## ✨ 功能

### 📝 写日记
- **文字输入** — 每日一言引导，选择分类和心情
- **语音输入** — Web Speech API 浏览器原生语音转文字
- **AI 润色** — 一键帮你把零散句子整理成优美日记
- **AI 朋友聊天** — 和温暖的朋友"小暖"聊聊今天发生的事，自动整理成日记

### 📋 回顾
- **时间线列表** — 按月份分组，瀑布流布局
- **搜索** — 按内容、心情、分类、日期搜索
- **温暖插画风卡片** — 不同心情对应不同柔和渐变背景

### 📊 分析
- **统计卡片** — 总篇数、本月、连续天数、最长记录
- **情绪分布** — 环形图展示感恩/开心/温暖/平静/感动占比
- **分类排行** — 你的感恩集中在哪些方面
- **AI 月度回顾** — DeepSeek 生成温暖的本月总结

### 🔥 连续打卡
- 记录连续感恩天数，7/14/30 天里程碑变色
- 火焰徽章激励坚持

---

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + shadcn/ui |
| 动画 | Framer Motion |
| 本地存储 | IndexedDB (Dexie.js) |
| AI | DeepSeek API |
| 语音 | Web Speech API |
| 部署 | GitHub Pages (静态导出) |
| PWA | 支持添加到主屏幕 |

---

## 🚀 本地运行

```bash
# 克隆项目
git clone https://github.com/Muzhou49/diary.git
cd diary

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 http://localhost:3000/diary

### 配置 AI 功能

在「设置」页面填入 DeepSeek API Key，即可使用：
- AI 朋友聊天
- AI 日记润色
- AI 月度回顾

---

## 📦 部署

本项目使用 GitHub Pages 静态部署：

```bash
npm run build          # 构建静态文件到 out/
```

`out/` 目录推送到 `gh-pages` 分支即可。详见 `.claude/skills/nextjs-gh-pages-deploy.md`

---

## 📁 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── write/              # 写日记页
│   ├── review/             # 回顾页（时间线）
│   ├── analysis/           # 分析页（统计看板）
│   ├── diary/              # 日记详情页
│   └── settings/           # 设置页
├── components/
│   ├── write/              # 写日记相关组件
│   │   ├── AIChatDialog    # AI 聊天对话框
│   │   ├── VoiceRecorder   # 语音录制
│   │   ├── DailyPrompt     # 每日一言卡片
│   │   ├── MoodSelector    # 心情选择器
│   │   ├── SaveButton      # 保存按钮（庆祝动画）
│   │   └── PolishButton    # AI 润色按钮
│   ├── review/             # 回顾相关组件
│   │   ├── DiaryCard       # 温暖插画风日记卡片
│   │   └── StreakBadge     # 连续打卡徽章
│   └── layout/             # 布局组件
│       ├── AppShell        # 应用外壳（含树叶装饰）
│       ├── BottomNav       # 底部导航栏
│       └── PageTransition  # 页面过渡动画
├── lib/
│   ├── db.ts               # IndexedDB 数据库 (Dexie.js)
│   ├── deepseek.ts         # DeepSeek API 客户端
│   ├── speech.ts           # Web Speech API 封装
│   └── types.ts            # 类型定义
├── public/
│   └── grain.svg           # 自然质感颗粒纹理
├── openspec/               # OpenSpec 设计规范归档
└── tailwind.config.ts      # 自定义暖色 + 鼠尾草绿调色板
```

---

## 🎨 设计语言：Nature Distilled

基于 UI/UX Pro Max 设计审计，采用"自然质感"设计语言：

- 泥土色调渐变背景 + SVG 颗粒纹理
- 淡彩树叶装饰
- 温暖插画风卡片（不同心情不同渐变）
- 保存庆祝粒子动画
- 页面切换流畅过渡
- WCAG AA 无障碍合规（对比度 ≥ 4.5:1）

---

## 📝 License

MIT

## Why

基于 UI/UX Pro Max 技能审计，对感恩日记进行全面设计升级。提升视觉质感、交互反馈、和无障碍合规性。

## What Changes

### Critical Fixes（无障碍 + 可用性）
- 文字对比度：`muted-foreground` 从 hsl(30,5%,45%) 加深到 hsl(25,8%,35%)
- 键盘焦点：全局 `:focus-visible` 双环样式
- 字号：BottomNav 标签 10px → 12px
- 触摸目标：BottomNav Tab ≥ 44×44px
- 减少动效：全局 `prefers-reduced-motion` 适配

### High Fixes（视觉规范）
- Z-index：CSS 变量体系（10/20/30/50）
- 动画时长：SaveButton 1000ms → 300ms
- 玻璃卡片：bg-white/70 → bg-white/80

### Medium Optimizations（细节优化）
- SaveButton：✨ emoji → Sparkles SVG icon
- AI 摘要：spinner → skeleton 骨架屏
- 辅色系统：新增 sage/clover 鼠尾草绿 + 三叶草绿
- StreakBadge：连续 7/14/30 天里程碑变色

### Design Upgrade（风格升级）
- Nature Distilled：颗粒纹理背景 + 泥土色调渐变 + 淡彩树叶 SVG
- 每日一言：手账卡片设计（书本图标 + 装饰线 + 圆点）
- 保存庆祝：12 粒子飘散 + 光环扩散动画
- 统计卡片：hover 光晕效果
- 页面过渡：AnimatePresence 淡入+微移+缩放

## Capabilities

### New
- `nature-distilled`: 自然质感设计语言
- `celebration-effects`: 保存庆祝粒子动画
- `page-transitions`: 页面切换过渡动画

### Modified
- `ui-accessibility`: 对比度/焦点/动效合规增强
- `review-warm-illustration`: StreakBadge 里程碑变色

## Impact
- `app/globals.css` — 色彩/焦点/纹理/动效
- `components/layout/AppShell.tsx` — 树叶装饰 + PageTransition
- `components/layout/BottomNav.tsx` — 字号/触摸目标/z-index
- `components/layout/PageTransition.tsx` — 新建页面过渡组件
- `components/write/DailyPrompt.tsx` — 手账卡片重设计
- `components/write/SaveButton.tsx` — 庆祝粒子动画
- `components/review/StreakBadge.tsx` — 里程碑变色
- `app/analysis/page.tsx` — StatCard 光晕 + skeleton
- `tailwind.config.ts` — sage/clover 辅色
- `public/grain.svg` — 颗粒纹理资源

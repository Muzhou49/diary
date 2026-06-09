## Tasks

### Phase 1: A11y Fixes
- [x] 文字对比度：muted-foreground hsl(30,5%,45%) → hsl(25,8%,35%)
- [x] 键盘焦点：全局 :focus-visible 双环样式
- [x] 字号修复：BottomNav 标签 10px → 12px
- [x] 触摸目标：BottomNav Tab ≥ 44×44px
- [x] 减少动效：@media (prefers-reduced-motion) 全局适配

### Phase 2: Visual Polish
- [x] Z-index：CSS 变量体系 (--z-base/dropdown/sticky/overlay)
- [x] 动画时长：SaveButton 1000ms → 300ms
- [x] 玻璃卡片：bg-white/70 → bg-white/80
- [x] SaveButton：✨ emoji → Sparkles SVG icon
- [x] AI 摘要：spinner → skeleton 骨架屏

### Phase 3: Color System
- [x] Tailwind config：新增 sage/clover 辅色
- [x] StreakBadge：连续 7/14/30 天里程碑变色

### Phase 4: Nature Distilled
- [x] public/grain.svg 颗粒纹理资源
- [x] globals.css 泥土色调渐变 + body::before 纹理
- [x] AppShell 淡彩树叶 SVG 装饰

### Phase 5: Micro-interactions
- [x] DailyPrompt 手账卡片设计
- [x] SaveButton 12 粒子庆祝动画 + 光环扩散
- [x] StatCard hover 光晕效果
- [x] PageTransition 页面切换动画

### Phase 6: Deploy
- [x] Build static export
- [x] Deploy to GitHub Pages (gh-pages + .nojekyll)
- [x] Git tag v2.1.0

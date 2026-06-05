## Why

日历组件当前将数字、emoji 图标、背景色三层信息挤压在小格子里，导致内容重叠、视觉拥挤。需要重构为简洁的数字着色方案，提升可读性和美观度。

## What Changes

- 移除格子中的 emoji 图标，改用底部小圆点表示有日记
- 有日记的日期数字使用暖橙色，无日记使用淡灰色
- 今天的日期使用实心圆背景高亮
- 日历容器从毛玻璃卡片改为白底细边框卡片
- 页面背景从渐变改为干净的浅灰

## Capabilities

### New Capabilities
- `calendar-clean-layout`: 日历组件使用数字着色方案，圆点标记替代 emoji 图标，简洁无重叠

### Modified Capabilities
<!-- 无现有 spec 需要修改，这是新项目首次规范化 -->

## Impact

- `components/review/CalendarHeatmap.tsx` — 完全重写渲染逻辑和样式
- `components/layout/AppShell.tsx` — 背景色从 warm-gradient 改为 bg-[#fafaf9]
- `app/review/page.tsx` — 日历容器和 Tab 样式微调

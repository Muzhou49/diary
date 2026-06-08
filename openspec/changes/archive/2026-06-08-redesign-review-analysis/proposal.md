## Why

回顾页当前把日历热力图、趋势图、日记列表全部塞进 Tab 切换中，导致：
- 日历格子小而拥挤，内容重叠
- 趋势统计藏在 Tab 里不够直观
- "趋势"命名不直观，用户容易忽略

用户希望将统计内容独立为「分析」页，与「写日记」「回顾」同级。回顾页去掉日历和 Tab，改为可搜索、按月折叠的瀑布流时间线。

## What Changes

### 导航结构
- 底部导航从 3 个 Tab 扩展为 4 个：**写日记** / **回顾** / **分析** / **设置**
- 分析 Tab 使用 `BarChart3` icon
- Tab 字号缩小为 `text-[10px]` 适配 4 个标签

### 回顾页 (Review)
- 移除 Tabs 组件和 CalendarHeatmap
- 搜索栏：支持搜索日记内容、心情、分类、日期
- 按月份分组，点击月份标题展开/收起，本月默认展开
- 瀑布流双列布局 (`columns-2`)
- 温暖插画风 DiaryCard：根据心情匹配柔和渐变背景 + 底部渐隐装饰圆点
- 卡片入场交错动画，hover 上浮，tap 缩小

### 分析页 (Analysis) — 全新页面
- 4 个统计卡片行：总篇数、本月篇数、连续天数、最长记录
- 情绪分布环形图 + 图例（复用 recharts PieChart）
- 感恩分类排行 TOP 5（横向进度条）
- AI 月度回顾摘要（DeepSeek 生成，IndexedDB 缓存，可手动刷新）

## Capabilities

### New Capabilities
- `analysis-dashboard`: 独立分析页，情绪分布图、分类排行、打卡成就、AI 摘要
- `review-timeline`: 回顾页改为按月分组、可搜索、可折叠的瀑布流列表
- `review-warm-illustration`: DiaryCard 采用温暖插画风（柔和渐变 + 装饰圆点）

### Removed Capabilities
- 回顾页不再包含日历热力图和趋势 Tab

## Impact

- `components/layout/BottomNav.tsx` — 新增「分析」Tab（BarChart3 icon）
- `app/review/page.tsx` — 完全重写：搜索栏 + 按月折叠 + 瀑布流
- `app/analysis/page.tsx` — **新建**，分析页
- `components/review/DiaryCard.tsx` — 重写为温暖插画风（渐变背景 + 装饰圆点）
- `components/review/MoodTrendChart.tsx` — 内容迁移到分析页
- `components/review/CalendarHeatmap.tsx` — 不再使用（保留文件）
- `lib/deepseek.ts` — 新增 `MONTHLY_SUMMARY_PROMPT`

## Tasks

### Phase 1: 导航和路由
- [ ] 1.1 更新 `BottomNav.tsx` 为 4 Tab：写日记/回顾/分析/设置，分析用 `BarChart3` icon
- [ ] 1.2 创建 `app/analysis/page.tsx` 分析页骨架（AppShell + 标题）

### Phase 2: 回顾页重构
- [ ] 2.1 重写 `app/review/page.tsx`：移除 Tabs 和 CalendarHeatmap
- [ ] 2.2 实现按月份分组的日记列表（时间倒序）
- [ ] 2.3 保留 StreakBadge 和标题

### Phase 3: 分析页内容
- [ ] 3.1 统计卡片组件（总篇数/本月/连续/最长）
- [ ] 3.2 情绪分布环形图（复用 recharts PieChart）
- [ ] 3.3 感恩分类排行（复用现有横向进度条）
- [ ] 3.4 AI 月度摘要模块（DeepSeek + IndexedDB 缓存）

### Phase 4: 验证
- [ ] 4.1 构建测试静态导出
- [ ] 4.2 部署到 GitHub Pages 验证

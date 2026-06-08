## ADDED Requirements

### Requirement: Review page shows timeline grouped by collapsible months
回顾页 SHALL 以月份分组展示日记，每组可展开/收起，当前月份默认展开。

#### Scenario: Group entries by month
- **WHEN** 存在跨月份的日记
- **THEN** 日记按月份分组，每组有可点击的月份标题
- **AND** 月份按时间倒序排列

#### Scenario: Current month expanded by default
- **WHEN** 本月有日记记录
- **THEN** 本月的分组默认展开

#### Scenario: Toggle month expand/collapse
- **WHEN** 用户点击月份标题
- **THEN** 该月份的日记列表展开或收起
- **AND** chevron 图标旋转 90° 过渡动画（300ms）

#### Scenario: Month header shows count
- **WHEN** 某月有 N 篇日记
- **THEN** 月份标题右侧显示篇数标签（本月显示"本月"，其他显示"N 篇"）

---

### Requirement: Search bar filters diary entries
回顾页 SHALL 提供搜索功能，实时过滤日记列表。

#### Scenario: Search by content
- **WHEN** 用户输入日记内容关键词
- **THEN** 实时过滤，只显示内容匹配的日记

#### Scenario: Search by mood or category
- **WHEN** 用户输入心情名或分类名
- **THEN** 匹配对应日记（如输入"开心"匹配所有 happy 心情的日记）

#### Scenario: Search by date
- **WHEN** 用户输入日期片段（如"06-04"）
- **THEN** 匹配该日期的日记

#### Scenario: No search results
- **WHEN** 搜索关键词无匹配
- **THEN** 显示「没有找到匹配的日记 🧐」

#### Scenario: Clear search
- **WHEN** 用户清空搜索框
- **THEN** 恢复显示全部日记

---

### Requirement: Masonry layout for diary cards
日记卡片 SHALL 使用瀑布流双列布局（`columns-2`）。

#### Scenario: Two-column masonry
- **WHEN** 展开某月份的日记列表
- **THEN** 卡片以双列瀑布流排列，卡片高度自适应内容

#### Scenario: Card avoids column break
- **WHEN** 渲染卡片
- **THEN** 使用 `break-inside-avoid` 防止卡片跨列截断

---

### Requirement: Streak badge remains on review page
连续打卡徽章 SHALL 保留在回顾页标题下方。

---

### Requirement: Review page removed tabs and calendar
回顾页 SHALL 不再包含 Tabs 组件和 CalendarHeatmap。

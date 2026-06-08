## ADDED Requirements

### Requirement: Analysis page accessible from bottom navigation
分析页 SHALL 通过底部导航栏的「分析」Tab 直接访问，与「写日记」「回顾」「设置」同级。

#### Scenario: User opens analysis page
- **WHEN** 用户点击底部导航的「分析」Tab
- **THEN** 导航到 `/analysis` 页面
- **AND** 该 Tab 高亮显示为激活状态

---

### Requirement: Stats cards show key metrics
分析页顶部 SHALL 展示 4 个统计指标卡片。

#### Scenario: Stats cards display
- **WHEN** 分析页加载完成
- **THEN** 显示总篇数、本月篇数、连续天数、最长连续记录 4 个指标
- **AND** 每个卡片包含一个大数字和一个小标签

#### Scenario: Stats update on new entry
- **WHEN** 用户写了一篇新日记后返回分析页
- **THEN** 统计数字自动更新

---

### Requirement: Mood distribution ring chart
分析页 SHALL 展示情绪分布的环形图（Donut Chart）。

#### Scenario: Mood chart with data
- **WHEN** 存在日记数据
- **THEN** 显示环形图，每种心情一种暖色系颜色
- **AND** 右侧图例显示 emoji + 情绪名 + 次数

#### Scenario: Mood chart empty state
- **WHEN** 没有任何日记
- **THEN** 显示「还没有数据，去写一篇日记吧 ✨」

---

### Requirement: Category ranking bar chart
分析页 SHALL 展示感恩分类的横向排行（TOP 5）。

#### Scenario: Category ranking display
- **WHEN** 存在日记数据
- **THEN** 按次数降序显示 TOP 5 分类
- **AND** 每项包含排名序号、分类名、横向进度条、次数

#### Scenario: Less than 5 categories
- **WHEN** 日记的分类种类少于 5 个
- **THEN** 只显示已有分类，不显示空行

---

### Requirement: AI monthly summary
分析页 SHALL 提供 AI 生成的本月感恩总结，调用 DeepSeek API。

#### Scenario: Generate monthly summary
- **WHEN** 用户首次进入分析页且本月有日记
- **THEN** 调用 DeepSeek 生成本月感恩总结（2-3 句温暖回顾 + 鼓励）
- **AND** 生成期间显示加载动画

#### Scenario: Summary cached after generation
- **WHEN** AI 摘要生成完成
- **THEN** 结果缓存到 IndexedDB settings 表（key = `ai-summary-<YYYY-MM>`）
- **AND** 下次进入同月份不再重复调用 API

#### Scenario: Manual refresh
- **WHEN** 用户点击摘要区域的刷新按钮
- **THEN** 清除缓存，重新生成该月摘要

#### Scenario: Summary empty state (no diary)
- **WHEN** 本月没有日记
- **THEN** 不显示 AI 摘要模块，或显示「写完日记后可以生成月度总结哦～」

#### Scenario: Summary empty state (no API key)
- **WHEN** 用户未配置 DeepSeek API Key
- **THEN** 显示「配置 API Key 后可以生成 AI 月度总结」并引导去设置页

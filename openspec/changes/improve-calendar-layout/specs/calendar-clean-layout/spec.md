## ADDED Requirements

### Requirement: Calendar grid displays days with number coloring
日历组件 SHALL 以 7 列网格形式展示月份中的每一天。每个格子只包含日期数字，底部可选小圆点。

#### Scenario: Day with no diary entry
- **WHEN** 某天没有日记记录
- **THEN** 该天数字显示为淡灰色 (#c0bfbc)，无圆点，背景透明

#### Scenario: Day with diary entry
- **WHEN** 某天有日记记录
- **THEN** 该天数字显示为暖橙色 (#E8886A / warm-500)，底部有一个 3px 暖色圆点

#### Scenario: Today's date
- **WHEN** 当前显示的月份包含今天
- **THEN** 今天的数字显示在实心圆背景上（warm-500 填充），数字为白色

#### Scenario: Today with diary entry
- **WHEN** 今天已有日记记录
- **THEN** 显示为实心圆背景 + 白色数字（以实心圆为优先，不再叠加圆点）

### Requirement: Month navigation
日历 SHALL 提供左右箭头按钮切换月份。

#### Scenario: Navigate to previous month
- **WHEN** 用户点击左箭头
- **THEN** 日历切换到上一个月，数据重新加载

#### Scenario: Navigate to next month
- **WHEN** 用户点击右箭头
- **THEN** 日历切换到下一个月，数据重新加载

### Requirement: Calendar container uses clean white card
日历容器 SHALL 使用白色背景卡片（`bg-white rounded-2xl`），不再使用毛玻璃效果。

#### Scenario: Visual appearance
- **WHEN** 用户查看回顾页面的日历标签
- **THEN** 日历显示在圆角白色卡片中，带细边框

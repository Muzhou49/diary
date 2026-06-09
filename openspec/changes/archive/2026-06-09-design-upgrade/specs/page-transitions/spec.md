## ADDED Requirements

### Requirement: Animated page transitions
底部导航切换页面时 SHALL 显示过渡动画。

#### Scenario: Tab switch animation
- **WHEN** 用户点击底部导航切换页面
- **THEN** 旧页面淡出+微上移（200ms easeIn）
- **AND** 新页面淡入+微上移+微缩放（300ms easeOut）
- **AND** 使用 AnimatePresence mode="wait" 确保过渡完整

#### Scenario: Same page navigation
- **WHEN** 用户在相同页面内操作（如展开月份）
- **THEN** 不触发页面过渡动画

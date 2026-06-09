## ADDED Requirements

### Requirement: Chat input always rendered
聊天输入区 SHALL 始终渲染，不受日期判断影响。

#### Scenario: Today — input active
- **WHEN** chatDate === today
- **THEN** 输入框可编辑，显示语音按钮和快捷操作

#### Scenario: Past date — input disabled
- **WHEN** chatDate !== today
- **THEN** 输入框禁用，显示"只能查看历史消息"
- **AND** 显示"📖 查看历史对话"提示条

### Requirement: No stacking context trapping
AppShell SHALL NOT 创建限制 fixed 子元素的 stacking context。

#### Scenario: Dialog above nav
- **WHEN** 全屏对话框打开
- **THEN** 对话框（z-60）完整显示，不被 BottomNav（z-40）遮挡

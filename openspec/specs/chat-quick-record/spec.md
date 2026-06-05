## ADDED Requirements

### Requirement: Quick action button triggers diary generation
聊天界面 SHALL 在输入区域提供快捷操作按钮，用户点击后自动发送预设文案，无需手动输入。

#### Scenario: User taps quick record button
- **WHEN** 用户点击「帮我记录日记」按钮
- **THEN** 系统自动发送预设消息 `"帮我整理一下今天的感恩日记吧～"` 给 AI
- **AND** 输入框不改变当前内容
- **AND** 按钮在 AI 回复过程中保持可用（不 disabled）

#### Scenario: Quick action while AI is responding
- **WHEN** 用户点击快捷按钮时 AI 正在回复（loading 状态）
- **THEN** 忽略该操作，不发送新消息

#### Scenario: Quick action triggers diary summary
- **WHEN** AI 收到快捷按钮触发的预设消息
- **THEN** AI 按现有 [SUMMARY] 机制生成日记内容

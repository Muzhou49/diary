## ADDED Requirements

### Requirement: Chat messages are persisted to IndexedDB
聊天消息 SHALL 在发送和接收时自动保存到本地数据库，以日期（YYYY-MM-DD）分组。

#### Scenario: New message is saved
- **WHEN** 用户发送消息或收到 AI 回复
- **THEN** 该消息立即写入 `chatMessages` 表，包含 date、role、content、createdAt 字段

#### Scenario: Messages are saved before dialog closes
- **WHEN** 用户点击「完成」关闭聊天
- **THEN** 当前会话的所有消息已保存在数据库中

### Requirement: Load today's chat history on open
进入聊天时 SHALL 自动加载今日的历史消息，如有则恢复对话，无则显示欢迎语。

#### Scenario: Open chat with existing history
- **WHEN** 用户打开聊天，且今日已有聊天记录
- **THEN** 聊天界面加载今日所有历史消息
- **AND** 自动滚动到最新消息

#### Scenario: Open chat with no history
- **WHEN** 用户打开聊天，且今日无聊天记录
- **THEN** 聊天界面显示默认欢迎语「嗨～今天过得怎么样呀？有什么让你觉得特别温暖的事吗？☺️」

#### Scenario: History does not mix across dates
- **WHEN** 用户打开聊天
- **THEN** 默认只加载当日（date = today）的消息

### Requirement: Browse past conversation dates
聊天界面 SHALL 允许用户浏览所有有历史记录的日期对话。

#### Scenario: Navigate to previous date with history
- **WHEN** 用户点击左箭头且存在更早日期的聊天记录
- **THEN** 切换到最近一个有聊天记录的历史日期，加载该日期的消息

#### Scenario: Navigate to next date with history
- **WHEN** 用户点击右箭头且存在更晚日期的聊天记录
- **THEN** 切换到下一个有聊天记录的历史日期

#### Scenario: No history dates available
- **WHEN** 只有今天的聊天记录（或没有任何记录）
- **THEN** 左右箭头隐藏或 disabled

#### Scenario: Past date conversation is read-only
- **WHEN** 用户查看历史日期的对话
- **THEN** 输入框和发送按钮隐藏或 disabled，显示提示「查看历史对话」
- **AND** 快捷按钮隐藏

#### Scenario: Return to today
- **WHEN** 用户正在查看历史日期，点击「回到今天」或点击右箭头到达今天
- **THEN** 切换到今天的对话，恢复可编辑状态（显示输入框和快捷按钮）

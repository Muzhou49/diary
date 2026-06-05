## Context

当前 AIChatDialog 是纯内存组件，打开即创建新对话，关闭后消息丢失。需要：
1. 快捷「帮我记录日记」按钮减少打字负担
2. 聊天记录跨会话持久化，用户可回顾之前和 AI 的对话

现有技术栈：Dexie.js（IndexedDB 封装），当前 schema version 1，仅有 entries 和 settings 两张表。

## Goals / Non-Goals

**Goals:**
- 输入框上方添加快捷操作栏，包含「帮我记录日记」等快捷操作按钮
- 聊天消息自动保存到 IndexedDB，按日期（date）分组为 session
- 再次进入聊天时，自动加载今日 session；若无则显示欢迎语
- 关闭聊天时保存当前消息，不丢失

**Non-Goals:**
- 不做跨设备同步
- 不改变 AI persona 或 API 路由逻辑

## Decisions

### Decision 1: 快捷按钮发送预设消息

**选择**: 输入框上方添加 chip 按钮组，点击「帮我记录日记」直接调用 sendMessage 逻辑，传入预设文本 `"帮我整理一下今天的感恩日记吧～"`。

**替代方案**:
- 方案 B（header 下拉菜单藏快捷操作）：交互路径太长，不直观 — 不采纳

**理由**: chip 按钮直接可见，一次点击即发送，符合用户"不用手打"的需求。

### Decision 2: 聊天存储按日期，支持浏览历史

**选择**: 以 `date` 字段（`YYYY-MM-DD`）标识 session，同一日期的对话全部追加到同一 session。数据库新增 `chatMessages` 表。

```
chatMessages: id, date, role, content, createdAt
```

加载逻辑：
- 进入聊天 → 默认加载今日消息；有则恢复对话，无则欢迎语
- header 显示日期，左右箭头可切换到有记录的其他日期
- 历史日期的对话只读查看，今日才能继续发送消息
- 新增 `getChatDates()` 查询所有有聊天记录的日期列表

**替代方案**:
- 方案 A（独立 session 列表页）：需要新增一个页面/Tab，切换成本高 — 不采纳，用箭头在聊天内切换更轻量
- 方案 B（整个 session 序列化为单条 JSON）：不便于增量追加 — 不采纳

**理由**: 按日期天然分区，箭头切换直观，不离开聊天界面即可查看所有历史。

### Decision 3: Dexie schema v2 升级

**选择**: 在 `db.ts` 中用 `this.version(2).stores()` 添加 `chatMessages` 表，保持向下兼容。

**理由**: Dexie 原生支持 schema 版本升级，不会影响已有 entries/settings 数据。

### Decision 4: 保存时机

**选择**: 每条消息发送/接收后即时写入 DB（`db.chatMessages.add()`），不等到关闭时才批量保存。

**理由**: 即时保存避免意外关闭丢数据，写入量极小（每条消息 O(1)），不影响性能。

## Risks / Trade-offs

- [风险] 聊天消息长期累积占用存储空间 → 缓和措施：IndexedDB 浏览器有 50MB+ 配额，文字消息占用极小；后续可加定期清理策略
- [风险] 用户跨日聊天（凌晨开始聊天，跨过零点）→ 缓和措施：打开聊天时使用打开时刻的日期作为 session date，聊到跨日不算新 session

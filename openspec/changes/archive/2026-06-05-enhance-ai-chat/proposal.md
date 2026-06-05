## Why

当前 AI 聊天（"和朋友聊"）功能每次进入都是全新对话，用户需要手动打字引导 AI 生成日记，且对话关闭后历史就丢失了。增加快捷操作和历史记录能提升日常使用体验。

## What Changes

- 在聊天输入框上方增加「帮我记录日记」快捷操作按钮，点击后自动发送预设文案，无需手动打字
- 将聊天消息持久化到 IndexedDB，支持按日期保存和加载历史对话
- 进入聊天时自动加载今日的历史对话（如有），无历史则展示初始欢迎语

## Capabilities

### New Capabilities
- `chat-quick-record`: 提供「帮我记录日记」快捷按钮，一键触发日记生成流程
- `chat-history`: 聊天记录持久化存储，按日期分组，支持加载历史对话

### Modified Capabilities
<!-- 无现有 spec 需要修改 -->

## Impact

- `components/write/AIChatDialog.tsx` — 添加快捷按钮 UI 和历史加载逻辑
- `lib/db.ts` — 新增聊天消息表（Dexie schema v2 upgrade）
- `lib/types.ts` — 新增 ChatMessage 和 ChatSession 类型
- `app/api/chat/route.ts` — 可根据需要调整 prompt 支持快捷触发

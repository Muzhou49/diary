## Why

聊天对话框中文字输入框和语音按钮始终不可见。根因是 CSS stacking context 问题：
- `AppShell` 内容区有 `relative z-[1]`，限制了内部 `fixed` 元素的 z-index
- 聊天对话框 `z-[60]` 被限制在 z=1 的容器内
- BottomNav `z-40` 作为同级元素反而在上层，遮挡输入区

## What Changes

### Fix 1: Stacking context
- AppShell 内容区移除 `relative z-[1]`，让对话框自由浮动

### Fix 2: Input always visible
- 移除 `isToday` 门控条件，输入区始终渲染
- 过去日期禁用输入框，显示"只能查看历史消息"
- 今日正常使用

### Fix 3: Voice input in chat
- 聊天对话框底部新增麦克风按钮
- 支持 Web Speech API 语音转文字
- 录音时红色脉冲指示条，说完自动发送

### Fix 4: Bottom padding
- 无效的 `pb-safe` 替换为 `env(safe-area-inset-bottom)`

## Capabilities

### New
- `chat-voice-input`: 聊天对话框语音输入
- `chat-input-visibility`: 输入区始终可见，不受日期判断影响

## Impact
- `components/layout/AppShell.tsx` — 移除 z-[1]
- `components/layout/BottomNav.tsx` — z-50 → z-40
- `components/write/AIChatDialog.tsx` — 语音输入 + 始终可见输入区

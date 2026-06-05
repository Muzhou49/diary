## 1. Data Layer — Chat Messages Storage

- [x] 1.1 Add `ChatMessage` type to lib/types.ts (id, date, role, content, createdAt)
- [x] 1.2 Add `chatMessages` table to Dexie schema (version 2 upgrade in lib/db.ts)
- [x] 1.3 Implement `saveChatMessage()`, `getChatMessagesByDate()`, and `getChatDates()` in lib/db.ts

## 2. Quick Action Button

- [x] 2.1 Add quick action chip button bar above input area in AIChatDialog
- [x] 2.2 Implement `sendQuickAction()` — sends preset message, respects loading state
- [x] 2.3 Ensure quick action button shows warm-toned chip style, consistent with app design

## 3. Chat History — Save, Load, Browse

- [x] 3.1 Save each message to DB on send and on receive (inside sendMessage and response handler)
- [x] 3.2 Load today's messages on mount, restore if non-empty, else show welcome
- [x] 3.3 Auto-scroll to bottom after loading history
- [x] 3.4 Add date navigation (left/right arrows) in header to browse past conversation dates
- [x] 3.5 Implement read-only mode for past dates: hide input, send button, and quick actions
- [x] 3.6 Add "回到今天" button when viewing past dates

## 4. Verify and Deploy

- [x] 4.1 Run `npm run build` to verify no compilation errors
- [x] 4.2 Test manually: send messages → close chat → reopen → verify messages restored
- [x] 4.3 Test manually: navigate to past dates → verify read-only → return to today
- [x] 4.4 Test manually: tap quick action button → verify auto-send and diary generation
- [x] 4.5 Deploy to Vercel

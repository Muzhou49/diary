## 1. Calendar Component Rewrite

- [x] 1.1 Rewrite CalendarHeatmap.tsx with number coloring: warm-500 for days with entries, #c0bfbc for empty days, 3px dot below entry days
- [x] 1.2 Today cell: solid warm-500 circle background with white number
- [x] 1.3 Remove all STREAK_ICONS and emoji from calendar grid
- [x] 1.4 Remove STREAK_ICONS array and getStreakIcon function

## 2. Visual Cleanup

- [x] 2.1 Update AppShell.tsx: replace `warm-gradient` background with `bg-[#fafaf9]`
- [x] 2.2 Update review/page.tsx: wrap calendar in white card (`bg-white rounded-2xl border border-black/5`) instead of glass-card
- [x] 2.3 Verify StreakBadge component still displays correctly

## 3. Verify and Deploy

- [x] 3.1 Run `npm run build` to verify no compilation errors
- [ ] 3.2 Run `npm run dev` and verify calendar on mobile viewport (375px)
- [ ] 3.3 Commit and deploy to Vercel

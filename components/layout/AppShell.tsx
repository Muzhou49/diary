'use client';

import BottomNav from './BottomNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-lg mx-auto min-h-screen pb-20 pt-6 px-5">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}

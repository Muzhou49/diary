'use client';

import BottomNav from './BottomNav';
import PageTransition from './PageTransition';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen warm-gradient relative">
      {/* Nature Distilled: subtle decorative leaves */}
      <svg
        className="nature-leaf nature-leaf-tl"
        width="180" height="200" viewBox="0 0 200 220"
        fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100 10C60 30 10 80 20 140C30 180 70 210 100 180C130 150 160 100 140 50C130 20 120 10 100 10Z"
          fill="#C67B5C" opacity="0.15" />
        <path d="M70 40C55 55 45 80 50 105" stroke="#C67B5C" strokeWidth="1.5" opacity="0.1" fill="none" />
        <path d="M110 30C95 50 85 80 90 110" stroke="#C67B5C" strokeWidth="1.2" opacity="0.08" fill="none" />
      </svg>
      <svg
        className="nature-leaf nature-leaf-br"
        width="160" height="180" viewBox="0 0 180 200"
        fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M80 20C110 10 150 40 140 90C135 120 100 160 60 150C30 140 10 100 30 60C40 40 60 25 80 20Z"
          fill="#6B7B3C" opacity="0.08" />
        <path d="M70 50C80 70 80 100 65 130" stroke="#6B7B3C" strokeWidth="1.2" opacity="0.06" fill="none" />
      </svg>

      <div className="max-w-lg mx-auto min-h-screen pb-20 pt-6 px-5">
        <PageTransition>
          {children}
        </PageTransition>
      </div>
      <BottomNav />
    </div>
  );
}

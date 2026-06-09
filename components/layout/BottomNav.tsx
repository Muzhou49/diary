'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PencilLine, CalendarHeart, BarChart3, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { href: '/write', label: '写日记', icon: PencilLine },
  { href: '/review', label: '回顾', icon: CalendarHeart },
  { href: '/analysis', label: '分析', icon: BarChart3 },
  { href: '/settings', label: '设置', icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[var(--z-overlay)] bg-white/85 backdrop-blur-xl border-t border-warm-200/50 safe-area-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px] flex-1 py-1"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-1 inset-x-0 h-1 bg-apricot rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={active ? 2.5 : 1.5}
                className={active ? 'text-warm-500' : 'text-muted-foreground'}
              />
              <span
                className={`text-xs ${active ? 'font-semibold text-warm-500' : 'text-muted-foreground'}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

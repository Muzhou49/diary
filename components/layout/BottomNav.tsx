'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PencilLine, CalendarHeart, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { href: '/write', label: '写日记', icon: PencilLine },
  { href: '/review', label: '回顾', icon: CalendarHeart },
  { href: '/settings', label: '设置', icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-warm-200/50 safe-area-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-4">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-1 py-1"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-1 inset-x-0 h-1 bg-apricot rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                size={22}
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

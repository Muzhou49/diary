'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { DiaryEntry } from '@/lib/types';
import { MOOD_EMOJIS, CATEGORY_LABELS } from '@/lib/types';

interface DiaryCardProps {
  entry: DiaryEntry;
}

export default function DiaryCard({ entry }: DiaryCardProps) {
  const preview = entry.content.length > 60
    ? entry.content.slice(0, 60) + '…'
    : entry.content;

  return (
    <Link href={`/diary?id=${entry.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
      >
        <div className="text-3xl flex-shrink-0">
          {MOOD_EMOJIS[entry.mood]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">{entry.date}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-warm-100 text-warm-600">
              {CATEGORY_LABELS[entry.category]?.split(' ')[1] || entry.category}
            </span>
          </div>
          <p className="text-sm text-foreground/80 line-clamp-2">{preview}</p>
        </div>
        <ChevronRight size={18} className="text-muted-foreground flex-shrink-0" />
      </motion.div>
    </Link>
  );
}

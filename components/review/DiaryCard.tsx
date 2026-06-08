'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { DiaryEntry, MoodType } from '@/lib/types';
import { MOOD_EMOJIS, CATEGORY_LABELS } from '@/lib/types';

interface DiaryCardProps {
  entry: DiaryEntry;
  index?: number;
}

const MOOD_GRADIENT: Record<MoodType, string> = {
  grateful: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50',
  happy: 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50',
  warm: 'bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50',
  calm: 'bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50',
  moved: 'bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50',
};

const MOOD_ACCENT: Record<MoodType, string> = {
  grateful: 'text-orange-500',
  happy: 'text-amber-500',
  warm: 'text-rose-500',
  calm: 'text-violet-500',
  moved: 'text-purple-500',
};

const MOOD_DOT: Record<MoodType, string> = {
  grateful: 'bg-orange-400',
  happy: 'bg-amber-400',
  warm: 'bg-rose-400',
  calm: 'bg-violet-400',
  moved: 'bg-purple-400',
};

export default function DiaryCard({ entry, index = 0 }: DiaryCardProps) {
  const preview = entry.content.length > 50
    ? entry.content.slice(0, 50) + '…'
    : entry.content;

  const mood = entry.mood as MoodType;

  return (
    <Link href={`/diary?id=${entry.id}`} className="block break-inside-avoid mb-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.06,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.97 }}
        className={`
          ${MOOD_GRADIENT[mood] || 'bg-gradient-to-br from-warm-50 to-cream'}
          rounded-2xl p-4
          border border-white/60
          shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]
          hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.10)]
          transition-shadow duration-300 cursor-pointer
        `}
      >
        {/* Top row: emoji + date + category */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shadow-sm">
            <span className="text-xl">{MOOD_EMOJIS[entry.mood]}</span>
          </div>
          <div className="flex-1">
            <div className={`text-[13px] font-semibold ${MOOD_ACCENT[mood] || 'text-warm-500'}`}>
              {entry.date.slice(5)}
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/70 text-warm-500 font-medium">
            {CATEGORY_LABELS[entry.category]?.split(' ')[1] || entry.category}
          </span>
        </div>

        {/* Content */}
        <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3">
          {preview}
        </p>

        {/* Decorative dot */}
        <div className="flex gap-1.5 mt-3">
          <div className={`w-1.5 h-1.5 rounded-full ${MOOD_DOT[mood] || 'bg-warm-300'}`} />
          <div className={`w-1.5 h-1.5 rounded-full ${MOOD_DOT[mood] || 'bg-warm-300'} opacity-60`} />
          <div className={`w-1.5 h-1.5 rounded-full ${MOOD_DOT[mood] || 'bg-warm-300'} opacity-30`} />
        </div>
      </motion.div>
    </Link>
  );
}

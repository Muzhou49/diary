'use client';

import { motion } from 'framer-motion';
import type { MoodType } from '@/lib/types';
import { MOOD_EMOJIS, MOOD_LABELS } from '@/lib/types';

interface MoodSelectorProps {
  selected?: MoodType;
  onChange: (mood: MoodType) => void;
}

const moods = Object.entries(MOOD_EMOJIS).map(([key, emoji]) => ({
  key: key as MoodType,
  emoji,
  label: MOOD_LABELS[key as MoodType],
}));

export default function MoodSelector({ selected, onChange }: MoodSelectorProps) {
  return (
    <div className="flex gap-3 justify-center py-4 overflow-x-auto">
      {moods.map(({ key, emoji, label }) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(key)}
          className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
            selected === key
              ? 'bg-warm-200 shadow-md scale-110'
              : 'bg-white/50 hover:bg-white/80'
          }`}
        >
          <span className="text-3xl">{emoji}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}

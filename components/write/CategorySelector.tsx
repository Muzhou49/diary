'use client';

import { motion } from 'framer-motion';
import type { GratitudeCategory } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/types';

interface CategorySelectorProps {
  selected?: GratitudeCategory;
  onChange: (category: GratitudeCategory) => void;
}

const categories = Object.entries(CATEGORY_LABELS) as [GratitudeCategory, string][];

export default function CategorySelector({ selected, onChange }: CategorySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center py-3">
      {categories.map(([key, label]) => (
        <motion.button
          key={key}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === key
              ? 'bg-warm-500 text-white shadow-md'
              : 'bg-white/60 text-muted-foreground hover:bg-white'
          }`}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}

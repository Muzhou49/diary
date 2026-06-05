'use client';

import { motion } from 'framer-motion';
import type { GratitudeCategory } from '@/lib/types';
import { getDailyPrompt } from '@/lib/prompts';

interface DailyPromptProps {
  category?: GratitudeCategory;
  onChangeCategory: (category: GratitudeCategory) => void;
}

export default function DailyPrompt({ category }: DailyPromptProps) {
  const today = new Date().toISOString().slice(0, 10);
  const prompt = getDailyPrompt(today, category);

  return (
    <motion.div
      key={prompt.id}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-4"
    >
      <p className="font-display text-xl text-warm-500 leading-relaxed text-balance">
        {prompt.text}
      </p>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
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
      initial={{ opacity: 0, y: -16, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      {/* Handcrafted card */}
      <div className="relative bg-gradient-to-br from-[#FFFBF5] via-[#FFF8F0] to-[#FEF0E6] rounded-[28px] p-6 shadow-lg shadow-warm-200/30 border border-[#F5E6D8]/50 overflow-hidden">
        {/* Decorative top accent line */}
        <div className="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-transparent via-warm-300 to-transparent rounded-full" />

        {/* Decorative corner dots */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-warm-300/40" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-warm-300/40" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-warm-300/30" />
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-warm-300/30" />

        {/* Book icon */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 rounded-2xl bg-warm-100 flex items-center justify-center shadow-sm">
            <BookOpen size={18} className="text-warm-400" />
          </div>
        </div>

        {/* Prompt text */}
        <p className="font-display text-lg text-warm-500 leading-relaxed text-center text-balance">
          {prompt.text}
        </p>

        {/* Decorative bottom line */}
        <div className="flex justify-center gap-1.5 mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-warm-300/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-warm-300/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-warm-300/15" />
        </div>
      </div>
    </motion.div>
  );
}

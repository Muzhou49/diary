'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { getStreakCount } from '@/lib/db';

export default function StreakBadge() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    getStreakCount().then(setStreak);
  }, []);

  if (streak === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex items-center justify-center gap-2 py-2"
    >
      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-200/60 rounded-full text-sm font-semibold text-warm-600">
        <Flame size={18} className="text-warm-500" />
        连续感恩第 {streak} 天
      </span>
    </motion.div>
  );
}

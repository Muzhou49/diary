'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { getStreakCount } from '@/lib/db';

function getStreakTier(streak: number) {
  if (streak >= 30) return { bg: 'bg-clover-100', text: 'text-clover-500', flame: 'text-clover-400', label: '🔥 大师' };
  if (streak >= 14) return { bg: 'bg-sage-100', text: 'text-sage-500', flame: 'text-sage-400', label: '🌿 坚持' };
  if (streak >= 7) return { bg: 'bg-warm-200/60', text: 'text-warm-600', flame: 'text-warm-500', label: '⭐ 一周' };
  return { bg: 'bg-warm-200/60', text: 'text-warm-600', flame: 'text-warm-500', label: '' };
}

export default function StreakBadge() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    getStreakCount().then(setStreak);
  }, []);

  if (streak === 0) return null;

  const tier = getStreakTier(streak);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex items-center justify-center gap-2 py-2"
    >
      <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold ${tier.bg} ${tier.text}`}>
        <Flame size={18} className={tier.flame} />
        连续感恩第 {streak} 天
        {tier.label && (
          <span className="text-xs opacity-70 ml-0.5">{tier.label}</span>
        )}
      </span>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => Promise<void>;
  disabled?: boolean;
}

const PARTICLE_COLORS = ['text-warm-400', 'text-amber-400', 'text-rose-400', 'text-warm-300'];
const PARTICLE_EMOJIS = ['✦', '✧', '⋆', '·'];

function randomParticle() {
  return {
    x: (Math.random() - 0.5) * 160,
    y: -(Math.random() * 80 + 20),
    size: Math.random() * 10 + 8,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    symbol: PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)],
    delay: Math.random() * 0.2,
  };
}

export default function SaveButton({ onClick, disabled }: SaveButtonProps) {
  const [saving, setSaving] = useState(false);
  const [particles, setParticles] = useState<ReturnType<typeof randomParticle>[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onClick();
    setSaving(false);

    // Generate celebration particles
    setParticles(Array.from({ length: 12 }, () => randomParticle()));
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  return (
    <div className="relative flex justify-center py-8">
      {/* Celebration particles */}
      <AnimatePresence>
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {particles.map((p, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
                transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
                className={`absolute text-xl ${p.color}`}
                style={{ fontSize: p.size }}
              >
                {p.symbol}
              </motion.span>
            ))}
            {/* Success glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="w-16 h-16 rounded-full bg-warm-300/30 absolute"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Save button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={handleSave}
        disabled={disabled || saving}
        className="relative inline-flex items-center gap-2 px-10 py-3.5
          bg-warm-500 text-white font-semibold rounded-full
          shadow-lg shadow-warm-300/30 hover:shadow-xl hover:shadow-warm-300/40
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg
          transition-shadow duration-300"
      >
        <Sparkles size={18} />
        {saving ? '保存中…' : '保存日记'}
      </motion.button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SaveButtonProps {
  onClick: () => Promise<void>;
  disabled?: boolean;
}

export default function SaveButton({ onClick, disabled }: SaveButtonProps) {
  const [saving, setSaving] = useState(false);
  const [showStar, setShowStar] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onClick();
    setSaving(false);
    setShowStar(true);
    setTimeout(() => setShowStar(false), 1500);
  };

  return (
    <div className="relative flex justify-center py-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        disabled={disabled || saving}
        className="px-10 py-3 bg-warm-500 text-white font-semibold rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? '保存中…' : '✨ 保存日记'}
      </motion.button>

      <AnimatePresence>
        {showStar && (
          <motion.div
            initial={{ opacity: 1, y: 0, x: 20 }}
            animate={{ opacity: 0, y: -50, x: 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 right-1/3 text-2xl pointer-events-none"
          >
            🌟
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

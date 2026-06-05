'use client';

import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { chatWithDeepSeek, POLISH_SYSTEM_PROMPT } from '@/lib/deepseek';

interface PolishButtonProps {
  content: string;
  apiKey?: string;
  onPolished: (polished: string) => void;
}

export default function PolishButton({ content, apiKey, onPolished }: PolishButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePolish = async () => {
    if (!content.trim() || !apiKey) return;
    setLoading(true);
    try {
      const polished = await chatWithDeepSeek([
        { role: 'system', content: POLISH_SYSTEM_PROMPT },
        { role: 'user', content: `请帮我润色这段感恩日记：${content.trim()}` },
      ], apiKey);
      if (polished) {
        onPolished(polished);
      }
    } catch {
      // silently fail - user can try again
    } finally {
      setLoading(false);
    }
  };

  if (!apiKey) return null;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handlePolish}
      disabled={loading || !content.trim()}
      className="flex items-center gap-2 px-5 py-2 rounded-full bg-lavender text-warm-500 text-sm font-medium disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Wand2 size={16} />
      )}
      {loading ? '润色中…' : 'AI 润色'}
    </motion.button>
  );
}

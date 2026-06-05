'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Trash2 } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import { getEntry, deleteEntry } from '@/lib/db';
import { MOOD_EMOJIS, CATEGORY_LABELS, MOOD_LABELS } from '@/lib/types';
import type { DiaryEntry } from '@/lib/types';

export default function DiaryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);

  const id = params.id as string;

  useEffect(() => {
    getEntry(id).then((result) => setEntry(result ?? null));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('确定要删除这篇日记吗？')) return;
    await deleteEntry(id);
    router.push('/review');
  };

  if (!entry) {
    return (
      <AppShell>
        <p className="text-center text-muted-foreground py-12">日记不存在</p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-muted-foreground hover:text-warm-500"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">返回</span>
          </button>
          <button onClick={handleDelete} className="text-muted-foreground hover:text-red-400">
            <Trash2 size={18} />
          </button>
        </div>

        <div className="text-center">
          <span className="text-5xl">{MOOD_EMOJIS[entry.mood]}</span>
          <h2 className="font-display text-xl font-semibold text-warm-500 mt-2">
            {MOOD_LABELS[entry.mood]}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{entry.date}</p>
        </div>

        <div className="flex justify-center">
          <span className="px-4 py-1.5 rounded-full bg-warm-100 text-warm-600 text-sm font-medium">
            {CATEGORY_LABELS[entry.category]}
          </span>
        </div>

        <div className="glass-card p-6">
          <p className="text-base leading-relaxed whitespace-pre-wrap">{entry.content}</p>
        </div>

        {entry.rawContent && (
          <div className="glass-card p-4 opacity-70">
            <p className="text-xs text-muted-foreground mb-1">原始转录</p>
            <p className="text-sm text-muted-foreground">{entry.rawContent}</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}

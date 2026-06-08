'use client';

import { useState, useEffect, useMemo } from 'react';
import AppShell from '@/components/layout/AppShell';
import StreakBadge from '@/components/review/StreakBadge';
import DiaryCard from '@/components/review/DiaryCard';
import { getAllEntries } from '@/lib/db';
import { MOOD_EMOJIS, MOOD_LABELS, CATEGORY_LABELS } from '@/lib/types';
import type { DiaryEntry, MoodType } from '@/lib/types';
import { Search, ChevronDown } from 'lucide-react';

function groupByMonth(entries: DiaryEntry[]): Map<string, DiaryEntry[]> {
  const groups = new Map<string, DiaryEntry[]>();
  for (const entry of entries) {
    const monthKey = entry.date.slice(0, 7);
    if (!groups.has(monthKey)) groups.set(monthKey, []);
    groups.get(monthKey)!.push(entry);
  }
  return new Map(Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0])));
}

function formatMonthLabel(key: string): string {
  const [y, m] = key.split('-');
  return `${y}年${parseInt(m)}月`;
}

function getMonthCountLabel(key: string, count: number): string {
  if (key === new Date().toISOString().slice(0, 7)) return '本月';
  return `${count} 篇`;
}

export default function ReviewPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [query, setQuery] = useState('');
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  const thisMonth = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    getAllEntries().then((all) => {
      setEntries(all);
      // Auto-expand current month
      const hasThisMonth = all.some((e) => e.date.startsWith(thisMonth));
      if (hasThisMonth) {
        setExpandedMonths(new Set([thisMonth]));
      }
    });
  }, [thisMonth]);

  // Filter by search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) => {
      return (
        e.content.toLowerCase().includes(q) ||
        (MOOD_LABELS[e.mood as MoodType] || '').includes(q) ||
        (MOOD_EMOJIS[e.mood as MoodType] || '').includes(q) ||
        (CATEGORY_LABELS[e.category as keyof typeof CATEGORY_LABELS] || '').includes(q) ||
        e.date.includes(q)
      );
    });
  }, [entries, query]);

  const grouped = useMemo(() => groupByMonth(filtered), [filtered]);

  const toggleMonth = (key: string) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-bold text-warm-500 text-center">
          你的感恩之路 🌷
        </h1>

        <StreakBadge />

        {/* Search bar */}
        {entries.length > 0 && (
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索日记内容、心情、分类..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white/70 text-sm outline-none focus:ring-2 ring-warm-300 transition-shadow"
            />
          </div>
        )}

        {entries.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            还没有日记，去写一篇吧 ✍️
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            没有找到匹配的日记 🧐
          </p>
        ) : (
          <div className="space-y-2">
            {Array.from(grouped.entries()).map(([monthKey, monthEntries]) => {
              const isExpanded = expandedMonths.has(monthKey);
              return (
                <div key={monthKey}>
                  {/* Month header */}
                  <button
                    onClick={() => toggleMonth(monthKey)}
                    className="w-full flex items-center gap-2.5 py-3 group"
                  >
                    <ChevronDown
                      size={16}
                      className={`text-warm-400 transition-transform duration-300 ${isExpanded ? '' : '-rotate-90'}`}
                    />
                    <span className="font-display text-lg font-bold text-warm-500">
                      {formatMonthLabel(monthKey)}
                    </span>
                    <span className="text-xs text-muted-foreground bg-warm-100/70 px-2 py-0.5 rounded-full">
                      {getMonthCountLabel(monthKey, monthEntries.length)}
                    </span>
                  </button>

                  {/* Diary cards — masonry layout */}
                  {isExpanded && (
                    <div className="columns-2 gap-3">
                      {monthEntries.map((entry, i) => (
                        <DiaryCard key={entry.id} entry={entry} index={i} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}

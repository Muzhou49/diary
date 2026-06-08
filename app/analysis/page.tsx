'use client';

import { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { RefreshCw, Loader2, Sparkles } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import { getAllEntries, getMoodStats, getCategoryStats, getSettings, saveSettings } from '@/lib/db';
import { MOOD_EMOJIS, MOOD_LABELS, CATEGORY_LABELS } from '@/lib/types';
import { chatWithDeepSeek, MONTHLY_SUMMARY_PROMPT } from '@/lib/deepseek';
import type { DiaryEntry, MoodType } from '@/lib/types';

const MOOD_COLORS: Record<MoodType, string> = {
  grateful: '#F5A67F',
  happy: '#FAC898',
  warm: '#F2C4C4',
  calm: '#E8D5E0',
  moved: '#C4A7D0',
};

function computeLongestStreak(allDates: string[]): number {
  const unique = Array.from(new Set(allDates)).sort();
  if (unique.length === 0) return 0;

  let longest = 1;
  let current = 1;
  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1]);
    const curr = new Date(unique[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}

function buildSummaryPrompt(entries: DiaryEntry[]): string {
  const lines = entries.map((e) => {
    const catLabel = CATEGORY_LABELS[e.category as keyof typeof CATEGORY_LABELS] || e.category;
    const moodLabel = MOOD_LABELS[e.mood as MoodType] || e.mood;
    return `- ${e.date} | ${moodLabel} | ${catLabel} | ${e.content.slice(0, 60)}`;
  });
  return `这是我的本月感恩日记数据：\n\n${lines.join('\n')}\n\n请帮我总结这个月的感恩日记。`;
}

interface StatCardProps {
  value: number;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-white/70 rounded-2xl p-4 text-center">
      <div className="text-2xl font-bold text-warm-500">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default function AnalysisPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [moodData, setMoodData] = useState<{ name: string; value: number; emoji: string }[]>([]);
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [thisMonthCount, setThisMonthCount] = useState(0);

  // AI summary state
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const today = new Date();
  const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

  useEffect(() => {
    (async () => {
      const all = await getAllEntries();
      setEntries(all);

      // Stats
      const moodStats = await getMoodStats();
      const catStats = await getCategoryStats();

      setMoodData(
        Array.from(moodStats.entries()).map(([mood, count]) => ({
          name: MOOD_LABELS[mood as MoodType] || mood,
          value: count,
          emoji: MOOD_EMOJIS[mood as MoodType] || '',
        }))
      );

      setCategoryData(
        Array.from(catStats.entries())
          .map(([cat, count]) => ({
            name: CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat,
            value: count,
          }))
          .sort((a, b) => b.value - a.value)
      );

      // Streak
      const dates = all.map((e) => e.date);
      setLongestStreak(computeLongestStreak(dates));

      // Compute current streak
      const uniqueDates = Array.from(new Set(dates)).sort().reverse();
      let s = 0;
      const check = new Date();
      while (true) {
        const ds = check.toISOString().slice(0, 10);
        if (uniqueDates.includes(ds)) {
          s++;
          check.setDate(check.getDate() - 1);
        } else if (ds === new Date().toISOString().slice(0, 10)) {
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
      setStreak(s);

      // This month count
      setThisMonthCount(all.filter((e) => e.date.startsWith(thisMonth)).length);

      // Settings for API key
      const settings = await getSettings();
      setApiKey(settings.deepseekApiKey || null);
    })();
  }, [thisMonth]);

  // AI Summary
  const loadAiSummary = useCallback(async () => {
    if (!apiKey) return;
    const cacheKey = `ai-summary-${thisMonth}`;
    const settings = await getSettings();

    // Check cache
    const cached = (settings as Record<string, string>)[cacheKey];
    if (cached) {
      setAiSummary(cached);
      return;
    }

    const monthEntries = entries.filter((e) => e.date.startsWith(thisMonth));
    if (monthEntries.length === 0) return;

    setSummaryLoading(true);
    try {
      const summary = await chatWithDeepSeek([
        { role: 'system', content: MONTHLY_SUMMARY_PROMPT },
        { role: 'user', content: buildSummaryPrompt(monthEntries) },
      ], apiKey);

      setAiSummary(summary);
      // Cache to settings
      await saveSettings({ ...settings, [cacheKey]: summary });
    } catch {
      setAiSummary(null);
    } finally {
      setSummaryLoading(false);
    }
  }, [apiKey, thisMonth, entries]);

  useEffect(() => {
    if (apiKey && entries.length > 0) {
      loadAiSummary();
    }
  }, [apiKey, entries.length > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefreshSummary = async () => {
    if (!apiKey) return;
    const cacheKey = `ai-summary-${thisMonth}`;
    const settings = await getSettings();
    delete (settings as Record<string, string>)[cacheKey];
    await saveSettings(settings);
    setAiSummary(null);
    loadAiSummary();
  };

  const monthEntries = entries.filter((e) => e.date.startsWith(thisMonth));

  return (
    <AppShell>
      <div className="space-y-5">
        <h1 className="font-display text-2xl font-bold text-warm-500 text-center">
          你的感恩分析 📊
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-2">
          <StatCard value={entries.length} label="总篇数" />
          <StatCard value={thisMonthCount} label="本月" />
          <StatCard value={streak} label="连续" />
          <StatCard value={longestStreak} label="最长" />
        </div>

        {/* Mood Distribution */}
        <div className="glass-card p-5">
          <h3 className="font-display text-base font-semibold text-warm-500 mb-3">
            情绪分布
          </h3>
          {moodData.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">
              还没有数据，去写一篇日记吧 ✨
            </p>
          ) : (
            <div className="flex items-center">
              <div className="w-32 h-32 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={48}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {moodData.map((_, i) => (
                        <Cell key={i} fill={Object.values(MOOD_COLORS)[i % 5]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1.5 ml-3">
                {moodData.map((m) => (
                  <div key={m.name} className="flex items-center gap-2 text-sm">
                    <span>{m.emoji}</span>
                    <span className="text-muted-foreground">{m.name}</span>
                    <span className="font-semibold text-warm-500 ml-auto">{m.value}次</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category Ranking */}
        <div className="glass-card p-5">
          <h3 className="font-display text-base font-semibold text-warm-500 mb-3">
            感恩分类排行
          </h3>
          {categoryData.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-6">
              记录多了就会出现了～
            </p>
          ) : (
            <div className="space-y-2.5">
              {categoryData.slice(0, 5).map((cat, i) => (
                <div key={cat.name} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-warm-400 w-5">{i + 1}</span>
                  <span className="flex-1 text-sm">{cat.name}</span>
                  <div className="w-28 h-2 bg-warm-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-warm-400 rounded-full transition-all"
                      style={{ width: `${(cat.value / categoryData[0].value) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-6 text-right">{cat.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Monthly Summary */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-base font-semibold text-warm-500 flex items-center gap-1.5">
              <Sparkles size={16} />
              AI 月度回顾
            </h3>
            {aiSummary && (
              <button
                onClick={handleRefreshSummary}
                disabled={summaryLoading}
                className="text-muted-foreground hover:text-warm-500 transition-colors"
              >
                <RefreshCw size={15} className={summaryLoading ? 'animate-spin' : ''} />
              </button>
            )}
          </div>

          {!apiKey ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              配置 API Key 后可以生成 AI 月度总结～
            </p>
          ) : monthEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              写完日记后可以生成月度总结哦～
            </p>
          ) : summaryLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
              <Loader2 size={14} className="animate-spin" />
              正在生成本月总结…
            </div>
          ) : aiSummary ? (
            <p className="text-sm leading-relaxed text-foreground/80">{aiSummary}</p>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              生成失败了，稍后再试吧～
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getMoodStats, getCategoryStats, getAllEntries } from '@/lib/db';
import { MOOD_EMOJIS, MOOD_LABELS, CATEGORY_LABELS } from '@/lib/types';
import type { MoodType } from '@/lib/types';

const MOOD_COLORS: Record<MoodType, string> = {
  grateful: '#F5A67F',
  happy: '#FAC898',
  warm: '#F2C4C4',
  calm: '#E8D5E0',
  moved: '#C4A7D0',
};

export default function MoodTrendChart() {
  const [moodData, setMoodData] = useState<{ name: string; value: number; emoji: string }[]>([]);
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    (async () => {
      const moodStats = await getMoodStats();
      const catStats = await getCategoryStats();
      const entries = await getAllEntries();
      setTotalEntries(entries.length);

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
    })();
  }, []);

  const topCategory = categoryData[0];

  return (
    <div className="space-y-4">
      <div className="glass-card p-5">
        <h3 className="font-display text-base font-semibold text-warm-500 mb-3">情绪分布</h3>
        {moodData.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">还没有数据，去写一篇日记吧 ✨</p>
        ) : (
          <div className="flex items-center">
            <div className="w-36 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {moodData.map((entry, i) => (
                      <Cell key={i} fill={Object.values(MOOD_COLORS)[i % 5]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5 ml-2">
              {moodData.map((m) => (
                <div key={m.name} className="flex items-center gap-2 text-sm">
                  <span>{m.emoji}</span>
                  <span className="text-muted-foreground">{m.name}</span>
                  <span className="font-semibold text-warm-500">{m.value}次</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="glass-card p-5">
        <h3 className="font-display text-base font-semibold text-warm-500 mb-3">感恩分类排行</h3>
        {categoryData.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-6">记录多了就会出现了～</p>
        ) : (
          <div className="space-y-2">
            {categoryData.slice(0, 5).map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-warm-400 w-5">{i + 1}</span>
                <span className="flex-1 text-sm">{cat.name}</span>
                <div className="w-32 h-2 bg-warm-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warm-400 rounded-full"
                    style={{ width: `${(cat.value / categoryData[0].value) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{cat.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalEntries > 0 && (
        <div className="text-center text-sm text-muted-foreground py-2">
          这个月你记录了 <span className="font-semibold text-warm-500">{totalEntries}</span> 篇感恩日记
          {topCategory && `，感恩最多的是 ${topCategory.name} ❤️`}
        </div>
      )}
    </div>
  );
}

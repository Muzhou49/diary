'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/layout/AppShell';
import CalendarHeatmap from '@/components/review/CalendarHeatmap';
import MoodTrendChart from '@/components/review/MoodTrendChart';
import StreakBadge from '@/components/review/StreakBadge';
import DiaryCard from '@/components/review/DiaryCard';
import { getAllEntries } from '@/lib/db';
import type { DiaryEntry } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ReviewPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(setEntries);
  }, []);

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-bold text-warm-500 text-center">
          你的感恩之路 🌷
        </h1>

        <StreakBadge />

        <Tabs defaultValue="calendar">
          <TabsList className="w-full bg-white/50">
            <TabsTrigger value="calendar" className="flex-1">日历</TabsTrigger>
            <TabsTrigger value="trends" className="flex-1">趋势</TabsTrigger>
            <TabsTrigger value="list" className="flex-1">列表</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-4">
            <CalendarHeatmap />
          </TabsContent>

          <TabsContent value="trends" className="mt-4">
            <MoodTrendChart />
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            {entries.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                还没有日记，去写一篇吧 ✍️
              </p>
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <DiaryCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

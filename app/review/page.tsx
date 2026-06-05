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
      <div className="space-y-5">
        <StreakBadge />

        <Tabs defaultValue="calendar">
          <TabsList className="w-full bg-white rounded-xl border border-black/5 p-1">
            <TabsTrigger value="calendar" className="flex-1 rounded-lg data-[state=active]:bg-warm-100 data-[state=active]:text-warm-600 text-sm">日历</TabsTrigger>
            <TabsTrigger value="trends" className="flex-1 rounded-lg data-[state=active]:bg-warm-100 data-[state=active]:text-warm-600 text-sm">趋势</TabsTrigger>
            <TabsTrigger value="list" className="flex-1 rounded-lg data-[state=active]:bg-warm-100 data-[state=active]:text-warm-600 text-sm">列表</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-4">
            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <CalendarHeatmap />
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-4">
            <MoodTrendChart />
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            {entries.length === 0 ? (
              <div className="bg-white rounded-2xl border border-black/5 p-10 text-center">
                <p className="text-4xl mb-3">✍️</p>
                <p className="text-muted-foreground text-sm">还没有日记，去写一篇吧</p>
              </div>
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

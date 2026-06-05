'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getEntriesByMonth } from '@/lib/db';
import type { DiaryEntry } from '@/lib/types';

const STREAK_ICONS = ['🌱', '🌸', '🌻', '🌟'];

function getStreakIcon(streak: number): string {
  if (streak >= 30) return STREAK_ICONS[3];
  if (streak >= 7) return STREAK_ICONS[2];
  if (streak >= 3) return STREAK_ICONS[1];
  return STREAK_ICONS[0];
}

interface CalendarHeatmapProps {
  onSelectDate?: (date: string) => void;
}

export default function CalendarHeatmap({ onSelectDate }: CalendarHeatmapProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entriesByDate, setEntriesByDate] = useState<Map<string, DiaryEntry>>(new Map());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    getEntriesByMonth(year, month + 1).then((entries) => {
      const map = new Map<string, DiaryEntry>();
      for (const entry of entries) {
        if (!map.has(entry.date) || entry.createdAt > (map.get(entry.date)?.createdAt || 0)) {
          map.set(entry.date, entry);
        }
      }
      setEntriesByDate(map);
    });
  }, [year, month]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const today = new Date().toISOString().slice(0, 10);

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const weekDayLabels = ['日', '一', '二', '三', '四', '五', '六'];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-muted-foreground hover:text-warm-500">
          <ChevronLeft size={20} />
        </button>
        <span className="font-display text-lg font-semibold text-warm-500">
          {year}年{month + 1}月
        </span>
        <button onClick={nextMonth} className="text-muted-foreground hover:text-warm-500">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDayLabels.map((label) => (
          <div key={label} className="text-center text-xs text-muted-foreground py-1">
            {label}
          </div>
        ))}
        {weeks.flat().map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const entry = entriesByDate.get(dateStr);
          const isToday = dateStr === today;

          return (
            <button
              key={dateStr}
              onClick={() => entry && onSelectDate?.(dateStr)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm relative ${
                entry
                  ? 'bg-warm-300/50 hover:bg-warm-300 font-medium text-warm-700'
                  : 'hover:bg-white/50 text-muted-foreground'
              } ${isToday ? 'ring-2 ring-warm-400' : ''}`}
            >
              <span>{day}</span>
              {entry && (
                <span className="absolute -bottom-0.5 text-[10px]">
                  {getStreakIcon(1)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

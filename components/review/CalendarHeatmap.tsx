'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getEntriesByMonth } from '@/lib/db';
import type { DiaryEntry } from '@/lib/types';

interface CalendarHeatmapProps {
  onSelectDate?: (date: string) => void;
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export default function CalendarHeatmap({ onSelectDate }: CalendarHeatmapProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entriesByDate, setEntriesByDate] = useState<Map<string, DiaryEntry>>(new Map());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    getEntriesByMonth(year, month + 1).then((entries) => {
      const map = new Map<string, DiaryEntry>();
      for (const entry of entries) {
        if (!map.has(entry.date)) {
          map.set(entry.date, entry);
        }
      }
      setEntriesByDate(map);
    });
  }, [year, month]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const today = new Date().toISOString().slice(0, 10);

  // Build calendar grid
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div>
      {/* Month header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-muted-foreground"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-base font-semibold text-foreground">
          {year}年 {month + 1}月
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-muted-foreground"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-2">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasEntry = entriesByDate.has(dateStr);
          const isToday = dateStr === today;

          return (
            <button
              key={dateStr}
              onClick={() => hasEntry && onSelectDate?.(dateStr)}
              disabled={!hasEntry}
              className="flex flex-col items-center py-1.5"
            >
              <span
                className={`
                  w-9 h-9 flex items-center justify-center rounded-full text-sm
                  ${isToday
                    ? 'bg-warm-500 text-white font-semibold'
                    : hasEntry
                      ? 'hover:bg-warm-100 font-medium text-foreground'
                      : 'text-muted-foreground'
                  }
                `}
              >
                {day}
              </span>
              {hasEntry && (
                <span className="w-1 h-1 rounded-full bg-warm-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

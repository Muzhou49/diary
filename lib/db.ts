import Dexie, { type Table } from 'dexie';
import type { DiaryEntry, DiaryEntryInput, UserSettings } from './types';

class GratitudeDB extends Dexie {
  entries!: Table<DiaryEntry, string>;
  settings!: Table<UserSettings, string>;

  constructor() {
    super('GratitudeDiary');
    this.version(1).stores({
      entries: 'id, date, category, mood, createdAt',
      settings: 'id',
    });
  }
}

export const db = new GratitudeDB();

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function createEntry(input: DiaryEntryInput): Promise<DiaryEntry> {
  const now = Date.now();
  const entry: DiaryEntry = {
    id: generateId(),
    ...input,
    createdAt: now,
    updatedAt: now,
  };
  await db.entries.add(entry);
  return entry;
}

export async function updateEntry(id: string, updates: Partial<DiaryEntryInput>): Promise<DiaryEntry | undefined> {
  const existing = await db.entries.get(id);
  if (!existing) return undefined;

  const updated: DiaryEntry = {
    ...existing,
    ...updates,
    updatedAt: Date.now(),
  };
  await db.entries.put(updated);
  return updated;
}

export async function deleteEntry(id: string): Promise<void> {
  await db.entries.delete(id);
}

export async function getEntry(id: string): Promise<DiaryEntry | undefined> {
  return db.entries.get(id);
}

export async function getEntriesByDateRange(start: string, end: string): Promise<DiaryEntry[]> {
  return db.entries
    .where('date')
    .between(start, end, true, true)
    .reverse()
    .toArray();
}

export async function getEntriesByMonth(year: number, month: number): Promise<DiaryEntry[]> {
  const start = `${year}-${String(month).padStart(2, '0')}-01`;
  const end = `${year}-${String(month).padStart(2, '0')}-31`;
  return getEntriesByDateRange(start, end);
}

export async function getAllEntries(): Promise<DiaryEntry[]> {
  return db.entries.orderBy('createdAt').reverse().toArray();
}

export async function getEntryDates(): Promise<Set<string>> {
  const entries = await db.entries.toArray();
  return new Set(entries.map((e) => e.date));
}

export async function getEntryByDate(date: string): Promise<DiaryEntry | undefined> {
  return db.entries.where('date').equals(date).first();
}

export async function getStreakCount(): Promise<number> {
  const allDates = (await db.entries.orderBy('date').reverse().toArray()).map((e) => e.date);
  const uniqueDates = Array.from(new Set(allDates)).sort().reverse();

  if (uniqueDates.length === 0) return 0;

  let streak = 0;
  const current = new Date();

  while (true) {
    const dateStr = current.toISOString().slice(0, 10);
    if (uniqueDates.includes(dateStr)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else if (dateStr === new Date().toISOString().slice(0, 10)) {
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export async function getMoodStats(): Promise<Map<string, number>> {
  const entries = await db.entries.toArray();
  const stats = new Map<string, number>();
  for (const entry of entries) {
    stats.set(entry.mood, (stats.get(entry.mood) || 0) + 1);
  }
  return stats;
}

export async function getCategoryStats(): Promise<Map<string, number>> {
  const entries = await db.entries.toArray();
  const stats = new Map<string, number>();
  for (const entry of entries) {
    stats.set(entry.category, (stats.get(entry.category) || 0) + 1);
  }
  return stats;
}

// Settings
export async function getSettings(): Promise<UserSettings> {
  return (await db.settings.get('user')) || {};
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  await db.settings.put({ id: 'user' as string, ...settings } as UserSettings & { id: string });
}

export async function exportAllData(): Promise<string> {
  const entries = await db.entries.toArray();
  const settings = await getSettings();
  const data = { entries, settings, exportedAt: new Date().toISOString() };
  return JSON.stringify(data, null, 2);
}

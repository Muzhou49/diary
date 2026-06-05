import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  createEntry,
  getEntry,
  updateEntry,
  deleteEntry,
  getEntriesByDateRange,
  getStreakCount,
} from '@/lib/db';
import { db } from '@/lib/db';

describe('Diary DB', () => {
  beforeEach(async () => {
    await db.entries.clear();
  });

  afterEach(async () => {
    await db.entries.clear();
  });

  it('should create and retrieve an entry', async () => {
    const input = {
      date: '2026-06-05',
      content: '今天阳光很好，感恩好天气。',
      category: 'everyday' as const,
      mood: 'happy' as const,
    };

    const entry = await createEntry(input);
    expect(entry.id).toBeDefined();
    expect(entry.content).toBe(input.content);

    const retrieved = await getEntry(entry.id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.content).toBe(input.content);
  });

  it('should update an entry', async () => {
    const entry = await createEntry({
      date: '2026-06-05',
      content: 'Original',
      category: 'everyday',
      mood: 'calm',
    });

    const updated = await updateEntry(entry.id, { content: 'Updated' });
    expect(updated?.content).toBe('Updated');

    const retrieved = await getEntry(entry.id);
    expect(retrieved?.content).toBe('Updated');
  });

  it('should delete an entry', async () => {
    const entry = await createEntry({
      date: '2026-06-05',
      content: 'To delete',
      category: 'everyday',
      mood: 'calm',
    });

    await deleteEntry(entry.id);
    const retrieved = await getEntry(entry.id);
    expect(retrieved).toBeUndefined();
  });

  it('should query entries by date range', async () => {
    await createEntry({ date: '2026-06-01', content: 'A', category: 'everyday', mood: 'happy' });
    await createEntry({ date: '2026-06-05', content: 'B', category: 'family', mood: 'grateful' });
    await createEntry({ date: '2026-06-10', content: 'C', category: 'work', mood: 'calm' });

    const results = await getEntriesByDateRange('2026-06-01', '2026-06-07');
    expect(results.length).toBe(2);
  });

  it('should calculate streak count', async () => {
    const today = new Date().toISOString().slice(0, 10);
    await createEntry({ date: today, content: 'Today', category: 'everyday', mood: 'happy' });

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    await createEntry({ date: yesterday, content: 'Yesterday', category: 'everyday', mood: 'calm' });

    const streak = await getStreakCount();
    expect(streak).toBe(2);
  });
});

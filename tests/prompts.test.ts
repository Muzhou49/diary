import { describe, it, expect } from 'vitest';
import { DAILY_PROMPTS, getRandomPrompt, getDailyPrompt } from '@/lib/prompts';

describe('DAILY_PROMPTS', () => {
  it('should contain at least 40 prompts', () => {
    expect(DAILY_PROMPTS.length).toBeGreaterThanOrEqual(40);
  });

  it('should have unique IDs', () => {
    const ids = DAILY_PROMPTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should have all prompts with non-empty text', () => {
    for (const prompt of DAILY_PROMPTS) {
      expect(prompt.text.length).toBeGreaterThan(0);
    }
  });
});

describe('getRandomPrompt', () => {
  it('should return a valid prompt', () => {
    const prompt = getRandomPrompt();
    expect(prompt).toBeDefined();
    expect(typeof prompt.text).toBe('string');
  });

  it('should filter by category when provided', () => {
    const prompt = getRandomPrompt('family');
    expect(prompt.category).toBe('family');
  });

  it('should fallback to general prompts for unknown category', () => {
    const prompt = getRandomPrompt('custom');
    expect(prompt).toBeDefined();
  });
});

describe('getDailyPrompt', () => {
  it('should return same prompt for same date and category', () => {
    const p1 = getDailyPrompt('2026-06-05', 'health');
    const p2 = getDailyPrompt('2026-06-05', 'health');
    expect(p1.id).toBe(p2.id);
  });

  it('should return different prompts for different dates', () => {
    const p1 = getDailyPrompt('2026-06-05');
    const p2 = getDailyPrompt('2026-06-06');
    expect(p1.id).not.toBe(p2.id);
  });
});

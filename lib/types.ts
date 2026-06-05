export type GratitudeCategory =
  | 'family'
  | 'friends'
  | 'work'
  | 'health'
  | 'nature'
  | 'growth'
  | 'everyday'
  | 'custom';

export type MoodType =
  | 'grateful'
  | 'happy'
  | 'warm'
  | 'calm'
  | 'moved';

export const CATEGORY_LABELS: Record<GratitudeCategory, string> = {
  family: '👨‍👩‍👧 家人',
  friends: '👯 朋友',
  work: '💼 工作',
  health: '💪 健康',
  nature: '🌿 自然',
  growth: '📈 成长',
  everyday: '☀️ 日常美好',
  custom: '✨ 自定义',
};

export const MOOD_EMOJIS: Record<MoodType, string> = {
  grateful: '🙏',
  happy: '😊',
  warm: '🥰',
  calm: '😌',
  moved: '🥹',
};

export const MOOD_LABELS: Record<MoodType, string> = {
  grateful: '感恩',
  happy: '开心',
  warm: '温暖',
  calm: '平静',
  moved: '感动',
};

export interface DailyPrompt {
  id: string;
  text: string;
  category?: GratitudeCategory;
}

export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  rawContent?: string;
  category: GratitudeCategory;
  mood: MoodType;
  tags?: string[];
  promptId?: string;
  hasImage?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface UserSettings {
  deepseekApiKey?: string;
  userName?: string;
  theme?: 'light' | 'system';
}

export type WriteMode = 'text' | 'voice' | 'chat' | null;

export interface ChatMessage {
  id: string;
  date: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
}

export interface DiaryEntryInput {
  date: string;
  content: string;
  rawContent?: string;
  category: GratitudeCategory;
  mood: MoodType;
  tags?: string[];
  promptId?: string;
}

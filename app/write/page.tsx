'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/layout/AppShell';
import DailyPrompt from '@/components/write/DailyPrompt';
import CategorySelector from '@/components/write/CategorySelector';
import TextEditor from '@/components/write/TextEditor';
import VoiceRecorder from '@/components/write/VoiceRecorder';
import AIChatDialog from '@/components/write/AIChatDialog';
import MoodSelector from '@/components/write/MoodSelector';
import SaveButton from '@/components/write/SaveButton';
import PolishButton from '@/components/write/PolishButton';
import { createEntry, getSettings } from '@/lib/db';
import type { GratitudeCategory, MoodType, WriteMode } from '@/lib/types';
import { MessageCircle, Keyboard, Mic } from 'lucide-react';

export default function WritePage() {
  const [category, setCategory] = useState<GratitudeCategory | undefined>();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType | undefined>();
  const [mode, setMode] = useState<WriteMode>('text');
  const [showChat, setShowChat] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    getSettings().then((s) => setApiKey(s.deepseekApiKey || ''));
  }, []);

  const handleSave = async () => {
    if (!content.trim() || !category || !mood) return;
    const today = new Date().toISOString().slice(0, 10);
    await createEntry({ date: today, content: content.trim(), category, mood });
    setContent('');
    setMood(undefined);
  };

  const canSave = !!content.trim() && !!category && !!mood;

  return (
    <AppShell>
      <div className="space-y-4">
        <DailyPrompt category={category} onChangeCategory={setCategory} />
        <CategorySelector selected={category} onChange={setCategory} />

        {/* Input mode selector */}
        <div className="flex justify-center gap-3 py-2">
          {[
            { key: 'text' as WriteMode, icon: Keyboard, label: '文字' },
            { key: 'voice' as WriteMode, icon: Mic, label: '语音' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === key
                  ? 'bg-warm-500 text-white'
                  : 'bg-white/60 text-muted-foreground hover:bg-white'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
          <button
            onClick={() => setShowChat(true)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              showChat
                ? 'bg-warm-500 text-white'
                : 'bg-white/60 text-muted-foreground hover:bg-white'
            }`}
          >
            <MessageCircle size={16} />
            和朋友聊
          </button>
        </div>

        {/* Input area by mode */}
        {mode === 'text' && (
          <>
            <TextEditor value={content} onChange={setContent} />
            {content.trim() && apiKey && (
              <div className="flex justify-end">
                <PolishButton content={content} apiKey={apiKey} onPolished={setContent} />
              </div>
            )}
          </>
        )}

        {mode === 'voice' && (
          <>
            <VoiceRecorder onTranscript={(text) => setContent((prev) => prev + text)} />
            {content && (
              <TextEditor value={content} onChange={setContent} />
            )}
            {content.trim() && apiKey && (
              <div className="flex justify-end">
                <PolishButton content={content} apiKey={apiKey} onPolished={setContent} />
              </div>
            )}
          </>
        )}

        <MoodSelector selected={mood} onChange={setMood} />
        <SaveButton onClick={handleSave} disabled={!canSave} />
      </div>

      {/* AI Chat Dialog */}
      {showChat && apiKey && (
        <AIChatDialog
          apiKey={apiKey}
          onDiaryGenerated={(diaryContent) => {
            setContent(diaryContent);
            setShowChat(false);
            setMode('text');
          }}
          onClose={() => setShowChat(false)}
        />
      )}
      {showChat && !apiKey && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20">
          <div className="glass-card p-6 max-w-sm text-center space-y-4 m-4">
            <p className="text-muted-foreground">
              请先在<span className="text-warm-500">设置</span>中配置 DeepSeek API Key 🔑
            </p>
            <button
              onClick={() => setShowChat(false)}
              className="px-6 py-2 bg-warm-500 text-white rounded-full text-sm"
            >
              知道了
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}

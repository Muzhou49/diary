'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2, ChevronLeft, ChevronRight, Sparkles, Mic, MicOff } from 'lucide-react';
import { saveChatMessage, getChatMessagesByDate, getChatDates } from '@/lib/db';
import { chatWithDeepSeek, CHAT_SYSTEM_PROMPT } from '@/lib/deepseek';
import { SpeechRecognizer, checkSpeechSupport } from '@/lib/speech';
import type { ChatMessage } from '@/lib/types';

const WELCOME_MSG: ChatMessage = {
  id: 'welcome',
  date: '',
  role: 'assistant',
  content: '嗨～今天过得怎么样呀？有什么让你觉得特别温暖的事吗？☺️',
  createdAt: 0,
};

const QUICK_RECORD_TEXT = '帮我整理一下今天的感恩日记吧～';

interface AIChatDialogProps {
  apiKey: string;
  onDiaryGenerated: (content: string) => void;
  onClose: () => void;
}

export default function AIChatDialog({ apiKey, onDiaryGenerated, onClose }: AIChatDialogProps) {
  const today = new Date().toISOString().slice(0, 10);
  const [messages, setMessages] = useState<ChatMessage[]>([{ ...WELCOME_MSG, date: today }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatDate, setChatDate] = useState(today);
  const [availableDates, setAvailableDates] = useState<string[]>([today]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isToday = chatDate === today;
  const speechSupported = checkSpeechSupport();

  // Voice recording state
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const recognizerRef = useRef<SpeechRecognizer | null>(null);

  const startVoice = () => {
    const recognizer = new SpeechRecognizer('zh-CN');
    recognizerRef.current = recognizer;
    recognizer.start(
      (text, isFinal) => {
        setVoiceText(text);
        if (isFinal) {
          setVoiceText('');
          setVoiceRecording(false);
          sendMessage(text);
        }
      },
      () => {
        setVoiceRecording(false);
        setVoiceText('');
      }
    );
    setVoiceRecording(true);
  };

  const stopVoice = () => {
    recognizerRef.current?.stop();
    setVoiceRecording(false);
    if (voiceText.trim()) {
      sendMessage(voiceText.trim());
    }
    setVoiceText('');
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Load available dates and today's messages on mount
  useEffect(() => {
    (async () => {
      const dates = await getChatDates();
      const todayStr = new Date().toISOString().slice(0, 10);
      const merged = dates.includes(todayStr) ? dates : [todayStr, ...dates];
      setAvailableDates(merged);

      if (dates.includes(todayStr)) {
        const msgs = await getChatMessagesByDate(todayStr);
        if (msgs.length > 0) {
          setMessages(msgs);
          return;
        }
      }
      setMessages([{ ...WELCOME_MSG, date: todayStr }]);
    })();
  }, []);

  // Load messages when switching dates
  const loadDate = async (date: string) => {
    setChatDate(date);
    if (date === today) {
      const msgs = await getChatMessagesByDate(date);
      setMessages(msgs.length > 0 ? msgs : [{ ...WELCOME_MSG, date: today }]);
    } else {
      const msgs = await getChatMessagesByDate(date);
      setMessages(msgs);
    }
  };

  const currentDateIndex = availableDates.indexOf(chatDate);
  const canGoPrev = currentDateIndex < availableDates.length - 1;
  const canGoNext = currentDateIndex > 0;

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading || !isToday) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      date: today,
      role: 'user',
      content,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!text) setInput('');
    setLoading(true);

    // Save user message to DB
    await saveChatMessage({ date: today, role: 'user', content });

    try {
      const historyForApi = [...messages, userMsg]
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));

      const reply = await chatWithDeepSeek([
        { role: 'system', content: CHAT_SYSTEM_PROMPT },
        ...historyForApi,
      ], apiKey);

      const isSummary = reply.includes('[SUMMARY]');
      const content = isSummary ? reply.replace('[SUMMARY]', '').trim() : reply;

      if (isSummary) {
        onDiaryGenerated(content);
      } else {
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          date: today,
          role: 'assistant',
          content,
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        // Save assistant message to DB
        await saveChatMessage({ date: today, role: 'assistant', content });
        // Refresh available dates
        getChatDates().then((dates) => {
          const merged = dates.includes(today) ? dates : [today, ...dates];
          setAvailableDates(merged);
        });
      }
    } catch {
      const errMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        date: today,
        role: 'assistant',
        content: '呜呜，我好像走神了…再说一次好吗？🥺',
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, errMsg]);
      await saveChatMessage({ date: today, role: 'assistant', content: errMsg.content });
    } finally {
      setLoading(false);
    }
  };

  const sendQuickAction = () => sendMessage(QUICK_RECORD_TEXT);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed inset-0 z-[60] flex flex-col bg-cream"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-warm-200/50">
        <div className="flex items-center gap-2">
          {canGoPrev && (
            <button
              onClick={() => loadDate(availableDates[currentDateIndex + 1])}
              className="text-muted-foreground hover:text-warm-500 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <span className="font-display text-lg text-warm-500">和朋友聊聊 🤖</span>
          {canGoNext && (
            <button
              onClick={() => loadDate(availableDates[currentDateIndex - 1])}
              className="text-muted-foreground hover:text-warm-500 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isToday && (
            <button
              onClick={() => loadDate(today)}
              className="text-xs text-warm-500 bg-warm-100 px-3 py-1 rounded-full hover:bg-warm-200 transition-colors"
            >
              回到今天
            </button>
          )}
          <button onClick={onClose} className="text-muted-foreground text-sm">完成</button>
        </div>
      </div>

      {/* Date indicator */}
      <div className="text-center py-1.5 text-xs text-muted-foreground">
        {isToday ? '今天' : chatDate}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id || i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-warm-300 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-warm-500 text-white rounded-br-md'
                  : 'bg-white/80 text-foreground rounded-bl-md'
              }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-warm-400 flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-white" />
              </div>
            )}
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-2 items-center text-muted-foreground">
            <Bot size={16} />
            <Loader2 size={14} className="animate-spin" />
          </div>
        )}
      </div>

      {/* Input area — always visible, disabled for past dates */}
      <div className="border-t border-warm-200/50 bg-cream/90 backdrop-blur-sm" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}>
        {/* Past date indicator */}
        {!isToday && (
          <div className="px-4 pt-3 text-center text-xs text-muted-foreground">
            📖 查看历史对话 — 仅今天可以发送消息
          </div>
        )}

        {/* Quick action — today only */}
        {isToday && (
          <div className="px-4 pt-3 pb-1">
            <button
              onClick={sendQuickAction}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-warm-100 text-warm-600 text-sm font-medium hover:bg-warm-200 disabled:opacity-50 transition-colors"
            >
              <Sparkles size={14} />
              帮我记录日记
            </button>
          </div>
        )}

        {/* Voice recording indicator */}
        {voiceRecording && (
          <div className="px-4 pb-1">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-red-50 border border-red-200 animate-pulse">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <span className="text-sm text-red-500 flex-1">
                {voiceText || '正在聆听…'}
              </span>
              <button
                onClick={stopVoice}
                className="text-red-400 hover:text-red-500"
              >
                <MicOff size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Text input + voice */}
        <div className="p-4">
          <div className="flex gap-2">
            {/* Voice toggle button */}
            {speechSupported && isToday && (
              <button
                onClick={voiceRecording ? stopVoice : startVoice}
                disabled={loading || !isToday}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  voiceRecording
                    ? 'bg-red-400 text-white'
                    : 'bg-white/80 text-muted-foreground hover:bg-warm-100'
                }`}
              >
                <Mic size={18} />
              </button>
            )}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={!isToday ? '只能查看历史消息' : voiceRecording ? '语音识别中…' : '打字聊聊今天的心情…'}
              disabled={voiceRecording || !isToday}
              className="flex-1 px-4 py-3 rounded-full bg-white/80 outline-none text-sm disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading || !isToday}
              className="w-10 h-10 rounded-full bg-warm-500 text-white flex items-center justify-center disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { saveChatMessage, getChatMessagesByDate, getChatDates } from '@/lib/db';
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
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyForApi, apiKey }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      if (data.isSummary) {
        onDiaryGenerated(data.content);
      } else {
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          date: today,
          role: 'assistant',
          content: data.content,
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        // Save assistant message to DB
        await saveChatMessage({ date: today, role: 'assistant', content: data.content });
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

      {/* Input area — only for today */}
      {isToday && (
        <>
          {/* Quick action buttons */}
          <div className="px-4 pb-1">
            <button
              onClick={sendQuickAction}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-warm-100 text-warm-600 text-sm font-medium hover:bg-warm-200 disabled:opacity-50 transition-colors"
            >
              <Sparkles size={14} />
              帮我记录日记
            </button>
          </div>

          {/* Text input */}
          <div className="p-4 border-t border-warm-200/50">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="打字聊聊今天的心情…"
                className="flex-1 px-4 py-3 rounded-full bg-white/80 outline-none text-sm"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-full bg-warm-500 text-white flex items-center justify-center disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Read-only indicator for past dates */}
      {!isToday && (
        <div className="p-4 border-t border-warm-200/50 text-center text-sm text-muted-foreground">
          📖 查看历史对话
        </div>
      )}
    </motion.div>
  );
}

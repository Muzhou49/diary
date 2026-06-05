'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatDialogProps {
  apiKey: string;
  onDiaryGenerated: (content: string) => void;
  onClose: () => void;
}

export default function AIChatDialog({ apiKey, onDiaryGenerated, onClose }: AIChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '嗨～今天过得怎么样呀？有什么让你觉得特别温暖的事吗？☺️' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          apiKey,
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      if (data.isSummary) {
        onDiaryGenerated(data.content);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: '呜呜，我好像走神了…再说一次好吗？🥺' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed inset-0 z-[60] flex flex-col bg-cream"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-warm-200/50">
        <span className="font-display text-lg text-warm-500">和朋友聊聊 🤖</span>
        <button onClick={onClose} className="text-muted-foreground text-sm">完成</button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
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

      {/* Input */}
      <div className="p-4 border-t border-warm-200/50">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="打字或语音输入…"
            className="flex-1 px-4 py-3 rounded-full bg-white/80 outline-none text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full bg-warm-500 text-white flex items-center justify-center disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

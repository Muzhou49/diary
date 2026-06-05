'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { SpeechRecognizer, checkSpeechSupport } from '@/lib/speech';

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
}

export default function VoiceRecorder({ onTranscript }: VoiceRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [interimText, setInterimText] = useState('');
  const recognizerRef = useRef<SpeechRecognizer | null>(null);

  const supported = checkSpeechSupport();

  const startRecording = useCallback(() => {
    const recognizer = new SpeechRecognizer('zh-CN');
    recognizerRef.current = recognizer;

    recognizer.start(
      (text, isFinal) => {
        setInterimText(text);
        if (isFinal) {
          onTranscript(text);
          setRecording(false);
          setInterimText('');
        }
      },
      (error) => {
        console.error('Speech error:', error);
        setRecording(false);
      }
    );
    setRecording(true);
  }, [onTranscript]);

  const stopRecording = useCallback(() => {
    recognizerRef.current?.stop();
    setRecording(false);
    if (interimText) {
      onTranscript(interimText);
      setInterimText('');
    }
  }, [interimText, onTranscript]);

  if (!supported) return null;

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
          recording
            ? 'bg-red-400 shadow-lg shadow-red-200 scale-110'
            : 'bg-warm-400 shadow-md'
        }`}
      >
        {recording ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Mic size={32} className="text-white" />
          </motion.div>
        ) : (
          <Mic size={32} className="text-white" />
        )}
      </motion.button>

      <p className="text-sm text-muted-foreground">
        {recording ? '正在聆听…松开停止' : '按住说话'}
      </p>

      {interimText && recording && (
        <div className="glass-card p-3 text-sm text-muted-foreground max-w-sm">
          {interimText}
        </div>
      )}
    </div>
  );
}

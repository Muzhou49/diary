'use client';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  return (
    <div className="glass-card p-5 min-h-[200px]">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="写写今天让你感恩的事…可以只写几个关键词，然后让 AI 帮你润色 ✨"
        className="w-full min-h-[180px] bg-transparent resize-none outline-none text-base leading-relaxed placeholder:text-muted-foreground/60"
      />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Download, Trash2, Info } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import { getSettings, saveSettings, exportAllData } from '@/lib/db';
import { db } from '@/lib/db';
import type { UserSettings } from '@/lib/types';

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSave = async () => {
    await saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = async () => {
    const data = await exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gratitude-diary-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = async () => {
    if (!confirm('确定要清除所有日记数据吗？此操作不可恢复！')) return;
    if (!confirm('再次确认：真的要删除所有日记吗？')) return;
    await db.entries.clear();
    alert('数据已清除');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-bold text-warm-500 text-center">
          设置 ⚙️
        </h1>

        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-warm-500">
            <Key size={18} />
            <span className="font-semibold">DeepSeek API Key</span>
          </div>
          <input
            type="password"
            value={settings.deepseekApiKey || ''}
            onChange={(e) => setSettings({ ...settings, deepseekApiKey: e.target.value })}
            placeholder="sk-..."
            className="w-full px-4 py-2 rounded-xl bg-white/60 outline-none text-sm"
          />
          <p className="text-xs text-muted-foreground">
            密钥仅保存在你的浏览器本地，不会上传到任何服务器
          </p>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-warm-500 text-white text-sm font-medium rounded-full"
          >
            保存
          </button>
          {saved && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-warm-500 ml-3"
            >
              已保存 ✅
            </motion.span>
          )}
        </div>

        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-warm-500">
            <Info size={18} />
            <span className="font-semibold">你的称呼</span>
          </div>
          <input
            type="text"
            value={settings.userName || ''}
            onChange={(e) => setSettings({ ...settings, userName: e.target.value })}
            placeholder="AI 朋友会这样称呼你"
            className="w-full px-4 py-2 rounded-xl bg-white/60 outline-none text-sm"
          />
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-warm-500 text-white text-sm font-medium rounded-full"
          >
            保存
          </button>
        </div>

        <div className="glass-card p-5 space-y-4">
          <h3 className="font-semibold text-warm-500">数据管理</h3>

          <button
            onClick={handleExport}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/60 hover:bg-white text-sm"
          >
            <Download size={18} className="text-warm-500" />
            <span>导出所有数据 (JSON)</span>
          </button>

          <button
            onClick={handleClear}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-sm text-red-500"
          >
            <Trash2 size={18} />
            <span>清除所有数据</span>
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground pb-8">
          感恩日记 v0.1.0 · 用心记录每一天 🌷
        </p>
      </div>
    </AppShell>
  );
}

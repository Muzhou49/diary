import type { Metadata } from 'next';
import { Inter, Noto_Serif_SC } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const notoSerif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: '感恩日记',
  description: '每天三件感恩的事，让生活更美好',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={cn(inter.variable, notoSerif.variable, 'font-body')}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '感恩日记',
  description: '每天三件感恩的事，让生活更美好',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: '感恩日记',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#F5A67F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}

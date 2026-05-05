import type { Metadata } from 'next';
// @ts-ignore
import './globals.css';

export const metadata: Metadata = {
  title: 'MovieRecap – AI-Powered Subtitle Editor',
  description: 'Premium platform for editing movie subtitles with AI assistance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Sora:wght@400;500;600;700&display=swap" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23000' width='100' height='100'/><circle cx='50' cy='50' r='35' fill='%2300d9ff'/><circle cx='50' cy='50' r='25' fill='%23000'/><path d='M35,50 L65,40 L65,60 Z' fill='%2300d9ff'/></svg>" />
      </head>
      <body style={{ background: 'linear-gradient(135deg, #000 0%, #0a0a0a 50%, #000 100%)', color: '#f0f0f0', fontFamily: 'Sora, sans-serif', margin: 0, minHeight: '100vh' }}>
        <div style={{ minHeight: '100vh', background: 'transparent' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
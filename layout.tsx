import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MovieRecap – AI-Powered Subtitle Editor',
  description: 'Premium platform for editing movie subtitles with AI assistance. Upload, customize, and render videos with styled subtitles.',
  keywords: 'movie, subtitles, editor, SRT, video, AI',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23000' width='100' height='100'/><circle cx='50' cy='50' r='35' fill='%2300d9ff'/><circle cx='50' cy='50' r='25' fill='%23000'/><path d='M35,50 L65,40 L65,60 Z' fill='%2300d9ff'/></svg>" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-dark-bg">
          {/* Animated background gradient */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-soft-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {children}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
// @ts-expect-error - CSS import for side effects
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
      <body>
        <div style={{ minHeight: '100vh', background: 'transparent' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
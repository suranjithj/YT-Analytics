import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'VidMetrics — YouTube Competitor Intelligence',
  description:
    'Paste any YouTube channel URL and instantly see which videos are crushing it. Track competitor performance, engagement trends, and growth signals — all in one clean dashboard.',
  keywords: ['youtube analytics', 'competitor analysis', 'youtube metrics', 'video performance', 'channel analytics'],
  openGraph: {
    title: 'VidMetrics — YouTube Competitor Intelligence',
    description: 'Paste a channel URL. Get instant competitor insights.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a09' },
    { media: '(prefers-color-scheme: light)', color: '#fafaf8' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var t = localStorage.getItem('vm-theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (t === 'dark' || (!t && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YT Analytics — YouTube Competitor Intelligence',
  description:
    'Instantly analyze any YouTube channel. See which videos are crushing it this month, track engagement, and benchmark competitors.',
  openGraph: {
    title: 'YT Analytics — YouTube Competitor Intelligence',
    description: 'Paste a channel URL. Get instant competitor insights.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Mono, DM_Sans, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
});

const notoDeva = Noto_Serif_Devanagari({
  weight: ['400', '500'],
  subsets: ['devanagari'],
  variable: '--font-deva',
});

export const metadata: Metadata = {
  title: 'Antahkarana',
  description: 'A sanctuary for cognitive restoration.',
  manifest: '/manifest.json?v=4',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Antahkarana',
  },
};

export const viewport = {
  themeColor: '#c8902a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmMono.variable} ${dmSans.variable} ${notoDeva.variable}`}>
      <body>{children}</body>
    </html>
  );
}

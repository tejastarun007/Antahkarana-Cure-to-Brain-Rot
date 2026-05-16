import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chants — Antahkarana',
  description: '18 curated Vedic mantras and sacred chants for meditation. 5, 10, and 15-minute sessions with ambient soundscapes.',
};

export default function ChantsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

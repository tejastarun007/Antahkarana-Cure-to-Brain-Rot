import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wisdom — Antahkarana',
  description: 'Anti-scroll wisdom feed. Vedic teachings with Sanskrit, translations, and neuroscience correlations. One card at a time.',
};

export default function WisdomLayout({ children }: { children: React.ReactNode }) {
  return children;
}

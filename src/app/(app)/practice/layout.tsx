import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice — Antahkarana',
  description: 'Twelve evidence-backed daily practices mapped to specific neural trade-offs. Meditation timer, habit tracking, and neuroscience-guided restoration.',
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Science — Antahkarana',
  description: 'Interactive brain map, 1000-year cognitive timeline, seven neural trade-offs, and the global cognitive spectrum. All data verifiable.',
};

export default function ScienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algo Detox — Antahkarana',
  description: 'The diagnosis, 8 manipulation mechanisms, and a 21-day detox protocol to reverse algorithmic conditioning and reclaim cognitive sovereignty.',
};

export default function DetoxLayout({ children }: { children: React.ReactNode }) {
  return children;
}

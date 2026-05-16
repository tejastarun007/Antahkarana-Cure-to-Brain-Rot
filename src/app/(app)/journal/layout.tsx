import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manas Journal — Antahkarana',
  description: 'Conscious writing practice with mood tracking across the three gunas. Write to process, transfer to paper for deep encoding.',
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}

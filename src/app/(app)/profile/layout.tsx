import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile — Antahkarana',
  description: 'Your cognitive restoration journey. XP progression, practice calendar, milestones, saved wisdom, and restoration analytics.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}

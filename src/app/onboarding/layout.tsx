import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Begin — Antahkarana',
  description: 'Your first three minutes with Antahkarana. Discover the problem, the prescription, and begin your first practice.',
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

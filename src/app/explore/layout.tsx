import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore — Antahkarana | Global Cognitive Spectrum',
  description:
    'See where humanity falls on the global cognitive spectrum. The 1000-Year Timeline, 7 Neural Trade-offs, and the Vedic diagnosis — no login required.',
  openGraph: {
    title: 'The Global Cognitive Spectrum — Antahkarana',
    description: 'Where do you fall? 27% of humans are cognitively atrophied. Here is the data, the science, and the fix.',
    type: 'website',
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

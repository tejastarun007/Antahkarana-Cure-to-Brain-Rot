import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Antahkarana — अन्तःकरण | Cognitive Restoration Platform',
  description:
    'A cognitive restoration platform grounded in Vedic neuroscience and modern behavioural research. Restore your attention span with twelve evidence-backed daily practices.',
  openGraph: {
    title: 'Antahkarana — A Sanctuary for Cognitive Restoration',
    description:
      'Your attention span is not permanently lost. Research confirms measurable grey matter recovery within 8–12 weeks of structured practice.',
    type: 'website',
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

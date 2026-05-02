import { notFound } from 'next/navigation';
import patternsData from '@/lib/patterns.json';
import { Pattern } from '@/types';
import PatternPageClient from './PatternPageClient';

const patterns = patternsData as Pattern[];

export function generateStaticParams() {
  return patterns.map(pattern => ({
    slug: pattern.id,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const pattern = patterns.find(p => p.id === slug);
    return {
      title: pattern ? `${pattern.category} - FANGReady` : 'Pattern Not Found',
      description: pattern?.description || '',
    };
  });
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PatternPage({ params }: PageProps) {
  const { slug } = await params;
  const pattern = patterns.find(p => p.id === slug);

  if (!pattern) {
    notFound();
  }

  return <PatternPageClient pattern={pattern} />;
}

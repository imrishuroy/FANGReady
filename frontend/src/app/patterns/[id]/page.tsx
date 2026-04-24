import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import PatternDetail from '@/components/patterns/PatternDetail';

interface PatternPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PatternPageProps) {
  const { id } = await params;
  try {
    const pattern = await api.getPatternById(id);
    return {
      title: `${pattern.category} Pattern - FANGReady`,
      description: pattern.description,
    };
  } catch {
    return {
      title: 'Pattern Not Found - FANGReady',
    };
  }
}

export default async function PatternPage({ params }: PatternPageProps) {
  const { id } = await params;

  let pattern;
  try {
    pattern = await api.getPatternById(id);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/patterns" className="text-gray-400 hover:text-white transition">
              Patterns
            </Link>
          </li>
          <li className="text-gray-600">/</li>
          <li className="text-indigo-400">{pattern.category}</li>
        </ol>
      </nav>

      <PatternDetail pattern={pattern} />

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <Link
          href="/patterns"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Patterns
        </Link>
      </div>
    </div>
  );
}

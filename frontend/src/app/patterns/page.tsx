import { api } from '@/services/api';
import PatternCard from '@/components/patterns/PatternCard';

export const metadata = {
  title: 'DSA Patterns - FANGReady',
  description: 'Learn 15 essential DSA patterns to ace your coding interviews.',
};

export default async function PatternsPage() {
  const { patterns } = await api.getPatterns({ pageSize: 100 });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">DSA Patterns Tutorial</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Master these 15 patterns to solve any coding interview problem. Each pattern includes
          code templates, key insights, variations, and practice problems.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-indigo-400">{patterns.length}</div>
          <div className="text-sm text-gray-500">Patterns</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-purple-400">
            {patterns.reduce((acc, p) => acc + p.variations.length, 0)}
          </div>
          <div className="text-sm text-gray-500">Variations</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-green-400">
            {patterns.reduce((acc, p) => acc + p.commonProblems.length, 0)}
          </div>
          <div className="text-sm text-gray-500">Problems</div>
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {patterns.map((pattern) => (
          <PatternCard key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
  );
}

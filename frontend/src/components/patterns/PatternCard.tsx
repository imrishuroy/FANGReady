import Link from 'next/link';
import { Pattern } from '@/types';

interface PatternCardProps {
  pattern: Pattern;
}

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-500/20 text-green-400',
  Medium: 'bg-yellow-500/20 text-yellow-400',
  Hard: 'bg-red-500/20 text-red-400',
  'Easy-Medium': 'bg-emerald-500/20 text-emerald-400',
  'Medium-Hard': 'bg-orange-500/20 text-orange-400',
};

export default function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Link href={`/patterns/${pattern.id}`}>
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all hover:transform hover:scale-[1.02] cursor-pointer">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{pattern.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-white mb-2">{pattern.category}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{pattern.description}</p>

            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[pattern.difficulty] || 'bg-gray-700 text-gray-400'}`}>
                {pattern.difficulty}
              </span>
              <span className="text-xs text-gray-500">
                {pattern.variations.length} variations
              </span>
              <span className="text-xs text-gray-500">
                {pattern.commonProblems.length} problems
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className="font-mono">Time: {pattern.timeComplexity}</span>
              <span>|</span>
              <span className="font-mono">Space: {pattern.spaceComplexity}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

'use client';

import { questions } from '@/lib/questions';
import { useProgress } from '@/contexts/ProgressContext';

export default function HeaderProgress() {
  const { completed } = useProgress();
  const completedCount = completed.size;
  const total = questions.length;

  const percent = total ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {completedCount}/{total}
        </span>
      </div>
      <div className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border border-gray-700">
        <span className="text-xs font-medium text-indigo-400">{percent}%</span>
      </div>
    </div>
  );
}

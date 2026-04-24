import { questions } from '@/lib/questions';
import UnifiedTracker from '@/components/patterns/UnifiedTracker';

export const metadata = {
  title: 'Practice Questions - FANGReady',
  description: 'Track your progress on 260+ curated DSA problems organized by pattern from top tech companies.',
};

export default function QuestionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Practice Questions</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Curated problems organized by pattern. Learn the pattern first, then practice
          the related questions to master FAANG interviews.
        </p>
      </div>

      <UnifiedTracker questions={questions} />
    </div>
  );
}

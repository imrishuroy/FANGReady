'use client';

import { useState, useEffect, useMemo } from 'react';
import { Pattern, Question } from '@/types';
import { categoryToPatternId } from '@/lib/questions';
import PatternSection from './PatternSection';
import api from '@/services/api';

interface UnifiedTrackerProps {
  questions: Question[];
}

const STORAGE_KEY = 'faangready-completed';

export default function UnifiedTracker({ questions }: UnifiedTrackerProps) {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCompleted(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const response = await api.getPatterns({ pageSize: 50 });
        setPatterns(response.patterns);
      } catch (err) {
        setError('Failed to load patterns');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatterns();
  }, []);

  const toggleComplete = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const resetProgress = () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      setCompleted(new Set());
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const companies = useMemo(() => {
    const set = new Set<string>();
    questions.forEach(q => q.companies.forEach(c => set.add(c)));
    return [...set].sort();
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      if (search && !q.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
      if (companyFilter && !q.companies.includes(companyFilter)) return false;
      return true;
    });
  }, [questions, search, difficultyFilter, companyFilter]);

  const categories = useMemo(() => {
    return [...new Set(filteredQuestions.map(q => q.category))];
  }, [filteredQuestions]);

  const patternsByCategory = useMemo(() => {
    const map = new Map<string, Pattern>();
    patterns.forEach(p => {
      const matchingCategories = Object.entries(categoryToPatternId)
        .filter(([_, patternId]) => patternId === p.id)
        .map(([category]) => category);
      matchingCategories.forEach(cat => map.set(cat, p));
    });
    return map;
  }, [patterns]);

  const stats = useMemo(() => {
    const total = questions.length;
    const done = completed.size;
    const easy = questions.filter(q => q.difficulty === 'Easy');
    const medium = questions.filter(q => q.difficulty === 'Medium');
    const hard = questions.filter(q => q.difficulty === 'Hard');
    return {
      total,
      done,
      percent: total ? Math.round((done / total) * 100) : 0,
      easy: easy.length,
      easyDone: easy.filter(q => completed.has(q.id)).length,
      medium: medium.length,
      mediumDone: medium.filter(q => completed.has(q.id)).length,
      hard: hard.length,
      hardDone: hard.filter(q => completed.has(q.id)).length,
    };
  }, [questions, completed]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 col-span-2 md:col-span-1">
          <div className="text-2xl font-bold text-indigo-400">{stats.percent}%</div>
          <div className="text-xs text-gray-500">{stats.done}/{stats.total} Done</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{stats.easy}</div>
          <div className="text-xs text-gray-500">Easy</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">{stats.medium}</div>
          <div className="text-xs text-gray-500">Medium</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-2xl font-bold text-red-400">{stats.hard}</div>
          <div className="text-xs text-gray-500">Hard</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{stats.easyDone}</div>
          <div className="text-xs text-gray-500">Easy Done</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">{stats.mediumDone}</div>
          <div className="text-xs text-gray-500">Medium Done</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-2xl font-bold text-red-400">{stats.hardDone}</div>
          <div className="text-xs text-gray-500">Hard Done</div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Filters</h2>
          <button
            onClick={() => {
              setSearch('');
              setDifficultyFilter('');
              setCompanyFilter('');
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Companies</option>
            {companies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          <span className="text-white font-medium">{categories.length}</span> patterns,{' '}
          <span className="text-white font-medium">{filteredQuestions.length}</span> questions
        </p>
        <button
          onClick={resetProgress}
          className="text-xs text-gray-500 hover:text-red-400 transition"
        >
          Reset Progress
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-400">{error}</p>
          <p className="text-sm text-gray-500 mt-1">Pattern details may not be available.</p>
        </div>
      )}

      {/* Pattern Navigation */}
      <div className="bg-gray-800/50 rounded-xl p-4 mb-8 border border-gray-700">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Jump to Pattern</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => {
            const pattern = patternsByCategory.get(category);
            const patternId = pattern?.id || category.toLowerCase().replace(/\s+/g, '-');
            return (
              <a
                key={category}
                href={`#${patternId}`}
                className="px-3 py-1.5 bg-gray-700 hover:bg-indigo-500/20 hover:text-indigo-400 text-gray-300 rounded-lg text-sm transition border border-gray-600 hover:border-indigo-500/50"
              >
                {pattern?.icon || '📝'} {category}
              </a>
            );
          })}
        </div>
      </div>

      {categories.map(category => {
        const pattern = patternsByCategory.get(category);
        const categoryQuestions = filteredQuestions.filter(q => q.category === category);

        if (categoryQuestions.length === 0) return null;

        if (!pattern) {
          return (
            <section key={category} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">&#128221;</div>
                <div>
                  <h2 className="text-xl font-bold text-white">{category}</h2>
                  <span className="text-sm text-gray-500">{categoryQuestions.length} problems</span>
                </div>
              </div>
              <div className="space-y-2">
                {categoryQuestions.map((q) => (
                  <div
                    key={q.id}
                    className={`flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border transition hover:translate-x-1 ${
                      completed.has(q.id) ? 'border-green-500/30 bg-green-500/5' : 'border-gray-700'
                    }`}
                  >
                    <button
                      onClick={() => toggleComplete(q.id)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition flex-shrink-0 ${
                        completed.has(q.id)
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-600 hover:border-green-500'
                      }`}
                    >
                      {completed.has(q.id) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <a
                        href={q.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-indigo-400 font-medium transition"
                      >
                        {q.name}
                      </a>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span>{q.pattern}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={q.difficulty === 'Easy' ? 'text-green-400' : q.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'}>
                        {q.difficulty}
                      </span>
                      <span>{q.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        return (
          <PatternSection
            key={category}
            pattern={pattern}
            questions={categoryQuestions}
            completed={completed}
            onToggleComplete={toggleComplete}
          />
        );
      })}

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No questions match your filters
        </div>
      )}
    </div>
  );
}

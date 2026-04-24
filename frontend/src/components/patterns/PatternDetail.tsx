'use client';

import { useState } from 'react';
import { Pattern } from '@/types';
import CodeBlock from '@/components/ui/CodeBlock';
import LanguageToggle from '@/components/ui/LanguageToggle';
import VariationCard from './VariationCard';

interface PatternDetailProps {
  pattern: Pattern;
}

export default function PatternDetail({ pattern }: PatternDetailProps) {
  const [currentLang, setCurrentLang] = useState<string>('javascript');

  const availableLanguages = Object.entries(pattern.codeTemplates)
    .filter(([_, code]) => code && code.trim())
    .map(([lang]) => lang);

  const currentCode = pattern.codeTemplates[currentLang as keyof typeof pattern.codeTemplates] || '';

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="text-5xl">{pattern.icon}</div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">{pattern.category}</h1>
          <p className="text-gray-400">{pattern.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="px-3 py-1 text-sm bg-indigo-500/20 text-indigo-400 rounded-full">
              Difficulty: {pattern.difficulty}
            </span>
            <span className="text-sm text-gray-500">
              Time: {pattern.timeComplexity} | Space: {pattern.spaceComplexity}
            </span>
          </div>
        </div>
      </div>

      {/* When to Use */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          When to Use This Pattern
        </h2>
        <ul className="space-y-2">
          {pattern.whenToUse.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <span className="text-green-400 mt-0.5">&#10003;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Code Template */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Code Template
          </h2>
          <LanguageToggle
            currentLang={currentLang}
            onChange={setCurrentLang}
            languages={availableLanguages}
          />
        </div>
        <CodeBlock code={currentCode} language={currentLang} />
      </section>

      {/* Key Insights */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Key Insights
        </h2>
        <div className="grid gap-3">
          {pattern.keyInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-900/50 rounded-lg p-4 border border-gray-800">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-400/20 text-yellow-400 text-sm font-medium rounded-full flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-gray-300">{insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Mistakes */}
      {pattern.commonMistakes && pattern.commonMistakes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Common Mistakes to Avoid
          </h2>
          <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-4">
            <ul className="space-y-2">
              {pattern.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-red-400 mt-0.5">&#10007;</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Pattern Variations */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Pattern Variations
        </h2>
        <div className="space-y-3">
          {pattern.variations.map((variation, idx) => (
            <VariationCard key={variation.id || idx} variation={variation} />
          ))}
        </div>
      </section>

      {/* Common Problems */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Must-Practice Problems
        </h2>
        <div className="flex flex-wrap gap-2">
          {pattern.commonProblems.map((problem, i) => {
            const slug = problem.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return (
              <a
                key={i}
                href={`https://leetcode.com/problems/${slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-gray-800 hover:bg-indigo-500/20 hover:text-indigo-400 text-gray-300 rounded-lg text-sm transition flex items-center gap-1 border border-gray-700 hover:border-indigo-500/50"
              >
                {problem}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            );
          })}
        </div>
      </section>

      {/* Complexity */}
      <section className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-6 border border-indigo-500/20">
        <h2 className="text-lg font-semibold text-white mb-4">Complexity Analysis</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Time Complexity</div>
            <div className="text-xl font-mono text-indigo-400">{pattern.timeComplexity}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Space Complexity</div>
            <div className="text-xl font-mono text-purple-400">{pattern.spaceComplexity}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

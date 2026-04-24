'use client';

import { useState } from 'react';
import { PatternVariation } from '@/types';
import CodeBlock from '@/components/ui/CodeBlock';
import LanguageToggle from '@/components/ui/LanguageToggle';

interface VariationCardProps {
  variation: PatternVariation;
}

export default function VariationCard({ variation }: VariationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>('javascript');

  const hasTemplate = variation.template && (variation.template.javascript || variation.template.java);
  const hasProblems = variation.problems && variation.problems.length > 0;

  const availableLanguages = variation.template
    ? Object.entries(variation.template)
        .filter(([_, code]) => code && code.trim())
        .map(([lang]) => lang)
    : [];

  const currentCode = variation.template?.[currentLang as keyof typeof variation.template] || '';

  return (
    <div className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition"
      >
        <div>
          <h3 className="font-semibold text-white">{variation.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{variation.desc}</p>
          {variation.when && (
            <p className="text-xs text-indigo-400 mt-2">When: {variation.when}</p>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (hasTemplate || hasProblems) && (
        <div className="border-t border-gray-800">
          {hasTemplate && (
            <div className="p-4">
              <div className="flex justify-end mb-2">
                <LanguageToggle
                  currentLang={currentLang}
                  onChange={setCurrentLang}
                  languages={availableLanguages}
                  size="sm"
                />
              </div>
              <pre className="bg-gray-950 rounded-lg p-3 overflow-x-auto text-xs">
                <code className="text-gray-300 font-mono whitespace-pre">{currentCode}</code>
              </pre>
            </div>
          )}

          {hasProblems && (
            <div className="px-4 pb-4">
              <p className="text-xs text-gray-500 mb-2">Practice:</p>
              <div className="flex flex-wrap gap-1">
                {variation.problems!.map((problem, i) => {
                  const slug = problem.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  return (
                    <a
                      key={i}
                      href={`https://leetcode.com/problems/${slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded transition"
                    >
                      {problem}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

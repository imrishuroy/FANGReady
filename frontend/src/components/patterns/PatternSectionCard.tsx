'use client';

import { useState } from 'react';
import { Pattern } from '@/types';
import CodeBlock from '@/components/ui/CodeBlock';
import LanguageToggle from '@/components/ui/LanguageToggle';

interface PatternSectionCardProps {
  pattern: Pattern;
}

export default function PatternSectionCard({ pattern }: PatternSectionCardProps) {
  const [currentLang, setCurrentLang] = useState<string>('java');

  const languageOrder = ['java', 'javascript', 'python', 'cpp', 'go'];
  const availableLanguages = languageOrder.filter(
    lang => pattern.codeTemplates[lang as keyof typeof pattern.codeTemplates]?.trim()
  );

  const currentCode = pattern.codeTemplates[currentLang as keyof typeof pattern.codeTemplates]
    || pattern.codeTemplates[availableLanguages[0] as keyof typeof pattern.codeTemplates]
    || '';

  return (
    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/30 p-5 mb-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-xl">
          {pattern.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">About This Pattern</span>
            <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-400 rounded-full">
              {pattern.difficulty}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-0.5">{pattern.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-5 pb-4 border-b border-gray-700/50">
        <span>Time: <span className="text-indigo-400 font-mono">{pattern.timeComplexity}</span></span>
        <span>Space: <span className="text-purple-400 font-mono">{pattern.spaceComplexity}</span></span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            When to Use
          </h4>
          <ul className="space-y-1.5">
            {pattern.whenToUse.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-green-400 mt-0.5">&#10003;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Key Insights
          </h4>
          <ul className="space-y-1.5">
            {pattern.keyInsights.map((insight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-yellow-400 font-medium">{i + 1}.</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Code Template
          </h4>
          <LanguageToggle
            currentLang={currentLang}
            onChange={setCurrentLang}
            languages={availableLanguages}
            size="sm"
          />
        </div>
        <CodeBlock code={currentCode} language={currentLang} />
      </div>

      {pattern.commonMistakes && pattern.commonMistakes.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Common Mistakes
          </h4>
          <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-3">
            <ul className="space-y-1.5">
              {pattern.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-red-400 mt-0.5">&#10007;</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {pattern.variations && pattern.variations.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
            </svg>
            Variations
          </h4>
          <div className="space-y-4">
            {pattern.variations.map((variation, idx) => (
              <VariationInline key={variation.id || idx} variation={variation} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VariationInline({ variation }: { variation: Pattern['variations'][0] }) {
  const [currentLang, setCurrentLang] = useState<string>('java');

  const hasTemplate = variation.template && (variation.template.javascript || variation.template.java);
  const hasProblems = variation.problems && variation.problems.length > 0;

  const languageOrder = ['java', 'javascript', 'python', 'cpp', 'go'];
  const availableLanguages = variation.template
    ? languageOrder.filter(lang => variation.template?.[lang as keyof typeof variation.template]?.trim())
    : [];

  const currentCode = variation.template?.[currentLang as keyof typeof variation.template]
    || variation.template?.[availableLanguages[0] as keyof typeof variation.template]
    || '';

  return (
    <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4">
      <div className="mb-3">
        <h5 className="font-medium text-white text-sm">{variation.name}</h5>
        <p className="text-xs text-gray-500 mt-1">{variation.desc}</p>
        {variation.when && (
          <p className="text-xs text-indigo-400 mt-1">When: {variation.when}</p>
        )}
      </div>

      {hasTemplate && (
        <div className="mb-3">
          <div className="flex justify-end mb-2">
            <LanguageToggle
              currentLang={currentLang}
              onChange={setCurrentLang}
              languages={availableLanguages}
              size="sm"
            />
          </div>
          <CodeBlock code={currentCode} language={currentLang} maxHeight="300px" />
        </div>
      )}

      {hasProblems && (
        <div>
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
  );
}

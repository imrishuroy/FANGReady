'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  maxHeight?: string;
}

const languageMap: Record<string, string> = {
  javascript: 'javascript',
  js: 'javascript',
  jsx: 'jsx',
  java: 'java',
  python: 'python',
  py: 'python',
  cpp: 'cpp',
  'c++': 'cpp',
  c: 'c',
  go: 'go',
  golang: 'go',
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'tsx',
};

const customStyle = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: '#011627',
    margin: 0,
    padding: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.6',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'transparent',
    fontSize: '0.875rem',
  },
};

export default function CodeBlock({
  code,
  language = 'java',
  showCopy = true,
  maxHeight = '500px'
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const normalizedLang = languageMap[language.toLowerCase()] || 'java';
  const lineCount = code.split('\n').length;
  const isLongCode = lineCount > 25;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const effectiveMaxHeight = isExpanded ? 'none' : maxHeight;
  const displayLang = normalizedLang === 'cpp' ? 'C++' : normalizedLang.charAt(0).toUpperCase() + normalizedLang.slice(1);

  return (
    <div className="relative group rounded-xl overflow-hidden border border-gray-800 bg-[#011627]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1b2a] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs text-gray-400 ml-2 font-medium">{displayLang}</span>
        </div>
        <div className="flex items-center gap-2">
          {isLongCode && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2 py-1 text-xs bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded transition flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Collapse
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Expand ({lineCount} lines)
                </>
              )}
            </button>
          )}
          {showCopy && (
            <button
              onClick={handleCopy}
              className={`px-3 py-1 text-xs rounded transition flex items-center gap-1 ${
                copied
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Code content */}
      <div
        className="overflow-auto scrollbar-thin"
        style={{ maxHeight: effectiveMaxHeight }}
      >
        <SyntaxHighlighter
          language={normalizedLang}
          style={customStyle}
          showLineNumbers
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            textAlign: 'right',
            userSelect: 'none',
            color: '#4a5568',
            fontSize: '0.75rem',
          }}
          customStyle={{
            margin: 0,
            background: '#011627',
            borderRadius: 0,
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>

      {/* Scroll indicator for long code */}
      {!isExpanded && isLongCode && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#011627] to-transparent pointer-events-none" />
      )}
    </div>
  );
}

'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { useFilter } from '@/contexts/FilterContext';
import { questions } from '@/lib/questions';

export default function Header() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { completed } = useProgress();
  const { companyFilter } = useFilter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredQuestions = useMemo(() => {
    if (!companyFilter) return questions;
    return questions.filter(q => q.companies.includes(companyFilter));
  }, [companyFilter]);

  const completedCount = filteredQuestions.filter(q => completed.has(q.id)).length;
  const total = filteredQuestions.length;
  const percent = total ? Math.round((completedCount / total) * 100) : 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowDropdown(false);
    await logout();
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b transition-all"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-1)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-105"
              style={{
                background: 'var(--accent-gradient)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span
              className="text-lg font-bold bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--accent-gradient)' }}
            >
              FANGReady
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Pattern Recognition */}
            <Link
              href="/pattern-recognition"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: 'var(--accent-1)' }}
            >
              Pattern Recognition
            </Link>

            {/* Articles */}
            <Link
              href="/articles"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: 'var(--accent-1)' }}
            >
              Articles
            </Link>

            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              {companyFilter && (
                <span className="text-xs font-medium" style={{ color: 'var(--accent-2)' }}>
                  {companyFilter}
                </span>
              )}
              <div
                className="w-24 h-1.5 overflow-hidden"
                style={{
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${percent}%`,
                    background: 'var(--accent-gradient)',
                    borderRadius: 'var(--radius-full)',
                  }}
                />
              </div>
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                {completedCount}/{total}
              </span>
            </div>

            {/* Auth */}
            {isLoading ? (
              <div
                className="w-8 h-8 animate-pulse"
                style={{
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-full)',
                }}
              />
            ) : isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-8 h-8 flex items-center justify-center text-white text-sm font-medium transition-opacity hover:opacity-90"
                  style={{
                    background: 'var(--accent-gradient)',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {(() => {
                    const name = user?.name || user?.email?.split('@')[0] || 'U';
                    const parts = name.split(' ');
                    if (parts.length >= 2) {
                      return (parts[0][0] + parts[1][0]).toUpperCase();
                    }
                    return name[0].toUpperCase();
                  })()}
                </button>

                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-40 py-1 z-50 animate-fade-in"
                    style={{
                      background: 'var(--bg-elevated)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-1)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    <div
                      className="px-4 py-2 text-sm truncate border-b"
                      style={{ color: 'var(--text-2)', borderColor: 'var(--border-1)' }}
                    >
                      {user?.name || user?.email?.split('@')[0]}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm font-medium text-white transition-all hover:opacity-90"
                style={{
                  background: 'var(--accent-gradient)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

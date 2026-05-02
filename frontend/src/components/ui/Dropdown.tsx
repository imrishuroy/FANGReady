'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  icon?: React.ReactNode;
  logos?: Record<string, string>;
}

export default function Dropdown({ value, onChange, options, placeholder = 'Select...', icon, logos }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasLogos = logos && Object.keys(logos).length > 0;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-12 pr-10 py-3 text-left flex items-center transition-all"
        style={{
          background: 'var(--bg-surface)',
          border: `1px solid ${isOpen ? 'var(--accent-1)' : 'var(--border-1)'}`,
          borderRadius: 'var(--radius-lg)',
          color: 'var(--text-1)',
        }}
      >
        {value && logos?.[value] ? (
          <span
            className="absolute left-4 w-6 h-6 bg-white flex items-center justify-center p-1"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            <Image
              src={logos[value]}
              alt={value}
              width={16}
              height={16}
              className="object-contain"
              unoptimized
            />
          </span>
        ) : icon ? (
          <span
            className="absolute left-4 transition-colors"
            style={{ color: isOpen ? 'var(--accent-1)' : 'var(--text-3)' }}
          >
            {icon}
          </span>
        ) : null}
        <span style={{ color: value ? 'var(--text-1)' : 'var(--text-3)' }}>
          {value || placeholder}
        </span>
        <svg
          className={`absolute right-4 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-3)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-2 py-2 max-h-80 overflow-y-auto animate-fade-in"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-1)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <button
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
            className="w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-3"
            style={{
              background: !value ? 'rgba(var(--accent-1-rgb, 99, 102, 241), 0.1)' : 'transparent',
              color: !value ? 'var(--accent-1)' : 'var(--text-2)',
            }}
            onMouseEnter={(e) => {
              if (value) e.currentTarget.style.background = 'var(--bg-elevated)';
            }}
            onMouseLeave={(e) => {
              if (value) e.currentTarget.style.background = 'transparent';
            }}
          >
            {!value ? (
              <span
                className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(var(--accent-1-rgb, 99, 102, 241), 0.2)', borderRadius: 'var(--radius-sm)' }}
              >
                <svg className="w-3.5 h-3.5" style={{ color: 'var(--accent-1)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            ) : (
              <span
                className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}
              >
                <svg className="w-3.5 h-3.5" style={{ color: 'var(--text-3)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
            )}
            <span>{placeholder}</span>
          </button>

          <div className="my-1" style={{ borderTop: '1px solid var(--border-1)' }} />

          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-3"
              style={{
                background: value === option ? 'rgba(var(--accent-1-rgb, 99, 102, 241), 0.1)' : 'transparent',
                color: value === option ? 'var(--accent-1)' : 'var(--text-2)',
              }}
              onMouseEnter={(e) => {
                if (value !== option) e.currentTarget.style.background = 'var(--bg-elevated)';
              }}
              onMouseLeave={(e) => {
                if (value !== option) e.currentTarget.style.background = 'transparent';
              }}
            >
              {value === option ? (
                <span
                  className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(var(--accent-1-rgb, 99, 102, 241), 0.2)', borderRadius: 'var(--radius-sm)' }}
                >
                  <svg className="w-3.5 h-3.5" style={{ color: 'var(--accent-1)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              ) : hasLogos && logos?.[option] ? (
                <span
                  className="w-6 h-6 bg-white flex items-center justify-center p-1 flex-shrink-0"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                >
                  <Image
                    src={logos[option]}
                    alt={option}
                    width={14}
                    height={14}
                    className="object-contain"
                    unoptimized
                  />
                </span>
              ) : (
                <span className="w-6" />
              )}
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { quotes } from '@/lib/quotes';

export default function QuoteSection() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="mt-4 mb-4 text-center">
      <blockquote className="max-w-3xl mx-auto">
        <p className="text-xl italic text-gray-300 leading-relaxed">
          "{quote.text}"
        </p>
        <footer className="mt-2 text-gray-500">
          — {quote.author}
        </footer>
      </blockquote>
    </div>
  );
}

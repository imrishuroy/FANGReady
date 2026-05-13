'use client';

import { useEffect } from 'react';

export default function ProblemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }
    return () => {
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  return <>{children}</>;
}

'use client';

import { isPro } from '@/lib/subscription';
import { useEffect, useState } from 'react';

export function ProBadge() {
  const [pro, setPro] = useState(false);

  useEffect(() => {
    setPro(isPro());
  }, []);

  if (!pro) return null;

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200">
      ⚡ PRO
    </span>
  );
}

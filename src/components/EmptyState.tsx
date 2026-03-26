'use client';

import { SearchX } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
        <SearchX className="w-5 h-5 text-[#52525b]" />
      </div>
      <h3 className="text-base font-medium text-white mb-1">No videos match your filters</h3>
      <p className="text-sm text-[#52525b] max-w-xs">
        Try adjusting the time period, removing the trending filter, or clearing your search query.
      </p>
    </div>
  );
}
'use client';

import { Search, SlidersHorizontal, Download, Flame, ArrowUpDown } from 'lucide-react';
import type { FilterState, FilterPeriod, SortKey } from '@/lib/types';

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  totalCount: number;
  filteredCount: number;
  onExport: () => void;
}

const PERIODS: { value: FilterPeriod; label: string }[] = [
  { value: 'all', label: 'All time' },
  { value: 'this_month', label: 'This month' },
  { value: 'last_7', label: 'Last 7 days' },
  { value: 'last_30', label: 'Last 30 days' },
  { value: 'last_90', label: 'Last 90 days' },
];

const SORT_KEYS: { value: SortKey; label: string }[] = [
  { value: 'views', label: 'Views' },
  { value: 'likes', label: 'Likes' },
  { value: 'comments', label: 'Comments' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'performance', label: 'Score' },
  { value: 'date', label: 'Date' },
];

export function FilterBar({ filters, onChange, totalCount, filteredCount, onExport }: Props) {
  const set = <K extends keyof FilterState>(key: K, val: FilterState[K]) =>
    onChange({ ...filters, [key]: val });

  return (
    <div className="space-y-3">
      {/* Row 1: search + export */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#52525b]" />
          <input
            type="text"
            placeholder="Search videos…"
            value={filters.searchQuery}
            onChange={(e) => set('searchQuery', e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-[#3f3f46] outline-none focus:border-[#f97316]/50 transition-colors"
          />
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-[#71717a] hover:text-white hover:border-white/20 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export CSV</span>
        </button>
      </div>

      {/* Row 2: filters */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Period chips */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => set('period', p.value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filters.period === p.value
                  ? 'bg-[#f97316] text-white'
                  : 'text-[#71717a] hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Sort key */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <SlidersHorizontal className="w-3 h-3 text-[#52525b]" />
          <select
            value={filters.sortKey}
            onChange={(e) => set('sortKey', e.target.value as SortKey)}
            className="bg-transparent text-sm text-[#a1a1aa] outline-none cursor-pointer"
          >
            {SORT_KEYS.map((s) => (
              <option key={s.value} value={s.value} className="bg-[#1a1a1e]">
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort order */}
        <button
          onClick={() => set('sortOrder', filters.sortOrder === 'desc' ? 'asc' : 'desc')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-[#71717a] hover:text-white transition-colors"
        >
          <ArrowUpDown className="w-3 h-3" />
          {filters.sortOrder === 'desc' ? 'Highest first' : 'Lowest first'}
        </button>

        {/* Trending toggle */}
        <button
          onClick={() => set('onlyTrending', !filters.onlyTrending)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-medium transition-colors ${
            filters.onlyTrending
              ? 'bg-[#f97316]/15 border-[#f97316]/40 text-[#fb923c]'
              : 'bg-white/[0.03] border-white/[0.06] text-[#71717a] hover:text-white'
          }`}
        >
          <Flame className="w-3 h-3" />
          Trending only
        </button>

        {/* Result count */}
        <span className="ml-auto text-sm text-[#3f3f46]">
          {filteredCount === totalCount
            ? `${totalCount} videos`
            : `${filteredCount} of ${totalCount}`}
        </span>
      </div>
    </div>
  );
}
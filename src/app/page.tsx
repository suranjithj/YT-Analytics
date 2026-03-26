'use client';

import { useState, useCallback } from 'react';
import type { AnalysisResult, FilterState } from '@/lib/types';
import { ChannelSearch } from '@/components/ChannelSearch';
import { ChannelHeader } from '@/components/ChannelHeader';
import { FilterBar } from '@/components/FilterBar';
import { VideoGrid } from '@/components/VideoGrid';
import { PerformanceChart } from '@/components/PerformanceChart';
import { StatsOverview } from '@/components/StatsOverview';
import { EmptyState } from '@/components/EmptyState';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { applyFilters } from '@/lib/filters';
import { exportToCsv } from '@/lib/export';

const DEFAULT_FILTERS: FilterState = {
  period: 'all',
  sortKey: 'views',
  sortOrder: 'desc',
  searchQuery: '',
  onlyTrending: false,
};

export default function HomePage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeTab, setActiveTab] = useState<'videos' | 'charts'>('videos');

  const handleSearch = useCallback(async (channelUrl: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setFilters(DEFAULT_FILTERS);

    try {
      const params = new URLSearchParams({ channel: channelUrl, max: '50' });
      const res = await fetch(`/api/analyze?${params}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch channel data');
      }

      setResult(data as AnalysisResult);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredVideos = result
    ? applyFilters(result.videos, filters)
    : [];

  const handleExport = () => {
    if (result) exportToCsv(filteredVideos, result.channel);
  };

  return (
    <div className="min-h-dvh flex flex-col">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-md bg-[#f97316] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
            <span className="font-display text-lg text-white tracking-tight">
              YT Analytics
            </span>
          </div>

          {result && (
            <button
              onClick={() => {
                setResult(null);
                setError(null);
                setFilters(DEFAULT_FILTERS);
              }}
              className="text-xs text-[#71717a] hover:text-white transition-colors"
            >
              ← New search
            </button>
          )}
        </div>
      </header>

      <main className="flex-1">
        {!result && !loading && !error && (
          <HeroSection onSearch={handleSearch} />
        )}

        {loading && <LoadingState />}

        {error && !loading && (
          <div className="max-w-2xl mx-auto px-4 py-24">
            <ErrorState message={error} onRetry={() => setError(null)} />
          </div>
        )}

        {result && !loading && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
            {/* Channel header */}
            <div className="fade-up fade-up-1">
              <ChannelHeader channel={result.channel} fetchedAt={result.fetchedAt} />
            </div>

            {/* Stats overview */}
            <div className="fade-up fade-up-2">
              <StatsOverview videos={result.videos} filteredVideos={filteredVideos} />
            </div>

            {/* Tabs */}
            <div className="fade-up fade-up-3">
              <div className="flex items-center gap-1 border-b border-white/[0.06]">
                {(['videos', 'charts'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                      activeTab === tab
                        ? 'text-white border-[#f97316]'
                        : 'text-[#71717a] border-transparent hover:text-white'
                    }`}
                  >
                    {tab === 'videos' ? `Videos (${filteredVideos.length})` : 'Performance Charts'}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter bar — shown for videos tab */}
            {activeTab === 'videos' && (
              <div className="fade-up fade-up-4">
                <FilterBar
                  filters={filters}
                  onChange={setFilters}
                  totalCount={result.videos.length}
                  filteredCount={filteredVideos.length}
                  onExport={handleExport}
                />
              </div>
            )}

            {/* Content */}
            <div className="fade-up fade-up-5">
              {activeTab === 'videos' ? (
                filteredVideos.length > 0 ? (
                  <VideoGrid videos={filteredVideos} />
                ) : (
                  <EmptyState />
                )
              ) : (
                <PerformanceChart videos={result.videos} filters={filters} onChange={setFilters} />
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/[0.06] py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-xs text-[#71717a]">
          YT Analytics · YouTube data via YouTube Data API v3 · Not affiliated with Google or YouTube
        </div>
      </footer>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ onSearch }: { onSearch: (url: string) => void }) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100dvh-56px)] px-4 text-center overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(249,115,22,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto fade-up">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f97316]/30 bg-[#f97316]/10 text-[#fb923c] text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
          YouTube Competitor Intelligence
        </div>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-5">
          See what&apos;s making
          <br />
          <em className="not-italic text-[#f97316]">competitors</em> win
        </h1>

        <p className="text-[#71717a] text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Paste any YouTube channel URL and instantly see their top-performing
          videos, engagement metrics, and trends - no spreadsheets needed.
        </p>

        <ChannelSearch onSearch={onSearch} />

        <p className="mt-4 text-xs text-[#71717a]">
          Try: youtube.com/@mkbhd · youtube.com/@veritasium · youtube.com/c/TEDx
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-[#09090b] to-transparent" />
    </section>
  );
}
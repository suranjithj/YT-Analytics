'use client';

import { useState, useCallback } from 'react';
import type { AnalysisResult, FilterState } from '@/lib/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
import { Zap, BarChart2, LayoutGrid } from 'lucide-react';

const DEFAULT_FILTERS: FilterState = {
  period: 'all',
  sortKey: 'views',
  sortOrder: 'desc',
  searchQuery: '',
  onlyTrending: false,
};

export default function AnalyzePage() {
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
    setActiveTab('videos');
    try {
      const params = new URLSearchParams({ channel: channelUrl, max: '50' });
      const res = await fetch(`/api/analyze?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch channel data');
      setResult(data as AnalysisResult);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredVideos = result ? applyFilters(result.videos, filters) : [];
  const handleExport = () => { if (result) exportToCsv(filteredVideos, result.channel); };

  return (
    <div className="min-h-dvh flex flex-col overflow-x-clip">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* ── Search bar section ── */}
        <div
          className="py-10 px-4"
          style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            {!result && !loading && (
              <>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
                  style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-glow)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}
                >
                  <Zap className="w-3 h-3" /> Competitor Analyzer
                </div>
                <h1
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                >
                  Analyze any YouTube channel
                </h1>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                  Paste a channel URL below to instantly see their top-performing videos and metrics.
                </p>
              </>
            )}
            <ChannelSearch onSearch={handleSearch} />
            {result && !loading && (
              <button
                onClick={() => { setResult(null); setError(null); setFilters(DEFAULT_FILTERS); }}
                className="mt-3 text-xs transition-colors"
                style={{ color: 'var(--text-faint)' }}
                onMouseOver={e => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                onMouseOut={e => ((e.target as HTMLElement).style.color = 'var(--text-faint)')}
              >
                ← Analyze a different channel
              </button>
            )}
          </div>
        </div>

        {/* ── States ── */}
        {loading && <LoadingState />}

        {error && !loading && (
          <div className="max-w-2xl mx-auto px-4 py-16">
            <ErrorState message={error} onRetry={() => setError(null)} />
          </div>
        )}

        {result && !loading && (
          <div className="container-wide py-8 space-y-6">
            {/* Channel header */}
            <div className="fade-up">
              <ChannelHeader channel={result.channel} fetchedAt={result.fetchedAt} />
            </div>

            {/* Stats */}
            <div className="fade-up delay-1">
              <StatsOverview videos={result.videos} filteredVideos={filteredVideos} />
            </div>

            {/* Tabs */}
            <div className="fade-up delay-2 flex items-center gap-1" style={{ borderBottom: '1px solid var(--border)' }}>
              {[
                { id: 'videos',  label: `Videos (${filteredVideos.length})`, icon: LayoutGrid },
                { id: 'charts',  label: 'Performance Charts',                 icon: BarChart2  },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as 'videos' | 'charts')}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px"
                  style={{
                    color:       activeTab === id ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderColor: activeTab === id ? 'var(--accent)'       : 'transparent',
                    fontFamily:  'var(--font-display)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />{label}
                </button>
              ))}
            </div>

            {/* Filter bar */}
            {activeTab === 'videos' && (
              <div className="fade-up delay-3">
                <FilterBar filters={filters} onChange={setFilters} totalCount={result.videos.length} filteredCount={filteredVideos.length} onExport={handleExport} />
              </div>
            )}

            {/* Content */}
            <div className="fade-up delay-4">
              {activeTab === 'videos'
                ? filteredVideos.length > 0
                  ? <VideoGrid videos={filteredVideos} />
                  : <EmptyState />
                : <PerformanceChart videos={result.videos} filters={filters} onChange={setFilters} />
              }
            </div>
          </div>
        )}

        {/* Empty prompt state */}
        {!result && !loading && !error && (
          <div className="py-20 text-center px-4">
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
              style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)' }}
            >
              <Zap className="w-7 h-7" style={{ color: 'var(--accent)' }} />
            </div>
            <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Ready to analyze
            </h2>
            <p className="text-sm max-w-xs mx-auto" style={{ color: 'var(--text-muted)' }}>
              Paste any YouTube channel URL above to get started. Results appear in seconds.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
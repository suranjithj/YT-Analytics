'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  Legend,
} from 'recharts';

import type { VideoItem, FilterState } from '@/lib/types';
import { buildChartData, applyFilters } from '@/lib/filters';
import { formatCount } from '@/lib/youtube';

interface Props {
  videos: VideoItem[];
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

type ChartTab = 'views' | 'engagement' | 'scatter' | 'timeline';

const ACCENT = '#f97316';

export function PerformanceChart({ videos, filters, onChange }: Props) {
  const [tab, setTab] = useState<ChartTab>('views');

  // ✅ APPLY FILTERS (fix unused issue)
  const filteredVideos = applyFilters(videos, filters);

  const top10 = buildChartData(filteredVideos, 10);

  const allForScatter = filteredVideos.slice(0, 50).map((v) => ({
    name: v.title.length > 28 ? v.title.slice(0, 28) + '…' : v.title,
    views: v.metrics?.viewCount ?? 0,
    engagement: Number(v.engagementRate?.toFixed?.(2) ?? 0),
    score: v.performanceScore ?? 0,
  }));

  // Timeline
  const timelineMap = new Map<string, { month: string; views: number; count: number }>();

  for (const v of filteredVideos) {
    const d = new Date(v.publishedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en', { month: 'short', year: '2-digit' });

    if (!timelineMap.has(key)) {
      timelineMap.set(key, { month: label, views: 0, count: 0 });
    }

    const entry = timelineMap.get(key)!;
    entry.views += v.metrics?.viewCount ?? 0;
    entry.count += 1;
  }

  const timelineData = Array.from(timelineMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);

  const tabs: { id: ChartTab; label: string }[] = [
    { id: 'views', label: 'Top Videos by Views' },
    { id: 'engagement', label: 'Engagement Rate' },
    { id: 'scatter', label: 'Views vs Engagement' },
    { id: 'timeline', label: 'Upload Timeline' },
  ];

  const tooltipStyle: React.CSSProperties = {
    backgroundColor: '#1a1a1e',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: '#fafafa',
    fontSize: 12,
  };

  if (!filteredVideos.length) {
    return (
      <div className="text-center text-zinc-500 py-10">
        No data available.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* FILTER BAR (uses filters + onChange) */}
      <div className="flex flex-wrap gap-2">
        <select
          value={filters.period}
          onChange={(e) =>
            onChange({ ...filters, period: e.target.value as FilterState['period'] })
          }
          className="bg-black border border-white/10 text-xs px-2 py-1 rounded"
        >
          <option value="this_month">This Month</option>
          <option value="last_7">Last 7 Days</option>
          <option value="last_30">Last 30 Days</option>
          <option value="last_90">Last 90 Days</option>
          <option value="all">All</option>
        </select>

        <button
          onClick={() =>
            onChange({ ...filters, onlyTrending: !filters.onlyTrending })
          }
          className="text-xs px-2 py-1 border border-white/10 rounded"
        >
          🔥 Trending
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1 text-xs rounded ${
              tab === t.id ? 'bg-orange-500 text-white' : 'text-zinc-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white/[0.02] p-4 rounded-xl">

        {/* Views */}
        {tab === 'views' && (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={top10} layout="vertical">
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" tickFormatter={(v: number) => formatCount(v)} />
              <YAxis type="category" dataKey="name" width={200} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [
                  formatCount(Number(value ?? 0)),
                  'Views',
                ]}
              />
              <Bar dataKey="views">
                {top10.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === 0 ? ACCENT : `rgba(249,115,22,${0.9 - i * 0.07})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Engagement */}
        {tab === 'engagement' && (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={top10} layout="vertical">
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={200} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [
                  `${Number(value ?? 0).toFixed(2)}%`,
                  'Engagement',
                ]}
              />
              <Bar dataKey="engagement" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Scatter */}
        {tab === 'scatter' && (
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="views" />
              <YAxis dataKey="engagement" />
              <ZAxis dataKey="score" range={[40, 400]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Scatter data={allForScatter} fill={ACCENT} />
            </ScatterChart>
          </ResponsiveContainer>
        )}

        {/* Timeline */}
        {tab === 'timeline' && (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={timelineData}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="views" />
              <YAxis yAxisId="count" orientation="right" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar yAxisId="views" dataKey="views" fill={ACCENT} />
              <Bar yAxisId="count" dataKey="count" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        )}

      </div>
    </div>
  );
}
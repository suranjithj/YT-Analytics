'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ScatterChart,
  Scatter, ZAxis, Cell, Legend,
} from 'recharts';
import type { VideoItem, FilterState } from '@/lib/types';
import { buildChartData } from '@/lib/filters';
import { formatCount } from '@/lib/youtube';

interface Props {
  videos: VideoItem[];
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

type ChartTab = 'views' | 'engagement' | 'scatter' | 'timeline';

const ACCENT = '#f97316';
const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#fde68a', '#fcd34d', '#4ade80', '#60a5fa', '#a78bfa', '#f472b6'];

export function PerformanceChart({ videos, filters, onChange }: Props) {
  const [tab, setTab] = useState<ChartTab>('views');

  const top10 = buildChartData(videos, 10);
  const allForScatter = videos.slice(0, 50).map((v) => ({
    name: v.title.length > 28 ? v.title.slice(0, 28) + '…' : v.title,
    views: v.metrics.viewCount,
    engagement: parseFloat(v.engagementRate.toFixed(2)),
    likes: v.metrics.likeCount,
    score: v.performanceScore,
  }));

  // Timeline data — group by month
  const timelineMap = new Map<string, { month: string; views: number; count: number }>();
  for (const v of videos) {
    const d = new Date(v.publishedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en', { month: 'short', year: '2-digit' });
    if (!timelineMap.has(key)) timelineMap.set(key, { month: label, views: 0, count: 0 });
    const entry = timelineMap.get(key)!;
    entry.views += v.metrics.viewCount;
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

  const tooltipStyle = {
    backgroundColor: '#1a1a1e',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: '#fafafa',
    fontSize: 12,
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              tab === t.id
                ? 'bg-[#f97316] text-white'
                : 'text-[#71717a] hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Chart panel */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">

        {/* ── Views bar chart ── */}
        {tab === 'views' && (
          <div>
            <h3 className="text-sm font-medium text-[#a1a1aa] mb-5">
              Top 10 videos by view count
            </h3>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={top10} layout="vertical" margin={{ left: 0, right: 24, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: '#52525b', fontSize: 11 }}
                  tickFormatter={(v) => formatCount(v)}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={200}
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [formatCount(v), 'Views']}
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                />
                <Bar dataKey="views" radius={[0, 4, 4, 0]}>
                  {top10.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? ACCENT : `rgba(249,115,22,${0.9 - i * 0.07})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* ── Engagement bar chart ── */}
        {tab === 'engagement' && (
          <div>
            <h3 className="text-sm font-medium text-[#a1a1aa] mb-5">
              Top 10 videos by engagement rate (%)
            </h3>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={top10} layout="vertical" margin={{ left: 0, right: 24, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: '#52525b', fontSize: 11 }}
                  tickFormatter={(v) => `${v}%`}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={200}
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [`${v.toFixed(3)}%`, 'Engagement']}
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                />
                <Bar dataKey="engagement" radius={[0, 4, 4, 0]}>
                  {top10.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? '#4ade80' : `rgba(74,222,128,${0.9 - i * 0.07})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* ── Scatter chart ── */}
        {tab === 'scatter' && (
          <div>
            <h3 className="text-sm font-medium text-[#a1a1aa] mb-5">
              Views vs engagement rate — bubble size = performance score
            </h3>
            <ResponsiveContainer width="100%" height={380}>
              <ScatterChart margin={{ top: 10, right: 24, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="views"
                  type="number"
                  name="Views"
                  tickFormatter={(v) => formatCount(v)}
                  tick={{ fill: '#52525b', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'Views', position: 'bottom', fill: '#52525b', fontSize: 11 }}
                />
                <YAxis
                  dataKey="engagement"
                  type="number"
                  name="Engagement %"
                  tick={{ fill: '#52525b', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                  label={{ value: 'Engagement %', angle: -90, position: 'insideLeft', fill: '#52525b', fontSize: 11 }}
                />
                <ZAxis dataKey="score" range={[40, 400]} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }}
                  formatter={(v: number, name: string) => [
                    name === 'Views' ? formatCount(v) : name === 'Engagement %' ? `${v}%` : v,
                    name,
                  ]}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div style={tooltipStyle} className="p-3 max-w-xs">
                        <p className="text-[#a1a1aa] text-[10px] mb-1.5 line-clamp-2">{d.name}</p>
                        <p className="text-white">👁 {formatCount(d.views)} views</p>
                        <p className="text-white">📈 {d.engagement}% engagement</p>
                        <p className="text-white">⚡ Score: {d.score}/100</p>
                      </div>
                    );
                  }}
                />
                <Scatter data={allForScatter} fill={ACCENT} fillOpacity={0.7} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* ── Timeline ── */}
        {tab === 'timeline' && (
          <div>
            <h3 className="text-sm font-medium text-[#a1a1aa] mb-5">
              Monthly upload activity and total views
            </h3>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={timelineData} margin={{ left: 0, right: 24, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#52525b', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="views"
                  orientation="left"
                  tickFormatter={(v) => formatCount(v)}
                  tick={{ fill: '#52525b', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="count"
                  orientation="right"
                  tick={{ fill: '#52525b', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number, name: string) =>
                    name === 'views'
                      ? [formatCount(v), 'Total Views']
                      : [v, 'Videos Uploaded']
                  }
                />
                <Legend
                  wrapperStyle={{ color: '#71717a', fontSize: 12 }}
                />
                <Bar yAxisId="views" dataKey="views" fill={ACCENT} fillOpacity={0.7} radius={[4, 4, 0, 0]} name="views" />
                <Bar yAxisId="count" dataKey="count" fill="#60a5fa" fillOpacity={0.5} radius={[4, 4, 0, 0]} name="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Channel-level insight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightCard
          title="Best Upload Day"
          value={getBestDay(videos)}
          sub="by average views"
          color="#f97316"
        />
        <InsightCard
          title="Avg. Video Length"
          value={getAvgDuration(videos)}
          sub="across all videos"
          color="#60a5fa"
        />
        <InsightCard
          title="Top Tag"
          value={getTopTag(videos)}
          sub="most used tag"
          color="#a78bfa"
        />
      </div>
    </div>
  );
}

// ─── Insight helpers ──────────────────────────────────────────────────────────

function InsightCard({ title, value, sub, color }: { title: string; value: string; sub: string; color: string }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: `${color}20`, backgroundColor: `${color}08` }}
    >
      <p className="text-xs mb-1" style={{ color }}>
        {title}
      </p>
      <p className="text-2xl font-semibold text-white font-mono mb-0.5">{value}</p>
      <p className="text-xs text-[#52525b]">{sub}</p>
    </div>
  );
}

function getBestDay(videos: VideoItem[]): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const map: Record<number, { views: number; count: number }> = {};
  for (const v of videos) {
    const day = new Date(v.publishedAt).getDay();
    if (!map[day]) map[day] = { views: 0, count: 0 };
    map[day].views += v.metrics.viewCount;
    map[day].count += 1;
  }
  let best = 0, bestAvg = 0;
  for (const [d, { views, count }] of Object.entries(map)) {
    const avg = views / count;
    if (avg > bestAvg) { bestAvg = avg; best = Number(d); }
  }
  return days[best] ?? 'N/A';
}

function getAvgDuration(videos: VideoItem[]): string {
  if (!videos.length) return 'N/A';
  const avg = videos.reduce((s, v) => s + v.durationSeconds, 0) / videos.length;
  const m = Math.floor(avg / 60);
  const s = Math.round(avg % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function getTopTag(videos: VideoItem[]): string {
  const freq: Record<string, number> = {};
  for (const v of videos) {
    for (const t of v.tags ?? []) {
      freq[t] = (freq[t] ?? 0) + 1;
    }
  }
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const top = sorted[0]?.[0];
  if (!top) return 'N/A';
  return top.length > 18 ? top.slice(0, 18) + '…' : top;
}
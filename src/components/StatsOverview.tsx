'use client';

import { TrendingUp, Eye, ThumbsUp, MessageCircle, Flame, BarChart2 } from 'lucide-react';
import type { VideoItem } from '@/lib/types';
import { formatCount } from '@/lib/youtube';

interface Props {
  videos: VideoItem[];
  filteredVideos: VideoItem[];
}

export function StatsOverview({ videos, filteredVideos }: Props) {
  const source = filteredVideos.length > 0 ? filteredVideos : videos;

  const totalViews = source.reduce((s, v) => s + v.metrics.viewCount, 0);
  const totalLikes = source.reduce((s, v) => s + v.metrics.likeCount, 0);
  const totalComments = source.reduce((s, v) => s + v.metrics.commentCount, 0);
  const avgEngagement =
    source.length > 0
      ? source.reduce((s, v) => s + v.engagementRate, 0) / source.length
      : 0;
  const trendingCount = source.filter((v) => v.isTrending).length;
  const avgScore =
    source.length > 0
      ? Math.round(source.reduce((s, v) => s + v.performanceScore, 0) / source.length)
      : 0;

  const cards = [
    {
      icon: Eye,
      label: 'Total Views',
      value: formatCount(totalViews),
      color: '#60a5fa',
      bg: 'rgba(96,165,250,0.08)',
    },
    {
      icon: ThumbsUp,
      label: 'Total Likes',
      value: formatCount(totalLikes),
      color: '#4ade80',
      bg: 'rgba(74,222,128,0.08)',
    },
    {
      icon: MessageCircle,
      label: 'Total Comments',
      value: formatCount(totalComments),
      color: '#a78bfa',
      bg: 'rgba(167,139,250,0.08)',
    },
    {
      icon: TrendingUp,
      label: 'Avg. Engagement',
      value: `${avgEngagement.toFixed(2)}%`,
      color: '#f97316',
      bg: 'rgba(249,115,22,0.08)',
    },
    {
      icon: Flame,
      label: 'Trending Videos',
      value: String(trendingCount),
      color: '#fb923c',
      bg: 'rgba(251,146,60,0.08)',
    },
    {
      icon: BarChart2,
      label: 'Avg. Score',
      value: `${avgScore}/100`,
      color: '#facc15',
      bg: 'rgba(250,204,21,0.08)',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map(({ icon: Icon, label, value, color, bg }) => (
        <div
          key={label}
          className="rounded-xl border border-white/[0.06] p-4 flex flex-col gap-2"
          style={{ backgroundColor: bg, borderColor: `${color}20` }}
        >
          <Icon className="w-4 h-4 shrink-0" style={{ color }} />
          <div>
            <p className="text-sm text-[#71717a] mb-0.5">{label}</p>
            <p className="text-xl font-semibold font-mono leading-none" style={{ color: 'var(--text-primary)' }}>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
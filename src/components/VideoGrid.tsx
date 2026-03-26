'use client';

import { useState } from 'react';
import { LayoutGrid, List, Eye, ThumbsUp, MessageCircle, Clock, Flame, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { formatDistanceToNow, parseISO } from 'date-fns';
import type { VideoItem } from '@/lib/types';
import { VideoCard } from './VideoCard';
import { formatCount, formatDuration } from '@/lib/youtube';

interface Props {
  videos: VideoItem[];
}

export function VideoGrid({ videos }: Props) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div>
      {/* View mode toggle */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-[#52525b] hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-white/10 text-white' : 'text-[#52525b] hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video, idx) => (
            <div
              key={video.id}
              className="fade-up"
              style={{ animationDelay: `${Math.min(idx * 0.04, 0.4)}s` }}
            >
              <VideoCard video={video} rank={idx + 1} />
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {videos.map((video, idx) => (
            <ListRow key={video.id} video={video} rank={idx + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── List Row ─────────────────────────────────────────────────────────────────

function ListRow({ video, rank }: { video: VideoItem; rank: number }) {
  const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
  const publishedAgo = formatDistanceToNow(parseISO(video.publishedAt), { addSuffix: true });

  const scoreColor =
    video.performanceScore >= 75
      ? '#4ade80'
      : video.performanceScore >= 45
      ? '#facc15'
      : '#71717a';

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-150"
    >
      {/* Rank */}
      <span className="text-sm font-mono text-[#3f3f46] w-5 text-right shrink-0">{rank}</span>

      {/* Thumbnail */}
      <div className="relative w-28 h-16 rounded-lg overflow-hidden shrink-0 bg-[#111113]">
        {video.thumbnail && (
          <Image src={video.thumbnail} alt={video.title} fill className="object-cover" sizes="112px" />
        )}
        {video.durationSeconds > 0 && (
          <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-white text-[9px] font-mono">
            {formatDuration(video.durationSeconds)}
          </span>
        )}
      </div>

      {/* Title + date */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <p className="text-sm text-white group-hover:text-[#fb923c] transition-colors line-clamp-1 font-medium flex-1">
            {video.title}
          </p>
          {video.isTrending && (
            <span className="shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#f97316]/15 text-[#fb923c] text-[10px] font-semibold">
              <Flame className="w-2.5 h-2.5" /> HOT
            </span>
          )}
        </div>
        <p className="text-xs text-[#52525b] mt-0.5 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {publishedAgo}
        </p>
      </div>

      {/* Metrics */}
      <div className="hidden sm:flex items-center gap-5 text-xs text-[#71717a] shrink-0">
        <span className="flex items-center gap-1">
          <Eye className="w-3 h-3" /> {formatCount(video.metrics.viewCount)}
        </span>
        <span className="flex items-center gap-1">
          <ThumbsUp className="w-3 h-3" /> {formatCount(video.metrics.likeCount)}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" /> {formatCount(video.metrics.commentCount)}
        </span>
        <span className="text-[#52525b]">{video.engagementRate.toFixed(2)}%</span>
      </div>

      {/* Score */}
      <div className="shrink-0 flex flex-col items-end gap-1">
        <span
          className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
          style={{ color: scoreColor, backgroundColor: `${scoreColor}18` }}
        >
          {video.performanceScore}
        </span>
        <div className="w-16 h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${video.performanceScore}%`, backgroundColor: scoreColor }}
          />
        </div>
      </div>

      <ExternalLink className="w-3.5 h-3.5 text-[#3f3f46] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </a>
  );
}
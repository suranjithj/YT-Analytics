'use client';

import Image from 'next/image';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Eye, ThumbsUp, MessageCircle, Clock, Flame, ExternalLink } from 'lucide-react';
import type { VideoItem } from '@/lib/types';
import { formatCount, formatDuration } from '@/lib/youtube';

interface Props {
  video: VideoItem;
  rank: number;
}

export function VideoCard({ video, rank }: Props) {
  const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
  const publishedAgo = formatDistanceToNow(parseISO(video.publishedAt), { addSuffix: true });

  // Performance score color
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
      className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-[#111113] overflow-hidden">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#3f3f46]">
            <Eye className="w-8 h-8" />
          </div>
        )}

        {/* Duration badge */}
        {video.durationSeconds > 0 && (
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-xs font-mono font-medium">
            {formatDuration(video.durationSeconds)}
          </span>
        )}

        {/* Rank badge */}
        <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/70 text-white text-xs font-bold flex items-center justify-center font-mono">
          {rank}
        </span>

        {/* Trending badge */}
        {video.isTrending && (
          <span className="trending-badge absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f97316] text-white text-[10px] font-semibold">
            <Flame className="w-2.5 h-2.5" />
            HOT
          </span>
        )}

        {/* External link overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <ExternalLink className="w-6 h-6 text-white drop-shadow" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="text-sm font-medium text-white line-clamp-2 leading-snug group-hover:text-[#fb923c] transition-colors">
          {video.title}
        </h3>

        {/* Metrics row */}
        <div className="flex items-center gap-3 text-xs text-[#71717a]">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {formatCount(video.metrics.viewCount)}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-3 h-3" />
            {formatCount(video.metrics.likeCount)}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            {formatCount(video.metrics.commentCount)}
          </span>
        </div>

        {/* Bottom row */}
        <div className="mt-auto flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-[#52525b]">
            <Clock className="w-3 h-3" />
            {publishedAgo}
          </span>

          <div className="flex items-center gap-2">
            {/* Engagement rate */}
            <span className="text-xs text-[#71717a]">
              {video.engagementRate.toFixed(2)}% eng.
            </span>

            {/* Performance score pill */}
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono font-medium"
              style={{
                color: scoreColor,
                backgroundColor: `${scoreColor}18`,
              }}
            >
              {video.performanceScore}
            </span>
          </div>
        </div>

        {/* Score bar */}
        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${video.performanceScore}%`,
              backgroundColor: scoreColor,
            }}
          />
        </div>
      </div>
    </a>
  );
}
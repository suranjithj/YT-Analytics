'use client';

import Image from 'next/image';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Users, Video, Eye, Calendar, Globe } from 'lucide-react';
import type { ChannelInfo } from '@/lib/types';
import { formatCount } from '@/lib/youtube';

interface Props {
  channel: ChannelInfo;
  fetchedAt: string;
}

export function ChannelHeader({ channel, fetchedAt }: Props) {
  const channelUrl = channel.customUrl
    ? `https://youtube.com/${channel.customUrl}`
    : `https://youtube.com/channel/${channel.id}`;

  const createdAgo = formatDistanceToNow(parseISO(channel.publishedAt), { addSuffix: true });
  const dataAge = formatDistanceToNow(parseISO(fetchedAt), { addSuffix: true });

  const stats = [
    { icon: Users, label: 'Subscribers', value: formatCount(parseInt(channel.subscriberCount, 10)) },
    { icon: Video, label: 'Total Videos', value: formatCount(parseInt(channel.videoCount, 10)) },
    { icon: Eye, label: 'Total Views', value: formatCount(parseInt(channel.viewCount, 10)) },
    { icon: Calendar, label: 'Channel Created', value: createdAgo },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Thumbnail */}
        <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-[#f97316]/40 ring-offset-2 ring-offset-[#09090b]">
            {channel.thumbnail ? (
              <Image
                src={channel.thumbnail}
                alt={channel.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#1a1a1e] flex items-center justify-center text-2xl font-display text-[#f97316]">
                {channel.title.charAt(0)}
              </div>
            )}
          </div>
        </a>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl sm:text-3xl text-white hover:text-[#f97316] transition-colors truncate"
            >
              {channel.title}
            </a>
            {channel.country && (
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-white/[0.08] text-[#71717a]">
                <Globe className="w-3 h-3" />
                {channel.country}
              </span>
            )}
          </div>

          {channel.customUrl && (
            <p className="text-sm text-[#71717a] mb-2">{channel.customUrl}</p>
          )}

          {channel.description && (
            <p className="text-sm text-[#a1a1aa] leading-relaxed line-clamp-2 max-w-2xl">
              {channel.description}
            </p>
          )}
        </div>

        {/* Data freshness badge */}
        <div className="text-xs text-[#3f3f46] shrink-0">
          Data fetched {dataAge}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className="w-3.5 h-3.5 text-[#52525b]" />
              <span className="text-xs text-[#52525b]">{label}</span>
            </div>
            <p className="text-lg font-semibold text-white font-mono">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
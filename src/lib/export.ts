import type { VideoItem, ChannelInfo } from './types';
import { formatCount, formatDuration } from './youtube';

export function exportToCsv(videos: VideoItem[], channel: ChannelInfo): void {
  const headers = [
    'Title',
    'Published Date',
    'Views',
    'Likes',
    'Comments',
    'Engagement Rate (%)',
    'Duration',
    'Performance Score',
    'Trending',
    'Video URL',
  ];

  const rows = videos.map((v) => [
    `"${v.title.replace(/"/g, '""')}"`,
    new Date(v.publishedAt).toLocaleDateString(),
    v.metrics.viewCount,
    v.metrics.likeCount,
    v.metrics.commentCount,
    v.engagementRate.toFixed(3),
    formatDuration(v.durationSeconds),
    v.performanceScore,
    v.isTrending ? 'Yes' : 'No',
    `https://www.youtube.com/watch?v=${v.id}`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `vidmetrics_${channel.title.replace(/\s+/g, '_')}_${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function formatCountPublic(n: number): string {
  return formatCount(n);
}
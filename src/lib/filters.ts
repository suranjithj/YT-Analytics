import {
  startOfMonth,
  subDays,
  subMonths,
  isAfter,
  parseISO,
} from 'date-fns';
import type { VideoItem, FilterState, SortKey } from './types';

export function applyFilters(videos: VideoItem[], filters: FilterState): VideoItem[] {
  let result = [...videos];

  // ── Period filter ───────────────────────────────────────────────────────────
  const now = new Date();

  if (filters.period !== 'all') {
    let cutoff: Date;
    switch (filters.period) {
      case 'this_month':
        cutoff = startOfMonth(now);
        break;
      case 'last_7':
        cutoff = subDays(now, 7);
        break;
      case 'last_30':
        cutoff = subDays(now, 30);
        break;
      case 'last_90':
        cutoff = subMonths(now, 3);
        break;
      default:
        cutoff = new Date(0);
    }
    result = result.filter((v) => isAfter(parseISO(v.publishedAt), cutoff));
  }

  // ── Trending filter ─────────────────────────────────────────────────────────
  if (filters.onlyTrending) {
    result = result.filter((v) => v.isTrending);
  }

  // ── Search query ────────────────────────────────────────────────────────────
  if (filters.searchQuery.trim()) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  // ── Sort ────────────────────────────────────────────────────────────────────
  result.sort((a, b) => {
    let diff = 0;
    switch (filters.sortKey as SortKey) {
      case 'views':
        diff = a.metrics.viewCount - b.metrics.viewCount;
        break;
      case 'likes':
        diff = a.metrics.likeCount - b.metrics.likeCount;
        break;
      case 'comments':
        diff = a.metrics.commentCount - b.metrics.commentCount;
        break;
      case 'engagement':
        diff = a.engagementRate - b.engagementRate;
        break;
      case 'date':
        diff = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        break;
      case 'performance':
        diff = a.performanceScore - b.performanceScore;
        break;
    }
    return filters.sortOrder === 'desc' ? -diff : diff;
  });

  return result;
}

/** Returns [label, value] pairs for the performance chart. */
export function buildChartData(videos: VideoItem[], limit = 10) {
  return videos.slice(0, limit).map((v) => ({
    name: v.title.length > 32 ? v.title.slice(0, 32) + '…' : v.title,
    views: v.metrics.viewCount,
    likes: v.metrics.likeCount,
    comments: v.metrics.commentCount,
    engagement: parseFloat(v.engagementRate.toFixed(2)),
    score: v.performanceScore,
  }));
}
import type { ChannelInfo, VideoItem, VideoMetrics } from './types';

const BASE = 'https://www.googleapis.com/youtube/v3';

function apiKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error('YOUTUBE_API_KEY is not configured.');
  return key;
}

// ─── URL Parsing ──────────────────────────────────────────────────────────────

/**
 * Extracts a YouTube channel identifier from various URL formats.
 * Handles: /channel/UC..., /@handle, /c/name, /user/name, bare IDs.
 */
export function parseChannelInput(input: string): {
  type: 'id' | 'handle' | 'username' | 'custom';
  value: string;
} {
  const raw = input.trim();

  // Direct channel ID (starts with UC)
  if (/^UC[\w-]{21}$/.test(raw)) {
    return { type: 'id', value: raw };
  }

  // Extract from URL
  try {
    const url = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
    const path = url.pathname;

    const channelMatch = path.match(/\/channel\/(UC[\w-]{21})/);
    if (channelMatch) return { type: 'id', value: channelMatch[1] };

    const handleMatch = path.match(/\/@([\w.-]+)/);
    if (handleMatch) return { type: 'handle', value: handleMatch[1] };

    const customMatch = path.match(/\/c\/([\w.-]+)/);
    if (customMatch) return { type: 'custom', value: customMatch[1] };

    const userMatch = path.match(/\/user\/([\w.-]+)/);
    if (userMatch) return { type: 'username', value: userMatch[1] };

    // Bare path like "youtube.com/mkbhd"
    const bare = path.replace(/^\//, '');
    if (bare && !bare.includes('/')) return { type: 'handle', value: bare };
  } catch {
    // Not a URL — treat as bare handle
    if (raw.startsWith('@')) return { type: 'handle', value: raw.slice(1) };
    return { type: 'handle', value: raw };
  }

  return { type: 'handle', value: raw };
}

// ─── Channel Resolution ───────────────────────────────────────────────────────

export async function resolveChannelId(input: string): Promise<string> {
  const parsed = parseChannelInput(input);

  if (parsed.type === 'id') return parsed.value;

  // Search for channel by handle/username/custom
  const params = new URLSearchParams({
    key: apiKey(),
    part: 'snippet',
    type: 'channel',
    q: parsed.value,
    maxResults: '1',
  });

  const res = await fetch(`${BASE}/search?${params}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || 'YouTube API error during channel search');
  }

  if (!data.items?.length) {
    throw new Error(`No channel found for "${input}". Try pasting the full YouTube channel URL.`);
  }

  return data.items[0].snippet.channelId;
}

// ─── Channel Info ─────────────────────────────────────────────────────────────

export async function fetchChannelInfo(channelId: string): Promise<ChannelInfo> {
  const params = new URLSearchParams({
    key: apiKey(),
    part: 'snippet,statistics,brandingSettings',
    id: channelId,
  });

  const res = await fetch(`${BASE}/channels?${params}`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error?.message || 'Failed to fetch channel info');
  if (!data.items?.length) throw new Error('Channel not found');

  const ch = data.items[0];
  return {
    id: ch.id,
    title: ch.snippet.title,
    description: ch.snippet.description,
    thumbnail:
      ch.snippet.thumbnails?.high?.url ||
      ch.snippet.thumbnails?.medium?.url ||
      ch.snippet.thumbnails?.default?.url ||
      '',
    subscriberCount: ch.statistics.subscriberCount || '0',
    videoCount: ch.statistics.videoCount || '0',
    viewCount: ch.statistics.viewCount || '0',
    customUrl: ch.snippet.customUrl,
    country: ch.snippet.country,
    publishedAt: ch.snippet.publishedAt,
  };
}

// ─── Videos ───────────────────────────────────────────────────────────────────

/** Fetch video IDs from a channel's uploads playlist (up to maxResults). */
async function fetchUploadedVideoIds(channelId: string, maxResults = 50): Promise<string[]> {
  // Get uploads playlist ID
  const channelParams = new URLSearchParams({
    key: apiKey(),
    part: 'contentDetails',
    id: channelId,
  });
  const chRes = await fetch(`${BASE}/channels?${channelParams}`);
  const chData = await chRes.json();
  if (!chRes.ok) throw new Error(chData.error?.message || 'Failed to fetch channel uploads');
  const uploadsPlaylistId = chData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) throw new Error('Could not find uploads playlist for this channel');

  // Page through playlist to collect video IDs
  const ids: string[] = [];
  let pageToken: string | undefined;

  while (ids.length < maxResults) {
    const plParams = new URLSearchParams({
      key: apiKey(),
      part: 'contentDetails',
      playlistId: uploadsPlaylistId,
      maxResults: String(Math.min(50, maxResults - ids.length)),
      ...(pageToken ? { pageToken } : {}),
    });
    const plRes = await fetch(`${BASE}/playlistItems?${plParams}`);
    const plData = await plRes.json();
    if (!plRes.ok) throw new Error(plData.error?.message || 'Failed to fetch playlist items');

    for (const item of plData.items ?? []) {
      const vid = item.contentDetails?.videoId;
      if (vid) ids.push(vid);
    }

    pageToken = plData.nextPageToken;
    if (!pageToken) break;
  }

  return ids;
}

/** Fetch full statistics + content details for up to 50 video IDs at a time. */
async function fetchVideoDetails(videoIds: string[]): Promise<VideoItem[]> {
  if (!videoIds.length) return [];

  // YouTube allows max 50 IDs per request
  const chunks: string[][] = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    chunks.push(videoIds.slice(i, i + 50));
  }

  const allItems: VideoItem[] = [];

  for (const chunk of chunks) {
    const params = new URLSearchParams({
      key: apiKey(),
      part: 'snippet,statistics,contentDetails',
      id: chunk.join(','),
    });
    const res = await fetch(`${BASE}/videos?${params}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'Failed to fetch video details');

    for (const v of data.items ?? []) {
      const metrics: VideoMetrics = {
        viewCount: parseInt(v.statistics?.viewCount || '0', 10),
        likeCount: parseInt(v.statistics?.likeCount || '0', 10),
        commentCount: parseInt(v.statistics?.commentCount || '0', 10),
        favoriteCount: parseInt(v.statistics?.favoriteCount || '0', 10),
      };

      const durationSeconds = parseIso8601Duration(v.contentDetails?.duration || 'PT0S');
      const engagementRate =
        metrics.viewCount > 0
          ? ((metrics.likeCount + metrics.commentCount) / metrics.viewCount) * 100
          : 0;

      allItems.push({
        id: v.id,
        title: v.snippet.title,
        description: v.snippet.description || '',
        thumbnail:
          v.snippet.thumbnails?.maxres?.url ||
          v.snippet.thumbnails?.high?.url ||
          v.snippet.thumbnails?.medium?.url ||
          v.snippet.thumbnails?.default?.url ||
          '',
        publishedAt: v.snippet.publishedAt,
        duration: v.contentDetails?.duration || 'PT0S',
        durationSeconds,
        metrics,
        tags: v.snippet.tags || [],
        engagementRate: parseFloat(engagementRate.toFixed(3)),
        isTrending: false,      // computed after sorting
        performanceScore: 0,    // computed after all videos loaded
      });
    }
  }

  return allItems;
}

/** Compute isTrending and performanceScore across the full video set. */
function computeScores(videos: VideoItem[]): VideoItem[] {
  if (!videos.length) return videos;

  const maxViews = Math.max(...videos.map((v) => v.metrics.viewCount));
  const maxLikes = Math.max(...videos.map((v) => v.metrics.likeCount));
  const maxEngagement = Math.max(...videos.map((v) => v.engagementRate));

  // Top 20% by views are "trending"
  const sortedByViews = [...videos].sort((a, b) => b.metrics.viewCount - a.metrics.viewCount);
  const trendingThreshold = sortedByViews[Math.floor(sortedByViews.length * 0.2)]?.metrics.viewCount ?? 0;

  return videos.map((v) => {
    const viewScore = maxViews > 0 ? (v.metrics.viewCount / maxViews) * 50 : 0;
    const likeScore = maxLikes > 0 ? (v.metrics.likeCount / maxLikes) * 30 : 0;
    const engScore = maxEngagement > 0 ? (v.engagementRate / maxEngagement) * 20 : 0;

    return {
      ...v,
      isTrending: v.metrics.viewCount >= trendingThreshold,
      performanceScore: Math.round(viewScore + likeScore + engScore),
    };
  });
}

/** Main entry point — fetches and enriches all videos for a channel. */
export async function fetchChannelVideos(channelId: string, maxResults = 50): Promise<VideoItem[]> {
  const ids = await fetchUploadedVideoIds(channelId, maxResults);
  const videos = await fetchVideoDetails(ids);
  return computeScores(videos);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Converts ISO 8601 duration (PT4M13S) to total seconds. */
export function parseIso8601Duration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const h = parseInt(match[1] || '0', 10);
  const m = parseInt(match[2] || '0', 10);
  const s = parseInt(match[3] || '0', 10);
  return h * 3600 + m * 60 + s;
}

/** Formats seconds as mm:ss or h:mm:ss. */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Compact number formatting: 1.2M, 45K, etc. */
export function formatCount(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
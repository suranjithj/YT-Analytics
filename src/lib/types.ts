// ─── Channel ────────────────────────────────────────────────────────────────

export interface ChannelInfo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  customUrl?: string;
  country?: string;
  publishedAt: string;
}

// ─── Video ───────────────────────────────────────────────────────────────────

export interface VideoMetrics {
  viewCount: number;
  likeCount: number;
  commentCount: number;
  favoriteCount: number;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;          // ISO 8601 duration e.g. PT4M13S
  durationSeconds: number;
  metrics: VideoMetrics;
  tags?: string[];
  // computed
  engagementRate: number;    // (likes + comments) / views * 100
  isTrending: boolean;
  performanceScore: number;  // 0-100 composite
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface AnalysisResult {
  channel: ChannelInfo;
  videos: VideoItem[];
  fetchedAt: string;
  totalVideosAnalyzed: number;
}

export interface ApiError {
  message: string;
  code?: string | number;
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export type SortKey = 'views' | 'likes' | 'comments' | 'engagement' | 'date' | 'performance';
export type SortOrder = 'desc' | 'asc';
export type FilterPeriod = 'all' | 'this_month' | 'last_30' | 'last_7' | 'last_90';
export type ViewMode = 'grid' | 'list';

export interface FilterState {
  period: FilterPeriod;
  sortKey: SortKey;
  sortOrder: SortOrder;
  searchQuery: string;
  onlyTrending: boolean;
}
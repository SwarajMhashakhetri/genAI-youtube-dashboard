export interface VideoMetric {
  videoId: string;
  title: string;
  publishedAt: string;
  views: number;
  watchTimeHours: number;
  averageViewDuration: number;
  thumbnailUrl: string;
  category: string;
}

export interface ChannelMetric {
  name: string;
  value: number;
  unit: string;
  changePercent: number;
  trend: 'up' | 'down' | 'flat';
  period: string;
}

export interface TrendingVideo {
  videoId: string;
  title: string;
  channelName: string;
  channelId?: string;
  publishedAt: string;
  views: number;
  likes?: number;
  dislikes?: number;
  comments?: number;
  thumbnailUrl: string;
  duration: string;
  durationSeconds: number;
  category: string;
  tags: string[];
  trendScore: number;
  qualityScore: number;
}

export interface PerformanceInsight {
  id?: string;
  title?: string;
  description: string;
  type?: 'positive' | 'negative' | 'neutral';
  metric: string;
  changePercent?: number;
  recommendation?: string;
  data?: Array<{ label: string; value: number }>;
}

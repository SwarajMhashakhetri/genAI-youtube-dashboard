import { z } from "zod";
import VideoDescription from "./VideoDescription";
import { withInteractable } from "@tambo-ai/react";

export interface VideoCardProps {
  rank: number;
  thumbnail: string;
  title: string;
  channel: string;
  views: string;
  timeAgo: string;
  rating?: string;
}

export const videoCardSchema = z.object({
  videoId: z.string().describe("The YouTube video ID"),
  title: z.string().describe("The video title"),
  channelName: z.string().describe("The channel or category name"),
  thumbnailUrl: z.string().describe("URL of the video thumbnail image"),
  views: z.number().describe("Number of views"),
  publishedAt: z.string().describe("ISO date string of when the video was published"),
  rank: z.number().describe("Rank number to display as a badge"),
  qualityScore: z.number().optional().describe("Quality score 0-100 based on engagement signals"),
  href: z.string().optional().describe("Optional link URL to open on click"),
});

// Helper function to format views count
function formatViews(views: number | undefined | null): string {
  const safeViews = views || 0;
  if (safeViews >= 1000000) {
    return `${(safeViews / 1000000).toFixed(1)}M`;
  }
  if (safeViews >= 1000) {
    return `${(safeViews / 1000).toFixed(1)}K`;
  }
  return safeViews.toString();
}

// Helper function to calculate time ago
function formatTimeAgo(publishedAt: string | undefined | null): string {
  if (!publishedAt) {
    return "Unknown";
  }
  
  try {
    const now = new Date();
    const published = new Date(publishedAt);
    
    // Check if publishedAt is a valid date
    if (isNaN(published.getTime())) {
      return "Unknown";
    }
    
    const diffMs = now.getTime() - published.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    }
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }
    if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } catch (error) {
    return "Unknown";
  }
}

export default function VideoCard({
  rank,
  thumbnail,
  title,
  channel,
  views,
  timeAgo,
  rating,
}: VideoCardProps) {
  return (
    <div className="cursor-pointer">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={thumbnail || undefined}
          alt={title}
          className="aspect-video w-full object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = 'https://placehold.co/480x270/16213e/ffffff?text=No+Thumbnail';
          }}
        />
        <span className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
          #{rank}
        </span>
      </div>
      <VideoDescription
        title={title}
        channel={channel}
        views={views}
        timeAgo={timeAgo}
        rating={rating}
      />
    </div>
  );
}

export const InteractableVideoCard = withInteractable(
  ({ videoId, title, channelName, thumbnailUrl, views, publishedAt, rank, qualityScore, href, ...props }: any) => {
    // Convert API props to component props
    const formattedViews = formatViews(views);
    const timeAgo = formatTimeAgo(publishedAt);
    
    return (
      <VideoCard
        rank={rank}
        thumbnail={thumbnailUrl}
        title={title}
        channel={channelName}
        views={formattedViews}
        timeAgo={timeAgo}
        rating={qualityScore ? `${Math.round(qualityScore)}%` : undefined}
        {...props}
      />
    );
  },
  {
    componentName: "VideoCard",
    description:
      "A video card component that displays a YouTube video thumbnail with rank badge, title, channel name, view count, and publish date. Can link to YouTube or embed an inline player. Use this to display individual video results from trending or performance tools.",
    propsSchema: videoCardSchema,
  },
);
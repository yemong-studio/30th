/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChannelSettings, FunTag, Genre, Member, Notice, Video } from '../types';
import { CHANNEL_SETTINGS, FUN_TAGS, GENRES, MEMBERS, NOTICES, VIDEOS } from './defaultData';

export interface ContentData {
  settings: ChannelSettings;
  members: Member[];
  videos: Video[];
  notices: Notice[];
  genres: Genre[];
  funTags: FunTag[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Extracts YouTube video ID from a variety of YouTube URL formats
 */
export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

/**
 * Safely computes thumbnail URL per Section 7.7:
 * If specified in sheet, use it; otherwise auto-generate `https://i.ytimg.com/vi/{id}/hqdefault.jpg`
 */
export function getSafeThumbnailUrl(video: Video): string {
  if (video.thumbnailUrl && video.thumbnailUrl.startsWith('http')) {
    return video.thumbnailUrl;
  }
  const id = extractYoutubeId(video.youtubeUrl) || video.id;
  if (id && id.length === 11) {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }
  return video.thumbnailUrl || '/assets/aistudio/_______________d4401d74.png';
}

/**
 * Validates external URL to avoid javascript: or other unsafe protocols (Section 10.7)
 */
export function sanitizeExternalUrl(url: string | undefined): string {
  if (!url) return '#';
  const trimmed = url.trim();
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://') || trimmed.startsWith('mailto:')) {
    return trimmed;
  }
  return '#';
}

/**
 * Content provider that returns verified data and supports optional live runtime CSV injection
 */
export async function loadContentData(): Promise<ContentData> {
  const cachedDataStr = sessionStorage.getItem('amber30s_content_cache');
  const cacheTimestamp = sessionStorage.getItem('amber30s_content_timestamp');

  if (cachedDataStr && cacheTimestamp) {
    const elapsed = Date.now() - parseInt(cacheTimestamp, 10);
    // 5 minutes cache per section 10.5
    if (elapsed < 5 * 60 * 1000) {
      try {
        const parsed = JSON.parse(cachedDataStr);
        return {
          ...parsed,
          isLoading: false,
          error: null
        };
      } catch {
        // Continue to fresh data
      }
    }
  }

  // Ready default data
  const data: ContentData = {
    settings: CHANNEL_SETTINGS,
    members: MEMBERS,
    videos: VIDEOS,
    notices: NOTICES,
    genres: GENRES,
    funTags: FUN_TAGS,
    isLoading: false,
    error: null
  };

  try {
    sessionStorage.setItem('amber30s_content_cache', JSON.stringify({
      settings: data.settings,
      members: data.members,
      videos: data.videos,
      notices: data.notices,
      genres: data.genres,
      funTags: data.funTags
    }));
    sessionStorage.setItem('amber30s_content_timestamp', Date.now().toString());
  } catch {
    // Ignore storage quota
  }

  return data;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'ko' | 'en';

export interface Ability {
  name: string;
  name_en: string;
  value: number; // 1 to 5 stars
  basis: string; // ground reason per spec
}

export interface Member {
  id: string;
  slug: string;
  name: string;
  name_en: string;
  colorName: string;
  colorHex: string;
  bgColor: string; // Tailored card background ensuring Romanov (white) and Parkka (black) pop
  position: string;
  position_en: string;
  intro: string;
  intro_en: string;
  mascotImage: string;
  abilities: Ability[];
  displayOrder: number;
}

export interface Video {
  id: string;
  youtubeUrl: string;
  title: string;
  gameName: string;
  genreId: string;
  genreNameKo?: string;
  genreNameEn?: string;
  memberIds: string[];
  funTags: string[];
  publishedAt: string;
  videoType: 'longform' | 'shorts';
  isFeatured: boolean;
  isHomeFeatured: boolean;
  startHereOrder?: number; // 1 to 3
  thumbnailUrl?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  category: '공지' | '업데이트' | '이벤트' | '안내';
  category_en: string;
  isPinned: boolean;
  linkUrl?: string;
  sortOrder?: number;
}

export interface Genre {
  id: string;
  label_ko: string;
  label_en: string;
}

export interface FunTag {
  id: string;
  label_ko: string;
  label_en: string;
}

export interface ChannelSettings {
  channelName: string;
  channelName_en: string;
  youtubeUrl: string;
  subscribeUrl: string;
  contactEmail: string;
  heroHeadline_ko: string;
  heroHeadline_en: string;
  heroLabel_ko: string;
  heroLabel_en: string;
  heroSub_ko: string;
  heroSub_en: string;
}

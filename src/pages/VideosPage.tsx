/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  Search,
  RotateCcw,
  ExternalLink,
  Youtube,
  Tv,
  Filter,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SubscribeCTA } from '../components/common/SubscribeCTA';
import { getSafeThumbnailUrl } from '../data/csvProvider';

export const VideosPage: React.FC = () => {
  const { path, language, content, navigate } = useApp();

  const searchParams = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  }, [path]);

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'all');
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    searchParams.get('member') ? searchParams.get('member')!.split(',') : []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tag') ? searchParams.get('tag')!.split(',') : []
  );
  const [videoType, setVideoType] = useState<'all' | 'longform' | 'shorts'>(
    (searchParams.get('type') as any) || 'all'
  );
  const [sortBy, setSortBy] = useState<'latest' | 'featured'>(
    (searchParams.get('sort') as any) || 'latest'
  );

  const [visibleCount, setVisibleCount] = useState(12);

  const syncParamsToUrl = (
    newSearch: string,
    newGenre: string,
    newMembers: string[],
    newTags: string[],
    newType: string,
    newSort: string
  ) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('q', newSearch);
    if (newGenre !== 'all') params.set('genre', newGenre);
    if (newMembers.length > 0) params.set('member', newMembers.join(','));
    if (newTags.length > 0) params.set('tag', newTags.join(','));
    if (newType !== 'all') params.set('type', newType);
    if (newSort !== 'latest') params.set('sort', newSort);

    const basePath = language === 'en' ? '/en/videos' : '/videos';
    const query = params.toString();
    const newPath = query ? `${basePath}?${query}` : basePath;
    navigate(newPath);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    syncParamsToUrl(val, selectedGenre, selectedMembers, selectedTags, videoType, sortBy);
  };

  const handleGenreChange = (genreId: string) => {
    setSelectedGenre(genreId);
    syncParamsToUrl(searchTerm, genreId, selectedMembers, selectedTags, videoType, sortBy);
  };

  const toggleMember = (mId: string) => {
    const updated = selectedMembers.includes(mId)
      ? selectedMembers.filter((id) => id !== mId)
      : [...selectedMembers, mId];
    setSelectedMembers(updated);
    syncParamsToUrl(searchTerm, selectedGenre, updated, selectedTags, videoType, sortBy);
  };

  const toggleTag = (tagId: string) => {
    const updated = selectedTags.includes(tagId)
      ? selectedTags.filter((t) => t !== tagId)
      : [...selectedTags, tagId];
    setSelectedTags(updated);
    syncParamsToUrl(searchTerm, selectedGenre, selectedMembers, updated, videoType, sortBy);
  };

  const handleTypeChange = (type: 'all' | 'longform' | 'shorts') => {
    setVideoType(type);
    syncParamsToUrl(searchTerm, selectedGenre, selectedMembers, selectedTags, type, sortBy);
  };

  const handleSortChange = (sort: 'latest' | 'featured') => {
    setSortBy(sort);
    syncParamsToUrl(searchTerm, selectedGenre, selectedMembers, selectedTags, videoType, sort);
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedGenre('all');
    setSelectedMembers([]);
    setSelectedTags([]);
    setVideoType('all');
    setSortBy('latest');
    navigate(language === 'en' ? '/en/videos' : '/videos');
  };

  const filteredVideos = useMemo(() => {
    return content.videos
      .filter((video) => {
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchTitle = video.title.toLowerCase().includes(q);
          const matchGame = video.gameName.toLowerCase().includes(q);
          if (!matchTitle && !matchGame) return false;
        }

        if (selectedGenre !== 'all' && video.genreId !== selectedGenre) {
          return false;
        }

        if (selectedMembers.length > 0) {
          const hasAll = selectedMembers.every((mId) => video.memberIds.includes(mId));
          if (!hasAll) return false;
        }

        if (selectedTags.length > 0) {
          const hasAnyTag = selectedTags.some((t) => video.funTags.includes(t));
          if (!hasAnyTag) return false;
        }

        if (videoType !== 'all' && video.videoType !== videoType) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
        }
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  }, [content.videos, searchTerm, selectedGenre, selectedMembers, selectedTags, videoType, sortBy]);

  const featuredSpotlight = content.videos.filter((v) => v.isFeatured).slice(0, 2);

  const getMember = (id: string) => content.members.find((m) => m.id === id);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    selectedGenre !== 'all' ||
    selectedMembers.length > 0 ||
    selectedTags.length > 0 ||
    videoType !== 'all' ||
    sortBy !== 'latest';

  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* 01. VIDEO HERO */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 text-xs font-bold uppercase tracking-wider font-heading">
          <Tv className="w-3.5 h-3.5" />
          <span>{language === 'ko' ? '영상 아카이브' : 'Video Archive'}</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl text-white tracking-tight">
          VIDEOS
        </h1>
        <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
          {language === 'ko'
            ? '웃음 터진 순간들을 게임과 멤버로 골라보세요. 목소리와 플레이만으로 완성된 애매한 삼십대의 에피소드 아카이브.'
            : 'Explore hilarious gaming moments by game, genre, or favorite player. Our full video library.'}
        </p>
        {language === 'en' && (
          <p className="text-xs text-[#94A3B8] font-medium bg-[#1A1D2A] border border-[#2E344D] inline-block px-3 py-1 rounded-md">
            Our videos are made in Korean.
          </p>
        )}
      </div>

      {/* 02. FEATURED COLLECTION */}
      {!hasActiveFilters && featuredSpotlight.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading text-2xl text-white tracking-tight">
            {language === 'ko' ? '추천 에피소드' : 'Featured Collection'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredSpotlight.map((video) => (
              <a
                key={video.id}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gaming-card overflow-hidden group flex flex-col justify-between"
              >
                <div className="relative aspect-16/9 bg-black overflow-hidden">
                  <img
                    src={getSafeThumbnailUrl(video)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#FFB800] text-[#12141C] text-xs font-heading px-3 py-1 rounded-lg shadow-sm">
                    {language === 'ko' ? '추천' : 'FEATURED'}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs font-medium text-[#94A3B8] flex items-center gap-2">
                    <span className="text-[#FFB800] font-bold">{video.gameName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{video.publishedAt}</span>
                  </div>
                  <h3 className="font-heading text-lg text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                    {video.title}
                  </h3>
                  <div className="pt-2 flex items-center justify-between text-xs font-heading text-[#94A3B8] group-hover:text-[#FFB800]">
                    <span>YouTube ↗</span>
                    <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 03. SEARCH & FILTERS */}
      <section className="gaming-card p-6 sm:p-8 space-y-6">
        {/* Search bar & Type Toggle */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={
                language === 'ko'
                  ? '영상 제목 또는 게임명 검색 (예: 티키타카, Lethal Company)...'
                  : 'Search by video title or game name...'
              }
              className="w-full bg-[#12141C] border border-[#2E344D] rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FFB800]"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Video Type Tabs & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Longform vs Shorts */}
            <div className="flex items-center bg-[#12141C] p-1 rounded-xl text-xs font-bold border border-[#2E344D]">
              <button
                onClick={() => handleTypeChange('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  videoType === 'all' ? 'bg-[#2E344D] text-[#FFB800] shadow-xs' : 'text-[#94A3B8]'
                }`}
              >
                {language === 'ko' ? '전체' : 'All'}
              </button>
              <button
                onClick={() => handleTypeChange('longform')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  videoType === 'longform' ? 'bg-[#2E344D] text-[#FFB800] shadow-xs' : 'text-[#94A3B8]'
                }`}
              >
                {language === 'ko' ? '일반 영상' : 'Full Videos'}
              </button>
              <button
                onClick={() => handleTypeChange('shorts')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  videoType === 'shorts' ? 'bg-[#2E344D] text-[#FFB800] shadow-xs' : 'text-[#94A3B8]'
                }`}
              >
                Shorts
              </button>
            </div>

            {/* Sort Selector: Only 최신순 / 추천순 per spec! NO '인기순' */}
            <div className="flex items-center bg-[#12141C] p-1 rounded-xl text-xs font-bold border border-[#2E344D]">
              <button
                onClick={() => handleSortChange('latest')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  sortBy === 'latest' ? 'bg-[#2E344D] text-[#FFB800] shadow-xs' : 'text-[#94A3B8]'
                }`}
              >
                {language === 'ko' ? '최신순' : 'Latest'}
              </button>
              <button
                onClick={() => handleSortChange('featured')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  sortBy === 'featured' ? 'bg-[#2E344D] text-[#FFB800] shadow-xs' : 'text-[#94A3B8]'
                }`}
              >
                {language === 'ko' ? '추천순' : 'Featured'}
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 text-xs font-heading text-[#FFB800] hover:text-[#FFA500] px-3 py-2 rounded-xl bg-[#12141C] border border-[#2E344D] hover:border-[#FFB800] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'ko' ? '초기화' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Rows: Genres, Members, Tags */}
        <div className="space-y-4 pt-4 border-t border-[#2E344D]">
          {/* Genre Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#94A3B8] w-16 shrink-0 font-heading">
              {language === 'ko' ? '장르:' : 'Genre:'}
            </span>
            <button
              onClick={() => handleGenreChange('all')}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
                selectedGenre === 'all'
                  ? 'bg-[#FFB800] text-[#12141C] border-[#FFB800]'
                  : 'bg-[#12141C] text-[#94A3B8] border-[#2E344D] hover:border-[#FFB800] hover:text-white'
              }`}
            >
              {language === 'ko' ? '전체 장르' : 'All Genres'}
            </button>
            {content.genres.map((g) => (
              <button
                key={g.id}
                onClick={() => handleGenreChange(g.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
                  selectedGenre === g.id
                    ? 'bg-[#FFB800] text-[#12141C] border-[#FFB800]'
                    : 'bg-[#12141C] text-[#94A3B8] border-[#2E344D] hover:border-[#FFB800] hover:text-white'
                }`}
              >
                {language === 'ko' ? g.label_ko : g.label_en}
              </button>
            ))}
          </div>

          {/* Member Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#94A3B8] w-16 shrink-0 font-heading">
              {language === 'ko' ? '멤버:' : 'Member:'}
            </span>
            {content.members.map((m) => {
              const isSelected = selectedMembers.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleMember(m.id)}
                  className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-xl font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#2E344D] border-[#FFB800] text-[#FFB800] shadow-xs'
                      : 'bg-[#12141C] border-[#2E344D] text-[#94A3B8] hover:text-white hover:border-[#FFB800]'
                  }`}
                >
                  <img src={m.mascotImage} alt="" className="w-4 h-4 rounded-full object-cover" />
                  <span>{language === 'ko' ? m.name : m.name_en}</span>
                  {isSelected && <Check className="w-3 h-3 text-[#FFB800]" />}
                </button>
              );
            })}
          </div>

          {/* Fun Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#94A3B8] w-16 shrink-0 font-heading">
              {language === 'ko' ? '재미 태그:' : 'Fun Tags:'}
            </span>
            {content.funTags.map((tag) => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#EF684B] border-[#EF684B] text-white font-bold'
                      : 'bg-[#12141C] border-[#2E344D] text-[#94A3B8] hover:border-[#EF684B] hover:text-white'
                  }`}
                >
                  #{language === 'ko' ? tag.label_ko : tag.label_en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        {hasActiveFilters && (
          <div className="pt-3 border-t border-[#2E344D] flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#94A3B8] font-bold font-heading">
              {language === 'ko' ? '적용된 필터:' : 'Active filters:'}
            </span>
            {selectedGenre !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#12141C] border border-[#2E344D] text-[#FFB800] font-bold">
                장르: {content.genres.find((g) => g.id === selectedGenre)?.label_ko}
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleGenreChange('all')} />
              </span>
            )}
            {selectedMembers.map((mId) => (
              <span
                key={mId}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#12141C] border border-[#2E344D] text-[#FFB800] font-bold"
              >
                {getMember(mId)?.name}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleMember(mId)} />
              </span>
            ))}
            {selectedTags.map((tId) => (
              <span
                key={tId}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#12141C] border border-[#2E344D] text-[#FFB800] font-bold"
              >
                #{content.funTags.find((t) => t.id === tId)?.label_ko}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleTag(tId)} />
              </span>
            ))}
          </div>
        )}
      </section>

      {/* 04. VIDEO GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#94A3B8] font-medium">
          <span>
            {language === 'ko'
              ? `총 ${filteredVideos.length}편의 영상`
              : `${filteredVideos.length} videos found`}
          </span>
        </div>

        {filteredVideos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.slice(0, visibleCount).map((video) => {
                const isShorts = video.videoType === 'shorts';
                return (
                  <div
                    key={video.id}
                    className={`gaming-card overflow-hidden flex flex-col group ${
                      isShorts ? 'border-l-4 border-l-[#EF684B]' : ''
                    }`}
                  >
                    <div
                      className={`relative bg-black overflow-hidden ${
                        isShorts ? 'aspect-4/3 sm:aspect-16/9' : 'aspect-16/9'
                      }`}
                    >
                      <img
                        src={getSafeThumbnailUrl(video)}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="bg-black/80 backdrop-blur-xs text-[#FFB800] border border-[#FFB800]/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                          {isShorts ? 'SHORTS' : 'VIDEO'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-[#94A3B8]">
                          <span className="text-[#FFB800] font-bold">{video.gameName}</span>
                          <span aria-hidden="true">·</span>
                          <span>{language === 'ko' ? video.genreNameKo : video.genreNameEn}</span>
                        </div>

                        <h3 className="font-heading text-base text-white line-clamp-2 leading-snug group-hover:text-[#FFB800] transition-colors">
                          {video.title}
                        </h3>

                        {/* Member avatars */}
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {video.memberIds.map((mId) => {
                            const member = getMember(mId);
                            if (!member) return null;
                            return (
                              <span
                                key={mId}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#12141C] border border-[#2E344D] text-neutral-200"
                              >
                                <img
                                  src={member.mascotImage}
                                  alt=""
                                  className="w-3.5 h-3.5 rounded-full object-cover"
                                />
                                <span>{language === 'ko' ? member.name : member.name_en}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Card bottom: date and link */}
                      <div className="pt-4 border-t border-[#2E344D] flex items-center justify-between text-xs">
                        <span className="text-[#94A3B8] font-mono">{video.publishedAt}</span>
                        <a
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-heading text-[#FFB800] hover:text-[#FFA500] transition-colors"
                        >
                          <Youtube className="w-4 h-4 text-red-500" />
                          <span>{language === 'ko' ? '유튜브에서 시청' : 'Watch on YouTube'}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load more button */}
            {filteredVideos.length > visibleCount && (
              <div className="text-center pt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="bg-[#1A1D2A] hover:bg-[#252A3D] text-[#FFB800] font-heading px-8 py-3.5 rounded-2xl border-2 border-[#2E344D] hover:border-[#FFB800] shadow-md transition-all cursor-pointer"
                >
                  {language === 'ko' ? '영상 더 보기 (+12)' : 'Load More Videos (+12)'}
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty Search State */
          <div className="gaming-card p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#12141C] border border-[#2E344D] flex items-center justify-center mx-auto text-[#FFB800]">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-xl text-white">
              {language === 'ko' ? '일치하는 영상이 없습니다' : 'No Videos Found'}
            </h3>
            <p className="text-sm text-[#94A3B8] max-w-md mx-auto">
              {language === 'ko'
                ? '선택하신 검색어나 필터 조건에 맞는 영상이 없습니다. 필터를 초기화하거나 다른 검색어로 찾아보세요.'
                : 'No videos matched your criteria. Try adjusting or clearing your active filters.'}
            </p>
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 bg-[#FFB800] text-[#12141C] font-heading px-6 py-3 rounded-xl text-xs hover:bg-[#FFA500] transition-colors cursor-pointer shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'ko' ? '모든 필터 초기화' : 'Reset All Filters'}</span>
            </button>
          </div>
        )}
      </section>

      <SubscribeCTA />
    </div>
  );
};

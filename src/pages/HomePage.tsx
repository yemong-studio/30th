/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ExternalLink,
  Youtube,
  Users,
  Compass,
  ArrowRight,
  Flame,
  Tv,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SubscribeCTA } from '../components/common/SubscribeCTA';
import { getSafeThumbnailUrl } from '../data/csvProvider';

export const HomePage: React.FC = () => {
  const { language, content, navigate } = useApp();

  const featuredVideo = content.videos.find((v) => v.isHomeFeatured) || content.videos[0];
  const latestVideos = content.videos.slice(0, 4);
  const startHereVideos = content.videos
    .filter((v) => v.startHereOrder !== undefined)
    .sort((a, b) => (a.startHereOrder || 99) - (b.startHereOrder || 99))
    .slice(0, 3);
  const recentNotices = content.notices.slice(0, 3);

  const getMember = (id: string) => content.members.find((m) => m.id === id);

  return (
    <div className="space-y-24 md:space-y-32">
      {/* 01. HERO SECTION */}
      <section className="relative pt-6 md:pt-12 section-separator pb-20">
        {/* Glow / Aura Behind Hero */}
        <div
          className="absolute -top-10 left-1/4 w-[600px] h-[400px] rounded-full pointer-events-none blur-[90px]"
          style={{
            background: 'radial-gradient(circle, rgba(255, 184, 0, 0.16) 0%, rgba(239, 104, 75, 0.08) 50%, rgba(18, 20, 28, 0) 70%)'
          }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 text-xs font-bold tracking-wider uppercase">
              <Tv className="w-3.5 h-3.5" />
              <span>{content.settings[language === 'ko' ? 'heroLabel_ko' : 'heroLabel_en']}</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
              {language === 'ko' ? (
                <>
                  퇴근 후 모인 30대,
                  <br />
                  <span className="text-[#FFB800] drop-shadow-[0_0_25px_rgba(255,184,0,0.35)]">
                    승리보다 핑계
                  </span>
                  가 빠르다.
                </>
              ) : (
                <>
                  After-work thirty-somethings:
                  <br />
                  <span className="text-[#FFB800] drop-shadow-[0_0_25px_rgba(255,184,0,0.35)]">
                    excuses come faster
                  </span>{' '}
                  than victory.
                </>
              )}
            </h1>

            <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed max-w-xl font-normal">
              {content.settings[language === 'ko' ? 'heroSub_ko' : 'heroSub_en']}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={content.settings.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#FFB800] hover:bg-[#FFA500] text-[#12141C] font-heading px-7 py-3.5 rounded-2xl text-base shadow-lg shadow-[#FFB800]/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Youtube className="w-5 h-5 text-[#12141C]" />
                <span>{language === 'ko' ? '유튜브 채널 구독하기' : 'Subscribe on YouTube'}</span>
                <ExternalLink className="w-4 h-4 text-[#12141C]/80" />
              </a>

              <button
                onClick={() => navigate(language === 'en' ? '/en/members' : '/members')}
                className="inline-flex items-center gap-2 bg-[#1A1D2A] hover:bg-[#252A3D] text-white font-heading px-6 py-3.5 rounded-2xl text-base border-2 border-[#2E344D] hover:border-[#FFB800] shadow-md transition-all duration-200 cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#FFB800]" />
                <span>{language === 'ko' ? '멤버 만나보기' : 'Meet the Players'}</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 flex items-center gap-6 text-xs text-[#94A3B8] font-medium border-t border-[#2E344D]/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#48BB78] shadow-xs shadow-[#48BB78]" />
                <span>{language === 'ko' ? '7인의 개성파 플레이어' : '7 Unique Players'}</span>
              </div>
              <span className="text-[#2E344D]">·</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFB800] shadow-xs shadow-[#FFB800]" />
                <span>{language === 'ko' ? '목소리 & 게임 중심' : 'Voice & Gameplay Driven'}</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column: Mascot Showcase Banner */}
          <div className="lg:col-span-5 relative">
            <div className="gaming-card p-4 sm:p-5 relative group">
              <div className="relative rounded-2xl overflow-hidden bg-[#12141C] aspect-4/3 flex items-center justify-center border border-[#2E344D]">
                <img
                  src="/characters/group_banner.png"
                  alt="애매한 삼십대 7인 순정만화풍 공식 캐릭터 일러스트"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141C]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="text-white text-xs font-heading bg-[#1A1D2A]/90 border border-[#2E344D] px-3 py-1.5 rounded-lg">
                    {language === 'ko' ? '7명의 공식 마스코트' : '7 Official Mascots'}
                  </span>
                </div>
              </div>

              {/* Mini quick member avatar row underneath */}
              <div className="mt-4 pt-3 border-t border-[#2E344D] flex items-center justify-between gap-1 overflow-x-auto pb-1">
                {content.members.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => navigate(language === 'en' ? `/en/members/${member.slug}` : `/members/${member.slug}`)}
                    className="flex flex-col items-center gap-1 group/m shrink-0 cursor-pointer p-1 rounded-xl hover:bg-[#252A3D] transition-colors"
                    title={language === 'ko' ? `${member.name} (${member.position})` : `${member.name_en} (${member.position_en})`}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center p-0.5 border border-[#2E344D] group-hover/m:border-[#FFB800] group-hover/m:scale-110 transition-transform shadow-xs overflow-hidden"
                      style={{ backgroundColor: member.bgColor }}
                    >
                      <img
                        src={member.mascotImage}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span className="text-[10px] font-heading text-neutral-300 group-hover/m:text-[#FFB800]">
                      {language === 'ko' ? member.name : member.name_en}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. FEATURED VIDEO */}
      {featuredVideo && (
        <section className="space-y-6 section-separator pb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFB800] uppercase tracking-wider mb-1">
                <Flame className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{language === 'ko' ? '대표 영상' : 'Featured Video'}</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl text-white tracking-tight">
                {language === 'ko' ? '채널의 시그니처 순간' : 'Our Signature Moments'}
              </h2>
            </div>
            {language === 'en' && (
              <span className="text-xs text-[#94A3B8] font-medium bg-[#1A1D2A] border border-[#2E344D] px-3 py-1 rounded-md self-start sm:self-auto">
                Our videos are made in Korean.
              </span>
            )}
          </div>

          <div className="gaming-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* 16:9 Thumbnail carrier */}
            <div className="lg:col-span-7 relative aspect-16/9 bg-black overflow-hidden group">
              <img
                src={getSafeThumbnailUrl(featuredVideo)}
                alt={featuredVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <span className="font-heading text-xs text-[#12141C] bg-[#FFB800] px-3 py-1 rounded-lg shadow-md">
                  FEATURED
                </span>
              </div>
            </div>

            {/* Video Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#94A3B8]">
                  <span className="text-[#FFB800] font-bold">{featuredVideo.gameName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{language === 'ko' ? featuredVideo.genreNameKo : featuredVideo.genreNameEn}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredVideo.publishedAt}</span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl text-white leading-snug">
                  {featuredVideo.title}
                </h3>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {language === 'ko'
                    ? '승패 따위는 중요하지 않다! 끊이지 않는 억울한 남탓과 배꼽 잡는 오디오의 하모니를 감상해보세요.'
                    : 'Winning does not matter! Experience hilarious accusations and comedic audio chemistry in full swing.'}
                </p>

                {/* Cast Members */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-[#94A3B8] block mb-2 font-heading">
                    {language === 'ko' ? '출연 멤버' : 'Cast'}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {featuredVideo.memberIds.map((mId) => {
                      const member = getMember(mId);
                      if (!member) return null;
                      return (
                        <button
                          key={mId}
                          onClick={() => navigate(language === 'en' ? `/en/members/${member.slug}` : `/members/${member.slug}`)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border border-[#2E344D] hover:border-[#FFB800] bg-[#12141C] text-white transition-colors cursor-pointer"
                        >
                          <img
                            src={member.mascotImage}
                            alt=""
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span>{language === 'ko' ? member.name : member.name_en}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2E344D] flex items-center justify-between">
                <a
                  href={featuredVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFA500] text-[#12141C] px-5 py-2.5 rounded-xl font-heading text-sm shadow-md transition-all duration-150 cursor-pointer"
                >
                  <Youtube className="w-4 h-4 text-[#12141C]" />
                  <span>{language === 'ko' ? '유튜브에서 보기' : 'Watch on YouTube'}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 03. LATEST VIDEOS */}
      <section className="space-y-6 section-separator pb-20">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wider block mb-1">
              {language === 'ko' ? '최신 영상' : 'Latest Uploads'}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-white tracking-tight">
              {language === 'ko' ? '따끈따끈한 최신 에피소드' : 'Recent Episodes'}
            </h2>
          </div>
          <button
            onClick={() => navigate(language === 'en' ? '/en/videos' : '/videos')}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-heading text-[#FFB800] hover:text-[#FFA500] transition-colors cursor-pointer"
          >
            <span>{language === 'ko' ? '영상 전체 보기' : 'Browse all videos'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestVideos.map((video) => (
            <div
              key={video.id}
              className="gaming-card overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-16/9 bg-black overflow-hidden">
                <img
                  src={getSafeThumbnailUrl(video)}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-xs text-[#FFB800] border border-[#FFB800]/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {video.videoType === 'shorts' ? 'SHORTS' : 'VIDEO'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-[11px] font-medium text-[#94A3B8] flex items-center gap-1.5">
                    <span className="text-[#FFB800] font-bold">{video.gameName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{language === 'ko' ? video.genreNameKo : video.genreNameEn}</span>
                  </div>
                  <h4 className="font-heading text-base text-white line-clamp-2 leading-snug group-hover:text-[#FFB800] transition-colors">
                    {video.title}
                  </h4>
                </div>

                <div className="pt-3 border-t border-[#2E344D] flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8] text-[11px] font-mono">{video.publishedAt}</span>
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-heading text-[#FFB800] hover:text-[#FFA500] transition-colors"
                  >
                    <span>{language === 'ko' ? '시청' : 'Watch'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sm:hidden text-center pt-2">
          <button
            onClick={() => navigate(language === 'en' ? '/en/videos' : '/videos')}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1D2A] text-[#FFB800] font-heading py-3 rounded-xl border border-[#2E344D]"
          >
            <span>{language === 'ko' ? '영상 전체 보기' : 'Browse all videos'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 04. START HERE (처음이라면 이 영상부터) */}
      {startHereVideos.length > 0 && (
        <section className="gaming-card p-8 sm:p-10 space-y-8 section-separator pb-20">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#12141C] bg-[#FFB800] px-3 py-1 rounded-md mb-2 font-heading">
              <Compass className="w-3.5 h-3.5" />
              <span>{language === 'ko' ? '입문 가이드' : 'Start Here'}</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-white tracking-tight">
              {language === 'ko' ? '처음이라면 이 영상부터' : 'New here? Start with these'}
            </h2>
            <p className="text-sm text-[#94A3B8] mt-1">
              {language === 'ko'
                ? '애매한 삼십대의 색깔과 멤버들의 티키타카를 가장 빠르게 맛볼 수 있는 추천 입문 에피소드입니다.'
                : 'The fastest way to experience Amber 30s unique humor and chemistry.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {startHereVideos.map((video, idx) => (
              <a
                key={video.id}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#12141C] rounded-2xl p-4 border border-[#2E344D] hover:border-[#FFB800] transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-16/9 bg-neutral-900 rounded-xl overflow-hidden border border-[#2E344D]">
                    <img
                      src={getSafeThumbnailUrl(video)}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-[#FFB800] text-[#12141C] flex items-center justify-center font-heading font-black text-xs shadow-md">
                      0{idx + 1}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#FFB800] block mb-1">
                      {video.gameName}
                    </span>
                    <h4 className="font-heading text-base text-white group-hover:text-[#FFB800] transition-colors line-clamp-2 leading-snug">
                      {video.title}
                    </h4>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2E344D] flex items-center justify-between text-xs text-[#94A3B8] font-heading">
                  <span>YouTube ↗</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#FFB800]" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 05. MEET THE PLAYERS */}
      <section className="space-y-8 section-separator pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wider block mb-1">
              {language === 'ko' ? '플레이어 소개' : 'Cast & Mascots'}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-white tracking-tight">
              {language === 'ko' ? '애매한 7인의 멤버들' : 'Meet the 7 Players'}
            </h2>
            <p className="text-sm text-[#94A3B8] mt-1">
              {language === 'ko'
                ? '각자의 개성과 매력적인 마스코트를 가진 일곱 명을 만나보세요.'
                : 'Seven friends, each with their own voice, traits, and original mascot.'}
            </p>
          </div>
          <button
            onClick={() => navigate(language === 'en' ? '/en/members' : '/members')}
            className="inline-flex items-center gap-1.5 text-sm font-heading text-[#FFB800] hover:text-[#FFA500] transition-colors cursor-pointer"
          >
            <span>{language === 'ko' ? '멤버 전체 보기' : 'View all members'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 + 3 Asymmetric Grid with gaming-card */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.members.slice(0, 4).map((member) => (
              <div
                key={member.id}
                onClick={() => navigate(language === 'en' ? `/en/members/${member.slug}` : `/members/${member.slug}`)}
                className="gaming-card p-6 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div
                    className="aspect-square rounded-2xl overflow-hidden p-3 border border-[#2E344D] flex items-center justify-center relative shadow-inner"
                    style={{ backgroundColor: member.bgColor }}
                  >
                    <img
                      src={member.mascotImage}
                      alt={member.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        {member.colorName}
                      </span>
                      <span className="text-[11px] font-mono text-[#FFB800]">0{member.displayOrder}</span>
                    </div>
                    <h3 className="font-heading text-xl text-white mt-1 group-hover:text-[#FFB800] transition-colors">
                      {language === 'ko' ? member.name : member.name_en}
                    </h3>
                    <p className="text-xs font-bold text-[#FFB800] mt-0.5">
                      {language === 'ko' ? member.position : member.position_en}
                    </p>
                  </div>

                  <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed">
                    {language === 'ko' ? member.intro : member.intro_en}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#2E344D] flex items-center justify-between text-xs font-heading text-[#94A3B8] group-hover:text-[#FFB800]">
                  <span>{language === 'ko' ? '프로필 보기' : 'View Profile'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {content.members.slice(4, 7).map((member) => (
              <div
                key={member.id}
                onClick={() => navigate(language === 'en' ? `/en/members/${member.slug}` : `/members/${member.slug}`)}
                className="gaming-card p-6 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div
                    className="aspect-square rounded-2xl overflow-hidden p-3 border border-[#2E344D] flex items-center justify-center relative shadow-inner"
                    style={{ backgroundColor: member.bgColor }}
                  >
                    <img
                      src={member.mascotImage}
                      alt={member.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        {member.colorName}
                      </span>
                      <span className="text-[11px] font-mono text-[#FFB800]">0{member.displayOrder}</span>
                    </div>
                    <h3 className="font-heading text-xl text-white mt-1 group-hover:text-[#FFB800] transition-colors">
                      {language === 'ko' ? member.name : member.name_en}
                    </h3>
                    <p className="text-xs font-bold text-[#FFB800] mt-0.5">
                      {language === 'ko' ? member.position : member.position_en}
                    </p>
                  </div>

                  <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed">
                    {language === 'ko' ? member.intro : member.intro_en}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#2E344D] flex items-center justify-between text-xs font-heading text-[#94A3B8] group-hover:text-[#FFB800]">
                  <span>{language === 'ko' ? '프로필 보기' : 'View Profile'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. COMMUNITY PREVIEW */}
      {recentNotices.length > 0 && (
        <section className="gaming-card p-8 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wider block mb-1">
                {language === 'ko' ? '공지 및 소식' : 'Community Notices'}
              </span>
              <h2 className="font-heading text-2xl text-white tracking-tight">
                {language === 'ko' ? '채널의 최근 소식' : 'Latest Announcements'}
              </h2>
            </div>
            <button
              onClick={() => navigate(language === 'en' ? '/en/community' : '/community')}
              className="text-xs font-heading text-[#FFB800] hover:text-[#FFA500] transition-colors cursor-pointer"
            >
              {language === 'ko' ? '공지 전체 보기 →' : 'All notices →'}
            </button>
          </div>

          <div className="divide-y divide-[#2E344D]">
            {recentNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => navigate(language === 'en' ? `/en/community/notices/${notice.id}` : `/community/notices/${notice.id}`)}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#12141C]/60 px-3 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#12141C] text-[#FFB800] border border-[#2E344D]">
                    {language === 'ko' ? notice.category : notice.category_en}
                  </span>
                  <h4 className="font-heading text-sm text-white hover:text-[#FFB800] transition-colors">
                    {notice.title}
                  </h4>
                </div>
                <span className="text-xs text-[#94A3B8] font-mono shrink-0 sm:pl-4">
                  {notice.publishedAt}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 07. FINAL SUBSCRIBE CTA */}
      <SubscribeCTA />
    </div>
  );
};

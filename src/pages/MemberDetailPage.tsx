/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Star,
  Tv,
  Users,
  Youtube
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SubscribeCTA } from '../components/common/SubscribeCTA';
import { getSafeThumbnailUrl } from '../data/csvProvider';

interface MemberDetailPageProps {
  slug: string;
}

export const MemberDetailPage: React.FC<MemberDetailPageProps> = ({ slug }) => {
  const { language, content, navigate } = useApp();

  const member = content.members.find((m) => m.slug === slug);

  if (!member) {
    return (
      <div className="py-24 text-center space-y-6">
        <h2 className="font-heading text-3xl text-white">
          {language === 'ko' ? '멤버를 찾을 수 없습니다' : 'Player Not Found'}
        </h2>
        <p className="text-sm text-[#94A3B8]">
          {language === 'ko' ? '해당 활동명의 멤버 정보를 확인할 수 없습니다.' : 'The requested member could not be located.'}
        </p>
        <button
          onClick={() => navigate(language === 'en' ? '/en/members' : '/members')}
          className="inline-flex items-center gap-2 bg-[#FFB800] text-[#12141C] px-6 py-3 rounded-xl font-heading text-sm cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ko' ? '멤버 목록으로 돌아가기' : 'Back to Members'}</span>
        </button>
      </div>
    );
  }

  const memberVideos = content.videos.filter((v) => v.memberIds.includes(member.id));

  const coStarringMap = new Map<string, number>();
  memberVideos.forEach((v) => {
    v.memberIds.forEach((otherId) => {
      if (otherId !== member.id) {
        coStarringMap.set(otherId, (coStarringMap.get(otherId) || 0) + 1);
      }
    });
  });

  const coStars = Array.from(coStarringMap.entries())
    .map(([otherId, count]) => ({
      member: content.members.find((m) => m.id === otherId)!,
      count
    }))
    .filter((c) => c.member);

  const currentIndex = content.members.findIndex((m) => m.id === member.id);
  const prevMember = content.members[(currentIndex - 1 + content.members.length) % content.members.length];
  const nextMember = content.members[(currentIndex + 1) % content.members.length];

  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* Back to Members navigation */}
      <div>
        <button
          onClick={() => navigate(language === 'en' ? '/en/members' : '/members')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#94A3B8] hover:text-[#FFB800] transition-colors cursor-pointer font-heading"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ko' ? '멤버 목록으로 돌아가기' : 'Back to all members'}</span>
        </button>
      </div>

      {/* Hero Showcase Card */}
      <div className="gaming-card p-8 sm:p-12 relative overflow-hidden">
        {/* Ambient neon aura blur */}
        <div
          className="absolute -top-10 -right-10 w-96 h-96 rounded-full pointer-events-none blur-[90px]"
          style={{
            background: 'radial-gradient(circle, rgba(255, 184, 0, 0.15) 0%, rgba(18, 20, 28, 0) 70%)'
          }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Mascot visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-6 border-2 border-[#2E344D] shadow-xl flex items-center justify-center"
              style={{ backgroundColor: member.bgColor }}
            >
              <img
                src={member.mascotImage}
                alt={member.name}
                className="w-full h-full object-contain drop-shadow-xl"
              />
              <div className="absolute top-3 right-3 bg-[#12141C] border border-[#2E344D] text-[#FFB800] text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg">
                NO. 0{member.displayOrder}
              </div>
            </div>
          </div>

          {/* Member Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
                <span>{member.colorName}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#FFB800] font-black">
                  {language === 'ko' ? member.position : member.position_en}
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl text-white tracking-tight">
                {language === 'ko' ? member.name : member.name_en}
              </h1>
              {language === 'ko' && (
                <p className="text-sm font-semibold text-[#94A3B8] font-mono">
                  {member.name_en}
                </p>
              )}
            </div>

            <p className="text-base text-neutral-200 leading-relaxed max-w-xl bg-[#12141C]/80 p-5 rounded-2xl border border-[#2E344D]">
              {language === 'ko' ? member.intro : member.intro_en}
            </p>

            {/* Quick stats summary */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-[#94A3B8]">
              <div className="flex items-center gap-1.5">
                <Tv className="w-4 h-4 text-[#FFB800]" />
                <span>
                  {language === 'ko'
                    ? `출연 영상 ${memberVideos.length}편`
                    : `${memberVideos.length} Episodes`}
                </span>
              </div>
              <span className="text-[#2E344D]">·</span>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#EF684B]" />
                <span>
                  {language === 'ko'
                    ? `함께한 동료 ${coStars.length}명`
                    : `${coStars.length} Co-stars`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abilities Section */}
      <section className="gaming-card p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-2xl text-white tracking-tight">
              {language === 'ko' ? '캐릭터 능력치' : 'Player Stats & Traits'}
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              {language === 'ko'
                ? '게임 플레이와 영상에서 돋보이는 멤버 고유의 매력 포인트입니다.'
                : 'Key attributes observed throughout gameplay and teamwork moments.'}
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#FFB800] bg-[#12141C] border border-[#2E344D] px-2.5 py-1 rounded-md self-start sm:self-auto font-heading">
            {language === 'ko' ? '확인된 플레이 특징 기반' : 'Verified Gameplay Attributes'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {member.abilities.map((ability, idx) => (
            <div
              key={idx}
              className="bg-[#12141C] rounded-2xl p-5 border border-[#2E344D] flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-sm font-heading text-white block">
                  {language === 'ko' ? ability.name : ability.name_en}
                </span>
                <span className="text-[11px] text-[#94A3B8] block mt-0.5">
                  {ability.basis}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[#FFB800]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= ability.value
                          ? 'fill-[#FFB800] text-[#FFB800]'
                          : 'fill-[#1A1D2A] text-[#2E344D]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#94A3B8] block">
                  {language === 'ko'
                    ? `5점 만점 중 ${ability.value}점`
                    : `${ability.value} out of 5 stars`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Videos Starring this member */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl text-white tracking-tight">
              {language === 'ko' ? `${member.name} 출연 영상` : `Episodes with ${member.name_en}`}
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              {language === 'ko' ? '해당 멤버의 맹활약이 담긴 에피소드 모음' : 'Watch standout moments featuring this player.'}
            </p>
          </div>
          <button
            onClick={() => navigate(language === 'en' ? `/en/videos?member=${member.id}` : `/videos?member=${member.id}`)}
            className="text-xs font-heading text-[#FFB800] hover:text-[#FFA500] transition-colors cursor-pointer"
          >
            {language === 'ko' ? '필터로 더 보기 →' : 'Filter in Videos →'}
          </button>
        </div>

        {memberVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberVideos.map((video) => (
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
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[11px] font-medium text-[#94A3B8] flex items-center gap-1.5 mb-1">
                      <span className="text-[#FFB800] font-bold">{video.gameName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{video.publishedAt}</span>
                    </div>
                    <h4 className="font-heading text-base text-white line-clamp-2 leading-snug group-hover:text-[#FFB800] transition-colors">
                      {video.title}
                    </h4>
                  </div>
                  <div className="pt-3 border-t border-[#2E344D] flex items-center justify-between">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-heading text-[#FFB800] hover:text-[#FFA500] transition-colors"
                    >
                      <Youtube className="w-3.5 h-3.5 text-red-500" />
                      <span>{language === 'ko' ? '유튜브에서 보기' : 'Watch on YouTube'}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="gaming-card p-8 text-center text-[#94A3B8]">
            {language === 'ko' ? '아직 등록된 영상이 없습니다.' : 'No videos registered yet.'}
          </div>
        )}
      </section>

      {/* Co-Stars & Chemistry */}
      {coStars.length > 0 && (
        <section className="gaming-card p-8 space-y-6">
          <div>
            <h2 className="font-heading text-2xl text-white tracking-tight">
              {language === 'ko' ? '함께 출연한 멤버' : 'Co-stars & Duo Chemistry'}
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              {language === 'ko'
                ? '같은 영상에 함께 출연하여 호흡을 맞춘 멤버들입니다.'
                : 'Members who shared the game session and audio channel in registered episodes.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {coStars.map(({ member: other, count }) => (
              <button
                key={other.id}
                onClick={() => navigate(language === 'en' ? `/en/members/${other.slug}` : `/members/${other.slug}`)}
                className="group p-4 rounded-2xl bg-[#12141C] border border-[#2E344D] hover:border-[#FFB800] transition-all flex flex-col items-center text-center space-y-2 cursor-pointer hover:-translate-y-1 shadow-sm"
              >
                <div
                  className="w-14 h-14 rounded-full overflow-hidden p-1 border border-[#2E344D] shadow-xs"
                  style={{ backgroundColor: other.bgColor }}
                >
                  <img
                    src={other.mascotImage}
                    alt={other.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-sm text-white group-hover:text-[#FFB800] transition-colors">
                    {language === 'ko' ? other.name : other.name_en}
                  </h4>
                  <span className="text-[10px] text-[#94A3B8] font-mono block">
                    {language === 'ko' ? `${count}편 함께함` : `${count} joint eps`}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next Navigation Bar */}
      <div className="pt-6 border-t border-[#2E344D] flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(language === 'en' ? `/en/members/${prevMember.slug}` : `/members/${prevMember.slug}`)}
          className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#1A1D2A] text-left transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1A1D2A] border border-[#2E344D] flex items-center justify-center shrink-0 group-hover:border-[#FFB800] group-hover:text-[#FFB800] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase block">
              {language === 'ko' ? '이전 멤버' : 'Previous'}
            </span>
            <span className="font-heading text-base text-white group-hover:text-[#FFB800]">
              {language === 'ko' ? prevMember.name : prevMember.name_en}
            </span>
          </div>
        </button>

        <button
          onClick={() => navigate(language === 'en' ? '/en/members' : '/members')}
          className="text-xs font-heading text-[#94A3B8] hover:text-[#FFB800] uppercase tracking-wider px-3.5 py-2 rounded-xl border border-[#2E344D] hover:bg-[#1A1D2A] cursor-pointer"
        >
          {language === 'ko' ? '전체 목록' : 'All Members'}
        </button>

        <button
          onClick={() => navigate(language === 'en' ? `/en/members/${nextMember.slug}` : `/members/${nextMember.slug}`)}
          className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#1A1D2A] text-right transition-colors cursor-pointer group"
        >
          <div className="hidden sm:block">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase block">
              {language === 'ko' ? '다음 멤버' : 'Next'}
            </span>
            <span className="font-heading text-base text-white group-hover:text-[#FFB800]">
              {language === 'ko' ? nextMember.name : nextMember.name_en}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#1A1D2A] border border-[#2E344D] flex items-center justify-center shrink-0 group-hover:border-[#FFB800] group-hover:text-[#FFB800] transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      <SubscribeCTA />
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  MessageSquare,
  Pin,
  Mail,
  Youtube,
  ExternalLink,
  ArrowRight,
  Send,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SubscribeCTA } from '../components/common/SubscribeCTA';

export const CommunityPage: React.FC = () => {
  const { language, content, navigate } = useApp();

  const notices = [...content.notices]
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, 5);

  const email = content.settings.contactEmail;

  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* 01. COMMUNITY HERO */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 text-xs font-bold uppercase tracking-wider font-heading">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{language === 'ko' ? '공식 소통 허브' : 'Official Communication Hub'}</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl text-white tracking-tight">
          COMMUNITY
        </h1>
        <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
          {language === 'ko'
            ? '여기는 공식 소통 공간이에요. 채널의 새로운 소식과 공지사항을 확인하고, 유튜브 댓글과 메일을 통해 채널과 소통해보세요.'
            : 'Welcome to our official communication hub. Check announcements and discover how to connect with the team.'}
        </p>
      </div>

      {/* 02. NOTICE SECTION */}
      <section className="gaming-card p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl text-white tracking-tight">
              {language === 'ko' ? '공지사항' : 'Announcements'}
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              {language === 'ko' ? '채널의 최근 업데이트 및 안내사항입니다.' : 'Latest channel updates and guidelines.'}
            </p>
          </div>
          {content.notices.length > 5 && (
            <button
              onClick={() => navigate(language === 'en' ? '/en/community/notices' : '/community/notices')}
              className="text-xs font-heading text-[#FFB800] hover:text-[#FFA500] transition-colors cursor-pointer self-start sm:self-auto"
            >
              {language === 'ko' ? '공지 전체 보기 →' : 'All notices →'}
            </button>
          )}
        </div>

        {notices.length > 0 ? (
          <div className="divide-y divide-[#2E344D]">
            {notices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => navigate(language === 'en' ? `/en/community/notices/${notice.id}` : `/community/notices/${notice.id}`)}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#12141C]/60 px-4 rounded-2xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  {notice.isPinned && (
                    <Pin className="w-4 h-4 text-[#EF684B] fill-[#EF684B] shrink-0" />
                  )}
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#12141C] text-[#FFB800] border border-[#2E344D]">
                    {language === 'ko' ? notice.category : notice.category_en}
                  </span>
                  <h3 className="font-heading text-base text-white group-hover:text-[#FFB800] transition-colors">
                    {notice.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#94A3B8] font-mono shrink-0 sm:pl-4">
                  <span>{notice.publishedAt}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#FFB800]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-[#94A3B8]">
            {language === 'ko' ? '아직 등록된 공지가 없습니다.' : 'No announcements registered yet.'}
          </div>
        )}

        <div className="pt-2 text-center sm:text-left">
          <button
            onClick={() => navigate(language === 'en' ? '/en/community/notices' : '/community/notices')}
            className="inline-flex items-center gap-2 text-xs font-heading text-[#FFB800] hover:text-[#FFA500] transition-colors cursor-pointer"
          >
            <span>{language === 'ko' ? '전체 공지 목록 보기' : 'View full notice archive'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 03. 소통 안내 (GUIDE) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="gaming-card p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <Youtube className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl text-white">
              {language === 'ko' ? '영상에 대한 의견 및 소통' : 'Join Discussion in Comments'}
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {language === 'ko'
                ? '웹사이트에는 별도의 댓글 기능이 운영되지 않습니다. 영상 속 명장면, 티키타카 반응, 다음 플레이 요청은 공식 유튜브 영상의 댓글로 남겨주시면 멤버들이 실시간으로 읽고 있습니다!'
                : 'We do not run website comment boards. Join our viewers directly in YouTube comment sections under each video!'}
            </p>
          </div>

          <div className="pt-4 border-t border-[#2E344D]">
            <a
              href={content.settings.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFA500] text-[#12141C] px-5 py-3 rounded-xl font-heading text-xs transition-colors shadow-md"
            >
              <Youtube className="w-4 h-4 text-[#12141C]" />
              <span>{language === 'ko' ? '유튜브 채널 바로가기' : 'Go to YouTube Channel'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        <div className="gaming-card p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/15 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800]">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl text-white">
              {language === 'ko' ? '채널 문의 및 협업' : 'Contact & Collaboration'}
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {language === 'ko'
                ? '합방, 게임 추천 및 제보, 광고 및 협업 문의는 아래 유형별 메일 버튼을 클릭하시면 제목이 자동 입력되어 손쉽게 보내실 수 있습니다.'
                : 'For collaboration, game recommendations, or general inquiries, click a category below to send an email.'}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={`mailto:${email}?subject=${encodeURIComponent(
                  language === 'ko' ? '[일반 문의] 애매한 삼십대 문의' : '[General] Amber 30s Inquiry'
                )}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#12141C] hover:bg-[#252A3D] text-white font-heading text-xs transition-colors border border-[#2E344D]"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>{language === 'ko' ? '일반 문의' : 'General'}</span>
              </a>

              <a
                href={`mailto:${email}?subject=${encodeURIComponent(
                  language === 'ko' ? '[협업 문의] 애매한 삼십대 협업 및 제안' : '[Collaboration] Amber 30s'
                )}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#12141C] hover:bg-[#252A3D] text-white font-heading text-xs transition-colors border border-[#2E344D]"
              >
                <Send className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{language === 'ko' ? '협업 문의' : 'Collaboration'}</span>
              </a>

              <a
                href={`mailto:${email}?subject=${encodeURIComponent(
                  language === 'ko' ? '[제보·제안] 게임 추천 및 제보' : '[Feedback] Game Recommendation'
                )}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#12141C] hover:bg-[#252A3D] text-white font-heading text-xs transition-colors border border-[#2E344D]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#48BB78]" />
                <span>{language === 'ko' ? '제보·제안' : 'Feedback'}</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-[#2E344D] flex items-center justify-between text-xs text-[#94A3B8]">
            <span>{email}</span>
            <span className="font-mono text-[11px] bg-[#12141C] px-2 py-0.5 rounded border border-[#2E344D]">mailto:</span>
          </div>
        </div>
      </section>

      {/* 04. OFFICIAL CHANNELS */}
      <section className="gaming-card p-8 space-y-4">
        <h2 className="font-heading text-xl text-white tracking-tight">
          {language === 'ko' ? '공식 채널' : 'Official Channels'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={content.settings.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-[#12141C] hover:bg-[#12141C]/80 border border-[#2E344D] hover:border-[#FFB800] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading text-sm text-white group-hover:text-[#FFB800] transition-colors">
                  YouTube @애매한삼십대
                </h4>
                <p className="text-xs text-[#94A3B8]">
                  {language === 'ko' ? '에피소드 풀버전 및 Shorts' : 'Full episodes & Shorts'}
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#94A3B8] group-hover:text-[#FFB800] transition-colors" />
          </a>
        </div>
      </section>

      <SubscribeCTA />
    </div>
  );
};

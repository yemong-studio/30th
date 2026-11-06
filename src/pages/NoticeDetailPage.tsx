/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ExternalLink, Pin, Calendar, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sanitizeExternalUrl } from '../data/csvProvider';
import { SubscribeCTA } from '../components/common/SubscribeCTA';

interface NoticeDetailPageProps {
  id: string;
}

export const NoticeDetailPage: React.FC<NoticeDetailPageProps> = ({ id }) => {
  const { language, content, navigate } = useApp();

  const notice = content.notices.find((n) => n.id === id);

  if (!notice) {
    return (
      <div className="py-24 text-center space-y-6">
        <h2 className="font-heading text-3xl text-white">
          {language === 'ko' ? '공지를 찾을 수 없습니다' : 'Notice Not Found'}
        </h2>
        <p className="text-sm text-[#94A3B8]">
          {language === 'ko' ? '요청하신 공지사항이 존재하지 않거나 비공개 상태입니다.' : 'The requested announcement could not be found.'}
        </p>
        <button
          onClick={() => navigate(language === 'en' ? '/en/community/notices' : '/community/notices')}
          className="inline-flex items-center gap-2 bg-[#FFB800] text-[#12141C] px-6 py-3 rounded-xl font-heading text-sm cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ko' ? '공지 목록으로 돌아가기' : 'Back to Notices'}</span>
        </button>
      </div>
    );
  }

  const currentIndex = content.notices.findIndex((n) => n.id === notice.id);
  const prevNotice = currentIndex > 0 ? content.notices[currentIndex - 1] : null;
  const nextNotice = currentIndex < content.notices.length - 1 ? content.notices[currentIndex + 1] : null;

  const renderSafeContent = (rawText: string) => {
    return rawText.split('\n').map((line, idx) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = line.split(urlRegex);

      return (
        <p key={idx} className="min-h-[1.5rem] leading-relaxed">
          {parts.map((part, pIdx) => {
            if (part.match(urlRegex)) {
              return (
                <a
                  key={pIdx}
                  href={sanitizeExternalUrl(part)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFB800] underline font-semibold hover:text-[#FFA500]"
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6 md:py-10">
      <div>
        <button
          onClick={() => navigate(language === 'en' ? '/en/community/notices' : '/community/notices')}
          className="inline-flex items-center gap-2 text-xs font-heading text-[#94A3B8] hover:text-[#FFB800] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ko' ? '공지 목록으로' : 'Back to notices'}</span>
        </button>
      </div>

      {/* Main Notice Article Card */}
      <article className="gaming-card p-8 sm:p-12 space-y-8">
        <header className="space-y-4 pb-6 border-b border-[#2E344D]">
          <div className="flex flex-wrap items-center gap-3">
            {notice.isPinned && (
              <span className="inline-flex items-center gap-1 text-xs font-heading text-[#EF684B] bg-[#EF684B]/15 border border-[#EF684B]/30 px-2.5 py-1 rounded-md">
                <Pin className="w-3.5 h-3.5 fill-[#EF684B]" />
                <span>중요 공지</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-[#12141C] border border-[#2E344D] text-[#FFB800]">
              <Tag className="w-3 h-3" />
              <span>{language === 'ko' ? notice.category : notice.category_en}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#94A3B8] font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>{notice.publishedAt}</span>
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl text-white leading-tight">
            {notice.title}
          </h1>
        </header>

        {/* Body content */}
        <div className="text-base text-neutral-200 space-y-4 leading-relaxed font-sans">
          {renderSafeContent(notice.content)}
        </div>

        {notice.linkUrl && (
          <div className="pt-6 border-t border-[#2E344D]">
            <a
              href={sanitizeExternalUrl(notice.linkUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFA500] text-[#12141C] px-5 py-3 rounded-xl font-heading text-xs transition-colors shadow-md"
            >
              <span>{language === 'ko' ? '관련 링크 바로가기' : 'Visit Related Link'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        )}
      </article>

      {/* Prev / Next Notice */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevNotice ? (
          <button
            onClick={() => navigate(language === 'en' ? `/en/community/notices/${prevNotice.id}` : `/community/notices/${prevNotice.id}`)}
            className="gaming-card p-5 text-left cursor-pointer group"
          >
            <span className="text-[10px] font-heading text-[#94A3B8] uppercase block mb-1">
              ← {language === 'ko' ? '이전 공지' : 'Previous'}
            </span>
            <span className="font-heading text-sm text-white group-hover:text-[#FFB800] line-clamp-1">
              {prevNotice.title}
            </span>
          </button>
        ) : (
          <div />
        )}

        {nextNotice && (
          <button
            onClick={() => navigate(language === 'en' ? `/en/community/notices/${nextNotice.id}` : `/community/notices/${nextNotice.id}`)}
            className="gaming-card p-5 text-right cursor-pointer group"
          >
            <span className="text-[10px] font-heading text-[#94A3B8] uppercase block mb-1">
              {language === 'ko' ? '다음 공지' : 'Next'} →
            </span>
            <span className="font-heading text-sm text-white group-hover:text-[#FFB800] line-clamp-1">
              {nextNotice.title}
            </span>
          </button>
        )}
      </div>

      <SubscribeCTA />
    </div>
  );
};

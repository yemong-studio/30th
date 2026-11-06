/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Pin, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SubscribeCTA } from '../components/common/SubscribeCTA';

export const AllNoticesPage: React.FC = () => {
  const { language, content, navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label_ko: '전체', label_en: 'All' },
    { id: '공지', label_ko: '공지', label_en: 'Notice' },
    { id: '안내', label_ko: '안내', label_en: 'Guide' },
    { id: '업데이트', label_ko: '업데이트', label_en: 'Update' }
  ];

  const filteredNotices = [...content.notices]
    .filter((n) => {
      if (selectedCategory !== 'all' && n.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  return (
    <div className="space-y-12 py-6 md:py-10">
      <div>
        <button
          onClick={() => navigate(language === 'en' ? '/en/community' : '/community')}
          className="inline-flex items-center gap-2 text-xs font-heading text-[#94A3B8] hover:text-[#FFB800] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ko' ? 'COMMUNITY로 돌아가기' : 'Back to COMMUNITY'}</span>
        </button>
      </div>

      <div className="space-y-2">
        <h1 className="font-heading text-4xl text-white tracking-tight">
          {language === 'ko' ? '전체 공지사항' : 'All Announcements'}
        </h1>
        <p className="text-sm text-[#94A3B8]">
          {language === 'ko'
            ? '애매한 삼십대 채널의 공식 공지와 소식 아카이브입니다.'
            : 'Archive of official updates and guidelines.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="gaming-card p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category tabs */}
        <div className="flex items-center bg-[#12141C] p-1 rounded-xl text-xs font-bold border border-[#2E344D] overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                selectedCategory === c.id ? 'bg-[#2E344D] text-[#FFB800] shadow-xs' : 'text-[#94A3B8]'
              }`}
            >
              {language === 'ko' ? c.label_ko : c.label_en}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ko' ? '공지 검색...' : 'Search notices...'}
            className="w-full bg-[#12141C] border border-[#2E344D] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FFB800]"
          />
        </div>
      </div>

      {/* Notice List */}
      <div className="gaming-card overflow-hidden divide-y divide-[#2E344D]">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => navigate(language === 'en' ? `/en/community/notices/${notice.id}` : `/community/notices/${notice.id}`)}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#12141C]/60 transition-colors cursor-pointer group"
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
          ))
        ) : (
          <div className="p-12 text-center text-[#94A3B8]">
            {language === 'ko' ? '검색된 공지가 없습니다.' : 'No notices match your search.'}
          </div>
        )}
      </div>

      <SubscribeCTA />
    </div>
  );
};

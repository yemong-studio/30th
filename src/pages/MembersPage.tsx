/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SubscribeCTA } from '../components/common/SubscribeCTA';

export const MembersPage: React.FC = () => {
  const { language, content, navigate } = useApp();

  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 text-xs font-bold uppercase tracking-wider font-heading">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'ko' ? '멤버 아카이브' : 'Player Archive'}</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl text-white tracking-tight">
          MEMBERS
        </h1>
        <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
          {language === 'ko'
            ? '각자의 개성을 가진 일곱 명. 퇴근 후 게임 안에서 마이크를 켜는 순간 시작되는 유쾌한 케미와 마스코트를 만나보세요.'
            : 'Seven unique friends. Meet the distinct voices, playstyles, and mascots behind Amber 30s.'}
        </p>
      </div>

      {/* 4 + 3 Asymmetric Grid with gaming-card */}
      <div className="space-y-6">
        {/* Row 1: 4 Cards */}
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
                    <span className="text-xs font-mono font-bold text-[#FFB800]">#0{member.displayOrder}</span>
                  </div>
                  <h3 className="font-heading text-2xl text-white mt-1 group-hover:text-[#FFB800] transition-colors">
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

              <div className="mt-6 pt-4 border-t border-[#2E344D] flex items-center justify-between text-xs font-heading text-[#94A3B8] group-hover:text-[#FFB800]">
                <span>{language === 'ko' ? '상세 프로필 보기' : 'Full Profile'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: 3 Cards */}
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
                    <span className="text-xs font-mono font-bold text-[#FFB800]">#0{member.displayOrder}</span>
                  </div>
                  <h3 className="font-heading text-2xl text-white mt-1 group-hover:text-[#FFB800] transition-colors">
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

              <div className="mt-6 pt-4 border-t border-[#2E344D] flex items-center justify-between text-xs font-heading text-[#94A3B8] group-hover:text-[#FFB800]">
                <span>{language === 'ko' ? '상세 프로필 보기' : 'Full Profile'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <SubscribeCTA />
    </div>
  );
};

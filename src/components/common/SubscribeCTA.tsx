/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, Youtube, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SubscribeCTAProps {
  headline?: string;
  subheadline?: string;
}

export const SubscribeCTA: React.FC<SubscribeCTAProps> = ({ headline, subheadline }) => {
  const { language, content } = useApp();

  const title = headline || (language === 'ko' ? '다음 게임에도 함께할래?' : 'Joining us for the next game too?');
  const subtitle = subheadline || (
    language === 'ko'
      ? '퇴근 후 모인 30대 친구들의 승리보다 빠른 핑계와 끊이지 않는 티키타카. 지금 구독하고 함께 웃어보세요.'
      : 'Excuses faster than victory and unstoppable banter after a long workday. Subscribe on YouTube now.'
  );

  return (
    <section className="relative overflow-hidden bg-[#1A1D2A] text-white py-16 px-6 sm:px-10 lg:px-12 rounded-3xl my-12 border-2 border-[#2E344D] shadow-2xl">
      {/* Glow / Aura Effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full pointer-events-none blur-[70px]"
        style={{
          background: 'radial-gradient(circle, rgba(255, 184, 0, 0.15) 0%, rgba(239, 104, 75, 0.08) 50%, rgba(18, 20, 28, 0) 70%)'
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'ko' ? '유튜브 공식 채널' : 'Official YouTube Channel'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white leading-tight tracking-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={content.settings.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FFB800] hover:bg-[#FFA500] text-[#12141C] font-heading px-8 py-3.5 rounded-2xl text-base shadow-lg shadow-[#FFB800]/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Youtube className="w-5 h-5 text-[#12141C]" />
            <span>{language === 'ko' ? '유튜브 채널 구독하기' : 'Subscribe on YouTube'}</span>
            <ExternalLink className="w-4 h-4 text-[#12141C]/80" />
          </a>
        </div>
      </div>
    </section>
  );
};

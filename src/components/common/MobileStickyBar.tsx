/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Youtube, X, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileStickyBar: React.FC = () => {
  const { language, content, isMobileBarDismissed, dismissMobileBar } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isMobileBarDismissed) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      if (scrollY > 300 && scrollY < docHeight - winHeight - 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileBarDismissed]);

  if (isMobileBarDismissed || !isVisible) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-[#1A1D2A] text-white p-3 rounded-2xl shadow-2xl border-2 border-[#2E344D] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-[#FFB800] flex items-center justify-center shrink-0 shadow-sm">
            <Youtube className="w-4 h-4 text-[#12141C]" />
          </div>
          <div className="truncate">
            <p className="text-xs font-heading leading-tight truncate text-white">
              {language === 'ko' ? '애매한 삼십대 공식 채널' : 'Amber 30s Channel'}
            </p>
            <p className="text-[10px] text-[#94A3B8] truncate">
              {language === 'ko' ? '매주 퇴근 후 유쾌한 게임' : 'After-work gaming banter'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={content.settings.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FFB800] text-[#12141C] px-3 py-1.5 rounded-xl font-heading text-xs flex items-center gap-1 shadow-sm"
          >
            <span>{language === 'ko' ? '구독' : 'Subscribe'}</span>
            <ExternalLink className="w-3 h-3 text-[#12141C]/80" />
          </a>
          <button
            onClick={dismissMobileBar}
            className="p-1.5 text-[#94A3B8] hover:text-white rounded-lg"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

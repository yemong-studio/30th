/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Home, Tv } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotFoundPage: React.FC = () => {
  const { language, navigate } = useApp();

  return (
    <div className="py-24 max-w-xl mx-auto text-center space-y-8">
      <div className="relative inline-block">
        <div className="text-8xl sm:text-9xl font-heading text-[#FFB800]/10 tracking-widest">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#1A1D2A] shadow-2xl border-2 border-[#FFB800] p-2 flex items-center justify-center">
            <img
              src="/characters/yemong.jpg"
              alt="길을 잃은 예몽이"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB800] bg-[#FFB800]/15 border border-[#FFB800]/30 px-3 py-1 rounded-full uppercase tracking-wider font-heading">
          <Compass className="w-3.5 h-3.5" />
          <span>Out of Map</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl text-white">
          {language === 'ko' ? '여기는 맵 밖이에요. 길을 잃으셨나요?' : "You've wandered off the map."}
        </h1>
        <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
          {language === 'ko'
            ? '요청하신 페이지가 게임 맵 밖으로 떨어졌습니다. 안전한 본진(홈)으로 복귀하거나 영상을 둘러보세요.'
            : 'The requested route does not exist. Respawn back at the home base or browse recent videos.'}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          onClick={() => navigate(language === 'en' ? '/en' : '/')}
          className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFA500] text-[#12141C] font-heading px-6 py-3.5 rounded-xl text-sm shadow-md transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>{language === 'ko' ? '홈으로 돌아가기' : 'Back to Home'}</span>
        </button>

        <button
          onClick={() => navigate(language === 'en' ? '/en/videos' : '/videos')}
          className="inline-flex items-center gap-2 bg-[#1A1D2A] hover:bg-[#252A3D] text-white font-heading px-6 py-3.5 rounded-xl text-sm border border-[#2E344D] hover:border-[#FFB800] transition-all cursor-pointer"
        >
          <Tv className="w-4 h-4 text-[#FFB800]" />
          <span>{language === 'ko' ? '영상 보러 가기' : 'Browse Videos'}</span>
        </button>
      </div>
    </div>
  );
};

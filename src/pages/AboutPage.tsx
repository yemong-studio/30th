/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Mic,
  Gamepad2,
  Users2,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SubscribeCTA } from '../components/common/SubscribeCTA';

export const AboutPage: React.FC = () => {
  const { language, navigate } = useApp();

  const identities = [
    {
      icon: <Mic className="w-6 h-6 text-[#FFB800]" />,
      title: 'VOICE',
      title_ko: '목소리의 힘',
      desc_ko: '얼굴을 보여주지 않아도 충분합니다. 마이크 너머로 생생하게 전달되는 7인 7색의 목소리와 감정, 거침없는 오디오가 채널의 가장 강력한 무기입니다.',
      desc_en: 'No face reveals necessary. Seven distinct voices, raw expressions, and relentless audio chemistry carry every single moment.'
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-[#2CB199]" />,
      title: 'GAMEPLAY',
      title_ko: '게임 본연의 몰입',
      desc_ko: '공포게임, 협동 파티, 생존 어드벤처까지. 퇴근 후 지친 일상을 잊고 초등학생 때처럼 게임에 흠뻑 몰입하는 순수한 즐거움을 공유합니다.',
      desc_en: 'Horror, party co-op, or survival adventures. Rediscovering that childlike immersion where all everyday stress melts away.'
    },
    {
      icon: <Users2 className="w-6 h-6 text-[#EF684B]" />,
      title: 'TEAMWORK',
      title_ko: '예측불허의 팀플레이',
      desc_ko: '완벽한 전략 따위는 없습니다. 순간의 방심과 엉뚱한 실수, 서로를 구하려다 함께 빠지는 예측 불가능한 돌발 상황이 끊임없는 재미를 만듭니다.',
      desc_en: 'No rigid strategies. Accidental blunders, clutch rescues, and unexpected chain reactions keep every session unpredictable.'
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-[#A78BFA]" />,
      title: 'TIKI-TAKA',
      title_ko: '핑계와 티키타카',
      desc_ko: '승리보다 빠른 핑계, 억울한 남탓, 그리고 이어지는 폭소. 30대 친구들의 솔직하고 유쾌한 대화가 보는 이들에게 편안한 웃음을 선사합니다.',
      desc_en: 'Excuses faster than victory, playful blame, and non-stop laughter. Honest banter that brings genuine smiles.'
    }
  ];

  return (
    <div className="space-y-24 py-6 md:py-10">
      {/* 01. BRAND HERO */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30 text-xs font-bold uppercase tracking-wider font-heading">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'ko' ? '채널 스토리 & 정체성' : 'About Amber 30s'}</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
          {language === 'ko' ? '목소리는 각자, 웃음은 함께.' : 'Voices apart, laughter together.'}
        </h1>

        <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
          {language === 'ko'
            ? '퇴근 후 모인 30대, 승리보다 핑계가 빠르다. 7명이 함께 만들어가는 예측할 수 없는 게임의 순간들을 소개합니다.'
            : 'After-work thirty-somethings where excuses come faster than victory. Discover our story and ethos.'}
        </p>

        {/* Mascot Group Banner Showcase */}
        <div className="pt-8">
          <div className="gaming-card p-4 sm:p-6 max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden bg-[#12141C] border border-[#2E344D] p-2">
              <img
                src="/assets/aistudio/_______________d4401d74.png"
                alt="애매한 삼십대 7명의 공식 마스코트"
                className="w-full h-auto rounded-xl"
              />
            </div>
            <div className="pt-4 flex items-center justify-between text-xs text-[#94A3B8] font-heading">
              <span>{language === 'ko' ? '애매한 삼십대 7인 마스코트 세계관' : '7 Official Amber 30s Mascots'}</span>
              <button
                onClick={() => navigate(language === 'en' ? '/en/members' : '/members')}
                className="text-[#FFB800] hover:underline"
              >
                {language === 'ko' ? '멤버 소개 보기 →' : 'Meet the members →'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 02. WHO WE ARE */}
      <section className="gaming-card p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wider block font-heading">
              {language === 'ko' ? '채널 소개' : 'Who We Are'}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-white tracking-tight">
              {language === 'ko' ? '얼굴 대신 목소리로 전하는 진짜 웃음' : 'Authentic Laughs Through Voices Only'}
            </h2>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              {language === 'ko'
                ? '각자의 개성을 가진 일곱 명이 게임 안에서 만나 만들어가는 예측할 수 없는 순간들. 목소리와 게임 플레이만으로 이어지는 애매한 삼십대의 이야기를 만나보세요.'
                : 'Seven friends, each with a voice of their own, meet inside games and create moments no one can predict. Meet the story of Amber 30s, told through nothing but voices and gameplay.'}
            </p>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {language === 'ko'
                ? '저희는 출연자의 얼굴이나 실사 외모를 내세우지 않습니다. 오직 게임 속 상황, 목소리의 뉘앙스, 그리고 친구들 사이에서만 터져 나오는 날 것의 대화와 호흡에 집중합니다.'
                : 'We do not rely on facial reveals or real-life footage. Our focus stays purely on gameplay dynamics, audio nuances, and spontaneous dialogue between lifelong friends.'}
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#12141C] p-6 sm:p-8 rounded-2xl border border-[#2E344D] space-y-4">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-[#FFB800]" />
              <span className="text-xs font-mono font-bold text-[#FFB800] uppercase">Voice-Driven Architecture</span>
            </div>
            <div className="space-y-3 text-xs text-[#94A3B8]">
              <div className="p-3.5 bg-[#1A1D2A] rounded-xl border border-[#2E344D]">
                <span className="font-heading text-sm text-white block mb-0.5">
                  {language === 'ko' ? '노 페이스 리빌 (No Face-cam)' : 'Zero Face-cam Policy'}
                </span>
                {language === 'ko'
                  ? '부담 없이 온전히 게임과 대화에 집중할 수 있는 환경을 만듭니다.'
                  : 'Allows full focus on natural gameplay and immersive listening.'}
              </div>
              <div className="p-3.5 bg-[#1A1D2A] rounded-xl border border-[#2E344D]">
                <span className="font-heading text-sm text-white block mb-0.5">
                  {language === 'ko' ? '오리지널 마스코트 세계관' : 'Original Mascot System'}
                </span>
                {language === 'ko'
                  ? '각 멤버의 실제 성향을 담아낸 귀엽고 독창적인 7종의 캐릭터.'
                  : 'Seven tailored mascots representing each player’s in-game personality.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. OUR IDENTITY */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wider block font-heading">
            {language === 'ko' ? '4가지 핵심 가치' : 'Four Core Pillars'}
          </span>
          <h2 className="font-heading text-3xl text-white tracking-tight">
            OUR IDENTITY
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {identities.map((item, idx) => (
            <div
              key={idx}
              className="gaming-card p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#12141C] border border-[#2E344D] flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FFB800] block">0{idx + 1}</span>
                  <h3 className="font-heading text-xl text-white mt-0.5">{item.title}</h3>
                  <p className="text-xs font-heading text-[#FFB800]">{item.title_ko}</p>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {language === 'ko' ? item.desc_ko : item.desc_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04. OUR CONTENT & CHARACTERS LINK ROWS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="gaming-card p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wider font-heading">VIDEOS</span>
            <h3 className="font-heading text-2xl text-white">
              {language === 'ko' ? '에피소드 라이브러리' : 'Episode Library'}
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {language === 'ko'
                ? 'Lethal Company, Phasmophobia, Pico Park 등 다양한 게임 영상과 숏폼을 만나보세요.'
                : 'Browse full gaming sessions, funny compilations, and Shorts.'}
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate(language === 'en' ? '/en/videos' : '/videos')}
              className="inline-flex items-center gap-2 bg-[#FFB800] text-[#12141C] font-heading px-5 py-3 rounded-xl text-xs hover:bg-[#FFA500] transition-colors cursor-pointer shadow-md"
            >
              <span>{language === 'ko' ? 'VIDEOS 페이지에서 탐색' : 'Explore Videos'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="gaming-card p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wider font-heading">MEMBERS</span>
            <h3 className="font-heading text-2xl text-white">
              {language === 'ko' ? '7인의 멤버와 마스코트' : '7 Mascots & Players'}
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {language === 'ko'
                ? '예몽, 뚜기, 보왕, 자꾸, 파르카, 산체스, 로마노프의 프로필과 스탯을 확인해보세요.'
                : 'Discover traits, stats, and member-specific episodes.'}
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate(language === 'en' ? '/en/members' : '/members')}
              className="inline-flex items-center gap-2 bg-[#12141C] text-white font-heading px-5 py-3 rounded-xl text-xs border border-[#2E344D] hover:border-[#FFB800] hover:text-[#FFB800] transition-colors cursor-pointer shadow-md"
            >
              <span>{language === 'ko' ? 'MEMBERS 페이지에서 만나기' : 'Meet Members'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <SubscribeCTA />
    </div>
  );
};

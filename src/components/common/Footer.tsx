/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Youtube, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { language, content, navigate, setLanguage } = useApp();

  const navLinks = [
    { label: language === 'ko' ? '홈 (HOME)' : 'Home', path: language === 'en' ? '/en' : '/' },
    { label: language === 'ko' ? '멤버 소개 (MEMBERS)' : 'Members', path: language === 'en' ? '/en/members' : '/members' },
    { label: language === 'ko' ? '영상 탐색 (VIDEOS)' : 'Videos', path: language === 'en' ? '/en/videos' : '/videos' },
    { label: language === 'ko' ? '커뮤니티 (COMMUNITY)' : 'Community', path: language === 'en' ? '/en/community' : '/community' },
    { label: language === 'ko' ? '채널 소개 (ABOUT)' : 'About', path: language === 'en' ? '/en/about' : '/about' }
  ];

  return (
    <footer className="relative z-10 bg-[#1A1D2A]/90 text-white pt-16 pb-12 border-t border-dashed border-[#2A2F45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2E344D]">
          {/* Col 1: Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFB800] to-[#EF684B] text-[#12141C] flex items-center justify-center font-black text-sm font-heading">
                A30
              </div>
              <span className="font-heading text-xl tracking-tight text-white">
                {language === 'ko' ? '애매한 삼십대' : 'Amber 30s'}
              </span>
            </div>
            <p className="text-sm text-[#94A3B8] max-w-md leading-relaxed">
              {language === 'ko'
                ? '퇴근 후 모인 30대, 승리보다 핑계가 빠르다. 얼굴 공개 없이 목소리와 게임 플레이로 이어지는 일곱 친구들의 유쾌한 세계관.'
                : 'After-work thirty-somethings where excuses come faster than victory. A voice-driven gaming universe created by seven close friends.'}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={content.settings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-[#FFB800] transition-colors bg-[#12141C] hover:bg-[#12141C]/80 px-3.5 py-2 rounded-xl border border-[#2E344D]"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube @애매한삼십대</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              <a
                href={`mailto:${content.settings.contactEmail}?subject=${encodeURIComponent(
                  language === 'ko' ? '[애매한 삼십대 문의]' : '[Amber 30s Inquiry]'
                )}`}
                className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-[#FFB800] transition-colors bg-[#12141C] hover:bg-[#12141C]/80 px-3.5 py-2 rounded-xl border border-[#2E344D]"
              >
                <Mail className="w-4 h-4 text-[#FFB800]" />
                <span>{content.settings.contactEmail}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-heading text-sm text-[#FFB800] uppercase tracking-wider mb-4">
              {language === 'ko' ? '페이지 바로가기' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Channel Info & Language */}
          <div>
            <h4 className="font-heading text-sm text-[#FFB800] uppercase tracking-wider mb-4">
              {language === 'ko' ? '채널 및 설정' : 'Channel & Language'}
            </h4>
            <div className="space-y-3 text-sm text-[#94A3B8]">
              <p>
                {language === 'ko'
                  ? '영상 및 콘텐츠에 대한 소통은 유튜브 댓글을 통해 참여하실 수 있습니다.'
                  : 'Join the conversation in the comments section on our YouTube videos.'}
              </p>
              <div className="pt-2">
                <span className="text-xs text-[#64748B] block mb-1.5 font-medium">Language:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLanguage('ko')}
                    className={`text-xs px-2.5 py-1 rounded transition-colors ${
                      language === 'ko' ? 'bg-[#2E344D] text-[#FFB800] font-bold' : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    한국어 (KO)
                  </button>
                  <span className="text-[#2E344D]">/</span>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`text-xs px-2.5 py-1 rounded transition-colors ${
                      language === 'en' ? 'bg-[#2E344D] text-[#FFB800] font-bold' : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    English (EN)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Privacy */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div>
            <p>© 2026 애매한 삼십대 (Amber 30s). All rights reserved.</p>
          </div>
          <div className="flex items-center gap-2 text-center md:text-right">
            <ShieldCheck className="w-4 h-4 text-[#FFB800] shrink-0" />
            <span>
              {language === 'ko'
                ? '이 사이트는 회원가입·댓글·문의 폼 등으로 개인정보를 수집하지 않습니다.'
                : 'This site does not collect personal information through sign-ups, comments, or contact forms.'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

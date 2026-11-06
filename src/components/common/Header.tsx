/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ExternalLink, Menu, X, Youtube } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { path, language, content, navigate, setLanguage } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const normalizedPath = path.replace(/^\/en(\/|$)/, '/').split('?')[0];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: 'HOME', path: language === 'en' ? '/en' : '/' },
    { label: 'MEMBERS', path: language === 'en' ? '/en/members' : '/members' },
    { label: 'VIDEOS', path: language === 'en' ? '/en/videos' : '/videos' },
    { label: 'COMMUNITY', path: language === 'en' ? '/en/community' : '/community' },
    { label: 'ABOUT', path: language === 'en' ? '/en/about' : '/about' }
  ];

  const isNavActive = (itemPath: string) => {
    const itemNorm = itemPath.replace(/^\/en(\/|$)/, '/').split('?')[0];
    if (itemNorm === '/') {
      return normalizedPath === '/' || normalizedPath === '';
    }
    return normalizedPath.startsWith(itemNorm);
  };

  const handleNavClick = (targetPath: string) => {
    navigate(targetPath);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-[#12141C]/95 backdrop-blur-md border-b border-[#2E344D] shadow-lg shadow-black/40'
          : 'bg-[#12141C]/80 backdrop-blur-sm border-b border-[#2E344D]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick(language === 'en' ? '/en' : '/')}
            className="group text-left flex items-center gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFB800]"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFB800] to-[#EF684B] text-[#12141C] flex items-center justify-center font-black text-sm tracking-wider shadow-md shadow-[#FFB800]/20 group-hover:scale-105 transition-transform font-heading">
              A30
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl text-white tracking-tight leading-none group-hover:text-[#FFB800] transition-colors">
                {language === 'ko' ? '애매한 삼십대' : 'Amber 30s'}
              </span>
              <span className="text-[10px] text-[#94A3B8] font-medium tracking-widest uppercase mt-0.5">
                Official YouTube
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = isNavActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm tracking-wide transition-all duration-150 py-1 cursor-pointer whitespace-nowrap relative ${
                  active
                    ? 'text-[#FFB800] font-bold'
                    : 'text-[#94A3B8] hover:text-white font-medium'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFB800] to-[#EF684B] rounded-full shadow-sm shadow-[#FFB800]/50" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Toggle & YouTube Subscribe Action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {/* Language Switch */}
          <div className="flex items-center bg-[#1A1D2A] border border-[#2E344D] rounded-xl p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'ko'
                  ? 'bg-[#2E344D] text-[#FFB800] font-bold shadow-xs'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
              aria-label="한국어로 보기"
            >
              KO
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#2E344D] text-[#FFB800] font-bold shadow-xs'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
              aria-label="View in English"
            >
              EN
            </button>
          </div>

          {/* Primary Action Button - YouTube Subscribe */}
          <a
            href={content.settings.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFA500] text-[#12141C] px-4.5 py-2 rounded-xl font-bold text-sm shadow-md shadow-[#FFB800]/20 transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Youtube className="w-4 h-4 text-[#12141C]" />
            <span className="font-heading">{language === 'ko' ? '유튜브 구독' : 'Subscribe'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#12141C]/80" />
          </a>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={content.settings.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FFB800] text-[#12141C] px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm font-heading"
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>{language === 'ko' ? '구독' : 'Sub'}</span>
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#94A3B8] hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A1D2A] border-b border-[#2E344D] px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2E344D]">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Language</span>
            <div className="flex items-center bg-[#12141C] border border-[#2E344D] rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLanguage('ko')}
                className={`px-3 py-1 rounded-md ${
                  language === 'ko' ? 'bg-[#2E344D] text-[#FFB800] font-bold' : 'text-[#94A3B8]'
                }`}
              >
                한국어 (KO)
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md ${
                  language === 'en' ? 'bg-[#2E344D] text-[#FFB800] font-bold' : 'text-[#94A3B8]'
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              const active = isNavActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center justify-between py-2 text-base font-heading text-left transition-colors ${
                    active ? 'text-[#FFB800]' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-[#FFB800] shadow-sm shadow-[#FFB800]" />}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#2E344D]">
            <a
              href={content.settings.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#FFB800] text-[#12141C] py-3 rounded-xl font-bold font-heading text-sm shadow-md"
            >
              <Youtube className="w-5 h-5 text-[#12141C]" />
              <span>{language === 'ko' ? '유튜브 채널 구독하기' : 'Subscribe on YouTube'}</span>
              <ExternalLink className="w-4 h-4 opacity-75" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileStickyBar } from './components/common/MobileStickyBar';
import { BackToTop } from './components/common/BackToTop';
import { GamingBackground } from './components/common/GamingBackground';

import { HomePage } from './pages/HomePage';
import { MembersPage } from './pages/MembersPage';
import { MemberDetailPage } from './pages/MemberDetailPage';
import { VideosPage } from './pages/VideosPage';
import { CommunityPage } from './pages/CommunityPage';
import { AllNoticesPage } from './pages/AllNoticesPage';
import { NoticeDetailPage } from './pages/NoticeDetailPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppRouter: React.FC = () => {
  const { path, language } = useApp();

  const pathname = path.split('?')[0];
  const route = pathname.replace(/^\/en(\/|$)/, '/');

  useEffect(() => {
    document.documentElement.lang = language;
    const baseTitle = language === 'ko' ? '애매한 삼십대 (Amber 30s)' : 'Amber 30s Official';

    if (route === '/' || route === '') {
      document.title = `${baseTitle} | 공식 유튜브 브랜드 웹사이트`;
    } else if (route === '/members') {
      document.title = `MEMBERS | ${baseTitle}`;
    } else if (route.startsWith('/members/')) {
      const slug = route.replace('/members/', '');
      document.title = `${slug.toUpperCase()} | ${baseTitle}`;
    } else if (route === '/videos') {
      document.title = `VIDEOS | ${baseTitle}`;
    } else if (route === '/community') {
      document.title = `COMMUNITY | ${baseTitle}`;
    } else if (route === '/community/notices') {
      document.title = `공지사항 전체 | ${baseTitle}`;
    } else if (route.startsWith('/community/notices/')) {
      document.title = `공지 상세 | ${baseTitle}`;
    } else if (route === '/about') {
      document.title = `ABOUT | ${baseTitle}`;
    } else {
      document.title = `404 Not Found | ${baseTitle}`;
    }
  }, [route, language]);

  const renderContent = () => {
    if (route === '/' || route === '') {
      return <HomePage />;
    }

    if (route === '/members') {
      return <MembersPage />;
    }

    if (route.startsWith('/members/')) {
      const slug = route.replace('/members/', '');
      return <MemberDetailPage slug={slug} />;
    }

    if (route === '/videos') {
      return <VideosPage />;
    }

    if (route === '/community') {
      return <CommunityPage />;
    }

    if (route === '/community/notices') {
      return <AllNoticesPage />;
    }

    if (route.startsWith('/community/notices/')) {
      const noticeId = route.replace('/community/notices/', '');
      return <NoticeDetailPage id={noticeId} />;
    }

    if (route === '/about') {
      return <AboutPage />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#12141C] text-white selection:bg-[#FFB800]/25 selection:text-[#FFB800]">
      {/* Dynamic Interactive Gaming Background Canvas & Grid */}
      <GamingBackground />
      <Header />
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {renderContent()}
      </main>
      <Footer />
      <MobileStickyBar />
      <BackToTop />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

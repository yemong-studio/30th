/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ContentData, loadContentData } from '../data/csvProvider';
import { CHANNEL_SETTINGS, FUN_TAGS, GENRES, MEMBERS, NOTICES, VIDEOS } from '../data/defaultData';
import { Language } from '../types';

interface AppContextType {
  path: string;
  language: Language;
  content: ContentData;
  navigate: (newPath: string) => void;
  setLanguage: (lang: Language) => void;
  isMobileBarDismissed: boolean;
  dismissMobileBar: () => void;
}

const defaultContent: ContentData = {
  settings: CHANNEL_SETTINGS,
  members: MEMBERS,
  videos: VIDEOS,
  notices: NOTICES,
  genres: GENRES,
  funTags: FUN_TAGS,
  isLoading: false,
  error: null
};

const AppContext = createContext<AppContextType>({
  path: '/',
  language: 'ko',
  content: defaultContent,
  navigate: () => {},
  setLanguage: () => {},
  isMobileBarDismissed: false,
  dismissMobileBar: () => {}
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });

  const [content, setContent] = useState<ContentData>(defaultContent);

  const [isMobileBarDismissed, setIsMobileBarDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('amber30s_mobile_bar_dismissed') === 'true';
    }
    return false;
  });

  // Calculate language based on pathname prefix (/en or /en/...)
  const isEn = path.startsWith('/en/') || path === '/en';
  const language: Language = isEn ? 'en' : 'ko';

  useEffect(() => {
    let isMounted = true;
    loadContentData().then((data) => {
      if (isMounted) {
        setContent(data);
      }
    });

    const handlePopState = () => {
      setPath(window.location.pathname + window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      isMounted = false;
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (newPath: string) => {
    if (newPath === path) return;
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', newPath);
      setPath(newPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const setLanguage = (targetLang: Language) => {
    if (targetLang === language) return;

    // Convert current path
    const url = new URL(window.location.href);
    let pathname = url.pathname;
    const search = url.search;

    if (targetLang === 'en') {
      if (!pathname.startsWith('/en')) {
        pathname = pathname === '/' ? '/en' : `/en${pathname}`;
      }
    } else {
      if (pathname === '/en') {
        pathname = '/';
      } else if (pathname.startsWith('/en/')) {
        pathname = pathname.substring(3);
      }
    }

    const nextFull = pathname + search;
    navigate(nextFull);
  };

  const dismissMobileBar = () => {
    setIsMobileBarDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('amber30s_mobile_bar_dismissed', 'true');
    }
  };

  return (
    <AppContext.Provider
      value={{
        path,
        language,
        content,
        navigate,
        setLanguage,
        isMobileBarDismissed,
        dismissMobileBar
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

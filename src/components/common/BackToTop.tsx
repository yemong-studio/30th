/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BackToTop: React.FC = () => {
  const { language } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 bg-[#1A1D2A] hover:bg-[#252A3D] text-[#FFB800] p-3 rounded-2xl shadow-xl border-2 border-[#2E344D] hover:border-[#FFB800] transition-all duration-200 hover:-translate-y-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFB800]"
      aria-label={language === 'ko' ? '최상단으로 이동' : 'Back to Top'}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

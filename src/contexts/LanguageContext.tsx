'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang } from '../lib/i18n';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'pl',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'pl';
    try {
      const saved = localStorage.getItem('preferred-lang') as Lang | null;
      if (saved === 'pl' || saved === 'en') return saved;
    } catch {}
    return 'pl';
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('preferred-lang');
      if (saved === 'pl' || saved === 'en') return;
    } catch {}

    fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) })
      .then((r) => r.json())
      .then((data: { country_code?: string }) => {
        const detected: Lang = data.country_code === 'PL' ? 'pl' : 'en';
        setLangState(detected);
      })
      .catch(() => {
        const browserLang = navigator.language?.toLowerCase();
        if (browserLang && !browserLang.startsWith('pl')) {
          setLangState('en');
        }
      });
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('preferred-lang', newLang);
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

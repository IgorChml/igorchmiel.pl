'use client';

import React, { useState } from 'react';
import { Mail, Send, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import BrandLogo from './BrandLogo';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

export default function Footer() {
  const { lang } = useLang();
  const tr = useTranslations(lang);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage(tr.hero.errorEmail);
      return;
    }

    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setNewsletterStatus('success');
        setNewsletterMessage(data.message || tr.hero.errorServer);
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || tr.hero.errorServer);
      }
    } catch {
      setNewsletterStatus('error');
      setNewsletterMessage(tr.hero.errorServer);
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-white/6 py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-sm font-sans font-bold text-white">{tr.newsletter.title}</p>
            <p className="text-[11px] text-neutral-500 font-sans">{tr.newsletter.desc}</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex items-center bg-white/5 border border-white/15 focus-within:border-brand/50 rounded-full overflow-hidden transition-all duration-300 flex-1 md:w-72">
              <span className="absolute left-3 text-neutral-500 pointer-events-none">
                <Mail size={13} />
              </span>
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={tr.newsletter.placeholder}
                className="w-full pl-9 pr-4 py-2.5 bg-transparent text-white text-xs placeholder-neutral-600 focus:outline-none font-sans"
                disabled={newsletterStatus === 'loading'}
              />
            </div>
            <button
              type="submit"
              disabled={newsletterStatus === 'loading'}
              className="px-5 py-2.5 bg-brand text-neutral-950 rounded-full font-sans font-bold text-[10px] uppercase tracking-wider hover:bg-brand-dark hover:scale-105 active:scale-95 disabled:opacity-50 transition-all duration-150 cursor-pointer flex items-center space-x-1 shrink-0"
            >
              {newsletterStatus === 'loading' ? (
                <>
                  <Loader2 size={10} className="animate-spin" />
                  <span>{tr.newsletter.joining}</span>
                </>
              ) : (
                <>
                  <Send size={10} />
                  <span>{tr.newsletter.button}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {newsletterMessage && (
          <div className={`text-[11px] font-medium leading-relaxed px-4 py-2 rounded-full text-center max-w-md mx-auto ${
            newsletterStatus === 'success'
              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
              : 'text-red-400 bg-red-500/10 border border-red-500/20'
          }`}>
            {newsletterStatus === 'success' && <Check size={11} className="inline mr-1.5 -mt-0.5" />}
            {newsletterMessage}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-mono text-neutral-600">
          <div className="flex items-center space-x-3">
            <BrandLogo className="w-8 h-8" />
            <span className="text-neutral-500">{tr.footer.subtitle}</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-neutral-600">
            <span className="text-neutral-500">{tr.footer.nip}</span>
            <Link href="/polityka-prywatnosci" className="hover:text-brand transition-colors font-semibold">
              {tr.footer.privacy}
            </Link>
            <a href="mailto:kontakt@igorchmiel.pl" className="hover:text-brand transition-colors font-semibold">E-mail</a>
            <span>{tr.footer.rights}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

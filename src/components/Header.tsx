import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Globe } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

interface HeaderProps {
  currentView: 'home' | 'blog';
  onViewChange: (view: 'home' | 'blog') => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLang();
  const tr = useTranslations(lang);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleNavSelect = (id: string) => {
    setIsMobileMenuOpen(false);
    if (currentView !== 'home') {
      onViewChange('home');
      setTimeout(() => scrollToSection(id), 150);
    } else {
      scrollToSection(id);
    }
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    onViewChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/98 backdrop-blur-md border-b border-white/8 py-4 shadow-sm shadow-black/40'
          : 'bg-neutral-950/90 backdrop-blur-md py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="flex items-center space-x-3 cursor-pointer group"
          id="logo-container"
        >
          <BrandLogo className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="text-white font-sans font-extrabold tracking-tight text-lg group-hover:text-brand transition-colors">
              Igor Chmiel
            </span>
            <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase leading-none mt-0.5 font-semibold">
              {tr.header.subtitle}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" id="desktop-nav">
          {[
            { label: tr.nav.knowledge, id: 'about' },
            { label: tr.nav.projects, id: 'projects' },
            { label: tr.nav.contact, id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavSelect(item.id)}
              className="font-sans font-semibold text-sm text-neutral-400 hover:text-white transition-all hover:scale-105 active:scale-95 duration-150 cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onViewChange('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-sans font-semibold text-sm transition-all hover:scale-105 active:scale-95 duration-150 cursor-pointer px-3 py-1.5 rounded ${
              currentView === 'blog'
                ? 'bg-brand text-neutral-950 shadow-sm shadow-brand/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tr.nav.blog}
          </button>

          {/* Language Toggle */}
          <div className="flex items-center space-x-1 bg-white/4 border border-white/8 rounded-full px-1 py-1">
            <Globe size={10} className="text-neutral-600 ml-1.5" />
            <button
              onClick={() => setLang('pl')}
              className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full transition-all duration-150 cursor-pointer ${
                lang === 'pl'
                  ? 'bg-brand text-neutral-950'
                  : 'text-neutral-500 hover:text-white'
              }`}
              title="Polski"
            >
              PL
            </button>
            <button
              onClick={() => setLang('en')}
              className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full transition-all duration-150 cursor-pointer ${
                lang === 'en'
                  ? 'bg-brand text-neutral-950'
                  : 'text-neutral-500 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          <div className="text-[10px] text-neutral-600 font-mono flex items-center bg-white/4 px-2.5 py-1.5 rounded border border-white/8">
            <Calendar size={10} className="mr-1.5 text-neutral-500" />
            <span>{formattedDate}</span>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Mobile language toggle */}
          <div className="flex items-center space-x-0.5 bg-white/4 border border-white/8 rounded-full px-1 py-0.5">
            <button
              onClick={() => setLang('pl')}
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full transition-all duration-150 cursor-pointer ${
                lang === 'pl' ? 'bg-brand text-neutral-950' : 'text-neutral-500'
              }`}
            >
              PL
            </button>
            <button
              onClick={() => setLang('en')}
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full transition-all duration-150 cursor-pointer ${
                lang === 'en' ? 'bg-brand text-neutral-950' : 'text-neutral-500'
              }`}
            >
              EN
            </button>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neutral-400 hover:text-white hover:bg-white/5 p-2 rounded transition-all hover:scale-105 active:scale-95 duration-150 cursor-pointer"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-panel"
          className="md:hidden absolute top-full left-0 right-0 bg-neutral-950 border-b border-white/8 py-6 px-6 shadow-2xl animate-fade-in"
        >
          <div className="flex flex-col space-y-4">
            {[
              { label: tr.nav.knowledge, id: 'about' },
              { label: tr.nav.projects, id: 'projects' },
              { label: tr.nav.contact, id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavSelect(item.id)}
                className="text-left text-neutral-300 hover:text-white font-sans font-bold text-sm py-2 transition-colors border-b border-white/6"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onViewChange('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-left font-sans font-bold text-sm py-2 transition-colors border-b border-white/6 flex justify-between items-center ${
                currentView === 'blog' ? 'text-brand' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span>{tr.nav.blog}</span>
              {currentView === 'blog' && <span className="w-2 h-2 rounded-full bg-brand" />}
            </button>

            <div className="text-[10px] text-neutral-600 font-mono text-center pt-2">
              {formattedDate}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

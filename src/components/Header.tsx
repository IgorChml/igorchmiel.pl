'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Calendar, Globe, ChevronDown } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const { lang, setLang } = useLang();
  const tr = useTranslations(lang);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';
  const isAbout = pathname === '/o-mnie';
  const isBlog = pathname.startsWith('/blog');
  const isServices = pathname.startsWith('/uslugi');
  const isPortfolio = pathname.startsWith('/portfolio');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top - bodyRect;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const handleNavSelect = (id: string) => {
    setIsMobileMenuOpen(false);
    if (!isHome) {
      router.push('/');
      setTimeout(() => scrollToSection(id), 150);
    } else {
      scrollToSection(id);
    }
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
        <Link
          href="/"
          onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
        </Link>

        <nav className="hidden md:flex items-center space-x-6" id="desktop-nav">
          <Link
            href="/o-mnie"
            className={`font-sans font-semibold text-sm transition-all hover:scale-105 active:scale-95 duration-150 ${
              isAbout ? 'text-brand' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tr.nav.about}
          </Link>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              onClick={() => setIsServicesOpen((v) => !v)}
              className={`flex items-center gap-1 font-sans font-semibold text-sm transition-all hover:scale-105 active:scale-95 duration-150 cursor-pointer ${
                isServices ? 'text-brand' : 'text-neutral-400 hover:text-white'
              }`}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
            >
              {tr.nav.services}
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isServicesOpen && (
              <div className="absolute top-full left-0 pt-3 w-64 animate-fade-in">
                <div className="bg-neutral-950 border border-white/8 rounded-lg shadow-2xl shadow-black/60 p-2 flex flex-col">
                  {tr.nav.servicesMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsServicesOpen(false)}
                      className={`px-3 py-2.5 rounded text-sm font-sans font-semibold transition-colors ${
                        pathname === item.href
                          ? 'bg-brand/10 text-brand'
                          : 'text-neutral-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/portfolio"
            className={`font-sans font-semibold text-sm transition-all hover:scale-105 active:scale-95 duration-150 ${
              isPortfolio ? 'text-brand' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tr.nav.portfolio}
          </Link>

          <button
            onClick={() => handleNavSelect('contact')}
            className="font-sans font-semibold text-sm text-neutral-400 hover:text-white transition-all hover:scale-105 active:scale-95 duration-150 cursor-pointer"
          >
            {tr.nav.contact}
          </button>

          <Link
            href="/blog"
            className={`font-sans font-semibold text-sm transition-all hover:scale-105 active:scale-95 duration-150 px-3 py-1.5 rounded ${
              isBlog
                ? 'bg-brand text-neutral-950 shadow-sm shadow-brand/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tr.nav.blog}
          </Link>

          <div className="flex items-center space-x-1 bg-white/4 border border-white/8 rounded-full px-1 py-1">
            <Globe size={10} className="text-neutral-600 ml-1.5" />
            <button
              onClick={() => setLang('pl')}
              className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full transition-all duration-150 cursor-pointer ${
                lang === 'pl' ? 'bg-brand text-neutral-950' : 'text-neutral-500 hover:text-white'
              }`}
              title="Polski"
            >
              PL
            </button>
            <button
              onClick={() => setLang('en')}
              className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full transition-all duration-150 cursor-pointer ${
                lang === 'en' ? 'bg-brand text-neutral-950' : 'text-neutral-500 hover:text-white'
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

        <div className="md:hidden flex items-center space-x-2">
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

      {isMobileMenuOpen && (
        <div
          id="mobile-menu-panel"
          className="md:hidden absolute top-full left-0 right-0 bg-neutral-950 border-b border-white/8 py-6 px-6 shadow-2xl animate-fade-in"
        >
          <div className="flex flex-col space-y-4">
            <Link
              href="/o-mnie"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-left font-sans font-bold text-sm py-2 transition-colors border-b border-white/6 flex justify-between items-center ${
                isAbout ? 'text-brand' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span>{tr.nav.about}</span>
              {isAbout && <span className="w-2 h-2 rounded-full bg-brand" />}
            </Link>

            {/* Services accordion */}
            <div className="border-b border-white/6">
              <button
                onClick={() => setIsMobileServicesOpen((v) => !v)}
                className={`w-full text-left font-sans font-bold text-sm py-2 transition-colors flex justify-between items-center ${
                  isServices ? 'text-brand' : 'text-neutral-300 hover:text-white'
                }`}
                aria-expanded={isMobileServicesOpen}
              >
                <span>{tr.nav.services}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isMobileServicesOpen && (
                <div className="flex flex-col pb-2 pl-3 animate-fade-in">
                  {tr.nav.servicesMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-left font-sans font-semibold text-xs py-2 transition-colors ${
                        pathname === item.href ? 'text-brand' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-left font-sans font-bold text-sm py-2 transition-colors border-b border-white/6 flex justify-between items-center ${
                isPortfolio ? 'text-brand' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span>{tr.nav.portfolio}</span>
              {isPortfolio && <span className="w-2 h-2 rounded-full bg-brand" />}
            </Link>

            <button
              onClick={() => handleNavSelect('contact')}
              className="text-left text-neutral-300 hover:text-white font-sans font-bold text-sm py-2 transition-colors border-b border-white/6"
            >
              {tr.nav.contact}
            </button>

            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-left font-sans font-bold text-sm py-2 transition-colors border-b border-white/6 flex justify-between items-center ${
                isBlog ? 'text-brand' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span>{tr.nav.blog}</span>
              {isBlog && <span className="w-2 h-2 rounded-full bg-brand" />}
            </Link>

            <div className="text-[10px] text-neutral-600 font-mono text-center pt-2">
              {formattedDate}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

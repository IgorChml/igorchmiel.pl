import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowDownCircle, Mail, Send, Check, Loader2, Twitter, Instagram, Youtube, Linkedin, Calendar } from 'lucide-react';
import { FaSpotify, FaTiktok } from 'react-icons/fa';

import Header from './components/Header';
import About from './components/About';
import ServicesSection from './components/ServicesSection';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import BrandLogo from './components/BrandLogo';
import BlogPage from './components/BlogPage';
import HeroBackground from './components/HeroBackground';

import { PROJECTS_DATA } from './data';
import { Project } from './types';
import { useLang } from './contexts/LanguageContext';
import { useTranslations } from './lib/i18n';

function HomePage() {
  const { lang } = useLang();
  const tr = useTranslations(lang);

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ecommerce' | 'services' | 'portfolio' | 'dev'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => setMouseOffset({ x: 0, y: 0 });

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = el.getBoundingClientRect().top - bodyRect;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        id="hero"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden bg-neutral-950"
      >
        <HeroBackground />

        <div className="absolute inset-0 bg-neutral-950/55 z-0 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-0 pointer-events-none" />

        <motion.div
          animate={{ x: mouseOffset.x * -45, y: mouseOffset.y * -45 }}
          transition={{ type: 'spring', stiffness: 35, damping: 24 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none z-0"
        />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-brand/3 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center min-h-[calc(100vh-8rem)]">

            <div className="flex flex-col space-y-8 text-left order-2 md:order-1 pb-12 md:pb-0">

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/25 px-4 py-2 rounded-full font-mono text-xs text-brand cursor-default select-none w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">{tr.hero.badge}</span>
              </motion.div>

              <motion.div
                animate={{ x: mouseOffset.x * 10, y: mouseOffset.y * 10 }}
                transition={{ type: 'spring', stiffness: 45, damping: 24 }}
              >
                <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
                  Igor Chmiel
                  <span className="font-medium text-neutral-400 text-xl sm:text-2xl md:text-3xl block mt-3 leading-relaxed">
                    {tr.hero.subtitle}
                  </span>
                </h1>
              </motion.div>

              <motion.p
                animate={{ x: mouseOffset.x * 6, y: mouseOffset.y * 6 }}
                transition={{ type: 'spring', stiffness: 45, damping: 24 }}
                className="text-neutral-400 font-sans text-sm sm:text-base leading-relaxed max-w-lg"
              >
                {tr.hero.description}
              </motion.p>

              <motion.div
                animate={{ x: mouseOffset.x * 4, y: mouseOffset.y * 4 }}
                transition={{ type: 'spring', stiffness: 48, damping: 25 }}
                className="w-full max-w-md z-20"
              >
                <a
                  href="https://calendly.com/businesschmiel/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-brand text-neutral-950 rounded-full font-sans font-bold text-xs uppercase tracking-wider hover:bg-brand-dark hover:scale-105 active:scale-95 transition-all duration-150 shadow-md shadow-brand/20"
                >
                  <Calendar size={14} />
                  <span>{tr.hero.ctaButton}</span>
                </a>
              </motion.div>

              <div className="flex items-center space-x-3">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest select-none font-semibold">
                  {tr.hero.socialLabel}
                </span>
                {[
                  { href: 'https://x.com/IgorChml', icon: <Twitter size={15} />, title: 'X / Twitter' },
                  { href: 'https://www.instagram.com/igor_chml/', icon: <Instagram size={15} />, title: 'Instagram' },
                  { href: 'https://www.youtube.com/@Igor_chmiel', icon: <Youtube size={15} />, title: 'YouTube' },
                  { href: 'https://www.linkedin.com/in/igor-chmiel-%F0%9F%A7%90%E2%98%84%EF%B8%8F-148774232/', icon: <Linkedin size={15} />, title: 'LinkedIn' },
                  { href: 'https://open.spotify.com/user/9028gykrl8rf8kx84c12jf20f?si=45be1ac791af4424', icon: <FaSpotify size={15} />, title: 'Spotify' },
                  { href: 'https://www.tiktok.com/@igor_chml', icon: <FaTiktok size={15} />, title: 'TikTok' },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/20 bg-white/8 hover:bg-brand/15 hover:border-brand/50 text-neutral-300 hover:text-brand flex items-center justify-center transition-all duration-200 hover:scale-110"
                    title={social.title}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div className="hidden sm:block pt-4">
                <button
                  onClick={() => scrollTo('services')}
                  className="flex items-center space-x-2 text-neutral-600 hover:text-brand transition-all duration-150 cursor-pointer group"
                >
                  <ArrowDownCircle size={16} className="animate-bounce group-hover:text-brand transition-colors" />
                  <span className="font-mono text-[10px] uppercase tracking-widest group-hover:text-brand transition-colors">{tr.hero.scrollCue}</span>
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="order-1 md:order-2 flex items-center justify-center md:justify-end"
            >
              <motion.div
                animate={{ x: mouseOffset.x * -12, y: mouseOffset.y * -8 }}
                transition={{ type: 'spring', stiffness: 35, damping: 22 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-brand/15 rounded-3xl blur-2xl pointer-events-none" />
                <div className="absolute -inset-px rounded-2xl border border-brand/20 pointer-events-none" />

                <img
                  src="/igor-hero.webp"
                  alt="Igor Chmiel — Start Up It!"
                  className="relative w-full max-w-[480px] h-auto object-contain rounded-2xl select-none"
                  draggable={false}
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <ServicesSection />
      <About />

      <section id="projects" className="py-24 bg-neutral-950 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600">{tr.projects.sectionTag}</span>
              <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
                {tr.projects.sectionTitle}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-xl font-sans leading-relaxed">
                {tr.projects.sectionDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 lg:pt-0" id="project-filters">
              {[
                { id: 'all', label: tr.projects.filterAll },
                { id: 'dev', label: tr.projects.filterDev },
                { id: 'ecommerce', label: tr.projects.filterEcommerce },
                { id: 'services', label: tr.projects.filterServices },
                { id: 'portfolio', label: tr.projects.filterPortfolio },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-4 py-2 rounded text-xs font-sans font-bold border transition-all hover:scale-105 active:scale-95 duration-150 cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-brand text-neutral-950 border-brand shadow-md shadow-brand/20'
                      : 'bg-white/4 text-neutral-400 border-white/8 hover:border-brand/30 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" id="projects-grid">
            {filteredProjects.map(proj => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onSelect={(p) => setActiveProject(p)}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-neutral-900 rounded border border-dashed border-white/10 text-neutral-500 text-sm font-sans">
              {tr.projects.empty}
            </div>
          )}
        </div>
      </section>

      <FAQ />
      <ContactForm />

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}

function Footer() {
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
            <a href="https://igorchmiel.pl" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors font-semibold">igorchmiel.pl</a>
            <a href="mailto:kontakt@igorchmiel.pl" className="hover:text-brand transition-colors font-semibold">E-mail</a>
            <span>{tr.footer.rights}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen selection:bg-brand selection:text-neutral-950 antialiased overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownCircle, Mail, Send, Check, Loader2, Twitter, Instagram, Youtube, Linkedin, Music } from 'lucide-react';

import Header from './components/Header';
import About from './components/About';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ContactForm from './components/ContactForm';
import BrandLogo from './components/BrandLogo';
import BlogPage from './components/BlogPage';
import HeroBackground from './components/HeroBackground';

import { PROJECTS_DATA } from './data';
import { Project } from './types';
import { useLang } from './contexts/LanguageContext';
import { useTranslations } from './lib/i18n';

export default function App() {
  const { lang } = useLang();
  const tr = useTranslations(lang);

  const [currentView, setCurrentView] = useState<'home' | 'blog'>('home');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ecommerce' | 'services' | 'portfolio' | 'dev'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage('Wprowadź prawidłowy adres e-mail.');
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
    <div className="bg-neutral-950 text-neutral-100 min-h-screen selection:bg-brand selection:text-neutral-950 antialiased overflow-x-hidden">

      <Header currentView={currentView} onViewChange={setCurrentView} />

      {currentView === 'home' ? (
        <>
          {/* Hero Section */}
          <section
            id="hero"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden bg-neutral-950"
          >
            {/* Animated circuit board canvas */}
            <HeroBackground />

            <div className="absolute inset-0 bg-neutral-950/55 z-0 pointer-events-none" />
            {/* Fade to next section (dark) */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-0 pointer-events-none" />

            {/* Amber glow accent */}
            <motion.div
              animate={{ x: mouseOffset.x * -45, y: mouseOffset.y * -45 }}
              transition={{ type: 'spring', stiffness: 35, damping: 24 }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none z-0"
            />
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-brand/3 rounded-full blur-3xl pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center min-h-[calc(100vh-8rem)]">

                {/* Left column — text content */}
                <div className="flex flex-col space-y-8 text-left order-2 md:order-1 pb-12 md:pb-0">

                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/25 px-4 py-2 rounded-full font-mono text-xs text-brand cursor-default select-none w-fit"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                    <span className="font-semibold uppercase tracking-wider text-[10px]">{tr.hero.badge}</span>
                  </motion.div>

                  {/* Headline */}
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

                  {/* Description */}
                  <motion.p
                    animate={{ x: mouseOffset.x * 6, y: mouseOffset.y * 6 }}
                    transition={{ type: 'spring', stiffness: 45, damping: 24 }}
                    className="text-neutral-400 font-sans text-sm sm:text-base leading-relaxed max-w-lg"
                  >
                    {tr.hero.description}
                  </motion.p>

                  {/* Newsletter Form */}
                  <motion.div
                    animate={{ x: mouseOffset.x * 4, y: mouseOffset.y * 4 }}
                    transition={{ type: 'spring', stiffness: 48, damping: 25 }}
                    className="w-full max-w-md z-20"
                  >
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <p className="text-[11px] font-mono font-medium text-neutral-500 tracking-wider uppercase">
                        {tr.hero.newsletterLabel}
                      </p>
                      {/* pill-shaped input + button */}
                      <div className="relative flex items-center bg-white/5 border border-white/15 focus-within:border-brand/50 focus-within:bg-white/7 rounded-full overflow-hidden transition-all duration-300 shadow-sm">
                        <span className="absolute left-4 text-neutral-500 pointer-events-none">
                          <Mail size={14} />
                        </span>
                        <input
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder={tr.hero.emailPlaceholder}
                          className="w-full pl-10 pr-28 py-3 bg-transparent text-white text-xs placeholder-neutral-600 focus:outline-none font-sans"
                          disabled={newsletterStatus === 'loading'}
                        />
                        <button
                          type="submit"
                          disabled={newsletterStatus === 'loading'}
                          className="absolute right-1.5 px-4 py-1.5 bg-brand text-neutral-950 rounded-full font-sans font-bold text-[10px] uppercase tracking-wider hover:bg-brand-dark hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all duration-150 cursor-pointer flex items-center space-x-1"
                        >
                          {newsletterStatus === 'loading' ? (
                            <>
                              <Loader2 size={10} className="animate-spin" />
                              <span>{tr.hero.joining}</span>
                            </>
                          ) : (
                            <>
                              <Send size={10} />
                              <span>{tr.hero.joinButton}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {newsletterMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`text-[11px] font-medium leading-relaxed px-4 py-2 rounded-full ${
                            newsletterStatus === 'success'
                              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                              : 'text-red-400 bg-red-500/10 border border-red-500/20'
                          }`}
                        >
                          {newsletterStatus === 'success' && <Check size={11} className="inline mr-1.5 -mt-0.5" />}
                          {newsletterMessage}
                        </motion.div>
                      )}
                    </form>
                  </motion.div>

                  {/* Social Links */}
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest select-none font-semibold">
                      {tr.hero.socialLabel}
                    </span>
                    {[
                      { href: 'https://x.com/IgorChml', icon: <Twitter size={15} />, title: 'X / Twitter' },
                      { href: 'https://www.instagram.com/igor_chml/', icon: <Instagram size={15} />, title: 'Instagram' },
                      { href: 'https://www.youtube.com/@Igor_chmiel', icon: <Youtube size={15} />, title: 'YouTube' },
                      { href: 'https://www.linkedin.com/in/igor-chmiel-%F0%9F%A7%90%E2%98%84%EF%B8%8F-148774232/', icon: <Linkedin size={15} />, title: 'LinkedIn' },
                      { href: 'https://open.spotify.com/user/9028gykrl8rf8kx84c12jf20f?si=45be1ac791af4424', icon: <Music size={15} />, title: 'Spotify' },
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

                  {/* Scroll cue */}
                  <div className="hidden sm:block pt-4">
                    <button
                      onClick={() => scrollTo('projects')}
                      className="flex items-center space-x-2 text-neutral-600 hover:text-brand transition-all duration-150 cursor-pointer group"
                    >
                      <ArrowDownCircle size={16} className="animate-bounce group-hover:text-brand transition-colors" />
                      <span className="font-mono text-[10px] uppercase tracking-widest group-hover:text-brand transition-colors">{tr.hero.scrollCue}</span>
                    </button>
                  </div>
                </div>

                {/* Right column — hero image */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  animate-later={{ x: mouseOffset.x * -12, y: mouseOffset.y * -8 }}
                  className="order-1 md:order-2 flex items-center justify-center md:justify-end"
                >
                  <motion.div
                    animate={{ x: mouseOffset.x * -12, y: mouseOffset.y * -8 }}
                    transition={{ type: 'spring', stiffness: 35, damping: 22 }}
                    className="relative"
                  >
                    {/* Amber glow behind image */}
                    <div className="absolute -inset-4 bg-brand/15 rounded-3xl blur-2xl pointer-events-none" />
                    {/* Subtle amber border */}
                    <div className="absolute -inset-px rounded-2xl border border-brand/20 pointer-events-none" />

                    <img
                      src="/igor-hero.png"
                      alt="Igor Chmiel — Start Up It!"
                      className="relative w-full max-w-[480px] h-auto object-contain rounded-2xl select-none"
                      draggable={false}
                    />
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* About / Knowledge base Section */}
          <About />

          {/* Projects Section */}
          <section id="projects" className="py-24 bg-neutral-950 border-t border-white/5 relative">
            {/* Accent lines */}
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

          <ContactForm />
        </>
      ) : (
        <BlogPage />
      )}

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-white/6 py-12 relative z-10 text-[11px] font-mono text-neutral-600">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <BrandLogo className="w-8 h-8" />
            <span className="text-neutral-500">{tr.footer.subtitle}</span>
          </div>

          <div className="flex flex-wrap gap-6 text-neutral-600">
            <a href="https://igorchmiel.pl" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors font-semibold">igorchmiel.pl</a>
            <a href="mailto:kontakt@igorchmiel.pl" className="hover:text-brand transition-colors font-semibold">E-mail</a>
            <span>{tr.footer.rights}</span>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}

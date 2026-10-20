'use client';

import { useState } from 'react';
import type React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, CheckCircle2, PenTool, Briefcase, Search, Globe, type LucideIcon } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Briefcase,
  Search,
  Globe,
};

// Ustawia pozycję kursora wewnątrz karty dla efektu światła (.glass-spot).
function handleSpot(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

interface Feature {
  title: string;
  desc: string;
}

interface ProcessStep {
  step: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  process: ProcessStep[];
  faq: FaqItem[];
  iconName: string;
  priceFrom?: string;
  priceNote?: string;
}

export default function ServicePageLayout({
  title,
  subtitle,
  description,
  features,
  process,
  faq,
  iconName,
  priceFrom,
  priceNote,
}: ServicePageLayoutProps) {
  const Icon = iconMap[iconName] || PenTool;
  const { lang } = useLang();
  const tr = useTranslations(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const ctaLabel = lang === 'pl' ? 'Umow bezplatna konsultacje' : 'Book a free consultation';
  const ctaLabelDisplay = lang === 'pl' ? 'Umów bezpłatną konsultację' : 'Book a free consultation';
  const featuresLabel = lang === 'pl' ? 'Co obejmuje usługa' : 'What the service includes';
  const processLabel = lang === 'pl' ? 'Jak wygląda współpraca' : 'How the process works';
  const faqLabel = lang === 'pl' ? 'Najczęstsze pytania' : 'Frequently asked questions';
  const ctaSectionTitle = lang === 'pl' ? 'Gotowy na współpracę?' : 'Ready to get started?';
  const ctaSectionDesc =
    lang === 'pl'
      ? 'Umów bezpłatną 30-minutową konsultację i porozmawiajmy o Twoim projekcie.'
      : 'Book a free 30-minute consultation and let’s talk about your project.';

  return (
    <main className="bg-neutral-950 text-white">
      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* światło za szkłem */}
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[760px] h-[420px] rounded-full bg-brand/15 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 w-[420px] h-[420px] rounded-full bg-amber-700/20 blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 -right-32 w-[460px] h-[380px] rounded-full bg-brand/10 blur-[120px]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6 text-center">
          <div className="glass-icon w-16 h-16 mx-auto">
            <Icon size={28} />
          </div>
          <div className="glass-pill inline-flex items-center px-3.5 py-1.5 font-mono text-brand">
            <span className="font-semibold uppercase tracking-wider text-[10px]">{subtitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
          {priceFrom && (
            <div className="glass-inset inline-flex flex-col items-center gap-1 px-8 py-4">
              <p className="text-2xl sm:text-3xl font-sans font-extrabold text-white">
                {priceFrom}
              </p>
              {priceNote && (
                <p className="text-xs text-neutral-500 font-sans">{priceNote}</p>
              )}
            </div>
          )}
          <div className="pt-2">
            <a
              href="https://calendly.com/businesschmiel/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-amber inline-flex items-center gap-2 font-sans font-bold text-sm px-7 py-3.5"
            >
              {ctaLabelDisplay}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute top-1/2 -left-40 w-[420px] h-[420px] rounded-full bg-amber-700/20 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 w-[520px] h-[420px] rounded-full bg-brand/12 blur-[120px]" />
        <div className="max-w-6xl mx-auto px-6 space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              {featuresLabel}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                onMouseMove={handleSpot}
                className="glass glass-spot p-7 space-y-4 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <div className="glass-icon w-10 h-10">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="text-base font-sans font-bold text-white tracking-tight">{feature.title}</h3>
                <p className="text-[13px] text-neutral-400 font-sans leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute top-1/4 -right-40 w-[460px] h-[460px] rounded-full bg-amber-700/15 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/4 w-[520px] h-[380px] rounded-full bg-brand/10 blur-[120px]" />
        <div className="max-w-3xl mx-auto px-6 space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              {processLabel}
            </h2>
          </div>
          <div className="space-y-4">
            {process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                onMouseMove={handleSpot}
                className="glass glass-spot flex gap-5 items-start p-6"
              >
                <div className="glass-icon shrink-0 w-11 h-11 font-sans font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <h3 className="text-base font-sans font-bold text-white tracking-tight">{step.step}</h3>
                  <p className="text-[13px] text-neutral-400 font-sans leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 w-[420px] h-[420px] rounded-full bg-amber-700/15 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 w-[500px] h-[400px] rounded-full bg-brand/12 blur-[120px]" />
        <div className="max-w-3xl mx-auto px-6 space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              {faqLabel}
            </h2>
          </div>
          <div className="space-y-3">
            {faq.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`glass overflow-hidden ${isOpen ? 'glass-open' : ''}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-brand focus-visible:-outline-offset-2 rounded-[inherit]"
                  >
                    <span className="text-sm font-sans font-bold text-white pr-4 group-hover:text-brand transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-neutral-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="px-5 pb-5 text-[13px] text-neutral-400 font-sans leading-relaxed border-t border-white/8 pt-4">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[420px] rounded-full bg-brand/18 blur-[130px]" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="glass p-10 md:p-14 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              {ctaSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-xl mx-auto">
              {ctaSectionDesc}
            </p>
            <a
              href="https://calendly.com/businesschmiel/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-amber inline-flex items-center gap-2 font-sans font-bold text-sm px-8 py-3.5"
            >
              {ctaLabelDisplay}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

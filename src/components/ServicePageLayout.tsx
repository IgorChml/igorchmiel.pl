'use client';

import { useState } from 'react';
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
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative space-y-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand/10 border border-brand/20 text-brand mx-auto">
            <Icon size={28} />
          </div>
          <p className="text-xs sm:text-sm text-brand font-semibold uppercase tracking-wider">
            {subtitle}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
          {priceFrom && (
            <div className="flex flex-col items-center gap-1 pt-2">
              <p className="text-2xl sm:text-3xl font-sans font-extrabold text-white">
                {priceFrom}
              </p>
              {priceNote && (
                <p className="text-xs text-neutral-500 font-sans">{priceNote}</p>
              )}
            </div>
          )}
          <a
            href="https://calendly.com/businesschmiel/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-neutral-950 font-bold text-sm px-6 py-3 rounded hover:bg-brand/90 transition-colors"
          >
            {ctaLabelDisplay}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              {featuresLabel}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="bg-neutral-900 border border-white/8 rounded p-6 space-y-3 hover:border-brand/25 transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <CheckCircle2 size={16} />
                </div>
                <h3 className="text-sm font-sans font-bold text-white">{feature.title}</h3>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              {processLabel}
            </h2>
          </div>
          <div className="space-y-6">
            {process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="space-y-1 pt-1">
                  <h3 className="text-sm font-sans font-bold text-white">{step.step}</h3>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 space-y-12">
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
                  className={`bg-neutral-900 border rounded overflow-hidden transition-all duration-200 ${
                    isOpen ? 'border-brand/30' : 'border-white/8 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
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
                        <p className="px-5 pb-5 text-xs text-neutral-400 font-sans leading-relaxed border-t border-white/5 pt-4">
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
      <section className="py-20 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
            {ctaSectionTitle}
          </h2>
          <p className="text-sm text-neutral-400 font-sans leading-relaxed">
            {ctaSectionDesc}
          </p>
          <a
            href="https://calendly.com/businesschmiel/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-neutral-950 font-bold text-sm px-8 py-3.5 rounded hover:bg-brand/90 transition-colors"
          >
            {ctaLabelDisplay}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

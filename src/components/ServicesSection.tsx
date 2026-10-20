'use client';

import type React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Briefcase, PenTool, Search, Code2, Globe, ArrowRight } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

const SERVICE_ICONS = [PenTool, Briefcase, Search, Code2, Globe];
// Aligned by index with translations.services.items. SaaS (idx 3) has no
// dedicated page yet, so it stays a non-linked card.
const SERVICE_HREFS: (string | null)[] = [
  '/uslugi/content-marketing',
  '/uslugi/marketing-b2b',
  '/uslugi/seo',
  null,
  '/uslugi/web-development',
];

// Pięć kart w siatce 6-kolumnowej: 3 w pierwszym rzędzie, 2 wycentrowane w drugim.
function positionClass(idx: number) {
  const base = 'lg:col-span-2';
  if (idx === 3) return `${base} lg:col-start-2`;
  if (idx === 4) return `${base} md:col-span-2 lg:col-span-2`;
  return base;
}

// Ustawia pozycję kursora wewnątrz karty dla efektu światła (.glass-spot).
function handleSpot(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function ServicesSection() {
  const { lang } = useLang();
  const tr = useTranslations(lang);

  return (
    <section id="services" className="py-28 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

      {/* światło za szkłem: bez niego rozmycie nie miałoby co załamywać */}
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[420px] rounded-full bg-brand/15 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 -left-40 w-[420px] h-[420px] rounded-full bg-amber-700/20 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 w-[520px] h-[420px] rounded-full bg-brand/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 space-y-14 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="glass-pill inline-flex items-center space-x-2 px-3.5 py-1.5 font-mono text-xs text-brand">
            <span className="font-semibold uppercase tracking-wider text-[10px]">{tr.services.tag}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight leading-tight">
            {tr.services.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
            {tr.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {tr.services.items.map((service, idx) => {
            const Icon = SERVICE_ICONS[idx];
            const href = SERVICE_HREFS[idx];
            const moreLabel = lang === 'pl' ? 'Dowiedz się więcej' : 'Learn more';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                onMouseMove={handleSpot}
                className={`glass glass-spot group flex flex-col p-8 space-y-5 ${positionClass(idx)}`}
              >
                <div className="glass-icon w-11 h-11">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-sans font-bold text-white tracking-tight">{service.title}</h3>
                <p className="text-[13px] text-neutral-400 font-sans leading-relaxed flex-1">{service.desc}</p>
                {href && (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-brand hover:text-white transition-colors pt-1 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-4 rounded"
                  >
                    {moreLabel}
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

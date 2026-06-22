'use client';

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

export default function ServicesSection() {
  const { lang } = useLang();
  const tr = useTranslations(lang);

  return (
    <section id="services" className="py-24 bg-neutral-950 border-t border-white/5 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3 py-1.5 rounded font-mono text-xs text-brand">
            <span className="font-semibold uppercase tracking-wider text-[10px]">{tr.services.tag}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight leading-tight">
            {tr.services.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
            {tr.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="bg-neutral-900 border border-white/8 rounded p-6 space-y-4 hover:border-brand/25 transition-all duration-300 group flex flex-col"
              >
                <div className="w-10 h-10 rounded bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:bg-brand/20 transition-colors">
                  <Icon size={18} />
                </div>
                <h3 className="text-base font-sans font-bold text-white">{service.title}</h3>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed flex-1">{service.desc}</p>
                {href && (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-brand hover:text-white transition-colors pt-2"
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

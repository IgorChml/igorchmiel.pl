import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

export default function FAQ() {
  const { lang } = useLang();
  const tr = useTranslations(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-neutral-950 border-t border-white/5 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3 py-1.5 rounded font-mono text-xs text-brand">
            <HelpCircle size={12} />
            <span className="font-semibold uppercase tracking-wider text-[10px]">{tr.faq.tag}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight leading-tight">
            {tr.faq.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
            {tr.faq.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {tr.faq.items.map((item, idx) => {
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
  );
}

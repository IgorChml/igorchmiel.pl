'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Mail, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

export default function ContactForm() {
  const { lang } = useLang();
  const tr = useTranslations(lang);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isResendConfigured, setIsResendConfigured] = useState(false);

  useEffect(() => {
    fetch('/api/config')
      .then((res) => {
        if (!res.ok) throw new Error('config endpoint failed');
        return res.json();
      })
      .then((data) => setIsResendConfigured(!!data.isResendConfigured))
      .catch(() => setIsResendConfigured(false));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setErrorMsg('');

    fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then(async (res) => {
        const contentType = res.headers.get('content-type') || '';
        let data: any = {};

        if (contentType.includes('application/json')) {
          data = await res.json();
        } else {
          const rawText = await res.text();
          const cleanText = rawText.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1]?.replace(/<[^>]+>/g, ' ').trim() || rawText;
          throw new Error(cleanText.substring(0, 165) || `Błąd serwera (Status: ${res.status})`);
        }

        if (!res.ok) throw new Error(data.error || 'Serwer zwrócił błąd podczas wysyłki wiadomości.');

        setIsSubmitting(false);
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setSuccess(false), 8000);
      })
      .catch((err: any) => {
        console.error('Resend delivery submission error:', err);
        setIsSubmitting(false);
        setErrorMsg(err.message || 'Wystąpił problem z połączeniem podczas wysyłania wiadomości.');
      });
  };

  const inputClass =
    'glass-field py-3.5 pl-11 pr-4 text-sm font-sans';

  return (
    <section id="contact" className="py-28 bg-[#0c0c0c] relative overflow-hidden">
      {/* światło za szkłem */}
      <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[720px] h-[380px] rounded-full bg-brand/12 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 w-[460px] h-[460px] rounded-full bg-amber-700/20 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[560px] h-[520px] rounded-full bg-brand/14 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="glass-pill inline-flex items-center space-x-2 px-3.5 py-1.5 font-mono text-xs text-brand">
            <Mail size={12} />
            <span className="font-semibold uppercase tracking-wider text-[10px]">{tr.contact.tag}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight">
            {tr.contact.title}{' '}
            <span className="text-neutral-500 font-medium block mt-2">{tr.contact.titleSub}</span>
          </h2>
          <p className="text-neutral-400 font-sans text-sm md:text-base leading-relaxed">
            {tr.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass p-8 space-y-6">
              <h3 className="text-lg font-sans font-bold text-white tracking-tight">{tr.contact.directTitle}</h3>
              <div className="space-y-4 font-sans">
                <div className="glass-inset flex items-center space-x-4 p-4">
                  <div className="glass-icon w-11 h-11 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-neutral-500 text-xs font-sans block mb-0.5">{tr.contact.emailLabel}</span>
                    <a href="mailto:kontakt@igorchmiel.pl" className="text-neutral-200 hover:text-brand text-sm font-semibold transition-colors">
                      kontakt@igorchmiel.pl
                    </a>
                  </div>
                </div>

                <div className="glass-inset flex items-center space-x-4 p-4">
                  <div className="glass-icon w-11 h-11 shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="text-neutral-500 text-xs font-sans block mb-0.5">{tr.contact.portfolioLabel}</span>
                    <a href="https://igorchmiel.pl" target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-brand text-sm font-semibold transition-colors">
                      igorchmiel.pl
                    </a>
                  </div>
                </div>

                <a
                  href="https://calendly.com/businesschmiel/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass-amber flex items-center justify-center space-x-2.5 w-full py-3.5 font-sans font-bold text-sm"
                >
                  <span>{tr.contact.calendlyLabel}</span>
                </a>
              </div>
            </div>

            <div className="glass p-8 space-y-6">
              <h3 className="text-base font-sans font-bold text-white tracking-tight">
                {tr.contact.qualityTitle}
              </h3>
              <div className="space-y-5">
                {tr.contact.qualities.map((item) => (
                  <div key={item.title} className="space-y-1">
                    <div className="flex items-center space-x-2 text-white font-sans font-bold text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 shadow-[0_0_10px_rgba(255,182,39,0.8)]" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed pl-3.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 glass p-8 md:p-10">
            <h3 className="text-white font-sans font-bold text-lg mb-8 flex items-center">
              <span className="glass-icon w-9 h-9 mr-3"><MessageSquare size={16} /></span>
              {tr.contact.formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5" id="portfolio-contact-form">
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-sans text-sm font-medium block">{tr.contact.nameLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-neutral-500">
                    <User size={14} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={tr.contact.namePlaceholder}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-sans text-sm font-medium block">{tr.contact.emailLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center text-neutral-500">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={tr.contact.emailPlaceholder}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-sans text-sm font-medium block">{tr.contact.messageLabel}</label>
                <div className="relative">
                  <div className="absolute top-4 left-4 text-neutral-500">
                    <MessageSquare size={14} />
                  </div>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={tr.contact.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-glass-amber w-full flex items-center justify-center space-x-2.5 py-4 font-sans font-bold text-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{tr.contact.sending}</span>
                  ) : (
                    <>
                      <span>{tr.contact.sendButton}</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-start space-x-3 text-xs"
                >
                  <CheckCircle size={16} className="shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">{tr.contact.successTitle}</p>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      {tr.contact.successDesc}
                    </p>
                  </div>
                </motion.div>
              )}

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-start space-x-3 text-xs"
                >
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">{tr.contact.errorTitle}</p>
                    <p className="text-[11px] leading-relaxed">{errorMsg}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

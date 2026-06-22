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
    'w-full bg-neutral-900 border border-white/8 focus:border-brand rounded py-3.5 pl-10 pr-4 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-brand/20 transition-all font-sans';

  return (
    <section id="contact" className="py-24 bg-[#0f0f0f] relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3 py-1.5 rounded font-mono text-xs text-brand">
            <Mail size={12} />
            <span className="font-semibold uppercase tracking-wider text-[10px]">{tr.contact.tag}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight">
            {tr.contact.title}{' '}
            <span className="text-neutral-500 font-medium block mt-2">{tr.contact.titleSub}</span>
          </h2>
          <p className="text-neutral-500 font-sans text-sm md:text-base leading-relaxed">
            {tr.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-neutral-900 border border-white/8 p-8 rounded space-y-6">
              <h3 className="text-lg font-sans font-bold text-white tracking-tight">{tr.contact.directTitle}</h3>
              <div className="space-y-4 font-sans">
                <div className="flex items-center space-x-4 bg-white/3 p-4 rounded border border-white/6">
                  <div className="bg-white/8 p-3 rounded text-neutral-400 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-neutral-600 text-[10px] font-mono uppercase tracking-wider block font-bold">{tr.contact.emailLabel}</span>
                    <a href="mailto:kontakt@igorchmiel.pl" className="text-neutral-200 hover:text-brand text-sm font-semibold transition-colors">
                      kontakt@igorchmiel.pl
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white/3 p-4 rounded border border-white/6">
                  <div className="bg-white/8 p-3 rounded text-neutral-400 shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="text-neutral-600 text-[10px] font-mono uppercase tracking-wider block font-bold">{tr.contact.portfolioLabel}</span>
                    <a href="https://igorchmiel.pl" target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-brand text-sm font-semibold transition-colors">
                      igorchmiel.pl
                    </a>
                  </div>
                </div>

                <a
                  href="https://calendly.com/businesschmiel/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2.5 w-full py-3.5 bg-brand hover:bg-brand-dark text-neutral-950 font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-brand/20"
                >
                  <span>{tr.contact.calendlyLabel}</span>
                </a>
              </div>
            </div>

            <div className="bg-neutral-900 border border-white/8 p-8 rounded space-y-6">
              <h3 className="text-sm font-sans font-extrabold text-white tracking-wider uppercase">
                {tr.contact.qualityTitle}
              </h3>
              <div className="space-y-5">
                {tr.contact.qualities.map((item) => (
                  <div key={item.title} className="space-y-1">
                    <div className="flex items-center space-x-2 text-white font-sans font-bold text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 font-sans leading-relaxed pl-3.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 bg-neutral-900 border border-white/8 p-8 rounded">
            <h3 className="text-white font-sans font-bold text-lg mb-6 flex items-center">
              <MessageSquare size={16} className="text-brand mr-2.5" />
              {tr.contact.formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5" id="portfolio-contact-form">
              <div className="space-y-1.5">
                <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">{tr.contact.nameLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-neutral-600">
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
                <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">{tr.contact.emailLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-neutral-600">
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
                <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">{tr.contact.messageLabel}</label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3 text-neutral-600">
                    <MessageSquare size={14} />
                  </div>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={tr.contact.messagePlaceholder}
                    className={`${inputClass} pl-10 resize-none`}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2.5 py-3.5 bg-brand hover:bg-brand-dark text-neutral-950 font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 cursor-pointer shadow-md shadow-brand/20 focus:outline-none"
                >
                  {isSubmitting ? (
                    <span>{tr.contact.sending}</span>
                  ) : (
                    <>
                      <span>{tr.contact.sendButton}</span>
                      <Send size={12} />
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
                  className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded flex items-start space-x-3 text-xs"
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
                  className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded flex items-start space-x-3 text-xs"
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

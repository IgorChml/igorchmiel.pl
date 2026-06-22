import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { breadcrumbJsonLd, JsonLd } from '../../src/lib/jsonld';

export const metadata: Metadata = {
  title: 'O mnie — Igor Chmiel | Marketing Manager i Web Developer z Poznania',
  description:
    'Igor Chmiel — Marketing Manager, konsultant B2B i web developer z Poznania. Łączę techniczne SEO, content marketing, automatyzację lejków sprzedażowych i web development dla małych firm i specjalistów.',
  alternates: {
    canonical: 'https://igorchmiel.pl/o-mnie',
    languages: {
      pl: 'https://igorchmiel.pl/o-mnie',
      en: 'https://igorchmiel.pl/o-mnie',
      'x-default': 'https://igorchmiel.pl/o-mnie',
    },
  },
  openGraph: {
    title: 'O mnie — Igor Chmiel | Marketing Manager i Web Developer z Poznania',
    description:
      'Marketing Manager, konsultant B2B i web developer z Poznania. Techniczne SEO, content marketing, automatyzacja i web development.',
    url: 'https://igorchmiel.pl/o-mnie',
    type: 'profile',
    locale: 'pl_PL',
    images: [{ url: '/igor-hero.webp', width: 1200, height: 630 }],
  },
};

const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: 'https://igorchmiel.pl/o-mnie',
  inLanguage: 'pl',
  mainEntity: { '@id': 'https://igorchmiel.pl/#person' },
};

const expertise = [
  {
    title: 'Content Marketing & SEO',
    desc: 'Strategie treści i techniczne SEO, które przyciągają ruch organiczny. Dla klientów B2B osiągam wzrost ruchu o 80–140% w 6 miesięcy, a strony notują wyniki 95+ w Google Lighthouse.',
    href: '/uslugi/content-marketing',
  },
  {
    title: 'Konsultacje Marketingowe B2B',
    desc: 'Audyt działań marketingowych, definiowanie idealnego profilu klienta (ICP) i budowa lejków sprzedażowych od zera — od strategii po codzienną egzekucję kampanii.',
    href: '/uslugi/marketing-b2b',
  },
  {
    title: 'Web Development',
    desc: 'Szybkie, responsywne strony i aplikacje w React, Next.js i Tailwind CSS — bez gotowych szablonów, w pełni pod markę klienta. Wdrożenia na Vercel z SSL, CDN i automatycznym skalowaniem.',
    href: '/uslugi/web-development',
  },
  {
    title: 'Techniczne SEO',
    desc: 'Audyty Core Web Vitals, architektura linkowania wewnętrznego, dane strukturalne JSON-LD i optymalizacja indeksacji — fundament pod długoterminowe pozycjonowanie.',
    href: '/uslugi/seo',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profileJsonLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'O mnie', path: '/o-mnie' }])} />
      <main className="bg-neutral-950 text-white">
        {/* Hero */}
        <section className="pt-32 pb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 relative grid md:grid-cols-[200px_1fr] gap-8 items-center">
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
              <Image
                src="/igor-hero.webp"
                alt="Igor Chmiel — Marketing Manager i Web Developer"
                fill
                sizes="192px"
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <p className="text-xs sm:text-sm text-brand font-semibold uppercase tracking-wider">
                O mnie
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight leading-tight">
                Igor Chmiel
              </h1>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                Marketing Manager, konsultant B2B i web developer. Pomagam małym firmom i
                specjalistom budować profesjonalną obecność online oraz system pozyskiwania
                klientów — bez pośredników i agencji.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-xs text-neutral-500 font-mono pt-2">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} className="text-brand" /> Poznań, Polska
                </span>
                <a
                  href="mailto:kontakt@igorchmiel.pl"
                  className="inline-flex items-center gap-1.5 hover:text-brand transition-colors"
                >
                  <Mail size={12} className="text-brand" /> kontakt@igorchmiel.pl
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="py-16 border-t border-white/5 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
          <div className="max-w-3xl mx-auto px-6 space-y-6">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              Kim jestem i jak pracuję
            </h2>
            <div className="space-y-4 text-sm text-neutral-400 font-sans leading-relaxed">
              <p>
                Jestem niezależnym konsultantem łączącym dwie kompetencje, które zwykle są
                rozdzielone między różne osoby i agencje: marketing oraz development. Dzięki temu
                projektuję strategię, a następnie samodzielnie ją wdrażam — koduję strony,
                konfiguruję analitykę, optymalizuję SEO i buduję lejki sprzedażowe. Klient pracuje
                bezpośrednio ze mną, bez account managerów, bez juniorów i bez ukrytych kosztów.
              </p>
              <p>
                Specjalizuję się we współpracy z małymi firmami, freelancerami i specjalistami z
                branż B2B, e-commerce, SaaS oraz usług profesjonalnych. Wierzę w marketing oparty
                na danych i treściach: zamiast przepalać budżet na reklamy, buduję trwałe źródła
                ruchu organicznego — content marketing, techniczne SEO i automatyzację, które
                pracują na pozyskiwanie klientów również wtedy, gdy kampanie są wyłączone.
              </p>
              <p>
                Każdy projekt zaczynam od bezpłatnej, 30-minutowej konsultacji, na której poznaję
                cele biznesowe i wyzwania. Następnie przygotowuję propozycję zakresu prac i wycenę,
                a po akceptacji realizuję projekt etapami z regularnymi aktualizacjami. Po wdrożeniu
                zapewniam wsparcie techniczne i mierzę efekty na konkretnych KPI: ruch organiczny,
                pozycje w Google, współczynnik konwersji, liczba leadów oraz koszt pozyskania
                klienta. Pracuję w 100% zdalnie, w języku polskim i angielskim.
              </p>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-16 border-t border-white/5 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
          <div className="max-w-5xl mx-auto px-6 space-y-10">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight text-center">
              Obszary specjalizacji
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expertise.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group bg-neutral-900 border border-white/8 rounded p-6 space-y-3 hover:border-brand/25 transition-all duration-300"
                >
                  <h3 className="text-base font-sans font-bold text-white group-hover:text-brand transition-colors flex items-center justify-between">
                    {item.title}
                    <ArrowRight size={16} className="text-neutral-600 group-hover:text-brand transition-colors" />
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
          <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              Porozmawiajmy o Twoim projekcie
            </h2>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed">
              Umów bezpłatną 30-minutową konsultację — bez zobowiązań.
            </p>
            <a
              href="https://calendly.com/businesschmiel/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand text-neutral-950 font-bold text-sm px-8 py-3.5 rounded hover:bg-brand/90 transition-colors"
            >
              Umów bezpłatną konsultację
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

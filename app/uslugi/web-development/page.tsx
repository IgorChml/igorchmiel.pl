import type { Metadata } from 'next';
import ServicePageLayout from '../../../src/components/ServicePageLayout';
import { breadcrumbJsonLd, JsonLd } from '../../../src/lib/jsonld';

export const metadata: Metadata = {
  title: 'Strony Internetowe i Aplikacje Web — React, Next.js, Tailwind',
  description:
    'Tworzę szybkie strony internetowe i aplikacje web w React, Next.js i Tailwind CSS — bez szablonów, od zera pod Twoją markę. Web dev freelancer z Poznania. Wdrożenie na Vercel z SSL i CDN.',
  alternates: {
    canonical: 'https://igorchmiel.pl/uslugi/web-development',
    languages: {
      pl: 'https://igorchmiel.pl/uslugi/web-development',
      en: 'https://igorchmiel.pl/uslugi/web-development',
      'x-default': 'https://igorchmiel.pl/uslugi/web-development',
    },
  },
  openGraph: {
    title: 'Strony Internetowe i Aplikacje Web — React, Next.js, Tailwind | Igor Chmiel',
    description:
      'Tworzę szybkie strony internetowe i aplikacje web w React, Next.js i Tailwind CSS — bez szablonów, od zera pod Twoją markę.',
    url: 'https://igorchmiel.pl/uslugi/web-development',
    type: 'website',
    locale: 'pl_PL',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const features = [
  {
    title: 'Strony od zera — bez szablonów',
    desc: 'Każdy projekt buduję od podstaw w React i Next.js. Żadnych gotowych motywów WordPress ani page builderów — czysty, wydajny kod dopasowany do Twojej marki.',
  },
  {
    title: 'Nowoczesny stack technologiczny',
    desc: 'React 19, Next.js 15+, TypeScript, Tailwind CSS 4, Vercel Edge. Stosuję najnowsze technologie, które zapewniają szybkość, bezpieczeństwo i łatwość rozwoju.',
  },
  {
    title: 'Responsywność i Mobile-First',
    desc: 'Projektuję z myślą o urządzeniach mobilnych od samego początku. Każda strona wygląda i działa idealnie na smartfonach, tabletach i desktopach.',
  },
  {
    title: 'SEO i wydajność w standardzie',
    desc: 'Każda strona przechodzi optymalizację SEO on-page, ma dane strukturalne JSON-LD i osiąga wyniki 95+ w Google Lighthouse. SSR/SSG w Next.js zapewnia błyskawiczne ładowanie.',
  },
  {
    title: 'Wdrożenie i hosting na Vercel',
    desc: 'Deploying na Vercel z automatycznym SSL, globalnym CDN, preview deployments i CI/CD z GitHub. Zero konfiguracji serwera — strona jest online w minutę.',
  },
];

const process = [
  {
    step: 'Konsultacja i brief',
    desc: 'Na bezpłatnym spotkaniu poznaję Twoje cele biznesowe, grupę docelową i oczekiwania wizualne. Ustalam zakres projektu, technologię i harmonogram.',
  },
  {
    step: 'Projekt i prototyp',
    desc: 'Przygotowuję wireframy kluczowych podstron i prototyp interaktywny. Po akceptacji makiet przechodzę do kodowania — bez zbędnych iteracji designerskich.',
  },
  {
    step: 'Development i testy',
    desc: 'Koduję stronę w React/Next.js z Tailwind CSS. Testuję responsywność, wydajność, dostępność i SEO. Każda podstrona przechodzi walidację przed wdrożeniem.',
  },
  {
    step: 'Wdrożenie i wsparcie',
    desc: 'Publikuję stronę na Vercel, konfiguruję domenę i SSL, podpinam analitykę. Po wdrożeniu zapewniam bezpłatną opiekę techniczną i wsparcie przy drobnych zmianach.',
  },
];

const faq = [
  {
    q: 'Ile kosztuje strona internetowa?',
    a: 'Strony internetowe zaczynam od 3 000 PLN za prostą stronę wizytówkową (3-5 podstron). Rozbudowane strony firmowe z blogiem, formularzami i integracjami to typowo 5 000-12 000 PLN. Dokładną wycenę przygotowuję po konsultacji.',
  },
  {
    q: 'Dlaczego Next.js zamiast WordPress?',
    a: 'Next.js jest szybszy (SSR/SSG), bezpieczniejszy (brak bazy danych do zhakowania), lepszy dla SEO (Core Web Vitals) i tańszy w utrzymaniu (hosting na Vercel jest darmowy dla małych stron). WordPress ma sens przy dużym CMS — ale dla większości firm Next.js daje lepsze efekty.',
  },
  {
    q: 'Jak długo trwa budowa strony?',
    a: 'Prosta strona wizytówkowa: 1-2 tygodnie. Strona firmowa z blogiem i formularzami: 2-4 tygodnie. Sklep internetowy lub aplikacja web: 4-8 tygodni. Dokładny harmonogram ustalimy na konsultacji.',
  },
  {
    q: 'Czy mogę sam edytować treści na stronie?',
    a: 'Tak — mogę zintegrować headless CMS (np. Contentful, Sanity), dzięki któremu edytujesz teksty i zdjęcia przez prosty panel administracyjny, bez dotykania kodu. Alternatywnie mogę wdrożyć edycję przez Markdown w repozytorium GitHub.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Strony Internetowe i Aplikacje Web',
  description:
    'Tworzenie szybkich stron internetowych i aplikacji web w React, Next.js i Tailwind CSS — bez szablonów, od zera.',
  provider: {
    '@type': 'Person',
    name: 'Igor Chmiel',
    url: 'https://igorchmiel.pl',
  },
  areaServed: { '@type': 'Country', name: 'Poland' },
  serviceType: 'Web Development',
  url: 'https://igorchmiel.pl/uslugi/web-development',
  offers: {
    '@type': 'Offer',
    price: '3000',
    priceCurrency: 'PLN',
    description: 'Cena początkowa projektu strony internetowej',
    url: 'https://igorchmiel.pl/uslugi/web-development',
  },
};

export default function WebDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Usługi', path: '/uslugi/web-development' },
          { name: 'Strony Internetowe', path: '/uslugi/web-development' },
        ])}
      />
      <ServicePageLayout
        title="Strony Internetowe i Aplikacje Web — React, Next.js, Tailwind"
        subtitle="Web Development Freelancer"
        description="Buduję szybkie, responsywne strony internetowe bez gotowych szablonów — każdy projekt od zera pod Twoją markę. React, Next.js, TypeScript, Tailwind CSS. Wdrożenie na Vercel z SSL, CDN i automatycznym skalowaniem. Wyniki 95+ w Google Lighthouse w standardzie."
        features={features}
        process={process}
        faq={faq}
        iconName="Globe"
        priceFrom="od 3 000 PLN"
        priceNote="Jednorazowa wycena projektu — zależna od zakresu i funkcjonalności"
      />
    </>
  );
}

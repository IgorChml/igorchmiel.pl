import type { Metadata } from 'next';
import ServicePageLayout from '../../../src/components/ServicePageLayout';
import { breadcrumbJsonLd, JsonLd } from '../../../src/lib/jsonld';

export const metadata: Metadata = {
  title: 'Techniczne SEO — Audyt, Optymalizacja i Pozycjonowanie',
  description:
    'Techniczne SEO i audyt SEO dla firm B2B. Optymalizacja Core Web Vitals, dane strukturalne JSON-LD, architektura linkowania i pozycjonowanie. Wyniki 95+ w Google Lighthouse.',
  alternates: {
    canonical: 'https://igorchmiel.pl/uslugi/seo',
    languages: {
      pl: 'https://igorchmiel.pl/uslugi/seo',
      en: 'https://igorchmiel.pl/uslugi/seo',
      'x-default': 'https://igorchmiel.pl/uslugi/seo',
    },
  },
  openGraph: {
    title: 'Techniczne SEO — Audyt, Optymalizacja i Pozycjonowanie | Igor Chmiel',
    description:
      'Techniczne SEO i audyt SEO dla firm B2B. Optymalizacja Core Web Vitals, dane strukturalne, pozycjonowanie. Wyniki 95+ w Lighthouse.',
    url: 'https://igorchmiel.pl/uslugi/seo',
    type: 'website',
    locale: 'pl_PL',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const features = [
  {
    title: 'Audyt techniczny SEO',
    desc: 'Kompleksowy przegląd strony obejmujący indeksację, crawl budget, błędy 4xx/5xx, duplikaty treści, kanoniczne URL-e i strukturę witryny. Raport z priorytetyzowaną listą poprawek.',
  },
  {
    title: 'Optymalizacja Core Web Vitals',
    desc: 'Poprawiam LCP, FID/INP i CLS do poziomu "Good" — optymalizacja obrazów, lazy loading, eliminacja render-blocking resources i minimalizacja JavaScript.',
  },
  {
    title: 'Dane strukturalne (JSON-LD)',
    desc: 'Wdrażam Schema.org markup — Organization, Product, FAQ, BreadcrumbList, Article i inne. Rich snippets zwiększają CTR w wynikach wyszukiwania o 20-35%.',
  },
  {
    title: 'Architektura linkowania wewnętrznego',
    desc: 'Projektuję optymalną strukturę linków wewnętrznych, silosy tematyczne i hierarchię stron, by zmaksymalizować crawl efficiency i przekazywanie autorytetu.',
  },
  {
    title: 'Pozycjonowanie i monitoring',
    desc: 'Śledzę pozycje kluczowych fraz w Google, analizuję widoczność organiczną i reaguję na zmiany algorytmu. Miesięczne raporty z rekomendacjami działań.',
  },
];

const process = [
  {
    step: 'Audyt techniczny i analiza',
    desc: 'Przeprowadzam pełny crawl witryny, analizuję Google Search Console, testuję Core Web Vitals i sprawdzam stan indeksacji. Identyfikuję krytyczne problemy techniczne.',
  },
  {
    step: 'Raport i plan optymalizacji',
    desc: 'Dostarczam szczegółowy raport z priorytetyzowaną listą poprawek — od krytycznych błędów po long-term improvements. Każda rekomendacja ma szacowany wpływ na widoczność.',
  },
  {
    step: 'Wdrożenie poprawek',
    desc: 'Implementuję poprawki techniczne: meta tagi, dane strukturalne, sitemap, robots.txt, optymalizacja obrazów, konfiguracja cache i CDN. Dla stron na Next.js — bezpośrednio w kodzie.',
  },
  {
    step: 'Monitoring i iteracja',
    desc: 'Śledzę efekty wdrożonych zmian w Search Console i narzędziach SEO. Co miesiąc identyfikuję nowe szanse optymalizacji i reaguję na zmiany algorytmu Google.',
  },
];

const faq = [
  {
    q: 'Czym różni się techniczne SEO od "zwykłego" pozycjonowania?',
    a: 'Techniczne SEO skupia się na infrastrukturze strony — szybkości ładowania, indeksacji, strukturze danych, bezpieczeństwie i mobilności. To fundament, bez którego nawet najlepsze treści nie osiągną wysokich pozycji w Google.',
  },
  {
    q: 'Jak szybko poprawią się pozycje w Google?',
    a: 'Efekty poprawek technicznych są widoczne w Search Console w ciągu 2-4 tygodni. Wzrost pozycji fraz kluczowych następuje stopniowo — znaczące zmiany widać po 1-3 miesiącach od wdrożenia.',
  },
  {
    q: 'Czy oferujesz audyt SEO jednorazowo?',
    a: 'Tak — audyt techniczny SEO jest dostępny jako usługa jednorazowa (raport + lista poprawek). Mogę też wdrożyć poprawki i zapewnić bieżący monitoring w ramach stałej współpracy miesięcznej.',
  },
  {
    q: 'Jakie narzędzia SEO stosujesz?',
    a: 'Korzystam z Google Search Console, Lighthouse, Screaming Frog, Ahrefs, PageSpeed Insights i GTmetrix. Dla stron Next.js analizuję też bundl size, server-side rendering i middleware.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Techniczne SEO — Audyt i Optymalizacja',
  description:
    'Audyty techniczne SEO, optymalizacja Core Web Vitals, dane strukturalne JSON-LD i pozycjonowanie stron B2B.',
  provider: {
    '@type': 'Person',
    name: 'Igor Chmiel',
    url: 'https://igorchmiel.pl',
  },
  areaServed: { '@type': 'Country', name: 'Poland' },
  serviceType: 'Technical SEO',
  url: 'https://igorchmiel.pl/uslugi/seo',
};

export default function SeoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Usługi', path: '/uslugi/seo' },
          { name: 'Techniczne SEO', path: '/uslugi/seo' },
        ])}
      />
      <ServicePageLayout
        title="Techniczne SEO — Audyt, Optymalizacja i Pozycjonowanie"
        subtitle="Techniczne SEO i Pozycjonowanie B2B"
        description="Przeprowadzam audyty techniczne SEO obejmujące Core Web Vitals, architekturę linkowania, crawl budget i indeksację. Optymalizuję meta tagi, dane strukturalne JSON-LD, szybkość ładowania i responsywność. Strony moich klientów osiągają wyniki 95+ w Google Lighthouse."
        features={features}
        process={process}
        faq={faq}
        iconName="Search"
        priceFrom="Wycena indywidualna"
        priceNote="Audyt techniczny i optymalizacja wyceniane wg zakresu serwisu"
      />
    </>
  );
}

import type { Metadata } from 'next';
import ServicePageLayout from '../../../src/components/ServicePageLayout';
import { breadcrumbJsonLd, JsonLd } from '../../../src/lib/jsonld';

export const metadata: Metadata = {
  title: 'Konsultacje Marketingowe B2B — Strategia i Lejek Sprzedażowy',
  description:
    'Konsultant marketingowy B2B z Poznania. Doradztwo marketingowe, budowa lejków sprzedażowych, strategia lead generation i audyt działań marketingowych dla firm usługowych, SaaS i e-commerce.',
  alternates: {
    canonical: 'https://igorchmiel.pl/uslugi/marketing-b2b',
    languages: {
      pl: 'https://igorchmiel.pl/uslugi/marketing-b2b',
      en: 'https://igorchmiel.pl/uslugi/marketing-b2b',
      'x-default': 'https://igorchmiel.pl/uslugi/marketing-b2b',
    },
  },
  openGraph: {
    title: 'Konsultacje Marketingowe B2B — Strategia i Lejek Sprzedażowy | Igor Chmiel',
    description:
      'Konsultant marketingowy B2B. Doradztwo marketingowe, budowa lejków sprzedażowych, strategia lead generation i audyt działań marketingowych.',
    url: 'https://igorchmiel.pl/uslugi/marketing-b2b',
    type: 'website',
    locale: 'pl_PL',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const features = [
  {
    title: 'Audyt marketingowy i analiza lejka',
    desc: 'Przeglądam obecne działania marketingowe, kanały pozyskiwania i lejek sprzedażowy. Identyfikuję miejsca, w których tracisz potencjalnych klientów.',
  },
  {
    title: 'Definicja ICP i Buyer Persona',
    desc: 'Pomagam precyzyjnie zdefiniować idealny profil klienta (ICP) i buyer persony, by skupić budżet marketingowy na segmentach o najwyższym potencjale konwersji.',
  },
  {
    title: 'Strategia lead generation',
    desc: 'Projektuję system pozyskiwania leadów: od ruchu organicznego, przez lead magnety, po sekwencje e-mail i retargeting. Każdy etap mierzony i optymalizowany.',
  },
  {
    title: 'Budowa lejka sprzedażowego',
    desc: 'Tworzę kompletny lejek od świadomości po konwersję — landing page, formularze, automatyzacja e-mail, scoring leadów i kwalifikacja do sprzedaży.',
  },
  {
    title: 'KPI, analityka i raportowanie',
    desc: 'Wdrażam śledzenie CAC, LTV, współczynnika konwersji i ROI kampanii. Raportuję miesięcznie z konkretnymi rekomendacjami na kolejny okres.',
  },
];

const process = [
  {
    step: 'Bezpłatna konsultacja wstępna',
    desc: 'Na 30-minutowym spotkaniu poznaję Twój biznes, cele sprzedażowe i dotychczasowe działania marketingowe. Oceniam, gdzie są największe szanse na szybkie efekty.',
  },
  {
    step: 'Audyt i analiza danych',
    desc: 'Przeprowadzam szczegółowy audyt obecnego lejka, kanałów marketingowych, analityki i procesów sprzedażowych. Identyfikuję luki i szanse.',
  },
  {
    step: 'Strategia i plan wdrożenia',
    desc: 'Przygotowuję spersonalizowaną strategię marketingową B2B z konkretnym harmonogramem, budżetem i KPI. Każde działanie ma przypisany mierzalny cel.',
  },
  {
    step: 'Egzekucja i optymalizacja',
    desc: 'Wspieram wdrożenie strategii — od konfiguracji narzędzi, przez tworzenie treści, po optymalizację kampanii na podstawie napływających danych.',
  },
];

const faq = [
  {
    q: 'Czym różnisz się od agencji marketingowej?',
    a: 'Pracujesz bezpośrednio ze mną — bez account managerów, bez juniorów. Łączę kompetencje strategiczne z technicznymi (koduję landing page, konfiguruję analitykę, buduję automatyzacje). Szybsza komunikacja, niższe koszty i pełna transparentność.',
  },
  {
    q: 'Ile kosztuje konsultacja marketingowa?',
    a: 'Konsultacje zaczynam od 200 PLN/h. Pakiety strategiczne (audyt + plan + wsparcie wdrożeniowe) wyceniam indywidualnie — typowo 3 000-8 000 PLN w zależności od zakresu. Pierwsza konsultacja 30 min jest bezpłatna.',
  },
  {
    q: 'Dla jakich firm jest doradztwo B2B?',
    a: 'Pracuję z firmami usługowymi, SaaS, e-commerce B2B i specjalistami, którzy chcą systematycznie pozyskiwać klientów. Najlepsze efekty osiągam z firmami, które mają dobry produkt, ale brakuje im spójnej strategii marketingowej.',
  },
  {
    q: 'Jak szybko zobaczę wyniki?',
    a: 'Pierwsze szybkie efekty (optymalizacja lejka, poprawa konwersji) — w ciągu 2-4 tygodni. Pełna strategia lead generation przynosi mierzalne rezultaty po 2-3 miesiącach systematycznej pracy.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Konsultacje Marketingowe B2B',
  description:
    'Doradztwo marketingowe dla firm B2B — budowa lejków sprzedażowych, strategia lead generation, audyt działań marketingowych.',
  provider: {
    '@type': 'Person',
    name: 'Igor Chmiel',
    url: 'https://igorchmiel.pl',
  },
  areaServed: { '@type': 'Country', name: 'Poland' },
  serviceType: 'B2B Marketing Consulting',
  url: 'https://igorchmiel.pl/uslugi/marketing-b2b',
  offers: {
    '@type': 'Offer',
    price: '200',
    priceCurrency: 'PLN',
    description: 'Stawka godzinowa konsultacji marketingowych B2B',
    url: 'https://igorchmiel.pl/uslugi/marketing-b2b',
  },
};

export default function MarketingB2BPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Usługi', path: '/uslugi/marketing-b2b' },
          { name: 'Konsultacje Marketingowe B2B', path: '/uslugi/marketing-b2b' },
        ])}
      />
      <ServicePageLayout
        title="Konsultacje Marketingowe B2B — Strategia i Lejek Sprzedażowy"
        subtitle="Konsultant Marketingowy B2B"
        description="Audytuję obecne działania marketingowe i buduję lejek sprzedażowy od zera. Pomagam zdefiniować idealny profil klienta, dobrać kanały pozyskiwania leadów i zmierzyć efekty. Pracuję z firmami usługowymi, SaaS i e-commerce — od strategii po codzienną egzekucję."
        features={features}
        process={process}
        faq={faq}
        iconName="Briefcase"
        priceFrom="od 200 PLN / h"
        priceNote="Konsultacje i doradztwo — pakiety projektowe wyceniane indywidualnie"
      />
    </>
  );
}

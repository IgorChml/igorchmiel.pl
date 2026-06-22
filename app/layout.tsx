import type { Metadata } from 'next';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://igorchmiel.pl'),
  title: {
    default: 'Igor Chmiel | Strony WWW i Marketing dla Małych Firm bez Agencji',
    template: '%s | Igor Chmiel',
  },
  description: 'Pomagam małym firmom i specjalistom budować strony internetowe i system marketingu, który generuje leady — bez udziału agencji. Web design, SEO, content marketing.',
  alternates: {
    canonical: 'https://igorchmiel.pl/',
    languages: {
      'pl': 'https://igorchmiel.pl/',
      'x-default': 'https://igorchmiel.pl/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Igor Chmiel',
    url: 'https://igorchmiel.pl/',
    title: 'Igor Chmiel | Strony WWW i Marketing dla Małych Firm bez Agencji',
    description: 'Pomagam małym firmom i specjalistom budować strony internetowe i system marketingu, który generuje leady — bez udziału agencji. Web design, SEO, content marketing.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Igor Chmiel | Strony WWW i Marketing dla Małych Firm bez Agencji',
    description: 'Pomagam małym firmom i specjalistom budować strony internetowe i system marketingu, który generuje leady — bez udziału agencji.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
  other: {
    'theme-color': '#f59e0b',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://igorchmiel.pl/#person',
      name: 'Igor Chmiel',
      url: 'https://igorchmiel.pl/',
      email: 'kontakt@igorchmiel.pl',
      jobTitle: 'Marketing Manager i Konsultant B2B',
      description: 'Marketing Manager, programista i niezależny konsultant biznesowy. Specjalizacja: content marketing, B2B, techniczne SEO, SaaS, web development.',
      knowsLanguage: ['pl', 'en'],
      sameAs: [
        'https://www.linkedin.com/in/igor-chmiel-%F0%9F%A7%90%E2%98%84%EF%B8%8F-148774232/',
        'https://github.com/IgorChml',
        'https://x.com/IgorChml',
        'https://www.instagram.com/igor_chml/',
        'https://www.youtube.com/@Igor_chmiel',
        'https://www.tiktok.com/@igor_chml',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://igorchmiel.pl/#website',
      url: 'https://igorchmiel.pl/',
      name: 'Igor Chmiel',
      description: 'Portfolio i oferta usług marketingowych, B2B i web development',
      publisher: { '@id': 'https://igorchmiel.pl/#person' },
      inLanguage: 'pl',
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://igorchmiel.pl/#service',
      name: 'Igor Chmiel — Marketing & Web Development',
      provider: { '@id': 'https://igorchmiel.pl/#person' },
      url: 'https://igorchmiel.pl/',
      areaServed: { '@type': 'Country', name: 'Poland' },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: 'https://igorchmiel.pl/',
        availableLanguage: ['pl', 'en'],
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Usługi',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Marketing', serviceType: 'Content Marketing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Konsultacje Marketingowe B2B', serviceType: 'B2B Marketing Consulting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Techniczne SEO', serviceType: 'Technical SEO' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Aplikacje SaaS', serviceType: 'SaaS Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Strony Internetowe', serviceType: 'Web Development' } },
        ],
      },
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Dla jakich firm pracujesz?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pracuję głównie z małymi firmami, freelancerami i specjalistami, którzy chcą zbudować profesjonalną obecność online i system pozyskiwania klientów — bez pośredników i agencji. Obsługuję branże B2B, e-commerce, SaaS, usługi lokalne i firmy technologiczne.' },
    },
    {
      '@type': 'Question',
      name: 'Jak wygląda współpraca krok po kroku?',
      acceptedAnswer: { '@type': 'Answer', text: 'Zaczynamy od bezpłatnej konsultacji (30 min), na której poznaję Twoje cele i wyzwania. Następnie przygotowuję propozycję zakresu prac i wycenę. Po akceptacji realizuję projekt etapami z regularnymi aktualizacjami. Na koniec wdrażam rozwiązanie i zapewniam wsparcie powdrożeniowe.' },
    },
    {
      '@type': 'Question',
      name: 'Ile kosztują Twoje usługi?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ceny zależą od zakresu projektu. Strony internetowe zaczynam od 3 000 PLN, konsultacje marketingowe od 200 PLN/h, a projekty SaaS wyceniam indywidualnie. Bezpłatna konsultacja pomoże określić budżet dopasowany do Twoich potrzeb.' },
    },
    {
      '@type': 'Question',
      name: 'Ile trwa typowy projekt?',
      acceptedAnswer: { '@type': 'Answer', text: 'Strona internetowa: 2–4 tygodnie. Strategia marketingowa: 1–2 tygodnie na audyt i plan + bieżąca realizacja. MVP aplikacji SaaS: 4–8 tygodni. Dokładny harmonogram ustalimy na konsultacji.' },
    },
    {
      '@type': 'Question',
      name: 'Czy pomagasz firmom bez budżetu na reklamę?',
      acceptedAnswer: { '@type': 'Answer', text: 'Tak — specjalizuję się w strategiach organicznych: content marketing, SEO, social media i budowa lejka sprzedażowego opartego na treściach. Wiele moich klientów generuje leady bez wydawania na płatne reklamy.' },
    },
    {
      '@type': 'Question',
      name: 'Co odróżnia Cię od agencji marketingowych?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pracujesz bezpośrednio ze mną — bez account managerów, bez juniorów, bez ukrytych kosztów. Łączę kompetencje marketingowe z technicznymi (koduję, wdrażam, optymalizuję). Szybsza komunikacja, niższe koszty i pełna transparentność.' },
    },
    {
      '@type': 'Question',
      name: 'Jak mierzysz efekty działań marketingowych?',
      acceptedAnswer: { '@type': 'Answer', text: 'Śledzę konkretne KPI: ruch organiczny, pozycje w Google, współczynnik konwersji, liczbę leadów, koszt pozyskania klienta (CAC) i wartość życiową klienta (LTV). Raportuję miesięcznie z rekomendacjami na kolejny okres.' },
    },
    {
      '@type': 'Question',
      name: 'Czy pracujesz zdalnie?',
      acceptedAnswer: { '@type': 'Answer', text: 'Tak, 100% moich projektów realizuję zdalnie. Komunikuję się przez e-mail, Slack, Google Meet lub inne narzędzia, które preferujesz. Jestem dostępny w godzinach 9:00–17:00 CET.' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="image" href="/igor-hero.webp" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="bg-neutral-950 text-neutral-100 selection:bg-brand selection:text-neutral-950 antialiased overflow-x-hidden">
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

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
      'en': 'https://igorchmiel.pl/',
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
      mainEntityOfPage: 'https://igorchmiel.pl/o-mnie',
      image: 'https://igorchmiel.pl/igor-hero.webp',
      email: 'kontakt@igorchmiel.pl',
      taxID: '7831897775',
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
      image: 'https://igorchmiel.pl/igor-hero.webp',
      logo: 'https://igorchmiel.pl/logo.png',
      email: 'kontakt@igorchmiel.pl',
      taxID: '7831897775',
      priceRange: 'od 200 PLN',
      currenciesAccepted: 'PLN',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Poznań',
        addressRegion: 'wielkopolskie',
        addressCountry: 'PL',
      },
      areaServed: [
        { '@type': 'Country', name: 'Poland' },
        { '@type': 'City', name: 'Poznań' },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'kontakt@igorchmiel.pl',
        contactType: 'sales',
        availableLanguage: ['pl', 'en'],
      },
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

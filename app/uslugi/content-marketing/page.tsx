import type { Metadata } from 'next';
import ServicePageLayout from '../../../src/components/ServicePageLayout';
import { breadcrumbJsonLd, JsonLd } from '../../../src/lib/jsonld';

export const metadata: Metadata = {
  title: 'Content Marketing B2B — Strategia Treści dla Firm',
  description:
    'Tworzę strategie content marketingowe dla firm B2B — artykuły blogowe, posty social media, kalendarz publikacji. Konsultant content marketingu z Poznania. Wzrost ruchu organicznego o 80-140% w 6 miesięcy.',
  alternates: {
    canonical: 'https://igorchmiel.pl/uslugi/content-marketing',
    languages: {
      pl: 'https://igorchmiel.pl/uslugi/content-marketing',
      en: 'https://igorchmiel.pl/uslugi/content-marketing',
      'x-default': 'https://igorchmiel.pl/uslugi/content-marketing',
    },
  },
  openGraph: {
    title: 'Content Marketing B2B — Strategia Treści dla Firm | Igor Chmiel',
    description:
      'Tworzę strategie content marketingowe dla firm B2B — artykuły blogowe, posty social media, kalendarz publikacji. Wzrost ruchu organicznego o 80-140% w 6 miesięcy.',
    url: 'https://igorchmiel.pl/uslugi/content-marketing',
    type: 'website',
    locale: 'pl_PL',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const features = [
  {
    title: 'Strategia treści dopasowana do branży',
    desc: 'Analizuję Twoją grupę docelową, konkurencję i słowa kluczowe, by stworzyć plan treści generujący ruch organiczny i budujący autorytet marki.',
  },
  {
    title: 'Artykuły blogowe i SEO copywriting',
    desc: 'Piszę merytoryczne artykuły zoptymalizowane pod wyszukiwarki — z nagłówkami, frazami kluczowymi i strukturą, która przyciąga zarówno Google, jak i czytelników.',
  },
  {
    title: 'Kalendarz publikacji i dystrybucja',
    desc: 'Planuję regularny harmonogram publikacji na blogu, LinkedIn, Facebooku i newsletterze, aby zapewnić ciągły dopływ ruchu i zaangażowania.',
  },
  {
    title: 'Recykling treści i repurposing',
    desc: 'Jeden artykuł zamieniam na posty social media, infografiki, newsletter i materiały sprzedażowe — maksymalizuję zwrot z każdej treści.',
  },
  {
    title: 'Analityka i raportowanie wyników',
    desc: 'Śledzę ruch organiczny, pozycje fraz, konwersje z treści i zaangażowanie. Co miesiąc dostajesz raport z rekomendacjami na kolejny okres.',
  },
];

const process = [
  {
    step: 'Audyt treści i analiza konkurencji',
    desc: 'Przeglądam istniejące treści, analizuję content gap i sprawdzam, jakie tematy przynoszą efekty u konkurencji w Twojej branży.',
  },
  {
    step: 'Strategia i kalendarz redakcyjny',
    desc: 'Tworzę szczegółowy plan treści na 3-6 miesięcy z przypisanymi tematami, frazami kluczowymi, formatami i kanałami dystrybucji.',
  },
  {
    step: 'Produkcja i publikacja treści',
    desc: 'Piszę artykuły blogowe, posty social media i materiały lead magnet. Każda treść przechodzi proces optymalizacji SEO przed publikacją.',
  },
  {
    step: 'Analiza wyników i optymalizacja',
    desc: 'Mierzę efekty, identyfikuję najlepsze tematy i formaty, a następnie optymalizuję strategię na podstawie danych z Google Analytics i Search Console.',
  },
];

const faq = [
  {
    q: 'Jak szybko zobaczę efekty content marketingu?',
    a: 'Pierwsze wzrosty ruchu organicznego pojawiają się zwykle po 2-3 miesiącach regularnych publikacji. Pełne efekty strategii content marketingowej są widoczne po 6 miesiącach — średnio osiągam wzrost ruchu o 80-140% dla klientów B2B.',
  },
  {
    q: 'Ile artykułów miesięcznie potrzebuję?',
    a: 'Dla większości firm B2B rekomendowane minimum to 4-8 artykułów blogowych miesięcznie plus regularne posty social media. Dokładną liczbę ustalimy na podstawie analizy Twojej branży i budżetu.',
  },
  {
    q: 'Czy piszesz treści sam, czy korzystasz z AI?',
    a: 'Łączę swoje doświadczenie copywriterskie z narzędziami AI jako wsparcie przy research i szkicach. Każdy tekst przechodzi ręczną redakcję, optymalizację SEO i dostosowanie do tonu komunikacji Twojej marki.',
  },
  {
    q: 'Dla jakich branż tworzysz treści?',
    a: 'Specjalizuję się w treściach dla firm B2B, SaaS, e-commerce, usług profesjonalnych i branży technologicznej. Mam doświadczenie w pisaniu o marketingu, sprzedaży, technologii i biznesie.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Content Marketing B2B',
  description:
    'Tworzenie strategii content marketingowych dla firm B2B — artykuły blogowe, posty social media, kalendarz publikacji.',
  provider: {
    '@type': 'Person',
    name: 'Igor Chmiel',
    url: 'https://igorchmiel.pl',
  },
  areaServed: { '@type': 'Country', name: 'Poland' },
  serviceType: 'Content Marketing',
  url: 'https://igorchmiel.pl/uslugi/content-marketing',
};

export default function ContentMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Usługi', path: '/uslugi/content-marketing' },
          { name: 'Content Marketing B2B', path: '/uslugi/content-marketing' },
        ])}
      />
      <ServicePageLayout
        title="Content Marketing B2B — Strategia Treści dla Firm"
        subtitle="Content Marketing B2B"
        description="Tworzę strategie treści, które przyciągają klientów z wyszukiwarek i budują autorytet Twojej marki. Artykuły blogowe, posty social media, newslettery i lead magnety — wszystko w ramach spójnego planu contentowego dopasowanego do Twojej branży B2B."
        features={features}
        process={process}
        faq={faq}
        iconName="PenTool"
        priceFrom="Wycena indywidualna"
        priceNote="Miesięczne pakiety contentowe dopasowane do zakresu i branży"
      />
    </>
  );
}

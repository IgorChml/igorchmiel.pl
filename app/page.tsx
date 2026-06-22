import HeroSection from '../src/components/HeroSection';
import ServicesSection from '../src/components/ServicesSection';
import About from '../src/components/About';
import ProjectsSection from '../src/components/ProjectsSection';
import FAQ from '../src/components/FAQ';
import ContactForm from '../src/components/ContactForm';
import { JsonLd } from '../src/lib/jsonld';
import { translations } from '../src/lib/i18n';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: translations.pl.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <HeroSection />
      <ServicesSection />
      <About />
      <ProjectsSection />
      <FAQ />
      <ContactForm />
    </>
  );
}

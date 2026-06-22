import HeroSection from '../src/components/HeroSection';
import ServicesSection from '../src/components/ServicesSection';
import About from '../src/components/About';
import ProjectsSection from '../src/components/ProjectsSection';
import FAQ from '../src/components/FAQ';
import ContactForm from '../src/components/ContactForm';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <About />
      <ProjectsSection />
      <FAQ />
      <ContactForm />
    </>
  );
}

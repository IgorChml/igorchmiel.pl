import type { Metadata } from 'next';
import { BlogList } from '../../src/components/BlogPage';

export const metadata: Metadata = {
  title: 'Blog — Artykuły o Marketingu, SEO i Web Development',
  description: 'Praktyczne artykuły o content marketingu, SEO, budowaniu aplikacji SaaS i strategiach pozyskiwania klientów B2B. Porady od praktyka, nie teoretyka.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Artykuły o Marketingu, SEO i Web Development',
    description: 'Praktyczne artykuły o content marketingu, SEO, budowaniu aplikacji SaaS i strategiach pozyskiwania klientów B2B.',
    url: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <BlogList />
      </div>
    </div>
  );
}

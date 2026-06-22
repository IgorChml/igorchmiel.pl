import type { Metadata } from 'next';
import { BlogList } from '../../src/components/BlogPage';
import { getBlogPosts } from '../../src/lib/blog-server';
import { breadcrumbJsonLd, JsonLd } from '../../src/lib/jsonld';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog — Artykuły o Marketingu, SEO i Web Development',
  description: 'Praktyczne artykuły o content marketingu, SEO, budowaniu aplikacji SaaS i strategiach pozyskiwania klientów B2B. Porady od praktyka, nie teoretyka.',
  alternates: {
    canonical: '/blog',
    languages: { pl: '/blog', en: '/blog', 'x-default': '/blog' },
  },
  openGraph: {
    title: 'Blog — Artykuły o Marketingu, SEO i Web Development',
    description: 'Praktyczne artykuły o content marketingu, SEO, budowaniu aplikacji SaaS i strategiach pozyskiwania klientów B2B.',
    url: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://igorchmiel.pl/blog#blog',
    name: 'Blog — Igor Chmiel',
    description:
      'Praktyczne artykuły o content marketingu, SEO, budowaniu aplikacji SaaS i strategiach pozyskiwania klientów B2B.',
    url: 'https://igorchmiel.pl/blog',
    inLanguage: 'pl',
    author: { '@id': 'https://igorchmiel.pl/#person' },
    blogPost: posts.slice(0, 20).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://igorchmiel.pl/blog/${post.slug}`,
      datePublished: post.isoDate,
      ...(post.imageUrl ? { image: post.imageUrl } : {}),
    })),
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-28 pb-20 font-sans">
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Blog', path: '/blog' }])} />
      <div className="max-w-7xl mx-auto px-6">
        <BlogList posts={posts} />
      </div>
    </div>
  );
}

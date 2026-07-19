import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogPosts, getBlogPost } from '../../../src/lib/blog-server';
import { renderContent } from '../../../src/lib/renderContent';
import { breadcrumbJsonLd, JsonLd } from '../../../src/lib/jsonld';
import { translations } from '../../../src/lib/i18n';

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: 'Artykuł nie znaleziony' };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        pl: `/blog/${post.slug}`,
        en: `/blog/${post.slug}`,
        'x-default': `/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/blog/${post.slug}`,
      type: 'article',
      locale: 'pl_PL',
      images: post.imageUrl
        ? [{ url: post.imageUrl }]
        : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const tr = translations.pl;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    url: `https://igorchmiel.pl/blog/${post.slug}`,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    inLanguage: 'pl',
    author: { '@id': 'https://igorchmiel.pl/#person' },
    publisher: { '@id': 'https://igorchmiel.pl/#person' },
    mainEntityOfPage: `https://igorchmiel.pl/blog/${post.slug}`,
    ...(post.imageUrl ? { image: post.imageUrl } : {}),
    articleSection: post.categoryLabel,
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-28 pb-20 font-sans">
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-neutral-500 hover:text-brand font-sans font-bold text-xs hover:-translate-x-0.5 transition-all duration-150 py-2 group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span>{tr.about.backToList}</span>
          </Link>

          <article className="bg-neutral-900 rounded border border-white/8 overflow-hidden p-6 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500">
              <span className="bg-brand/10 text-brand px-2.5 py-1 rounded font-bold text-[10px] uppercase">
                {post.categoryLabel}
              </span>
              <div className="flex items-center">
                <Calendar size={12} className="mr-1.5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={12} className="mr-1.5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            {post.imageUrl && (
              <div className="h-64 sm:h-96 rounded-lg overflow-hidden relative bg-neutral-800 max-h-[400px]">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-6 pt-4 border-t border-white/6 text-sm sm:text-base">
              {renderContent(post.content)}
            </div>

            <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center gap-4 bg-white/3 p-6 rounded">
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand font-mono font-bold text-lg flex items-center justify-center border border-brand/20 shrink-0">
                IC
              </div>
              <div className="text-center sm:text-left space-y-1">
                <p className="text-xs font-bold text-white">{tr.about.authorTitle}</p>
                <p className="text-[11px] text-neutral-500 font-sans leading-relaxed">
                  {tr.about.authorDesc}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

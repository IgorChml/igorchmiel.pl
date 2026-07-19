import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PROJECTS_DATA } from '../../src/data';
import { breadcrumbJsonLd, JsonLd } from '../../src/lib/jsonld';

export const metadata: Metadata = {
  title: 'Portfolio — Realizacje i Case Study | Igor Chmiel',
  description:
    'Zobacz moje realizacje: sklepy internetowe, strony firmowe, aplikacje webowe i kampanie marketingowe dla firm B2B. Case study z wynikami.',
  alternates: {
    canonical: 'https://igorchmiel.pl/portfolio',
    languages: {
      pl: 'https://igorchmiel.pl/portfolio',
      en: 'https://igorchmiel.pl/portfolio',
      'x-default': 'https://igorchmiel.pl/portfolio',
    },
  },
  openGraph: {
    title: 'Portfolio — Realizacje i Case Study | Igor Chmiel',
    description:
      'Sklepy internetowe, strony firmowe, aplikacje webowe i kampanie marketingowe. Case study z wynikami.',
    url: 'https://igorchmiel.pl/portfolio',
    type: 'website',
    locale: 'pl_PL',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'dev', label: 'Aplikacje & SaaS' },
  { id: 'ecommerce', label: 'Sklepy E-commerce' },
  { id: 'services', label: 'Strony Usługowe' },
  { id: 'portfolio', label: 'Portfolio i Landing Page' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Portfolio — Igor Chmiel',
  description:
    'Realizacje: sklepy internetowe, strony firmowe, aplikacje webowe i kampanie marketingowe dla firm B2B.',
  url: 'https://igorchmiel.pl/portfolio',
  inLanguage: 'pl',
  isPartOf: { '@id': 'https://igorchmiel.pl/#website' },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: PROJECTS_DATA.map((project, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `https://igorchmiel.pl/portfolio/${project.id}`,
      name: project.title,
    })),
  },
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Portfolio', path: '/portfolio' }])} />
      <main className="bg-neutral-950 text-white">
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6 space-y-16">
            <div className="text-center space-y-4">
              <p className="text-xs sm:text-sm text-brand font-semibold uppercase tracking-wider">
                Portfolio
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight">
                Moje realizacje
              </h1>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed max-w-2xl mx-auto">
                Wybrane projekty z zakresu web developmentu, e-commerce i marketingu B2B —
                pogrupowane według kategorii. Kliknij projekt, aby zobaczyć pełne case study.
              </p>
            </div>

            {CATEGORIES.map((category) => {
              const projects = PROJECTS_DATA.filter((p) => p.category === category.id);
              if (projects.length === 0) return null;

              return (
                <div key={category.id} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg sm:text-xl font-sans font-extrabold text-white tracking-tight">
                      {category.label}
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                    <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                      {projects.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/portfolio/${project.id}`}
                        className="group bg-neutral-900 border border-white/8 rounded overflow-hidden hover:border-brand/25 transition-all duration-300"
                      >
                        <div
                          className={`relative h-48 bg-gradient-to-br ${project.thumbnailGradient} overflow-hidden`}
                        >
                          {project.thumbnailImage && (
                            <Image
                              src={project.thumbnailImage}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="p-6 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-brand font-semibold uppercase tracking-wider">
                              {project.categoryLabel} · {project.completedYear}
                            </span>
                            <ArrowRight
                              size={14}
                              className="text-neutral-600 group-hover:text-brand transition-colors"
                            />
                          </div>
                          <h3 className="text-sm font-sans font-bold text-white group-hover:text-brand transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs text-neutral-500 font-sans leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

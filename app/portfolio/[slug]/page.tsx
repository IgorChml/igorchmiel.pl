import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink, Tag } from 'lucide-react';
import { PROJECTS_DATA } from '../../../src/data';
import type { Project } from '../../../src/types';

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === slug);

  if (!project) {
    return { title: 'Projekt nie znaleziony' };
  }

  return {
    title: `${project.title} — Portfolio`,
    description: project.detailedDescription || project.description,
    alternates: {
      canonical: `https://igorchmiel.pl/portfolio/${project.id}`,
    },
    openGraph: {
      title: `${project.title} | Portfolio — Igor Chmiel`,
      description: project.detailedDescription || project.description,
      url: `https://igorchmiel.pl/portfolio/${project.id}`,
      type: 'website',
      locale: 'pl_PL',
      images: project.thumbnailImage
        ? [{ url: project.thumbnailImage, width: 1200, height: 630 }]
        : [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.detailedDescription || project.description,
    url: `https://igorchmiel.pl/portfolio/${project.id}`,
    author: {
      '@type': 'Person',
      name: 'Igor Chmiel',
      url: 'https://igorchmiel.pl',
    },
    dateCreated: `${project.completedYear}`,
    keywords: project.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-neutral-950 text-white">
        {/* Hero */}
        <section className="pt-32 pb-16 relative">
          <div
            className={`absolute inset-0 bg-gradient-to-b ${project.thumbnailGradient} opacity-10 pointer-events-none`}
          />
          <div className="max-w-4xl mx-auto px-6 relative space-y-6">
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-brand transition-colors"
            >
              <ArrowLeft size={14} />
              Wróć do portfolio
            </a>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 px-3 py-1.5 rounded">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-brand">
                  {project.categoryLabel}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-xs text-neutral-500">
                Klient: <span className="text-neutral-300">{project.client}</span> | Rok:{' '}
                <span className="text-neutral-300">{project.completedYear}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        {project.thumbnailImage && (
          <section className="pb-8">
            <div className="max-w-5xl mx-auto px-6">
              <div className={`relative aspect-[16/9] w-full rounded overflow-hidden border border-white/8 bg-gradient-to-br ${project.thumbnailGradient}`}>
                <Image
                  src={project.thumbnailImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* Description */}
        <section className="pb-16 border-t border-white/5 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
          <div className="max-w-4xl mx-auto px-6 pt-12 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-sans font-bold text-white">O projekcie</h2>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                {project.detailedDescription || project.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h2 className="text-xl font-sans font-bold text-white">
                Kluczowe funkcjonalności
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mt-0.5">
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h2 className="text-xl font-sans font-bold text-white">Technologie</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-neutral-900 border border-white/8 px-3 py-1.5 rounded text-xs text-neutral-400 font-sans"
                  >
                    <Tag size={10} className="text-brand" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Link to site */}
            {project.siteUrl && (
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-neutral-900 border border-white/8 hover:border-brand/25 px-5 py-3 rounded text-sm text-white font-sans font-bold transition-colors"
              >
                <ExternalLink size={16} className="text-brand" />
                Odwiedź stronę projektu
              </a>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
          <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
              Potrzebujesz podobnego projektu?
            </h2>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed">
              Umów bezpłatną 30-minutową konsultację i porozmawiajmy o Twoim pomyśle.
            </p>
            <a
              href="https://calendly.com/businesschmiel/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand text-neutral-950 font-bold text-sm px-8 py-3.5 rounded hover:bg-brand/90 transition-colors"
            >
              Umów bezpłatną konsultację
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

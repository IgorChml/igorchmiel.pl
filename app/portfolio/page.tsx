import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PROJECTS_DATA } from '../../src/data';

export const metadata: Metadata = {
  title: 'Portfolio — Realizacje i Case Study | Igor Chmiel',
  description:
    'Zobacz moje realizacje: sklepy internetowe, strony firmowe, aplikacje webowe i kampanie marketingowe dla firm B2B. Case study z wynikami.',
  alternates: {
    canonical: 'https://igorchmiel.pl/portfolio',
  },
  openGraph: {
    title: 'Portfolio — Realizacje i Case Study | Igor Chmiel',
    description:
      'Sklepy internetowe, strony firmowe, aplikacje webowe i kampanie marketingowe. Case study z wynikami.',
    url: 'https://igorchmiel.pl/portfolio',
    type: 'website',
    locale: 'pl_PL',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function PortfolioPage() {
  return (
    <main className="bg-neutral-950 text-white">
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs sm:text-sm text-brand font-semibold uppercase tracking-wider">
              Portfolio
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight">
              Moje realizacje
            </h1>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed max-w-2xl mx-auto">
              Wybrane projekty z zakresu web developmentu, e-commerce i marketingu B2B.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS_DATA.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.id}`}
                className="group bg-neutral-900 border border-white/8 rounded overflow-hidden hover:border-brand/25 transition-all duration-300"
              >
                <div
                  className={`h-40 bg-gradient-to-br ${project.thumbnailGradient} flex items-center justify-center`}
                >
                  <span className="text-white/30 text-xs font-mono">{project.categoryLabel}</span>
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
                  <h2 className="text-sm font-sans font-bold text-white group-hover:text-brand transition-colors">
                    {project.title}
                  </h2>
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
      </section>
    </main>
  );
}

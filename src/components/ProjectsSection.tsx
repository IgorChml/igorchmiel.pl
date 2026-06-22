'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

export default function ProjectsSection() {
  const { lang } = useLang();
  const tr = useTranslations(lang);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const featuredProjects = PROJECTS_DATA.slice(0, 2);

  return (
    <>
      <section id="projects" className="py-24 bg-neutral-950 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600">{tr.projects.sectionTag}</span>
              <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
                {tr.projects.sectionTitle}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-xl font-sans leading-relaxed">
                {tr.projects.sectionDesc}
              </p>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 shrink-0 px-5 py-2.5 rounded text-xs font-sans font-bold border border-white/8 bg-white/4 text-neutral-300 hover:border-brand/30 hover:text-brand transition-all hover:scale-105 active:scale-95 duration-150"
            >
              {tr.projects.seeAll}
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" id="projects-grid">
            {featuredProjects.map(proj => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onSelect={(p) => setActiveProject(p)}
              />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3 rounded text-sm font-sans font-bold bg-brand text-neutral-950 hover:bg-brand/90 transition-all hover:scale-105 active:scale-95 duration-150 shadow-md shadow-brand/20"
            >
              {tr.projects.seeAll}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}

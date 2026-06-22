'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

export default function ProjectsSection() {
  const { lang } = useLang();
  const tr = useTranslations(lang);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ecommerce' | 'services' | 'portfolio' | 'dev'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

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

            <div className="flex flex-wrap gap-2 pt-2 lg:pt-0" id="project-filters">
              {[
                { id: 'all', label: tr.projects.filterAll },
                { id: 'dev', label: tr.projects.filterDev },
                { id: 'ecommerce', label: tr.projects.filterEcommerce },
                { id: 'services', label: tr.projects.filterServices },
                { id: 'portfolio', label: tr.projects.filterPortfolio },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-4 py-2 rounded text-xs font-sans font-bold border transition-all hover:scale-105 active:scale-95 duration-150 cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-brand text-neutral-950 border-brand shadow-md shadow-brand/20'
                      : 'bg-white/4 text-neutral-400 border-white/8 hover:border-brand/30 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" id="projects-grid">
            {filteredProjects.map(proj => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onSelect={(p) => setActiveProject(p)}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-neutral-900 rounded border border-dashed border-white/10 text-neutral-500 text-sm font-sans">
              {tr.projects.empty}
            </div>
          )}
        </div>
      </section>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}

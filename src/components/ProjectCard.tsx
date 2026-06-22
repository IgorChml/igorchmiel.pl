'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Image } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  key?: string;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-900 border border-white/8 rounded overflow-hidden hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col h-full group"
      id={`project-card-${project.id}`}
    >
      {/* Thumbnail */}
      <div
        onClick={() => onSelect(project)}
        className="relative h-60 w-full overflow-hidden cursor-pointer select-none border-b border-white/6"
      >
        {project.thumbnailImage ? (
          <img
            src={project.thumbnailImage}
            alt={project.title}
            loading="lazy"
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} flex flex-col justify-between p-6`}>
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top badges */}
            <div className="flex justify-between items-start relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-200 bg-black/40 backdrop-blur-xs border border-white/10 px-2.5 py-1 rounded uppercase">
                {project.categoryLabel}
              </span>
              <span className="text-[10px] font-mono text-white/60 bg-black/30 px-2 py-0.5 rounded">
                © {project.completedYear}
              </span>
            </div>

            {/* Large decorative client name */}
            <div className="absolute inset-x-0 bottom-12 text-center text-white/8 font-sans font-bold text-5xl tracking-widest uppercase select-none group-hover:scale-105 transition-transform duration-500 pointer-events-none">
              {project.client}
            </div>

            {/* Bottom indicator */}
            <div className="flex items-center space-x-2 text-white/70 font-mono text-[9px] z-10 relative">
              <div className="bg-white/10 group-hover:bg-brand group-hover:text-neutral-950 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200">
                <Image size={10} />
              </div>
              <span className="group-hover:text-white/90 transition-colors uppercase tracking-wider font-bold">
                Kliknij, aby zobaczyć szczegóły
              </span>
            </div>
          </div>
        )}

        {/* Hover border highlight */}
        <div className="absolute inset-0 border border-transparent group-hover:border-brand/20 rounded pointer-events-none transition-colors duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-neutral-500 font-bold uppercase tracking-wider text-[9px]">{project.client}</span>
            <span className="text-neutral-500 font-semibold">{project.completedYear} r.</span>
          </div>

          <h3
            onClick={() => onSelect(project)}
            className="text-white hover:text-brand cursor-pointer font-sans font-extrabold text-lg leading-snug tracking-tight transition-colors"
          >
            {project.title}
          </h3>

          <p className="text-neutral-500 font-sans text-xs leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2" id={`project-tags-${project.id}`}>
            {project.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="bg-white/4 border border-white/8 text-neutral-400 font-sans text-[10px] px-2 py-1 rounded transition-colors hover:text-neutral-200"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="bg-white/4 border border-white/8 text-neutral-600 font-sans text-[10px] px-2 py-1 rounded">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/6 mt-6">
          <button
            onClick={() => onSelect(project)}
            className="flex items-center justify-center space-x-1 px-3 py-2.5 bg-brand hover:bg-brand-dark text-neutral-950 font-sans font-bold text-xs rounded transition-all hover:scale-105 active:scale-95 duration-150 cursor-pointer shadow-sm shadow-brand/20"
          >
            <ArrowUpRight size={12} className="mr-1" />
            <span>Szczegóły</span>
          </button>

          <a
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center space-x-1 px-3 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand/30 hover:text-brand text-neutral-300 font-sans font-bold text-xs rounded transition-all hover:scale-105 active:scale-95 duration-150 cursor-pointer"
          >
            <span>Strona</span>
            <ExternalLink size={10} className="shrink-0" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

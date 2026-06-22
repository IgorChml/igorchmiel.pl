'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, X, ExternalLink, Calendar, CheckSquare, Layers, RefreshCw, Image } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const hasVideo = !!(project.localVideo || project.fallbackVideo);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSrc, setVideoSrc] = useState(project.localVideo || project.fallbackVideo);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isErrorFallback, setIsErrorFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoError = () => {
    setVideoSrc(project.fallbackVideo);
    setIsErrorFallback(true);
  };

  useEffect(() => {
    setVideoSrc(project.localVideo || project.fallbackVideo);
    setIsPlaying(true);
    setIsMuted(false);
    setCurrentTime(0);
    setDuration(0);
    setIsErrorFallback(false);
  }, [project]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
      else { videoRef.current.play().catch(() => {}); setIsPlaying(true); }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) videoRef.current.currentTime = time;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" id="theater-modal-overlay">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-5xl bg-neutral-900 border border-white/10 rounded overflow-hidden shadow-2xl flex flex-col lg:flex-row z-10 max-h-[90vh] lg:max-h-[85vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 bg-neutral-800 text-neutral-300 hover:text-white p-2 rounded border border-white/10 hover:border-white/20 hover:scale-110 active:scale-95 transition-all duration-150 cursor-pointer"
            title="Zamknij"
            id="close-modal-btn"
          >
            <X size={18} />
          </button>

          {/* Left: Media (video or image) */}
          <div className="lg:w-3/5 bg-black flex flex-col justify-center relative group min-h-[250px] sm:min-h-[350px] md:min-h-[420px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none z-10" />

            {hasVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  onError={handleVideoError}
                  onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                  onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                  autoPlay
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-contain max-h-[50vh] lg:max-h-full"
                  onClick={togglePlay}
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col space-y-3 z-20 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-3 w-full">
                    <span className="font-mono text-[10px] text-neutral-400 min-w-[28px]">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 accent-brand h-1 bg-white/20 rounded-lg cursor-pointer appearance-none focus:outline-none"
                    />
                    <span className="font-mono text-[10px] text-neutral-400 min-w-[28px]">{formatTime(duration)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button onClick={togglePlay} className="text-white hover:text-brand p-1 rounded transition-all hover:scale-115 active:scale-90 cursor-pointer">
                        {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
                      </button>
                      <button onClick={toggleMute} className="text-white hover:text-brand p-1 rounded transition-all hover:scale-115 active:scale-90 cursor-pointer">
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                      {isErrorFallback && (
                        <span className="text-[9px] font-mono text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded flex items-center">
                          <RefreshCw size={8} className="mr-1 animate-spin" />
                          Tryb Demo
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500">{project.categoryLabel}</div>
                  </div>
                </div>
              </>
            ) : project.thumbnailImage ? (
              <img src={project.thumbnailImage} alt={project.title} loading="lazy" width={800} height={450} className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${project.thumbnailGradient} flex flex-col items-center justify-center gap-4`}>
                <div className="text-white/10 font-sans font-bold text-5xl tracking-widest uppercase select-none text-center px-8">
                  {project.client}
                </div>
                <div className="flex items-center gap-2 text-white/40 font-mono text-xs">
                  <Image size={14} />
                  <span>{project.categoryLabel}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Project Details */}
          <div className="lg:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-neutral-900 border-l border-white/8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-300 bg-white/6 border border-white/10 font-mono font-bold tracking-wider px-2.5 py-1 rounded uppercase text-[10px]">
                  {project.categoryLabel}
                </span>
                <span className="flex items-center text-neutral-500 font-mono bg-white/4 px-2.5 py-1 rounded border border-white/8 text-[10px]">
                  <Calendar size={12} className="mr-1.5 text-neutral-600" />
                  {project.completedYear} Rok
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-sans font-extrabold text-2xl text-white tracking-tight leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-600 font-mono">
                  Klient: <strong className="text-neutral-400 font-bold">{project.client}</strong>
                </p>
              </div>

              <p className="text-neutral-500 font-sans text-xs leading-relaxed">
                {project.detailedDescription || project.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-neutral-300 font-sans font-extrabold text-xs uppercase tracking-wider flex items-center">
                  <CheckSquare size={14} className="text-brand mr-2" />
                  Główne Wdrożenia & Funkcje
                </h4>
                <ul className="space-y-2">
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-xs text-neutral-500 font-sans leading-relaxed">
                      <span className="text-brand mr-2 font-mono shrink-0 select-none">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-neutral-300 font-sans font-extrabold text-xs uppercase tracking-wider flex items-center">
                  <Layers size={14} className="text-brand mr-2" />
                  Struktura Technologiczna
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-white/4 hover:bg-brand/10 text-neutral-400 hover:text-brand border border-white/8 hover:border-brand/20 text-[10px] font-mono px-2.5 py-1 rounded transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/8 mt-8 flex flex-col space-y-3">
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-brand hover:bg-brand-dark text-neutral-950 font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-150 shadow-md shadow-brand/20 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Odwiedź stronę</span>
                <ExternalLink size={12} />
              </a>
              <p className="text-[10px] text-neutral-600 text-center font-sans">
                Strona otwiera się bezpiecznie w nowej karcie przeglądarki.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

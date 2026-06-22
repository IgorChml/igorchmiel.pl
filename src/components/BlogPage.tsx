'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, Clock, BookOpen, Tag, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const { lang } = useLang();
  const tr = useTranslations(lang);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand bg-brand/10 border border-brand/20 px-3 py-1.5 rounded">
          {tr.about.tag}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {tr.about.title}
        </h1>
        <p className="text-sm text-neutral-500 font-sans leading-relaxed">
          {tr.about.subtitle}
        </p>
      </div>

      {posts.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-white/6">
          <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: tr.about.filterAll },
              ...Array.from(
                new Map(posts.map(p => [p.category, p.categoryLabel])).entries()
              ).map(([id, label]) => ({ id, label })),
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded text-xs font-bold transition-all hover:scale-105 active:scale-95 duration-150 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-brand text-neutral-950 shadow-md shadow-brand/20'
                    : 'bg-white/5 text-neutral-400 border border-white/8 hover:border-brand/30 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-600">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tr.about.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 border border-white/8 rounded text-xs bg-neutral-900 text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all font-sans"
            />
          </div>
        </div>
      )}

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="bg-neutral-900 rounded border border-white/8 overflow-hidden hover:border-brand/25 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col cursor-pointer group hover:scale-[1.01] h-full block"
              >
                <div className="h-48 overflow-hidden relative bg-neutral-800 border-b border-white/6">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                      <BookOpen size={32} className="text-neutral-700" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-neutral-950/90 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300 shadow-sm flex items-center gap-1 border border-white/10">
                    <Tag size={10} className="text-brand" />
                    <span>{post.categoryLabel}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="flex items-center space-x-4 text-[10px] font-mono text-neutral-600">
                    <div className="flex items-center">
                      <Calendar size={11} className="mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={11} className="mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <h3 className="text-base font-bold text-neutral-100 group-hover:text-brand transition-colors font-sans leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-sans leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="text-xs font-bold text-brand group-hover:text-white transition-colors flex items-center gap-1 pt-2 border-t border-white/5">
                    <span>{tr.about.readArticle}</span>
                    <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-neutral-900 rounded border border-dashed border-white/10">
          <div className="max-w-sm mx-auto space-y-4">
            <BookOpen size={28} className="mx-auto text-neutral-700" />
            <p className="text-sm font-bold text-white">{tr.about.emptyTitle}</p>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              {tr.about.emptyDesc}
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-4 py-1.5 bg-brand text-neutral-950 rounded text-xs font-bold hover:bg-brand-dark hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
              >
                {tr.about.resetFilters}
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

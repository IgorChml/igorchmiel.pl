import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Clock, ArrowLeft, BookOpen, Tag, ChevronRight, Loader2 } from 'lucide-react';
import { fetchBlogPosts } from '../lib/contentful';
import { BLOG_POSTS_DATA } from '../data';
import { BlogPost } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

function renderContent(content: string) {
  return content.split('\n\n').map((paragraph, index) => {
    const trimmed = paragraph.trim();
    if (trimmed.startsWith('###')) {
      return (
        <h3 key={index} className="text-base sm:text-lg font-extrabold text-white pt-3 pb-1 font-sans border-b border-white/8">
          {trimmed.replace('###', '').trim()}
        </h3>
      );
    }
    if (trimmed.startsWith('####')) {
      return (
        <h4 key={index} className="text-sm sm:text-base font-bold text-white pt-2 pb-1 font-sans">
          {trimmed.replace('####', '').trim()}
        </h4>
      );
    }
    if (trimmed.startsWith('-') || (trimmed.startsWith('*') && !trimmed.endsWith('*'))) {
      const items = trimmed.split('\n').map(item => item.replace(/^[\s\-\*]+/, '').trim());
      return (
        <ul key={index} className="list-disc pl-5 space-y-2 text-neutral-400 text-xs sm:text-sm">
          {items.map((it, i) => (
            <li key={i}>
              {it.includes('**') ? (
                <span>{it.split('**').map((p, pi) => pi % 2 === 1 ? <strong key={pi} className="text-neutral-100 font-bold">{p}</strong> : p)}</span>
              ) : it}
            </li>
          ))}
        </ul>
      );
    }
    if (trimmed.startsWith('1.')) {
      const items = trimmed.split(/\n\d+\.\s+/).filter(Boolean);
      return (
        <ol key={index} className="list-decimal pl-5 space-y-2 text-neutral-400 text-xs sm:text-sm">
          {items.map((it, i) => (
            <li key={i}>
              {it.includes('**') ? (
                <span>{it.split('**').map((p, pi) => pi % 2 === 1 ? <strong key={pi} className="text-neutral-100 font-bold">{p}</strong> : p)}</span>
              ) : it}
            </li>
          ))}
        </ol>
      );
    }
    if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
      return (
        <p key={index} className="italic text-neutral-500 pl-4 border-l-2 border-brand py-1 bg-white/3 rounded-r text-xs sm:text-sm">
          {trimmed.replace(/^\*|\*$/g, '').trim()}
        </p>
      );
    }
    if (trimmed.includes('**')) {
      const parts = trimmed.split('**');
      return (
        <p key={index} className="font-sans leading-relaxed text-neutral-400 text-xs sm:text-sm">
          {parts.map((p, pi) => pi % 2 === 1 ? <strong key={pi} className="text-neutral-100 font-bold">{p}</strong> : p)}
        </p>
      );
    }
    return (
      <p key={index} className="font-sans leading-relaxed text-neutral-400 text-xs sm:text-sm">
        {trimmed}
      </p>
    );
  });
}

export default function About() {
  const { lang } = useLang();
  const tr = useTranslations(lang);

  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS_DATA);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchBlogPosts()
      .then((fetched) => {
        if (fetched.length > 0) setPosts(fetched);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <section id="about" className="py-24 bg-[#0f0f0f] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand/3 rounded-full blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          {!activePost ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3 py-1.5 rounded font-mono text-xs text-brand">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">{tr.about.tag}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight leading-tight">
                  {tr.about.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
                  {tr.about.subtitle}
                </p>
              </div>

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
                      onClick={() => setSelectedCategory(cat.id as any)}
                      className={`px-4 py-2 rounded text-xs font-sans font-bold transition-all hover:scale-105 active:scale-95 duration-150 whitespace-nowrap cursor-pointer ${
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

              {loading ? (
                <div className="flex items-center justify-center py-24 text-neutral-600">
                  <Loader2 size={20} className="animate-spin mr-2" />
                  <span className="text-xs font-mono">{tr.about.loading}</span>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, idx) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      onClick={() => {
                        setActivePost(post);
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-neutral-900 rounded border border-white/8 overflow-hidden hover:border-brand/25 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col cursor-pointer group hover:scale-[1.01]"
                    >
                      <div className="h-48 overflow-hidden relative bg-neutral-800 border-b border-white/6">
                        {post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt={post.title}
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
                          <h3 className="text-sm sm:text-base font-bold text-neutral-100 group-hover:text-brand transition-colors font-sans leading-snug line-clamp-2">
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
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-neutral-900 rounded border border-dashed border-white/10">
                  <div className="max-w-xs mx-auto space-y-4">
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
          ) : (
            <motion.div
              key="reader-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <button
                onClick={() => {
                  setActivePost(null);
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 text-neutral-500 hover:text-brand font-sans font-bold text-xs hover:-translate-x-0.5 transition-all duration-150 py-2 cursor-pointer group"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                <span>{tr.about.backToList}</span>
              </button>

              <article className="bg-neutral-900 rounded border border-white/8 overflow-hidden p-6 sm:p-10 space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs font-mono text-neutral-500">
                  <span className="bg-brand/10 text-brand px-2.5 py-1 rounded font-bold text-[10px] uppercase">
                    {activePost.categoryLabel}
                  </span>
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1.5" />
                    <span>{activePost.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1.5" />
                    <span>{activePost.readTime}</span>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {activePost.title}
                </h1>

                {activePost.imageUrl && (
                  <div className="h-48 sm:h-80 rounded overflow-hidden relative bg-neutral-800 max-h-[360px]">
                    <img
                      src={activePost.imageUrl}
                      alt={activePost.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-5 pt-4 border-t border-white/6">
                  {renderContent(activePost.content)}
                </div>

                <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center gap-4 bg-white/3 p-5 rounded-md">
                  <div className="w-10 h-10 rounded-full bg-brand/10 text-brand font-mono font-bold text-sm flex items-center justify-center border border-brand/20 shrink-0 select-none">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

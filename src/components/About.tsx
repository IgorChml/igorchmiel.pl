import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, BookOpen, Tag, ChevronRight, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchBlogPosts } from '../lib/contentful';
import { BLOG_POSTS_DATA } from '../data';
import { BlogPost } from '../types';
import { useLang } from '../contexts/LanguageContext';
import { useTranslations } from '../lib/i18n';

export default function About() {
  const { lang } = useLang();
  const tr = useTranslations(lang);

  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then((fetched) => {
        if (fetched.length > 0) setPosts(fetched);
      })
      .finally(() => setLoading(false));
  }, []);

  const latestPosts = posts.slice(0, 4);

  return (
    <section id="about" className="py-24 bg-[#0f0f0f] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand/3 rounded-full blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-3 py-1.5 rounded font-mono text-xs text-brand">
              <span className="font-semibold uppercase tracking-wider text-[10px]">{tr.about.tag}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight leading-tight">
              {tr.about.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed max-w-xl">
              {tr.about.subtitle}
            </p>
          </div>

          {latestPosts.length > 0 && (
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-brand/30 hover:bg-white/8 rounded text-xs font-sans font-bold text-neutral-300 hover:text-white transition-all duration-200 group shrink-0"
            >
              <span>{tr.about.filterAll}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-neutral-600">
            <Loader2 size={20} className="animate-spin mr-2" />
            <span className="text-xs font-mono">{tr.about.loading}</span>
          </div>
        ) : latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="bg-neutral-900 rounded border border-white/8 overflow-hidden hover:border-brand/25 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col cursor-pointer group hover:scale-[1.01] h-full block"
                >
                  <div className="h-40 overflow-hidden relative bg-neutral-800 border-b border-white/6">
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
                        <BookOpen size={28} className="text-neutral-700" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-neutral-950/90 backdrop-blur px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-300 shadow-sm flex items-center gap-1 border border-white/10">
                      <Tag size={9} className="text-brand" />
                      <span>{post.categoryLabel}</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col space-y-3">
                    <div className="flex items-center space-x-3 text-[9px] font-mono text-neutral-600">
                      <div className="flex items-center">
                        <Calendar size={10} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={10} className="mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-neutral-100 group-hover:text-brand transition-colors font-sans leading-snug line-clamp-2 flex-1">
                      {post.title}
                    </h3>

                    <div className="text-[11px] font-bold text-brand group-hover:text-white transition-colors flex items-center gap-1 pt-2 border-t border-white/5">
                      <span>{tr.about.readArticle}</span>
                      <ChevronRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

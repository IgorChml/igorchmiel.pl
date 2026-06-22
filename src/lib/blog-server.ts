import 'server-only';
import { parseEntries } from './contentful';
import { BlogPost } from '../types';

// Server-side fetch — talks to the Contentful CDN directly so blog content
// is rendered into the HTML at build/request time (SSG + ISR), making it
// crawlable by Googlebot, GPTBot, ClaudeBot, PerplexityBot, etc.
export async function getBlogPosts(): Promise<BlogPost[]> {
  const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID || '';
  const token = process.env.VITE_CONTENTFUL_ACCESS_TOKEN || '';

  if (!spaceId || !token) return [];

  try {
    const cfUrl =
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries` +
      `?content_type=blogPage&access_token=${token}&include=1&order=-sys.createdAt`;

    const res = await fetch(cfUrl, { next: { revalidate: 300 } });
    if (!res.ok) return [];

    const data = await res.json();
    return parseEntries(data);
  } catch (err) {
    console.error('getBlogPosts error:', err);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug || p.id === slug) ?? null;
}

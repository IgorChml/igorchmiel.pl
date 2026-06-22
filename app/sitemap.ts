import type { MetadataRoute } from 'next';
import { PROJECTS_DATA } from '../src/data';
import { getBlogPosts } from '../src/lib/blog-server';

export const revalidate = 300;

const baseUrl = 'https://igorchmiel.pl';

// Distinct, content-based last-modified dates so the sitemap reflects real
// freshness instead of a single auto-generated timestamp on every URL.
const SERVICE_PAGES_UPDATED = new Date('2026-06-22');
const PORTFOLIO_INDEX_UPDATED = new Date('2026-06-22');
const STATIC_UPDATED = new Date('2026-06-01');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const latestPostDate =
    posts.length > 0 && posts[0].isoDate ? new Date(posts[0].isoDate) : SERVICE_PAGES_UPDATED;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: SERVICE_PAGES_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/o-mnie`, lastModified: STATIC_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: latestPostDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: PORTFOLIO_INDEX_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi/content-marketing`, lastModified: SERVICE_PAGES_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi/marketing-b2b`, lastModified: SERVICE_PAGES_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi/seo`, lastModified: SERVICE_PAGES_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi/web-development`, lastModified: SERVICE_PAGES_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/polityka-prywatnosci`, lastModified: STATIC_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const portfolioPages: MetadataRoute.Sitemap = PROJECTS_DATA.map((project) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: new Date(`${project.completedYear}-12-31`),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.isoDate ? new Date(post.isoDate) : latestPostDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...portfolioPages, ...blogPages];
}

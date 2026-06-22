import type { MetadataRoute } from 'next';
import { PROJECTS_DATA } from '../src/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://igorchmiel.pl';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi/content-marketing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi/marketing-b2b`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi/seo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi/web-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/polityka-prywatnosci`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const portfolioPages: MetadataRoute.Sitemap = PROJECTS_DATA.map((project) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...portfolioPages];
}

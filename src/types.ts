/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'ecommerce' | 'services' | 'portfolio' | 'dev';
  categoryLabel: string;
  description: string;
  detailedDescription?: string;
  tags: string[];
  localVideo: string;
  fallbackVideo: string;
  thumbnailImage?: string;
  siteUrl: string;
  features: string[];
  thumbnailGradient: string;
  completedYear: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  categoryLabel: string;
  readTime: string;
  date: string;
  imageUrl: string;
}


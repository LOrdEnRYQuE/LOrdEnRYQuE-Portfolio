import { MetadataRoute } from 'next';
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://lordenryque.com';

  // Fetch dynamic blog posts
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true }
  });

  const blogPages = posts.map((post: { slug: string; updatedAt: Date }) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Static routes
  const staticRoutes = [
    { url: '', priority: 1, frequency: 'weekly' as const },
    { url: '/projects', priority: 0.9, frequency: 'weekly' as const },
    { url: '/blog', priority: 0.8, frequency: 'weekly' as const },
    { url: '/mvp', priority: 0.8, frequency: 'monthly' as const },
  ].map(route => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.frequency,
    priority: route.priority,
  }));

  return [...staticRoutes, ...blogPages];
}

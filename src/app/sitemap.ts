import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getPackages, getDestinations, getCars, getBlogPosts } from "@/server/repositories";
import { legalDocs } from "@/data/legal";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const [allPackages, allDestinations, allCars, allPosts] = await Promise.all([
    getPackages(),
    getDestinations(),
    getCars(),
    getBlogPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1, lastModified: now },
    { url: `${base}/packages`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${base}/destinations`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${base}/cars`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7, lastModified: now },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
  ];

  const packageRoutes = allPackages.map((p) => ({
    url: `${base}/packages/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: new Date(p.createdAt),
  }));

  const destinationRoutes = allDestinations.map((d) => ({
    url: `${base}/destinations/${d.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: now,
  }));

  const carRoutes = allCars.map((c) => ({
    url: `${base}/cars/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: now,
  }));

  const blogRoutes = allPosts.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: new Date(b.publishedAt),
  }));

  const legalRoutes = Object.values(legalDocs).map((d) => ({
    url: `${base}/${d.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.3,
    lastModified: new Date(d.updated),
  }));

  return [
    ...staticRoutes,
    ...packageRoutes,
    ...destinationRoutes,
    ...carRoutes,
    ...blogRoutes,
    ...legalRoutes,
  ];
}

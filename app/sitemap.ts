import type { MetadataRoute } from 'next';
import { getProductHandles, getArticleHandles, getCollectionHandles, getArticleSummaries } from '@/lib/shopify';
import { SITE_URL } from '@/lib/constants';
import { LANDING_PAGES } from '@/data/landing-pages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/collections/all`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/collections/youtube`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/collections/tiktok`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/collections/instagram`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/affiliate`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/llms.txt`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/policies/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/policies/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/policies/refund-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const handles = await getProductHandles();
    productPages = handles.map((handle) => ({
      url: `${SITE_URL}/products/${handle}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  } catch {}

  const landingPages: MetadataRoute.Sitemap = LANDING_PAGES.map((page) => ({
    url: `${SITE_URL}/buy/${page.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = [
    'top-niches',
    'how-to-make-money-on-youtube',
    'how-to-make-money-on-tiktok',
  ].map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articleHandles = await getArticleHandles();
    articlePages = articleHandles.map(({ blogHandle, articleHandle }) => ({
      url: `${SITE_URL}/blog/${blogHandle}/${articleHandle}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {}

  let collectionPages: MetadataRoute.Sitemap = [];
  try {
    const collectionHandles = await getCollectionHandles();
    const staticCollections = ['all', 'youtube', 'tiktok', 'instagram'];
    collectionPages = collectionHandles
      .filter(h => !staticCollections.includes(h))
      .map((handle) => ({
        url: `${SITE_URL}/collections/${handle}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
  } catch {}

  let topicPages: MetadataRoute.Sitemap = [];
  try {
    const summaries = await getArticleSummaries();
    const tagCounts = new Map<string, number>();
    for (const article of summaries) {
      for (const tag of article.tags) {
        const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (slug) tagCounts.set(slug, (tagCounts.get(slug) || 0) + 1);
      }
    }
    topicPages = Array.from(tagCounts.entries())
      .filter(([, count]) => count >= 2)
      .map(([tag]) => ({
        url: `${SITE_URL}/blog/topic/${tag}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
  } catch {}

  return [...staticPages, ...productPages, ...landingPages, ...guidePages, ...articlePages, ...topicPages, ...collectionPages];
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { getArticleListing } from '@/lib/shopify';
import { breadcrumbJsonLd } from '@/lib/seo';
import { ArrowRight, Calendar } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog — Tips & Guides for Creators',
  description: `Tips, guides, and insights on monetizing YouTube and TikTok from the ${SITE_NAME} team.`,
  alternates: { canonical: `${SITE_URL}/blog` },
};

const GUIDE_POSTS = [
  {
    slug: 'how-to-make-money-on-youtube',
    title: 'How to Make Money on YouTube in 2025: Complete Guide',
    excerpt: 'Everything you need to know about YouTube monetization requirements, revenue streams, and strategies for maximizing your earnings.',
    date: '2025-01-15',
    category: 'YouTube',
    href: '/guides/how-to-make-money-on-youtube',
  },
  {
    slug: 'how-to-make-money-on-tiktok',
    title: 'How to Make Money on TikTok in 2025: Complete Guide',
    excerpt: "A deep dive into TikTok's Creativity Program, how much creators are earning, and tips to maximize your RPM.",
    date: '2025-01-10',
    category: 'TikTok',
    href: '/guides/how-to-make-money-on-tiktok',
  },
  {
    slug: 'top-niches',
    title: 'Top 50 YouTube & TikTok Niches for 2025',
    excerpt: 'Discover the most profitable niches for YouTube and TikTok — data-driven picks based on RPM, competition, and growth.',
    date: '2025-01-05',
    category: 'Niche Research',
    href: '/guides/top-niches',
  },
];

export default async function BlogPage() {
  const articles = await getArticleListing(500);

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <nav className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center gap-1.5">
          <li><a href="/" className="hover:text-foreground">Home</a></li>
          <li>/</li>
          <li className="text-foreground font-medium">Blog</li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-muted-foreground mb-10">Tips, guides, and insights on monetizing your social media accounts.</p>

      {/* Featured Guides */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Guides</h2>
        <div className="space-y-4">
          {GUIDE_POSTS.map((post) => (
            <article key={post.slug} className="border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{post.category}</span>
                <time className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                <Link href={post.href} className="group-hover:text-primary transition-colors">{post.title}</Link>
              </h3>
              <p className="text-muted-foreground text-sm mb-3">{post.excerpt}</p>
              <Link href={post.href} className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Guide <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Shopify Blog Articles */}
      {articles.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <article key={article.id} className="border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all group">
                {article.image && (
                  <div className="relative aspect-video">
                    <Image
                      src={article.image.url}
                      alt={article.image.altText || article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <time>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                    {article.blog.title && <span className="text-primary font-medium">· {article.blog.title}</span>}
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${article.blog.handle}/${article.handle}`}>{article.title}</Link>
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Topic Hub Links */}
      {articles.length > 0 && (() => {
        const tagCounts = new Map<string, { display: string; count: number }>();
        for (const article of articles) {
          for (const tag of article.tags) {
            const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            if (slug && !tagCounts.has(slug)) {
              tagCounts.set(slug, { display: tag, count: 0 });
            }
            if (slug) tagCounts.get(slug)!.count++;
          }
        }
        const topTags = Array.from(tagCounts.entries())
          .filter(([, v]) => v.count >= 2)
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, 20);

        return topTags.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Browse by Topic</h2>
            <div className="flex flex-wrap gap-2">
              {topTags.map(([slug, { display, count }]) => (
                <Link
                  key={slug}
                  href={`/blog/topic/${slug}`}
                  className="text-sm bg-secondary hover:bg-secondary/80 text-foreground px-3 py-1.5 rounded-full transition-colors"
                >
                  {display} ({count})
                </Link>
              ))}
            </div>
          </section>
        ) : null;
      })()}

      <div className="mt-12 bg-secondary rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Want More Guides?</h2>
        <p className="text-muted-foreground text-sm mb-4">Check out our complete resource library with guides on niches, monetization strategies, and growth tips.</p>
        <Link href="/guides" className="text-primary font-medium hover:underline">Browse All Guides →</Link>
      </div>
    </div>
  );
}

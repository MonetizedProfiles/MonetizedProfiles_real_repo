import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getArticleListing, getArticleSummaries } from '@/lib/shopify';
import { breadcrumbJsonLd, collectionPageJsonLd } from '@/lib/seo';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { Calendar, ArrowLeft } from 'lucide-react';

export const revalidate = 3600;

function slugToTitle(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export async function generateStaticParams() {
  try {
    const summaries = await getArticleSummaries();
    const tagCounts = new Map<string, number>();
    for (const article of summaries) {
      for (const tag of article.tags) {
        const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (slug) tagCounts.set(slug, (tagCounts.get(slug) || 0) + 1);
      }
    }
    return Array.from(tagCounts.entries())
      .filter(([, count]) => count >= 2)
      .map(([tag]) => ({ tag }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const title = slugToTitle(tag);

  return {
    title: `${title} — Articles & Guides`,
    description: `Read our latest articles about ${title.toLowerCase()}. Tips, strategies, and insights for creators and entrepreneurs.`,
    alternates: { canonical: `${SITE_URL}/blog/topic/${tag}` },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const title = slugToTitle(tag);

  const allArticles = await getArticleListing(500);
  const articles = allArticles.filter(a =>
    a.tags.some(t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === tag)
  );

  const allTags = new Map<string, number>();
  for (const article of allArticles) {
    for (const t of article.tags) {
      const slug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (slug && slug !== tag) allTags.set(slug, (allTags.get(slug) || 0) + 1);
    }
  }
  const relatedTags = Array.from(allTags.entries())
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: title, url: `${SITE_URL}/blog/topic/${tag}` },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd({
          name: `${title} Articles`,
          description: `Articles and guides about ${title.toLowerCase()} for creators and entrepreneurs.`,
          url: `${SITE_URL}/blog/topic/${tag}`,
          items: articles.map((a, i) => ({
            name: a.title,
            url: `${SITE_URL}/blog/${a.blog.handle}/${a.handle}`,
            image: a.image?.url,
            position: i + 1,
          })),
        })) }}
      />

      <nav className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center gap-1.5">
          <li><a href="/" className="hover:text-foreground">Home</a></li>
          <li>/</li>
          <li><a href="/blog" className="hover:text-foreground">Blog</a></li>
          <li>/</li>
          <li className="text-foreground font-medium">{title}</li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
      <p className="text-muted-foreground mb-8">{articles.length} article{articles.length !== 1 ? 's' : ''} about {title.toLowerCase()}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
              </div>
              <h2 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                <Link href={`/blog/${article.blog.handle}/${article.handle}`}>{article.title}</Link>
              </h2>
              {article.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
              )}
            </div>
          </article>
        ))}
      </div>

      {relatedTags.length > 0 && (
        <section className="border-t border-border pt-8">
          <h2 className="text-lg font-semibold mb-4">Related Topics</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTags.map(([slug, count]) => (
              <Link
                key={slug}
                href={`/blog/topic/${slug}`}
                className="text-sm bg-secondary hover:bg-secondary/80 text-foreground px-3 py-1.5 rounded-full transition-colors"
              >
                {slugToTitle(slug)} ({count})
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          All Articles
        </Link>
      </div>
    </div>
  );
}

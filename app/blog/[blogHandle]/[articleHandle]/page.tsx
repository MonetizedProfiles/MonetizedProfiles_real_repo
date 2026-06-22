import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getArticleByHandle, getArticleHandles } from '@/lib/shopify';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { SITE_NAME, SITE_URL, PRODUCT_HANDLES } from '@/lib/constants';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const handles = await getArticleHandles();
    return handles.map(({ blogHandle, articleHandle }) => ({ blogHandle, articleHandle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ blogHandle: string; articleHandle: string }> }): Promise<Metadata> {
  const { blogHandle, articleHandle } = await params;
  const article = await getArticleByHandle(blogHandle, articleHandle);
  if (!article) return {};

  const title = article.seo.title || article.title;
  const description = article.seo.description || article.excerpt || `${article.title} — Tips and insights from ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${blogHandle}/${articleHandle}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${SITE_URL}/blog/${blogHandle}/${articleHandle}`,
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      ...(article.image ? { images: [{ url: article.image.url, alt: article.image.altText || article.title }] } : {}),
    },
  };
}

const RELATED_PRODUCTS: Record<string, string[]> = {
  youtube: ['youtube', 'aged-youtube'],
  tiktok: ['monetized-tiktok-account', 'tiktok-shop-affiliate-account'],
  'social-media': ['youtube', 'monetized-tiktok-account', 'tiktok-shop-affiliate-account'],
};

function getRelatedProductHandles(tags: string[]): string[] {
  const lowerTags = tags.map(t => t.toLowerCase());
  for (const [keyword, handles] of Object.entries(RELATED_PRODUCTS)) {
    if (lowerTags.some(t => t.includes(keyword))) return handles;
  }
  return PRODUCT_HANDLES.slice(0, 3) as string[];
}

export default async function ArticlePage({ params }: { params: Promise<{ blogHandle: string; articleHandle: string }> }) {
  const { blogHandle, articleHandle } = await params;
  const article = await getArticleByHandle(blogHandle, articleHandle);
  if (!article) notFound();

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: article.title, url: `${SITE_URL}/blog/${blogHandle}/${articleHandle}` },
  ];

  const relatedHandles = getRelatedProductHandles(article.tags);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><a href="/" className="hover:text-foreground">Home</a></li>
            <li>/</li>
            <li><a href="/blog" className="hover:text-foreground">Blog</a></li>
            <li>/</li>
            <li className="text-foreground font-medium line-clamp-1">{article.title}</li>
          </ol>
        </nav>

        {article.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
            <Image
              src={article.image.url}
              alt={article.image.altText || article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {article.author.name}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.slice(0, 8).map(tag => {
              const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
              return (
                <Link key={tag} href={`/blog/topic/${slug}`} className="text-xs bg-secondary hover:bg-secondary/80 text-muted-foreground px-2.5 py-1 rounded-full transition-colors">
                  {tag}
                </Link>
              );
            })}
          </div>
        )}

        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <hr className="my-8" />

        <div className="bg-secondary rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">Ready to Start Earning?</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Skip the grind — get a pre-monetized account and start earning revenue immediately.
          </p>
          <div className="flex flex-wrap gap-3">
            {relatedHandles.map(handle => (
              <Link
                key={handle}
                href={`/products/${handle}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                View {handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} →
              </Link>
            ))}
          </div>
        </div>

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </article>
    </>
  );
}

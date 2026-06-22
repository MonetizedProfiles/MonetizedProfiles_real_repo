import type { Metadata } from 'next';
import { getProducts, getCollectionHandles } from '@/lib/shopify';
import { ProductCard } from '@/components/product-card';
import { breadcrumbJsonLd, collectionPageJsonLd } from '@/lib/seo';
import { SITE_URL, SITE_NAME, PRODUCT_CATEGORIES } from '@/lib/constants';

export const revalidate = 300;

const CATEGORY_META: Record<string, { title: string; description: string; filterHandles?: string[] }> = {
  all: {
    title: 'All Products',
    description: 'Browse all monetized social media accounts. YouTube channels, TikTok accounts, and more. Instant delivery, organic growth.',
  },
  youtube: {
    title: 'Monetized YouTube Channels',
    description: 'Buy monetized YouTube channels with 1,000+ subscribers and 4,000+ watch hours. YouTube Partner Program approved. Instant delivery.',
    filterHandles: [...PRODUCT_CATEGORIES.youtube.handles],
  },
  tiktok: {
    title: 'Monetized TikTok Accounts',
    description: 'Buy monetized TikTok accounts with 10,000+ followers. Creativity Program and Shop Affiliate accounts available. Instant delivery.',
    filterHandles: [...PRODUCT_CATEGORIES.tiktok.handles],
  },
  instagram: {
    title: 'Aged Instagram Accounts',
    description: 'Buy aged Instagram accounts with established history. Perfect for brand building and fast growth.',
    filterHandles: [...PRODUCT_CATEGORIES.instagram.handles],
  },
};

const STATIC_HANDLES = ['all', 'youtube', 'tiktok', 'instagram'];

export async function generateStaticParams() {
  const params = STATIC_HANDLES.map(handle => ({ handle }));

  try {
    const shopifyHandles = await getCollectionHandles();
    for (const h of shopifyHandles) {
      if (!STATIC_HANDLES.includes(h)) {
        params.push({ handle: h });
      }
    }
  } catch {}

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const meta = CATEGORY_META[handle];
  const title = meta?.title || handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const description = meta?.description || `Browse our ${title.toLowerCase()} collection. All accounts are organically grown and fully monetized. Instant delivery.`;

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: { canonical: `${SITE_URL}/collections/${handle}` },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const meta = CATEGORY_META[handle];

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts(20);
  } catch {}

  if (meta?.filterHandles) {
    products = products.filter(p => meta.filterHandles!.includes(p.handle));
  }

  const title = meta?.title || handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: title, url: `${SITE_URL}/collections/${handle}` },
  ];

  const collectionItems = products.map((p, i) => ({
    name: p.title,
    url: `${SITE_URL}/products/${p.handle}`,
    image: p.images[0]?.url,
    position: i + 1,
  }));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd({
          name: title,
          description: meta?.description || `Browse our ${title.toLowerCase()} collection.`,
          url: `${SITE_URL}/collections/${handle}`,
          items: collectionItems,
        })) }}
      />

      <nav className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center gap-1.5">
          <li><a href="/" className="hover:text-foreground">Home</a></li>
          <li>/</li>
          <li className="text-foreground font-medium">{title}</li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
      {meta?.description && (
        <p className="text-muted-foreground mb-8 max-w-2xl">{meta.description}</p>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Products loading — check back shortly.</p>
      )}

      {handle !== 'all' && (
        <div className="mt-12 text-center">
          <a href="/collections/all" className="text-primary font-medium hover:underline">View All Products →</a>
        </div>
      )}

      <div className="mt-12 bg-secondary rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Not Sure Which Account Is Right for You?</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Our team can help you choose the perfect account for your goals. All purchases include a 30-day money-back guarantee.
        </p>
        <a href="/contact" className="text-primary font-medium hover:underline">Talk to Our Team →</a>
      </div>
    </div>
  );
}

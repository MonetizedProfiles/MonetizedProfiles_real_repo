import type { Metadata } from 'next';
import { getProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/product-card';
import { breadcrumbJsonLd } from '@/lib/seo';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const revalidate = 300;

export function generateStaticParams() {
  return [{ handle: 'all' }];
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const title = handle === 'all' ? 'All Products' : handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: `${title} — ${SITE_NAME}`,
    description: `Browse our ${title.toLowerCase()} collection. All accounts are organically grown and fully monetized. Instant delivery.`,
    alternates: { canonical: `${SITE_URL}/collections/${handle}` },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts(20);
  } catch {
    products = [];
  }

  const title = handle === 'all' ? 'All Products' : handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: title, url: `${SITE_URL}/collections/${handle}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <nav className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center gap-1.5">
          <li><a href="/" className="hover:text-foreground">Home</a></li>
          <li>/</li>
          <li className="text-foreground font-medium">{title}</li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Products loading — check back shortly.</p>
      )}
    </div>
  );
}

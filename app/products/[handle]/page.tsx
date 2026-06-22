import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getProductByHandle, getProductHandles, formatPrice } from '@/lib/shopify';
import { productJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { SITE_NAME, SITE_URL, TRUST_STATS } from '@/lib/constants';
import { AddToCart } from '@/components/add-to-cart';
import { ProductReviews } from '@/components/product-reviews';
import { TrustSignals } from '@/components/trust-signals';
import { ProductFaq } from '@/components/product-faq';
import { Shield, Truck, Award, CheckCircle } from 'lucide-react';

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const handles = await getProductHandles();
    return handles.map((handle) => ({ handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return {};

  const title = product.seo.title || product.title;
  const description = product.seo.description || `Buy ${product.title} — ${product.description.slice(0, 150)}`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/products/${handle}` },
    openGraph: {
      type: 'website',
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/products/${handle}`,
      images: product.images.map((img) => ({ url: img.url, width: img.width || 1200, height: img.height || 630, alt: img.altText || product.title })),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const reviewStats = { count: TRUST_STATS.totalReviews, average: TRUST_STATS.averageRating };

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/collections/all` },
    { name: product.title, url: `${SITE_URL}/products/${handle}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product, reviewStats)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><a href="/" className="hover:text-foreground">Home</a></li>
            <li>/</li>
            <li><a href="/collections/all" className="hover:text-foreground">Products</a></li>
            <li>/</li>
            <li className="text-foreground font-medium">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            {product.images.length > 0 ? (
              <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-xl bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
                    <Image
                      src={img.url}
                      alt={img.altText || `${product.title} ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`h-5 w-5 ${i < Math.round(reviewStats.average) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M10 1l2.39 6.56H19l-5.3 4.03L15.91 19 10 15.27 4.09 19l2.21-7.41L1 7.56h6.61z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{reviewStats.average}/5 ({reviewStats.count} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
              </span>
              {product.variants[0]?.compareAtPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.variants[0].compareAtPrice.amount)}
                </span>
              )}
            </div>

            {/* Trust badges inline */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { icon: Shield, label: '100% Organic' },
                { icon: Truck, label: 'Instant Delivery' },
                { icon: Award, label: 'Money-Back Guarantee' },
                { icon: CheckCircle, label: 'Verified Accounts' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none mb-8 text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />

            {/* Add to Cart */}
            <AddToCart product={product} />

            {/* Trust Signals */}
            <TrustSignals />
          </div>
        </div>

        {/* Reviews */}
        <ProductReviews handle={handle} />

        {/* FAQ */}
        <ProductFaq handle={handle} />
      </div>
    </>
  );
}

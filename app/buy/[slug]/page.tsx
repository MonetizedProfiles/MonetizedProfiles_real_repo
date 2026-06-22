import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { LANDING_PAGES } from '@/data/landing-pages';
import { getProductByHandle, formatPrice } from '@/lib/shopify';
import { productJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { SITE_URL, SITE_NAME, TRUST_STATS } from '@/lib/constants';
import { ProductCard } from '@/components/product-card';
import { TrustBar } from '@/components/trust-bar';
import { ReviewCarousel } from '@/components/review-carousel';
import { FaqSection } from '@/components/faq-section';
import { Shield, Zap, Star, CheckCircle } from 'lucide-react';

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = LANDING_PAGES.find((p) => p.slug === slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${SITE_URL}/buy/${slug}` },
    openGraph: {
      type: 'website',
      title: `${page.title} | ${SITE_NAME}`,
      description: page.description,
      url: `${SITE_URL}/buy/${slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = LANDING_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  let product;
  try {
    product = await getProductByHandle(page.productHandle);
  } catch {
    product = null;
  }

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: page.h1, url: `${SITE_URL}/buy/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(page.faqs)) }}
      />
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product, { count: TRUST_STATS.totalReviews, average: TRUST_STATS.averageRating })) }}
        />
      )}

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{page.h1}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{page.description}</p>
          {product && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/products/${page.productHandle}`}
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                Buy Now — {formatPrice(product.priceRange.minVariantPrice.amount)}
              </Link>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                {TRUST_STATS.totalReviews}+ reviews
              </div>
            </div>
          )}
        </div>
      </section>

      <TrustBar />

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-10">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, title: 'Fully Monetized', desc: 'Account meets all platform requirements for earning revenue. Start earning from day one.' },
              { icon: Shield, title: '100% Organic', desc: 'Real followers, real engagement. No bots, no fake accounts. Platform-safe and sustainable.' },
              { icon: Zap, title: 'Instant Delivery', desc: 'Receive your account credentials within minutes. Includes course materials and niche list.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product CTA */}
      {product && (
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 max-w-lg">
            <ProductCard product={product} />
          </div>
        </section>
      )}

      <ReviewCarousel />

      <FaqSection faqs={page.faqs} />
    </>
  );
}

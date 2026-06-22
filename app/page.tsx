import Link from 'next/link';
import { getProducts, formatPrice } from '@/lib/shopify';
import { ProductCard } from '@/components/product-card';
import { TrustBar } from '@/components/trust-bar';
import { ReviewCarousel } from '@/components/review-carousel';
import { FaqSection } from '@/components/faq-section';
import { SITE_NAME, TRUST_STATS } from '@/lib/constants';
import { faqJsonLd } from '@/lib/seo';
import { homepageFaqs } from '@/data/faqs';
import { Shield, Zap, Headphones, Star } from 'lucide-react';

export const revalidate = 300;

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts(10);
  } catch {
    products = [];
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homepageFaqs)) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-20 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 fill-current" />
            Trusted by {TRUST_STATS.accountsSold.toLocaleString()}+ creators
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Buy Pre-Monetized
            <span className="text-primary"> YouTube & TikTok </span>
            Accounts
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Skip months of grinding. Get a fully monetized account with organic followers, start earning from day one. Instant delivery, lifetime support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#products"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              Browse Accounts
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Products Grid */}
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every account is organically grown, fully verified, and ready to monetize from day one.
            </p>
          </div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Products loading from Shopify — check back shortly.</p>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose {SITE_NAME}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Zap, title: 'Instant Delivery', desc: 'Get your account credentials within minutes of purchase.' },
              { icon: Shield, title: '100% Organic Growth', desc: 'No bots, no fake followers. Every account is organically grown.' },
              { icon: Star, title: `${TRUST_STATS.totalReviews}+ Reviews`, desc: `${TRUST_STATS.averageRating}/5 average rating from verified buyers.` },
              { icon: Headphones, title: 'Lifetime Support', desc: 'Free course materials + dedicated support for every purchase.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-background rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewCarousel />

      {/* FAQ */}
      <FaqSection faqs={homepageFaqs} />
    </>
  );
}

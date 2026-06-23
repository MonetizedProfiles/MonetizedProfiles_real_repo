import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { COMPARISONS } from '@/data/comparisons';
import { getProductByHandle } from '@/lib/shopify';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { ProductCard } from '@/components/product-card';
import { FaqSection } from '@/components/faq-section';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = COMPARISONS.find((c) => c.slug === slug);
  if (!comparison) return {};

  return {
    title: comparison.title,
    description: comparison.description,
    keywords: comparison.keywords.join(', '),
    alternates: { canonical: `${SITE_URL}/compare/${slug}` },
    openGraph: {
      type: 'website',
      title: `${comparison.title} | ${SITE_NAME}`,
      description: comparison.description,
      url: `${SITE_URL}/compare/${slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = COMPARISONS.find((c) => c.slug === slug);
  if (!comparison) notFound();

  const products = (
    await Promise.all(
      comparison.relatedProductHandles.map(async (handle) => {
        try {
          return await getProductByHandle(handle);
        } catch {
          return null;
        }
      }),
    )
  ).filter(Boolean);

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: comparison.h1, url: `${SITE_URL}/compare/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(comparison.faqs)) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span>{comparison.h1}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{comparison.h1}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{comparison.description}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-border text-muted-foreground font-medium" />
                  <th className="text-left p-4 border-b border-border font-semibold text-lg">{comparison.itemA.name}</th>
                  <th className="text-left p-4 border-b border-border font-semibold text-lg">{comparison.itemB.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-border font-medium text-muted-foreground">Best For</td>
                  <td className="p-4 border-b border-border">{comparison.itemA.bestFor}</td>
                  <td className="p-4 border-b border-border">{comparison.itemB.bestFor}</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium text-muted-foreground">Price Range</td>
                  <td className="p-4 border-b border-border font-semibold text-primary">{comparison.itemA.priceRange}</td>
                  <td className="p-4 border-b border-border font-semibold text-primary">{comparison.itemB.priceRange}</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium text-muted-foreground">Pros</td>
                  <td className="p-4 border-b border-border">
                    <ul className="space-y-1">
                      {comparison.itemA.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 border-b border-border">
                    <ul className="space-y-1">
                      {comparison.itemB.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium text-muted-foreground">Cons</td>
                  <td className="p-4 border-b border-border">
                    <ul className="space-y-1">
                      {comparison.itemA.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 border-b border-border">
                    <ul className="space-y-1">
                      {comparison.itemB.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Pros & Cons: {comparison.itemA.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-green-400 mb-3">Pros</h3>
              <ul className="space-y-2">
                {comparison.itemA.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-red-400 mb-3">Cons</h3>
              <ul className="space-y-2">
                {comparison.itemA.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">Pros & Cons: {comparison.itemB.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-green-400 mb-3">Pros</h3>
              <ul className="space-y-2">
                {comparison.itemB.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-red-400 mb-3">Cons</h3>
              <ul className="space-y-2">
                {comparison.itemB.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Verdict</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{comparison.verdict}</p>
        </div>
      </section>

      {products.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {products.map((product) => (
                <ProductCard key={product!.id} product={product!} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={comparison.faqs} />

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-4">More Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COMPARISONS.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 hover:bg-secondary/50 transition-all group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">{c.h1}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { getProductByHandle } from '@/lib/shopify';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { ProductCard } from '@/components/product-card';
import { FaqSection } from '@/components/faq-section';
import { ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return GLOSSARY_TERMS.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const { term: termSlug } = await params;
  const entry = GLOSSARY_TERMS.find((t) => t.slug === termSlug);
  if (!entry) return {};

  return {
    title: `${entry.term} — What It Means & Why It Matters`,
    description: entry.definition,
    alternates: { canonical: `${SITE_URL}/glossary/${termSlug}` },
    openGraph: {
      type: 'website',
      title: `${entry.term} | ${SITE_NAME} Glossary`,
      description: entry.definition,
      url: `${SITE_URL}/glossary/${termSlug}`,
    },
  };
}

export const revalidate = 3600;

function definedTermJsonLd(entry: { term: string; definition: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.term,
    description: entry.definition,
    url: `${SITE_URL}/glossary/${entry.slug}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: `${SITE_NAME} Glossary`,
      url: `${SITE_URL}/glossary`,
    },
  };
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term: termSlug } = await params;
  const entry = GLOSSARY_TERMS.find((t) => t.slug === termSlug);
  if (!entry) notFound();

  const products = (
    await Promise.all(
      entry.relatedProductHandles.map(async (handle) => {
        try {
          return await getProductByHandle(handle);
        } catch {
          return null;
        }
      }),
    )
  ).filter(Boolean);

  const relatedEntries = entry.relatedTerms
    .map((slug) => GLOSSARY_TERMS.find((t) => t.slug === slug))
    .filter(Boolean);

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Glossary', url: `${SITE_URL}/glossary` },
    { name: entry.term, url: `${SITE_URL}/glossary/${termSlug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(entry.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd(entry)) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/glossary" className="hover:text-primary transition-colors">Glossary</Link>
            <span>/</span>
            <span>{entry.term}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{entry.term}</h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10">
            <p className="text-lg font-medium">{entry.definition}</p>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            {entry.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {relatedEntries.length > 0 && (
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Related Terms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedEntries.map((related) => (
                <Link
                  key={related!.slug}
                  href={`/glossary/${related!.slug}`}
                  className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-primary/30 transition-all group"
                >
                  <div>
                    <span className="font-medium group-hover:text-primary transition-colors">{related!.term}</span>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{related!.definition}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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

      <FaqSection faqs={entry.faqs} />
    </>
  );
}

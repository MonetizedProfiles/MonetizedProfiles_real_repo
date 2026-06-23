import Link from 'next/link';
import type { Metadata } from 'next';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { breadcrumbJsonLd } from '@/lib/seo';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: `Glossary | ${SITE_NAME}`,
  description: 'Learn the key terms and concepts related to YouTube monetization, TikTok growth, and buying social media accounts. A complete glossary for creators and entrepreneurs.',
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    type: 'website',
    title: `Glossary | ${SITE_NAME}`,
    description: 'Learn the key terms and concepts related to YouTube monetization, TikTok growth, and buying social media accounts.',
    url: `${SITE_URL}/glossary`,
  },
};

export const revalidate = 3600;

export default function GlossaryPage() {
  const sorted = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term));
  const letters = Array.from(new Set(sorted.map((t) => t.term.charAt(0).toUpperCase()))).sort();

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Glossary', url: `${SITE_URL}/glossary` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span>Glossary</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Glossary</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Key terms and concepts for YouTube monetization, TikTok growth, and buying social media accounts.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>

          {letters.map((letter) => {
            const terms = sorted.filter((t) => t.term.charAt(0).toUpperCase() === letter);
            return (
              <div key={letter} id={`letter-${letter}`} className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-primary">{letter}</h2>
                <div className="space-y-3">
                  {terms.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/glossary/${term.slug}`}
                      className="block p-4 border border-border rounded-lg hover:border-primary/30 hover:bg-secondary/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{term.term}</h3>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{term.definition}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

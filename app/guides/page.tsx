import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { breadcrumbJsonLd } from '@/lib/seo';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guides — How to Make Money on YouTube & TikTok',
  description: `Free guides on monetizing YouTube and TikTok. Learn which niches are most profitable, how to grow your channel, and how to maximize your earnings.`,
  alternates: { canonical: `${SITE_URL}/guides` },
};

const guides = [
  {
    slug: 'top-niches',
    title: 'Top 50 YouTube & TikTok Niches for 2025',
    description: 'Data-driven picks for the most profitable niches based on RPM, competition, and growth potential.',
    category: 'Niche Research',
  },
  {
    slug: 'how-to-make-money-on-youtube',
    title: 'How to Make Money on YouTube in 2025',
    description: 'Complete guide to YouTube monetization — AdSense, memberships, sponsorships, and fast-tracking with a monetized channel.',
    category: 'YouTube',
  },
  {
    slug: 'how-to-make-money-on-tiktok',
    title: 'How to Make Money on TikTok in 2025',
    description: 'Learn about the Creativity Program, TikTok Shop affiliates, and brand deals. Plus how to fast-track with a pre-monetized account.',
    category: 'TikTok',
  },
];

export default function GuidesPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Guides', url: `${SITE_URL}/guides` },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <BookOpen className="h-4 w-4" />
          Free Resources
        </div>
        <h1 className="text-4xl font-bold mb-4">Guides & Resources</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about monetizing your YouTube and TikTok accounts. Free, detailed, and actionable.
        </p>
      </div>

      <div className="space-y-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <span className="text-xs font-medium text-primary uppercase tracking-wider">{guide.category}</span>
            <h2 className="text-xl font-semibold mt-1 mb-2 group-hover:text-primary transition-colors">{guide.title}</h2>
            <p className="text-muted-foreground text-sm mb-3">{guide.description}</p>
            <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              Read Guide <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Blog — Tips & Guides for Creators',
  description: `Tips, guides, and insights on monetizing YouTube and TikTok from the ${SITE_NAME} team.`,
  alternates: { canonical: `${SITE_URL}/blog` },
};

const posts = [
  {
    slug: 'how-to-make-money-on-youtube',
    title: 'How to Make Money on YouTube in 2025: Complete Guide',
    excerpt: 'Everything you need to know about YouTube monetization requirements, revenue streams, and strategies for maximizing your earnings.',
    date: '2025-01-15',
    category: 'YouTube',
  },
  {
    slug: 'how-to-make-money-on-tiktok',
    title: 'How to Make Money on TikTok in 2025: Complete Guide',
    excerpt: "A deep dive into TikTok's Creativity Program, how much creators are earning, and tips to maximize your RPM.",
    date: '2025-01-10',
    category: 'TikTok',
  },
  {
    slug: 'top-niches',
    title: 'Top 50 YouTube & TikTok Niches for 2025',
    excerpt: 'Discover the most profitable niches for YouTube and TikTok — data-driven picks based on RPM, competition, and growth.',
    date: '2025-01-05',
    category: 'Niche Research',
  },
];

export default function BlogPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      <nav className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center gap-1.5">
          <li><a href="/" className="hover:text-foreground">Home</a></li>
          <li>/</li>
          <li className="text-foreground font-medium">Blog</li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-muted-foreground mb-10">Tips and guides for monetizing your social media accounts.</p>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">{post.category}</span>
              <time className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/guides/${post.slug}`} className="group-hover:text-primary transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-muted-foreground text-sm mb-3">{post.excerpt}</p>
            <Link href={`/guides/${post.slug}`} className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              Read More <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12 bg-secondary rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Want More Guides?</h2>
        <p className="text-muted-foreground text-sm mb-4">Check out our complete resource library with guides on niches, monetization strategies, and growth tips.</p>
        <Link href="/guides" className="text-primary font-medium hover:underline">Browse All Guides →</Link>
      </div>
    </div>
  );
}

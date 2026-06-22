import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Tips, guides, and insights on monetizing YouTube and TikTok from the ${SITE_NAME} team.`,
  alternates: { canonical: `${SITE_URL}/blog` },
};

const posts = [
  {
    slug: 'how-to-monetize-youtube-2025',
    title: 'How to Monetize YouTube in 2025: Complete Guide',
    excerpt: 'Everything you need to know about YouTube monetization requirements, revenue streams, and strategies for maximizing your earnings.',
    date: '2025-01-15',
  },
  {
    slug: 'tiktok-creativity-program-explained',
    title: 'TikTok Creativity Program Explained: How Much Can You Earn?',
    excerpt: 'A deep dive into TikTok\'s Creativity Program, how much creators are earning, and tips to maximize your RPM.',
    date: '2025-01-10',
  },
  {
    slug: 'best-niches-for-faceless-youtube',
    title: 'Best Niches for Faceless YouTube Channels in 2025',
    excerpt: 'Discover the most profitable niches for faceless YouTube channels — no camera, no face, just revenue.',
    date: '2025-01-05',
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-muted-foreground mb-10">Tips and guides for monetizing your social media accounts.</p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <time className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            <h2 className="text-xl font-semibold mt-1 mb-2">
              <Link href={`/guides/${post.slug.replace('how-to-monetize-youtube-2025', 'how-to-make-money-on-youtube').replace('tiktok-creativity-program-explained', 'how-to-make-money-on-tiktok').replace('best-niches-for-faceless-youtube', 'top-niches')}`} className="hover:text-primary transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-muted-foreground text-sm">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

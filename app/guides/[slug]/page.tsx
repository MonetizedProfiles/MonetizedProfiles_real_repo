import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProducts, formatPrice } from '@/lib/shopify';
import { breadcrumbJsonLd, faqJsonLd, guideArticleJsonLd } from '@/lib/seo';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { ProductCard } from '@/components/product-card';
import { FaqSection } from '@/components/faq-section';

interface Guide {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  sections: Array<{ heading: string; content: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedHandles: string[];
}

const guides: Guide[] = [
  {
    slug: 'top-niches',
    title: 'Top 50 YouTube & TikTok Niches for 2025',
    h1: 'Top 50 YouTube & TikTok Niches for 2025',
    description: 'Discover the most profitable YouTube and TikTok niches for 2025. Data-driven picks based on RPM, competition, and growth potential.',
    intro: 'Choosing the right niche is the single most important decision for your social media monetization success. We analyzed thousands of channels to identify the highest-RPM, fastest-growing niches.',
    sections: [
      { heading: 'High RPM YouTube Niches', content: 'Finance, insurance, legal, SaaS reviews, and real estate consistently deliver the highest RPM on YouTube ($15-50+ per 1,000 views). These niches attract high-value advertisers willing to pay premium rates.' },
      { heading: 'Fast-Growing TikTok Niches', content: 'AI tools, productivity hacks, health/wellness, pet content, and cooking/recipes are seeing explosive growth on TikTok. The Creativity Program pays best for longer-form content (1+ minutes) in these categories.' },
      { heading: 'Best Niches for TikTok Shop', content: 'Beauty, skincare, home organization, kitchen gadgets, and fitness products convert best on TikTok Shop. Look for products with strong visual appeal and commission rates above 15%.' },
      { heading: 'Evergreen Niches', content: 'Tutorial/how-to content, language learning, meditation, and nature/relaxation videos provide consistent, year-round viewership without seasonal fluctuation.' },
    ],
    faqs: [
      { question: 'How do I choose the right niche?', answer: 'Consider three factors: your interest/knowledge in the topic, the RPM potential (how much advertisers pay), and the competition level. We recommend starting with a niche you can consistently create content for, even if the RPM is moderate.' },
      { question: 'Can I change niches later?', answer: 'Yes, but it\'s easier to pivot early. YouTube\'s algorithm may take 2-4 weeks to re-categorize your channel after a niche change. On TikTok, the algorithm adapts much faster.' },
      { question: 'Do I get a full niche list with my purchase?', answer: 'Yes! Every account purchase includes our curated niche list with 50+ profitable niches, including estimated RPM ranges, competition scores, and content ideas.' },
    ],
    relatedHandles: ['youtube', 'monetized-tiktok-account', 'niche-list'],
  },
  {
    slug: 'how-to-make-money-on-youtube',
    title: 'How to Make Money on YouTube in 2025 — Complete Guide',
    h1: 'How to Make Money on YouTube in 2025',
    description: 'Complete guide to making money on YouTube. Learn about AdSense, memberships, sponsorships, and how buying a monetized channel fast-tracks your earnings.',
    intro: 'YouTube remains one of the best platforms for building sustainable income. With multiple revenue streams available, creators can earn thousands per month. Here\'s everything you need to know.',
    sections: [
      { heading: 'YouTube Partner Program Requirements', content: 'To earn AdSense revenue, you need 1,000 subscribers and 4,000 watch hours (or 10M Shorts views). This typically takes 6-12 months of consistent uploading. Or you can buy a pre-monetized channel and skip the wait entirely.' },
      { heading: 'Revenue Streams', content: 'YouTube offers multiple ways to earn: AdSense ads (automatic), channel memberships, Super Chat/Super Thanks during live streams, YouTube Shopping, and the Shorts monetization program. Most creators earn $3-10 per 1,000 views from ads alone.' },
      { heading: 'Maximizing Your Revenue', content: 'Focus on longer videos (8+ minutes to enable mid-roll ads), target high-RPM niches, upload consistently (2-3x per week), and optimize your titles and thumbnails for click-through rate.' },
      { heading: 'Fast-Track with a Monetized Channel', content: 'Buying a pre-monetized YouTube channel lets you skip the 6-12 month grind to reach Partner Program requirements. All our channels come with 1,000+ organic subscribers and 4,000+ watch hours, ready to earn from day one.' },
    ],
    faqs: [
      { question: 'How much does YouTube pay per 1,000 views?', answer: 'YouTube RPM varies by niche: entertainment averages $2-5, tech/reviews $5-12, and finance/insurance can reach $20-50+. Your actual earnings depend on audience location, with US/UK/CA/AU commanding the highest rates.' },
      { question: 'How long does it take to start earning?', answer: 'With a pre-monetized channel, you can start earning immediately. From scratch, reaching the Partner Program typically takes 6-12 months of consistent uploading.' },
    ],
    relatedHandles: ['youtube', 'aged-youtube', 'niche-list'],
  },
  {
    slug: 'how-to-make-money-on-tiktok',
    title: 'How to Make Money on TikTok in 2025 — Complete Guide',
    h1: 'How to Make Money on TikTok in 2025',
    description: 'Learn how to make money on TikTok through the Creativity Program, TikTok Shop affiliates, and brand deals. Plus how to fast-track with a pre-monetized account.',
    intro: 'TikTok has become a serious money-making platform. With the Creativity Program, TikTok Shop, and brand partnerships, creators at every level can earn significant income.',
    sections: [
      { heading: 'TikTok Creativity Program', content: 'The Creativity Program (replacing the old Creator Fund) pays creators based on video views. You need 10,000+ followers and content over 1 minute long. Typical RPM ranges from $0.50-$3.00+ for US audiences.' },
      { heading: 'TikTok Shop Affiliate', content: 'TikTok Shop lets you promote products and earn commissions on every sale. Top affiliates earn $500-$5,000+ per month by creating product review and unboxing content. You need 5,000+ followers to qualify.' },
      { heading: 'Growing Your TikTok', content: 'Post 2-3 times daily, use trending sounds and hashtags, hook viewers in the first 1-2 seconds, and engage with comments. TikTok\'s algorithm heavily favors consistency and engagement rate over follower count.' },
      { heading: 'Skip the Grind', content: 'Growing to 10,000 followers organically can take months. Our pre-monetized TikTok accounts come with 10,000+ organic followers and monetization already enabled, plus a US e-SIM for targeting the highest-RPM audiences.' },
    ],
    faqs: [
      { question: 'How much does TikTok pay per view?', answer: 'Through the Creativity Program, TikTok pays approximately $0.50-$3.00 per 1,000 views, depending on your niche and audience demographics. US audiences generate the highest RPM.' },
      { question: 'What is the e-SIM for?', answer: 'The US e-SIM lets your TikTok account appear to be based in the US, giving you access to the highest-paying advertisers and the US TikTok Shop marketplace, regardless of where you physically are.' },
    ],
    relatedHandles: ['monetized-tiktok-account', 'tiktok-shop-affiliate-account', 'uk-tiktok-shop-affiliate-account'],
  },
];

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}/guides/${slug}` },
  };
}

export const revalidate = 3600;

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    const allProducts = await getProducts(20);
    products = allProducts.filter((p) => guide.relatedHandles.includes(p.handle));
  } catch {
    products = [];
  }

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Guides', url: `${SITE_URL}/guides` },
    { name: guide.h1, url: `${SITE_URL}/guides/${slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(guide.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideArticleJsonLd({
        title: guide.title,
        description: guide.description,
        slug: guide.slug,
        datePublished: '2025-01-05T00:00:00Z',
        dateModified: '2025-06-01T00:00:00Z',
      })) }} />

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <ol className="flex items-center gap-1.5">
            <li><a href="/" className="hover:text-foreground">Home</a></li>
            <li>/</li>
            <li className="text-foreground font-medium">{guide.h1}</li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{guide.h1}</h1>
        <p className="text-lg text-muted-foreground mb-10">{guide.intro}</p>

        <div className="prose prose-lg max-w-none">
          {guide.sections.map((section) => (
            <div key={section.heading} className="mb-8">
              <h2 className="text-2xl font-bold mb-3">{section.heading}</h2>
              <p className="text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>

        {products.length > 0 && (
          <section className="mt-12 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </article>

      <FaqSection faqs={guide.faqs} />
    </>
  );
}

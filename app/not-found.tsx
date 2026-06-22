import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center max-w-lg">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-2">Page not found</p>
      <p className="text-sm text-muted-foreground mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/collections/all"
          className="inline-flex items-center justify-center border border-border px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
        >
          Browse Products
        </Link>
      </div>
      <div className="bg-secondary rounded-xl p-6 text-left">
        <h2 className="font-semibold mb-3">Popular Products</h2>
        <ul className="space-y-2 text-sm">
          <li><Link href="/products/youtube" className="text-primary hover:underline">Monetized YouTube Channel</Link> — Start earning on YouTube today</li>
          <li><Link href="/products/monetized-tiktok-account" className="text-primary hover:underline">Monetized TikTok Account</Link> — 10,000+ followers included</li>
          <li><Link href="/products/tiktok-shop-affiliate-account" className="text-primary hover:underline">TikTok Shop Affiliate</Link> — Earn commissions on TikTok Shop</li>
        </ul>
      </div>
    </div>
  );
}

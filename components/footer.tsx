'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE_NAME, NAV_LINKS, PRODUCT_HANDLES } from '@/lib/constants';
import { CreditCard, Lock } from 'lucide-react';

const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
  youtube: 'Monetized YouTube Channel',
  'aged-youtube': 'Aged YouTube Channel',
  'monetized-tiktok-account': 'Monetized TikTok Account',
  'tiktok-shop-affiliate-account': 'TikTok Shop Affiliate (US)',
  'uk-tiktok-shop-affiliate-account': 'TikTok Shop Affiliate (UK)',
  'aged-instagram-account': 'Aged Instagram Account',
  'niche-list': 'Niche List',
};

const PAYMENT_METHODS = ['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'Shop Pay'];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-foreground text-background py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{SITE_NAME}</h3>
            <p className="text-sm text-background/80 mb-4">
              The #1 marketplace for pre-monetized social media accounts. Trusted by {(12500).toLocaleString()}+ creators worldwide.
            </p>

            {subscribed ? (
              <p className="text-sm text-green-400 font-medium">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 text-sm px-3 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-1 focus:ring-background/40"
                />
                <button
                  type="submit"
                  className="text-sm font-medium px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Join
                </button>
              </form>
            )}
            <p className="text-xs text-background/60 mt-2">Get tips & deals. No spam.</p>
          </div>
          <nav aria-label="Products">
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-background/80">
              {PRODUCT_HANDLES.map((handle) => (
                <li key={handle}>
                  <Link href={`/products/${handle}`} className="hover:text-background transition-colors">
                    {PRODUCT_DISPLAY_NAMES[handle] || handle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/80">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-background transition-colors">{link.label}</Link>
                </li>
              ))}
              <li><Link href="/guides" className="hover:text-background transition-colors">Guides</Link></li>
              <li><Link href="/order-tracking" className="hover:text-background transition-colors">Order Tracking</Link></li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><Link href="/policies/privacy-policy" className="hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies/terms-of-service" className="hover:text-background transition-colors">Terms of Service</Link></li>
              <li><Link href="/policies/refund-policy" className="hover:text-background transition-colors">Refund Policy</Link></li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-sm">Contact</h4>
              <a href="mailto:support@monetizedprofiles.com" className="text-sm text-background/80 hover:text-background transition-colors">
                support@monetizedprofiles.com
              </a>
            </div>
          </nav>
        </div>

        <div className="border-t border-background/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Lock className="h-3.5 w-3.5 text-background/60" />
            <div className="flex items-center gap-2">
              {PAYMENT_METHODS.map((method) => (
                <span key={method} className="text-xs text-background/60 bg-background/10 px-2 py-0.5 rounded">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

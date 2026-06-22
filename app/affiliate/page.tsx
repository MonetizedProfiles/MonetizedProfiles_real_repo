import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { DollarSign, Users, TrendingUp, Gift } from 'lucide-react';

export const metadata: Metadata = {
  title: `Affiliate Program — Earn Commissions`,
  description: `Join the ${SITE_NAME} affiliate program and earn commissions on every sale. High conversion rates, recurring revenue, and dedicated support.`,
  alternates: { canonical: `${SITE_URL}/affiliate` },
};

export default function AffiliatePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Affiliate Program</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Earn commissions promoting the #1 marketplace for monetized social media accounts. High conversion rates and generous payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          { icon: DollarSign, title: 'Generous Commissions', desc: 'Earn a competitive commission on every successful referral sale.' },
          { icon: Users, title: 'High Conversion', desc: 'Our optimized checkout and trust signals mean more of your traffic converts.' },
          { icon: TrendingUp, title: 'Real-Time Tracking', desc: 'Track your clicks, conversions, and earnings in real time via your dashboard.' },
          { icon: Gift, title: 'Marketing Materials', desc: 'Get access to banners, copy, and content templates to promote effectively.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="border border-border rounded-xl p-6">
            <Icon className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://monetizedprofiles.tapfiliate.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
        >
          Join the Affiliate Program
        </a>
      </div>
    </div>
  );
}

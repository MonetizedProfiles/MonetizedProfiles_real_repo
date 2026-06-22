import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Order Tracking',
  description: `Track your ${SITE_NAME} order status.`,
  alternates: { canonical: `${SITE_URL}/order-tracking` },
  robots: { index: false, follow: false },
};

export default function OrderTrackingPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-lg text-center">
      <Package className="h-12 w-12 text-primary mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">Order Tracking</h1>
      <p className="text-muted-foreground mb-6">
        All accounts are delivered digitally via email within minutes of purchase. Check your inbox (and spam folder) for your account credentials.
      </p>
      <p className="text-sm text-muted-foreground">
        Need help? Contact us at{' '}
        <a href="mailto:support@monetizedprofiles.com" className="text-primary hover:underline">
          support@monetizedprofiles.com
        </a>
      </p>
    </div>
  );
}

import Link from 'next/link';
import { SITE_NAME, NAV_LINKS, PRODUCT_HANDLES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{SITE_NAME}</h3>
            <p className="text-sm text-background/70">
              The #1 marketplace for pre-monetized social media accounts. Trusted by thousands of creators worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {PRODUCT_HANDLES.slice(0, 5).map((handle) => (
                <li key={handle}>
                  <Link href={`/products/${handle}`} className="hover:text-background transition-colors">
                    {handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-background transition-colors">{link.label}</Link>
                </li>
              ))}
              <li><Link href="/order-tracking" className="hover:text-background transition-colors">Order Tracking</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/policies/privacy-policy" className="hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies/terms-of-service" className="hover:text-background transition-colors">Terms of Service</Link></li>
              <li><Link href="/policies/refund-policy" className="hover:text-background transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/50">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, type ShopifyProduct } from '@/lib/shopify';
import { ArrowRight } from 'lucide-react';

const CROSS_SELL_MAP: Record<string, string[]> = {
  youtube: ['monetized-tiktok-account', 'niche-list'],
  'aged-youtube': ['youtube', 'niche-list'],
  'monetized-tiktok-account': ['tiktok-shop-affiliate-account', 'youtube'],
  'tiktok-shop-affiliate-account': ['monetized-tiktok-account', 'uk-tiktok-shop-affiliate-account'],
  'uk-tiktok-shop-affiliate-account': ['tiktok-shop-affiliate-account', 'monetized-tiktok-account'],
  'aged-instagram-account': ['youtube', 'monetized-tiktok-account'],
  'niche-list': ['youtube', 'monetized-tiktok-account'],
};

export function CrossSell({ currentHandle, products }: { currentHandle: string; products: ShopifyProduct[] }) {
  const suggestedHandles = CROSS_SELL_MAP[currentHandle] || [];
  const suggestions = suggestedHandles
    .map((h) => products.find((p) => p.handle === h))
    .filter(Boolean) as ShopifyProduct[];

  if (suggestions.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-bold mb-1">Frequently Bought Together</h2>
      <p className="text-sm text-muted-foreground mb-6">Customers who bought this also purchased</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {suggestions.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.handle}`}
            className="flex gap-4 p-4 border border-border rounded-xl hover:shadow-md hover:border-primary/30 transition-all group"
          >
            {product.images[0] && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                {product.title}
              </h3>
              <p className="text-primary font-bold mt-1">
                {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
              </p>
              <span className="text-xs text-primary flex items-center gap-1 mt-1 group-hover:gap-2 transition-all">
                View Product <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

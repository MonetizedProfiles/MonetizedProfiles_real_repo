import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, type ShopifyProduct } from '@/lib/shopify';
import { Star, ArrowRight, Users } from 'lucide-react';
import { REVIEW_COUNTS } from '@/data/reviews';

const PRODUCT_HIGHLIGHTS: Record<string, string> = {
  youtube: '1,000+ subs • YPP approved',
  'aged-youtube': 'Est. 2010 or earlier • Algorithm boosted',
  'monetized-tiktok-account': '10,000+ followers • Includes e-SIM',
  'tiktok-shop-affiliate-account': '5,000+ US followers • Shop approved',
  'uk-tiktok-shop-affiliate-account': '5,000+ UK followers • Shop approved',
  'aged-instagram-account': 'Aged & established account',
  'niche-list': '50+ profitable niches',
};

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.variants[0]?.compareAtPrice;
  const image = product.images[0];
  const highlight = PRODUCT_HIGHLIGHTS[product.handle] || '';
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all"
    >
      <div className="relative aspect-square bg-secondary overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No image</div>
        )}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded">
            SALE
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(REVIEW_COUNTS.average) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{REVIEW_COUNTS.average} ({REVIEW_COUNTS.total})</span>
        </div>

        {/* Highlight */}
        {highlight && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
            <Users className="h-3 w-3" />
            {highlight}
          </p>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
              </span>
            )}
          </div>
          <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            View <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

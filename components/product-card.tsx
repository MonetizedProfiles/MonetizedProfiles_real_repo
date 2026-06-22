import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, type ShopifyProduct } from '@/lib/shopify';
import { Star } from 'lucide-react';

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.variants[0]?.compareAtPrice;
  const image = product.images[0];

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
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
        {compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount) && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            SALE
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">4.0</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-primary">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount) && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

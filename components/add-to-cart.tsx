'use client';

import { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import type { ShopifyProduct } from '@/lib/shopify';
import { formatPrice } from '@/lib/shopify';
import { useCartStore } from '@/lib/cart-store';

export function AddToCart({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const variant = product.variants[selectedVariantIndex];
  if (!variant) return null;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      productHandle: product.handle,
      productTitle: product.title,
      productImage: product.images[0]?.url || '',
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions,
    });
  };

  return (
    <div className="space-y-4">
      {/* Variant Selection */}
      {product.options.length > 0 && product.options[0].name !== 'Title' && (
        <div>
          {product.options.map((option) => (
            <div key={option.name} className="mb-3">
              <label className="block text-sm font-medium mb-2">{option.name}</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => {
                  const optionValue = v.selectedOptions.find((o) => o.name === option.name)?.value;
                  if (!optionValue) return null;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIndex(i)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        i === selectedVariantIndex
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      } ${!v.availableForSale ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!v.availableForSale}
                    >
                      {optionValue}
                      {v.title !== 'Default Title' && (
                        <span className="ml-1 text-muted-foreground">
                          — {formatPrice(v.price.amount, v.price.currencyCode)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center border border-border rounded-lg">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-secondary transition-colors" aria-label="Decrease quantity">
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 text-sm font-medium">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-secondary transition-colors" aria-label="Increase quantity">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAdd}
        disabled={!variant.availableForSale}
        className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingCart className="h-5 w-5" />
        {variant.availableForSale ? 'Add to Cart' : 'Sold Out'}
      </button>
    </div>
  );
}
